import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOSMONDE – Création de sites web clairs et efficaces",
  description:
    "KOSMONDE crée des sites web modernes et clairs pour indépendants, petites entreprises et projets créatifs.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-50 antialiased">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
