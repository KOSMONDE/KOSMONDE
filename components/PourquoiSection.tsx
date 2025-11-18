export function PourquoiSection() {
  const raisons = [
    {
      title: "Clarté",
      text: "On simplifie ton message pour que l’essentiel soit compris en quelques secondes.",
      icon: "✨",
    },
    {
      title: "Efficacité",
      text: "Le site est conçu pour tes vrais objectifs : informer, rassurer et faire passer à l’action.",
      icon: "🎯",
    },
    {
      title: "Design moderne",
      text: "Un design sobre, lisible et actuel, sans effets inutiles ni surcharge visuelle.",
      icon: "🧠",
    },
    {
      title: "Accompagnement",
      text: "Tu es guidé à chaque étape, avec des explications simples et des choix assumés.",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="pourquoi"
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
            L’idée : un site utile, compréhensible et aligné avec ta réalité,
            sans jargon ni usine à gaz.
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

        {/* CTA vers le contact */}
        <div className="text-center max-w-md mx-auto space-y-2">
          <p className="text-xs text-slate-400">
            Tu me présentes ton projet, je te dis ce qui est réaliste, ce qui est
            prioritaire et par où commencer.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] hover:brightness-110 transition-transform hover:-translate-y-0.5"
          >
            Discuter de ton projet ↗
          </a>
        </div>
      </div>
    </section>
  );
}
