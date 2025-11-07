"use client";

import { useCurrentAccount, useWallets, useConnectWallet, useDisconnectWallet } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";

export default function WalletConnect() {
  const account = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets();

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

  if (account) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12,
        background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
        padding: "10px 16px",
        borderRadius: 16,
        color: "white",
        fontSize: 14,
        fontWeight: 600
      }}>
        <span>🌍 {formatAddress(account.address)}</span>
        <button
          onClick={() => disconnect()}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600
          }}
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {wallets.map((wallet) => {
        const walletLogo = getWalletLogo(wallet.name);
        return (
          <button
            key={wallet.name}
            onClick={() => connect({ wallet })}
            style={{
              padding: "12px 20px",
              borderRadius: 16,
              border: "2px solid rgba(102, 126, 234, 0.3)",
              background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
              color: "#667eea",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              transition: "all 0.3s",
              boxShadow: "0 4px 16px rgba(102, 126, 234, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: 8
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
                  width: 20, 
                  height: 20, 
                  objectFit: "contain",
                  borderRadius: 4
                }}
              />
            ) : (
              <span style={{ fontSize: 18 }}>🌍</span>
            )}
            <span>Conectar {wallet.name}</span>
          </button>
        );
      })}
      {wallets.length === 0 && (
        <div style={{ 
          padding: "12px 20px", 
          borderRadius: 16, 
          background: "rgba(255, 193, 7, 0.1)",
          color: "#f57c00",
          fontSize: 14
        }}>
          ⚠️ Nenhuma carteira Sui detectada. Instale a Sui Wallet.
        </div>
      )}
    </div>
  );
}

