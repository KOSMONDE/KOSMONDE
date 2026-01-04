export function PourquoiSection() {
  const raisons = [
    {
      title: "Clarté",
      text: [
        "Storytelling simplifié",
        "Hiérarchie claire",
        "Explications orientées ROI",
      ],
      details: ["Diagnostic contenu", "Copywriting conversion"],
      color: "bg-gradient-to-br from-sky-500/40 via-sky-500/20 to-sky-600/30 shadow-[0_8px_25px_rgba(14,165,233,0.3)]",
    },
    {
      title: "Conception SEO",
      text: [
        "Structure & balises optimisées",
        "Vitesse Core Web Vitals",
        "SEO local maîtrisé",
      ],
      details: ["Architecture SEO locale", "Audit web performance"],
      color: "bg-gradient-to-br from-sky-500/40 via-sky-500/20 to-sky-600/30 shadow-[0_8px_25px_rgba(14,165,233,0.3)]",
    },
    {
      title: "Design premium",
      text: [
        "Interfaces sur mesure",
        "Micro-interactions premium",
        "Palettes & animations",
      ],
      details: ["Blocs évolutifs", "Maquettes Figma"],
      color: "bg-gradient-to-br from-sky-500/40 via-sky-500/20 to-sky-600/30 shadow-[0_8px_25px_rgba(14,165,233,0.3)]",
    },
    {
      title: "Accompagnement",
      text: [
        "Process visible",
        "Retours en 24 h",
        "Feuilles de route claires",
      ],
      details: ["Suivi post-lancement", "Formations rapides"],
      color: "bg-gradient-to-br from-sky-500/40 via-sky-500/20 to-sky-600/30 shadow-[0_8px_25px_rgba(14,165,233,0.3)]",
    },
  ];

  return (
    <section
      id="pourquoi"
      className="relative overflow-hidden border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.3),transparent_55%)]" />

      {/* Paddings adaptés mobile/tablette */}
      <div className="container-kosmonde relative space-y-12 py-14 sm:space-y-16 sm:py-20">
        {/* HEADER CENTRÉ */}
        <div className="mx-auto max-w-lg space-y-3 text-center">
          <span className="inline-flex w-fit items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 pl-4 pr-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)] sm:text-[11px]">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
            Nos piliers
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Pourquoi choisir KOSMONDE ?
          </h2>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Un site clair, pro, fait pour convertir.
          </p>

          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 sm:text-[12px]">
            Simplicité · Résultats · Accompagnement
          </p>
        </div>

        {/* GRILLE RAISONS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {raisons.map((item) => (
            <article
              key={item.title}
              className="relative flex h-full flex-col rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-950 px-5 py-6 sm:px-6 sm:py-7 shadow-[0_18px_60px_rgba(8,47,73,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.005] hover:border-sky-400/60"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />

              <div className="flex items-center gap-3">
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/50",
                    item.color,
                    "shadow-[0_6px_18px_rgba(14,165,233,0.25)] transition-transform duration-300",
                    "group-hover:scale-103 group-hover:border-sky-300/70",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-sky-200 shadow-[0_0_6px_rgba(186,230,253,0.6)]" />
                </span>
                <h3 className="text-lg font-semibold text-slate-50" itemProp="headline">
                  {item.title}
                </h3>
              </div>

              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-300" itemProp="description">
                {item.text.map((part) => (
                  <li key={part} className="flex items-start gap-2">
                    <span className="self-center h-1.5 w-1.5 rounded-full bg-sky-300" />
                    <span>{part}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-4 space-y-1.5 text-[12px] leading-relaxed text-slate-400">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="self-center h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* TEXTE DE CONFIANCE */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] text-slate-400 sm:text-xs leading-relaxed">
            Présentez-nous votre projet : un site utile, aligné à vos objectifs.
          </p>
        </div>
      </div>
    </section>
  );
}
