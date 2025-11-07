import "./globals.css";
import { SuiWalletProvider } from "@/lib/sui-provider";
import SuiWatermark from "@/components/SuiWatermark";

export const metadata = {
  title: "CronoCapilar — Onchain Proof of Self‑Care",
  description: "CronoCapilar turns your haircare routine into onchain proof of self-care.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SuiWalletProvider>
          <div className="container">
            {children}
          </div>
          <SuiWatermark />
        </SuiWalletProvider>
      </body>
    </html>
  );
}
