"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe, Palette, Code, Sparkles, X, Mail, User, MessageSquare } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Luxe",
      description: "Boutique en ligne haut de gamme avec interface élégante et expérience utilisateur premium",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "Stripe", "Tailwind"],
      accent: "cyan",
      glowColor: "shadow-cyan-500/25",
    },
    {
      id: 2,
      title: "Portfolio Créatif",
      description: "Site portfolio pour artiste avec galerie interactive et animations fluides",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Framer Motion", "Three.js"],
      accent: "violet",
      glowColor: "shadow-violet-500/25",
    },
    {
      id: 3,
      title: "App SaaS B2B",
      description: "Plateforme SaaS complète avec dashboard analytique et gestion d'équipe",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "PostgreSQL", "Prisma"],
      accent: "emerald",
      glowColor: "shadow-emerald-500/25",
    },
  ]

  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Éléments décoratifs futuristes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grille futuriste en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Header avec logo futuriste */}
      <header className="py-16 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
              <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl border border-gradient-to-r from-cyan-500/50 to-violet-500/50 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-4 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              KOSMONDE
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-lg -z-10"></div>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Créateur d'expériences digitales <span className="text-cyan-400 font-semibold">futuristes</span>. Découvrez
            mes dernières réalisations pour des clients visionnaires.
          </p>

          <div className="flex justify-center space-x-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-ping delay-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-700"></div>
          </div>
        </div>
      </header>

      {/* Section projets futuriste */}
      <main className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white">Mes Réalisations</h2>
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Trois projets qui repoussent les limites du design et de la technologie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className={`group relative bg-slate-900/50 backdrop-blur-xl border-0 overflow-hidden transition-all duration-700 hover:scale-105 ${project.glowColor} hover:shadow-2xl`}
              >
                {/* Bordure futuriste animée */}
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${
                    project.accent === "cyan"
                      ? "from-cyan-500/50 to-blue-500/50"
                      : project.accent === "violet"
                        ? "from-violet-500/50 to-purple-500/50"
                        : "from-emerald-500/50 to-green-500/50"
                  } p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                >
                  <div className="w-full h-full bg-slate-900/90 rounded-lg"></div>
                </div>

                {/* Effet de scan futuriste */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-out"></div>

                <div className="relative z-10">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay futuriste */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        project.accent === "cyan"
                          ? "from-cyan-900/20 to-transparent"
                          : project.accent === "violet"
                            ? "from-violet-900/20 to-transparent"
                            : "from-emerald-900/20 to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>

                    {/* Indicateur de statut */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          project.accent === "cyan"
                            ? "bg-cyan-400"
                            : project.accent === "violet"
                              ? "bg-violet-400"
                              : "bg-emerald-400"
                        } animate-pulse shadow-lg ${
                          project.accent === "cyan"
                            ? "shadow-cyan-400/50"
                            : project.accent === "violet"
                              ? "shadow-violet-400/50"
                              : "shadow-emerald-400/50"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`text-xl font-bold text-white mb-2 group-hover:${
                        project.accent === "cyan"
                          ? "text-cyan-400"
                          : project.accent === "violet"
                            ? "text-violet-400"
                            : "text-emerald-400"
                      } transition-colors duration-300`}
                    >
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
                            project.accent === "cyan"
                              ? "border-cyan-500/30 text-cyan-300 bg-cyan-500/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20"
                              : project.accent === "violet"
                                ? "border-violet-500/30 text-violet-300 bg-violet-500/10 group-hover:border-violet-400/50 group-hover:bg-violet-500/20"
                                : "border-emerald-500/30 text-emerald-300 bg-emerald-500/10 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/20"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link href={`/projects/${project.id}`}>
                      <Button
                        className={`w-full relative overflow-hidden transition-all duration-300 ${
                          project.accent === "cyan"
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/25"
                            : project.accent === "violet"
                              ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25"
                              : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg shadow-emerald-500/25"
                        } text-white border-0 group-hover:scale-105`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Découvrir le projet
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Section contact futuriste */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="relative max-w-4xl mx-auto">
            {/* Bordure futuriste pour la section */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-gradient-to-r from-cyan-500/30 to-violet-500/30 p-12 text-center">
              <div className="mb-8">
                <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-6">
                  Prêt à créer le{" "}
                  <span className="text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text">
                    futur
                  </span>{" "}
                  ?
                </h3>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                  Transformons vos idées en expériences digitales révolutionnaires. Contactez-moi pour repousser les
                  limites de l'innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/start-project">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 group relative overflow-hidden"
                  >
                    <Palette className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Démarrer un projet</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Button>
                </Link>

                <Button
                  size="lg"
                  onClick={() => setIsContactOpen(true)}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300 border-0 group relative overflow-hidden"
                >
                  <Mail className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Contact</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Contact */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative max-w-md w-full">
            {/* Effet de glow pour la popup */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-emerald-500/30 rounded-2xl blur-xl"></div>

            <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Bouton fermer */}
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full mb-4 border border-cyan-500/30">
                  <Mail className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Contactez-moi</h3>
                <p className="text-gray-400">Discutons de votre projet futuriste</p>
              </div>

              {/* Formulaire */}
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/25 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/25 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      placeholder="Décrivez votre projet..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 transition-all duration-300 backdrop-blur-sm resize-none"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white border border-gray-600/30 transition-all duration-300"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Envoyer</span>
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
                  </Button>
                </div>
              </form>

              {/* Infos contact */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="flex justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-300"></div>
                    <span>Devis gratuit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer futuriste */}
      <footer className="py-12 px-4 relative z-10 border-t border-cyan-500/20">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-400"></div>
            <p className="text-gray-400 font-mono text-sm">
              © 2024 KOSMONDE • Crafted with <span className="text-cyan-400">♦</span> for the digital future
            </p>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-400"></div>
          </div>
          <div className="flex justify-center space-x-2">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-violet-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
