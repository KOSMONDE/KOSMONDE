"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function FAQPage() {
  const faq = [
    {
      q: "En combien de temps un site peut-il être prêt ?",
      a: "Pour une page simple, ton site peut être en ligne en quelques semaines si ton contenu est prêt. Pour un site vitrine plus complet, on prévoit un planning un peu plus long, défini ensemble dès le début pour que tout soit clair.",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "En général : un acompte au démarrage pour réserver le projet, puis le solde à la mise en ligne du site. Tout est posé par écrit avant de commencer, sans frais cachés ni surprise.",
    },
    {
      q: "Et si je veux modifier du contenu plus tard ?",
      a: "On peut soit prévoir que je fasse les changements pour toi, soit mettre en place une interface simple pour que tu modifies certains contenus en autonomie, avec une courte prise en main.",
    },
    {
      q: "Le site sera-t-il adapté au mobile ?",
      a: "Oui, c’est la base. Le site est pensé dès le départ pour être agréable à utiliser sur mobile, tablette et ordinateur.",
    },
    {
      q: "Est-ce que tu peux m’aider pour le nom de domaine et l’email pro ?",
      a: "Oui. Je t’accompagne pour le choix du nom de domaine, l’hébergement et la création d’une adresse email professionnelle cohérente avec ton projet.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER GLOBAL */}
      <Header />

      {/* Glows */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.28),transparent_55%)]" />

      <section className="relative border-b border-slate-900/40">
        <div className="container-kosmonde py-16 space-y-10">
          {/* CHEMIN (breadcrumb) */}
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Link
              href="/"
              className="hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
            >
              Accueil
            </Link>
            <span>/</span>
            <span className="uppercase tracking-[0.16em] text-slate-500">
              FAQ
            </span>
          </div>

          {/* HEADER CENTRÉ */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
              Questions fréquentes
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Cette page regroupe les réponses aux questions qui reviennent
              souvent quand on prépare un site web avec KOSMONDE.
            </p>
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
              Délais · Paiement · Contenu · Technique
            </p>
          </div>

          {/* LISTE FAQ */}
          <div className="max-w-2xl mx-auto space-y-3">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className={`group w-full text-left rounded-2xl border border-slate-800/70 bg-slate-950/85 p-4 sm:p-5 shadow-[0_10px_30px_rgba(3,7,18,0.7)] transition-all ${
                    isOpen
                      ? "shadow-[0_16px_40px_rgba(8,47,73,0.7)] border-sky-500/50"
                      : "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(8,47,73,0.5)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-slate-50 group-hover:text-sky-300">
                      {item.q}
                    </p>
                    <span className="mt-1 text-[11px] text-slate-500">
                      {isOpen ? "–" : "+"}
                    </span>
                  </div>

                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA CONTACT */}
          <div className="pt-6 text-center space-y-2">
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Si tu ne trouves pas la réponse à ta question ici, tu peux
              m’écrire directement. On clarifie ensemble ta situation.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] hover:brightness-110 transition-transform hover:-translate-y-0.5"
            >
              Aller au formulaire de contact ↗
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER GLOBAL */}
      <Footer />
    </main>
  );
}
