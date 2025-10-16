"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useMemo } from "react"
import {
  BadgeCheck,
  ShieldCheck,
  Database,
  Wrench,
  Rocket,
  CheckCircle2,
  Star,
  Quote,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Plan = {
  id: string
  title: string
  price: string
  popular?: boolean
  dot: string
  features: string[]
  sub: string
}

const PLANS: Plan[] = [
  {
    id: "std",
    title: "Maintenance Standard",
    price: "49,99 CHF",
    popular: true,
    dot: "bg-cyan-500",
    sub: "Idéal sites vitrine · Support email",
    features: [
      "Surveillance uptime 24/7",
      "Sauvegardes hebdomadaires",
      "Mises à jour WordPress + plugins",
      "Corrections mineures",
      "Rapport mensuel",
    ],
  },
  {
    id: "pro",
    title: "Maintenance Pro",
    price: "99,99 CHF",
    dot: "bg-purple-500",
    sub: "PME / blogs / e-commerce · Réactivité garantie",
    features: [
      "Sauvegardes quotidiennes",
      "Sécurité renforcée + pare-feu",
      "Optimisation performance continue",
      "Mises à jour testées en préprod",
      "Support prioritaire < 24h",
      "Restauration en cas de panne",
    ],
  },
  {
    id: "prem",
    title: "Support Premium",
    price: "199,99 CHF",
    dot: "bg-blue-600",
    sub: "Grand comptes / critiques · Support 7j/7",
    features: [
      "Audit technique mensuel",
      "Gestion serveur + CDN",
      "Interventions illimitées sous SLA",
      "Core Web Vitals avancés",
      "Anti-spam, anti-bruteforce, DDoS",
      "Conseil trimestriel d’évolution",
    ],
  },
]

const DOMAINS = [
  {
    icon: ShieldCheck,
    title: "Sécurité & Mises à jour",
    desc: "Protection contre les menaces, pare-feu et correctifs de sécurité.",
  },
  {
    icon: Database,
    title: "Sauvegardes & Restauration",
    desc: "Backups automatiques avec restauration rapide en cas d’incident.",
  },
  {
    icon: Wrench,
    title: "Optimisation & Support",
    desc: "Maintenance technique, corrections et assistance personnalisée.",
  },
  {
    icon: Rocket,
    title: "Performance & Analytics",
    desc: "Amélioration continue, Core Web Vitals et suivi d’indicateurs.",
  },
]

// Avis recalibrés, mêmes longueurs (~440–460 caractères)
const TESTIMONIALS = [
  {
    // SEKOBA — gauche
    quote:
      "Vous assurez les mises à jour et les sauvegardes sans que nous ayons à nous en occuper. Le site reste toujours en ligne et la prise de rendez-vous fonctionne même le week-end. Le suivi mensuel est clair et vos réponses sont rapides à chaque demande. C’est un vrai confort au quotidien.",
    author: "SEKOBA COIFFURE",
    role: "Salon de coiffure",
    company: "SEKOBA COIFFURE",
  },
  {
    // RR — centre, highlight
    quote:
      "Le site est maintenu et sécurisé en continu. Les mises à jour sont testées, le pare-feu actif et tout reste fluide pour les ventes de produits et les formations. Nous voyons les rapports mensuels et le support prioritaire répond toujours dans la journée. C’est rassurant et professionnel.",
    author: "RR COIFFURE",
    role: "Salon de coiffure",
    company: "RR COIFFURE",
    highlight: true,
  },
  {
    // GBM — droite
    quote:
      "Vous gérez les sauvegardes quotidiennes et la sécurité du site sans interruption. Notre messagerie professionnelle reste stable et le blog performant. Chaque mois, nous recevons un rapport précis sur les actions menées. La maintenance est discrète, efficace et constante.",
    author: "GBM AVOCATS",
    role: "Cabinet d’avocats",
    company: "GBM AVOCATS",
  },
]

export default function MaintenanceSupportPage() {
  const gradient = useMemo(
    () => "bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]",
    [],
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className={`relative overflow-hidden ${gradient}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 grid place-items-center shadow-xl">
            <BadgeCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-[34px] md:text-6xl font-extrabold text-white">
            Maintenance & Support{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professionnels
            </span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/80 max-w-4xl mx-auto">
            Gardez votre site rapide, sécurisé et disponible. Nous assurons
            mises à jour, sauvegardes, surveillance et optimisation continue.
          </p>
        </div>
      </section>

      {/* DOMAINES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Nos Domaines d’Intervention
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {DOMAINS.map((d, i) => (
              <Card
                key={i}
                className="border-0 shadow-lg bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-white/20 grid place-items-center">
                    <d.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold leading-tight">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/90 leading-relaxed">
                    {d.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="py-16 bg-gradient-to-br from-[#2b1d6b] via-[#5a1b9b] to-[#1b123f] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Nos Formules de Maintenance
          </h2>

          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {PLANS.map((p) => (
              <Card
                key={p.id}
                className={`border-0 rounded-2xl shadow-xl h-full ${
                  p.popular ? "ring-2 ring-cyan-200" : ""
                }`}
              >
                <CardContent className="p-6 bg-white text-slate-900 rounded-2xl h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      Engagement 12 mois
                    </Badge>
                    {p.popular && (
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        Populaire
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold leading-tight">
                      {p.title}
                    </h3>
                    <span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-full ${p.dot}`} />
                  </div>

                  <div className="mt-3">
                    <p className="text-3xl font-extrabold">
                      {p.price} <span className="text-slate-600 text-xl">/ mois</span>
                    </p>
                    <p className="mt-1 text-slate-500 text-sm">{p.sub}</p>
                  </div>

                  <ul className="mt-4 grow space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-violet-600" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 mt-auto">
                    <Button
                      asChild
                      className={`w-full ${
                        p.id === "pro"
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
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
            Tarifs mensuels, engagement de 12 mois.
          </p>
        </div>
      </section>

      {/* AVIS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Ils nous font confiance
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Témoignages calibrés à longueur équivalente.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {TESTIMONIALS.map((t, i) => {
              const highlight = Boolean(t.highlight)
              return (
                <Card
                  key={i}
                  className={`border-0 rounded-2xl shadow-xl h-full ${
                    highlight
                      ? "bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white"
                      : "bg-white"
                  }`}
                >
                  <CardContent className="p-7 md:p-8 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`h-5 w-5 ${
                            highlight ? "text-amber-300" : "text-amber-500"
                          } fill-current`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Quote
                        className={`mt-1 h-6 w-6 flex-none ${
                          highlight ? "text-white/70" : "text-slate-400"
                        }`}
                      />
                      <p
                        className={`leading-relaxed ${
                          highlight ? "text-white/95" : "text-slate-700"
                        } min-h-[140px] md:min-h-[120px]`}
                      >
                        {t.quote}
                      </p>
                    </div>

                    {highlight && <div className="my-6 h-px w-full bg-white/20" />}

                    <div className={`mt-auto pt-6 ${highlight ? "text-white" : "text-slate-900"}`}>
                      <p className="font-semibold">{t.author}</p>
                      <p className={`text-sm ${highlight ? "text-white/80" : "text-slate-500"}`}>
                        {t.role} • {t.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
