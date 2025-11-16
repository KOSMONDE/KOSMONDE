export function ServicesSection() {
  return (
    <section
      id="services"
      className="border-b border-slate-900/40 bg-slate-950"
    >
      <div className="container-kosmonde space-y-8 py-16">
        <div>
          <h2 className="section-title">Ce que je propose</h2>
          <p className="section-subtitle">
            Des formats simples à comprendre, que l’on adapte ensemble à ton
            projet.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Site One-page",
              badge: "Idéal pour démarrer",
              bullets: [
                "Une page claire et structurée",
                "Parfait pour présenter une offre",
                "Rapide à mettre en place",
              ],
            },
            {
              title: "Site vitrine",
              badge: "Pour grandir",
              bullets: [
                "Plusieurs pages (Home, Services, À propos…)",
                "Image pro et contenu organisé",
                "Pensé pour évoluer",
              ],
            },
            {
              title: "Site sur mesure",
              badge: "Projet spécifique",
              bullets: [
                "Architecture pensée avec toi",
                "Fonctionnalités personnalisées",
                "Accompagnement plus poussé",
              ],
            },
          ].map((card) => (
            <div key={card.title} className="card-soft flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-50">
                  {card.title}
                </h3>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-300">
                  {card.badge}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {card.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
