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

  const avis = [
    {
      entreprise: "SEKOBA COIFFURE",
      role: "Gérant",
      secteur: "Coiffure",
      texte:
        "Vous avez conçu un site vitrine clair avec nos services, une galerie photo et la prise de rendez-vous intégrée. L’expérience de nos clientes est fluide et moderne.",
    },
    {
      entreprise: "RR COIFFURE",
      role: "Fondatrice",
      secteur: "Coiffure",
      texte:
        "Le site regroupe nos services, nos formations certifiées et la vente de produits. Je gère tout simplement et nos clientes réservent directement en ligne.",
    },
    {
      entreprise: "GBM AVOCATS",
      role: "Associé",
      secteur: "Cabinet d’avocats",
      texte:
        "Le site vitrine présente nos prestations, notre blog et une messagerie professionnelle intégrée. La structure renforce la clarté et la crédibilité du cabinet.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center text-white">
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
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-16 bg-[#f3f5f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
            Notre Processus de Création
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: "1", title: "Analyse & Stratégie", desc: "Compréhension des besoins, étude du marché et objectifs." },
              { n: "2", title: "Design & Prototype", desc: "Maquettes UX/UI sur mesure pour une expérience fluide." },
              { n: "3", title: "Développement", desc: "Intégration moderne, performances et qualité de code." },
              { n: "4", title: "Lancement & Suivi", desc: "Mise en ligne, tests finaux et accompagnement." },
            ].map((s) => (
              <Card
                key={s.n}
                className="border-0 bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white shadow-lg"
              >
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

      {/* PLANS */}
      <section className="py-16 bg-gradient-to-br from-[#2b1d6b] via-[#5a1b9b] to-[#1b123f] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nos Formules</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.id}
                className={`border-0 shadow-xl rounded-2xl flex flex-col ${
                  p.popular ? "ring-2 ring-cyan-200" : ""
                }`}
              >
                <CardContent className="p-6 flex flex-col bg-white text-slate-900 rounded-2xl h-full">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                      Paiement unique
                    </span>
                    {p.popular && (
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        Populaire
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {p.title} <span className={`h-2.5 w-2.5 rounded-full ${p.accentDot}`} />
                  </h3>
                  <p className="text-3xl font-extrabold mt-2">
                    {p.price} <span className="text-slate-600">{p.currency}</span>
                  </p>
                  <p className="text-slate-500 text-sm">{p.note}</p>

                  <ul className="mt-4 grow space-y-2">
                    {included[p.id].map((f) => (
                      <li key={f} className="flex gap-2 items-start">
                        <CheckCircle2 className={`h-4 w-4 ${p.checkColor} mt-0.5`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button
                      asChild
                      className={`w-full ${
                        p.id === "ecommerce"
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <Link
                        href={`/?offer=${p.id}#contact`}
                        prefetch={false}
                        onClick={() => {
                          try { sessionStorage.setItem("preselectedOffer", p.id) } catch {}
                        }}
                      >
                        Choisir cette formule
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
            Ils nous font confiance
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          {avis.map((a, i) => (
            <Card
              key={i}
              className={`rounded-2xl shadow-md border ${
                i === 1
                  ? "border-0 bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white shadow-xl"
                  : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              <CardContent className="p-7">
                <div className={`flex gap-1 ${i === 1 ? "text-amber-300" : "text-amber-500"} mb-3`}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <Quote className={`h-6 w-6 ${i === 1 ? "text-white/70" : "text-slate-400"}`} />
                <p className="mt-3 leading-relaxed">{a.texte}</p>
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="font-semibold">{a.entreprise}</p>
                  <p className="text-sm opacity-80">
                    {a.role} · {a.secteur}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
