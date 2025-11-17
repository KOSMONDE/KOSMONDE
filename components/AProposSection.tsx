"use client";

import { useState } from "react";

export function AProposSection() {
  const faq = [
    {
      q: "En combien de temps un site peut-il être prêt ?",
      a: "Pour une page simple, ton site peut être en ligne en quelques semaines si ton contenu est prêt. Pour un site vitrine plus complet, on prévoit un planning un peu plus long, défini ensemble dès le début pour que tout soit clair.",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "Généralement : un acompte au démarrage pour réserver le projet, puis le solde à la mise en ligne du site. Tout est posé par écrit avant de commencer, sans frais cachés ni surprise.",
    },
    {
      q: "Et si je veux modifier du contenu plus tard ?",
      a: "On peut soit prévoir que je fasse les changements pour toi, soit mettre en place une interface simple pour que tu modifies certains contenus en autonomie, avec une courte prise en main.",
    },
    {
      q: "Le site sera-t-il adapté au mobile ?",
      a: "Oui, c’est la base. Le site est pensé dès le départ pour être agréable à utiliser sur mobile, tablette et ordinateur.",
    },
    {
      q: "Est-ce que tu peux m’aider pour le nom de domaine et l’email pro ?",
      a: "Oui. Je t’accompagne pour le choix du nom de domaine, l’hébergement et la création d’une adresse email professionnelle cohérente avec ton projet.",
    },
  ];

  const valeurs = [
    {
      icon: "🎯",
      label: "Ce qui compte pour moi",
      text: "Des sites utiles, ancrés dans le réel : ton projet, tes clients, ta situation concrète.",
    },
    {
      icon: "📐",
      label: "Ce que je t’apporte",
      text: "Un cadre clair, des explications simples et une vision d’ensemble pour ton projet numérique.",
    },
    {
      icon: "🤝",
      label: "Comment on travaille",
      text: "Un rythme posé, des étapes visibles, des décisions prises ensemble, sans pression ni jargon.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="a-propos"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_70%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.25),transparent_60%)]" />

      <div className="container-kosmonde space-y-16 py-16 relative">
        {/* HEADER CENTRÉ */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            À propos de KOSMONDE
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Studio web indépendant basé en Suisse, dédié à la création de sites
            clairs, sobres et structurés pour des personnes et petites
            structures qui veulent une présence simple et maîtrisée sur le web.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
            Simplicité · Clarté · Écoute · Structure
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.1fr,1.15fr] items-start">
          {/* BLOC À PROPOS + VALEURS */}
          <div className="space-y-7 text-sm text-slate-300 leading-relaxed">
            {/* Sous-titre + intro courte */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                Qui je suis
              </p>
              <p className="text-xs text-slate-400">
                Derrière KOSMONDE, il y a Yanis, créateur de sites web basé en
                Suisse. Son objectif : t’aider à utiliser le numérique comme un
                outil simple, au service de ton projet, pas comme une source de
                stress.
              </p>
            </div>

            {/* Carte principale */}
            <div className="rounded-2xl border border-slate-800/70 bg-[#0B1525CC] p-6 shadow-[0_18px_50px_rgba(3,7,18,0.9)] backdrop-blur-sm">
              {/* barre “fenêtre” */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700/50" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/15 text-[11px] text-sky-300 border border-sky-500/40">
                      K
                    </span>
                    Studio web KOSMONDE
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Basé en Suisse
                </span>
              </div>

              {/* Séparateur fin */}
              <div className="h-px w-full bg-gradient-to-r from-sky-500/60 via-sky-400/20 to-transparent rounded-full mb-5" />

              {/* Contenu en 2 colonnes */}
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] lg:items-start">
                {/* Colonne gauche : texte structuré */}
                <div className="space-y-4 max-w-3xl">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">
                      Pour qui
                    </p>
                    <p>
                      Pour les personnes et les petites structures qui veulent
                      un site clair, utile et aligné avec leur réalité. Pas de
                      promesse magique : on construit un outil solide, étape par
                      étape.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">
                      Comment on avance
                    </p>
                    <p>
                      En écoutant ton projet, en simplifiant ce qui est flou et
                      en posant une structure compréhensible. Tu n’as pas
                      besoin d’être “bon en tech” : je t’explique chaque choix
                      avec des mots simples.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">
                      Mon rôle
                    </p>
                    <p className="text-xs text-slate-400">
                      T’aider à poser des bases solides pour ton projet, avec
                      un site que tu comprends, que tu peux faire évoluer et
                      qui te ressemble vraiment.
                    </p>
                  </div>
                </div>

                {/* Colonne droite : infos + mini timeline */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 px-3 py-3 text-xs text-slate-300">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 mb-2">
                      Infos studio
                    </p>
                    <div className="space-y-1.5">
                      <p>Basé en Suisse · projets à distance possibles</p>
                      <p>Sites web pour petites structures et indépendants</p>
                      <p>Processus posé, sans jargon ni rendez-vous inutiles</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 px-3 py-3 text-xs text-slate-400">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 mb-2">
                      Comment se déroule un projet
                    </p>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-0.5">
                        <span className="h-2 w-2 rounded-full bg-sky-400" />
                        <span className="flex-1 w-px bg-slate-700/70" />
                        <span className="h-2 w-2 rounded-full bg-sky-400/80" />
                        <span className="flex-1 w-px bg-slate-700/70" />
                        <span className="h-2 w-2 rounded-full bg-sky-400/60" />
                      </div>
                      <div className="space-y-1.5">
                        <p>
                          <span className="text-slate-200">1. Comprendre</span>{" "}
                          ton projet, ton contexte et tes priorités.
                        </p>
                        <p>
                          <span className="text-slate-200">2. Concevoir</span>{" "}
                          une structure claire, un contenu lisible et un design
                          sobre.
                        </p>
                        <p>
                          <span className="text-slate-200">
                            3. Mettre en ligne
                          </span>{" "}
                          puis t’accompagner sur la suite (mise à jour,
                          évolution, questions).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature */}
              <div className="mt-5 pt-3 border-t border-slate-800/70 flex flex-col items-start justify-between gap-2 text-[11px] text-slate-500 sm:flex-row sm:items-center">
                <p>
                  Tu restes accompagné, informé et serein à chaque étape. Le
                  site doit t’aider à avancer, pas te rajouter une charge
                  mentale.
                </p>
                <p className="sm:text-right text-slate-400">
                  Yanis · créateur de KOSMONDE
                </p>
              </div>
            </div>

            {/* Valeurs */}
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                Ma façon de travailler
              </p>

              <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-400">
                {valeurs.map((v) => (
                  <div
                    key={v.label}
                    className="rounded-xl border border-slate-800/70 bg-slate-950/80 px-3 py-3"
                  >
                    <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-100">
                      <span className="text-sm">{v.icon}</span>
                      {v.label}
                    </p>
                    <p className="mt-1.5 leading-relaxed">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-50">
                Questions fréquentes
              </h3>
              <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                FAQ
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Quelques réponses rapides aux questions qui reviennent souvent
              quand on démarre un projet de site web ensemble.
            </p>

            <div className="space-y-3">
              {faq.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={`group w-full text-left rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 shadow-[0_10px_30px_rgba(3,7,18,0.7)] transition-all ${
                      isOpen
                        ? "shadow-[0_16px_40px_rgba(8,47,73,0.7)] border-sky-500/50"
                        : "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(8,47,73,0.5)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-slate-50 group-hover:text-sky-300">
                        {item.q}
                      </p>
                      <span className="mt-1 text-[11px] text-slate-500">
                        {isOpen ? "–" : "+"}
                      </span>
                    </div>

                    {isOpen && (
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </button>
                );
              })}
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
          <p className="mt-2 text-[11px] text-slate-500">
            Quelques lignes suffisent pour commencer. On clarifie ensemble la
            suite.
          </p>
        </div>
      </div>
    </section>
  );
}
