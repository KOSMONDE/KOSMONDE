// Types facultatifs mais propres
export type ProjectStatus = "en_cours" | "termine" | "pause"

export type Project = {
  id: string
  title: string
  status?: ProjectStatus
  category: string
  description: string
  fullDescription: string
  image: string
  images: string[]
  tags: string[]
  technologies: string[]
  url?: string
  duration: string
  client: string
  features: string[]
}

export const projects: Project[] = [
  {
    id: "rrcoiffure",
    title: "RR Coiffure",
    status: "en_cours", // en_cours | termine | pause
    category: "Site Vitrine & Réservation",
    description:
      "Salon de coiffure moderne avec prise de rendez-vous en ligne et vitrine élégante.",
    fullDescription:
      "Création d’un site vitrine raffiné et fonctionnel pour RR Coiffure, un salon de coiffure basé à Genève. Le site met en avant les prestations du salon, les avis clients et un système de réservation en ligne intuitif. L’objectif était de refléter l’élégance et le professionnalisme du salon tout en facilitant la prise de rendez-vous et en améliorant la visibilité locale grâce à un référencement SEO optimisé.",
    image: "/892a60ef-f3cf-44bb-98be-a65b7d9e4528.png",
    images: ["/rrcoiffure/cover.png", "/rrcoiffure/desktop.png", "/rrcoiffure/mobile.png"],
    tags: ["Design", "Réservations", "SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://rrcoiffure.ch",
    duration: "5 semaines",
    client: "RR Coiffure",
    features: [
      "Prise de rendez-vous en ligne",
      "Présentation des prestations",
      "Avis clients intégrés",
      "Optimisation SEO locale",
      "Design moderne et responsive",
    ],
  },

  {
    id: "sekoba-coiffure",
    title: "SEKOBA COIFFURE",
    status: "en_cours",
    category: "Site Vitrine",
    description:
      "Site vitrine moderne pour un salon de coiffure basé à Genève avec prise de rendez-vous en ligne.",
    fullDescription:
      "Création d’un site web vitrine élégant et moderne pour SEKOBA COIFFURE, un salon basé à Genève. Le projet incluait la présentation des services, une galerie photo, la prise de rendez-vous en ligne via Salonkee, et une optimisation SEO locale.",
    image: "/4efd58a1-b2e3-48cd-9286-5155062cf264.png",
    images: [
      "/sekoba/cover.png",
      "/4efd58a1-b2e3-48cd-9286-5155062cf264.png",
      "/4efd58a1-b2e3-48cd-9286-5155062cf264.png",
    ],
    tags: ["Design", "Réservations", "SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://sekoba-coiffure.kosmonde.ch/",
    duration: "5 semaines",
    client: "SEKOBA COIFFURE",
    features: [
      "Présentation des services du salon",
      "Galerie photo du salon",
      "Prise de rendez-vous en ligne via Salonkee",
      "Optimisation SEO locale",
    ],
  },

  {
    id: "gbm-avocats",
    title: "GBM AVOCATS",
    status: "termine",
    category: "Site Vitrine",
    description:
      "Site vitrine moderne et professionnel pour le cabinet GBM Avocats.",
    fullDescription:
      "Création d’un site vitrine élégant et professionnel pour GBM AVOCATS. Le projet comprenait la présentation des services juridiques, une section dédiée aux membres du cabinet, un blog pour la publication d’articles juridiques, ainsi qu’une optimisation SEO locale pour accroître la visibilité du cabinet.",
    image: "/aceddc1d-cb05-4f86-b194-cf8caff9e070.png",
    images: [
      "/gbm/cover.png",
      "/aceddc1d-cb05-4f86-b194-cf8caff9e070.png",
      "/aceddc1d-cb05-4f86-b194-cf8caff9e070.png",
    ],
    tags: ["Droit", "SEO", "Professionnel"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://gbm-avocats.com/",
    duration: "6 semaines",
    client: "GBM AVOCATS",
    features: [
      "Présentation des services juridiques",
      "Mise en avant des avocats du cabinet",
      "Blog d’articles juridiques",
      "Optimisation SEO locale",
    ],
  },
]

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id)
}

export function getAllProjects() {
  return projects
}
