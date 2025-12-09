"use client";

import { useState } from "react";

export function MiniFAQ() {
  const faq = [
    {
      q: "Quel délai pour livrer un site ?",
      a: "One-page : 3 à 4 semaines si vos contenus sont prêts. Site vitrine complet : 5 à 7 semaines avec ateliers, maquettes et intégration.",
    },
    {
      q: "Comment se déroule le paiement ?",
      a: "30 % à la signature pour réserver le créneau, 40 % après validation des maquettes, 30 % au moment de la mise en ligne.",
    },
    {
      q: "Le site sera-t-il optimisé pour le mobile et le référencement ?",
      a: "Oui. Maquettes mobile-first, optimisation Lighthouse et structure pensée pour le référencement local.",
    },
    {
      q: "Que se passe-t-il après la mise en ligne ?",
      a: "Je reste disponible pour une phase de retours inclus et peux proposer des tickets ponctuels ou une formule de suivi.",
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
    <section
      id="mini-faq"
      className="relative overflow-hidden border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_65%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.25),transparent_60%)] opacity-25 mix-blend-screen" />

      <div className="relative">
        <div className="absolute inset-x-4 top-16 -z-10 h-[420px] rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-70 blur-3xl sm:inset-x-20" />
      </div>

      <div className="container-kosmonde space-y-10 py-16 sm:py-20">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-100">
              Process & délais
            </div>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl whitespace-normal">
              Questions fréquentes
            </h2>
            <p className="text-sm text-slate-400">
              Process, délais, paiement : tout est transparent dès le départ.
            </p>
            <div className="text-xs text-slate-500">
              Réponse sous 24&nbsp;h · Créneaux réservés 3 semaines à l’avance
            </div>
          </div>

          {/* Lien simple : visible surtout desktop/tablette */}
          <a
            href="/faq"
            className="hidden text-[11px] uppercase tracking-[0.22em] text-sky-300 transition-colors hover:text-sky-200 sm:inline-block"
          >
            Voir tout →
          </a>
        </div>

        {/* LISTE FAQ */}
        <div className="grid gap-5 md:grid-cols-2">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `mini-faq-answer-${index}`;

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
                <div className="flex items-stretch">
                  <div
                    className={[
                      "relative flex w-16 flex-col items-center justify-center border-r border-slate-900 bg-slate-950/95 text-[12px] font-semibold tracking-[0.3em] text-slate-500 transition-all py-4",
                      isOpen ? "text-sky-200" : "",
                    ].join(" ")}
                  >
                    <span>0{index + 1}</span>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[12.5px] font-medium text-slate-50 group-hover:text-sky-300 sm:text-[14px] whitespace-normal">
                        {item.q}
                      </p>

                      <span
                        className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[11px] transition-all ${
                          isOpen
                            ? "border-sky-400/70 bg-sky-500/10 text-sky-300 rotate-180"
                            : "border-slate-700 bg-slate-900/60 text-slate-400 group-hover:border-sky-500/60 group-hover:text-sky-300"
                        }`}
                      >
                        {isOpen ? "–" : "+"}
                      </span>
                    </div>

                    {isOpen && (
                      <p
                        id={answerId}
                        className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-[13px]"
                      >
                        {item.a}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 px-6 py-6 text-center shadow-[0_18px_55px_rgba(8,47,73,0.55)] sm:flex-row sm:text-left">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Encore des questions ?
            </p>
            <p className="mt-2 text-sm text-slate-50">
              Réservez un créneau : on clarifie votre feuille de route en 15 minutes.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            <a
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/40 px-6 py-2.5 text-xs font-medium text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900/70"
            >
              Voir toutes les questions →
            </a>
            <a
              href="/rdv"
              className="inline-flex items-center justify-center rounded-full bg-sky-500/90 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_12px_35px_rgba(14,165,233,0.35)] transition hover:bg-sky-400"
            >
              Planifier un appel ↗
            </a>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </div>
    </section>
  );
}
