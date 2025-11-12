"use client";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "@/lib/constants";

interface TreatmentEvent {
  type: "hydration" | "nutrition" | "reconstruction";
  date: string;
}

export function Timeline() {
  const { t, language } = useI18n();
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [events, setEvents] = useState<TreatmentEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account && suiClient) {
      loadOnChainTreatments();
      // Atualizar a cada 5 segundos
      const interval = setInterval(loadOnChainTreatments, 5000);
      return () => clearInterval(interval);
    } else {
      setEvents([]);
    }
  }, [account, suiClient]);

  async function loadOnChainTreatments() {
    if (!account || !suiClient) return;

    setLoading(true);
    try {
      // Buscar todos os objetos owned pelo endereço
      const ownedObjects = await suiClient.getOwnedObjects({
        owner: account.address,
        options: {
          showType: true,
          showContent: true,
        },
      });

      const treatmentEvents: TreatmentEvent[] = [];

      // Processar cada objeto
      for (const obj of ownedObjects.data) {
        if (!obj.data) continue;

        const objectType = obj.data.type;

        // Verificar se é um Treatment
        if (objectType && objectType.includes(`${PACKAGE_ID}::profile::Treatment`)) {
          const content = obj.data.content as any;
          if (content && content.fields) {
            const treatmentType = content.fields.treatment_type || [];
            const timestamp = content.fields.timestamp || Date.now();
            
            // Converter bytes para string
            const treatmentTypeStr = new TextDecoder().decode(new Uint8Array(treatmentType));
            
            if (treatmentTypeStr === "hydration" || treatmentTypeStr === "nutrition" || treatmentTypeStr === "reconstruction") {
              treatmentEvents.push({
                type: treatmentTypeStr as "hydration" | "nutrition" | "reconstruction",
                date: new Date(Number(timestamp)).toISOString(),
              });
            }
          }
        }
      }

      // Ordenar por data (mais recente primeiro)
      treatmentEvents.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setEvents(treatmentEvents);
    } catch (error) {
      console.error("Erro ao carregar tratamentos on-chain:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const locale = language === "pt-BR" ? "pt-BR" : language === "en-US" ? "en-US" : "es-ES";
    const dateFormatted = date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${dateFormatted}, ${hours}:${minutes}`;
  }

  function getIcon(type: TreatmentEvent["type"]) {
    const icons = {
      hydration: "💧",
      nutrition: "🥑",
      reconstruction: "🧬",
    };
    return icons[type];
  }

  function getColor(type: TreatmentEvent["type"]) {
    const colors = {
      hydration: "#3a5a40",
      nutrition: "#d4af37",
      reconstruction: "#667eea",
    };
    return colors[type];
  }

  function getName(type: TreatmentEvent["type"]) {
    return t.treatments[type];
  }

  if (!account) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          padding: 32,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
        <h3 style={{ margin: 0, fontSize: 18, color: "#3a5a40", marginBottom: 8 }}>
          {language === "pt-BR" ? "Conecte sua Carteira" : "Connect Your Wallet"}
        </h3>
        <p style={{ fontSize: 14, color: "#666" }}>
          {language === "pt-BR" 
            ? "Conecte sua carteira para ver tratamentos on-chain" 
            : "Connect your wallet to see on-chain treatments"}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          padding: 32,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <h3 style={{ margin: 0, fontSize: 18, color: "#3a5a40", marginBottom: 8 }}>
          {language === "pt-BR" ? "Carregando..." : "Loading..."}
        </h3>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          padding: 32,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
        <h3 style={{ margin: 0, fontSize: 18, color: "#3a5a40", marginBottom: 8 }}>
          {language === "pt-BR" ? "Nenhum registro on-chain ainda" : "No on-chain records yet"}
        </h3>
        <p style={{ fontSize: 14, color: "#666" }}>
          {language === "pt-BR" 
            ? "Comece fazendo seu primeiro check-in on-chain!" 
            : "Start by making your first on-chain check-in!"}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: 20,
        padding: 24,
        border: "1px solid #e0e0e0",
      }}
    >
      <h3 style={{ margin: "0 0 24px 0", fontSize: 18, color: "#3a5a40" }}>
        📅 {language === "pt-BR" ? "Timeline de Tratamentos On-Chain" : "On-Chain Treatment Timeline"}
      </h3>

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom: index !== events.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: getColor(event.type),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {getIcon(event.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                {getName(event.type)}
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>{formatDate(event.date)}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          background: "#f8f9fa",
          borderRadius: 8,
          fontSize: 12,
          color: "#666",
          textAlign: "center",
        }}
      >
        📊 {events.length} {language === "pt-BR" ? "tratamentos on-chain registrados" : "on-chain treatments recorded"}
      </div>
    </div>
  );
}
