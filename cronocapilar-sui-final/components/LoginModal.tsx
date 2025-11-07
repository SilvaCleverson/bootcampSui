"use client";

import { useState, useEffect } from "react";
import { useCurrentAccount, useWallets, useConnectWallet, useDisconnectWallet } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";
import { useI18n } from "@/lib/i18n";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { language } = useI18n();
  const account = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets();
  const [showSuccess, setShowSuccess] = useState(false);

  // Fechar modal quando conectar com sucesso
  useEffect(() => {
    if (account && isOpen) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }
  }, [account, isOpen, onClose]);

  if (!isOpen) return null;

  const handleConnect = (wallet: any) => {
    connect({ wallet });
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  // Função para obter o logo da carteira
  const getWalletLogo = (walletName: string) => {
    const name = walletName.toLowerCase();
    if (name.includes("phantom")) {
      return "/LogoPhantom.jpg";
    } else if (name.includes("slush")) {
      return "/LogoSlush.png";
    }
    return null;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
          borderRadius: 24,
          padding: 32,
          maxWidth: 480,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 107, 157, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com botão fechar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 32 }}>💜</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#667eea", fontWeight: 600 }}>
              <img 
                src="/LogoSui.jpg" 
                alt="Sui Logo" 
                style={{ width: 24, height: 24, objectFit: "contain" }}
              />
              <span>Sui</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#666",
              padding: "4px 8px",
              borderRadius: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
              e.currentTarget.style.color = "#667eea";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#666";
            }}
          >
            ×
          </button>
        </div>

        {/* Título */}
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: "0 0 12px 0",
            background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {language === "pt-BR" 
            ? "Bem-vindo ao CronoCapilar"
            : language === "en-US"
            ? "Welcome to CronoCapilar"
            : "Bienvenido a CronoCapilar"}
        </h2>

        {/* Descrição */}
        <p
          style={{
            fontSize: 15,
            color: "#666",
            margin: "0 0 32px 0",
            lineHeight: 1.6,
          }}
        >
          {language === "pt-BR"
            ? "Conecte sua carteira Sui para começar a registrar seus tratamentos capilares on-chain e transformar sua rotina em prova de autocuidado."
            : language === "en-US"
            ? "Connect your Sui wallet to start registering your hair care treatments on-chain and turn your routine into proof of self-care."
            : "Conecta tu carteira Sui para comenzar a registrar tus tratamientos capilares on-chain y convertir tu rutina en prueba de autocuidado."}
        </p>

        {/* Mensagem de sucesso */}
        {showSuccess && account && (
          <div
            style={{
              background: "linear-gradient(135deg, #3a5a40 0%, #667eea 100%)",
              color: "white",
              padding: "16px 20px",
              borderRadius: 16,
              marginBottom: 24,
              textAlign: "center",
              fontSize: 15,
              fontWeight: 600,
            }}
            >
              {language === "pt-BR"
                ? "✅ Carteira conectada com sucesso!"
                : language === "en-US"
                ? "✅ Wallet connected successfully!"
                : "✅ Carteira conectada con éxito!"}
              <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9 }}>
                {formatAddress(account.address)}
              </div>
            </div>
        )}

        {/* Botões de carteira */}
        {account ? (
          <div>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                color: "white",
                padding: "16px 20px",
                borderRadius: 16,
                marginBottom: 16,
                textAlign: "center",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              🌍 {language === "pt-BR" ? "Conectado" : language === "en-US" ? "Connected" : "Conectado"}: {formatAddress(account.address)}
            </div>
            <button
              onClick={handleDisconnect}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: 16,
                border: "2px solid rgba(102, 126, 234, 0.3)",
                background: "white",
                color: "#667eea",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.6)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {language === "pt-BR" ? "Desconectar" : language === "en-US" ? "Disconnect" : "Desconectar"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {wallets.length > 0 ? (
              wallets.map((wallet) => {
                const walletLogo = getWalletLogo(wallet.name);
                return (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      borderRadius: 16,
                      border: "2px solid rgba(102, 126, 234, 0.3)",
                      background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
                      color: "#667eea",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      boxShadow: "0 4px 16px rgba(102, 126, 234, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.3)";
                      e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.2)";
                      e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.3)";
                    }}
                  >
                    {walletLogo ? (
                      <img 
                        src={walletLogo} 
                        alt={`${wallet.name} Logo`}
                        style={{ 
                          width: 24, 
                          height: 24, 
                          objectFit: "contain",
                          borderRadius: 4
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 20 }}>🌍</span>
                    )}
                    <span>{language === "pt-BR" ? "Conectar" : language === "en-US" ? "Connect" : "Conectar"} {wallet.name}</span>
                  </button>
                );
              })
            ) : (
              <div
                style={{
                  padding: "24px",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)",
                  border: "2px solid rgba(255, 193, 7, 0.3)",
                  color: "#f57c00",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
                <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>
                  {language === "pt-BR"
                    ? "Nenhuma carteira Sui detectada"
                    : language === "en-US"
                    ? "No Sui wallet detected"
                    : "No se detectó ninguna carteira Sui"}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16, color: "#666" }}>
                  {language === "pt-BR"
                    ? "Para usar o CronoCapilar, você precisa instalar uma carteira Sui. Recomendamos:"
                    : language === "en-US"
                    ? "To use CronoCapilar, you need to install a Sui wallet. We recommend:"
                    : "Para usar CronoCapilar, necesitas instalar una carteira Sui. Recomendamos:"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                  <a
                    href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 14,
                      transition: "all 0.3s",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
                    }}
                  >
                    <span>🔷</span>
                    <span>{language === "pt-BR" ? "Baixar Sui Wallet" : language === "en-US" ? "Download Sui Wallet" : "Descargar Sui Wallet"}</span>
                  </a>
                  <a
                    href="https://www.phantom.app/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: "white",
                      color: "#667eea",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 14,
                      border: "2px solid rgba(102, 126, 234, 0.3)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.6)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span>👻</span>
                    <span>{language === "pt-BR" ? "Baixar Phantom" : language === "en-US" ? "Download Phantom" : "Descargar Phantom"}</span>
                  </a>
                </div>
                <div style={{ fontSize: 11, marginTop: 16, color: "#999", fontStyle: "italic" }}>
                  {language === "pt-BR"
                    ? "Após instalar, recarregue a página e tente novamente."
                    : language === "en-US"
                    ? "After installing, reload the page and try again."
                    : "Después de instalar, recarga la página e intenta de nuevo."}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

