"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Send, Sparkles } from "lucide-react"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/* Offres */
const OFFER_LABELS = {
  vitrine: "Site Vitrine – 199,99 CHF",
  ecommerce: "E-commerce WordPress – 299,99 CHF",
  premium: "Site Premium – 399,99 CHF",
  std: "Maintenance Standard – 49,99 CHF / mois",
  pro: "Maintenance Pro – 99,99 CHF / mois",
  prem: "Support Premium – 199,99 CHF / mois",
  social: "Social Media Starter – 590 CHF",
  branding: "Branding Essentials – 790 CHF",
  print: "Pack Print & Brand – 990 CHF",
  custom: "Devis sur mesure",
} as const
type OfferKey = keyof typeof OFFER_LABELS

export default function ContactSection() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
    offer: "custom" as OfferKey,
    page: "",    // URL d'origine
  })

  // Préremplissage URL + query ?offer=
  useEffect(() => {
    try {
      setFormData(f => ({ ...f, page: window.location.href }))
    } catch {}
    const q = (searchParams.get("offer") || "").toLowerCase() as OfferKey
    if (q in OFFER_LABELS) {
      setFormData(f => ({ ...f, offer: q }))
      document.getElementById("name")?.focus()
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) {
      toast.error("Requête bloquée (spam détecté).")
      return
    }
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast.success("Message envoyé avec succès.")
        setFormData(f => ({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
          offer: "custom",
          page: f.page,
        }))
      } else {
        const { error } = await res.json().catch(() => ({ error: "Erreur inconnue." }))
        toast.error(`Erreur : ${error}`)
      }
    } catch {
      toast.error("Erreur réseau : impossible d'envoyer le message.")
    }
  }

  // Honeypot sync
  useEffect(() => {
    const el = document.querySelector<HTMLInputElement>("#website")
    if (!el) return
    const sync = () => setFormData(f => ({ ...f, website: el.value }))
    el.addEventListener("input", sync)
    return () => el.removeEventListener("input", sync)
  }, [])

  // Décor
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dots = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
      })),
    []
  )

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {dots.map((d, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{ left: d.left, top: d.top, animationDelay: d.delay, animationDuration: d.duration }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Démarrez votre projet dès aujourd’hui. Demandez votre devis gratuit et personnalisé.
          </p>

          {formData.offer !== "custom" && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white">
              Formule sélectionnée : <span className="font-medium">{OFFER_LABELS[formData.offer]}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Infos */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-300">contact@kosmonde.fr</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Téléphone</h3>
                  <p className="text-gray-300">+33 6 86 11 43 97</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-400/30 backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
                <h3 className="font-semibold text-purple-300">Devis gratuit</h3>
              </div>
              <p className="text-sm text-gray-300">
                Obtenez une estimation personnalisée pour votre projet en moins de 24h.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Formule — Select shadcn (aucun <select> natif) */}
                  <div className="space-y-2">
                    <Label htmlFor="offer" className="text-gray-300">Formule</Label>

                    <Select
                      value={formData.offer}
                      onValueChange={(v: OfferKey) => setFormData(f => ({ ...f, offer: v }))}
                    >
                      <SelectTrigger
                        id="offer"
                        className={[
                          "w-full rounded-xl border-2 px-4 py-4 text-[16px] leading-[1.35]",
                          // clair sur mobile
                          "bg-white text-slate-900 border-violet-400/80 focus:border-violet-500 focus:ring-4 focus:ring-violet-300/40",
                          // sombre dès md
                          "md:bg-white/10 md:text-white md:border-white/20 md:focus:border-purple-400 md:focus:ring-2 md:focus:ring-purple-400/60",
                        ].join(" ")}
                      >
                        <SelectValue placeholder="Choisir une formule" />
                      </SelectTrigger>

                      <SelectContent
                        className="z-[60] rounded-xl border border-black/10 bg-white text-slate-900 md:bg-slate-900 md:text-white md:border-white/10"
                        position="popper"
                        sideOffset={8}
                      >
                        <SelectGroup>
                          <SelectLabel className="px-3 py-2 text-xs uppercase tracking-wide opacity-70">
                            Création de site
                          </SelectLabel>
                          <SelectItem value="vitrine">{OFFER_LABELS.vitrine}</SelectItem>
                          <SelectItem value="ecommerce">{OFFER_LABELS.ecommerce}</SelectItem>
                          <SelectItem value="premium">{OFFER_LABELS.premium}</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                          <SelectLabel className="px-3 py-2 text-xs uppercase tracking-wide opacity-70">
                            Maintenance & Support
                          </SelectLabel>
                          <SelectItem value="std">{OFFER_LABELS.std}</SelectItem>
                          <SelectItem value="pro">{OFFER_LABELS.pro}</SelectItem>
                          <SelectItem value="prem">{OFFER_LABELS.prem}</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                          <SelectLabel className="px-3 py-2 text-xs uppercase tracking-wide opacity-70">
                            Consulting Digital
                          </SelectLabel>
                          <SelectItem value="social">{OFFER_LABELS.social}</SelectItem>
                          <SelectItem value="branding">{OFFER_LABELS.branding}</SelectItem>
                          <SelectItem value="print">{OFFER_LABELS.print}</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                          <SelectLabel className="px-3 py-2 text-xs uppercase tracking-wide opacity-70">
                            Autre
                          </SelectLabel>
                          <SelectItem value="custom">{OFFER_LABELS.custom}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                        className="bg-white/10 border-white/20 text-white text-[16px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.fr"
                        className="bg-white/10 border-white/20 text-white text-[16px]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 1 23 45 67 89"
                        className="bg-white/10 border-white/20 text-white text-[16px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">Sujet *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Objet de votre demande"
                        className="bg-white/10 border-white/20 text-white text-[16px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Décrivez votre projet..."
                      className="bg-white/10 border-white/20 text-white resize-none text-[16px]"
                    />
                  </div>

                  {/* Honeypot */}
                  <input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
