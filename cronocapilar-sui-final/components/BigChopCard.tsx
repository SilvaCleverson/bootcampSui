"use client";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export function BigChopCard() {
  const { t, language } = useI18n();
  const [bigChopDate, setBigChopDate] = useState<string | null>(null);
  const [daysSince, setDaysSince] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localDate, setLocalDate] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("bigChopDate");
    if (saved) {
      setBigChopDate(saved);
      calculateDays(saved);
    } else {
      setIsEditing(true);
    }
  }, []);

  function calculateDays(dateStr: string) {
    const today = new Date();
    const bigChop = new Date(dateStr);
    const diffTime = today.getTime() - bigChop.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysSince(diffDays);
  }

  function handleSave() {
    if (!localDate) return;
    
    localStorage.setItem("bigChopDate", localDate);
    setBigChopDate(localDate);
    calculateDays(localDate);
    setIsEditing(false);
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const locale = language === "pt-BR" ? "pt-BR" : language === "en-US" ? "en-US" : "es-ES";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "16px",
        color: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>
        ✂️ {t.bigchop.title}
      </h3>
      <p style={{ margin: "0 0 16px 0", fontSize: "14px", opacity: 0.9 }}>
        {t.bigchop.description}
      </p>

      {isEditing ? (
        <div>
          <input
            type="date"
            value={localDate}
            onChange={(e) => setLocalDate(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "14px",
              marginBottom: "12px",
            }}
            placeholder={t.bigchop.placeholder}
          />
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#fff",
              color: "#667eea",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {t.bigchop.save}
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "12px" }}>
            <p style={{ margin: "0 0 4px 0", fontSize: "13px", opacity: 0.8 }}>
              {t.bigchop.saved}
            </p>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
              {formatDate(bigChopDate!)}
            </p>
          </div>
          
          {daysSince !== null && (
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>
                {daysSince.toLocaleString()}
              </p>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
                {daysSince === 1 ? t.profile.day : t.profile.days} {t.bigchop.daysAgo}
              </p>
            </div>
          )}

          <button
            onClick={() => setIsEditing(true)}
            style={{
              marginTop: "12px",
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            ✏️ Editar
          </button>
        </div>
      )}
    </div>
  );
}

