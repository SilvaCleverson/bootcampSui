"use client";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface TimelineEvent {
  id: string;
  type: "hairtype" | "bigchop" | "haircut" | "coloration" | "treatment" | "checkin";
  date: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
}

export function TimelinePage() {
  const { t, language } = useI18n();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  // Carregar preferência salva ou usar "recente" como padrão
  const [sortOrder, setSortOrder] = useState<"recente" | "antigo">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("timeline_sort_order");
      return (saved === "antigo" ? "antigo" : "recente") as "recente" | "antigo";
    }
    return "recente";
  });
  
  // Salvar preferência quando mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timeline_sort_order", sortOrder);
    }
  }, [sortOrder]);

  useEffect(() => {
    loadTimeline();
    const interval = setInterval(loadTimeline, 1000);
    return () => clearInterval(interval);
  }, [language, sortOrder]);

  function loadTimeline() {
    const allEvents: TimelineEvent[] = [];

    // Evento do tipo de cabelo (com timestamp do perfil salvo)
    const profile = localStorage.getItem("cronocapilar_profile");
    if (profile) {
      const { hairType } = JSON.parse(profile) as { hairType?: string };
      // Usar timestamp do localStorage se existir, senão usar data atual
      const profileTimestamp = localStorage.getItem("profile_created_at");
      const validHairTypes = ["liso", "ondulado", "cacheado", "crespo"] as const;
      const hairTypeKey = (hairType && validHairTypes.includes(hairType as any) ? hairType : "liso") as "liso" | "ondulado" | "cacheado" | "crespo";
      const hairTypeLabel = t.hairTypes[hairTypeKey] as string;
      allEvents.push({
        id: "hairtype",
        type: "hairtype",
        date: profileTimestamp || new Date().toISOString(),
        title: language === "pt-BR" ? "Perfil Criado" : language === "en-US" ? "Profile Created" : "Perfil Creado",
        description: hairTypeLabel,
        icon: "🌱",
        color: "#3a5a40",
      });
    }

    // Eventos de registros
    const records = localStorage.getItem("cronocapilar_events");
    if (records) {
      const eventsData = JSON.parse(records) as Array<{ id: string; type: string; date: string; description?: string }>;
      eventsData.forEach((event) => {
        const icons: Record<string, string> = {
          bigchop: "✂️",
          haircut: "💇‍♀️",
          coloration: "🎨",
          treatment: "💆‍♀️",
        };
      const titles: Record<string, string> = {
        bigchop: "Big Chop",
        haircut: language === "pt-BR" ? "Corte de Cabelo" : language === "en-US" ? "Haircut" : "Corte de Cabello",
        coloration: language === "pt-BR" ? "Coloração" : language === "en-US" ? "Coloration" : "Coloración",
        treatment: language === "pt-BR" ? "Tratamento" : language === "en-US" ? "Treatment" : "Tratamiento",
      };
        const eventType = event.type as string;
        allEvents.push({
          id: event.id,
          type: event.type as TimelineEvent["type"],
          date: event.date,
          title: titles[eventType] || eventType,
          description: event.description || "",
          icon: icons[eventType] || "📅",
          color: getColorForType(event.type as TimelineEvent["type"]),
        });
      });
    }

    // Check-ins
    const timeline = localStorage.getItem("cronocapilar_timeline");
    if (timeline) {
      const checkIns = JSON.parse(timeline) as Array<{ type: string; date: string }>;
      checkIns.forEach((event, index) => {
        const icons: Record<string, string> = {
          hydration: "💧",
          nutrition: "🥑",
          reconstruction: "🧬",
        };
        const titles: Record<string, string> = {
          hydration: t.treatments.hydration,
          nutrition: t.treatments.nutrition,
          reconstruction: t.treatments.reconstruction,
        };
        const eventType = event.type as string;
        allEvents.push({
          id: `checkin-${index}`,
          type: "checkin",
          date: event.date,
          title: titles[eventType] || eventType,
          description: language === "pt-BR" ? "Check-in diário" : language === "en-US" ? "Daily check-in" : "Check-in diario",
          icon: icons[eventType] || "💆‍♀️",
          color: getColorForCheckIn(event.type as "hydration" | "nutrition" | "reconstruction"),
        });
      });
    }

    // Ordenar por data baseado no sortOrder
    allEvents.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      // Se os tempos forem iguais, ordenar pelo ID para consistência
      if (timeA === timeB) {
        return sortOrder === "recente" 
          ? b.id.localeCompare(a.id)
          : a.id.localeCompare(b.id);
      }
      // Ordenar por data: recente = mais novo primeiro, antigo = mais antigo primeiro
      return sortOrder === "recente" 
        ? timeB - timeA  // Mais recente primeiro
        : timeA - timeB; // Mais antigo primeiro
    });
    setEvents(allEvents);
  }

  function getColorForType(type: string) {
    const colors: Record<string, string> = {
      bigchop: "#667eea",
      haircut: "#764ba2",
      coloration: "#f093fb",
      treatment: "#4facfe",
    };
    return colors[type] || "#3a5a40";
  }

  function getColorForCheckIn(type: string) {
    const colors: Record<string, string> = {
      hydration: "#3a5a40",
      nutrition: "#d4af37",
      reconstruction: "#667eea",
    };
    return colors[type] || "#3a5a40";
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

  function getDaysAgo(dateStr: string): number {
    const now = new Date();
    const date = new Date(dateStr);
    const diffTime = now.getTime() - date.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  function getRelativeTime(dateStr: string) {
    const diffDays = getDaysAgo(dateStr);
    
    if (diffDays === 0) {
      return language === "pt-BR" ? "Hoje" : language === "en-US" ? "Today" : "Hoy";
    } else if (diffDays === 1) {
      return language === "pt-BR" ? "Ontem" : language === "en-US" ? "Yesterday" : "Ayer";
    } else if (diffDays < 7) {
      return language === "pt-BR" ? `${diffDays} dias atrás` : language === "en-US" ? `${diffDays} days ago` : `${diffDays} días atrás`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return language === "pt-BR" ? `${weeks} semana${weeks > 1 ? 's' : ''} atrás` : language === "en-US" ? `${weeks} week${weeks > 1 ? 's' : ''} ago` : `${weeks} semana${weeks > 1 ? 's' : ''} atrás`;
    } else {
      const months = Math.floor(diffDays / 30);
      return language === "pt-BR" ? `${months} mês${months > 1 ? 'es' : ''} atrás` : language === "en-US" ? `${months} month${months > 1 ? 's' : ''} ago` : `${months} mes${months > 1 ? 'es' : ''} atrás`;
    }
  }

  if (events.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
        <h3 style={{ fontSize: 18, color: "#3a5a40", marginBottom: 8 }}>
          {language === "pt-BR" ? "Sua Timeline" : language === "en-US" ? "Your Timeline" : "Tu Timeline"}
        </h3>
        <p style={{ fontSize: 14, color: "#666" }}>
          {language === "pt-BR" 
            ? "Comece registrando eventos e check-ins!" 
            : language === "en-US"
            ? "Start by registering events and check-ins!"
            : "¡Comienza registrando eventos y check-ins!"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        marginBottom: 24, 
        textAlign: "center",
        background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ 
            fontSize: 32,
            filter: "drop-shadow(0 4px 8px rgba(255, 107, 157, 0.3))"
          }}>✨</div>
          <h3 style={{ 
            fontSize: 20, 
            background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            margin: 0 
          }}>
            {language === "pt-BR" ? "Sua Jornada Capilar" : language === "en-US" ? "Your Hair Journey" : "Tu Jornada Capilar"}
          </h3>
        </div>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: 8 
        }}>
          <button
            onClick={() => setSortOrder("recente")}
            style={{
              fontSize: 11,
              color: sortOrder === "recente" ? "#667eea" : "#999",
              background: sortOrder === "recente" 
                ? "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)" 
                : "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
              padding: "6px 12px",
              borderRadius: 12,
              border: sortOrder === "recente" ? "2px solid #667eea" : "2px solid transparent",
              cursor: "pointer",
              fontWeight: sortOrder === "recente" ? 600 : 400,
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 4
            }}
            onMouseEnter={(e) => {
              if (sortOrder !== "recente") {
                e.currentTarget.style.background = "linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)";
                e.currentTarget.style.color = "#667eea";
              }
            }}
            onMouseLeave={(e) => {
              if (sortOrder !== "recente") {
                e.currentTarget.style.background = "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)";
                e.currentTarget.style.color = "#999";
              }
            }}
          >
            <span>⬆️</span>
            <span>{language === "pt-BR" ? "RECENTE" : language === "en-US" ? "RECENT" : "RECIENTE"}</span>
          </button>
          <span style={{ color: "#ccc", fontSize: 12 }}>|</span>
          <button
            onClick={() => setSortOrder("antigo")}
            style={{
              fontSize: 11,
              color: sortOrder === "antigo" ? "#667eea" : "#999",
              background: sortOrder === "antigo" 
                ? "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)" 
                : "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
              padding: "6px 12px",
              borderRadius: 12,
              border: sortOrder === "antigo" ? "2px solid #667eea" : "2px solid transparent",
              cursor: "pointer",
              fontWeight: sortOrder === "antigo" ? 600 : 400,
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 4
            }}
            onMouseEnter={(e) => {
              if (sortOrder !== "antigo") {
                e.currentTarget.style.background = "linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)";
                e.currentTarget.style.color = "#667eea";
              }
            }}
            onMouseLeave={(e) => {
              if (sortOrder !== "antigo") {
                e.currentTarget.style.background = "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)";
                e.currentTarget.style.color = "#999";
              }
            }}
          >
            <span>{language === "pt-BR" ? "ANTIGO" : language === "en-US" ? "OLDEST" : "ANTIGUO"}</span>
            <span>⬇️</span>
          </button>
        </div>
      </div>

      {/* Timeline visual */}
      <div style={{ position: "relative", paddingLeft: 40 }}>
        {/* Linha vertical da timeline */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 3,
            background: "linear-gradient(to bottom, #667eea, #ff6b9d, #d4af37, #667eea)",
            borderRadius: 2,
            boxShadow: "0 0 8px rgba(102, 126, 234, 0.3)",
          }}
        />

        {events.map((event, index) => (
          <div
            key={event.id}
            style={{
              position: "relative",
              marginBottom: 24,
              paddingLeft: 24,
            }}
          >
            {/* Ponto da timeline */}
            <div
              style={{
                position: "absolute",
                left: -32,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                boxShadow: `0 8px 24px ${event.color}50`,
                border: `3px solid ${event.color}`,
              }}
            >
              {event.icon}
            </div>

            {/* Card do evento */}
            <div
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
                borderRadius: 20,
                padding: 20,
                border: `2px solid ${event.color}30`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(8px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${event.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>
                      {event.title}
                    </div>
                    {(() => {
                      const daysAgo = getDaysAgo(event.date);
                      if (daysAgo === 0) {
                        return (
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#10b981",
                            background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                            padding: "2px 8px",
                            borderRadius: 8,
                            border: "1px solid #10b98130"
                          }}>
                            {language === "pt-BR" ? "HOJE" : language === "en-US" ? "TODAY" : "HOY"}
                          </span>
                        );
                      } else {
                        return (
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: event.color,
                            background: `linear-gradient(135deg, ${event.color}15 0%, ${event.color}25 100%)`,
                            padding: "2px 8px",
                            borderRadius: 8,
                            border: `1px solid ${event.color}30`
                          }}>
                            {daysAgo === 1 
                              ? (language === "pt-BR" ? "1 DIA" : language === "en-US" ? "1 DAY" : "1 DÍA")
                              : `${daysAgo} ${language === "pt-BR" ? "DIAS" : language === "en-US" ? "DAYS" : "DÍAS"}`
                            }
                          </span>
                        );
                      }
                    })()}
                  </div>
                  {event.description && (
                    <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                      {event.description}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#999" }}>
                {getRelativeTime(event.date)}
              </div>
              <div style={{ fontSize: 10, color: "#ccc", marginTop: 4 }}>
                {formatDate(event.date)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div
        style={{
          marginTop: 32,
          padding: 24,
          background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
          borderRadius: 24,
          color: "white",
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: "bold", marginBottom: 8 }}>
          {events.length}
        </div>
        <div style={{ fontSize: 13, opacity: 0.95, fontWeight: 500 }}>
          {events.length === 1 
            ? (language === "pt-BR" ? "evento registrado" : language === "en-US" ? "event recorded" : "evento registrado")
            : (language === "pt-BR" ? "eventos registrados" : language === "en-US" ? "events recorded" : "eventos registrados")
          }
        </div>
      </div>
    </div>
  );
}

