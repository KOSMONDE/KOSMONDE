"use client";

import { useState } from "react";

export function MiniFAQ() {
  const faq = [
    {
      q: "En combien de temps un site peut-il être prêt ?",
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
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_65%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.25),transparent_60%)] mix-blend-screen" />

      <div className="container-kosmonde py-16 space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
            Questions fréquentes
          </h2>
          <a
            href="/faq"
            className="text-[11px] text-sky-300 hover:text-sky-200 uppercase tracking-[0.22em]"
          >
            Voir tout →
          </a>
        </div>

        <div className="space-y-3">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => toggleFaq(index)}
                className={`group w-full text-left rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 shadow-[0_10px_30px_rgba(3,7,18,0.7)] transition-all ${
                  isOpen
                    ? "border-sky-500/50 shadow-[0_16px_40px_rgba(8,47,73,0.7)]"
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
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Lien vers la page FAQ complète */}
        <div className="text-center pt-4">
          <a
            href="/faq"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-[11px] font-medium text-slate-100 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/70 transition-colors"
          >
            Voir les autres questions →
          </a>
        </div>
      </div>
    </section>
  );
}
