"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Rocket } from "lucide-react"
import Link from "next/link"
import CosmicMarquee from "@/components/cosmic-marquee"

const scrollToContact = () => {
  const contactSection = document.getElementById("contact")
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const firstInput = contactSection.querySelector("input")
      if (firstInput) firstInput.focus()
    }, 500)
  }
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ✅ Header sticky seul */}
      <div className="sticky top-0 z-50">
        <header
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-700"
              : "bg-slate-900 border-b border-slate-800"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KOSMONDE
                </span>
              </Link>

              {/* Navigation Desktop */}
              <nav className="hidden md:flex space-x-8">
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

              {/* CTA Desktop */}
              <div className="hidden md:flex">
                <Button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:from-cyan-500 hover:to-purple-600"
                >
                  Réserver une consultation
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Ouvrir le menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 border-t border-slate-800">
                  <Link href="/" className="block px-3 py-2 text-gray-200 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>
                    Accueil
                  </Link>
                  <Link href="/#services" className="block px-3 py-2 text-gray-200 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>
                    Services
                  </Link>
                  <Link href="/#portfolio" className="block px-3 py-2 text-gray-200 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>
                    Portfolio
                  </Link>
                  <Link href="/#apropos" className="block px-3 py-2 text-gray-200 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>
                    À propos
                  </Link>
                  <Link href="/#contact" className="block px-3 py-2 text-gray-200 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </Link>
                  <div className="px-3 py-2">
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:from-cyan-500 hover:to-purple-600"
                      onClick={() => {
                        scrollToContact()
                        setIsMenuOpen(false)
                      }}
                    >
                      Réserver une consultation
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* ✅ Bandeau promo fixé en bas de l’écran */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <CosmicMarquee />
      </div>
    </>
  )
}

export default Header
