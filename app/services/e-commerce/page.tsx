import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ShoppingCart, CreditCard, BarChart3, Shield, Truck, Users, Rocket } from "lucide-react"
import Link from "next/link"

export default function ECommercePage() {
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
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-float">
                <Rocket className="h-12 w-12 text-white" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-cyan-400/50 text-cyan-300 bg-cyan-400/10">
              E-commerce Expert
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Solutions{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                E-commerce
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Créez votre boutique en ligne performante avec nos solutions e-commerce sur mesure. Vendez plus, gérez
              mieux.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8"
              asChild
            >
              <Link href="/#contact">Lancer ma Boutique</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
              asChild
            >
              <Link href="/#portfolio">Voir nos E-shops</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Fonctionnalités E-commerce Avancées
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShoppingCart, title: "Catalogue Produits", text: "Gestion complète de vos produits avec variantes, stock et catégories." },
              { icon: CreditCard, title: "Paiements Sécurisés", text: "Intégration de multiples moyens de paiement sécurisés (Stripe, PayPal...)." },
              { icon: BarChart3, title: "Analytics Avancés", text: "Tableaux de bord détaillés pour suivre vos ventes et performances." },
              { icon: Shield, title: "Sécurité Renforcée", text: "Protection SSL, conformité RGPD et sécurisation des données clients." },
              { icon: Truck, title: "Gestion Livraisons", text: "Intégration transporteurs et suivi automatique des commandes." },
              { icon: Users, title: "Espace Client", text: "Comptes clients avec historique, wishlist et gestion des adresses." },
            ].map((item, i) => (
              <Card
                key={i}
                className="group hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{item.title}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Nos Solutions E-commerce
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">E-shop Essentiel</h3>
                <div className="text-3xl font-bold mb-4 text-slate-800">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">4 500€</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Jusqu'à 100 produits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Paiements sécurisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Gestion des stocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Interface d'administration</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50"
                  variant="outline"
                  asChild
                >
                  <Link href="/#contact">Choisir cette solution</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border-2 border-purple-500/30 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white">Recommandé</Badge>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">E-shop Pro</h3>
                <div className="text-3xl font-bold mb-4 text-slate-800">
                  À partir de{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                    8 500€
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Produits illimités</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Multi-devises & langues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Analytics avancés</span>
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
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
                  asChild
                >
                  <Link href="/#contact">Choisir cette solution</Link>
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
          <h2 className="text-3xl font-bold mb-6 text-white">Lancez Votre Boutique en Ligne</h2>
          <p className="text-xl text-gray-200 mb-8">
            Transformez votre activité avec une solution e-commerce performante et sur mesure.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8"
            asChild
          >
            <Link href="/#contact">Demander un Devis</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
