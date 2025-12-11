"use client";

export function AProposSection() {
  const valeurs = [
    {
      label: "Ce qui compte pour moi",
      text: [
        "Sites utiles ancrés dans le réel",
        "Prioriser ce qui apporte de la clarté",
      ],
    },
    {
      label: "Ce que je vous apporte",
      text: [
        "Un cadre simple à comprendre",
        "Explications claires à chaque étape",
      ],
    },
    {
      label: "Comment on avance",
      text: [
        "Rythme posé, étapes visibles",
        "Décisions prises ensemble",
      ],
    },
  ];
  const quickFacts = [
    { label: "Sites livrés", value: "20+" },
    { label: "Années d’expérience", value: "8" },
    { label: "Réponse sous", value: "24 h" },
  ];

  return (
    <section
      id="a-propos"
      className="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_70%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.25),transparent_60%)]" />

      <div className="container-kosmonde relative space-y-16 py-16">
        {/* HEADER CENTRÉ */}
        <div className="mx-auto max-w-3xl space-y-3 text-center sm:space-y-4">
          <span className="inline-flex w-fit items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 pl-4 pr-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)] sm:text-[11px]">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
            Studio web & SEO · petites structures
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            À propos de KOSMONDE
          </h2>

            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              Studio web à Genève. Nous aidons les indépendants et petites structures à livrer des sites rapides, SEO local, avec un message clair et une mise en ligne sereine.
            </p>
          <p className="text-xs italic text-slate-500 sm:text-sm">
            « On simplifie le digital pour les indépendants : un plan clair, un site net, aucune surprise. »
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Simplicité · Clarté · Écoute · Structure
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Preuves rapides
          </p>
          <div className="grid gap-3 rounded-3xl border border-slate-800/70 bg-slate-950/80 px-6 py-5 sm:grid-cols-3 sm:overflow-visible overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] sm:justify-items-stretch justify-items-center">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="text-center sm:w-full w-[200px] snap-center">
                <p className="text-sm font-semibold text-slate-50">{fact.value}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MA FAÇON DE TRAVAILLER */}
        <div className="mx-auto max-w-4xl space-y-3 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Notre façon de travailler
          </p>

          <div className="grid gap-4 sm:grid-cols-3 sm:overflow-visible overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] justify-items-center">
            {valeurs.map((v, index) => (
              <div
                key={v.label}
                className="group relative flex flex-col rounded-2xl border border-slate-800/70 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950 px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)] sm:w-[260px] w-[260px] snap-center space-y-3"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <p className="flex items-center gap-3 text-[11px] font-medium text-slate-100">
                    <span
                      className={[
                        "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.35)]",
                        "bg-sky-500/15",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125",
                          "bg-sky-400",
                        ].join(" ")}
                      />
                    </span>
                    {v.label}
                  </p>

                  <span className="mt-2 block h-px w-full bg-slate-800/50" />
                  <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-400">
                    {Array.isArray(v.text)
                      ? v.text.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                            <span>{item}</span>
                          </li>
                        ))
                      : (
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <span>{v.text}</span>
                        </li>
                      )}
                  </ul>
               </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phrase remontée */}
        <div className="pt-1">
          <div className="mt-2 flex flex-col gap-3 sm:mt-0 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_35px_rgba(8,47,73,0.7)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Parler de votre projet
            </a>
            <a
              href="#processus"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-100 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/70 transition"
            >
              Découvrir la méthode
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
