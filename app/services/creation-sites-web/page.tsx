"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Rocket, Star, Quote } from "lucide-react"

export default function CreationSitesWebPage() {
  const plans = [
    {
      id: "vitrine",
      title: "Site Vitrine",
      price: "199,99",
      currency: "CHF",
      note: "Livré en 2–3 semaines · Paiement en 2 fois",
      popular: true,
      accentDot: "bg-cyan-500",
      checkColor: "text-cyan-500",
    },
    {
      id: "ecommerce",
      title: "E-commerce WordPress",
      price: "299,99",
      currency: "CHF",
      note: "Paiement en 3 fois · Support de mise en ligne",
      popular: false,
      accentDot: "bg-pink-500",
      checkColor: "text-pink-500",
    },
    {
      id: "premium",
      title: "Site Premium",
      price: "399,99",
      currency: "CHF",
      note: "Roadmap trimestrielle · 2 cycles de retours inclus",
      popular: false,
      accentDot: "bg-blue-600",
      checkColor: "text-blue-600",
    },
  ] as const

  const included: Record<(typeof plans)[number]["id"], string[]> = {
    vitrine: [
      "Design UX/UI sur mesure",
      "Intégration responsive mobile-first",
      "Jusqu’à 5 pages clés",
      "Formulaire sécurisé anti-spam + notifications",
      "Performance ≥ 90 (Lighthouse mobile)",
    ],
    ecommerce: [
      "WooCommerce configuré",
      "10 produits initiaux + catégories",
      "Paiements Stripe/PayPal + e-mails transactionnels",
      "TVA, zones d’expédition, Click&Collect",
      "Thème optimisé Core Web Vitals",
    ],
    premium: [
      "Architecture de contenu + wireframes",
      "Design system (tokens, composants)",
      "Gabarits de landing pages réutilisables",
      "Blog complet avec recherche et catégories",
      "Intégrations CRM & formulaires avancés",
    ],
  }

  const Testimonials = () => (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Ils nous font confiance
          </h2>
          <p className="mt-3 text-slate-600">
            Une sélection d&apos;avis vérifiés de clients heureux.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {/* Left card */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl">
            <CardContent className="p-7 flex flex-col h-full">
              <div className="flex gap-1 text-amber-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-500" />
                ))}
              </div>
              <Quote className="h-6 w-6 text-slate-400" />
              <p className="mt-3 text-slate-800 leading-relaxed">
                Notre nouveau site a doublé les demandes de devis en deux mois.
                Design propre, chargement rapide, rien à redire.
              </p>
              <div className="mt-auto pt-6">
                <p className="font-semibold text-slate-900">Sophie Martin</p>
                <p className="text-slate-500 text-sm">Fondatrice · Atelier Nomade</p>
              </div>
            </CardContent>
          </Card>

          {/* Middle highlighted card */}
          <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white">
            <CardContent className="p-7 flex flex-col h-full">
              <div className="flex gap-1 text-amber-300 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-300" />
                ))}
              </div>
              <Quote className="h-6 w-6 text-white/70" />
              <p className="mt-3 text-white/95 leading-relaxed">
                Exécution maîtrisée de bout en bout. L&apos;équipe a challengé nos idées
                et livré un résultat meilleur qu&apos;attendu.
              </p>
              <div className="mt-auto pt-6 border-t border-white/20" />
              <div className="pt-4">
                <p className="font-semibold">Yann Dupuis</p>
                <p className="text-white/80 text-sm">COO · KappaTech</p>
              </div>
            </CardContent>
          </Card>

          {/* Right card */}
          <Card className="bg-white border-slate-200 shadow-md rounded-2xl">
            <CardContent className="p-7 flex flex-col h-full">
              <div className="flex gap-1 text-amber-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-500" />
                ))}
              </div>
              <Quote className="h-6 w-6 text-slate-400" />
              <p className="mt-3 text-slate-800 leading-relaxed">
                Migration e-commerce fluide. Paiements, catalogue et SEO bien posés.
                Support réactif après lancement.
              </p>
              <div className="mt-auto pt-6">
                <p className="font-semibold text-slate-900">Carine Lopez</p>
                <p className="text-slate-500 text-sm">Directrice · Maison Lunea</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center text-white">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 grid place-items-center shadow-xl">
            <Rocket className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-[34px] md:text-6xl font-extrabold">
            Création de Sites Web{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professionnels
            </span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/80 max-w-4xl mx-auto">
            Sites modernes et performants. Identité renforcée. Conversion optimisée.
            Chaque projet est conçu sur mesure pour une expérience fluide et impactante.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" className="border-white/25 text-white bg-white/5 hover:bg-white/10">
              <Link href="/portfolio">Voir nos Réalisations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS — gris clair */}
      <section className="py-16 bg-[#f3f5f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Notre Processus de Création</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: "1", title: "Analyse & Stratégie", desc: "Compréhension des besoins, étude du marché et objectifs." },
              { n: "2", title: "Design & Prototype", desc: "Maquettes UX/UI sur mesure pour une expérience fluide." },
              { n: "3", title: "Développement", desc: "Intégration moderne, performances et qualité de code." },
              { n: "4", title: "Lancement & Suivi", desc: "Mise en ligne, tests finaux et accompagnement." },
            ].map((s) => (
              <Card key={s.n} className="border-0 bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-white/20 grid place-items-center text-xl font-bold">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/90">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS — violet */}
      <section className="py-16 bg-gradient-to-br from-[#2b1d6b] via-[#5a1b9b] to-[#1b123f] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Nos Formules</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {plans.map((p) => (
              <Card
                key={p.id}
                className={`border-0 shadow-xl h-full flex flex-col rounded-2xl ${p.popular ? "ring-2 ring-cyan-200" : ""}`}
              >
                <CardContent className="p-6 flex flex-col h-full bg-white text-slate-900 rounded-2xl">
                  {/* badges au-dessus du titre */}
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                        Paiement unique
                      </span>
                      {p.popular && (
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                          Populaire
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* titre + dot */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <span className={`h-2.5 w-2.5 rounded-full ${p.accentDot}`} />
                  </div>

                  {/* prix */}
                  <div className="mt-3">
                    <p className="text-3xl font-extrabold">
                      {p.price} <span className="text-slate-600">{p.currency}</span>
                    </p>
                    <p className="mt-1 text-slate-500 text-sm">{p.note}</p>
                  </div>

                  {/* inclus */}
                  <ul className="mt-4 grow space-y-2">
                    {included[p.id].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 ${p.checkColor}`} />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-6 mt-auto">
                    <Button
                      asChild
                      className={`w-full ${
                        p.id === "ecommerce"
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <Link href={`/?offer=${p.id}#contact`}>Choisir cette formule</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-white/80 text-center mt-8">
            Tarifs affichés en francs suisses. Paiement unique sans abonnement.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS — blanc */}
      <Testimonials />

      <Footer />
    </div>
  )
}
