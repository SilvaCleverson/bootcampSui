"use client";
import { useI18n } from "@/lib/i18n";

type TreatmentType = "hydration" | "nutrition" | "reconstruction";

interface Props {
  type: TreatmentType;
  count: number;
  lastDate?: string | null;
}

export default function HairTreatmentCard({ type, count, lastDate }: Props) {
  const { t, language } = useI18n();

  const treatments = {
    hydration: { icon: "💧", name: t.treatments?.hydration || "Hidratação", color: "#3a5a40" },
    nutrition: { icon: "🥑", name: t.treatments?.nutrition || "Nutrição", color: "#d4af37" },
    reconstruction: { icon: "🧬", name: t.treatments?.reconstruction || "Reconstrução", color: "#0b0b0b" },
  };

  const treatment = treatments[type];

  function formatDate(d: string) {
    const date = new Date(d);
    const locale = language === "pt-BR" ? "pt-BR" : language === "en-US" ? "en-US" : "es-ES";
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
        borderRadius: 20,
        padding: 16,
        border: `2px solid ${treatment.color}40`,
        boxShadow: `0 4px 16px ${treatment.color}25`,
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${treatment.color}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 16px ${treatment.color}25`;
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{treatment.icon}</div>
      <div style={{ fontSize: 12, color: "#667eea", marginBottom: 6, fontWeight: 600 }}>{treatment.name}</div>
      <div style={{ fontSize: 28, fontWeight: 700, background: `linear-gradient(135deg, ${treatment.color}, ${treatment.color}dd)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{count}x</div>
      {lastDate && (
        <div style={{ fontSize: 10, color: "#999", marginTop: 6 }}>
          Última: {formatDate(lastDate)}
        </div>
      )}
    </div>
  );
}

