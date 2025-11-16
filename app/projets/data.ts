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
    // Remplace par l’URL réelle
    link: "https://exemple-sekoba.ch",
    img: "/projets/SEKOBA.png",
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
    link: undefined,
    img: "/projets/GBM-AVOCATS.png",
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
    link: undefined,
    img: "/projets/RR-COIFFURE.png",
  },
];
