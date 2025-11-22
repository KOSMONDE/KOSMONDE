"use client";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Discussion & besoins",
      text: "On clarifie votre projet, votre public, vos objectifs et les contenus nécessaires.",
      icon: "💬",
    },
    {
      step: "02",
      title: "Maquette & structure",
      text: "Je prépare une structure claire, une maquette simple et un premier rendu.",
      icon: "🧩",
    },
    {
      step: "03",
      title: "Mise en ligne & suivi",
      text: "Le site est mis en ligne, avec un accompagnement pour la suite.",
      icon: "🚀",
    },
  ];

  return (
    <section
      id="processus"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde space-y-12 py-16 relative">
        {/* TITRE + SOUS-TITRE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Comment se déroule un projet ?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Trois étapes claires pour transformer votre idée en site en ligne, en toute sérénité.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em] mt-1">
            Simple · Transparent · Structuré
          </p>
        </div>

        {/* STEPS */}
        <ol className="grid gap-8 md:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((item) => (
            <li
              key={item.step}
              className="
                relative flex flex-col rounded-2xl border border-slate-800/60 bg-slate-950/80
                px-6 py-8
                shadow-[0_10px_30px_rgba(15,23,42,0.7)]
                md:shadow-[0_14px_45px_rgba(15,23,42,0.8)]
                transition-transform duration-300
                hover:-translate-y-1
                hover:shadow-[0_16px_45px_rgba(8,47,73,0.8)]
                md:hover:shadow-[0_22px_55px_rgba(8,47,73,0.85)]
              "
            >
              {/* Glow hover */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)]" />

              {/* STEP HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-mono text-sky-300 tracking-[0.2em]">
                  {item.step}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-sky-400/60 via-slate-700 to-transparent" />
              </div>

              {/* TITLE */}
              <h3 className="text-sm font-semibold text-slate-50">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
