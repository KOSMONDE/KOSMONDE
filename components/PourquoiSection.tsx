export function PourquoiSection() {
  const raisons = [
    {
      title: "Clarté",
      text: "Storytelling simplifié, hiérarchie claire et explications orientées bénéfices.",
      details: ["Diagnostic contenu", "Copywriting orienté conversion"],
      color: "bg-gradient-to-br from-sky-500/70 via-sky-500/30 to-sky-600/40 shadow-[0_8px_25px_rgba(14,165,233,0.35)]",
    },
    {
      title: "Conception SEO",
      text: "Structure, balises et vitesse pensées pour le référencement local et les Core Web Vitals.",
      details: ["Architecture SEO locale", "Audit web performance"],
      color:
        "bg-gradient-to-br from-emerald-400/70 via-emerald-400/30 to-emerald-500/40 shadow-[0_8px_25px_rgba(16,185,129,0.3)]",
    },
    {
      title: "Design premium",
      text: "Interfaces sur-mesure : palettes, micro-interactions et animations inspirées de l’aéronautique.",
      details: ["Systèmes de blocs évolutifs", "Maquettes Figma détaillées"],
      color:
        "bg-gradient-to-br from-violet-500/70 via-violet-500/30 to-violet-600/40 shadow-[0_8px_25px_rgba(139,92,246,0.35)]",
    },
    {
      title: "Accompagnement",
      text: "Process visible, retours en 24 h et feuilles de route actionnables, même après mise en ligne.",
      details: ["Suivi post-lancement", "Formations rapides"],
      color:
        "bg-gradient-to-br from-amber-400/70 via-amber-400/30 to-amber-500/40 shadow-[0_8px_25px_rgba(251,191,36,0.35)]",
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
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Pourquoi choisir KOSMONDE ?
          </h2>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Pour un site clair, professionnel et pensé pour générer des contacts.
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-[12px]">
            Clarté · Simplicité · Résultats · Accompagnement
          </p>
        </div>

        {/* GRILLE RAISONS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {raisons.map((item) => (
            <article
              key={item.title}
              className="relative flex h-full flex-col rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-950 px-6 py-7 shadow-[0_18px_60px_rgba(8,47,73,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-sky-400/60"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />

              <div className="flex items-center gap-3">
                <span
                  className={[
                    "inline-flex h-11 w-11 items-center justify-center rounded-full",
                    item.color,
                  ].join(" ")}
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold text-slate-50 whitespace-nowrap" itemProp="headline">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300" itemProp="description">
                {item.text}
              </p>

              <ul className="mt-5 space-y-2 text-xs text-slate-400">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* TEXTE DE CONFIANCE */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] text-slate-400 sm:text-xs leading-relaxed whitespace-nowrap">
            Présentez-moi votre projet&nbsp;: je vous aide à définir un site simple, utile et aligné avec vos objectifs.
          </p>
        </div>
      </div>
    </section>
  );
}
