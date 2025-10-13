"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Heart } from "lucide-react"
import { useEffect, useRef } from "react"

const stats = [
  { icon: Users, label: "Clients satisfaits", value: "5" },
  { icon: Award, label: "Projets réalisés", value: "3" },
  { icon: Clock, label: "Années d'expérience", value: "5" },
  { icon: Heart, label: "Taux de satisfaction", value: "100%" },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".about-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="apropos" className="py-20 px-4 sm:px-6 lg:px-8 cosmic-light-bg">
      <div className="max-w-7xl mx-auto">
        {/* Bloc texte + stats (style d’origine) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold cosmic-title mb-6">À propos de KOSMONDE</h2>
            <div className="space-y-4 text-slate-600">
              <p className="text-lg">
                Depuis 2020, KOSMONDE accompagne les entreprises françaises dans leur transformation digitale. Notre
                équipe passionnée combine créativité et expertise technique pour créer des solutions web qui dépassent
                vos attentes.
              </p>
              <p>
                Nous croyons que chaque projet est unique et mérite une approche personnalisée. C'est pourquoi nous
                prenons le temps de comprendre vos objectifs, votre secteur d'activité et vos utilisateurs pour créer
                des expériences digitales qui génèrent de vrais résultats.
              </p>
              <p>
                Notre philosophie ? Allier excellence technique, design moderne et accompagnement humain pour faire de
                votre projet web un véritable succès.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 cosmic-card bg-white/80 about-card opacity-0 hover:bg-white/90 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 cosmic-icon" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notre Processus — violet, descriptions sur UNE SEULE ligne */}
        <div className="mt-16 rounded-2xl p-10 border border-white/20 text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-semibold text-center mb-10 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Notre Processus
            </h3>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  n: "1",
                  title: "Analyse",
                  // raccourci pour tenir sur une ligne
                  desc: "Besoins et objectifs",
                  badge: "from-cyan-400 to-blue-500",
                },
                {
                  n: "2",
                  title: "Conception",
                  desc: "Design et architecture",
                  badge: "from-purple-400 to-pink-500",
                },
                {
                  n: "3",
                  title: "Développement",
                  desc: "Technologies de pointe",
                  badge: "from-emerald-400 to-cyan-500",
                },
                {
                  n: "4",
                  title: "Lancement",
                  desc: "Mise en ligne & suivi",
                  badge: "from-orange-400 to-red-500",
                },
              ].map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold shadow-lg bg-gradient-to-r ${step.badge}`}
                  >
                    {step.n}
                  </div>
                  <h4 className="font-semibold mb-2 text-white">{step.title}</h4>
                  {/* une seule ligne, avec ellipse si trop long sur petits écrans */}
                  <p
                    className="text-sm text-slate-200 leading-none whitespace-nowrap truncate w-[18rem] max-w-full"
                    title={step.desc}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
