"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

type FaqItem = {
  q: string;
  a: string;
  aDisplay?: React.ReactNode;
};

export default function FAQPage() {
  const faq: FaqItem[] = [
    {
      q: "Que préparer avant de démarrer ?",
      a: "Une idée claire de votre offre, vos objectifs, vos contacts, et idéalement des textes et photos. Sinon, on peut vous aider à les cadrer.",
    },
    {
      q: "Qui gère domaine et hébergement ?",
      a: "Nous pouvons tout gérer (achat domaine, hébergement, email pro) ou vous accompagner si vous préférez garder la main.",
    },
    {
      q: "Je peux mettre le site à jour moi-même ?",
      a: "Oui. On peut prévoir une courte prise en main pour que vous modifiiez textes, visuels ou articles en autonomie.",
    },
    {
      q: "On intègre vos outils métiers ?",
      a: "CRM, prise de rendez-vous, paiement, email marketing : on connecte vos outils pour éviter la double saisie.",
    },
    {
      q: "Vous suivez les performances du site ?",
      a: "Oui. On installe le suivi analytics et on peut fournir des points réguliers (trafic, conversions, SEO local).",
    },
    {
      q: "Ateliers ou formations possibles ?",
      a: "Oui. On peut organiser un atelier d’1h pour prendre en main le site, clarifier vos messages ou améliorer vos contenus.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Header />

      {/* Glows */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.28),transparent_55%)]" />

      <section className="relative border-b border-slate-900/40">
        <div className="absolute inset-x-4 top-16 -z-10 h-[420px] rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-70 blur-3xl sm:inset-x-20" />

        <div className="container-kosmonde py-16 sm:py-20 space-y-10">
          {/* Fil d’ariane */}
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

          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-100 shadow-[0_0_0_1px_rgba(8,47,73,0.4)]">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                FAQ express
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50 whitespace-normal">
                Questions fréquentes
              </h1>
              <p className="text-sm text-slate-400 sm:text-sm whitespace-nowrap sm:whitespace-normal">
                Process, délais, paiement clairs dès le départ.
              </p>
              <div className="text-xs text-slate-500 whitespace-normal">
                Réponse sous 24 h · Créneaux sous 3 semaines
              </div>
            </div>

            <a
              href="/rdv"
              className="hidden text-[11px] uppercase tracking-[0.22em] text-sky-300 transition-colors hover:text-sky-200 sm:inline-block"
            >
              Réserver un créneau →
            </a>
          </div>

          {/* LISTE FAQ */}
          <div className="grid gap-5 md:grid-cols-2">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-page-answer-${index}`;
              const answerDisplay = item.aDisplay ?? item.a;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className={`group w-full overflow-hidden rounded-[1.8rem] border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-950 p-0 text-left shadow-[0_18px_50px_rgba(8,47,73,0.55)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                    isOpen
                      ? "border-sky-500/50"
                      : "hover:-translate-y-0.5 hover:border-sky-400/60"
                  }`}
                >
                  <div className="flex items-stretch h-full">
                    <div
                      className={[
                        "relative flex w-12 flex-col items-center justify-center border-r border-slate-900 bg-slate-950/95 text-[11px] font-semibold tracking-[0.26em] text-slate-500 transition-all py-2.5 sm:py-3",
                        isOpen ? "text-sky-200" : "",
                      ].join(" ")}
                    >
                      <span>0{index + 1}</span>
                    </div>
                    <div className="flex-1 p-4 sm:p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[12px] sm:text-[14px] font-medium text-slate-50 group-hover:text-sky-300 whitespace-nowrap sm:whitespace-normal">
                          {item.q}
                        </p>

                        <span
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border text-[10px] transition-all ${
                            isOpen
                              ? "border-sky-400/70 bg-sky-500/10 text-sky-300 rotate-180"
                              : "border-slate-700 bg-slate-900/60 text-slate-400 group-hover:border-sky-500/60 group-hover:text-sky-300"
                          }`}
                        >
                          {isOpen ? "–" : "+"}
                        </span>
                      </div>

                      {isOpen && (
                        <>
                          <div className="h-px w-full bg-slate-800/70" />
                          <p
                            id={answerId}
                            className="text-[12px] sm:text-[13px] leading-relaxed text-slate-400"
                          >
                            {answerDisplay}
                          </p>
                          <div className="mt-auto" />
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA bas de page */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 px-6 py-5 text-center shadow-[0_18px_55px_rgba(8,47,73,0.55)] sm:flex-row sm:text-left">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Encore des questions ?
              </p>
              <p className="mt-2 text-sm text-slate-50 whitespace-nowrap sm:whitespace-normal">
                Réservez un créneau : plan en 15 min.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/40 px-5 py-2 text-[11px] font-medium text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900/70"
              >
                Aller au contact →
              </a>
              <a
                href="/rdv"
                className="inline-flex items-center justify-center rounded-full bg-sky-500/90 px-5 py-2 text-[11px] font-semibold text-slate-950 shadow-[0_12px_35px_rgba(14,165,233,0.35)] transition hover:bg-sky-400"
              >
                Réserver un créneau ↗
              </a>
            </div>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </section>

      <Footer />
    </main>
  );
}
