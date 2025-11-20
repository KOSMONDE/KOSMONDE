export function PourquoiSection() {
  const raisons = [
    {
      title: "Clarté",
      text: "En quelques secondes, vos visiteurs comprennent qui vous êtes et ce que vous proposez.",
      icon: "✨",
    },
    {
      title: "Efficacité",
      text: "Le site guide vos visiteurs vers la prise de contact ou la demande de devis.",
      icon: "🎯",
    },
    {
      title: "Design moderne",
      text: "Un design sobre et professionnel qui renforce votre crédibilité.",
      icon: "🧠",
    },
    {
      title: "Accompagnement",
      text: "Vous êtes guidé à chaque étape, sans jargon technique ni décisions floues.",
      icon: "🤝",
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

      <div className="container-kosmonde relative space-y-16 py-16">
        
        {/* HEADER CENTRÉ */}
        <div className="mx-auto max-w-lg space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl whitespace-nowrap">
            Pourquoi choisir KOSMONDE ?
          </h2>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base whitespace-nowrap">
            Pour un site clair, professionnel et pensé pour générer des contacts.
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Clarté · Simplicité · Résultats · Accompagnement
          </p>
        </div>

        {/* GRILLE RAISONS */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {raisons.map((item) => (
            <div
              key={item.title}
              className="relative rounded-2xl border border-slate-800/70 bg-slate-950/85 px-5 py-6 shadow-[0_14px_40px_rgba(15,23,42,0.85)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)]"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />

              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <h3 className="text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* TEXTE DE CONFIANCE — UNE SEULE LIGNE */}
        <div className="mx-auto max-w-md text-center">
          <p className="text-[11px] text-slate-400 sm:text-xs whitespace-nowrap">
            Présentez-moi votre projet : je vous aide à définir un site simple, utile et aligné avec vos objectifs.
          </p>
        </div>
      </div>
    </section>
  );
}
