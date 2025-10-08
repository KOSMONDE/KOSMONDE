import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Wrench, Zap, Rocket } from "lucide-react"
import Link from "next/link"

export default function MaintenanceSupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Cosmic background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center animate-float">
                <Rocket className="h-12 w-12 text-white" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-cyan-400/50 text-cyan-300 bg-cyan-400/10">
              Support 24/7
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Maintenance &{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Gardez votre site web performant et sécurisé avec nos services de maintenance et support technique
              professionnel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8"
              asChild
            >
              <Link href="/#contact">Souscrire un Plan</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
              asChild
            >
              <Link href="/#contact">Support d'Urgence</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Services de Maintenance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Sécurité", text: "Mises à jour de sécurité, sauvegardes automatiques et monitoring 24/7." },
              { icon: Zap, title: "Performance", text: "Optimisation continue des performances et temps de chargement." },
              { icon: Wrench, title: "Corrections", text: "Résolution rapide des bugs et problèmes techniques." },
            ].map((item, i) => (
              <Card key={i} className="group hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
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

      {/* Features Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <div className="max-w-6xl mx-auto relative z-10">
    <h2 className="text-3xl font-bold text-center mb-12 text-white">
      Ce Qui Est Inclus
    </h2>

    <div className="grid md:grid-cols-2 gap-12">
      {[
        {
          title: "Maintenance Technique",
          points: [
            ["Mises à jour automatiques", "CMS, plugins et frameworks toujours à jour"],
            ["Sauvegardes quotidiennes", "Sauvegarde automatique avec restauration rapide"],
            ["Monitoring 24/7", "Surveillance continue de la disponibilité"],
            ["Optimisation performance", "Cache, compression et optimisation images"],
          ],
        },
        {
          title: "Support Client",
          points: [
            ["Support prioritaire", "Réponse garantie sous 2h en jours ouvrés"],
            ["Corrections de bugs", "Résolution rapide des problèmes techniques"],
            ["Modifications mineures", "Petites modifications de contenu incluses"],
            ["Rapports mensuels", "Statistiques et recommandations détaillées"],
          ],
        },
      ].map((block, i) => (
        <div key={i} className="animate-fade-in-up">
          <h3 className="text-2xl font-semibold mb-6 text-white">
            {block.title}
          </h3>
          <div className="space-y-4">
            {block.points.map(([title, desc], j) => (
              <div
                key={j}
                className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-300"
              >
                <CheckCircle className="h-5 w-5 text-cyan-400 mt-1 group-hover:text-cyan-300 transition-colors duration-300" />
                <div>
                  <h4 className="font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                    {title}
                  </h4>
                  <p className="text-gray-300 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Plans de Maintenance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Essentiel", price: "89€", perks: ["Sauvegardes hebdomadaires", "Mises à jour sécurité", "Monitoring de base", "Support email"], type: "outline" },
              { name: "Professionnel", price: "189€", perks: ["Tout du plan Essentiel", "Sauvegardes quotidiennes", "Optimisation performance", "Support prioritaire", "2h modifications/mois"], type: "highlight" },
              { name: "Premium", price: "349€", perks: ["Tout du plan Pro", "Support 24/7", "5h modifications/mois", "Rapports détaillés", "Conseils stratégiques"], type: "outline" },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`group transition-all duration-300 ${
                  plan.type === "highlight"
                    ? "hover:shadow-purple-500/20 border-2 border-purple-500/30 bg-white/90 backdrop-blur-sm"
                    : "hover:shadow-xl hover:shadow-cyan-500/20 border-0 bg-white/80 backdrop-blur-sm"
                }`}
              >
                <CardContent className="p-6">
                  {plan.type === "highlight" && (
                    <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white">Recommandé</Badge>
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-slate-800">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4 text-slate-800">
                    <span
                      className={`${
                        plan.type === "highlight"
                          ? "bg-gradient-to-r from-purple-500 to-pink-600"
                          : "bg-gradient-to-r from-cyan-500 to-blue-600"
                      } bg-clip-text text-transparent`}
                    >
                      {plan.price}
                    </span>
                    /mois
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.perks.map((perk, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-500" />
                        <span className="text-sm">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.type === "highlight"
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
                        : "bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                    variant={plan.type === "highlight" ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/#contact">Choisir ce plan</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <Clock className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-white">Support d'Urgence</h2>
          <p className="text-gray-300 mb-6">
            Votre site est en panne ? Notre équipe d'urgence intervient dans l'heure pour résoudre les problèmes critiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 rounded-full px-8"
              asChild
            >
              <Link href="/#contact">Intervention d'Urgence</Link>
            </Button>
            <div className="text-sm text-gray-300">Tarif : 150€/heure • Intervention garantie sous 1h</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Protégez Votre Investissement Digital
          </h2>
          <p className="text-xl text-slate-700 mb-8">
            Ne laissez pas les problèmes techniques nuire à votre business. Choisissez un plan de maintenance adapté.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8"
            asChild
          >
            <Link href="/#contact">Choisir un Plan</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
