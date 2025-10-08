"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Send, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // 👈 honeypot
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Bloque les bots si le honeypot est rempli
    if (formData.website) {
      console.warn("🚨 Spam détecté :", formData.website)
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
        toast.success("✅ Message envoyé avec succès.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
        })
      } else {
        const { error } = await res.json().catch(() => ({ error: "Erreur inconnue." }))
        toast.error(`❌ Erreur : ${error}`)
      }
    } catch (err) {
      console.error(err)
      toast.error("⚠️ Erreur réseau : impossible d'envoyer le message.")
    }
  }

  // 🔁 Synchronise le champ caché et le state React
  useEffect(() => {
    const el = document.querySelector<HTMLInputElement>("#website")
    if (!el) return

    const sync = () => setFormData((f) => ({ ...f, website: el.value }))
    el.addEventListener("input", sync)
    return () => el.removeEventListener("input", sync)
  }, [])

  // --- Animation décorative (pas touche)
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
              style={{
                left: d.left,
                top: d.top,
                animationDelay: d.delay,
                animationDuration: d.duration,
              }}
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- Infos contact --- */}
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

          {/* --- Formulaire --- */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Nom complet *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Votre nom" className="bg-white/10 border-white/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.fr" className="bg-white/10 border-white/20 text-white" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Téléphone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+33 1 23 45 67 89" className="bg-white/10 border-white/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">Sujet *</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Objet de votre demande" className="bg-white/10 border-white/20 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Décrivez votre projet..." className="bg-white/10 border-white/20 text-white resize-none" />
                  </div>

                  {/* 🕵️‍♂️ Champ honeypot caché */}
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
