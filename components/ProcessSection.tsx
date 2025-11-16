export function ProcessSection() {
  return (
    <section
      id="processus"
      className="border-b border-slate-900/40 bg-slate-950"
    >
      <div className="container-kosmonde space-y-10 py-16">
        <div>
          <h2 className="section-title">Un processus en 3 étapes</h2>
          <p className="section-subtitle">
            Tu sais toujours où on en est. Pas de jargon inutile, pas de
            surprise.
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Discussion & besoins",
              text: "On clarifie ton projet, ton public, tes objectifs et les contenus nécessaires.",
            },
            {
              step: "02",
              title: "Maquette & structure",
              text: "Je prépare une structure claire, une maquette simple et un premier rendu.",
            },
            {
              step: "03",
              title: "Mise en ligne & suivi",
              text: "Le site est mis en ligne, avec un accompagnement pour la suite.",
            },
          ].map((item) => (
            <li key={item.step} className="card-soft relative flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-mono text-sky-300">
                  {item.step}
                </span>
                <span className="ml-3 h-px flex-1 bg-linear-to-r from-sky-400/60 via-slate-700 to-transparent" />
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
