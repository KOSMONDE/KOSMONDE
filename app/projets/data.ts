export type ProjectStatus = "online" | "progress" | "refonte";

export type Project = {
  slug: string;
  title: string;
  type: string;
  status: ProjectStatus;
  shortDesc: string;
  desc: string;
  context: string;
  features: string[];
  techStack: string;
  link?: string;
  img: string;

  // Propriétés optionnelles
  client?: string;
  sector?: string;
  year?: string | number;
  role?: string;
  heroSummary?: string;
  results?: string[];
  testimonial?: string;
  testimonialName?: string;
  testimonialRole?: string;
  kosmondeRoles?: string[];
  techBadges?: string[];
};

export const projects: Project[] = [
  // ---------------------------------------------------------------------------
  // PROJET 1 — SEKOBA
  // ---------------------------------------------------------------------------
  {
    slug: "salon-sekoba",
    title: "SEKOBA COIFFURE",
    type: "Site vitrine",
    status: "online",
    shortDesc:
      "Site vitrine complet pour un salon de coiffure avec prise de rendez-vous en ligne.",
    desc:
      "Site vitrine complet pour un salon : services et tarifs, galerie photo/vidéo, avis Google et prise de rendez-vous en ligne.",
    context:
      "Le salon avait besoin d’une présence claire en ligne pour présenter son univers, ses services et simplifier la prise de rendez-vous.",
    features: [
      "Présentation des services et des tarifs",
      "Galerie photo et vidéo",
      "Intégration des avis Google",
      "Formulaire de contact",
      "Prise de rendez-vous en ligne",
    ],
    techStack:
      "Site vitrine moderne avec intégration d’outils de réservation et d’avis externes.",
    link: "https://www.sekoba-coiffure.ch/",
    img: "/projets/SEKOBA.png",

    client: "Salon de coiffure SEKOBA",
    sector: "Beauté / Coiffure",
    year: 2025,
    role: "Conception UX/UI & développement complet",
    heroSummary:
      "Site vitrine moderne pour un salon de coiffure, avec réservation en ligne et mise en valeur des cheveux texturés.",

    results: [
      "Prise de rendez-vous en ligne simplifiée pour les clientes.",
      "Image de marque plus professionnelle et cohérente.",
    ],

    testimonial:
      "Le site est clair, moderne et nos clientes prennent facilement rendez-vous en ligne.",
    testimonialName: "Gérant·e du salon SEKOBA",
    testimonialRole: "Salon de coiffure SEKOBA",

    kosmondeRoles: [
      "Analyse des besoins et de la cible",
      "Conception UX/UI",
      "Intégration de l’outil de réservation",
      "Optimisation mobile",
    ],

    techBadges: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },

  // ---------------------------------------------------------------------------
  // PROJET 2 — GBM AVOCATS
  // ---------------------------------------------------------------------------
  {
    slug: "gbm-avocats",
    title: "GBM Avocats",
    type: "Site vitrine",
    status: "refonte",
    shortDesc:
      "Site vitrine structuré pour un cabinet d’avocats, actuellement en refonte moderne.",
    desc:
      "Site vitrine professionnel pour un cabinet d’avocats : équipe, domaines de compétence, avis Google, informations sur les honoraires, blog et formulaire de contact.",
    context:
      "Une première version WordPress existait déjà. L’objectif est une version plus moderne, plus lisible et techniquement plus maîtrisée (JS).",
    features: [
      "Présentation de l’équipe et des profils",
      "Domaines de compétence structurés",
      "Intégration des avis Google",
      "Informations sur les honoraires",
      "Blog / actualités",
      "Formulaire de contact et coordonnées pro",
    ],
    techStack:
      "Refonte vers une stack JavaScript moderne, avec un focus sur la clarté et la confiance.",
    link: "https://gbm-avocats.com/",
    img: "/projets/GBM-AVOCATS.png",

    client: "Cabinet GBM Avocats",
    sector: "Droit / Services juridiques",
    year: 2025,
    role: "Refonte design & intégration front-end",
    heroSummary:
      "Refonte d’un site vitrine pour un cabinet d’avocats, axée sur la clarté, la confiance et la lisibilité des informations.",

    results: [
      "Structure plus claire des domaines de compétence.",
      "Expérience plus rassurante pour les visiteurs.",
    ],

    testimonial:
      "Le nouveau site renforce la confiance de nos clients et présente mieux nos services.",
    testimonialName: "Associé du cabinet GBM",
    testimonialRole: "Cabinet d’avocats",

    kosmondeRoles: [
      "Refonte de l’architecture de contenu",
      "Design des pages clés (accueil, équipe, domaines)",
      "Intégration front-end moderne",
    ],

    techBadges: ["JavaScript", "Next.js", "Tailwind CSS"],
  },

  // ---------------------------------------------------------------------------
  // PROJET 3 — RR-COIFFURE (Salon à Genève)
  // ---------------------------------------------------------------------------
  {
    slug: "rr-coiffure",
    title: "RR COIFFURE",
    type: "Site vitrine",
    status: "online",
    shortDesc:
      "Site vitrine sur mesure pour un salon de coiffure à Genève : services, tarifs, galerie et prise de rendez-vous.",
    desc:
      "Site vitrine sur mesure pour un salon de coiffure à Genève, avec mise en avant des services, des tarifs, de l’ambiance du salon et des informations pratiques pour venir facilement sur place.",
    context:
      "RR-COIFFURE avait besoin d’un site simple et clair pour présenter le salon, rassurer les nouveaux clients et centraliser toutes les informations utiles : horaires, adresse, contact et prise de rendez-vous.",
    features: [
      "Présentation des services et des tarifs",
      "Galerie photo du salon et des réalisations",
      "Mise en avant de l’adresse et de la localisation à Genève",
      "Coordonnées claires (téléphone, e-mail, formulaire)",
      "Lien direct vers la prise de rendez-vous",
    ],
    techStack:
      "Site vitrine moderne, responsive et optimisé pour les recherches locales (salon de coiffure à Genève).",
    link: "http://rr-coiffure.ch/",
    img: "/projets/RR-COIFFURE.png",

    client: "RR-COIFFURE",
    sector: "Beauté / Coiffure",
    year: 2024,
    role: "Conception UX/UI & développement front-end",
    heroSummary:
      "Site vitrine sur mesure pour un salon de coiffure à Genève, pensé pour rassurer, informer et faciliter la prise de rendez-vous.",

    results: [
      "Une présence en ligne claire pour les clients à Genève.",
      "Des informations pratiques accessibles rapidement (horaires, adresse, téléphone).",
    ],

    testimonial:
      "Le site donne une image professionnelle du salon et permet aux clients de trouver facilement les informations dont ils ont besoin.",
    testimonialName: "Responsable RR-COIFFURE",
    testimonialRole: "Salon de coiffure à Genève",

    kosmondeRoles: [
      "Structuration du contenu autour des besoins des clients",
      "Création d’une mise en page simple et rassurante",
      "Intégration des informations pratiques (adresse, horaires, contact)",
      "Optimisation mobile pour les visiteurs sur smartphone",
    ],

    techBadges: ["Site vitrine", "Responsive", "Orienté SEO local"],
  },
];
