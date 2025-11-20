"use client";

export function AProposSection() {
  const valeurs = [
    {
      icon: "🎯",
      label: "Ce qui compte pour moi",
      text: "Créer des sites utiles, ancrés dans le réel : ton projet, tes clients, ta situation concrète.",
    },
    {
      icon: "📐",
      label: "Ce que je t’apporte",
      text: "Un cadre clair, des explications simples et une vision d’ensemble pour ton projet numérique.",
    },
    {
      icon: "🤝",
      label: "Comment on avance",
      text: "Un rythme posé, des étapes visibles, des décisions prises ensemble, sans pression ni jargon.",
    },
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
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            À propos de KOSMONDE
          </h2>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Créateur de sites web basé en Suisse. J’accompagne les indépendants et petites structures vers un site clair, moderne et parfaitement cohérent avec leur image — sans complexité et avec un accompagnement soigné.
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Simplicité · Clarté · Écoute · Structure
          </p>
        </div>

        {/* MA FAÇON DE TRAVAILLER */}
        <div className="mx-auto max-w-4xl space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Ma façon de travailler
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {valeurs.map((v) => (
              <div
                key={v.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/70 bg-slate-950/80 px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)]"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-100">
                    <span className="text-sm">{v.icon}</span>
                    {v.label}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phrase remontée */}
        <div className="pt-1 text-center">
          <p className="text-[11px] text-slate-500">
            Quelques lignes suffisent pour commencer. On clarifie ensemble la suite.
          </p>
        </div>
      </div>
    </section>
  );
}
