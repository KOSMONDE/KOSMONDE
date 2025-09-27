export const projects = [
  
  {
    id: "sekoba-coiffure",
    title: "SEKOBA COIFFURE",
    category: "Site Vitrine",
    description: "Site vitrine moderne pour un salon de coiffure basé à Genève avec prise de rendez-vous en ligne.",
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
    url: "https://sekoba-coiffure.kosmonde.fr/",
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
  category: "Site Vitrine",
  description: "Site vitrine moderne et professionnel pour le cabinet GBM Avocats.",
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

  {
  id: "africakitchen",
  title: "Africa Kitchen",
  category: "Site Vitrine & Réservation",
  description: "Restaurant africain authentique avec réservation en ligne et galerie immersive.",
  fullDescription:
    "Conception d’un site vitrine chaleureux et moderne pour Africa Kitchen, un restaurant africain au cœur de Genève. Le projet met en avant l’authenticité des saveurs africaines à travers une galerie photo immersive, un menu interactif et un système de réservation en ligne fluide. L’objectif était de retranscrire l’ambiance conviviale du restaurant et d’augmenter la visibilité grâce à une optimisation SEO locale.",
  image: "/26cc64ee-b3ec-43f8-b092-02ab38f8510c.png",
  images: [
    "/africakitchen/cover.png",
    "/26cc64ee-b3ec-43f8-b092-02ab38f8510c.png",
    "/26cc64ee-b3ec-43f8-b092-02ab38f8510c.png",
  ],
  tags: ["Restaurant", "Réservations", "SEO"],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  url: "https://africakitchen.fr",
  duration: "6 semaines",
  client: "Africa Kitchen",
  features: [
    "Système de réservation en ligne",
    "Menu interactif",
    "Galerie photo immersive",
    "Optimisation SEO locale",
    "Design responsive et moderne",
  ],
},

  
  
  
]

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id)
}

export function getAllProjects() {
  return projects
}
