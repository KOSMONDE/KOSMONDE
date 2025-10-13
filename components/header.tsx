"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Rocket } from "lucide-react"
import Link from "next/link"
import CosmicMarquee from "@/components/cosmic-marquee"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (isMenuOpen) {
      const prev = html.style.overflow
      html.style.overflow = "hidden"
      return () => {
        html.style.overflow = prev
      }
    }
  }, [isMenuOpen])

  return (
    <>
      <div className="sticky top-0 z-50">
        <header
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-blue-900/90 backdrop-blur-md border-b border-purple-700/50"
              : "bg-gradient-to-r from-purple-950 via-indigo-950 to-blue-950 border-b border-purple-800/50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 relative">
              {/* Logo à gauche */}
              <Link href="/" className="flex items-center gap-2 absolute left-0">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KOSMONDE
                </span>
              </Link>

              {/* Navigation centrée */}
              <nav className="hidden md:flex space-x-10 mx-auto">
                <Link href="/#services" className="text-gray-200 hover:text-cyan-400 transition-colors">
                  Services
                </Link>
                <Link href="/#portfolio" className="text-gray-200 hover:text-cyan-400 transition-colors">
                  Portfolio
                </Link>
                <Link href="/#apropos" className="text-gray-200 hover:text-cyan-400 transition-colors">
                  À propos
                </Link>
                <Link href="/#contact" className="text-gray-200 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </nav>

              {/* Bouton menu mobile à droite */}
              <div className="md:hidden absolute right-0">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Ouvrir le menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((v) => !v)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Menu plein écran mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-x-0 top-16 bottom-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
            <nav
              className="px-4 py-4 space-y-1 overflow-y-auto h-full"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg text-white/90 hover:bg-white/10"
              >
                Accueil
              </Link>
              <Link
                href="/#services"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg text-white/90 hover:bg-white/10"
              >
                Services
              </Link>
              <Link
                href="/#portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg text-white/90 hover:bg-white/10"
              >
                Portfolio
              </Link>
              <Link
                href="/#apropos"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg text-white/90 hover:bg-white/10"
              >
                À propos
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg text-white/90 hover:bg-white/10"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Bande défilante */}
      <div className={`fixed bottom-0 left-0 w-full z-40 ${isMenuOpen ? "hidden md:block" : ""}`}>
        <CosmicMarquee />
      </div>
    </>
  )
}

export default Header
