"use client";
import { useEffect, useState } from "react";
import { useI18n, formatTranslation } from "@/lib/i18n";

interface Props {
  treatments: {
    hydration: { count: number; lastDate: string | null };
    nutrition: { count: number; lastDate: string | null };
    reconstruction: { count: number; lastDate: string | null };
  };
}

export default function StreakCard({ treatments }: Props) {
  const { t } = useI18n();
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // Calcular streak (dias consecutivos com check-in)
    const today = new Date();
    let consecutiveDays = 0;
    
    // Verificar últimos 30 dias
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      
      // Verificar se teve algum check-in neste dia
      const hadActivity = [treatments.hydration, treatments.nutrition, treatments.reconstruction].some(t => {
        if (!t.lastDate) return false;
        const lastCheck = new Date(t.lastDate);
        return lastCheck.toDateString() === checkDate.toDateString();
      });
      
      if (hadActivity) {
        consecutiveDays++;
      } else if (i > 0) {
        break; // Streak quebrado
      }
    }
    
    setStreak(consecutiveDays);
    
    // Calcular level baseado no total de tratamentos
    const total = treatments.hydration.count + treatments.nutrition.count + treatments.reconstruction.count;
    setLevel(Math.floor(total / 10) + 1);
  }, [treatments]);

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)",
      borderRadius: 24,
      padding: 28,
      marginBottom: 24,
      color: "white",
      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
            🔥 {t.profile.streak}: <strong style={{ fontSize: 24 }}>{streak} {streak === 1 ? t.profile.day : t.profile.days}</strong>
          </div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>
            ⭐ {t.profile.level} {level} • {treatments.hydration.count + treatments.nutrition.count + treatments.reconstruction.count} {t.treatments.treatmentCount}
          </div>
        </div>
        <div style={{ fontSize: 48 }}>
          {streak >= 30 ? "🏆" : streak >= 14 ? "💎" : streak >= 7 ? "🥇" : "⭐"}
        </div>
      </div>
    </div>
  );
}

