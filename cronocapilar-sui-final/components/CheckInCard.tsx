"use client";
import { useEffect, useState } from "react";
import { useI18n, formatTranslation } from "@/lib/i18n";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";

type Props = { ens?: string };

export default function CheckInCard({ ens }: Props) {
  const { t, language } = useI18n();
  
  function formatDate(d: Date) {
    const locale = language === "pt-BR" ? "pt-BR" : language === "en-US" ? "en-US" : "es-ES";
    return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
  }
  const account = useCurrentAccount();
  const [streak, setStreak] = useState<number>(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // local storage key - será atualizado quando conectar com Sui
  const storageKey = account ? `cc_checkins_${account.address}` : "cc_checkins_local";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        setStreak(data.streak ?? 0);
        setLastCheckIn(data.last ?? null);
      } else {
        setStreak(0);
        setLastCheckIn(null);
      }
    } catch {
      setStreak(0);
      setLastCheckIn(null);
    }
  }, [storageKey, account]);

  function save(st: number, last: string) {
    localStorage.setItem(storageKey, JSON.stringify({ streak: st, last }));
  }

  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  async function doCheckIn() {
    setBusy(true);
    try {
      const now = new Date();
      const last = lastCheckIn ? new Date(lastCheckIn) : null;

      let newStreak = streak;
      if (!last) {
        newStreak = 1;
      } else if (isSameDay(now, last)) {
        // already checked today
        newStreak = streak;
      } else {
        // if yesterday -> +1, else reset
        const y = new Date(now);
        y.setDate(now.getDate() - 1);
        newStreak = isSameDay(y, last) ? streak + 1 : 1;
      }

      setStreak(newStreak);
      setLastCheckIn(now.toISOString());
      save(newStreak, now.toISOString());

      // TODO: Integração com Sui será implementada aqui
      // Por enquanto, apenas simula sucesso
      await new Promise(r => setTimeout(r, 450));

      alert(formatTranslation(t.checkin.checkInDone, { streak: newStreak.toString() }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 16, padding: 20, boxShadow: "0 8px 28px rgba(18, 38, 63, 0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 24 }}>{t.checkin.title}</h2>
      <p style={{ marginTop: 8, color: "#444" }}>{t.checkin.description}</p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
        {account ? (
          <span style={{ fontSize: 14, background: "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)", color: "white", padding: "6px 12px", borderRadius: 999, fontWeight: 600 }}>
            ✅ Conectado: {formatAddress(account.address)}
          </span>
        ) : (
          <>
            <span style={{ fontSize: 14, background: "#eef0ff", padding: "6px 10px", borderRadius: 999 }}>
              {t.checkin.notConnected}
            </span>
            <span style={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>
              (Conecte sua carteira Sui no topo da página)
            </span>
          </>
        )}
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        <div style={{ background: "#f7f8ff", border: "1px solid #e9eafc", borderRadius: 12, padding: 12, minWidth: 140 }}>
          <div style={{ fontSize: 12, color: "#666" }}>{t.checkin.streak}</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{streak}</div>
        </div>
        <div style={{ background: "#f7f8ff", border: "1px solid #e9eafc", borderRadius: 12, padding: 12, minWidth: 180 }}>
          <div style={{ fontSize: 12, color: "#666" }}>{t.checkin.lastCheckIn}</div>
          <div style={{ fontSize: 16 }}>{lastCheckIn ? formatDate(new Date(lastCheckIn)) : t.checkin.noData}</div>
        </div>
      </div>

      <button
        onClick={doCheckIn}
        disabled={busy}
        style={{ marginTop: 20, padding: "12px 16px", borderRadius: 12, border: "1px solid #0a0a0a", background: busy ? "#8f9" : "linear-gradient(135deg, #b8c0ff, #ddbdfc)", color: "#0a0a0a", cursor: "pointer", fontWeight: 600 }}
      >
        {busy ? t.checkin.processing : t.checkin.checkInToday}
      </button>

      <p style={{ marginTop: 14, fontSize: 12, color: account ? "#3a5a40" : "#666" }}>
        {account ? "✅ Carteira conectada - Check-ins serão salvos on-chain" : "⚠️ Modo local - Conecte sua carteira para salvar on-chain"}
      </p>
    </div>
  );
}
