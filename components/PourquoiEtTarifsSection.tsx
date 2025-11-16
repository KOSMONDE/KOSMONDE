export function PourquoiEtTarifsSection() {
  return (
    <section
      id="tarifs"
      className="border-b border-slate-900/40 bg-slate-950"
    >
      <div className="container-kosmonde space-y-12 py-16">
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr]">
          {/* Pourquoi KOSMONDE */}
          <div>
            <h2 className="section-title">Pourquoi KOSMONDE ?</h2>
            <p className="section-subtitle">
              L’objectif est simple : un site qui sert vraiment ton projet,
              sans te perdre dans la technique.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Clarté",
                  text: "On va à l’essentiel, pour que ton message soit compris immédiatement.",
                },
                {
                  title: "Efficacité",
                  text: "Le site est pensé pour tes objectifs réels : informer, rassurer, faire contacter.",
                },
                {
                  title: "Design moderne",
                  text: "Sobre, lisible, actuel. Pas de surcharge visuelle, pas de bruit.",
                },
                {
                  title: "Accompagnement",
                  text: "Tu n’es pas laissé seul. Je t’explique ce que je fais et pourquoi.",
                },
              ].map((item) => (
                <div key={item.title} className="card">
                  <h3 className="text-sm font-semibold text-slate-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tarifs simples */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-50">
              Tarifs simples et transparents
            </h3>
            <p className="text-xs text-slate-400">
              Chaque projet est unique, mais voici des ordres d’idée. Le but
              est que tu saches où tu vas dès le départ.
            </p>

            <div className="space-y-4">
              <div className="card-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-50">
                      Essentiel
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      One-page simple pour démarrer
                    </p>
                  </div>
                  <span className="text-xs font-medium text-sky-300">
                    À partir de XXX CHF
                  </span>
                </div>
              </div>

              <div className="card-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-50">
                      Standard
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Site vitrine plusieurs pages
                    </p>
                  </div>
                  <span className="text-xs font-medium text-sky-300">
                    À partir de XXX CHF
                  </span>
                </div>
              </div>

              <div className="card-soft">
                <div>
                  <h4 className="text-sm font-semibold text-slate-50">
                    Sur-mesure
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Projet spécifique, fonctionnalités particulières, besoin
                    d’accompagnement plus poussé.
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-200">
                    Devis construit ensemble, en fonction de ce dont tu as
                    vraiment besoin.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-2 text-xs font-medium text-slate-950 hover:bg-sky-300"
            >
              Demander une estimation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
