"use client";
import { I18nProvider } from "@/lib/i18n";
import CheckInCard from "@/components/CheckInCard";

export default function CheckInPage() {
  return (
    <I18nProvider>
      <CheckInCard />
    </I18nProvider>
  );
}
