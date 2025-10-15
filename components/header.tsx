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

  // lock scroll HTML quand le menu est ouvert
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
              ? "bg-gradient-to-r from-purple-900/85 via-indigo-900/75 to-blue-900/85 backdrop-blur-md border-b border-purple-700/40"
              : "bg-gradient-to-r from-purple-950 via-indigo-950 to-blue-950 border-b border-purple-800/40"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 relative">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 absolute left-0">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KOSMONDE
                </span>
              </Link>

              {/* Nav desktop centrée */}
              <nav className="hidden md:flex space-x-10 mx-auto">
                <Link href="/#services" className="text-gray-100/90 hover:text-cyan-300 transition-colors">
                  Services
                </Link>
                <Link href="/#portfolio" className="text-gray-100/90 hover:text-cyan-300 transition-colors">
                  Portfolio
                </Link>
                <Link href="/#apropos" className="text-gray-100/90 hover:text-cyan-300 transition-colors">
                  À propos
                </Link>
                <Link href="/#contact" className="text-gray-100/90 hover:text-cyan-300 transition-colors">
                  Contact
                </Link>
              </nav>

              {/* Bouton menu mobile */}
              <div className="md:hidden absolute right-0">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen(v => !v)}
                  className="text-white hover:bg-white/10"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Menu plein écran mobile — version claire */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay léger */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panneau */}
          <div
            className="absolute inset-x-0 top-16 bottom-0 bg-white/95 text-gray-900 backdrop-blur-xl border-t border-black/10 shadow-2xl"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
            role="dialog"
            aria-modal="true"
          >
            <nav className="px-4 py-4 space-y-1 overflow-y-auto h-full">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg hover:bg-black/5 active:bg-black/10"
              >
                Accueil
              </Link>
              <Link
                href="/#services"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg hover:bg-black/5 active:bg-black/10"
              >
                Services
              </Link>
              <Link
                href="/#portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg hover:bg-black/5 active:bg-black/10"
              >
                Portfolio
              </Link>
              <Link
                href="/#apropos"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg hover:bg-black/5 active:bg-black/10"
              >
                À propos
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg hover:bg-black/5 active:bg-black/10"
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
