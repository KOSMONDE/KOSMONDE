import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Search, TrendingUp, Target, Rocket } from "lucide-react"
import Link from "next/link"

export default function SEOMarketingPage() {
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
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float">
                <Rocket className="h-12 w-12 text-white" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-purple-400/50 text-purple-300 bg-purple-400/10">
              Visibilité Maximale
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              SEO & Marketing{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Boostez votre visibilité en ligne avec nos stratégies SEO et marketing digital sur mesure. Attirez plus de clients qualifiés.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full px-8"
              asChild
            >
              <Link href="/#contact">Audit SEO Gratuit</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
              asChild
            >
              <Link href="/#portfolio">Voir nos Résultats</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Nos Services Marketing
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "SEO Technique", text: "Optimisation complète de votre site pour les moteurs de recherche." },
              { icon: TrendingUp, title: "Content Marketing", text: "Création de contenu engageant qui convertit vos visiteurs en clients." },
              { icon: Target, title: "Publicité Ciblée", text: "Campagnes Google Ads et réseaux sociaux pour un ROI optimal." },
            ].map((item, i) => (
              <Card key={i} className="group hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Approche SEO</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Stratégie 360°</h3>
              <div className="space-y-4">
                {[
                  { title: "Audit SEO Complet", desc: "Analyse technique, contenu et concurrence" },
                  { title: "Recherche de Mots-clés", desc: "Identification des opportunités de trafic" },
                  { title: "Optimisation On-Page", desc: "Structure, contenu et balises optimisées" },
                  { title: "Link Building", desc: "Stratégie de liens de qualité" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400 mt-1" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "+150%", label: "Trafic organique moyen" },
                { value: "Top 3", label: "Positions Google" },
                { value: "+200%", label: "Leads qualifiés" },
                { value: "3-6", label: "Mois pour résultats" },
              ].map((stat, i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-md border-0 text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-purple-600 to-slate-800 bg-clip-text text-transparent">
            Nos Formules Marketing
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "SEO Starter", price: "890€", perks: ["Audit SEO initial", "Optimisation on-page", "Rapport mensuel", "Support email"], type: "outline" },
              { name: "SEO Pro", price: "1 590€", perks: ["Tout du SEO Starter", "Content marketing", "Link building", "Suivi concurrence"], type: "highlight" },
              { name: "SEO Enterprise", price: "2 890€", perks: ["Tout du SEO Pro", "Campagnes publicitaires", "Social media management", "Support prioritaire"], type: "outline" },
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
                    <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white">Populaire</Badge>
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
                    <Link href="/#contact">Commencer</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Boostez Votre Visibilité Dès Aujourd'hui</h2>
          <p className="text-xl text-gray-200 mb-8">
            Obtenez un audit SEO gratuit et découvrez comment améliorer votre référencement.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full px-8"
            asChild
          >
            <Link href="/#contact">Audit SEO Gratuit</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
