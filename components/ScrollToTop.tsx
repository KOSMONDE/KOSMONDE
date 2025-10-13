"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const WHATSAPP_NUMBER = "33775867250" // format international sans +
const WHATSAPP_TEXT = encodeURIComponent("Bonjour KOSMONDE, j’ai un projet.")
const ICON_PATH = "/WhatsApp.svg.webp" // placé dans /public

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
      aria-label="Contacter sur WhatsApp"
      className="fixed right-5 z-50 rounded-full shadow-xl hover:shadow-2xl transition"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 5rem)" }} // au-dessus du bandeau bas
    >
      <Image
        src={ICON_PATH}
        alt="WhatsApp Business"
        width={64}
        height={64}
        priority
        draggable={false}
        className="block rounded-full"
      />
    </a>
  )
}
