export function ServicesSection() {
  const cards = [
    /* --- Création de sites --- */
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
      highlight: "Pour tester une idée ou poser une présence claire en ligne.",
      featured: false,
    },
    {
      id: "vitrine",
      title: "Site vitrine",
      badge: "Format complet",
      icon: "🗂️",
      bullets: [
        "Plusieurs pages (Accueil, Services, À propos…)",
        "Image professionnelle et contenu organisé",
        "Pensé pour évoluer dans le temps",
      ],
      highlight:
        "Pour installer une image professionnelle et rassurer vos visiteurs.",
      featured: true,
    },
    {
      id: "surmesure",
      title: "Site sur mesure",
      badge: "Besoins particuliers",
      icon: "🛠️",
      bullets: [
        "Architecture pensée avec vous",
        "Fonctionnalités personnalisées",
        "Accompagnement plus poussé",
      ],
      highlight: "Pour un besoin précis ou un projet à fort potentiel.",
      featured: false,
    },

    /* --- Améliorer un site existant --- */
    {
      id: "refonte",
      title: "Refonte de site",
      badge: "Améliorer l’existant",
      icon: "🧱",
      bullets: [
        "Modernisation d’un site déjà en ligne",
        "Structure et lisibilité revues",
        "Design plus professionnel",
      ],
      highlight:
        "Pour rendre votre site plus clair et actuel, sans tout recommencer.",
      featured: false,
    },
    {
      id: "maj",
      title: "Petites mises à jour",
      badge: "Ajustements ponctuels",
      icon: "🩺",
      bullets: [
        "Ajout de blocs ou de pages simples",
        "Corrections visuelles et de contenu",
        "Ajustements expliqués clairement",
      ],
      highlight:
        "Pour garder un site correct mais mieux aligné avec votre activité.",
      featured: false,
    },
    {
      id: "contenu-structure",
      title: "Contenu & structure",
      badge: "Clarifier le message",
      icon: "✏️",
      bullets: [
        "Aide à formuler votre offre simplement",
        "Pages et sections réorganisées",
        "Parcours visiteur plus fluide",
      ],
      highlight:
        "Pour rendre votre site plus compréhensible et rassurant.",
      featured: false,
    },

    /* --- Identité visuelle --- */
    {
      id: "logo",
      title: "Création de logo",
      badge: "Identité visuelle",
      icon: "🎨",
      bullets: [
        "Logo simple, lisible et moderne",
        "Version principale + simplifiée",
        "Formats adaptés au web et à l’impression",
      ],
      highlight:
        "Pour poser une base visuelle cohérente avec votre présence en ligne.",
      featured: false,
    },
    {
      id: "cartes-visite",
      title: "Cartes de visite",
      badge: "Supports imprimés",
      icon: "💳",
      bullets: [
        "Design aligné avec votre site",
        "Recto ou recto-verso",
        "Prêtes pour l’impression",
      ],
      highlight:
        "Pour présenter votre activité avec une identité cohérente.",
      featured: false,
    },

    /* --- Maintenance --- */
    {
      id: "maintenance",
      title: "Maintenance & support",
      badge: "Suivi continu",
      icon: "🛡️",
      bullets: [
        "Corrections régulières",
        "Mises à jour techniques",
        "Ajouts ponctuels de contenu",
      ],
      highlight:
        "Pour garder votre site stable, à jour et agréable à utiliser.",
      featured: false,
    },
  ];

  return (
    <section
      id="services"
      className="scroll-mt-16 md:scroll-mt-20 relative overflow-hidden border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde relative py-16 space-y-14">

        {/* TITRE */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Offres & services
          </h2>

          {/* Phrase réduite + forcée sur une seule ligne */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-400 whitespace-nowrap">
            Sites web, améliorations et identité visuelle : l’essentiel pour une présence claire et professionnelle.
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 whitespace-normal sm:whitespace-nowrap">
            Création · Refonte · Contenu · Visuel · Maintenance
          </p>
        </div>

        {/* CARTES */}
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={[
                "relative rounded-2xl border bg-slate-950/85 px-5 py-6 transition-transform duration-300 shadow-[0_14px_40px_rgba(15,23,42,0.85)] hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)]",
                card.featured ? "border-sky-500/60" : "border-slate-800/70",
              ].join(" ")}
            >
              {/* Glow hover */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />

              {/* Badge Featured (corrigé) */}
              {card.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center justify-center rounded-full border border-sky-400/60 bg-sky-500/10 px-3 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-sky-200 whitespace-nowrap shadow-[0_0_20px_rgba(56,189,248,0.35)] backdrop-blur-md">
                    Format le plus choisi
                  </span>
                </div>
              )}

              {/* En-tête */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="text-base font-semibold text-slate-50">
                    {card.title}
                  </h3>
                </div>

                <span className="rounded-full whitespace-nowrap border border-slate-700/80 bg-slate-900/90 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-200">
                  {card.badge}
                </span>
              </div>

              {/* Bullets */}
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {card.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight */}
              <p className="mt-4 border-t border-slate-800/70 pt-3 text-[11px] text-slate-400">
                {card.highlight}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
