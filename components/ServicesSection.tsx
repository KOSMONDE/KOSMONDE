"use client";

import { useState } from "react";

export const SITE_SERVICE_IDS = new Set(["onepage", "vitrine", "surmesure"]);

const TABS = [
  {
    id: "sites",
    label: "Création de sites",
    description: "One-page, vitrine ou sur mesure",
  },
  {
    id: "accompagnements",
    label: "Autres accompagnements",
    description: "Logo, cartes de visite, maintenance",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];
const TAB_STYLES: Record<
  TabId,
  {
    border: string;
    shadow: string;
    accent: string;
  }
> = {
  sites: {
    border: "border-sky-400/60",
    shadow: "shadow-[0_15px_45px_rgba(14,165,233,0.25)]",
    accent: "text-sky-200",
  },
  accompagnements: {
    border: "border-sky-400/60",
    shadow: "shadow-[0_15px_45px_rgba(14,165,233,0.25)]",
    accent: "text-sky-200",
  },
};

type Bullet =
  | string
  | {
      text: string;
      hint?: string;
    };

type ServiceCardData = {
  id: string;
  title: string;
  badge: string;
  bullets: Bullet[];
  highlight: string;
  featured: boolean;
  timeline?: string;
  iconClass?: string;
  icon?: string;
};

export const SERVICE_CARD_DATA: ServiceCardData[] = [
  /* --- Création de sites --- */
    {
    id: "onepage",
    title: "Site one-page",
    badge: "One-page locale",
    bullets: [
      {
        text: "Page claire pour ton offre",
        hint: "Une seule page structurée pour présenter ton offre principale.",
      },
      {
        text: "Structure courte, CTA unique",
        hint: "Navigation courte et un appel à l’action mis en avant.",
      },
      {
        text: "SEO local, balises propres",
        hint: "Mots-clés locaux, balises title/meta et titres Hn propres.",
      },
      {
        text: "Preuves rapides (avis/chiffres)",
        hint: "Ajout d’avis, notes ou chiffres clés visibles.",
      },
      {
        text: "Chargement rapide + tracking",
        hint: "Optimisation poids/perf et installation d’un suivi analytics.",
      },
    ],
    highlight: "Présence en ligne en quelques semaines.",
    featured: false,
    timeline: "2-3 semaines · 400 CHF",
    iconClass: "text-sky-300",
  },
  {
    id: "vitrine",
    title: "Site vitrine",
    badge: "SEO local",
    bullets: [
      {
        text: "Parcours multi-pages clair",
        hint: "Navigation simple : Accueil, Services, Contact, à la carte.",
      },
      {
        text: "Contenus optimisés + preuves",
        hint: "Textes pensés pour rassurer, avec avis ou références.",
      },
      {
        text: "SEO local + balises par page",
        hint: "Titres, meta, Hn et mots-clés locaux page par page.",
      },
      {
        text: "CTA visibles (contact/devis)",
        hint: "Appels à l’action mis en évidence pour générer des prises de contact.",
      },
      {
        text: "Chargement rapide + analytics",
        hint: "Perf optimisées et installation d’un suivi analytique.",
      },
    ],
    highlight: "Image pro et rassurante pour vos visiteurs.",
    featured: true,
    timeline: "3-5 semaines · 800 CHF",
    iconClass: "text-sky-300",
  },
  {
    id: "surmesure",
    title: "Site sur mesure",
    badge: "Unique",
      bullets: [
      {
        text: "Parcours et pages co-conçus",
        hint: "Co-conception des pages et du chemin utilisateur.",
      },
      {
        text: "UX/UI sur mesure",
        hint: "Design adapté à vos usages, orienté résultats.",
      },
      {
        text: "CRM, paiement, réservation",
        hint: "Connexion à vos outils métiers, CRM, paiement, réservations.",
      },
      {
        text: "SEO, perfs, sécurité",
        hint: "Optimisations techniques, perfs et sécurité.",
      },
      {
        text: "Support prioritaire + module RDV",
        hint: "Accompagnement prioritaire et prise de rendez-vous intégrée.",
      },
    ],
    highlight: "Besoin précis ou projet ambitieux.",
    featured: false,
    timeline: "Devis gratuit",
    iconClass: "text-sky-300",
  },

    /* --- Améliorer un site existant --- */

    /* --- Identité visuelle --- */

    /* --- Maintenance --- */
    {
      id: "logo",
        title: "Création de logo",
        badge: "Identité visuelle",
    bullets: [
      {
        text: "Logo simple et lisible",
        hint: "Formes et typographies pensées pour tous supports."
      },
      {
        text: "Formats web + impression",
        hint: "Fichiers vectoriels et PNG optimisés."
      },
      {
        text: "Couleurs/typo alignées",
        hint: "Palette et caractère cohérents avec votre identité."
      },
    ],
    highlight:
      "Base visuelle cohérente en ligne.",
    featured: false,
    timeline: "Livré en 3-5 jours · 120 CHF",
    iconClass: "text-sky-300",
  },
    {
      id: "cartes-visite",
      title: "Cartes de visite",
      badge: "Supports imprimés",
    bullets: [
      {
        text: "Design aligné à votre site",
        hint: "Couleurs, aires et typographies reprises pour cohérence."
      },
      {
        text: "Recto/verso, formats standards",
        hint: "Prêt à l’impression (85x55, 300 dpi, marges incluses)."
      },
      {
        text: "Fichiers prêts à imprimer (PDF)",
        hint: "Versions CMJN + PDF/X-1a livrées."
      },
    ],
    highlight: "Identité cohérente pour vos cartes.",
    featured: true,
    timeline: "Livré en 3-5 jours · 90 CHF",
    iconClass: "text-sky-300",
  },

    /* --- Maintenance --- */
    {
      id: "maintenance",
      title: "Maintenance",
    badge: "Suivi continu",
    bullets: [
      {
        text: "Corrections régulières",
        hint: "Élimination de bogues et ajustements contenus."
      },
      {
        text: "Mises à jour techniques",
        hint: "Frameworks, plugins et CMS gardés à jour."
      },
      {
        text: "Optimisations sécu/perf",
        hint: "Surveillance perfs, sauvegardes et sécurité renforcée."
      },
    ],
    highlight:
      "Site stable, à jour et agréable à utiliser.",
    featured: false,
    timeline: "Sous 48h · 70 CHF/mois",
    iconClass: "text-sky-300",
  },
];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<TabId>("sites");
  const activeCards =
    activeTab === "sites"
      ? SERVICE_CARD_DATA.filter((card) => SITE_SERVICE_IDS.has(card.id))
      : SERVICE_CARD_DATA.filter((card) => !SITE_SERVICE_IDS.has(card.id));
  const activeLabel =
    TABS.find((tab) => tab.id === activeTab)?.label ?? "Création de sites";

  return (
    <section
      id="services"
      className="scroll-mt-16 md:scroll-mt-20 relative border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde relative py-16 space-y-14">
        {/* TITRE */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="inline-flex w-fit items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 pl-4 pr-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)] sm:text-[11px]">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
            Nos prestations
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Offres & services
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-400 whitespace-normal sm:whitespace-normal">
            Sites web, améliorations et identité visuelle : l’essentiel pour une présence claire.
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 whitespace-normal sm:whitespace-nowrap">
            Création · Logo & cartes · Maintenance
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <div
            className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between md:justify-center md:gap-4"
            role="tablist"
            aria-label="Choisir un type de service"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={[
                    "w-full max-w-[320px] sm:w-auto sm:flex-1 rounded-2xl border px-5 py-4 text-center sm:text-left md:text-center transition duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                    isActive
                      ? [
                          "bg-slate-950/95 text-slate-50",
                          TAB_STYLES[tab.id].border,
                          TAB_STYLES[tab.id].shadow,
                        ].join(" ")
                      : "border-slate-800/80 text-slate-400 hover:text-slate-100 hover:bg-slate-900/40",
                  ].join(" ")}
                >
                  <span className="block text-sm font-semibold tracking-wide">{tab.label}</span>
                  <span
                    className={[
                      "mt-1 block text-xs",
                      isActive ? TAB_STYLES[tab.id].accent : "text-slate-500",
                    ].join(" ")}
                  >
                    {tab.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <ServiceGrid title={activeLabel} cards={activeCards} />
      </div>
    </section>
  );
}

function ServiceGrid({ title, cards }: { title: string; cards: ServiceCardData[] }) {
  return (
    <div className="space-y-6">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">{title}</p>
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3 justify-items-center overflow-visible service-grid">
        {cards.map((card) => (
          <ServiceCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <div
      className={[
        "group relative z-0 w-full max-w-[340px] overflow-visible rounded-2xl border bg-slate-950/85 px-6 py-7 transition duration-300 shadow-[0_16px_45px_rgba(15,23,42,0.9)] hover:z-20 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(8,47,73,0.95)] focus-within:z-20 focus-within:-translate-y-1 focus-within:shadow-[0_22px_60px_rgba(8,47,73,0.95)]",
        card.featured ? "border-sky-500/60" : "border-slate-800/70",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {card.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center justify-center rounded-full border border-sky-400/60 bg-sky-500/10 px-3 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-sky-200 whitespace-nowrap shadow-[0_0_20px_rgba(56,189,248,0.35)] backdrop-blur-md">
            Format le plus choisi
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {card.iconClass ? (
            <span
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70",
                card.iconClass,
              ].join(" ")}
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-current" />
            </span>
          ) : (
            <span className="text-2xl" aria-hidden="true">
              {card.icon ?? "•"}
            </span>
          )}
          <h3 className="text-base font-semibold leading-tight text-slate-50 whitespace-nowrap sm:whitespace-normal">{card.title}</h3>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-xs text-slate-300">
        {card.bullets.map((b, idx) => {
          const text = typeof b === "string" ? b : b.text;
          const hint = typeof b === "string" ? undefined : b.hint;

          return (
            <li
              key={`${card.id}-${idx}`}
              className="flex items-center gap-2 text-left md:items-start md:gap-2 md:text-left group overflow-visible"
            >
              <span className="self-center md:self-center h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span className="flex-1 whitespace-nowrap sm:whitespace-normal">{text}</span>
                  {hint && (
                    <span className="relative hidden sm:inline-flex group/tt self-center">
                      <span
                        aria-label={hint}
                        className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-700/70 text-[10px] text-slate-200/80 hover:text-sky-300 hover:border-sky-500/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        tabIndex={0}
                      >
                        ?
                      </span>

                      <span
                        role="tooltip"
                        className="
                          pointer-events-none absolute top-1/2 z-[999] w-[220px] -translate-y-1/2 rounded
                          border border-slate-800 bg-slate-950/95 px-3 py-2 text-[10px] text-slate-200
                          opacity-0 scale-[0.98] transition
                          group-hover/tt:opacity-100 group-hover/tt:scale-100
                          group-focus-within/tt:opacity-100 group-focus-within/tt:scale-100

                          left-full ml-2 translate-x-1
                          group-hover/tt:translate-x-0

                          md:[.service-grid>div:nth-child(3n)_&]:right-full
                          md:[.service-grid>div:nth-child(3n)_&]:left-auto
                          md:[.service-grid>div:nth-child(3n)_&]:mr-2
                          md:[.service-grid>div:nth-child(3n)_&]:ml-0
                          md:[.service-grid>div:nth-child(3n)_&]:-translate-x-1
                          md:[.service-grid>div:nth-child(3n)_&]:group-hover/tt:translate-x-0
                        "
                      >
                        {hint}
                      </span>
                    </span>
                  )}
            </li>
          );
        })}
      </ul>

      <p className="mt-4 border-t border-slate-800/70 pt-3 text-[11px] text-slate-400 whitespace-nowrap sm:whitespace-normal">
        {card.highlight}
      </p>

      {card.timeline && (
        <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/50 px-3 py-2 text-center text-xs text-slate-200 whitespace-nowrap">
          {card.timeline}
        </div>
      )}
    </div>
  );
}
