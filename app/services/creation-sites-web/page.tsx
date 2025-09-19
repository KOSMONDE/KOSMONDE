import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe, Smartphone, Zap, Rocket } from "lucide-react"
import Link from "next/link"

export default function CreationSitesWebPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Cosmic background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-60 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-float">
                  <Rocket className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-cyan-400/50 text-cyan-300 bg-cyan-400/10">
              Service Premium
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">
              Création de Sites Web
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Professionnels
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty">
              Nous concevons des sites web modernes, performants et sur mesure qui reflètent parfaitement votre identité
              de marque et convertissent vos visiteurs en clients.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8"
              asChild
            >
              <Link href="/#contact">Demander un Devis</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
              asChild
            >
              <Link href="/#portfolio">Voir nos Réalisations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Pourquoi Choisir KOSMONDE ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Design Moderne</h3>
                <p className="text-slate-600">
                  Interfaces élégantes et intuitives qui captivent vos visiteurs dès la première seconde.
                </p>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">100% Responsive</h3>
                <p className="text-slate-600">
                  Parfaitement optimisé pour tous les appareils : mobile, tablette et desktop.
                </p>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Performance Optimale</h3>
                <p className="text-slate-600">Sites ultra-rapides avec un temps de chargement optimisé pour le SEO.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
        {/* Subtle cosmic background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Notre Processus de Création</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group animate-fade-in-up">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Analyse</h3>
              <p className="text-gray-300 text-sm">Étude de vos besoins et de votre marché cible</p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Design</h3>
              <p className="text-gray-300 text-sm">Création de maquettes personnalisées</p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Développement</h3>
              <p className="text-gray-300 text-sm">Codage avec les dernières technologies</p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Livraison</h3>
              <p className="text-gray-300 text-sm">Mise en ligne et formation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Nos Formules
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Site Vitrine</h3>
                <div className="text-3xl font-bold mb-4 text-slate-800">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    1 500€
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Design sur mesure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Responsive design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">SEO optimisé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Formulaire de contact</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50"
                  variant="outline"
                  asChild
                >
                  <Link href="/#contact">Choisir cette formule</Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border-2 border-purple-500/30 bg-white/90 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-6">
                <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white">Populaire</Badge>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Site Business</h3>
                <div className="text-3xl font-bold mb-4 text-slate-800">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                    3 500€
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Tout du Site Vitrine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">CMS intégré</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Blog professionnel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Analytics avancés</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
                  asChild
                >
                  <Link href="/#contact">Choisir cette formule</Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Site Premium</h3>
                <div className="text-3xl font-bold mb-4 text-slate-800">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                    6 500€
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Tout du Site Business</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Fonctionnalités avancées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Intégrations tierces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Support prioritaire</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50"
                  variant="outline"
                  asChild
                >
                  <Link href="/#contact">Choisir cette formule</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Prêt à Lancer Votre Projet ?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et recevoir un devis personnalisé.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8"
            asChild
          >
            <Link href="/#contact">Demander un Devis Gratuit</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
