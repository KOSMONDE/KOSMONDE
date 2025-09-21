import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Toaster } from "@/components/ui/use-toast"

export const metadata: Metadata = {
  title: "KOSMONDE - Création de Sites Web & Services Numériques",
  description:
    "Agence web française spécialisée dans la création de sites web professionnels et services numériques sur mesure.",
  generator: "v0.app",
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
        <Toaster />
      </body>
    </html>
  )
}
