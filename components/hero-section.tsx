"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, Orbit, Satellite } from "lucide-react"

const scrollToContact = () => {
  const contactSection = document.getElementById("contact")
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const firstInput = contactSection.querySelector("input")
      if (firstInput) {
        firstInput.focus()
      }
    }, 500)
  }
}

const scrollToPortfolio = () => {
  const portfolioSection = document.getElementById("portfolio")
  if (portfolioSection) {
    portfolioSection.scrollIntoView({ behavior: "smooth" })
  }
}

export default function HeroSection() {
  // 🔹 Fix hydration : attendre le rendu client
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // 🔹 Générer les étoiles une seule fois
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
      })),
    []
  )

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>

      {/* 🌟 Étoiles animées */}
      {mounted && (
        <div className="absolute inset-0">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/80 rounded-full animate-pulse"
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance drop-shadow-lg">
              Embarquez pour votre
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 block drop-shadow-none">
                univers digital
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl text-pretty leading-relaxed drop-shadow-sm">
              Nous concevons des sites web performants, modernes et sur mesure pour donner vie à vos idées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                onClick={scrollToContact}
              >
                Commencer mon projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-slate-900 rounded-full transition-all duration-300 backdrop-blur-sm"
                onClick={scrollToPortfolio}
              >
                Voir nos réalisations
              </Button>
            </div>
          </div>

          {/* Illustration à droite */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="w-80 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-cyan-500/30 p-4">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded border border-cyan-400/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Rocket className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-cyan-300 text-sm font-medium">KOSMONDE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments orbitants */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <Orbit className="h-8 w-8 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                <Satellite className="h-6 w-6 text-white" />
              </div>

              {/* Anneaux lumineux */}
              <div className="absolute inset-0 -z-10">
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-500/20 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-blue-500/20 rounded-full animate-spin"
                  style={{ animationDuration: "15s", animationDirection: "reverse" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trois blocs d’infos */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Développement sur mesure</h3>
            <p className="text-gray-200">
              Solutions techniques adaptées à vos besoins avec les meilleures technologies.
            </p>
          </div>

          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Orbit className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Design moderne</h3>
            <p className="text-gray-200">Interfaces élégantes et intuitives alignées à votre identité de marque.</p>
          </div>

          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Satellite className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Performance optimale</h3>
            <p className="text-gray-200">Sites rapides, sécurisés et optimisés pour le SEO.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
