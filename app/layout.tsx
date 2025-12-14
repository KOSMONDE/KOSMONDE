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
        <div className="relative min-h-screen">
          <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-screen">
            {[
              { left: "2%", delay: "0.2s", duration: "9.2s", size: "10px" },
              { left: "8%", delay: "0.9s", duration: "10s", size: "8px" },
              { left: "14%", delay: "0.6s", duration: "8.4s", size: "9px" },
              { left: "21%", delay: "1.2s", duration: "9.8s", size: "7px" },
              { left: "28%", delay: "1s", duration: "9.6s", size: "11px" },
              { left: "34%", delay: "0.5s", duration: "8.1s", size: "8px" },
              { left: "40%", delay: "0.7s", duration: "7.9s", size: "8px" },
              { left: "46%", delay: "1.3s", duration: "9.4s", size: "9px" },
              { left: "52%", delay: "1.4s", duration: "8.9s", size: "10px" },
              { left: "58%", delay: "0.4s", duration: "8.6s", size: "7px" },
              { left: "66%", delay: "0.3s", duration: "9.1s", size: "9px" },
              { left: "72%", delay: "1.5s", duration: "9.9s", size: "8px" },
              { left: "78%", delay: "1.1s", duration: "8.5s", size: "11px" },
              { left: "84%", delay: "0.2s", duration: "8.8s", size: "9px" },
              { left: "90%", delay: "0.8s", duration: "9.7s", size: "8px" },
              { left: "96%", delay: "1.6s", duration: "9.3s", size: "10px" },
            ].map((flake, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="snowflake"
                style={{
                  left: flake.left,
                  animationDelay: flake.delay,
                  animationDuration: flake.duration,
                  fontSize: flake.size,
                }}
              >
                *
              </span>
            ))}
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
