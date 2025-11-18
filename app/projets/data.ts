// ============================================================================
// TYPES DE BASE POUR LES PROJETS KOSMONDE
// ============================================================================

// Statut global du projet (affiché en haut à droite : En ligne, En cours, etc.)
export type ProjectStatus = "En ligne" | "En cours" | "Liste d’attente" | "Refont";
// En ligne        = projet en ligne (terminé, visible)
// En cours        = projet en cours de réalisation
// Liste d’attente = projet accepté, pas encore démarré
// Refont          = refonte d’un site existant

// Tous les services possibles que tu peux afficher sous forme de badges.
// Si tu ajoutes un nouveau type de service, tu l’ajoutes d’abord ici.
export type ProjectService =
  | "Site one-page"
  | "Site vitrine complet"
  | "Projet sur mesure"
  | "Refonte de site"
  | "Petites mises à jour"
  | "Aide au contenu & structure"
  | "Création de logo"
  | "Cartes de visite";

// Structure d’un projet
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

  // Propriétés optionnelles (tu peux les laisser vides)
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

  // SERVICES / BADGES
  // - 0 service   → aucun badge, pas de "Pack du projet"
  // - 1 service   → 1 badge simple
  // - 2+ services → "Pack du projet" + tous les badges
  services?: ProjectService[];
};

// ============================================================================
// LISTE DES PROJETS (CONTENU "BACKEND")
// ============================================================================

