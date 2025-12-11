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
    border: "border-violet-400/60",
    shadow: "shadow-[0_15px_45px_rgba(124,58,237,0.25)]",
    accent: "text-violet-200",
  },
};

type ServiceCardData = {
  id: string;
  title: string;
  badge: string;
  bullets: string[];
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
      "Page claire pour lancer une offre",
      "CTA unique + SEO local",
    ],
    highlight: "Présence rapide pour valider une idée.",
    featured: false,
    timeline: "Livré en 3-4 semaines · Dès 2 400 CHF",
    iconClass: "text-sky-300",
  },
  {
    id: "vitrine",
    title: "Site vitrine",
    badge: "SEO local",
    bullets: [
      "Parcours structuré (Accueil/Services)",
      "Contenus optimisés + preuves sociales",
    ],
    highlight: "Image pro et rassurante pour vos visiteurs.",
    featured: true,
    timeline: "Livré en 5-6 semaines · Dès 3 800 CHF",
    iconClass: "text-sky-300",
  },
  {
    id: "surmesure",
    title: "Site sur mesure",
    badge: "Unique",
    bullets: [
      "Architecture pensée avec vous",
      "UX/UI conversion + connecteurs",
    ],
    highlight: "Besoin précis ou projet ambitieux.",
    featured: false,
    timeline: "Planning dédié · Budget sur devis",
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
        "Logo simple, lisible et moderne",
        "Formats web + impression",
      ],
    highlight:
      "Base visuelle cohérente pour votre présence en ligne.",
    featured: false,
    timeline: "Moodboard + logo livrés en 2 semaines",
    iconClass: "text-sky-300",
  },
    {
      id: "cartes-visite",
      title: "Cartes de visite",
      badge: "Supports imprimés",
    bullets: [
      "Design aligné avec votre site",
      "Recto ou recto-verso",
    ],
    highlight:
      "Présenter votre activité avec une identité cohérente.",
    featured: true,
    timeline: "Fichiers prêts à imprimer sous 5 jours",
    iconClass: "text-sky-300",
  },

    /* --- Maintenance --- */
    {
      id: "maintenance",
      title: "Maintenance & support",
    badge: "Suivi continu",
    bullets: [
      "Corrections régulières",
      "Mises à jour techniques",
    ],
    highlight:
      "Site stable, à jour et agréable à utiliser.",
    featured: false,
    timeline: "Formule mensuelle ou tickets ponctuels",
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
      className="scroll-mt-16 md:scroll-mt-20 relative overflow-hidden border-b border-slate-900/40 bg-slate-950"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde relative py-16 space-y-14">
        {/* TITRE */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="inline-flex w-fit items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 pl-4 pr-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)] sm:text-[11px]">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
            Sites prêts à convertir
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Offres & services
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-400 whitespace-normal sm:whitespace-nowrap">
            Sites web, améliorations et identité visuelle : l’essentiel pour une
            présence claire et professionnelle.
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 whitespace-normal sm:whitespace-nowrap">
            Création · Logo & cartes · Maintenance
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <div className="relative rounded-3xl border border-slate-800/70 bg-slate-900/70 p-2 shadow-[0_25px_60px_rgba(8,47,73,0.5)]">
            <div
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
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
                    aria-pressed={isActive}
                    className={[
                      "flex-1 rounded-2xl border px-5 py-4 text-left transition duration-300",
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
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
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
        "relative rounded-2xl border bg-slate-950/85 px-5 py-6 transition-transform duration-300 shadow-[0_14px_40px_rgba(15,23,42,0.85)] hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.9)]",
        card.featured ? "border-sky-500/60" : "border-slate-800/70",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />
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
          <h3 className="text-base font-semibold leading-tight text-slate-50 whitespace-nowrap">{card.title}</h3>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-xs text-slate-300">
        {card.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-slate-800/70 pt-3 text-[11px] text-slate-400">{card.highlight}</p>

      {card.timeline && (
        <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/50 px-3 py-2 text-xs text-slate-200">
          {card.timeline}
        </div>
      )}
    </div>
  );
}
