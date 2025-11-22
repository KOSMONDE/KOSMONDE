"use client";

import { useState } from "react";

export function MiniFAQ() {
  const faq = [
    {
      q: "Quel est le délai pour un site ?",
      a: "Pour une page simple : quelques semaines si ton contenu est prêt. Pour un site vitrine : un planning un peu plus long, défini ensemble dès le début.",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "Acompte au démarrage, solde à la mise en ligne. Tout est clair et écrit avant de commencer.",
    },
    {
      q: "Le site sera-t-il adapté au mobile ?",
      a: "Oui, dès le début. Le site est pensé pour être agréable sur mobile, tablette et ordinateur.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="mini-faq"
      className="relative overflow-hidden border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_65%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.25),transparent_60%)] opacity-25 mix-blend-screen" />

      <div className="container-kosmonde space-y-8 py-14 sm:py-16">
        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl whitespace-normal">
            Questions fréquentes
          </h2>

          {/* Lien simple : visible surtout desktop/tablette */}
          <a
            href="/faq"
            className="hidden text-[11px] uppercase tracking-[0.22em] text-sky-300 transition-colors hover:text-sky-200 sm:inline-block"
          >
            Voir tout →
          </a>
        </div>

        {/* LISTE FAQ */}
        <div className="space-y-3">
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
                className={`group w-full rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 text-left shadow-[0_10px_30px_rgba(3,7,18,0.7)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] ${
                  isOpen
                    ? "border-sky-500/50 shadow-[0_16px_40px_rgba(8,47,73,0.7)]"
                    : "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(8,47,73,0.5)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-50 group-hover:text-sky-300 sm:text-[15px] whitespace-normal">
                    {item.q}
                  </p>

                  <span
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border text-[10px] transition-all ${
                      isOpen
                        ? "border-sky-400/70 bg-sky-500/10 text-sky-300"
                        : "border-slate-700 bg-slate-900/60 text-slate-400 group-hover:border-sky-500/60 group-hover:text-sky-300"
                    }`}
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </div>

                {isOpen && (
                  <p
                    id={answerId}
                    className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-[13px]"
                  >
                    {item.a}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* CTA vers FAQ complète — pensé mobile */}
        <div className="pt-4 text-center">
          <a
            href="/faq"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/40 px-6 py-2.5 text-xs font-medium text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900/70 sm:text-[11px]"
          >
            Voir les autres questions →
          </a>
        </div>
      </div>
    </section>
  );
}
