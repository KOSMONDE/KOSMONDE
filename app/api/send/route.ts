export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

// rate limit mémoire simple
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function clip(s: string, max = 2000) {
  return String(s || "").slice(0, max);
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      // @ts-ignore
      (req as any).ip ||
      "unknown";

    // rate limit
    const now = Date.now();
    const h = hits.get(ip);
    if (h && now - h.t < WINDOW_MS && h.n >= MAX_REQ) {
      return NextResponse.json({ success: false, error: "Trop de requêtes" }, { status: 429 });
    }
    hits.set(ip, h && now - h.t < WINDOW_MS ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

    const body = await req.json().catch(() => ({}));
    const { name, email, phone, subject, message, website } = body || {};

    // honeypot
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ success: false, error: "Spam détecté" }, { status: 400 });
    }

    // validations basiques
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Champs manquants" }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 });
    }

    // env requis
    const FROM = process.env.EMAIL_FROM;
    const TO = process.env.EMAIL_TO;
    const KEY = process.env.RESEND_API_KEY;
    if (!KEY || !FROM || !TO) {
      console.error("Config email manquante: ",
        { hasKey: !!KEY, hasFrom: !!FROM, hasTo: !!TO });
      return NextResponse.json({ success: false, error: "Config manquante" }, { status: 500 });
    }

    // instanciation DANS le handler
    const resend = new Resend(KEY);

    const safe = {
      name: clip(name, 200),
      email: clip(email, 320),
      phone: clip(phone ?? "", 50),
      subject: clip(subject, 200),
      message: clip(message, 4000),
    };

    // mail admin
    await resend.emails.send({
      from: `Kosmonde <${FROM}>`,
      to: TO,
      replyTo: safe.email,
      subject: `Nouveau message: ${safe.subject}`,
      html: `
        <h2>Nouveau message</h2>
        <p><strong>Nom:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Téléphone:</strong> ${safe.phone || "-"}</p>
        <p><strong>Sujet:</strong> ${safe.subject}</p>
        <p><strong>Message:</strong><br/>${safe.message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="color:#888;font-size:12px">IP: ${ip}</p>
      `,
    });

    // accusé de réception
    await resend.emails.send({
      from: `Kosmonde <${FROM}>`,
      to: safe.email,
      subject: "Nous avons bien reçu votre message",
      html: `
        <p>Bonjour ${safe.name},</p>
        <p>Merci pour votre message. Nous revenons vers vous rapidement.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne" }, { status: 500 });
  }
}
