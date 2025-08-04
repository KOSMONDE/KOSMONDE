"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Github, Calendar, Users, Zap, Globe, Palette, Code, Sparkles } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const projectsData = {
  "1": {
    id: 1,
    title: "E-Commerce Luxe",
    subtitle: "Boutique en ligne premium",
    description:
      "Une plateforme e-commerce haut de gamme développée pour une marque de luxe française. L'interface élégante et l'expérience utilisateur premium offrent une navigation fluide et intuitive.",
    fullDescription:
      "Ce projet représente l'aboutissement de 6 mois de développement intensif pour créer une expérience d'achat en ligne exceptionnelle. Chaque détail a été pensé pour refléter l'élégance et le raffinement de la marque, depuis les animations subtiles jusqu'aux micro-interactions qui guident l'utilisateur.",
    image: "/placeholder.svg?height=400&width=800",
    technologies: ["Next.js", "Stripe", "Tailwind", "Prisma", "PostgreSQL", "Framer Motion"],
    features: [
      "Interface utilisateur premium avec animations fluides",
      "Système de paiement sécurisé avec Stripe",
      "Gestion avancée des stocks et commandes",
      "Dashboard administrateur complet",
      "Optimisation SEO et performances",
      "Design responsive multi-appareils",
    ],
    metrics: {
      duration: "6 mois",
      team: "3 développeurs",
      performance: "98/100 Lighthouse",
    },
    accent: "cyan",
    glowColor: "shadow-cyan-500/25",
    demoUrl: "#",
    githubUrl: "#",
  },
  "2": {
    id: 2,
    title: "Portfolio Créatif",
    subtitle: "Vitrine artistique interactive",
    description:
      "Site portfolio pour un artiste contemporain avec galerie interactive et animations fluides. Une expérience immersive qui met en valeur les œuvres d'art.",
    fullDescription:
      "Un projet passionnant qui combine art et technologie pour créer une expérience unique. Le défi était de créer une interface qui ne détourne pas l'attention des œuvres tout en offrant une navigation innovante et engageante.",
    image: "/placeholder.svg?height=400&width=800",
    technologies: ["React", "Framer Motion", "Three.js", "GSAP", "Sanity CMS", "Vercel"],
    features: [
      "Galerie 3D interactive avec Three.js",
      "Animations complexes et transitions fluides",
      "CMS headless pour gestion du contenu",
      "Optimisation pour les images haute résolution",
      "Mode sombre/clair adaptatif",
      "Expérience mobile immersive",
    ],
    metrics: {
      duration: "4 mois",
      team: "2 développeurs",
      performance: "96/100 Lighthouse",
    },
    accent: "violet",
    glowColor: "shadow-violet-500/25",
    demoUrl: "#",
    githubUrl: "#",
  },
  "3": {
    id: 3,
    title: "App SaaS B2B",
    subtitle: "Plateforme de gestion d'équipe",
    description:
      "Plateforme SaaS complète avec dashboard analytique et gestion d'équipe. Solution tout-en-un pour optimiser la productivité des entreprises.",
    fullDescription:
      "Une application SaaS robuste conçue pour répondre aux besoins complexes des entreprises modernes. Le projet intègre des fonctionnalités avancées d'analyse de données, de gestion d'équipe et de reporting en temps réel.",
    image: "/placeholder.svg?height=400&width=800",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "NextAuth", "Recharts", "Tailwind"],
    features: [
      "Dashboard analytique en temps réel",
      "Gestion complète des équipes et projets",
      "Système d'authentification multi-niveaux",
      "API REST complète et documentée",
      "Notifications push et emails automatisés",
      "Exports de données et rapports personnalisés",
    ],
    metrics: {
      duration: "8 mois",
      team: "5 développeurs",
      performance: "94/100 Lighthouse",
    },
    accent: "emerald",
    glowColor: "shadow-emerald-500/25",
    demoUrl: "#",
    githubUrl: "#",
  },
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projectsData[projectId as keyof typeof projectsData]

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Projet non trouvé</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grille futuriste */}
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-6 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      project.accent === "cyan"
                        ? "bg-cyan-400"
                        : project.accent === "violet"
                          ? "bg-violet-400"
                          : "bg-emerald-400"
                    } animate-pulse`}
                  ></div>
                  <span className="text-gray-300 text-sm">{project.subtitle}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
                <p className="text-xl text-gray-300 max-w-3xl">{project.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description détaillée */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />À propos du projet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">{project.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Fonctionnalités */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-400" />
                  Fonctionnalités clés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  Technologies utilisées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                        project.accent === "cyan"
                          ? "border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:border-cyan-400/50 hover:bg-cyan-500/20"
                          : project.accent === "violet"
                            ? "border-violet-500/30 text-violet-300 bg-violet-500/10 hover:border-violet-400/50 hover:bg-violet-500/20"
                            : "border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:border-emerald-400/50 hover:bg-emerald-500/20"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Métriques du projet */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Informations projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Durée</p>
                    <p className="text-white font-medium">{project.metrics.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-violet-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Équipe</p>
                    <p className="text-white font-medium">{project.metrics.team}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Performance</p>
                    <p className="text-white font-medium">{project.metrics.performance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className={`w-full ${
                    project.accent === "cyan"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/25"
                      : project.accent === "violet"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25"
                        : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg shadow-emerald-500/25"
                  } text-white border-0`}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Voir la démo
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600/30 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500/50 bg-transparent"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code source
                </Button>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Intéressé par ce projet ?</CardTitle>
                <CardDescription className="text-gray-400">
                  Discutons de votre prochain projet similaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/start-project">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg shadow-cyan-500/25">
                    <Palette className="w-4 h-4 mr-2" />
                    Démarrer un projet
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
