import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft, User, Clock } from "lucide-react"
import Link from "next/link"
import { getProjectById, getAllProjects } from "@/lib/portfolio-data"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Cosmic background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="mb-8">
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au portfolio
                </Button>
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  {project.category}
                </Badge>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{project.client}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 text-pretty">{project.fullDescription}</p>
            </div>

            <div className="mb-12">
              <div className="relative p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-1">
                <Card className="bg-slate-50 border-slate-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Détails du projet</h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Client</p>
                          <p className="text-sm text-slate-600">{project.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Durée</p>
                          <p className="text-sm text-slate-600">{project.duration}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2 text-slate-800">Technologies</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, index) => (
                            /* Updated technology badges with colorful cosmic theme */
                            <Badge
                              key={index}
                              variant="outline"
                              className={`text-xs text-white border-0 ${
                                index % 3 === 0 ? "bg-violet-500" : index % 3 === 1 ? "bg-blue-500" : "bg-pink-500"
                              }`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2 text-slate-800">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, index) => (
                            /* Updated tag badges with cosmic colors */
                            <Badge
                              key={index}
                              className={`text-xs text-white border-0 ${
                                index % 4 === 0
                                  ? "bg-purple-500"
                                  : index % 4 === 1
                                    ? "bg-blue-500"
                                    : index % 4 === 2
                                      ? "bg-pink-500"
                                      : "bg-cyan-500"
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {project.url && (
                      <div className="mt-6">
                        <Button
                          asChild
                          className="w-full bg-violet-600 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600"
                        >
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Voir le site
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Fonctionnalités principales
                  </h3>
                  <div className="grid gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            index % 3 === 0 ? "bg-purple-500" : index % 3 === 1 ? "bg-blue-500" : "bg-pink-500"
                          }`}
                        />
                        <p className="text-slate-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {project.images && project.images.length > 1 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Galerie
                    </h3>
                    <div className="grid gap-4">
                      {project.images.slice(1).map((image, index) => (
                        /* Added cosmic border effect to gallery images */
                        <div
                          key={index}
                          className="relative p-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-lg"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${project.title} - Image ${index + 2}`}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Cosmic background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Intéressé par un projet similaire ?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos
              objectifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-violet-600 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600"
              >
                <Link href="/#contact">Démarrer un projet</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
              >
                <Link href="/portfolio">Voir d'autres projets</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
