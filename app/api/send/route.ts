export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ===== Rate limit (mémoire, fenêtre 1 min) ===== */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { n: number; t: number }>();

/* ===== Brand ===== */
const BRAND = "Kosmonde";
const SITE = "https://www.kosmonde.ch";
const LOGO = "8de897e7-d5ab-43d6-968c-1e6dff5cc7de.png"; // remplace si besoin

/* ===== Utils ===== */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, max = 2000) => String(s ?? "").slice(0, max);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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

/* ===== HTML admin ===== */
function htmlAdmin(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  offer?: string;
  offerLabel?: string;
  ip: string;
  page?: string;
  ua?: string;
}) {
  const rows = [
    ["Formule", data.offerLabel || data.offer || "-"],
    ["Nom", data.name],
    ["Email", data.email],
    ["Téléphone", data.phone || "-"],
    ["Sujet", data.subject],
  ];

  const meta = [
    ["IP", data.ip],
    ["Page", data.page || "-"],
    ["User-Agent", data.ua || "-"],
  ];

  const messageHtml = esc(data.message).replace(/\n/g, "<br/>");

  return `<!doctype html>
<html>
<head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${BRAND} • Nouveau message</title>
  <style>
    body{margin:0;padding:0;background:#0f172a;color:#0f172a}
    .wrapper{width:100%;background:#0f172a;padding:24px 0}
    .card{max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden}
    .hdr{padding:20px 24px;background:linear-gradient(135deg,#581c87,#1e1b4b);color:#fff}
    .brand{display:flex;align-items:center;gap:12px}
    .brand img{width:28px;height:28px;border-radius:6px}
    .content{padding:24px}
    h1{margin:0 0 4px;font:700 18px/1.3 system-ui,-apple-system,Segoe UI,Roboto}
    h2{margin:24px 0 8px;font:700 15px/1.3 system-ui}
    table{width:100%;border-collapse:collapse;font:14px/1.45 system-ui}
    td{padding:10px 12px;vertical-align:top;border-bottom:1px solid #e5e7eb}
    td.k{width:160px;color:#475569;background:#f8fafc}
    .msg{padding:16px;border:1px solid #e5e7eb;border-radius:10px;background:#fafafa}
    .ft{padding:16px 24px;color:#94a3b8;font:12px/1.4 system-ui;background:#f8fafc}
    .cta{display:inline-block;padding:10px 14px;border-radius:8px;background:#7c3aed;color:#fff;text-decoration:none;font:600 14px/1 system-ui;margin-top:12px}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="hdr">
        <div class="brand">
          <img src="${LOGO}" alt="${BRAND}"/>
          <div>
            <div style="font:600 14px system-ui;opacity:.9">${BRAND}</div>
            <div style="font:700 18px system-ui">Nouveau message</div>
          </div>
        </div>
      </div>
      <div class="content">
        <h2>Détails</h2>
        <table role="presentation" aria-hidden="true">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td class="k">${esc(String(k))}</td><td>${esc(String(v || "-"))}</td></tr>`
            )
            .join("")}
        </table>

        <h2>Message</h2>
        <div class="msg">${messageHtml}</div>

        <a class="cta" href="mailto:${encodeURIComponent(
          data.email
        )}?subject=${encodeURIComponent("Re: " + data.subject)}">Répondre</a>

        <h2 style="margin-top:24px">Métadonnées</h2>
        <table role="presentation" aria-hidden="true">
          ${meta
            .map(
              ([k, v]) =>
                `<tr><td class="k">${esc(String(k))}</td><td>${esc(String(v || "-"))}</td></tr>`
            )
            .join("")}
        </table>
      </div>

      <div class="ft">
        Email automatique envoyé par ${BRAND}. Voir le site : <a href="${SITE}">${SITE}</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/* ===== Texte admin ===== */
function textAdmin(d: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  offer?: string;
  offerLabel?: string;
  ip: string;
  page?: string;
  ua?: string;
}) {
  return [
    `${BRAND} • Nouveau message`,
    "",
    `Formule: ${d.offerLabel || d.offer || "-"}`,
    `Nom: ${d.name}`,
    `Email: ${d.email}`,
    `Téléphone: ${d.phone || "-"}`,
    `Sujet: ${d.subject}`,
    "",
    "Message:",
    d.message,
    "",
    "—",
    `IP: ${d.ip}`,
    `Page: ${d.page || "-"}`,
    `UA: ${d.ua || "-"}`,
  ].join("\n");
}

