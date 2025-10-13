export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ------------ Rate-limit (1 min) ------------ */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ------------ Utils ------------ */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);

/* ------------ Offres ------------ */
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

/* ------------ Logo ------------ */
const LOGO = "https://www.kosmonde.ch/email-logo.png?v=2";

/* ------------ POST ------------ */
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    // rate-limit
    const now = Date.now();
    const hit = hits.get(ip);
    if (hit && now - hit.t < WINDOW_MS && hit.n >= MAX_REQ) {
      return NextResponse.json({ success: false, error: "Trop de requêtes, réessayez dans 1 minute." }, { status: 429 });
    }
    hits.set(ip, hit && now - hit.t < WINDOW_MS ? { n: hit.n + 1, t: hit.t } : { n: 1, t: now });

    // payload
    const body = await req.json().catch(() => ({} as any));
    const { name, email, phone, subject, message, website, offer } = body || {};

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
    const KEY  = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.MAIL_FROM;
    const TO   = process.env.EMAIL_TO   ?? process.env.MAIL_TO;
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
    };
    const offerLabel = OFFER_LABELS[safe.offer] ?? OFFER_LABELS.custom;

    /* ------------ Palette ------------ */
    const BG = "#f7f8fa";
    const CARD = "#ffffff";
    const BORDER = "#e5e7eb";
    const TEXT = "#111827";
    const MUTED = "#6b7280";
    const LINK = "#0ea5e9";
    const HEADER = "linear-gradient(90deg,#6b46c1,#111827)";
    const BADGE = "#16a34a";

    /* ------------ Email admin (inchangé) ------------ */
    const htmlAdmin = `
<!doctype html><html><head><meta name="color-scheme" content="light"><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:${BG};">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="${BG}" style="padding:24px 12px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" bgcolor="${CARD}" style="max-width:600px;border-radius:16px;border:1px solid ${BORDER};box-shadow:0 2px 12px rgba(0,0,0,.04);text-align:center;overflow:hidden;">
      <tr>
        <td style="padding:28px;background:${HEADER};">
          <img src="${LOGO}" alt="Kosmonde" width="48" height="48" style="border-radius:10px;display:block;margin:0 auto 10px;">
          <span style="display:inline-block;padding:7px 14px;border-radius:999px;background:${BADGE};color:#fff;font:400 12px/1 'Helvetica Neue',Arial,sans-serif;">Nouveau message</span>
        </td>
      </tr>

      ${block("Formule", escapeHtml(offerLabel))}
      ${block("Nom", escapeHtml(safe.name))}
      ${block("Email", `<a href="mailto:${escapeHtml(safe.email)}" style="color:${LINK};text-decoration:none;">${escapeHtml(safe.email)}</a>`)}
      ${block("Téléphone", safe.phone ? escapeHtml(safe.phone) : "—")}
      ${block("Sujet", escapeHtml(safe.subject))}
      ${block("Message", nl2br(escapeHtml(safe.message)))}

      <tr>
        <td style="padding:16px;border-top:1px solid ${BORDER};">
          <div style="color:${MUTED};font:400 12px/1.6 'Helvetica Neue',Arial,sans-serif;">
            IP : ${escapeHtml(ip)} • <a href="https://www.kosmonde.ch" style="color:${LINK};text-decoration:none;">www.kosmonde.ch</a>
          </div>
          <div style="color:#9ca3af;font:400 12px/1.6 'Helvetica Neue',Arial,sans-serif;margin-top:6px;">© ${new Date().getFullYear()} Kosmonde — Tous droits réservés.</div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`.trim();

    const send1 = await resend.emails.send({
      from: FROM, to: TO, replyTo: String(safe.email),
      subject: `Nouveau message — ${offerLabel}`, html: htmlAdmin,
    });
    if (send1.error) throw send1.error;

    /* ------------ Accusé client: sans texte sous logo, sans bouton ------------ */
    const msgPreview = escapeHtml(safe.message).slice(0, 800);
    const ackHtml = `
<!doctype html><html><head><meta name="color-scheme" content="light"><meta charset="utf-8"><title>Accusé de réception</title></head>
<body style="margin:0;padding:0;background:${BG};">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="${BG}" style="padding:24px 12px;">
  <tr><td align="center">
    <table width="640" cellpadding="0" cellspacing="0" bgcolor="${CARD}" style="max-width:640px;border-radius:18px;border:1px solid ${BORDER};box-shadow:0 2px 12px rgba(0,0,0,.04);text-align:center;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="padding:26px;background:${HEADER};">
          <img src="${LOGO}" alt="Kosmonde" width="44" height="44" style="border-radius:10px;display:block;margin:0 auto 8px;">
          <span style="display:inline-block;padding:7px 14px;border-radius:999px;background:${BADGE};color:#fff;font:400 12px/1 'Helvetica Neue',Arial,sans-serif;">Accusé de réception</span>
        </td>
      </tr>

      <!-- Intro -->
      <tr>
        <td style="padding:22px 32px 10px 32px;">
          <p style="margin:0 0 8px 0;color:${TEXT};font:400 16px/1.6 'Helvetica Neue',Arial,sans-serif;">Bonjour ${escapeHtml(safe.name)},</p>
          <p style="margin:0;color:${MUTED};font:400 14px/1.8 'Helvetica Neue',Arial,sans-serif;">
            Merci d’avoir choisi Kosmonde pour votre projet. Votre demande est confirmée.
            Nous préparons un retour précis avec délais et budget indicatifs et vous contactons très vite.
          </p>
        </td>
      </tr>

      <!-- Récap (bloc 520 px, colonnes 160 / 360) -->
      <tr>
        <td style="padding:10px 32px 0 32px;">
          <div style="color:${LINK};font:400 14px/1.6 'Helvetica Neue',Arial,sans-serif;margin:0 0 10px 0;">Récapitulatif</div>
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" width="520" style="margin:0 auto;border-collapse:separate;border-spacing:0 8px;">
            <tr>
              <td width="160" align="right" style="padding:10px 12px;color:${MUTED};font:400 13px/1.5 'Helvetica Neue',Arial,sans-serif;white-space:nowrap;">Sujet</td>
              <td width="360" align="left"  style="padding:10px 12px;color:${TEXT};font:400 14px/1.5 'Helvetica Neue',Arial,sans-serif;word-break:break-word;">${escapeHtml(safe.subject)}</td>
            </tr>
            <tr>
              <td width="160" align="right" style="padding:10px 12px;color:${MUTED};font:400 13px/1.5 'Helvetica Neue',Arial,sans-serif;white-space:nowrap;">Formule</td>
              <td width="360" align="left"  style="padding:10px 12px;color:${TEXT};font:400 14px/1.5 'Helvetica Neue',Arial,sans-serif;word-break:break-word;">${escapeHtml(offerLabel)}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Message client centré -->
      ${
        msgPreview
          ? `<tr>
               <td style="padding:14px 32px 22px 32px;">
                 <div style="color:${MUTED};font:400 12px/1.6 'Helvetica Neue',Arial,sans-serif;">Votre message</div>
                 <table role="presentation" cellpadding="0" cellspacing="0" align="center" width="520" style="margin:6px auto 0 auto;">
                   <tr>
                     <td align="center" style="padding:0 12px;color:${TEXT};font:400 14px/1.7 'Helvetica Neue',Arial,sans-serif;white-space:pre-wrap;word-break:break-word;">
                       ${msgPreview}${safe.message.length > 800 ? "…" : ""}
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>`
          : ""
      }

      <!-- Footer -->
      <tr>
        <td style="padding:14px 16px;border-top:1px solid ${BORDER};">
          <div style="color:#9ca3af;font:400 12px/1.6 'Helvetica Neue',Arial,sans-serif;">© ${new Date().getFullYear()} Kosmonde • www.kosmonde.ch</div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`.trim();

    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: "Accusé de réception",
      html: ackHtml,
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}

/* ------------ Helpers ------------ */
function block(label: string, value: string) {
  return `
    <tr>
      <td style="padding:16px;background:#ffffff;border-bottom:1px solid #e5e7eb;text-align:center;">
        <div style="color:#9ca3af;font:400 11px/1 'Helvetica Neue',Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px;">${escapeHtml(label)}</div>
        <div style="color:#111827;font:400 15px/1.55 'Helvetica Neue',Arial,sans-serif;">${value}</div>
      </td>
    </tr>`;
}
function nl2br(s: string) { return s.replace(/\n/g, "<br/>"); }
function escapeHtml(s: string) {
  return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
