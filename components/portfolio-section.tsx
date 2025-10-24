"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ExternalLink, ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllProjects } from "@/lib/portfolio-data"

export default function PortfolioSection() {
  const projects = getAllProjects().slice(0, 3)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const container = entry.target as HTMLElement
          const cards = container.querySelectorAll<HTMLElement>(".portfolio-card")
          cards.forEach((card, index) => {
            setTimeout(() => card.classList.add("fade-in-up"), index * 150)
          })
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 cosmic-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nos Réalisations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Découvrez quelques-uns de nos projets récents et laissez-vous
            inspirer par la qualité de nos réalisations.
          </p>
        </div>

        {/* Grille des projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const baseUrl = (project as any).url || (project as any).liveUrl
            const isRR =
              project.id === "rr-coiffure" ||
              (project as any).slug === "rr-coiffure" ||
              /rr\s*coiffure/i.test(project.title)
            const liveUrl = isRR ? "https://rr-coiffure.com" : baseUrl

            return (
              <Card
                key={project.id}
                className="group overflow-hidden cosmic-card bg-white/10 backdrop-blur-md border-white/20 portfolio-card opacity-0 hover:bg-white/20 transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/portfolio/${project.id}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/90 text-slate-800 hover:bg-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Voir le projet
                      </Button>
                    </Link>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-cyan-300 bg-cyan-400/20 px-2 py-1 rounded border border-cyan-400/30">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded border border-purple-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bouton aux couleurs du thème */}
                  {liveUrl ? (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="mt-6 w-full border-purple-400/50 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 shadow-[0_0_0_1px_rgba(168,85,247,0.25)]"
                    >
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visiter le site
                      </a>
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bouton global */}
        <div className="text-center mt-12 relative z-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 bg-transparent"
          >
            <Link href="/portfolio" aria-label="Voir tous nos projets" prefetch={false}>
              Voir tous nos projets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
