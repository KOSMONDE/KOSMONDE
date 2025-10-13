export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ---------- Rate limit mémoire (fenêtre 1 min) ---------- */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ---------- Utils ---------- */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);

/* ---------- Libellés d'offres (mêmes que sur le site) ---------- */
const OFFER_LABELS: Record<string, string> = {
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
};

/* ---------- Email HTML (centré, minimal, sans gras) ---------- */
function emailTemplate({
  logo,
  brand = "Kosmonde",
  ip,
  name,
  email,
  phone,
  offerLabel,
  subject,
  message,
}: {
  logo: string;
  brand?: string;
  ip: string;
  name: string;
  email: string;
  phone: string;
  offerLabel: string;
  subject: string;
  message: string;
}) {
  const safeMsg = (message || "").replace(/\n/g, "<br/>");

  return `
  <!doctype html>
  <html lang="fr">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Nouveau message</title>
    <style>
      /* Reset simple */
      body,table,td,div,p,a,span { margin:0; padding:0; line-height:1.5; }
      img { border:0; outline:none; text-decoration:none; display:block; }
      table { border-collapse:collapse; }
      /* Couleurs et styles */
      .bg-page { background:#f3f4f6; }               /* gris clair */
      .card { background:#ffffff; border-radius:14px; box-shadow:0 6px 18px rgba(2,6,23,0.08); overflow:hidden; }
      .header { background:linear-gradient(90deg,#6d28d9,#1f2937); padding:22px 24px; color:#ffffff; }
      .row { width:100%; }
      .brand { font-size:18px; color:#e5e7eb; font-weight:400; }
      .badge { display:inline-block; background:#10b981; color:#052e1f; padding:6px 12px; border-radius:9999px; font-size:14px; font-weight:500; }
      .content { padding:24px; }
      .table { width:100%; font-size:16px; color:#0f172a; }
      .label { width:160px; color:#475569; font-weight:400; padding:10px 0; vertical-align:top; }
      .value { color:#0f172a; font-weight:400; padding:10px 0; }
      .link { color:#06b6d4; text-decoration:none; }
      .footer { padding:16px 24px; border-top:1px solid #e5e7eb; color:#475569; font-size:13px; }
      .muted { color:#64748b; }
      .wrap { width:100%; max-width:680px; margin:0 auto; }
      @media (max-width: 640px) {
        .label { width:120px; }
        .content { padding:18px; }
        .header { padding:18px; }
      }
    </style>
  </head>
  <body class="bg-page" style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial; background:#f3f4f6; padding:24px;">
    <div class="wrap">
      <table role="presentation" class="card" width="100%">
        <tr>
          <td class="header">
            <table role="presentation" class="row">
              <tr>
                <td style="vertical-align:middle; width:48px;">
                  <img src="${logo}" alt="${brand}" width="40" height="40" style="border-radius:8px;" />
                </td>
                <td style="vertical-align:middle; padding-left:12px;">
                  <div class="brand">${brand}</div>
                </td>
                <td style="text-align:right;">
                  <span class="badge">Nouveau message</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td class="content">
            <table role="presentation" class="table">
              <tr><td class="label">Nom</td><td class="value">${name}</td></tr>
              <tr><td class="label">Email</td><td class="value"><a class="link" href="mailto:${email}">${email}</a></td></tr>
              <tr><td class="label">Téléphone</td><td class="value">${phone || "-"}</td></tr>
              <tr><td class="label">Formule</td><td class="value">${offerLabel}</td></tr>
              <tr><td class="label">Sujet</td><td class="value">${subject}</td></tr>
              <tr><td class="label">Message</td><td class="value">${safeMsg || "-"}</td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td class="footer">
            <div>IP&nbsp;: ${ip} • <a class="link" href="https://www.kosmonde.ch">www.kosmonde.ch</a></div>
            <div class="muted" style="margin-top:6px;">© ${new Date().getFullYear()} Kosmonde — Tous droits réservés.</div>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
  `;
}

/* ---------- POST /api/send ---------- */
export async function POST(req: Request) {
  try {
    // IP via proxy (Vercel)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      // @ts-ignore (au cas où)
      (req as any).ip ||
      "unknown";

    // Rate limit
    const now = Date.now();
    const h = hits.get(ip);
    if (h && now - h.t < WINDOW_MS && h.n >= MAX_REQ) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes, réessayez dans 1 minute." },
        { status: 429 }
      );
    }
    hits.set(ip, h && now - h.t < WINDOW_MS ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

    // Payload
    const body = await req.json().catch(() => ({} as any));
    const { name, email, phone, subject, message, website, offer } = body || {};

    // Honeypot
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ success: false, error: "Spam détecté." }, { status: 400 });
    }

    // Validations
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Champs manquants." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalide." }, { status: 400 });
    }

    // ENV (accepte EMAIL_* et MAIL_* pour compat)
    const KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.MAIL_FROM; // "Kosmonde <contact@kosmonde.ch>"
    const TO   = process.env.EMAIL_TO   ?? process.env.MAIL_TO;   // "contact@kosmonde.ch"
    const LOGO = process.env.EMAIL_LOGO_URL ?? "https://www.kosmonde.ch/email-logo.png?v=1";

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
      offer: clip(offer ?? "custom", 100).toLowerCase(),
    };

    const offerLabel = OFFER_LABELS[safe.offer] ?? OFFER_LABELS.custom;

    // Mail admin (centré, fond gris clair)
    const adminHtml = emailTemplate({
      logo: LOGO,
      ip,
      name: String(safe.name),
      email: String(safe.email),
      phone: String(safe.phone || ""),
      offerLabel,
      subject: String(safe.subject),
      message: String(safe.message),
    });

    const send1 = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(safe.email),
      subject: `Nouveau message: ${safe.subject}`,
      html: adminHtml,
    });
    if (send1.error) throw send1.error;

    // Accusé de réception au client (sobre)
    const ackHtml = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial; background:#f3f4f6; padding:24px;">
        <div style="max-width:620px; margin:0 auto; background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(2,6,23,0.08); overflow:hidden;">
          <div style="background:linear-gradient(90deg,#6d28d9,#1f2937); padding:18px 20px; color:#ffffff;">
            <span style="display:inline-block; background:#10b981; color:#052e1f; padding:6px 12px; border-radius:9999px; font-size:14px; font-weight:500;">Accusé de réception</span>
          </div>
          <div style="padding:20px; color:#0f172a; font-size:16px;">
            <p style="margin:0 0 10px 0;">Bonjour ${safe.name},</p>
            <p style="margin:0 0 10px 0;">Nous avons bien reçu votre message et vous répondrons rapidement.</p>
            <p style="margin:0;">— Kosmonde</p>
          </div>
        </div>
      </div>
    `;
    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: "Nous avons bien reçu votre message",
      html: ackHtml,
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
