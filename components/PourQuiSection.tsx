export function PourQuiSection() {
  return (
    <section
      id="pour-qui"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance KOSMONDE */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.15),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde space-y-10 py-16 relative">
        {/* TITRE + SOUS-TITRE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Pour qui est KOSMONDE ?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Tu dois pouvoir te reconnaître rapidement.
            <br className="hidden sm:block" />
            KOSMONDE accompagne les projets sérieux — même avec de petits moyens.
          </p>
        </div>

        {/* CARTES */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Indépendants & freelances",
              text: "Un site clair pour présenter ton activité, ton style et tes offres.",
              icon: "💼",
            },
            {
              title: "Petites entreprises",
              text: "Une présence pro pour inspirer confiance et expliquer tes services.",
              icon: "🏢",
            },
            {
              title: "Artistes & créatifs",
              text: "Un espace simple pour montrer ton univers, tes projets, ton portfolio.",
              icon: "🎨",
            },
            {
              title: "Associations & projets perso",
              text: "Une page structurée pour expliquer ta mission, tes actions et tes besoins.",
              icon: "🌱",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="relative flex flex-col rounded-2xl border border-slate-800/70 bg-slate-950/80 px-5 py-6 shadow-[0_12px_40px_rgba(15,23,42,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(8,47,73,0.7)]"
            >
              {/* Glow Hover */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_70%)]" />

              {/* Icône */}
              <div className="text-2xl mb-3 text-sky-400/90">{item.icon}</div>

              {/* Titre */}
              <h3 className="text-sm font-semibold text-slate-50">
                {item.title}
              </h3>

              {/* Texte */}
              <p className="mt-2 text-xs text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
