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
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_70%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.25),transparent_60%)]" />

      <div className="container-kosmonde space-y-16 py-16 relative">
        {/* HEADER CENTRÉ */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            À propos de KOSMONDE
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Je suis Yanis, créateur de sites web basé en Suisse.
            J’aide les personnes et petites structures à obtenir un site clair,
            moderne et simple à comprendre — sans stress et sans jargon.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
            Simplicité · Clarté · Écoute · Structure
          </p>
        </div>

        {/* MA FAÇON DE TRAVAILLER */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Ma façon de travailler
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {valeurs.map((v) => (
              <div
                key={v.label}
                className="
                  group relative flex flex-col justify-between
                  rounded-2xl border border-slate-800/70
                  bg-slate-950/80 px-4 py-5
                  shadow-[0_14px_40px_rgba(15,23,42,0.6)]
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)]
                "
              >
                <div
                  className="
                    pointer-events-none absolute inset-0 -z-10
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)]
                  "
                />

                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-100">
                    <span className="text-sm">{v.icon}</span>
                    {v.label}
                  </p>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phrase remontée */}
        <div className="text-center pt-1">
          <p className="text-[11px] text-slate-500">
            Quelques lignes suffisent pour commencer. On clarifie ensemble la suite.
          </p>
        </div>
      </div>
    </section>
  );
}
