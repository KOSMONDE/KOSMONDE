"use client"

import { useEffect, useState } from "react"

const WHATSAPP_NUMBER = "33775867250"
const WHATSAPP_TEXT = encodeURIComponent("Bonjour KOSMONDE, j’ai un projet.")

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed right-5 z-50 block"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 5rem)" }}
    >
      {/* IMPORTANT: <img>, pas <Image>, aucune coupe */}
      <img
        src="/WhatsApp.svg.webp"
        alt="WhatsApp"
        width={68}
        height={68}
        decoding="async"
        draggable={false}
        className="block"
        style={{
          /* évite la coupe et le halo */
          padding: "2px",                 // micro-espace pour la pointe
          background: "transparent",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,.25))",
        }}
      />
    </a>
  )
}
