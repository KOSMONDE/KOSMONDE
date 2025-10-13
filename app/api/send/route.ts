import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/* ---------- rate limit mémoire (fenêtre 1 min) ---------- */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ---------- utils ---------- */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);

/* ---------- inline logo (base64) ou fallback URL ---------- */
const LOGO_DATA_URI = (() => {
  try {
    const file = path.join(process.cwd(), "public", "email-logo.png");
    const data = fs.readFileSync(file);
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    console.warn("⚠️ Logo introuvable, fallback sur l’URL publique.");
    return "";
  }
})();
const LOGO_URL = "https://www.kosmonde.ch/email-logo.png?v=1";
const LOGO = LOGO_DATA_URI || LOGO_URL;

/* ---------- POST /api/send ---------- */
export async function POST(req: Request) {
  try {
    // IP via proxy
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

    // ENV
    const KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.MAIL_FROM;
    const TO = process.env.EMAIL_TO ?? process.env.MAIL_TO;

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
      page: clip(page ?? "", 1000),
    };

    /* ---------- Thème Kosmonde ---------- */
    const BRAND = {
      name: "Kosmonde",
      logoUrl: LOGO,
      headerFrom: "#6D28D9",   // violet
      headerTo: "#1F2937",     // indigo
      panel: "#0F172A",        // slate-900
      body: "#111827",         // slate-800
      text: "#E5E7EB",         // zinc-200
      label: "#94A3B8",        // slate-400
      link: "#22D3EE",         // cyan-400
      divider: "#1F2937",      // slate-700
      badge: "#10B981",        // emerald-500
    };

    /* ---------- Fonction utilitaire ---------- */
    const row = (label: string, value: string) => `
      <table width="100%" style="border-collapse:collapse;margin:0 0 16px">
        <tr>
          <td style="width:140px;color:${BRAND.label};font-size:14px;padding:6px 0;vertical-align:top">${label}</td>
          <td style="font-size:15px;padding:6px 0;vertical-align:top">${value}</td>
        </tr>
      </table>
    `;

    const escapeHtml = (s: string) =>
      String(s || "").replace(/[&<>"']/g, m => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
      })[m]!);

    /* ---------- HTML du mail admin ---------- */
    const htmlAdmin = `
      <div style="margin:0;padding:0;background:${BRAND.body};color:${BRAND.text};
        font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif">
        <div style="max-width:680px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.divider}">
          
          <!-- Header -->
          <div style="background:linear-gradient(90deg,${BRAND.headerFrom},${BRAND.headerTo});padding:20px 24px;">
            <table width="100%" style="border-collapse:collapse">
              <tr>
                <td style="vertical-align:middle;width:48px">
                  <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="40" height="40"
                       style="width:40px;height:40px;border-radius:8px;display:block" />
                </td>
                <td style="vertical-align:middle;padding-left:12px">
                  <div style="font-size:18px;font-weight:600;opacity:.95">${BRAND.name}</div>
                  <div style="margin-top:8px;display:inline-block;background:${BRAND.badge};color:#062e24;
                              font-weight:700;border-radius:999px;padding:4px 10px;font-size:12px;letter-spacing:.2px">
                    Nouveau message
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <!-- Contenu principal -->
          <div style="background:${BRAND.panel};padding:24px 24px 8px">
            ${row("Formule", safe.offer)}
            ${row("Nom", safe.name)}
            ${row("Email", `<a href="mailto:${safe.email}" style="color:${BRAND.link};text-decoration:none">${safe.email}</a>`)}
            ${row("Téléphone", safe.phone || "—")}
            ${row("Sujet", safe.subject)}
            ${row("Message", `<div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(safe.message)}</div>`)}
            ${row("Page", safe.page ? `<a href="${safe.page}" style="color:${BRAND.link};text-decoration:none">${safe.page}</a>` : "—")}
          </div>

          <!-- Footer -->
          <div style="padding:16px 24px 24px;background:${BRAND.panel};
                      border-top:1px solid ${BRAND.divider};color:${BRAND.label};font-size:12px">
            IP: ${ip} • <a href="https://www.kosmonde.ch" style="color:${BRAND.link};text-decoration:none">www.kosmonde.ch</a>
            <div style="margin-top:8px;text-align:center;color:${BRAND.label}">
              © ${new Date().getFullYear()} Kosmonde — Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    `;

    // Envoi à l’admin
    const send1 = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(safe.email),
      subject: `Nouveau message: ${safe.subject}`,
      html: htmlAdmin,
    });
    if (send1.error) throw send1.error;

    // Accusé de réception client
    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: "Nous avons bien reçu votre message",
      html: `
        <p>Bonjour ${safe.name},</p>
        <p>Merci pour votre message. Nous revenons vers vous rapidement.</p>
        <p style="margin-top:24px;color:#888;font-size:13px">© ${new Date().getFullYear()} Kosmonde</p>
      `,
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
