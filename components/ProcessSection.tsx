"use client";

import Link from "next/link";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Brief & audit",
      subtitle: "Contenus clarifiés",
      text: "On pose ensemble les objectifs, les pages clés et les priorités SEO locales.",
    },
    {
      step: "02",
      title: "Design & structure",
      subtitle: "Prototype validé",
      text: "Maquettes, wording et plan de pages sont testés et ajustés avec vous.",
    },
    {
      step: "03",
      title: "Mise en ligne & suivi",
      subtitle: "Lancement maîtrisé",
      text: "Intégration, tests Core Web Vitals et support pour la prise en main.",
    },
  ];

  return (
    <section
      id="processus"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde space-y-12 py-16 relative">
        {/* TITRE + SOUS-TITRE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Comment se déroule un projet ?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Trois étapes claires pour transformer votre idée en site en ligne, en toute sérénité.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em] mt-1">
            Simple · Transparent · Structuré
          </p>
        </div>

        {/* STEPS */}
        <div className="relative max-w-5xl mx-auto">
          <span className="pointer-events-none absolute left-12 right-12 top-10 hidden h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 md:block" />
          <ol className="grid gap-8 md:gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <li
                key={item.step}
                className="
                  relative flex flex-col rounded-2xl border border-slate-800/60 bg-slate-950/85
                  px-6 py-8
                  shadow-[0_12px_35px_rgba(15,23,42,0.75)]
                  transition-transform duration-300
                  hover:-translate-y-1 hover:border-slate-700/80
                  hover:shadow-[0_18px_55px_rgba(8,47,73,0.8)]
                "
              >
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)] hover:opacity-100" />

                <div className="mb-4 flex items-center gap-3">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/60 bg-slate-950 text-[11px] font-semibold tracking-[0.25em] text-sky-200 shadow-[0_10px_30px_rgba(14,165,233,0.25)]">
                    {item.step}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-sky-500/30 via-slate-700 to-transparent" />
                </div>

                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                  {item.subtitle}
                </p>
                <h3 className="mt-2 text-base font-semibold text-slate-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
