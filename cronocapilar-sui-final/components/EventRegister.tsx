"use client";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME, FUNCTION_REGISTER_EVENT } from "@/lib/constants";

interface Event {
  id: string;
  type: "bigchop" | "haircut" | "coloration" | "treatment";
  date: string;
  description?: string;
  materials?: string[];
  location?: string;
  cmCut?: number;
  txDigest?: string; // Digest da transação para buscar timestamp depois se necessário
}

export function EventRegister() {
  const { t, language } = useI18n();
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSavingEvent, setIsSavingEvent] = useState(false);
  const [formData, setFormData] = useState({
    type: "bigchop" as Event["type"],
    date: new Date().toISOString().split("T")[0],
    description: "",
    materials: "",
    location: "",
    cmCut: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  function loadEvents() {
    const saved = localStorage.getItem("cronocapilar_events");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }

  function saveEvents(newEvents: Event[]) {
    localStorage.setItem("cronocapilar_events", JSON.stringify(newEvents));
    setEvents(newEvents);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!account) {
      alert(language === "pt-BR" 
        ? "Por favor, conecte sua carteira primeiro."
        : language === "en-US"
        ? "Please connect your wallet first."
        : "Por favor, conecta tu carteira primero.");
      return;
    }

    setIsSavingEvent(true);

    try {
      // Criar transação para registrar evento on-chain
      const tx = new Transaction();
      
      // Converter todos os campos para bytes
      const encoder = new TextEncoder();
      const eventTypeBytes = encoder.encode(formData.type);
      const dateBytes = encoder.encode(formData.date);
      const descriptionBytes = encoder.encode(formData.description || "");
      const materialsBytes = encoder.encode(formData.materials || "");
      const locationBytes = encoder.encode(formData.location || "");
      const cmCutBytes = encoder.encode(formData.cmCut || "");

      // Chamar a função register_event do módulo publicado
      const result = tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_REGISTER_EVENT}`,
        arguments: [
          tx.pure.vector("u8", Array.from(eventTypeBytes)),
          tx.pure.vector("u8", Array.from(dateBytes)),
          tx.pure.vector("u8", Array.from(descriptionBytes)),
          tx.pure.vector("u8", Array.from(materialsBytes)),
          tx.pure.vector("u8", Array.from(locationBytes)),
          tx.pure.vector("u8", Array.from(cmCutBytes)),
        ],
      });

      // Transferir o objeto Event retornado para o sender
      tx.transferObjects([result], account.address);

      // Executar a transação
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: async (result) => {
            console.log("✅ Evento registrado on-chain com sucesso:", result);
            
            // Buscar detalhes da transação para obter o timestamp da blockchain
            // Aguardar um pouco para garantir que a transação esteja confirmada
            let blockchainTimestamp: string | null = null;
            
            // Tentar buscar o timestamp com retry (até 3 tentativas)
            for (let attempt = 0; attempt < 3; attempt++) {
              try {
                // Aguardar um pouco antes de buscar (especialmente na primeira tentativa)
                if (attempt > 0) {
                  await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                }
                
                const txDetails = await suiClient.getTransactionBlock({
                  digest: result.digest,
                  options: {
                    showEffects: true,
                    showEvents: true,
                    showInput: false,
                    showObjectChanges: true,
                  },
                });
                
                console.log("📋 Detalhes da transação:", txDetails);
                
                // O timestamp pode estar em diferentes lugares na resposta
                if (txDetails.timestampMs) {
                  blockchainTimestamp = new Date(Number(txDetails.timestampMs)).toISOString();
                  console.log("📅 Timestamp encontrado (timestampMs):", blockchainTimestamp);
                  break;
                } else if ((txDetails as any).transaction?.data?.timestampMs) {
                  blockchainTimestamp = new Date(Number((txDetails as any).transaction.data.timestampMs)).toISOString();
                  console.log("📅 Timestamp encontrado (transaction.data.timestampMs):", blockchainTimestamp);
                  break;
                } else {
                  console.warn(`⚠️ Tentativa ${attempt + 1}: Timestamp não encontrado na estrutura esperada`);
                }
              } catch (error) {
                console.error(`❌ Erro na tentativa ${attempt + 1} ao buscar timestamp:`, error);
                if (attempt === 2) {
                  // Última tentativa falhou, usar data/hora atual como fallback
                  console.warn("⚠️ Usando timestamp atual como fallback");
                  blockchainTimestamp = new Date().toISOString();
                }
              }
            }
            
            // Se ainda não conseguiu, usar data/hora atual
            if (!blockchainTimestamp) {
              blockchainTimestamp = new Date().toISOString();
              console.warn("⚠️ Usando timestamp atual como fallback final");
            }
            
            // Resetar estado de salvamento
            setIsSavingEvent(false);
            
            // Usar timestamp da blockchain se disponível, senão usar data selecionada + hora atual
            let eventDate: string;
            if (blockchainTimestamp) {
              eventDate = blockchainTimestamp;
            } else {
              // Fallback: combinar data selecionada com hora atual
              const selectedDate = new Date(formData.date);
              const now = new Date();
              selectedDate.setHours(now.getHours());
              selectedDate.setMinutes(now.getMinutes());
              selectedDate.setSeconds(now.getSeconds());
              eventDate = selectedDate.toISOString();
            }
            
            const newEvent: Event = {
              id: Date.now().toString(),
              type: formData.type,
              date: eventDate,
              description: formData.description || undefined,
              location: formData.location || undefined,
              cmCut: formData.cmCut ? Number(formData.cmCut) : undefined,
              materials: formData.materials ? formData.materials.split(",").map(m => m.trim()) : undefined,
              txDigest: result.digest, // Salvar digest para referência futura
            };

            const newEvents = [...events, newEvent].sort((a, b) => 
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            
            // Salvar localmente
            saveEvents(newEvents);
            
            // Fechar formulário e resetar
            setShowForm(false);
            setFormData({
              type: "bigchop",
              date: new Date().toISOString().split("T")[0],
              description: "",
              materials: "",
              location: "",
              cmCut: "",
            });
            
            // Mostrar feedback
            alert(language === "pt-BR"
              ? `✅ Evento registrado on-chain com sucesso!\n\n📝 Transaction: ${result.digest}\n\n💎 Evento salvo na blockchain Sui!\n\n🕐 Data/Hora: ${new Date(eventDate).toLocaleString(language === "pt-BR" ? "pt-BR" : language === "en-US" ? "en-US" : "es-ES")}`
              : language === "en-US"
              ? `✅ Event registered on-chain successfully!\n\n📝 Transaction: ${result.digest}\n\n💎 Event saved on Sui blockchain!\n\n🕐 Date/Time: ${new Date(eventDate).toLocaleString("en-US")}`
              : `✅ Evento registrado on-chain con éxito!\n\n📝 Transacción: ${result.digest}\n\n💎 Evento guardado en la blockchain Sui!\n\n🕐 Fecha/Hora: ${new Date(eventDate).toLocaleString("es-ES")}`);
          },
          onError: (error) => {
            console.error("❌ Erro ao registrar evento on-chain:", error);
            setIsSavingEvent(false);
            alert(language === "pt-BR"
              ? `❌ Erro ao registrar evento on-chain: ${error.message || "Erro desconhecido"}`
              : language === "en-US"
              ? `❌ Error registering event on-chain: ${error.message || "Unknown error"}`
              : `❌ Error al registrar evento on-chain: ${error.message || "Error desconocido"}`);
          },
        }
      );
    } catch (error: any) {
      console.error("Erro ao criar transação de evento:", error);
      setIsSavingEvent(false);
      alert(language === "pt-BR"
        ? `❌ Erro ao criar transação: ${error.message || "Erro desconhecido"}`
        : language === "en-US"
        ? `❌ Error creating transaction: ${error.message || "Unknown error"}`
        : `❌ Error al crear transacción: ${error.message || "Error desconocido"}`);
    }
  }

  function getIcon(type: Event["type"]) {
    const icons = {
      bigchop: "✂️",
      haircut: "💇‍♀️",
      coloration: "🎨",
      treatment: "💆‍♀️",
    };
    return icons[type];
  }

  function getLabel(type: Event["type"]) {
    const labels = {
      bigchop: language === "pt-BR" ? "Big Chop" : "Big Chop",
      haircut: language === "pt-BR" ? "Corte de Cabelo" : "Haircut",
      coloration: language === "pt-BR" ? "Coloração" : "Hair Coloration",
      treatment: language === "pt-BR" ? "Tratamento" : "Treatment",
    };
    return labels[type];
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr + "T00:00:00");
    const locale = language === "pt-BR" ? "pt-BR" : language === "en-US" ? "en-US" : "es-ES";
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div>
      {/* Botão de Adicionar */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: "20px",
          border: "2px dashed rgba(102, 126, 234, 0.4)",
          background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
          color: "#667eea",
          fontSize: 15,
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: 24,
          boxShadow: "0 4px 16px rgba(102, 126, 234, 0.2)",
          transition: "all 0.3s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.6)";
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "2px dashed rgba(102, 126, 234, 0.4)";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.2)";
        }}
      >
        {showForm 
          ? (language === "pt-BR" ? "✕ Cancelar" : "✕ Cancel") 
          : (language === "pt-BR" ? "+ Registrar Evento" : "+ Register Event")
        }
      </button>

      {/* Formulário */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)", 
          padding: 28, 
          borderRadius: 24, 
          marginBottom: 24,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(255, 107, 157, 0.1)"
        }}>
          <h3 style={{ 
            margin: "0 0 20px 0", 
            fontSize: 22, 
            background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700
          }}>
            {language === "pt-BR" ? "📝 Novo Registro" : "📝 New Event"}
          </h3>

          {/* Tipo */}
          <label style={{ display: "block", marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#667eea" }}>
            {language === "pt-BR" ? "Tipo de Evento" : "Event Type"}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Event["type"] })}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 16,
              border: "2px solid rgba(102, 126, 234, 0.2)",
              fontSize: 15,
              marginBottom: 20,
              background: "white",
            }}
          >
            <option value="bigchop">✂️ {language === "pt-BR" ? "Big Chop" : "Big Chop"}</option>
            <option value="haircut">💇‍♀️ {language === "pt-BR" ? "Corte de Cabelo" : "Haircut"}</option>
            <option value="coloration">🎨 {language === "pt-BR" ? "Coloração" : "Coloration"}</option>
            <option value="treatment">💆‍♀️ {language === "pt-BR" ? "Tratamento" : "Treatment"}</option>
          </select>

          {/* Data */}
          <label style={{ display: "block", marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#667eea" }}>
            {language === "pt-BR" ? "Data" : "Date"}
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 16,
              border: "2px solid rgba(102, 126, 234, 0.2)",
              fontSize: 15,
              marginBottom: 20,
              background: "white",
              cursor: "pointer",
              colorScheme: "light",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />

          {/* Centímetros (apenas para corte) */}
          {formData.type === "haircut" && (
            <>
              <label style={{ display: "block", marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#667eea" }}>
                {language === "pt-BR" ? "Centímetros cortados" : "Centimeters cut"}
              </label>
              <input
                type="number"
                value={formData.cmCut}
                onChange={(e) => setFormData({ ...formData, cmCut: e.target.value })}
                placeholder={language === "pt-BR" ? "Ex: 5 cm" : "Ex: 5 cm"}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 16,
                  border: "2px solid rgba(102, 126, 234, 0.2)",
                  fontSize: 15,
                  marginBottom: 20,
                  background: "white",
                }}
              />
            </>
          )}

          {/* Materiais */}
          <label style={{ display: "block", marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#667eea" }}>
            {language === "pt-BR" ? "Materiais utilizados" : "Materials used"} ({language === "pt-BR" ? "separados por vírgula" : "comma separated"})
          </label>
          <input
            type="text"
            value={formData.materials}
            onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
            placeholder={language === "pt-BR" ? "Ex: Shampoo, Máscara, Óleo" : "Ex: Shampoo, Mask, Oil"}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 16,
              border: "2px solid rgba(102, 126, 234, 0.2)",
              fontSize: 15,
              marginBottom: 20,
              background: "white",
            }}
          />

          {/* Local */}
          <label style={{ display: "block", marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#667eea" }}>
            {language === "pt-BR" ? "Onde foi feito" : "Where was it done"}
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder={language === "pt-BR" ? "Ex: Em casa, Salão, etc" : "Ex: At home, Salon, etc"}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 16,
              border: "2px solid rgba(102, 126, 234, 0.2)",
              fontSize: 15,
              marginBottom: 20,
              background: "white",
            }}
          />

          {/* Descrição */}
          <label style={{ display: "block", marginBottom: 8, fontSize: 12, fontWeight: 600 }}>
            {language === "pt-BR" ? "Observações" : "Notes"} ({language === "pt-BR" ? "opcional" : "optional"})
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder={language === "pt-BR" ? "Adicione observações..." : "Add notes..."}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "2px solid #3a5a40",
              fontSize: 14,
              marginBottom: 16,
              resize: "vertical",
            }}
          />

          {/* Botões */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 8,
                border: "2px solid #ddd",
                background: "white",
                color: "#666",
                fontSize: 14,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {language === "pt-BR" ? "Cancelar" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={isSavingEvent}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 8,
                border: "none",
                background: isSavingEvent ? "#ccc" : "#3a5a40",
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                cursor: isSavingEvent ? "not-allowed" : "pointer",
                opacity: isSavingEvent ? 0.7 : 1,
              }}
            >
              {isSavingEvent 
                ? (language === "pt-BR" ? "Salvando on-chain..." : language === "en-US" ? "Saving on-chain..." : "Guardando on-chain...")
                : (language === "pt-BR" ? "Salvar" : "Save")
              }
            </button>
          </div>
        </form>
      )}

      {/* Lista de Eventos */}
      {events.length === 0 ? (
        <div style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <p style={{ fontSize: 14, color: "#666" }}>
            {language === "pt-BR" ? "Nenhum registro ainda" : "No records yet"}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                background: "white",
                padding: 16,
                borderRadius: 12,
                border: "1px solid #e0e0e0",
              }}
            >
              <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                <div style={{ fontSize: 32 }}>{getIcon(event.type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                    {getLabel(event.type)}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {formatDate(event.date)}
                  </div>
                  {event.cmCut && (
                    <div style={{ fontSize: 12, color: "#3a5a40", marginTop: 4 }}>
                      ✂️ {event.cmCut} cm {language === "pt-BR" ? "cortados" : "cut"}
                    </div>
                  )}
                  {event.materials && event.materials.length > 0 && (
                    <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                      📦 {event.materials.join(", ")}
                    </div>
                  )}
                  {event.location && (
                    <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                      📍 {event.location}
                    </div>
                  )}
                  {event.description && (
                    <div style={{ fontSize: 11, color: "#999", marginTop: 4, fontStyle: "italic" }}>
                      {event.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

