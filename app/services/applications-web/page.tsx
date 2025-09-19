import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Zap, Lock, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ApplicationsWebPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Code className="h-8 w-8 text-white" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 bg-white/10 border-purple-400/50 text-purple-300">
              Développement Sur Mesure
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">
              Applications Web
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Personnalisées
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
              Développement d'applications web sur mesure pour répondre à vos besoins spécifiques. Solutions robustes et
              évolutives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
            >
              <Link href="/#contact">Discuter de mon Projet</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/#portfolio">Voir nos Applications</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Technologies Modernes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border-purple-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Frontend Moderne</h3>
                <p className="text-muted-foreground mb-4">
                  React, Vue.js, Angular avec interfaces utilisateur intuitives et performantes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Vue.js
                  </Badge>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                    TypeScript
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border-purple-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Backend Robuste</h3>
                <p className="text-muted-foreground mb-4">
                  APIs REST et GraphQL avec bases de données optimisées pour la performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Node.js
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Python
                  </Badge>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                    PostgreSQL
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border-purple-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cloud & DevOps</h3>
                <p className="text-muted-foreground mb-4">
                  Déploiement cloud avec CI/CD automatisé pour une mise en production fluide.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    AWS
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Docker
                  </Badge>
                  <Badge variant="secondary" className="bg-black text-white">
                    Vercel
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Fonctionnalités Avancées
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Performance Optimale</h3>
              <p className="text-gray-300 text-sm">Applications ultra-rapides avec optimisation avancée</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Sécurité Renforcée</h3>
              <p className="text-gray-300 text-sm">Authentification, autorisation et chiffrement des données</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Évolutivité</h3>
              <p className="text-gray-300 text-sm">Architecture modulaire pour grandir avec votre business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Notre Méthodologie
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Analyse", desc: "Étude approfondie de vos besoins métier" },
              { step: "2", title: "Architecture", desc: "Conception technique et choix technologiques" },
              { step: "3", title: "Développement", desc: "Développement agile avec livraisons régulières" },
              { step: "4", title: "Tests", desc: "Tests automatisés et validation qualité" },
              { step: "5", title: "Déploiement", desc: "Mise en production et accompagnement" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-12 w-12 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-white">Transformez Vos Idées en Applications</h2>
          <p className="text-xl text-gray-300 mb-8">
            Discutons de votre projet d'application web personnalisée. Devis gratuit et sans engagement.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
          >
            <Link href="/#contact">Démarrer mon Projet</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
