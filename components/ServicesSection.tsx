export function ServicesSection() {
  const cards = [
    {
      title: "Site One-page",
      badge: "Idéal pour démarrer",
      icon: "🚀",
      bullets: [
        "Une page claire et structurée",
        "Parfait pour présenter une offre",
        "Rapide à mettre en place",
      ],
      highlight: "Pour tester une idée ou poser une présence claire.",
      featured: false,
    },
    {
      title: "Site vitrine",
      badge: "Pour grandir",
      icon: "📌",
      bullets: [
        "Plusieurs pages (Home, Services, À propos…)",
        "Image pro et contenu organisé",
        "Pensé pour évoluer",
      ],
      highlight: "Pour installer une image pro et rassurer tes visiteurs.",
      featured: true, // carte en avant
    },
    {
      title: "Site sur mesure",
      badge: "Projet spécifique",
      icon: "🧩",
      bullets: [
        "Architecture pensée avec toi",
        "Fonctionnalités personnalisées",
        "Accompagnement plus poussé",
      ],
      highlight: "Pour un besoin précis ou un projet à fort potentiel.",
      featured: false,
    },
  ];

  return (
    <section
      id="services"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde space-y-10 py-16 relative">
        {/* TITRE + SOUS-TITRE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Ce que je propose
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Des formats simples à comprendre, que l’on adapte ensemble à ton
            projet.
          </p>
          <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em]">
            3 formats — 1 même objectif : te rendre lisible en ligne
          </p>
        </div>

        {/* CARTES SERVICES */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className={[
                "relative flex flex-col rounded-2xl border bg-slate-950/85 px-5 py-6 shadow-[0_14px_45px_rgba(15,23,42,0.9)] transition-transform duration-300",
                card.featured
                  ? "border-sky-500/60 shadow-[0_18px_60px_rgba(8,47,73,0.95)] md:-translate-y-2"
                  : "border-slate-800/70",
              ].join(" ")}
            >
              {/* BADGE FEATURED CENTRÉ PERFECTION */}
              {card.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="rounded-full border border-sky-400/60 bg-sky-500/10 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-md whitespace-nowrap">
                    Format le plus choisi
                  </div>
                </div>
              )}

              {/* Glow au hover */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)]" />

              {/* En-tête de la carte */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="text-base font-semibold text-slate-50">
                    {card.title}
                  </h3>
                </div>

                <span className="rounded-full bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300">
                  {card.badge}
                </span>
              </div>

              {/* Bullet points */}
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {card.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Phrase de synthèse */}
              <p className="mt-4 text-[11px] text-slate-400 border-t border-slate-800/70 pt-3">
                {card.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
