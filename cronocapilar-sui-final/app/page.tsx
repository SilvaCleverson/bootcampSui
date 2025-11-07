"use client";
import { useState, useEffect } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";
import HairTreatmentCard from "@/components/HairTreatmentCard";
import TreatmentCheckIn from "@/components/TreatmentCheckIn";
import StreakCard from "@/components/StreakCard";
import { Timeline } from "@/components/Timeline";
import { Tabs } from "@/components/Tabs";
import { EventRegister } from "@/components/EventRegister";
import { TimelinePage } from "@/components/TimelinePage";
import LoginModal from "@/components/LoginModal";
import { useCurrentAccount, useDisconnectWallet, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME, FUNCTION_CREATE_PROFILE, FUNCTION_REGISTER_TREATMENT } from "@/lib/constants";

function Dashboard() {
  const { t, language } = useI18n();
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isSavingOnChain, setIsSavingOnChain] = useState(false);
  const [onChainSaved, setOnChainSaved] = useState(false);
  const [isSavingTreatment, setIsSavingTreatment] = useState(false);
  
  // Estado do perfil
  const [hairType, setHairType] = useState<string>("");
  const [hairLength, setHairLength] = useState<string>("");
  const [hairTexture, setHairTexture] = useState<string>("");
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [bigChopDate, setBigChopDate] = useState<string | null>(null);
  const [daysSinceBigChop, setDaysSinceBigChop] = useState<number | null>(null);
  
  // Estado dos tratamentos
  const [treatments, setTreatments] = useState({
    hydration: { count: 0, lastDate: null as string | null },
    nutrition: { count: 0, lastDate: null as string | null },
    reconstruction: { count: 0, lastDate: null as string | null },
  });

  // Detectar mudança de carteira e limpar perfil
  useEffect(() => {
    if (!account) {
      // Se não há conta, limpar tudo
      setHairType("");
      setHairLength("");
      setHairTexture("");
      setOnChainSaved(false);
      setProfileLoaded(true); // Marcar como carregado mesmo sem conta
      return;
    }

    const savedProfile = localStorage.getItem("cronocapilar_profile");
    const savedWalletAddress = localStorage.getItem("cronocapilar_wallet_address");

    // Se a carteira mudou, limpar o perfil
    if (savedWalletAddress && savedWalletAddress !== account.address) {
      // Limpar perfil local
      setHairType("");
      setHairLength("");
      setHairTexture("");
      setOnChainSaved(false);
      localStorage.removeItem("cronocapilar_profile");
      localStorage.removeItem("profile_onchain_saved");
      localStorage.removeItem("profile_onchain_tx");
      localStorage.removeItem("profile_created_at");
      // Salvar nova carteira
      localStorage.setItem("cronocapilar_wallet_address", account.address);
      setProfileLoaded(true);
      return;
    }

    // Se é a mesma carteira, carregar perfil
    if (savedProfile && savedWalletAddress === account.address) {
      const profile = JSON.parse(savedProfile);
      setHairType(profile.hairType || "");
      setHairLength(profile.hairLength || "");
      setHairTexture(profile.hairTexture || "");
    } else {
      // Primeira vez com esta carteira, salvar endereço
      localStorage.setItem("cronocapilar_wallet_address", account.address);
    }

    // Carregar data do Big Chop (opcional)
    const savedBigChop = localStorage.getItem("bigChopDate");
    if (savedBigChop) {
      setBigChopDate(savedBigChop);
      const today = new Date();
      const bigChop = new Date(savedBigChop);
      const diffDays = Math.floor((today.getTime() - bigChop.getTime()) / (1000 * 60 * 60 * 24));
      setDaysSinceBigChop(diffDays);
    }
    
    setProfileLoaded(true);
  }, [account]);

  // Carregar tratamentos salvos
  useEffect(() => {
    const savedTreatments = localStorage.getItem("cronocapilar_treatments");
    if (savedTreatments) {
      setTreatments(JSON.parse(savedTreatments));
    }
  }, []);

  // Salvar perfil
  function saveProfile(type: string) {
    if (!account) return;
    setHairType(type);
    localStorage.setItem("cronocapilar_profile", JSON.stringify({ 
      hairType: type,
      hairLength,
      hairTexture 
    }));
    // Garantir que o endereço da carteira está salvo
    localStorage.setItem("cronocapilar_wallet_address", account.address);
  }

  function saveHairLength(length: string) {
    if (!account) return;
    setHairLength(length);
    localStorage.setItem("cronocapilar_profile", JSON.stringify({ 
      hairType, 
      hairLength: length, 
      hairTexture 
    }));
    // Garantir que o endereço da carteira está salvo
    localStorage.setItem("cronocapilar_wallet_address", account.address);
  }

  function saveHairTexture(texture: string) {
    if (!account) return;
    setHairTexture(texture);
    localStorage.setItem("cronocapilar_profile", JSON.stringify({ 
      hairType, 
      hairLength, 
      hairTexture: texture 
    }));
    // Garantir que o endereço da carteira está salvo
    localStorage.setItem("cronocapilar_wallet_address", account.address);
  }

  // Salvar tratamento
  function saveTreatment(type: keyof typeof treatments) {
    const newTreatments = { ...treatments };
    newTreatments[type].count += 1;
    newTreatments[type].lastDate = new Date().toISOString();
    setTreatments(newTreatments);
    localStorage.setItem("cronocapilar_treatments", JSON.stringify(newTreatments));
    
    // Salvar no histórico da timeline
    const timeline = JSON.parse(localStorage.getItem("cronocapilar_timeline") || "[]");
    timeline.push({
      type,
      date: new Date().toISOString(),
    });
    localStorage.setItem("cronocapilar_timeline", JSON.stringify(timeline));
  }

  // Função para check-in on-chain
  async function handleCheckIn(type: "hydration" | "nutrition" | "reconstruction") {
    if (!account) {
      alert(language === "pt-BR" 
        ? "Por favor, conecte sua carteira primeiro."
        : language === "en-US"
        ? "Please connect your wallet first."
        : "Por favor, conecta tu carteira primero.");
      return;
    }

    setIsSavingTreatment(true);

    try {
      // Criar transação para registrar tratamento on-chain
      const tx = new Transaction();
      
      // Converter tipo de tratamento para bytes
      const encoder = new TextEncoder();
      const treatmentTypeBytes = encoder.encode(type);

      // Chamar a função register_treatment do módulo publicado
      const result = tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_REGISTER_TREATMENT}`,
        arguments: [
          tx.pure.vector("u8", Array.from(treatmentTypeBytes)),
        ],
      });

      // Transferir o objeto Treatment retornado para o sender
      tx.transferObjects([result], account.address);

      // Executar a transação
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("✅ Tratamento registrado on-chain com sucesso:", result);
            
            // Resetar estado de salvamento
            setIsSavingTreatment(false);
            
            // Salvar o tratamento localmente
            saveTreatment(type);
            
            // Mostrar feedback
            alert(language === "pt-BR"
              ? `✅ ${t.treatments.checkInSuccess}\n\n${t.treatments[type]}\n${t.treatments.checkInAlert} ${treatments[type].count + 1} ${t.treatments.treatmentCount}\n\n📝 Transaction: ${result.digest}\n\n💎 Tratamento salvo na blockchain Sui!`
              : language === "en-US"
              ? `✅ ${t.treatments.checkInSuccess}\n\n${t.treatments[type]}\n${t.treatments.checkInAlert} ${treatments[type].count + 1} ${t.treatments.treatmentCount}\n\n📝 Transaction: ${result.digest}\n\n💎 Treatment saved on Sui blockchain!`
              : `✅ ${t.treatments.checkInSuccess}\n\n${t.treatments[type]}\n${t.treatments.checkInAlert} ${treatments[type].count + 1} ${t.treatments.treatmentCount}\n\n📝 Transacción: ${result.digest}\n\n💎 Tratamiento guardado en la blockchain Sui!`);
          },
          onError: (error) => {
            console.error("❌ Erro ao registrar tratamento on-chain:", error);
            setIsSavingTreatment(false);
            alert(language === "pt-BR"
              ? `❌ Erro ao registrar tratamento on-chain: ${error.message || "Erro desconhecido"}`
              : language === "en-US"
              ? `❌ Error registering treatment on-chain: ${error.message || "Unknown error"}`
              : `❌ Error al registrar tratamiento on-chain: ${error.message || "Error desconocido"}`);
          },
        }
      );
    } catch (error: any) {
      console.error("Erro ao criar transação de tratamento:", error);
      setIsSavingTreatment(false);
      alert(language === "pt-BR"
        ? `❌ Erro ao criar transação: ${error.message || "Erro desconhecido"}`
        : language === "en-US"
        ? `❌ Error creating transaction: ${error.message || "Unknown error"}`
        : `❌ Error al crear transacción: ${error.message || "Error desconocido"}`);
    }
  }

  // Função para salvar perfil on-chain
  async function saveProfileOnChain() {
    if (!account) {
      alert(language === "pt-BR" 
        ? "Por favor, conecte sua carteira primeiro."
        : language === "en-US"
        ? "Please connect your wallet first."
        : "Por favor, conecta tu carteira primero.");
      return;
    }

    if (!isProfileComplete) {
      alert(language === "pt-BR" 
        ? "Por favor, selecione o tipo de cabelo primeiro."
        : language === "en-US"
        ? "Please select your hair type first."
        : "Por favor, selecciona el tipo de cabello primero.");
      return;
    }

    setIsSavingOnChain(true);
    setOnChainSaved(false);

    try {
      // Criar transação para chamar o contrato Move
      const tx = new Transaction();
      
      // Converter strings para vector<u8> (bytes) usando TextEncoder
      const encoder = new TextEncoder();
      const hairTypeBytes = encoder.encode(hairType);
      const hairLengthBytes = encoder.encode(hairLength || "");
      const hairTextureBytes = encoder.encode(hairTexture || "");

      // Chamar a função create_profile do módulo publicado
      // A função retorna um objeto Profile que será automaticamente transferido para o sender
      const result = tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_CREATE_PROFILE}`,
        arguments: [
          tx.pure.vector("u8", Array.from(hairTypeBytes)),
          tx.pure.vector("u8", Array.from(hairLengthBytes)),
          tx.pure.vector("u8", Array.from(hairTextureBytes)),
        ],
      });

      // Transferir o objeto Profile retornado para o sender
      tx.transferObjects([result], account.address);

      // Executar a transação
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("✅ Transação executada com sucesso:", result);
            
            // Resetar estado de salvamento
            setIsSavingOnChain(false);
            
            // Salvar dados localmente com flag on-chain
            const profileData = {
              hairType,
              hairLength,
              hairTexture,
              timestamp: new Date().toISOString(),
              owner: account.address,
              onChain: true,
              txDigest: result.digest,
            };

            localStorage.setItem("cronocapilar_profile", JSON.stringify(profileData));
            localStorage.setItem("profile_onchain_saved", "true");
            localStorage.setItem("profile_onchain_tx", result.digest);
            // Salvar endereço da carteira para verificar mudanças futuras
            localStorage.setItem("cronocapilar_wallet_address", account.address);
            
            setOnChainSaved(true);
            
            setTimeout(() => {
              setOnChainSaved(false);
            }, 5000);

            alert(language === "pt-BR"
              ? `✅ Perfil salvo on-chain com sucesso!\n\n📝 Transaction: ${result.digest}\n\n💎 Seu perfil está agora na blockchain Sui!`
              : language === "en-US"
              ? `✅ Profile saved on-chain successfully!\n\n📝 Transaction: ${result.digest}\n\n💎 Your profile is now on Sui blockchain!`
              : `✅ Perfil guardado on-chain con éxito!\n\n📝 Transacción: ${result.digest}\n\n💎 Tu perfil está ahora en la blockchain Sui!`);
          },
          onError: (error) => {
            console.error("❌ Erro ao executar transação:", error);
            setIsSavingOnChain(false);
            alert(language === "pt-BR"
              ? `❌ Erro ao salvar perfil on-chain: ${error.message || "Erro desconhecido"}`
              : language === "en-US"
              ? `❌ Error saving profile on-chain: ${error.message || "Unknown error"}`
              : `❌ Error al guardar perfil on-chain: ${error.message || "Error desconocido"}`);
          },
        }
      );
    } catch (error: any) {
      console.error("Erro ao criar transação:", error);
      alert(language === "pt-BR"
        ? `❌ Erro ao criar transação: ${error.message || "Erro desconhecido"}`
        : language === "en-US"
        ? `❌ Error creating transaction: ${error.message || "Unknown error"}`
        : `❌ Error al crear transacción: ${error.message || "Error desconocido"}`);
      setIsSavingOnChain(false);
    }
  }

  function formatDate(dateStr: string | null, locale: string) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString(locale, { day: "numeric", month: "short" });
  }

  // Verificar se o perfil está completo (apenas tipo de cabelo é necessário)
  const isProfileComplete = hairType !== "";
  
  // Verificar se a carteira está conectada
  const isWalletConnected = account !== null;

  // Forçar aba de perfil se não estiver completo
  useEffect(() => {
    if (!isProfileComplete && activeTab !== "profile") {
      setActiveTab("profile");
    }
  }, [isProfileComplete, activeTab]);

  if (!profileLoaded) {
    return <div suppressHydrationWarning>{t.treatments.loadingProfile}</div>;
  }

  // Componente de bloqueio quando carteira não está conectada
  const WalletRequiredMessage = () => (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
      borderRadius: 24,
      padding: 40,
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      border: "1px solid rgba(255, 107, 157, 0.1)"
    }}>
      <div style={{ fontSize: 64, marginBottom: 20, filter: "drop-shadow(0 4px 12px rgba(102, 126, 234, 0.2))" }}>
        💆‍♀️
      </div>
      <h3 style={{
        fontSize: 24,
        fontWeight: 700,
        margin: "0 0 16px 0",
        background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        {language === "pt-BR" ? "Conecte sua Carteira Sui" : language === "en-US" ? "Connect Your Sui Wallet" : "Conecta tu Carteira Sui"}
      </h3>
      <p style={{
        fontSize: 16,
        color: "#666",
        margin: "0 0 24px 0",
        lineHeight: 1.6
      }}>
        {language === "pt-BR" 
          ? <>Para usar o CronoCapilar e registrar seus cuidados capilares on-chain, você primeiro precisa conectar sua carteira <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sui</span>.</>
          : language === "en-US"
          ? <>To use CronoCapilar and register your hair care on-chain, you need to connect your <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sui</span> wallet first.</>
          : <>Para usar CronoCapilar y registrar tus cuidados capilares on-chain, necesitas conectar tu carteira <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sui</span> primero.</>}
      </p>
      <button
        onClick={() => setIsLoginModalOpen(true)}
        style={{
          padding: "14px 28px",
          borderRadius: 16,
          border: "none",
          background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
          color: "white",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
          transition: "all 0.3s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
        }}
      >
        {language === "pt-BR" ? "💆‍♀️ Conectar Carteira" : language === "en-US" ? "💆‍♀️ Connect Wallet" : "💆‍♀️ Conectar Carteira"}
      </button>
    </div>
  );

  // Componente de bloqueio quando perfil não está completo
  const ProfileRequiredMessage = () => (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
      borderRadius: 24,
      padding: 40,
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      border: "1px solid rgba(255, 107, 157, 0.1)"
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🌱</div>
      <h3 style={{
        fontSize: 24,
        fontWeight: 700,
        margin: "0 0 16px 0",
        background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        {language === "pt-BR" ? "Complete seu Perfil Primeiro" : language === "en-US" ? "Complete Your Profile First" : "Completa tu Perfil Primero"}
      </h3>
      <p style={{
        fontSize: 16,
        color: "#666",
        margin: "0 0 24px 0",
        lineHeight: 1.6
      }}>
        {language === "pt-BR" 
          ? "Para começar a usar o CronoCapilar, você precisa preencher seu perfil de cuidados capilares primeiro."
          : language === "en-US"
          ? "To start using CronoCapilar, you need to complete your hair care profile first."
          : "Para comenzar a usar CronoCapilar, necesitas completar tu perfil de cuidados capilares primero."}
      </p>
      <button
        onClick={() => {
          setActiveTab("profile");
        }}
        style={{
          padding: "14px 28px",
          borderRadius: 16,
          border: "none",
          background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
          color: "white",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
          transition: "all 0.3s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
        }}
      >
        {language === "pt-BR" ? "👉 Preencher Perfil" : language === "en-US" ? "👉 Complete Profile" : "👉 Completar Perfil"}
      </button>
    </div>
  );

  // Se não estiver conectado, mostrar apenas mensagem de conexão
  if (!isWalletConnected) {
    return (
      <>
        {/* Header */}
        <header style={{ 
          background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
          borderRadius: 24,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(255, 107, 157, 0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            {/* Logo + Nome */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                flexShrink: 0
              }}>
                <img 
                  src="/logo.png" 
                  alt="CronoCapilar Logo"
                  style={{ width: 44, height: 44, objectFit: "contain" }}
                />
              </div>
              <div>
                <div style={{ 
                  fontSize: 28, 
                  fontWeight: 800, 
                  background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 4,
                  letterSpacing: "-0.5px"
                }}>
                  {t.app.title}
                </div>
                <div style={{ fontSize: 13, color: "#667eea", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>💜</span>
                  <span>{t.app.subtitle}</span>
                </div>
              </div>
            </div>
            
            {/* Link do Website */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a
                href="https://cronogramacapilar.com.br"
                target="_blank"
                rel="noreferrer"
                style={{ 
                  color: "#667eea", 
                  textDecoration: "none", 
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "8px 16px",
                  background: "rgba(102, 126, 234, 0.08)",
                  borderRadius: 12,
                  transition: "all 0.3s",
                  border: "1px solid rgba(102, 126, 234, 0.15)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {t.app.website}
              </a>
            </div>
          </div>
        </header>

      {/* Mensagem de conexão obrigatória */}
      <WalletRequiredMessage />

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
    );
  }

  return (
    <>
      {/* Header */}
      <header style={{ 
        background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
        borderRadius: 24,
        padding: "24px 32px",
        marginBottom: 24,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(255, 107, 157, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          {/* Logo + Nome */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 280 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
              flexShrink: 0
            }}>
              <img 
                src="/logo.png" 
                alt="CronoCapilar Logo"
                style={{ width: 44, height: 44, objectFit: "contain" }}
              />
            </div>
            <div>
              <div style={{ 
                fontSize: 28, 
                fontWeight: 800, 
                background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 4,
                letterSpacing: "-0.5px"
              }}>
                {t.app.title}
              </div>
              <div style={{ fontSize: 13, color: "#667eea", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                <span>💜</span>
                <span>{t.app.subtitle}</span>
              </div>
            </div>
          </div>
          
          {/* Link do Website e Wallet Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href="https://cronogramacapilar.com.br"
              target="_blank"
              rel="noreferrer"
              style={{ 
                color: "#667eea", 
                textDecoration: "none", 
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 16px",
                background: "rgba(102, 126, 234, 0.08)",
                borderRadius: 12,
                transition: "all 0.3s",
                border: "1px solid rgba(102, 126, 234, 0.15)",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(102, 126, 234, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(102, 126, 234, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {t.app.website}
            </a>
            
            {account ? (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 10,
                background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                padding: "10px 18px",
                borderRadius: 16,
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img 
                    src="/LogoSui.jpg" 
                    alt="Sui Logo" 
                    style={{ width: 18, height: 18, objectFit: "contain", borderRadius: 4 }}
                  />
                  <span style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}>
                    {formatAddress(account.address)}
                  </span>
                </div>
                <div style={{ 
                  width: 1, 
                  height: 20, 
                  background: "rgba(255,255,255,0.3)",
                  margin: "0 4px"
                }} />
                <button
                  onClick={() => disconnect()}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    transition: "all 0.2s",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.5)";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  title={language === "pt-BR" ? "Desconectar carteira" : language === "en-US" ? "Disconnect wallet" : "Desconectar carteira"}
                >
                  {language === "pt-BR" ? "Sair" : language === "en-US" ? "Disconnect" : "Salir"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                style={{
                  padding: "12px 24px",
                  borderRadius: 16,
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)";
                }}
              >
                💆‍♀️ {language === "pt-BR" ? "Conectar" : language === "en-US" ? "Connect" : "Conectar"}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Sistema de Abas */}
      <Tabs
        defaultTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          {
            id: "timeline",
            label: "Timeline",
            icon: "📅",
            content: (
              <>
                {isProfileComplete ? (
                  <TimelinePage />
                ) : (
                  <ProfileRequiredMessage />
                )}
              </>
            ),
          },
          {
            id: "treatments",
            label: language === "pt-BR" ? "Tratamentos" : language === "en-US" ? "Treatments" : "Tratamientos",
            icon: "💧",
            content: (
              <>
                {isProfileComplete ? (
                  <>
                    {/* Check-in de Tratamentos */}
                    <TreatmentCheckIn onCheckIn={handleCheckIn} />

                {/* Seção de Tratamentos */}
                <div style={{ marginTop: 16 }}>
                  <h3 style={{ 
                    fontSize: 18, 
                    background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    marginBottom: 12 
                  }}>
                    💆‍♀️ {t.profile.myTreatments}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <HairTreatmentCard 
                      type="hydration" 
                      count={treatments.hydration.count} 
                      lastDate={treatments.hydration.lastDate} 
                    />
                    <HairTreatmentCard 
                      type="nutrition" 
                      count={treatments.nutrition.count} 
                      lastDate={treatments.nutrition.lastDate} 
                    />
                    <HairTreatmentCard 
                      type="reconstruction" 
                      count={treatments.reconstruction.count} 
                      lastDate={treatments.reconstruction.lastDate} 
                    />
                  </div>
                </div>

                    {/* Timeline de Tratamentos */}
                    <div style={{ marginTop: 16 }}>
                      <Timeline />
                    </div>
                  </>
                ) : (
                  <ProfileRequiredMessage />
                )}
              </>
            ),
          },
          {
            id: "register",
            label: language === "pt-BR" ? "Registros" : language === "en-US" ? "Records" : "Registros",
            icon: "📝",
            content: (
              <>
                {isProfileComplete ? (
                  <EventRegister />
                ) : (
                  <ProfileRequiredMessage />
                )}
              </>
            ),
          },
          {
            id: "stats",
            label: language === "pt-BR" ? "Estatísticas" : language === "en-US" ? "Statistics" : "Estadísticas",
            icon: "📊",
            content: (
              <>
                {isProfileComplete ? (
                  <div style={{ 
                  background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)", 
                  padding: 24, 
                  borderRadius: 24, 
                  marginBottom: 16,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(255, 107, 157, 0.1)"
                }}>
                  <h3 style={{ 
                    fontSize: 20, 
                    background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    marginBottom: 16 
                  }}>📊 {t.profile.statistics}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ padding: 16, background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)", borderRadius: 16 }}>
                      <div style={{ fontSize: 32, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>💧</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, color: "#667eea" }}>{t.treatments.hydration}</div>
                      <div style={{ fontSize: 28, fontWeight: "bold", background: "linear-gradient(135deg, #3a5a40, #667eea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {treatments.hydration.count}
                      </div>
                    </div>
                    <div style={{ padding: 16, background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)", borderRadius: 16 }}>
                      <div style={{ fontSize: 32, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>🥑</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, color: "#d4af37" }}>{t.treatments.nutrition}</div>
                      <div style={{ fontSize: 28, fontWeight: "bold", background: "linear-gradient(135deg, #d4af37, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {treatments.nutrition.count}
                      </div>
                    </div>
                    <div style={{ padding: 16, background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)", borderRadius: 16 }}>
                      <div style={{ fontSize: 32, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>🧬</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, color: "#667eea" }}>{t.treatments.reconstruction}</div>
                      <div style={{ fontSize: 28, fontWeight: "bold", background: "linear-gradient(135deg, #667eea, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {treatments.reconstruction.count}
                      </div>
                    </div>
                    <div style={{ padding: 16, background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)", borderRadius: 16 }}>
                      <div style={{ fontSize: 32, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>⭐</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, color: "#667eea" }}>{t.treatments.yourTotal}</div>
                      <div style={{ fontSize: 28, fontWeight: "bold", background: "linear-gradient(135deg, #3a5a40, #667eea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {treatments.hydration.count + treatments.nutrition.count + treatments.reconstruction.count}
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                  <ProfileRequiredMessage />
                )}
              </>
            ),
          },
          {
            id: "profile",
            label: language === "pt-BR" ? "Perfil" : language === "en-US" ? "Profile" : "Perfil",
            icon: "🌱",
            content: (
              <>
                {/* Seção de Perfil */}
                <div style={{ 
                  background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)", 
                  borderRadius: 24, 
                  padding: 24, 
                  marginBottom: 20,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(255, 107, 157, 0.1)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: 20, 
                      background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700
                    }}>🌱 {t.profile.title}</h3>
                    <LanguageSelector />
                  </div>

                  {/* Botão Salvar On-Chain - Topo */}
                  {account && (
                    <div style={{ marginBottom: 24 }}>
                      <button
                        onClick={saveProfileOnChain}
                        disabled={isSavingOnChain}
                        style={{
                          width: "100%",
                          padding: "14px 20px",
                          borderRadius: 16,
                          border: "none",
                          background: onChainSaved
                            ? "linear-gradient(135deg, #3a5a40 0%, #667eea 100%)"
                            : "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                          color: "white",
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: isSavingOnChain ? "not-allowed" : "pointer",
                          transition: "all 0.3s",
                          boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                          opacity: isSavingOnChain ? 0.6 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8
                        }}
                        onMouseEnter={(e) => {
                          if (!isSavingOnChain) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSavingOnChain) {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)";
                          }
                        }}
                      >
                        {isSavingOnChain ? (
                          <>
                            <span style={{ fontSize: 18 }}>⏳</span>
                            <span>{language === "pt-BR" ? "Salvando on-chain..." : language === "en-US" ? "Saving on-chain..." : "Guardando on-chain..."}</span>
                          </>
                        ) : onChainSaved ? (
                          <>
                            <span style={{ fontSize: 18 }}>✅</span>
                            <span>{language === "pt-BR" ? "Salvo on-chain!" : language === "en-US" ? "Saved on-chain!" : "Guardado on-chain!"}</span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: 18 }}>🔗</span>
                            <span>{language === "pt-BR" ? "Salvar Perfil On-Chain" : language === "en-US" ? "Save Profile On-Chain" : "Guardar Perfil On-Chain"}</span>
                          </>
                        )}
                      </button>
                      {localStorage.getItem("profile_onchain_saved") === "true" && (
                        <p style={{ 
                          fontSize: 12, 
                          color: "#667eea", 
                          marginTop: 8, 
                          textAlign: "center",
                          fontStyle: "italic"
                        }}>
                          {language === "pt-BR" 
                            ? "💎 Seu perfil está salvo na blockchain Sui"
                            : language === "en-US"
                            ? "💎 Your profile is saved on Sui blockchain"
                            : "💎 Tu perfil está guardado en la blockchain Sui"}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Tipo de Cabelo */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#667eea" }}>
                      {t.hairTypes.title}
                    </label>
                    <select
                      value={hairType}
                      onChange={(e) => saveProfile(e.target.value)}
                      style={{
                        padding: "14px 16px",
                        borderRadius: 16,
                        border: "2px solid rgba(102, 126, 234, 0.2)",
                        fontSize: 15,
                        background: "white",
                        width: "100%",
                        transition: "all 0.3s",
                        color: hairType ? "#2d3748" : "#999"
                      }}
                    >
                      <option value="" disabled>{t.hairTypes.escolha}</option>
                      <option value="liso">{t.hairTypes.liso}</option>
                      <option value="ondulado">{t.hairTypes.ondulado}</option>
                      <option value="cacheado">{t.hairTypes.cacheado}</option>
                      <option value="crespo">{t.hairTypes.crespo}</option>
                    </select>
                    {hairType && (
                      <p style={{ fontSize: 12, color: "#999", marginTop: 10, padding: "12px", background: "rgba(102, 126, 234, 0.05)", borderRadius: 12 }}>
                        {hairType === "liso" && t.hairTypes.description.liso}
                        {hairType === "ondulado" && t.hairTypes.description.ondulado}
                        {hairType === "cacheado" && t.hairTypes.description.cacheado}
                        {hairType === "crespo" && t.hairTypes.description.crespo}
                      </p>
                    )}
                  </div>

                  {/* Comprimento do Cabelo */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#667eea" }}>
                      {t.hairLength.label}
                    </label>
                    <input
                      type="text"
                      value={hairLength}
                      onChange={(e) => saveHairLength(e.target.value)}
                      placeholder={t.hairLength.placeholder}
                      style={{
                        padding: "14px 16px",
                        borderRadius: 16,
                        border: "2px solid rgba(102, 126, 234, 0.2)",
                        fontSize: 15,
                        background: "white",
                        width: "100%",
                        transition: "all 0.3s"
                      }}
                    />
                    <p style={{ fontSize: 11, color: "#999", marginTop: 6 }}>
                      {language === "pt-BR" ? "📏 " : language === "en-US" ? "📏 " : "📏 "}
                      {hairLength ? `${hairLength} ${t.hairLength.unit}` : t.hairLength.placeholder}
                    </p>
                  </div>

                  {/* Textura do Cabelo */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#667eea" }}>
                      {t.hairTexture.title}
                    </label>
                    <select
                      value={hairTexture}
                      onChange={(e) => saveHairTexture(e.target.value)}
                      style={{
                        padding: "14px 16px",
                        borderRadius: 16,
                        border: "2px solid rgba(102, 126, 234, 0.2)",
                        fontSize: 15,
                        background: "white",
                        width: "100%",
                        transition: "all 0.3s",
                        color: hairTexture ? "#2d3748" : "#999"
                      }}
                    >
                      <option value="" disabled>{t.hairTexture.escolha}</option>
                      <option value="oleoso">{t.hairTexture.oleoso}</option>
                      <option value="seco">{t.hairTexture.seco}</option>
                      <option value="normal">{t.hairTexture.normal}</option>
                      <option value="misto">{t.hairTexture.misto}</option>
                    </select>
                    {hairTexture && (
                      <p style={{ fontSize: 12, color: "#999", marginTop: 10, padding: "12px", background: "rgba(102, 126, 234, 0.05)", borderRadius: 12 }}>
                        {hairTexture === "oleoso" && t.hairTexture.description.oleoso}
                        {hairTexture === "seco" && t.hairTexture.description.seco}
                        {hairTexture === "normal" && t.hairTexture.description.normal}
                        {hairTexture === "misto" && t.hairTexture.description.misto}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card de Streak e Nível */}
                <StreakCard treatments={treatments} />
              </>
            ),
          },
          // Comunidade aba (oculta por enquanto)
          // {
          //   id: "community",
          //   label: language === "pt-BR" ? "Comunidade" : "Community",
          //   icon: "🤝",
          //   content: (
          //     <>
          //       <div style={{ background: "linear-gradient(135deg, #3a5a4010, #d4af3710)", borderRadius: 20, padding: 24 }}>
          //         <h3 style={{ fontSize: 18, color: "#3a5a40", marginBottom: 16 }}>
          //           🤝 {t.community.title}
          //         </h3>
          //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          //           <div style={{ background: "white", padding: 16, borderRadius: 12 }}>
          //             <div style={{ fontSize: 32 }}>🌸</div>
          //             <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t.community.challenge}</div>
          //             <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          //               {t.community.days}
          //             </div>
          //           </div>
          //           <div style={{ background: "white", padding: 16, borderRadius: 12 }}>
          //             <div style={{ fontSize: 32 }}>📊</div>
          //             <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t.treatments.yourTotal}</div>
          //             <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          //               {treatments.hydration.count + treatments.nutrition.count + treatments.reconstruction.count} {t.treatments.treatmentCount}
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </>
          //   ),
          // },
        ]}
      />

      {/* Footer */}
      <footer style={{ marginTop: 32, fontSize: 12, color: "#666", textAlign: "center", padding: "16px", lineHeight: "1.8" }}>
        {t.footer.builtFor} • <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <img 
            src="/LogoSui.jpg" 
            alt="Sui Logo" 
            style={{ width: 20, height: 20, objectFit: "contain", verticalAlign: "middle" }}
          />
          <strong style={{ color: "#667eea" }}>Sui</strong>
        </span> • 💜 {t.footer.madeWithLove}
        <br />
        <div style={{ marginTop: 8, fontSize: 11, fontFamily: "monospace", wordBreak: "break-all", opacity: 0.7 }}>
          Package ID: <span style={{ color: "#667eea", fontWeight: 600 }}>{PACKAGE_ID}</span>
        </div>
      </footer>

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

function PageContent() {
  return <Dashboard />;
}

export default function Page() {
  return (
    <I18nProvider>
      <PageContent />
    </I18nProvider>
  );
}
