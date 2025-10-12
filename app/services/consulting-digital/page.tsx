"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { CheckCircle2, Sparkles, PenTool, Instagram, Type, Layers } from "lucide-react"

type Plan = {
  id: string
  title: string
  price: string
  currency: "CHF"
  note?: string
  popular?: boolean
  dot: string
  check: string
  features: string[]
}

export default function ConsultingDigitalPage() {
  const plans: Plan[] = [
    {
      id: "social-starter",
      title: "Social Media Starter",
      price: "590",
      currency: "CHF",
      note: "Mise en route réseaux sociaux",
      dot: "bg-cyan-500",
      check: "text-cyan-600",
      popular: true,
      features: [
        "Audit express Instagram/LinkedIn",
        "Calendrier éditorial 30 jours",
        "10 visuels optimisés + templates",
        "3 scripts Reels / Shorts",
        "Guide de bonnes pratiques",
      ],
    },
    {
      id: "branding-essentials",
      title: "Branding Essentials",
      price: "790",
      currency: "CHF",
      note: "Identité visuelle compacte",
      dot: "bg-purple-600",
      check: "text-purple-600",
      features: [
        "Logo principal + variantes",
        "Palette couleurs + typographies",
        "Mini brand book (PDF)",
        "Kit réseaux sociaux (avatars/bannières)",
        "Export HD + vectoriel (SVG/PNG/PDF)",
      ],
    },
    {
      id: "print-pack",
      title: "Pack Print & Brand",
      price: "990",
      currency: "CHF",
      note: "Prêt pour prospection & événements",
      dot: "bg-blue-600",
      check: "text-blue-600",
      features: [
        "Carte de visite recto/verso",
        "Signature mail pro",
        "Flyer A5 ou dépliant 3 volets",
        "Gabarit présentation (Google/PowerPoint)",
        "Prêts à imprimer + sources",
      ],
    },
  ]

  const offerByPlan: Record<string, string> = {
    "social-starter": "social",
    "branding-essentials": "branding",
    "print-pack": "print",
  }

  return (
    <main className="flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 grid place-items-center shadow-xl">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-[34px] md:text-6xl font-extrabold text-white">
            Consulting Digital{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pratique
            </span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/80 max-w-4xl mx-auto">
            Boost rapide de ton image et de ta présence. Packs concrets pour réseaux sociaux, identité visuelle
            et supports imprimés. Paiement unique, livrables prêts à l’emploi.
          </p>
        </div>
      </section>

      {/* DOMAINES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Nos Domaines d’Intervention</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Instagram className="h-7 w-7" />,
                title: "Réseaux sociaux",
                text: "Stratégie, calendrier éditorial, templates, scripts vidéo courts.",
              },
              {
                icon: <PenTool className="h-7 w-7" />,
                title: "Identité visuelle",
                text: "Logo, palette, typographies, brand book et déclinaisons.",
              },
              {
                icon: <Type className="h-7 w-7" />,
                title: "Contenu & Copy",
                text: "Accroches, posts, scripts Reels/Shorts, micro-landing pour campagnes.",
              },
              {
                icon: <Layers className="h-7 w-7" />,
                title: "Print & Supports",
                text: "Cartes de visite, flyers, signatures e-mail, gabarits de présentation.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white shadow-lg"
              >
                <div className="p-6">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-white/20 grid place-items-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/90">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="py-16 bg-gradient-to-br from-[#2b1d6b] via-[#5a1b9b] to-[#1b123f] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Nos Formules</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border-0 shadow-xl h-full flex flex-col rounded-2xl ${
                  plan.popular ? "ring-2 ring-cyan-200" : ""
                } bg-white text-slate-900`}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      Paiement unique
                    </span>
                    {plan.popular && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-2.5 py-1 text-xs font-medium text-white">
                        Populaire
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{plan.title}</h3>
                      <div className={`h-2.5 w-2.5 rounded-full ${plan.dot}`} />
                    </div>
                  </div>

                  <div className="mt-3">
                    {plan.note && <p className="text-slate-500 text-sm">{plan.note}</p>}
                    <p className="mt-1 text-3xl font-extrabold">
                      {plan.price} <span className="text-cyan-600">{plan.currency}</span>
                    </p>
                  </div>

                  <ul className="mt-4 grow space-y-2 text-slate-800">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 ${plan.check}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 mt-auto">
                    <Link
                      href={`/?offer=${offerByPlan[plan.id]}#contact`}
                      className={`block w-full text-center rounded-md ${
                        plan.popular
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg px-4 py-2.5"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2.5"
                      }`}
                    >
                      Choisir cette formule
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-white/70 mt-8">
            Visuels livrés en formats optimisés (web & impression). Sources incluses quand applicable.
          </p>
        </div>
      </section>

      {/* AVIS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900">
            Ils nous font confiance
          </h2>
          <p className="text-center text-slate-600 mt-2">
            Une sélection d'avis vérifiés de clients heureux.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                quote:
                  "Notre image a été clarifiée et nos posts sont cohérents. Le kit social nous fait gagner du temps chaque semaine.",
                author: "Sophie Martin",
                role: "Fondatrice · Atelier Nomade",
              },
              {
                quote:
                  "Pack branding très propre et rapide. On a lancé la prospection avec des supports pro en moins de deux semaines.",
                author: "Yann Dupuis",
                role: "COO · KappaTech",
                highlight: true,
              },
              {
                quote:
                  "Migration vers une charte plus moderne + cartes & flyers prêts à imprimer. Process fluide et réactif.",
                author: "Carine Lopez",
                role: "Directrice · Maison Lunea",
              },
            ].map((t, i) => (
              <article
                key={i}
                className={`rounded-2xl p-6 shadow-xl ${
                  t.highlight
                    ? "bg-gradient-to-br from-[#4b2fbf] via-[#6932a1] to-[#341d61] text-white"
                    : "bg-white border border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex gap-1 text-amber-500 text-xl mb-3">★★★★★</div>
                <p className="leading-relaxed">{t.quote}</p>
                <hr className={`my-6 ${t.highlight ? "border-white/20" : "border-slate-200"}`} />
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className={`text-sm ${t.highlight ? "text-white/80" : "text-slate-500"}`}>{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
