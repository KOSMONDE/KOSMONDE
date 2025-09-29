"use client"
import { useState, useEffect } from "react"
import { Rocket } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        aria-label="Remonter en haut"
        className="fixed bottom-20 right-6 z-50 p-3 rounded-full 
                   bg-gradient-to-r from-cyan-400 to-purple-500 text-white 
                   shadow-lg hover:from-cyan-500 hover:to-purple-600 
                   transition-all animate-bounce"
      >
        <Rocket className="h-6 w-6" />
      </button>
    )
  )
}
