"use client";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface BigChopModalProps {
  onSave: (date: string) => void;
  onSkip: () => void;
}

export function BigChopModal({ onSave, onSkip }: BigChopModalProps) {
  const { t } = useI18n();
  const [date, setDate] = useState<string>("");

  function handleSave() {
    if (date) {
      localStorage.setItem("bigChopDate", date);
      onSave(date);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 32,
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: 24, color: "#667eea" }}>
          ✂️ {t.bigchop.title}
        </h3>
        <p style={{ margin: "0 0 24px 0", fontSize: 14, color: "#666" }}>
          {t.bigchop.description}
        </p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            border: "2px solid #667eea",
            fontSize: 14,
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onSkip}
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
            Pular
          </button>
          <button
            onClick={handleSave}
            disabled={!date}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 8,
              border: "none",
              background: date ? "#667eea" : "#ccc",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              cursor: date ? "pointer" : "not-allowed",
            }}
          >
            {t.bigchop.save}
          </button>
        </div>
      </div>
    </div>
  );
}

