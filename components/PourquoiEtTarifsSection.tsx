export function PourquoiEtTarifsSection() {
  const raisons = [
    {
      title: "Clarté",
      text: "On va à l’essentiel, pour que ton message soit compris immédiatement.",
      icon: "✨",
    },
    {
      title: "Efficacité",
      text: "Le site est pensé pour tes objectifs réels : informer, rassurer, faire contacter.",
      icon: "🎯",
    },
    {
      title: "Design moderne",
      text: "Sobre, lisible, actuel. Pas de surcharge visuelle, pas de bruit.",
      icon: "🧠",
    },
    {
      title: "Accompagnement",
      text: "Tu n’es pas laissé seul. Je t’explique ce que je fais et pourquoi.",
      icon: "🤝",
    },
  ];

  const offres = [
    {
      name: "Essentiel",
      subtitle: "One-page simple pour démarrer",
      price: "À partir de 250 CHF",
      highlight: "Pour poser une base claire rapidement.",
      featured: false,
    },
    {
      name: "Standard",
      subtitle: "Site vitrine plusieurs pages",
      price: "À partir de 350 CHF",
      highlight: "Format le plus choisi pour une présence pro complète.",
      featured: true,
    },
    {
      name: "Sur-mesure",
      subtitle:
        "Projet spécifique, fonctionnalités particulières, accompagnement avancé.",
      price: "Devis sur mesure",
      highlight:
        "On construit ensemble, sans ajouter ce qui n’est pas utile pour ton projet.",
      featured: false,
    },
  ];

  return (
    <section
      id="tarifs"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.3),transparent_55%)]" />

      <div className="container-kosmonde space-y-16 py-16 relative">

        {/* HEADER CENTRÉ */}
        <div className="text-center max-w-lg mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Pourquoi KOSMONDE ?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            L’objectif est simple : un site qui sert vraiment ton projet,
            sans te perdre dans la technique.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
            Clarté · Efficacité · Design moderne · Accompagnement
          </p>
        </div>

        {/* GRILLE RAISONS */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {raisons.map((item) => (
            <div
              key={item.title}
              className="relative rounded-2xl border border-slate-800/70 bg-slate-950/85 px-5 py-6 shadow-[0_14px_40px_rgba(15,23,42,0.85)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)]"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)]" />

              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <h3 className="text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* TARIFS */}
        <div className="space-y-5 max-w-xl mx-auto text-center">
          <h3 className="text-sm font-semibold text-slate-50">
            Tarifs simples et transparents
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            Chaque projet est unique, mais voici des ordres d’idée.  
            L’objectif : te donner une vision claire dès le début.
          </p>
        </div>

        {/* CARTES TARIFS */}
        <div className="grid gap-6 md:grid-cols-3">
          {offres.map((offre) => (
            <div
              key={offre.name}
              className={[
                "relative rounded-2xl border px-6 py-6 shadow-[0_14px_40px_rgba(15,23,42,0.85)] bg-slate-950/90 text-left",
                offre.featured
                  ? "border-sky-500/60 shadow-[0_20px_60px_rgba(8,47,73,0.95)]"
                  : "border-slate-800/80",
              ].join(" ")}
            >
              {offre.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-sky-400/60 bg-sky-500/10 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.45)] backdrop-blur-md whitespace-nowrap">
                  Format le plus choisi
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-50">
                  {offre.name}
                </h4>
                <p className="text-[11px] text-slate-400">{offre.subtitle}</p>
              </div>

              <span className="mt-3 inline-block text-xs font-medium text-sky-300">
                {offre.price}
              </span>

              <p className="mt-3 text-[11px] text-slate-400 border-t border-slate-800/70 pt-3">
                {offre.highlight}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] hover:brightness-110 transition-transform hover:-translate-y-0.5"
          >
            Demander une estimation ↗
          </a>

          <p className="mt-2 text-[11px] text-slate-500">
            On discute ensemble, puis on construit une estimation adaptée.
          </p>
        </div>
      </div>
    </section>
  );
}
