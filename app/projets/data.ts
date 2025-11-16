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

  // === NOUVELLES PROPRIÉTÉS (toutes optionnelles) ===
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
  {
    slug: "salon-sekoba",
    title: "Salon de coiffure SEKOBA",
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

    // Infos supplémentaires
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
  {
    slug: "gbm-avocats",
    title: "Cabinet GBM Avocats",
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
    kosmondeRoles: [
      "Refonte de l’architecture de contenu",
      "Design des pages clés (accueil, équipe, domaines)",
      "Intégration front-end moderne",
    ],
    techBadges: ["JavaScript", "Next.js", "Tailwind CSS"],
  },
  {
    slug: "association-locale",
    title: "Association locale",
    type: "Site sur mesure",
    status: "online",
    shortDesc:
      "Site sur mesure pour une association : mission, activités, équipe et appels aux dons.",
    desc:
      "Site sur mesure pour une association : mise en avant de la mission, des actions concrètes et des moyens de soutien.",
    context:
      "L’association avait besoin d’un espace simple pour expliquer ce qu’elle fait, qui la compose et comment la soutenir.",
    features: [
      "Page mission et valeurs",
      "Présentation des activités et projets",
      "Page équipe",
      "Liste d’événements",
      "Informations sur les dons",
      "Formulaire de contact",
    ],
    techStack:
      "Site sur mesure basé sur une structure claire, pensé pour évoluer avec l’association.",
    link: "http://rr-coiffure.ch/",
    img: "/projets/RR-COIFFURE.png",

    client: "Association locale",
    sector: "Association / Social",
    year: 2024,
    role: "Design, intégration et accompagnement contenu",
    heroSummary:
      "Site sur mesure pour une association locale, centré sur la mission, les actions concrètes et les moyens de soutien.",
    results: [
      "Meilleure compréhension de la mission de l’association.",
      "Facilitation des prises de contact et des dons.",
    ],
    kosmondeRoles: [
      "Structuration du contenu (mission, actions, équipe)",
      "Création d’un design simple et accessible",
      "Mise en place des pages événements et dons",
    ],
    techBadges: ["Site sur mesure", "Stack moderne"],
  },
];
