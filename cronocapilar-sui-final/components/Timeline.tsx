"use client";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface TreatmentEvent {
  type: "hydration" | "nutrition" | "reconstruction";
  date: string;
}

export function Timeline() {
  const { t, language } = useI18n();
  const [events, setEvents] = useState<TreatmentEvent[]>([]);

  useEffect(() => {
    loadTimeline();
    // Atualizar quando os dados mudarem
    const interval = setInterval(loadTimeline, 1000);
    return () => clearInterval(interval);
  }, []);

  function loadTimeline() {
    const timeline = localStorage.getItem("cronocapilar_timeline");
    if (timeline) {
      const events = JSON.parse(timeline);
      // Ordenar por data (mais recente primeiro)
      events.sort((a: TreatmentEvent, b: TreatmentEvent) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEvents(events);
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
          {language === "pt-BR" ? "Nenhum registro ainda" : "No records yet"}
        </h3>
        <p style={{ fontSize: 14, color: "#666" }}>
          {language === "pt-BR" 
            ? "Comece fazendo seu primeiro check-in!" 
            : "Start by making your first check-in!"}
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
        📅 {language === "pt-BR" ? "Timeline de Tratamentos" : "Treatment Timeline"}
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
        📊 {events.length} {language === "pt-BR" ? "tratamentos registrados" : "treatments recorded"}
      </div>
    </div>
  );
}