export const projects: Project[] = [
  // ---------------------------------------------------------------------------
  // PROJET 1 — SEKOBA
  // ---------------------------------------------------------------------------
  {
    slug: "salon-sekoba",
    title: "SEKOBA COIFFURE",
    type: "Site vitrine",
    status: "En ligne",
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

    // Services utilisés pour ce projet (3 services → Pack du projet)
    services: ["Site vitrine complet", "Création de logo", "Cartes de visite"],
  },

  // ---------------------------------------------------------------------------
  // PROJET 2 — GBM AVOCATS
  // ---------------------------------------------------------------------------
  {
    slug: "gbm-avocats",
    title: "GBM Avocats",
    type: "Site vitrine",
    status: "Refont",
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

    // Services utilisés pour ce projet (3 services → Pack du projet)
    services: [
      "Refonte de site",
    ],
  },

  // ---------------------------------------------------------------------------
  // PROJET 3 — RR-COIFFURE (Salon à Genève)
  // ---------------------------------------------------------------------------
  {
    slug: "rr-coiffure",
    title: "RR COIFFURE",
    type: "Site vitrine",
    status: "En cours",
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

    // Services utilisés pour ce projet (4 services → Pack du projet)
    services: [
      "Site vitrine complet",
      "Aide au contenu & structure",
      
    ],
  },

  // ---------------------------------------------------------------------------
  // PROJET 4 — Chiche ou pas Chiche
  // ---------------------------------------------------------------------------
  {
    slug: "chiche-ou-pas-chiche",
    title: "Chiche ou pas Chiche",
    type: "Site vitrine",
    status: "Liste d’attente",
    shortDesc:
      "Améliorations ciblées, optimisation du contenu et petites mises à jour pour un site déjà en ligne.",
    desc:
      "Intervention légère sur un site existant pour clarifier le contenu, améliorer la mise en page et rendre l’expérience plus fluide. L’objectif n’est pas de tout refaire, mais d’optimiser ce qui existe déjà pour que le site soit plus clair, plus agréable et plus efficace pour les visiteurs.",
    context:
      "Le site avait besoin de petites améliorations : certaines sections manquaient de lisibilité, le contenu n’était pas toujours mis en valeur et quelques éléments visuels pouvaient être modernisés. L’intervention se concentre sur des ajustements ciblés plutôt qu’une refonte complète.",
    features: [
      "Mise à jour de sections existantes",
      "Réorganisation légère du contenu",
      "Amélioration de la lisibilité et de la hiérarchie",
      "Petites optimisations visuelles",
    ],
    techStack:
      "Petites interventions front-end et ajustements de contenu pour améliorer l’UX sans refonte complète.",
    // link: "", // ajoute l’URL du site si tu veux l’afficher dans la page projet
    img: "/projets/CHICHE.png",

    client: "Chiche ou pas Chiche",
    sector: "Coaching / Développement personnel",
    year: 2025,
    role: "Petites mises à jour & amélioration UX",
    heroSummary:
      "Petites mises à jour ciblées pour rendre le site plus clair, plus cohérent et plus agréable à parcourir.",

    results: [
      "Structure de contenu plus lisible.",
      "Sections clés mieux mises en valeur.",
      "Site plus cohérent sans refonte totale.",
    ],

    kosmondeRoles: [
      "Analyse des points à optimiser",
      "Ajustements du contenu et des titres",
      "Améliorations visuelles légères",
    ],

    techBadges: ["Petites mises à jour", "UX", "Optimisation légère"],

    // Services utilisés pour ce projet (2 services → Pack du projet)
    services: ["Petites mises à jour"],
  },

  // ---------------------------------------------------------------------------
  // PROJET 5 — LashBrowsClub
  // ---------------------------------------------------------------------------
  {
    slug: "lashbrowsclub",
    title: "LashBrowsClub",
    type: "Site vitrine",
    status: "Liste d’attente",
    shortDesc:
      "Futur site vitrine pour un studio spécialisé en extensions de cils et restructuration des sourcils.",
    desc:
      "Création prévue d’un site vitrine pour un studio beauté spécialisé dans les extensions de cils, le rehaussement et la mise en forme des sourcils. L’objectif est de présenter clairement les prestations, rassurer les clientes et faciliter la prise de contact pour les rendez-vous.",
    context:
      "Le studio dispose déjà d’une présence sur les réseaux sociaux, mais pas encore d’un site structuré. Le projet vise à poser des bases solides : texte clair, univers visuel cohérent et parcours simple pour réserver ou poser des questions.",
    features: [
      "Présentation des prestations (cils, sourcils, soins)",
      "Mise en avant des avant/après",
      "Section FAQ pour rassurer les clientes",
      "Page contact simple et efficace",
    ],
    techStack:
      "Site vitrine moderne, pensé mobile-first, avec une structure claire pour évoluer plus tard vers la prise de rendez-vous en ligne.",
    // link: "", // à renseigner une fois le site en ligne
    img: "/projets/LASHBROWSCLUB.png",

    client: "LashBrowsClub",
    sector: "Beauté / Cils & Sourcils",
    year: 2025,
    role: "Conception UX/UI & structure de contenu",
    heroSummary:
      "Un futur site vitrine pour mettre en valeur les prestations cils & sourcils et préparer le terrain pour la réservation en ligne.",

    results: [
      "Brief défini et structure de contenu posée.",
      "Univers visuel en cours de construction.",
    ],

    kosmondeRoles: [
      "Clarification des objectifs du site",
      "Structure de contenu centrée cliente",
      "Direction UX pour un futur parcours de réservation",
    ],

    techBadges: ["Site vitrine", "Mobile-first", "Prêt pour réservation en ligne"],

    // Version actuelle : projet simple = 1 service → 1 badge, pas de Pack du projet
    services: ["Site vitrine complet","Création de logo","Aide au contenu & structure"],

    // Pour activer le "Pack du projet" plus tard, ajoute simplement
    // d’autres services dans le tableau (2+ services = Pack automatique).
    // Badges disponibles :
    //  - "Site one-page"
    //  - "Site vitrine complet"
    //  - "Projet sur mesure"
    //  - "Refonte de site"
    //  - "Petites mises à jour"
    //  - "Aide au contenu & structure"
    //  - "Création de logo"
    //  - "Cartes de visite"
  },
];
