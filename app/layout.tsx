import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@/styles/globals.css"
import { Toaster } from "sonner"  
import ScrollToTop from "@/components/ScrollToTop" // 👈 import du composant

export const metadata: Metadata = {
  title: "KOSMONDE - Création de Sites Web & Services Numériques",
  description:
    "Agence web française spécialisée dans la création de sites web professionnels et services numériques sur mesure.",
  generator: "v0.app",
  icons: {
    icon: "/rocket.svg", // 👈 favicon fusée
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Toaster position="bottom-right" richColors /> {/* 👈 zone des toasts */}
        <ScrollToTop /> {/* 👈 bouton retour en haut */}
      </body>
    </html>
  )
}
