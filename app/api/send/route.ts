export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ---------- rate limit mémoire (fenêtre 1 min) ---------- */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ---------- utils ---------- */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);

/* ---------- POST /api/send ---------- */
export async function POST(req: Request) {
  try {
    // IP client
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    // rate limit
    const now = Date.now();
    const hit = hits.get(ip);
    if (hit && now - hit.t < WINDOW_MS && hit.n >= MAX_REQ) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes, réessayez dans 1 minute." },
        { status: 429 }
      );
    }
    hits.set(ip, hit && now - hit.t < WINDOW_MS ? { n: hit.n + 1, t: hit.t } : { n: 1, t: now });

    // payload
    const body = await req.json().catch(() => ({} as any));
    const { name, email, phone, subject, message, website, offer, page } = body || {};

    // honeypot
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ success: false, error: "Spam détecté." }, { status: 400 });
    }

    // validations
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Champs manquants." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalide." }, { status: 400 });
    }

    // variables d'environnement
    const KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.MAIL_FROM; // ex: 'Kosmonde <contact@kosmonde.ch>'
    const TO = process.env.EMAIL_TO ?? process.env.MAIL_TO;       // ex: 'contact@kosmonde.ch'
    const LOGO = "https://www.kosmonde.ch/8de897e7-d5ab-43d6-968c-1e6dff5cc7de.png";

    if (!KEY || !FROM || !TO) {
      console.error("Config email manquante", { hasKey: !!KEY, hasFrom: !!FROM, hasTo: !!TO });
      return NextResponse.json({ success: false, error: "Config manquante." }, { status: 500 });
    }

    const resend = new Resend(KEY);

    const safe = {
      name: clip(name, 200),
      email: clip(email, 320),
      phone: clip(phone, 50),
      subject: clip(subject, 200),
      message: clip(message, 4000),
      offer: clip(offer ?? "custom", 100),
      page: clip(page ?? "Non spécifiée", 400),
    };

    /* ---------- Email Admin ---------- */
    const htmlAdmin = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f9fafb;padding:30px">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.1)">
          <div style="text-align:center;padding:20px 0;background:#111827">
            <img src="${LOGO}" alt="Kosmonde" style="width:160px;height:auto" />
          </div>
          <div style="padding:30px">
            <h2 style="color:#111827;font-size:20px;margin-bottom:20px">📩 Nouveau message reçu</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0"><strong>Formule :</strong></td><td>${safe.offer}</td></tr>
              <tr><td style="padding:6px 0"><strong>Nom :</strong></td><td>${safe.name}</td></tr>
              <tr><td style="padding:6px 0"><strong>Email :</strong></td><td>${safe.email}</td></tr>
              <tr><td style="padding:6px 0"><strong>Téléphone :</strong></td><td>${safe.phone || "-"}</td></tr>
              <tr><td style="padding:6px 0"><strong>Sujet :</strong></td><td>${safe.subject}</td></tr>
              <tr><td style="padding:6px 0"><strong>Page :</strong></td><td><a href="${safe.page}" target="_blank">${safe.page}</a></td></tr>
            </table>
            <hr style="margin:20px 0;border:0;border-top:1px solid #e5e7eb"/>
            <p style="white-space:pre-line;color:#111827">${safe.message}</p>
          </div>
          <div style="background:#f3f4f6;padding:15px;text-align:center;font-size:12px;color:#6b7280">
            IP : ${ip}<br/>
            © ${new Date().getFullYear()} Kosmonde
          </div>
        </div>
      </div>
    `;

    /* ---------- Email client ---------- */
    const htmlClient = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f9fafb;padding:30px">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.1)">
          <div style="text-align:center;padding:20px 0;background:#111827">
            <img src="${LOGO}" alt="Kosmonde" style="width:160px;height:auto" />
          </div>
          <div style="padding:30px;text-align:center">
            <h2 style="color:#111827;font-size:20px">Merci pour votre message, ${safe.name} 👋</h2>
            <p style="color:#374151;font-size:15px;margin:20px 0">
              Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.
            </p>
            <p style="color:#6b7280;font-size:13px;margin-top:30px">
              — L’équipe Kosmonde
            </p>
          </div>
        </div>
      </div>
    `;

    // envoi mail admin
    const send1 = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(safe.email),
      subject: `Nouveau message: ${safe.subject}`,
      html: htmlAdmin,
    });
    if (send1.error) throw send1.error;

    // accusé de réception
    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: "Nous avons bien reçu votre message",
      html: htmlClient,
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
