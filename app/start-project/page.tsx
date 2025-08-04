"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Palette, Code, Zap, Globe, Calendar, CheckCircle, Mail, MessageSquare, User, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Boutiques en ligne performantes et sécurisées",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    features: ["Paiements sécurisés", "Gestion des stocks", "Dashboard admin", "SEO optimisé"],
  },
  {
    id: "portfolio",
    title: "Portfolio & Vitrine",
    description: "Sites vitrines élégants et portfolios créatifs",
    icon: Palette,
    color: "from-violet-500 to-purple-500",
    features: ["Design sur mesure", "Animations fluides", "CMS intégré", "Responsive design"],
  },
  {
    id: "saas",
    title: "Applications SaaS",
    description: "Plateformes web complexes et dashboards",
    icon: Code,
    color: "from-emerald-500 to-green-500",
    features: ["Architecture scalable", "API REST", "Analytics", "Multi-utilisateurs"],
  },
  {
    id: "mobile",
    title: "Applications Mobile",
    description: "Apps natives et web progressives",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    features: ["React Native", "PWA", "Notifications push", "Offline support"],
  },
]

const process = [
  {
    step: "01",
    title: "Découverte",
    description: "Analyse de vos besoins et définition du cahier des charges",
    duration: "1-2 semaines",
  },
  {
    step: "02",
    title: "Conception",
    description: "Design UX/UI et architecture technique du projet",
    duration: "2-3 semaines",
  },
  {
    step: "03",
    title: "Développement",
    description: "Codage, tests et intégrations des fonctionnalités",
    duration: "4-12 semaines",
  },
  {
    step: "04",
    title: "Déploiement",
    description: "Mise en ligne, formation et maintenance",
    duration: "1 semaine",
  },
]

export default function StartProjectPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isContactOpen, setIsContactOpen] = useState(false)

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grille futuriste */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-8 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Démarrons
              </span>
              <br />
              <span className="text-white">votre projet</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transformons vos idées en réalité digitale. Choisissez les services qui correspondent à vos besoins et
              découvrez notre processus de création sur mesure.
            </p>
          </div>
        </div>

        {/* Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nos Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sélectionnez les services qui correspondent à votre vision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => {
              const Icon = service.icon
              const isSelected = selectedServices.includes(service.id)

              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-slate-800/80 border-cyan-400/50 shadow-lg shadow-cyan-500/25"
                      : "bg-slate-900/50 border-gray-700/50 hover:border-gray-600/50"
                  } backdrop-blur-xl`}
                  onClick={() => toggleService(service.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-20`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-gray-400">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {selectedServices.length > 0 && (
            <div className="text-center">
              <Button
                onClick={() => setIsContactOpen(true)}
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg shadow-cyan-500/25 px-8 py-3 text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Discuter de mon projet ({selectedServices.length} service{selectedServices.length > 1 ? "s" : ""})
              </Button>
            </div>
          )}
        </section>

        {/* Processus */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Notre Processus</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une méthode éprouvée pour mener votre projet vers le succès
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="bg-slate-900/50 backdrop-blur-xl border-gray-700/50 relative">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                      <p className="text-cyan-400 text-sm">{step.duration}</p>
                    </div>
                  </div>
                  <CardDescription className="text-gray-300 leading-relaxed">{step.description}</CardDescription>
                </CardHeader>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500"></div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-6">
                Prêt à donner vie à votre{" "}
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text">
                  vision
                </span>{" "}
                ?
              </h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Chaque projet est unique. Parlons de vos objectifs, de vos défis et créons ensemble une solution sur
                mesure qui dépasse vos attentes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsContactOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 group relative overflow-hidden"
                >
                  <Mail className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Commencer maintenant</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600/30 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500/50 transition-all duration-300 bg-transparent"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Planifier un appel
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Popup Contact */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-emerald-500/30 rounded-2xl blur-xl"></div>

            <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 animate-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full mb-4 border border-cyan-500/30">
                  <Mail className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Parlons de votre projet</h3>
                <p className="text-gray-400">Décrivez-nous votre vision</p>
              </div>

              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/25 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/25 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-gray-600/30">
                      <p className="text-sm text-gray-400 mb-2">Services sélectionnés :</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((serviceId) => {
                          const service = services.find((s) => s.id === serviceId)
                          return (
                            <span key={serviceId} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                              {service?.title}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      placeholder="Décrivez votre projet, vos objectifs, votre budget..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 transition-all duration-300 backdrop-blur-sm resize-none"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white border border-gray-600/30 transition-all duration-300"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Envoyer</span>
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="flex justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-300"></div>
                    <span>Devis gratuit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
