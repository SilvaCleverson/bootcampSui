"use client";
import { useI18n } from "@/lib/i18n";

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  return (
    <div style={{ 
      display: "flex", 
      gap: 6, 
      alignItems: "center",
      background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
      borderRadius: 16,
      padding: 4,
    }}>
      <button
        onClick={() => setLanguage("en-US")}
        style={{
          padding: "8px 10px",
          borderRadius: 12,
          border: "none",
          background: language === "en-US" ? "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)" : "transparent",
          color: language === "en-US" ? "#fff" : "#999",
          cursor: "pointer",
          fontSize: 18,
          fontWeight: language === "en-US" ? 600 : 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          boxShadow: language === "en-US" ? "0 4px 12px rgba(102, 126, 234, 0.4)" : "none"
        }}
      >
        🇺🇸
      </button>
      <button
        onClick={() => setLanguage("pt-BR")}
        style={{
          padding: "8px 10px",
          borderRadius: 12,
          border: "none",
          background: language === "pt-BR" ? "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)" : "transparent",
          color: language === "pt-BR" ? "#fff" : "#999",
          cursor: "pointer",
          fontSize: 18,
          fontWeight: language === "pt-BR" ? 600 : 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          boxShadow: language === "pt-BR" ? "0 4px 12px rgba(102, 126, 234, 0.4)" : "none"
        }}
      >
        🇧🇷
      </button>
      <button
        onClick={() => setLanguage("es-ES")}
        style={{
          padding: "8px 10px",
          borderRadius: 12,
          border: "none",
          background: language === "es-ES" ? "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)" : "transparent",
          color: language === "es-ES" ? "#fff" : "#999",
          cursor: "pointer",
          fontSize: 18,
          fontWeight: language === "es-ES" ? 600 : 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          boxShadow: language === "es-ES" ? "0 4px 12px rgba(102, 126, 234, 0.4)" : "none"
        }}
      >
        🇪🇸
      </button>
    </div>
  );
}

