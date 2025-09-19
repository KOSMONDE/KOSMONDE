import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Lightbulb, Target, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function ConsultingDigitalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Cosmic background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-6">
              <img
                src="/rotating-planet-animation-gif.png"
                alt="Planète en rotation"
                className="mx-auto animate-spin w-16 h-16"
                style={{ animationDuration: "10s" }}
              />
            </div>
            <Badge variant="outline" className="mb-4 border-cyan-400/30 text-cyan-300 bg-cyan-400/10">
              Expertise Stratégique
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">
              Consulting
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Digital
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
              Accompagnement stratégique pour votre transformation digitale. Optimisez vos processus et boostez votre
              croissance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
              asChild
            >
              <Link href="/#contact">Consultation Gratuite</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/#portfolio">Nos Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Domaines d'Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
              <CardContent className="p-6">
                <Lightbulb className="h-12 w-12 text-purple-600 mb-4 group-hover:text-cyan-500 transition-colors" />
                <h3 className="text-xl font-semibold mb-3">Stratégie Digitale</h3>
                <p className="text-muted-foreground">
                  Définition de votre roadmap digitale et identification des opportunités de croissance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-cyan-600 mb-4 group-hover:text-purple-500 transition-colors" />
                <h3 className="text-xl font-semibold mb-3">Transformation</h3>
                <p className="text-muted-foreground">Accompagnement dans la digitalisation de vos processus métier.</p>
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-pink-600 mb-4 group-hover:text-purple-500 transition-colors" />
                <h3 className="text-xl font-semibold mb-3">Optimisation</h3>
                <p className="text-muted-foreground">
                  Amélioration des performances de vos outils et processus existants.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Cosmic background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Notre Approche Consulting</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Méthodologie Éprouvée</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Audit & Diagnostic</h4>
                    <p className="text-gray-300 text-sm">
                      Analyse complète de votre écosystème digital actuel et identification des axes d'amélioration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Stratégie Personnalisée</h4>
                    <p className="text-gray-300 text-sm">
                      Élaboration d'une feuille de route adaptée à vos objectifs et contraintes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Accompagnement</h4>
                    <p className="text-gray-300 text-sm">Support dans la mise en œuvre et formation de vos équipes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Suivi & Optimisation</h4>
                    <p className="text-gray-300 text-sm">
                      Mesure des résultats et ajustements continus pour maximiser le ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">50+</div>
                  <div className="text-sm text-gray-300">Entreprises accompagnées</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">+40%</div>
                  <div className="text-sm text-gray-300">ROI moyen</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-400 mb-1">95%</div>
                  <div className="text-sm text-gray-300">Satisfaction client</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">6 mois</div>
                  <div className="text-sm text-gray-300">Durée moyenne</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Services de Consulting
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-3">Transformation Digitale</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Audit des processus existants
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Définition de la stratégie digitale
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Accompagnement au changement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Formation des équipes
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-cyan-600 mb-4" />
                <h3 className="text-lg font-semibold mb-3">Optimisation Performance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Analyse des performances actuelles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Identification des goulots d'étranglement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Plan d'optimisation personnalisé
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Suivi des améliorations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-pink-600 mb-4" />
                <h3 className="text-lg font-semibold mb-3">Stratégie Marketing Digital</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Définition des personas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Stratégie de contenu
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Plan de communication digitale
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Mesure du ROI
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-3">Croissance & Scale-up</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Analyse des opportunités de croissance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Stratégie de développement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Optimisation des conversions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-500" />
                    Accompagnement scale-up
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Formules de Consulting
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Audit & Recommandations</h3>
                <div className="text-3xl font-bold mb-4">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    2 500€
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Audit complet (2-3 jours)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Rapport détaillé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Plan d'action prioritaire</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Présentation des résultats</span>
                  </li>
                </ul>
                <Button
                  className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/#contact">Commander un Audit</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-cyan-400 bg-gradient-to-br from-cyan-50 to-purple-50">
              <CardContent className="p-6">
                <Badge className="mb-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white">Populaire</Badge>
                <h3 className="text-xl font-semibold mb-2">Accompagnement Complet</h3>
                <div className="text-3xl font-bold mb-4">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    8 500€
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Tout de l'Audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Accompagnement 3-6 mois</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Formation des équipes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Suivi mensuel des KPIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Support prioritaire</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                  asChild
                >
                  <Link href="/#contact">Démarrer l'Accompagnement</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Cosmic background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Accélérez Votre Transformation Digitale</h2>
          <p className="text-xl text-gray-300 mb-8">
            Bénéficiez de notre expertise pour optimiser votre stratégie digitale et booster votre croissance.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
            asChild
          >
            <Link href="/#contact">Consultation Gratuite</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
