// ============================================================================
// TYPES DE BASE POUR LES PROJETS KOSMONDE
// ============================================================================

// Statut global du projet (affiché en haut : En ligne, En cours, etc.)
export type ProjectStatus = "En ligne" | "En cours" | "Liste d’attente" | "Refont";
// En ligne        = projet en ligne (terminé, visible)
// En cours        = projet en cours de réalisation
// Liste d’attente = projet accepté, pas encore démarré
// Refont          = refonte d’un site existant

// Tous les services possibles que tu peux afficher sous forme de badges.
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

  // Carte d’identité du projet
  client?: string;
  sector?: string;
  year?: string | number;
  role?: string;
  heroSummary?: string;

  // Histoire & résultats
  results?: string[];         // Résultats qualitatifs
  metrics?: string[];         // Résultats chiffrés (ex: "+45% de demandes")
  testimonial?: string;
  testimonialName?: string;
  testimonialRole?: string;
  kosmondeRoles?: string[];

  // Storytelling avancé (sections dédiées)
  clientObjectives?: string[]; // Objectifs du client
  beforeState?: string;        // Situation "Avant"
  afterState?: string;         // Situation "Après"
  challenges?: string[];       // Défis identifiés
  solutions?: string[];        // Solutions apportées
  processSteps?: string[];     // Étapes du processus KOSMONDE

  // Tech / badges
  techBadges?: string[];

  // Avancement (0-100) optionnel
  progress?: number;

  // Services utilisés pour ce projet (badges + Pack du projet)
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
    img: "/projets/PROJETSEKOBACOIFFURE.png",

    client: "Salon de coiffure SEKOBA",
    sector: "Beauté / Coiffure",
    year: 2025,
    role: "Conception UX/UI & développement complet",
    heroSummary:
      "Site vitrine moderne pour un salon de coiffure, avec réservation en ligne et mise en valeur des cheveux texturés.",

    // Objectifs du client
    clientObjectives: [
      "Permettre aux clientes de prendre rendez-vous facilement en ligne.",
      "Présenter clairement les services et les tarifs.",
      "Renforcer l’image moderne et professionnelle du salon.",
    ],

    // Avant / Après
    beforeState:
      "Le salon n’avait qu’une présence limitée en ligne, principalement via les réseaux sociaux, sans site structuré ni prise de rendez-vous centralisée.",
    afterState:
      "Un site clair, moderne, avec une page services structurée, des avis mis en avant et une réservation en ligne accessible en quelques clics.",

    // Défis & solutions
    challenges: [
      "Mettre en valeur les cheveux texturés, au cœur de l’identité du salon.",
      "Clarifier les nombreux services et options proposés.",
      "Proposer une réservation simple sans perdre les clientes.",
    ],
    solutions: [
      "Hiérarchisation des services avec catégories claires.",
      "Mise en avant des visuels avant/après et de l’univers du salon.",
      "Lien vers l’outil de réservation intégré de manière fluide dans le parcours.",
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

    services: ["Site vitrine complet", "Création de logo", "Cartes de visite"],
    progress: 100,
    processSteps: [
      "Échange initial pour comprendre l’univers du salon et ses besoins.",
      "Proposition de structure de site et de maquettes.",
      "Développement du site et intégration de la réservation en ligne.",
      "Tests sur mobile et ajustements finaux.",
      "Mise en ligne et accompagnement sur l’utilisation.",
    ],
  },

  // ---------------------------------------------------------------------------
  // PROJET 2 — RR-COIFFURE (Salon à Genève)
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
    link: "http://rr-coiffure.com/",
    img: "/projets/RR-COIFFURE.png",

    client: "RR-COIFFURE",
    sector: "Beauté / Coiffure",
    year: 2024,
    role: "Conception UX/UI & développement front-end",
    heroSummary:
      "Site vitrine sur mesure pour un salon de coiffure à Genève, pensé pour rassurer, informer et faciliter la prise de rendez-vous.",

    clientObjectives: [
      "Rassurer les nouveaux clients qui découvrent le salon en ligne.",
      "Regrouper toutes les informations pratiques au même endroit.",
      "Préparer le terrain pour une réservation plus simple.",
    ],
    beforeState:
      "Aucune vraie vitrine en ligne structurée, des informations dispersées et peu de lisibilité pour un nouveau client.",
    afterState:
      "Un site clair, centré sur les besoins des clients à Genève, avec une mise en avant des services, des tarifs et des informations pratiques.",

    challenges: [
      "Rester simple tout en donnant assez d’informations.",
      "Mettre l’accent sur l’ambiance du salon sans surcharger visuellement.",
    ],
    solutions: [
      "Sections courtes et claires pour les services, tarifs et infos pratiques.",
      "Photos du salon et des réalisations pour projeter le visiteur.",
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

    services: ["Site vitrine complet", "Aide au contenu & structure"],
    progress: 99,
    processSteps: [
      "Écoute des besoins du salon et de sa clientèle.",
      "Proposition de structure centrée sur les informations pratiques.",
      "Création d’un design simple et rassurant.",
      "Intégration du site et tests sur mobile.",
    ],
  },

  // ---------------------------------------------------------------------------
  // PROJET 3 — LashBrowsClub
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
    img: "/projets/lashbrowsclub.ch.png",

    client: "LashBrowsClub",
    sector: "Beauté / Cils & Sourcils",
    year: 2025,
    role: "Conception UX/UI & structure de contenu",
    heroSummary:
      "Un futur site vitrine pour mettre en valeur les prestations cils & sourcils et préparer le terrain pour la réservation en ligne.",

    clientObjectives: [
      "Aller au-delà d’Instagram et offrir une vraie vitrine professionnelle.",
      "Rassurer les clientes avec des explications claires et des avant/après.",
      "Préparer un futur parcours de réservation en ligne.",
    ],
    beforeState:
      "Présence essentiellement sur les réseaux sociaux, sans site structuré ni parcours dédié pour les clientes.",
    afterState:
      "Un site pensé pour expliquer les prestations, montrer des résultats et orienter les clientes vers la prise de contact.",

    challenges: [
      "Traduire un univers Instagram en expérience de site cohérente.",
      "Rassurer sur des prestations parfois techniques (cils, sourcils).",
    ],
    solutions: [
      "Création d’une structure claire par type de prestation.",
      "Mise en avant des avant/après et d’une FAQ rassurante.",
    ],

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

    services: [
      "Site vitrine complet",
      "Création de logo",
      "Aide au contenu & structure",
    ],
    progress: 0,
    processSteps: [
      "Atelier pour clarifier l’offre et la cible.",
      "Définition de la structure et des pages du futur site.",
      "Création d’un univers visuel cohérent avec le studio.",
    ],
  },

  // ---------------------------------------------------------------------------
  // PROJET 4 — GBM AVOCATS
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
      "Une première version WordPress existait déjà. L’objectif est une version plus moderne, plus lisible et techniquement plus maîtrisée.",
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

    clientObjectives: [
      "Clarifier les domaines de compétence pour chaque type de client.",
      "Renforcer la confiance des visiteurs dès la page d’accueil.",
      "Moderniser une image en ligne devenue datée.",
    ],
    beforeState:
      "Un site WordPress existant mais peu lisible, avec des informations dispersées et une expérience utilisateur datée.",
    afterState:
      "Une structure claire par domaines, une présentation rassurante de l’équipe et un site cohérent avec le positionnement du cabinet.",

    challenges: [
      "Beaucoup d’informations juridiques à organiser.",
      "Besoin fort de rassurance et de sérieux.",
      "Respecter l’image du cabinet tout en modernisant.",
    ],
    solutions: [
      "Hiérarchisation par domaines principaux et sous-pages claires.",
      "Mise en avant des profils et de l’expérience du cabinet.",
      "Design sobre, lisible et compatible avec tous les écrans.",
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

    services: ["Refonte de site", "Aide au contenu & structure"],
    progress: 0,
    processSteps: [
      "Audit de l’ancienne version du site.",
      "Reprise de l’architecture de contenu avec le cabinet.",
      "Création de maquettes pour les pages principales.",
      "Intégration front-end et optimisation de la lisibilité.",
      "Mise en production de la nouvelle version.",
    ],
  },
];
