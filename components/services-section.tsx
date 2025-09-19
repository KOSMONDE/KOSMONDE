"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Palette, Zap, Search, Wrench, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

const services = [
  {
    icon: Code,
    title: "Création de Sites Web",
    description: "Sites vitrine, corporate et sur mesure avec design moderne et responsive.",
    slug: "creation-sites-web",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne performantes avec gestion complète des ventes.",
    slug: "e-commerce",
  },
  {
    icon: Zap,
    title: "Applications Web",
    description: "Développement d'applications web sur mesure et performantes.",
    slug: "applications-web",
  },
  {
    icon: Search,
    title: "SEO & Marketing Digital",
    description: "Référencement naturel et stratégies marketing pour booster votre visibilité.",
    slug: "seo-marketing",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Suivi, mises à jour et support technique réactif pour vos projets.",
    slug: "maintenance-support",
  },
  {
    icon: Palette,
    title: "Consulting Digital",
    description: "Accompagnement stratégique pour votre transformation digitale.",
    slug: "consulting-digital",
  },
]

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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".service-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 sm:px-6 lg:px-8 cosmic-light-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold cosmic-title mb-4">Nos Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Une gamme complète de services digitaux pour accompagner votre croissance et maximiser votre impact en
            ligne.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full cosmic-card bg-white/80 service-card opacity-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 cosmic-icon" />
                </div>
                <CardTitle className="text-xl text-slate-800">{service.title}</CardTitle>
                <CardDescription className="text-base text-slate-600">{service.description}</CardDescription>
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