/* ===== Handler ===== */
export async function POST(req: Request) {
  try {
    /* IP / headers */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      // @ts-ignore: some runtimes
      (req as any).ip ||
      "unknown";
    const page = req.headers.get("referer") || "";
    const ua = req.headers.get("user-agent") || "";

    /* Rate limit */
    const now = Date.now();
    const hit = hits.get(ip);
    if (hit && now - hit.t < WINDOW_MS && hit.n >= MAX_REQ) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes, réessayez dans 1 minute." },
        { status: 429 }
      );
    }
    hits.set(ip, hit && now - hit.t < WINDOW_MS ? { n: hit.n + 1, t: hit.t } : { n: 1, t: now });

    /* Payload */
    const body = await req.json().catch(() => ({} as any));
    const { name, email, phone, subject, message, website, offer } = body || {};

    /* Honeypot */
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ success: false, error: "Spam détecté." }, { status: 400 });
    }

    /* Validation */
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Champs manquants." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalide." }, { status: 400 });
    }

    /* ENV */
    const KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.MAIL_FROM; // "Kosmonde <contact@kosmonde.ch>"
    const TO = process.env.EMAIL_TO ?? process.env.MAIL_TO; // "contact@kosmonde.ch"
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
      offerLabel: OFFER_LABELS[String(offer ?? "custom")] || undefined,
    };

    /* Admin */
    const adminSubject = `[${BRAND}] ${safe.subject} — ${safe.name}`;
    const adminHTML = htmlAdmin({
      name: String(safe.name),
      email: String(safe.email),
      phone: String(safe.phone || ""),
      subject: String(safe.subject),
      message: String(safe.message),
      offer: String(safe.offer || ""),
      offerLabel: safe.offerLabel,
      ip,
      page,
      ua,
    });
    const adminTEXT = textAdmin({
      name: String(safe.name),
      email: String(safe.email),
      phone: String(safe.phone || ""),
      subject: String(safe.subject),
      message: String(safe.message),
      offer: String(safe.offer || ""),
      offerLabel: safe.offerLabel,
      ip,
      page,
      ua,
    });

    const send1 = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(safe.email),
      subject: adminSubject,
      html: adminHTML,
      text: adminTEXT,
      headers: { "X-Kosmonde-Form": "contact" },
    });
    if (send1.error) throw send1.error;

    /* Accusé de réception */
    const ackHTML = `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto;padding:24px;background:#0f172a;color:#e2e8f0">
      <div style="max-width:560px;margin:0 auto;background:#111827;border-radius:12px;padding:24px;border:1px solid #1f2937">
        <div style="font-weight:700;font-size:18px;margin-bottom:8px">${BRAND}</div>
        <p>Bonjour ${esc(String(safe.name))},<br/>Nous avons bien reçu votre message. Nous revenons vers vous rapidement.</p>
        <p style="color:#93c5fd;font-size:13px;margin-top:16px">Récapitulatif rapide</p>
        <ul style="margin:0;padding-left:18px;font-size:14px;color:#cbd5e1">
          <li><strong>Sujet :</strong> ${esc(String(safe.subject))}</li>
          <li><strong>Formule :</strong> ${esc(String(safe.offerLabel || safe.offer))}</li>
        </ul>
        <p style="margin-top:18px"><a href="${SITE}" style="color:#a78bfa;text-decoration:underline">${SITE}</a></p>
      </div>
    </body></html>`;
    const ackTEXT = [
      `${BRAND} — Accusé de réception`,
      "",
      `Bonjour ${safe.name},`,
      "Nous avons bien reçu votre message. Nous revenons vers vous rapidement.",
      "",
      `Sujet: ${safe.subject}`,
      `Formule: ${safe.offerLabel || safe.offer}`,
      "",
      SITE,
    ].join("\n");

    const send2 = await resend.emails.send({
      from: FROM,
      to: String(safe.email),
      subject: `${BRAND} — Accusé de réception`,
      html: ackHTML,
      text: ackTEXT,
      headers: { "X-Kosmonde-Form": "ack" },
    });
    if (send2.error) throw send2.error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /api/send:", err);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
