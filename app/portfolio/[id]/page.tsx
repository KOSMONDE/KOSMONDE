import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  ArrowLeft,
  User,
  Clock,
  Calendar,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { getProjectById, getAllProjects } from "@/lib/portfolio-data"

// Mapping d’affichage du statut
const STATUS_UI = {
  en_cours: { label: "En cours", text: "text-amber-600", bg: "bg-amber-100", Icon: Clock },
  termine: { label: "Terminé", text: "text-green-600", bg: "bg-green-100", Icon: CheckCircle },
  pause: { label: "En pause", text: "text-gray-600", bg: "bg-gray-100", Icon: Calendar },
} as const

interface ProjectPageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({ id: project.id }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id)
  if (!project) notFound()

  const st = (project as any).status ?? "termine"
  const { label: statusLabel, text: statusText, bg: statusBg, Icon: StatusIcon } =
    STATUS_UI[st as keyof typeof STATUS_UI]

  return (
    <div className="min-h-screen">
      <Header />
      {/* Si Header est fixed/sticky et ~64px de haut, décommente : */}
      {/* <div className="h-16" /> */}

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700" />
            <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse delay-300" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au portfolio
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-3 mb-6">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1">
                  {project.category}
                </Badge>
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300">{project.client}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="relative p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl">
                <img
                  src={
                    project.image ||
                    "/placeholder.svg?height=600&width=1200&query=modern web application mockup"
                  }
                  alt={project.title}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <Card className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Détails du projet
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Client</p>
                          <p className="text-gray-600">{project.client}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Durée</p>
                          <p className="text-gray-600">{project.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${statusBg}`}>
                          <StatusIcon className={`h-5 w-5 ${statusText}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Statut</p>
                          <p className={`${statusText} font-medium`}>{statusLabel}</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-3 text-gray-900">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              className={`text-white border-0 px-3 py-1 ${
                                index % 4 === 0
                                  ? "bg-violet-500"
                                  : index % 4 === 1
                                  ? "bg-blue-500"
                                  : index % 4 === 2
                                  ? "bg-pink-500"
                                  : "bg-cyan-500"
                              }`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-3 text-gray-900">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={`border-2 ${
                                index % 4 === 0
                                  ? "border-purple-300 text-purple-700"
                                  : index % 4 === 1
                                  ? "border-blue-300 text-blue-700"
                                  : index % 4 === 2
                                  ? "border-pink-300 text-pink-700"
                                  : "border-cyan-300 text-cyan-700"
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {project.url && (
                      <div className="mt-8">
                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5 mr-2" />
                            Visiter le site
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <div className="mb-12">
                  <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Fonctionnalités principales
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            index % 4 === 0
                              ? "bg-purple-100"
                              : index % 4 === 1
                              ? "bg-blue-100"
                              : index % 4 === 2
                              ? "bg-pink-100"
                              : "bg-cyan-100"
                          }`}
                        >
                          {index % 4 === 0 ? (
                            <CheckCircle className="h-5 w-5 text-purple-600" />
                          ) : index % 4 === 1 ? (
                            <Zap className="h-5 w-5 text-blue-600" />
                          ) : index % 4 === 2 ? (
                            <Star className="h-5 w-5 text-pink-600" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-cyan-600" />
                          )}
                        </div>
                        <p className="text-gray-700 font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {project.images && project.images.length > 1 && (
                  <div>
                    <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Galerie du projet
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.images.slice(1).map((image, index) => (
                        <div
                          key={index}
                          className="group relative p-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-xl hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={
                              image ||
                              `/placeholder.svg?height=300&width=500&query=project screenshot ${index + 1}`
                            }
                            alt={`${project.title} - Capture ${index + 2}`}
                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Prêt à créer votre projet ?
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transformons vos idées en réalité digitale. Contactez-nous pour discuter de votre projet et découvrir
              comment nous pouvons vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="/#contact">Démarrer un projet</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent px-8 py-4 text-lg transition-all duration-300"
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
