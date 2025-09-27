export const projects = [
  {
    id: "sekoba-coiffure",
    title: "SEKOBA COIFFURE",
    category: "Site Vitrine",
    description: "Site vitrine moderne pour un salon de coiffure situé à Genève.",
    fullDescription:
      "Création d'un site web vitrine élégant et moderne pour SEKOBA COIFFURE, un salon de coiffure basé à Genève. Le projet incluait la présentation des services de coiffure, la mise en avant du salon avec une galerie photo, l’intégration d’un système de prise de rendez-vous en ligne via Salonkee, et une optimisation SEO locale pour attirer de nouveaux clients.",
    image: "/4efd58a1-b2e3-48cd-9286-5155062cf264.png",
    images: [
      "/4efd58a1-b2e3-48cd-9286-5155062cf264.png",
      "/sekoba-service-page.png",
      "/sekoba-reservation-system.png",
    ],
    tags: ["Design", "Réservations", "SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Salonkee", "Vercel"],
    url: "https://sekoba-coiffure.kosmonde.fr",
    duration: "5 semaines",
    client: "SEKOBA COIFFURE",
    features: [
      "Design moderne et élégant",
      "Présentation des services du salon",
      "Galerie photo du salon",
      "Prise de rendez-vous en ligne via Salonkee",
      "Optimisation SEO locale",
    ],
  },
  {
  id: "gbm-avocats",
  title: "GBM Avocats",
  category: "Site Vitrine",
  description: "Site vitrine professionnel pour un cabinet d’avocats situé dans les Alpes-Maritimes.",
  fullDescription:
    "Conception et développement d’un site vitrine moderne et professionnel pour GBM Avocats, un cabinet d’avocats basé dans les Alpes-Maritimes. Le site met en avant l’équipe, les domaines de compétences, les honoraires ainsi qu’une section articles pour informer les clients. Une intégration responsive et une optimisation SEO ont été réalisées afin de maximiser la visibilité locale.",
  image: "/aceddc1d-cb05-4f86-b194-cf8caff9e070.png", // ⚠️ remplace par une capture que tu ajouteras dans /public
  images: [
    "/gbm-homepage.png",
    "/gbm-team.png",
    "/gbm-competences.png",
  ],
  tags: ["Design", "SEO", "Responsive"],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  url: "https://gbm-avocats.com", // ton site live
  duration: "4 semaines",
  client: "Cabinet GBM Avocats",
  features: [
    "Présentation de l’équipe d’avocats",
    "Présentation des compétences juridiques",
    "Section articles et actualités",
    "Page contact avec formulaire",
    "Optimisation SEO locale",
  ],
},

  {
  id: "africa-kitchen",
  title: "Africa Kitchen",
  category: "Site Vitrine",
  description: "Site vitrine culinaire pour un restaurant africain situé en France.",
  fullDescription:
    "Conception et développement du site vitrine Africa Kitchen, un restaurant mettant en avant la richesse des saveurs africaines. Le site propose un menu interactif, une galerie photo des plats, une section avis clients, et la possibilité de réserver une table en ligne. L’objectif était de transmettre l’authenticité et la convivialité du restaurant tout en offrant une expérience utilisateur fluide et moderne.",
  image: "/26cc64ee-b3ec-43f8-b092-02ab38f8510c.png", // ⚠️ ajoute une capture d’écran dans /public
  images: [
    "/africa-kitchen-home.png",
    "/africa-kitchen-menu.png",
    "/africa-kitchen-gallery.png",
  ],
  tags: ["Design", "Réservations", "SEO"],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  url: "https://africakitchen.fr",
  duration: "3 semaines",
  client: "Africa Kitchen",
  features: [
    "Menu en ligne interactif",
    "Galerie photo des plats",
    "Réservation de table en ligne",
    "Section avis clients",
    "Design moderne et responsive",
  ],
},
]

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id)
}

export function getAllProjects() {
  return projects
}
