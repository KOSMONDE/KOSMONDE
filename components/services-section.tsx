"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Wrench, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

// --- Données : 3 services principaux ---
const services = [
  {
    icon: Code,
    title: "Création de Sites Web",
    description:
      "Sites vitrine modernes, rapides et optimisés pour le référencement. Conçus sur mesure pour refléter votre image de marque.",
    slug: "creation-sites-web",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Sécurité, mises à jour et surveillance continue pour garantir la stabilité et la performance de votre site.",
    slug: "maintenance-support",
  },
  {
    icon: Palette,
    title: "Consulting Digital",
    description:
      "Audit, stratégie et accompagnement sur mesure pour optimiser vos projets web et votre présence digitale.",
    slug: "consulting-digital",
    badge: "Nouveauté", // badge affiché à côté du titre
  },
]

// --- Scroll fluide vers la section contact ---
const scrollToContact = () => {
  const contactSection = document.getElementById("contact")
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => contactSection.querySelector("input")?.focus(), 500)
  }
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Animation d’apparition
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".service-card")
              .forEach((card, index) =>
                setTimeout(() => card.classList.add("fade-in-up"), index * 100),
              )
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // --- Rendu ---
  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 sm:px-6 lg:px-8 cosmic-light-bg">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold cosmic-title mb-4">Nos Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Trois solutions clés pour construire, maintenir et développer votre présence digitale.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="h-full cosmic-card bg-white/80 service-card opacity-0"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 cosmic-icon" />
                </div>

                {/* Titre + badge */}
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-xl text-slate-800 flex-1">
                    {service.title}
                  </CardTitle>
                  {service.badge && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold
                      bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-sm"
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                <CardDescription className="text-base text-slate-600">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Link href={`/services/${service.slug}`}>
                  <Button
                    variant="outline"
                    className="w-full group bg-gradient-to-r from-cyan-400 to-purple-500 text-white border-transparent hover:from-cyan-500 hover:to-purple-600 transition-all duration-300"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA principal */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Commencer mon projet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
