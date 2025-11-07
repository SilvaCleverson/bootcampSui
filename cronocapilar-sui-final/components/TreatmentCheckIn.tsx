"use client";
import { useState } from "react";
import { useI18n, formatTranslation } from "@/lib/i18n";

type TreatmentType = "hydration" | "nutrition" | "reconstruction";

interface Props {
  onCheckIn: (type: TreatmentType) => Promise<void>;
}

export default function TreatmentCheckIn({ onCheckIn }: Props) {
  const { t } = useI18n();
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType>("hydration");
  const [loading, setLoading] = useState(false);

  async function handleCheckIn() {
    setLoading(true);
    try {
      await onCheckIn(selectedTreatment);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)", 
      borderRadius: 24, 
      padding: 24, 
      marginBottom: 24,
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
      }}>
        📝 {t.treatments.registerToday}
      </h3>
      
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 14, color: "#667eea", marginBottom: 10, display: "block", fontWeight: 600 }}>
          {t.treatments.selectToday}
        </label>
        <select
          value={selectedTreatment}
          onChange={(e) => setSelectedTreatment(e.target.value as TreatmentType)}
          style={{
            padding: "14px 16px",
            borderRadius: 16,
            border: "2px solid rgba(102, 126, 234, 0.2)",
            fontSize: 15,
            background: "white",
            width: "100%",
            transition: "all 0.3s",
          }}
        >
          <option value="hydration">💧 {t.treatments.hydration}</option>
          <option value="nutrition">🥑 {t.treatments.nutrition}</option>
          <option value="reconstruction">🧬 {t.treatments.reconstruction}</option>
        </select>
      </div>

      <button
        onClick={handleCheckIn}
        disabled={loading}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: 16,
          border: "none",
          background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
          color: "white",
          fontWeight: 600,
          fontSize: 15,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 8px 24px rgba(102, 126, 234, 0.4)",
          transition: "all 0.3s"
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.5)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
        }}
      >
        {loading ? t.checkin.processing : t.treatments.confirmCheckIn}
      </button>
    </div>
  );
}

