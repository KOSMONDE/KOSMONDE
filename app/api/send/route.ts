import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/* ---------- logo inline ou fallback URL ---------- */
const LOGO_DATA_URI = (() => {
  try {
    const file = path.join(process.cwd(), "public", "email-logo.png");
    const data = fs.readFileSync(file);
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch (err) {
    console.warn("⚠️ Logo introuvable, fallback sur l’URL publique.");
    return "";
  }
})();

// URL absolue (vers ton site)
const LOGO_URL = "https://www.kosmonde.ch/email-logo.png";
const LOGO = LOGO_DATA_URI || LOGO_URL;


const SITE = "https://www.kosmonde.ch";

/* ---------- simple rate-limit mémoire (1 min) ---------- */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ---------- utils ---------- */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

/* ---------- POST /api/send ---------- */
export async function POST(req: Request) {
  try {
    /* ip via proxy */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      // @ts-ignore
      (req as any).ip ??
      "unknown";

    /* rate limit */
    const now = Date.now();
    const h = hits.get(ip);
    if (h && now - h.t < WINDOW_MS && h.n >= MAX_REQ) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes, réessayez dans 1 minute." },
        { status: 429 }
      );
    }
    hits.set(ip, h && now - h.t < WINDOW_MS ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

    /* payload */
    const body = await req.json().catch(() => ({} as any));
    const { name, email, phone, subject, message, website, offer, page } = body || {};
    const pageUrl = clip(page || req.headers.get("referer") || "", 1000);

    /* honeypot */
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ success: false, error: "Spam détecté." }, { status: 400 });
    }

    /* validations */
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Champs manquants." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalide." }, { status: 400 });
    }

    /* env (EMAIL_* ou MAIL_* acceptés) */
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
      phone: clip(phone ?? "", 50),
      subject: clip(subject, 200),
      message: clip(message, 4000),
      offer: clip(offer ?? "custom", 100),
      page: pageUrl,
    };

    /* html admin */
    const htmlAdmin = `
  <div style="background:#0b1220;padding:0;margin:0">
    <div style="max-width:680px;margin:0 auto;background:#111827;color:#e5e7eb;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial">
      <div style="background:linear-gradient(90deg,#4c1d95,#1f1b44);padding:20px 24px;border-radius:16px 16px 0 0">
        <table role="presentation" width="100%">
          <tr>
            <td style="vertical-align:middle;width:48px"><img src="${LOGO}" alt="Kosmonde" style="width:40px;height:40px;border-radius:8px;display:block" /></td>
            <td style="vertical-align:middle;padding-left:12px">
              <div style="font-size:16px;opacity:.9">Kosmonde</div>
              <div style="font-size:22px;font-weight:800;color:#fff">Nouveau message</div>
            </td>
          </tr>
        </table>
      </div>

      <div style="padding:24px;background:#0f172a">
        <table role="presentation" width="100%" style="border-collapse:separate;border-spacing:0 12px">
          <tr>
            <td style="width:180px;color:#93c5fd">Formule</td>
            <td style="color:#fff">${esc(safe.offer)}</td>
          </tr>
          <tr>
            <td style="color:#93c5fd">Nom</td>
            <td style="color:#fff">${esc(safe.name)}</td>
          </tr>
          <tr>
            <td style="color:#93c5fd">Email</td>
            <td><a href="mailto:${esc(safe.email)}" style="color:#60a5fa;text-decoration:none">${esc(safe.email)}</a></td>
          </tr>
          <tr>
            <td style="color:#93c5fd">Téléphone</td>
            <td style="color:#fff">${esc(safe.phone || "-")}</td>
          </tr>
          <tr>
            <td style="color:#93c5fd">Sujet</td>
            <td style="color:#fff">${esc(safe.subject)}</td>
          </tr>
          <tr>
            <td style="color:#93c5fd;vertical-align:top">Message</td>
            <td style="color:#fff;white-space:pre-wrap">${esc(safe.message)}</td>
          </tr>
          ${
            safe.page
              ? `<tr>
            <td style="color:#93c5fd">Page</td>
            <td><a href="${esc(safe.page)}" style="color:#60a5fa;text-decoration:none">${esc(safe.page)}</a></td>
          </tr>`
              : ""
          }
        </table>

        <div style="margin-top:20px;padding-top:16px;border-top:1px solid #1f2937;color:#9ca3af;font-size:12px">
          IP: ${esc(ip)} • <a href="${SITE}" style="color:#9ca3af;text-decoration:none">${SITE.replace(
      /^https?:\/\//,
      ""
    )}</a>
        </div>
      </div>

      <div style="padding:16px;text-align:center;color:#9ca3af;font-size:12px">
        © ${new Date().getFullYear()} Kosmonde — Tous droits réservés.
      </div>
    </div>
  </div>`.trim();

    /* texte fallback */
    const textAdmin =
      `Nouveau message Kosmonde\n\n` +
      `Formule: ${safe.offer}\n` +
      `Nom: ${safe.name}\n` +
      `Email: ${safe.email}\n` +
      `Téléphone: ${safe.phone || "-"}\n` +
      `Sujet: ${safe.subject}\n\n` +
      `Message:\n${safe.message}\n\n` +
      (safe.page ? `Page: ${safe.page}\n` : "") +
      `IP: ${ip}\n`;

    /* envoi admin */
    const send1 = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(safe.email),
      subject: `Nouveau message: ${safe.subject}`,
      html: htmlAdmin,
      text: textAdmin,
    });
    if (send1.error) throw send1.error;

    /* accusé de réception */
    const ackHtml = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto">
        <p>Bonjour ${esc(safe.name)},</p>
        <p>Merci pour votre message. Nous revenons vers vous rapidement.</p>
        <p style="margin-top:20px"><a href="${SITE}" style="background:#6d28d9;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Visiter le site</a></p>
        <p style="color:#6b7280;font-size:12px">Cet email est automatique. Ne répondez pas à ce message.</p>
      </div>
    `.trim();

    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: "Nous avons bien reçu votre message",
      html: ackHtml,
      text:
        `Bonjour ${safe.name},\n\n` +
        `Merci pour votre message. Nous revenons vers vous rapidement.\n\n` +
        `${SITE}\n`,
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
