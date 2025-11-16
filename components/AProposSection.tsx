export function AProposSection() {
  const faq = [
    {
      q: "Combien de temps faut-il pour créer un site ?",
      a: "Pour une one-page simple, on peut aller assez vite si ton contenu est prêt (quelques semaines). Pour un site vitrine plus complet, il faut un peu plus de temps. On définit un calendrier clair dès le départ.",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "En général : un acompte au démarrage, puis le reste à la livraison du site. Tout est clarifié ensemble avant de commencer.",
    },
    {
      q: "Et si je veux modifier du contenu plus tard ?",
      a: "On peut soit prévoir une formule où je fais les changements pour toi, soit préparer une solution où tu peux modifier certains contenus facilement.",
    },
    {
      q: "Le site sera-t-il adapté au mobile ?",
      a: "Oui, c’est une base non négociable. Le site est conçu pour fonctionner proprement sur mobile, tablette et ordinateur.",
    },
    {
      q: "Est-ce que tu peux m’aider pour l’email pro et le nom de domaine ?",
      a: "Oui, je peux t’accompagner pour choisir et configurer ton nom de domaine, ton hébergement et une adresse email professionnelle.",
    },
  ];

  const valeurs = [
    {
      label: "Ce qui compte pour moi",
      text: "Des sites utiles, qui servent vraiment un projet réel.",
    },
    {
      label: "Ce que je t’apporte",
      text: "De la structure, des explications simples, une vision globale.",
    },
    {
      label: "Comment on travaille",
      text: "Étapes claires, retours réguliers, décisions prises ensemble.",
    },
  ];

  return (
    <section
      id="a-propos"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.22),transparent_70%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.3),transparent_60%)]" />

      <div className="container-kosmonde space-y-16 py-16 relative">
        {/* HEADER CENTRÉ */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            À propos de KOSMONDE
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Derrière KOSMONDE, il y a Yanis, créateur de sites web avec une
            obsession : rendre le numérique plus simple à vivre.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
            Simplicité · Clarté · Écoute · Structure
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.1fr,1.2fr] items-start">
          {/* BLOC À PROPOS + VALEURS */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            {/* Carte principale */}
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.9)] backdrop-blur-sm">
              {/* bandeau haut */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-[11px] text-sky-300">
                    Y
                  </span>
                  Yanis · Création de sites web
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  KOSMONDE
                </span>
              </div>

              <p>
                Je conçois des sites web pour des personnes et des structures
                qui veulent quelque chose de clair, utile et aligné avec leur
                réalité. Pas de solution magique, juste du travail sérieux,
                étape par étape.
              </p>

              <p className="mt-4">
                Mon approche : écouter, simplifier, structurer. Tu n’as pas
                besoin d’être “bon en tech” ni de tout savoir à l’avance.
              </p>

              <p className="mt-4 text-xs text-slate-400">
                Objectif global : t’aider à poser des bases solides pour ton
                projet, grâce à un site qui te ressemble.
              </p>
            </div>

            {/* Valeurs en dessous */}
            <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-400">
              {valeurs.map((v) => (
                <div
                  key={v.label}
                  className="rounded-xl border border-slate-800/70 bg-slate-950/80 px-3 py-3"
                >
                  <p className="text-[11px] font-medium text-slate-200">
                    {v.label}
                  </p>
                  <p className="mt-1 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-50">
              Questions fréquentes
            </h3>

            <div className="space-y-4">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-slate-800/60 bg-slate-950/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.7)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(8,47,73,0.7)]"
                >
                  <p className="text-sm font-medium text-sky-300">
                    {item.q}
                  </p>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
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
