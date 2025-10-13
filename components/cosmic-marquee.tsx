"use client"

import { useState, useEffect } from "react"

interface CosmicMarqueeProps {
  messages?: string[]
  speed?: number
  className?: string
}

const defaultMessages = [
  "🏆 100 % de nos clients recommandent KOSMONDE",
  "🧠 Conception sur mesure, pensée pour votre marque ",
  "🚀 Mettez votre site en ligne en moins de 7 jours",
  "🔒 Sécurité et performance garanties"
]

export default function CosmicMarquee({
  messages = defaultMessages,
  speed = 40,
  className = "",
}: CosmicMarqueeProps) {
  const [stars, setStars] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([])

  useEffect(() => {
    const generatedStars = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className={`relative overflow-hidden h-12 flex items-center ${className}`}>
      {/* Fond galactique */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900">
        <div className="absolute inset-0 opacity-30">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>
      </div>

      {/* Texte défilant */}
      <div className="relative flex items-center h-full whitespace-nowrap overflow-hidden w-full">
        <div
          className="flex animate-marquee"
          style={{ animationDuration: `${speed}s` }}
        >
          {messages.concat(messages).map((message, index) => (
            <span
              key={index}
              className="inline-block px-8 text-sm font-medium bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
            >
              {message}
            </span>
          ))}
        </div>
      </div>

      {/* Dégradés */}
      <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-purple-900 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-pink-900 to-transparent pointer-events-none z-10" />
    </div>
  )
}
