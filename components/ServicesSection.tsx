export function ServicesSection() {
  const cards = [
    {
      id: "onepage",
      title: "Site One-page",
      badge: "Idéal pour démarrer",
      icon: "📄",
      bullets: [
        "Une page claire et structurée",
        "Parfait pour présenter une offre",
        "Rapide à mettre en place",
      ],
      highlight: "Pour tester une idée ou poser une présence claire.",
      priceLabel: "Essentiel",
      price: "À partir de 250 CHF",
      featured: false,
    },
    {
      id: "vitrine",
      title: "Site vitrine",
      badge: "Format complet",
      icon: "🗂️",
      bullets: [
        "Plusieurs pages (Home, Services, À propos…)",
        "Image pro et contenu organisé",
        "Pensé pour évoluer",
      ],
      highlight: "Pour installer une image pro et rassurer tes visiteurs.",
      priceLabel: "Standard",
      price: "À partir de 280 CHF",
      featured: true,
    },
    {
      id: "surmesure",
      title: "Site sur mesure",
      badge: "Besoins particuliers",
      icon: "🛠️",
      bullets: [
        "Architecture pensée avec toi",
        "Fonctionnalités personnalisées",
        "Accompagnement plus poussé",
      ],
      highlight:
        "Pour un besoin précis ou un projet à fort potentiel.",
      priceLabel: "Sur-mesure",
      price: "Devis sur mesure",
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
            Offres & tarifs
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Trois formats simples, adaptés à ton projet, avec des tarifs clairs dès le début.
          </p>
          <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em]">
            3 formats — 1 même objectif : te rendre lisible en ligne
          </p>
        </div>

        {/* CARTES OFFRES + TARIFS */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={[
                "relative flex flex-col rounded-2xl border px-5 py-6 transition-transform duration-300 bg-slate-950/85 shadow-[0_14px_45px_rgba(15,23,42,0.9)]",
                card.featured
                  ? "border-sky-500/60 shadow-[0_20px_60px_rgba(8,47,73,0.95)] md:-translate-y-2"
                  : "border-slate-800/70",
              ].join(" ")}
            >
              {/* BADGE FEATURED CENTRÉ */}
              {card.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="rounded-full border border-sky-400/60 bg-sky-500/10 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-md whitespace-nowrap">
                    Format le plus choisi
                  </div>
                </div>
              )}

              {/* Glow au hover */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_70%)]" />

              {/* En-tête de la carte */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="text-base font-semibold text-slate-50">
                    {card.title}
                  </h3>
                </div>

                <span className="rounded-full bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 text-[10px] font-medium tracking-wide text-slate-200 whitespace-nowrap">
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

              {/* Bloc prix */}
              <div className="mt-4 border-t border-slate-800/70 pt-3">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">
                  {card.priceLabel}
                </p>
                <p className="mt-1 text-xs font-medium text-sky-300">
                  {card.price}
                </p>

                {/* Phrase de synthèse */}
                <p className="mt-3 text-[11px] text-slate-400">
                  {card.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA global sous les offres */}
        <div className="text-center pt-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] hover:brightness-110 transition-transform hover:-translate-y-0.5"
          >
            Parler de ton projet ↗
          </a>
          <p className="mt-2 text-[11px] text-slate-500">
            On échange sur ton besoin, puis on choisit ensemble le format le plus adapté.
          </p>
        </div>
      </div>
    </section>
  );
}
