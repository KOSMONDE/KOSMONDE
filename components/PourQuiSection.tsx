export function PourQuiSection() {
  return (
    <section
      id="pour-qui"
      className="border-b border-slate-900/40 bg-slate-950"
    >
      <div className="container-kosmonde space-y-8 py-16">
        <div>
          <h2 className="section-title">Pour qui est KOSMONDE ?</h2>
          <p className="section-subtitle">
            Tu dois pouvoir te reconnaître rapidement. KOSMONDE est pensé
            pour les projets sérieux, même avec de petits moyens.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Indépendants & freelances",
              text: "Un site clair pour présenter ton activité, ton style et tes offres.",
            },
            {
              title: "Petites entreprises",
              text: "Une présence pro pour inspirer confiance et expliquer tes services.",
            },
            {
              title: "Artistes & créatifs",
              text: "Un espace simple pour montrer ton univers, tes projets, ton portfolio.",
            },
            {
              title: "Associations & projets perso",
              text: "Une page structurée pour expliquer ta mission, tes actions et tes besoins.",
            },
          ].map((item) => (
            <div key={item.title} className="card flex flex-col">
              <h3 className="text-sm font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
