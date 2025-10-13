export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ------------ Rate-limit mémoire (1 min) ------------ */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ------------ Utils ------------ */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);

/* ------------ Libellés offres (identiques au site) ------------ */
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
} as const;
type OfferKey = keyof typeof OFFER_LABELS;

/* ------------ Logo public (déployé) ------------ */
const LOGO = "https://www.kosmonde.ch/email-logo.png?v=2"; // public/email-logo.png

/* ------------ POST /api/send ------------ */
export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    // rate-limit
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

    // ENV (EMAIL_* ou MAIL_* acceptés)
    const KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.MAIL_FROM; // 'Kosmonde <contact@kosmonde.ch>'
    const TO = process.env.EMAIL_TO ?? process.env.MAIL_TO;       // 'contact@kosmonde.ch'
    if (!KEY || !FROM || !TO) {
      console.error("Config email manquante", { hasKey: !!KEY, hasFrom: !!FROM, hasTo: !!TO });
      return NextResponse.json({ success: false, error: "Config manquante." }, { status: 500 });
    }

    const resend = new Resend(KEY);

    const safe = {
      name: clip(name, 200),
      email: clip(email, 320),
      phone: clip(phone ?? "", 50),
      subject: clip(subject, 200),
      message: clip(message, 4000),
      offer: (String(offer ?? "custom").toLowerCase() as OfferKey),
      page: clip(page ?? "", 2000),
    };
    const offerLabel =
      OFFER_LABELS[safe.offer as OfferKey] ?? OFFER_LABELS.custom;

    /* ------------ Email HTML (clair + centré + minimal) ------------ */
    const htmlAdmin = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:100%;background:#ffffff;border-radius:16px;box-shadow:0 4px 20px rgba(18, 24, 40, 0.06);overflow:hidden;">
          <tr>
            <td style="padding:20px 24px;background:linear-gradient(90deg,#6b46c1,#111827);color:#fff;">
              <table role="presentation" width="100%">
                <tr>
                  <td width="48" valign="middle">
                    <img src="${LOGO}" width="40" height="40" style="display:block;border-radius:8px;" alt="Kosmonde" />
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font:600 18px/1.2 ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;color:#E6E6E6;">Kosmonde</div>
                    <div style="display:inline-block;margin-top:8px;padding:6px 10px;border-radius:999px;background:#16a34a;color:#fff;font:600 12px/1 ui-sans-serif;">Nouveau message</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 24px;background:#f9fafb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #eef2f7;">
                <tbody>
                  ${row("Formule", offerLabel)}
                  ${row("Nom", escapeHtml(safe.name))}
                  ${row("Email", linkMail(safe.email))}
                  ${row("Téléphone", safe.phone ? escapeHtml(safe.phone) : "—")}
                  ${row("Sujet", escapeHtml(safe.subject))}
                  ${row("Message", nl2br(escapeHtml(safe.message)))}
                  ${safe.page ? row("Page", linkUrl(String(safe.page))) : ""}
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px;background:#ffffff;border-top:1px solid #eef2f7;color:#6b7280;font:400 12px/1.6 ui-sans-serif;">
              <div style="text-align:center;">
                IP : ${escapeHtml(ip)} • <a href="https://www.kosmonde.ch" style="color:#0ea5e9;text-decoration:none;">www.kosmonde.ch</a>
              </div>
              <div style="text-align:center;color:#9ca3af;margin-top:6px;">© ${new Date().getFullYear()} Kosmonde — Tous droits réservés.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`.trim();

    // admin
    const send1 = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(safe.email),
      subject: `Nouveau message — ${offerLabel}`,
      html: htmlAdmin,
    });
    if (send1.error) throw send1.error;

    // accusé client
    const ackHtml = `
      <div style="font:400 14px/1.7 ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;color:#111827;">
        <p>Bonjour ${escapeHtml(safe.name)},</p>
        <p>Nous avons bien reçu votre message. Nous revenons vers vous rapidement.</p>
        <p style="color:#6b7280">— Kosmonde</p>
      </div>
    `.trim();

    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: "Kosmonde — Accusé de réception",
      html: ackHtml,
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}

/* ------------ Helpers HTML ------------ */
function row(label: string, value: string) {
  return `
  <tr>
    <td style="width:180px;padding:14px 16px;border-bottom:1px solid #eef2f7;color:#64748b;font:600 14px/1 ui-sans-serif;">${escapeHtml(label)}</td>
    <td style="padding:14px 16px;border-bottom:1px solid #eef2f7;color:#111827;font:500 14px/1.4 ui-sans-serif;">${value}</td>
  </tr>`;
}
function linkMail(addr: string) {
  const a = escapeHtml(addr);
  return `<a href="mailto:${a}" style="color:#0ea5e9;text-decoration:none;">${a}</a>`;
}
function linkUrl(url: string) {
  const u = escapeHtml(url);
  return `<a href="${u}" style="color:#0ea5e9;text-decoration:none;">${u}</a>`;
}
function nl2br(s: string) {
  return s.replace(/\n/g, "<br/>");
}
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
