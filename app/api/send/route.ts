export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// petit rate-limit mémoire
const WINDOW_MS = 60_000
const MAX_REQ = 5
const hits = new Map<string, { n: number; t: number }>()

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}
function clip(s: string, max = 2000) {
  return String(s || "").toString().slice(0, max)
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      // @ts-ignore
      req.ip ||
      "unknown"

    // anti-abus basique
    const now = Date.now()
    const h = hits.get(ip)
    if (h && now - h.t < WINDOW_MS && h.n >= MAX_REQ) {
      console.warn(`⚠️ Rate limit ${ip}`)
      return NextResponse.json({ success: false, error: "Trop de requêtes" }, { status: 429 })
    }
    hits.set(ip, h && now - h.t < WINDOW_MS ? { n: h.n + 1, t: h.t } : { n: 1, t: now })

    const body = await req.json()
    const { name, email, phone, subject, message, website } = body || {}

    console.log("📩 Données reçues :", { ip, name, email, website })

    // 🕵️‍♂️ 1) Honeypot
    if (website && website.trim() !== "") {
      console.warn("🚫 Spam détecté via honeypot :", website)
      return NextResponse.json({ success: false, error: "Spam détecté" }, { status: 400 })
    }

    // 🔎 2) Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Champs manquants" }, { status: 400 })
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 })
    }

    // ⚙️ 3) Configuration email
    const FROM = process.env.EMAIL_FROM
    const TO = process.env.EMAIL_TO
    if (!process.env.RESEND_API_KEY || !FROM || !TO) {
      console.error("❌ Config email manquante.")
      return NextResponse.json({ success: false, error: "Config manquante" }, { status: 500 })
    }

    const safe = {
      name: clip(name, 200),
      email: clip(email, 320),
      phone: clip(phone, 50),
      subject: clip(subject, 200),
      message: clip(message, 4000),
    }

    // ✉️ 4) Envoi au site (admin)
    await resend.emails.send({
      from: `Kosmonde <${FROM}>`,
      to: TO,
      replyTo: safe.email,
      subject: `📨 ${safe.subject}`,
      html: `
        <h2>📩 Nouveau message via Kosmonde.fr</h2>
        <p><strong>Nom :</strong> ${safe.name}</p>
        <p><strong>Email :</strong> ${safe.email}</p>
        <p><strong>Téléphone :</strong> ${safe.phone || "-"}</p>
        <p><strong>Sujet :</strong> ${safe.subject}</p>
        <p><strong>Message :</strong><br/>${safe.message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="color:#888;font-size:12px">IP : ${ip}</p>
      `,
    })

    // 📬 5) Confirmation au visiteur
    await resend.emails.send({
      from: `Kosmonde <${FROM}>`,
      to: safe.email,
      subject: "✅ Nous avons bien reçu votre message",
      html: `
        <p>Bonjour ${safe.name},</p>
        <p>Merci pour votre message ! Nous vous répondrons très bientôt.</p>
        <p>– L'équipe Kosmonde 🚀</p>
      `,
    })

    console.log("✅ Email envoyé avec succès :", safe.email)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("💥 Erreur serveur :", err)
    return NextResponse.json({ success: false, error: "Erreur interne" }, { status: 500 })
  }
}
