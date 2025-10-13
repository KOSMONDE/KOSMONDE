import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getAllProjects } from "@/lib/portfolio-data"

export default function PortfolioPage() {
  const projects = getAllProjects()

  return (
    <div className="min-h-screen">
      <Header />
      {/* Si ton Header est fixed/sticky, décommente la ligne suivante et ajuste la hauteur */}
      {/* <div className="h-16" /> */}

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Éléments de fond */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700" />
            <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-300" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Notre Portfolio
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
                Découvrez l'ensemble de nos réalisations et projets clients. Chaque projet reflète notre expertise et
                notre engagement envers l'excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/portfolio/${project.id}`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Voir le projet
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`text-xs px-2 py-1 rounded-full text-white ${
                            tagIndex % 3 === 0
                              ? "bg-violet-500/30 border border-violet-400/50"
                              : tagIndex % 3 === 1
                                ? "bg-blue-500/30 border border-blue-400/50"
                                : "bg-pink-500/30 border border-pink-400/50"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/portfolio/${project.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-violet-600 border-violet-500 text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:border-purple-400 transition-all duration-300"
                      >
                        Voir les détails
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
