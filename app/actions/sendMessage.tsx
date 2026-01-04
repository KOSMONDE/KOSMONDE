"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "KOSMONDE <contact@kosmonde.ch>";
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_BUCKETS = new Map<string, number[]>();

type OriginCheckResult = { ok: true } | { ok: false; reason: string };

function sanitizePlainText(value: string, maxLength = 500) {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessageHtml(value: string) {
  const sanitized = sanitizePlainText(value, 2000);
  if (!sanitized) return "—";
  return escapeHtml(sanitized).replace(/\r?\n/g, "<br />");
}

type SendResult = {
  success: boolean;
  error?: string;
};

type BookingPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
};

function parseHost(raw: string | null) {
  if (!raw) return "";
  try {
    return new URL(raw).host.toLowerCase();
  } catch {
    return raw.toLowerCase();
  }
}

function getAllowedHosts(requestHeaders: Headers) {
  const host = requestHeaders.get("host")?.toLowerCase() ?? "";
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "";
  const envHost = envUrl ? parseHost(envUrl) : "";
  return Array.from(new Set([host, envHost].filter(Boolean)));
}

function checkRequestOrigin(requestHeaders: Headers): OriginCheckResult {
  const allowedHosts = getAllowedHosts(requestHeaders);
  if (!allowedHosts.length) return { ok: true };

  const originHost = parseHost(requestHeaders.get("origin"));
  if (originHost) {
    return allowedHosts.includes(originHost)
      ? { ok: true }
      : { ok: false, reason: "Origine non autorisée." };
  }

  const refererHost = parseHost(requestHeaders.get("referer"));
  if (refererHost) {
    return allowedHosts.includes(refererHost)
      ? { ok: true }
      : { ok: false, reason: "Référent non autorisé." };
  }

  return { ok: false, reason: "Origine manquante." };
}

function getClientKey(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return requestHeaders.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const existing = RATE_LIMIT_BUCKETS.get(clientKey) ?? [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    RATE_LIMIT_BUCKETS.set(clientKey, recent);
    return true;
  }
  recent.push(now);
  RATE_LIMIT_BUCKETS.set(clientKey, recent);
  return false;
}

async function verifyTurnstile(token: string, requestHeaders: Headers) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY manquante dans l'environnement serveur");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  const clientKey = getClientKey(requestHeaders);
  if (clientKey && clientKey !== "unknown") body.set("remoteip", clientKey);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("Erreur vérification Turnstile", error);
    return false;
  }
}

function isValidISODate(value: string) {
  const match = ISO_DATE_REGEX.exec(value);
  if (!match) return false;
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function alignToMonday(date: Date) {
  const aligned = new Date(date);
  const diff = (aligned.getDay() + 6) % 7;
  aligned.setDate(aligned.getDate() - diff);
  aligned.setHours(12, 0, 0, 0);
  return aligned;
}

function buildAvailabilityMap(minWeekStart: Date, lastWeekStart: Date) {
  const slots = new Map<string, string[]>();
  let weekStartCursor = minWeekStart;
  let weekIndex = 0;
  while (weekStartCursor.getTime() <= lastWeekStart.getTime()) {
    const dayIdx1 = (weekIndex * 2) % 5;
    const dayIdx2 = (weekIndex * 2 + 2) % 5;

    [dayIdx1, dayIdx2].forEach((dayIdx) => {
      const date = addDays(weekStartCursor, dayIdx);
      const iso = date.toISOString().slice(0, 10);
      slots.set(iso, ["12:00", "18:00"]);
    });

    weekStartCursor = addDays(weekStartCursor, 7);
    weekIndex += 1;
  }
  return slots;
}

function isValidBookingSlot(dateISO: string, time: string) {
  if (!isValidISODate(dateISO) || !TIME_REGEX.test(time)) return false;
  const now = new Date();
  const yearStart = now.getFullYear();
  const yearEnd = yearStart + 1;
  const minDate = new Date(yearStart, 0, 1);
  minDate.setHours(12, 0, 0, 0);
  const maxDate = new Date(yearEnd, 11, 31);
  maxDate.setHours(12, 0, 0, 0);
  const minWeekStart = alignToMonday(minDate);
  const lastWeekStart = alignToMonday(maxDate);
  const availabilityMap = buildAvailabilityMap(minWeekStart, lastWeekStart);
  const slots = availabilityMap.get(dateISO) ?? [];
  return slots.includes(time);
}

export async function sendMessage(formData: FormData): Promise<SendResult> {
  const requestHeaders = await headers();
  const originCheck = checkRequestOrigin(requestHeaders);
  if (!originCheck.ok) {
    console.warn("Requête bloquée (origine)", originCheck.reason);
    return { success: false, error: "Requête refusée." };
  }

  const clientKey = getClientKey(requestHeaders);
  if (isRateLimited(clientKey)) {
    return { success: false, error: "Trop de tentatives. Merci de réessayer plus tard." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante dans l'environnement serveur");
    return {
      success: false,
      error:
        "Configuration email manquante. Vérifie la clé RESEND_API_KEY sur le serveur.",
    };
  }

  const nameInput = (formData.get("name") ?? "").toString().trim();
  const emailInput = (formData.get("email") ?? "").toString().trim();
  const projectTypeInput = (formData.get("project-type") ?? "").toString().trim();
  const phoneInput = (formData.get("phone") ?? "").toString().trim();
  const messageInput = (formData.get("message") ?? "").toString().trim();
  const honeypot = (formData.get("company") ?? "").toString().trim();

  if (honeypot) {
    console.warn("Honeypot déclenché pour le formulaire de contact");
    return {
      success: false,
      error: "Validation de sécurité échouée. Merci de réessayer ou d'écrire directement à contact@kosmonde.ch.",
    };
  }

  const turnstileToken = (formData.get("cf-turnstile-response") ?? "").toString().trim();
  const turnstileOk = await verifyTurnstile(turnstileToken, requestHeaders);
  if (!turnstileOk) {
    return { success: false, error: "Vérification anti-robot échouée." };
  }

  if (!nameInput || !emailInput || !messageInput) {
    return { success: false, error: "Champs requis manquants." };
  }

  if (!EMAIL_REGEX.test(emailInput)) {
    return { success: false, error: "L'adresse email n'est pas valide." };
  }

  const safeNamePlain = sanitizePlainText(nameInput, 120);
  const safeMessagePlain = sanitizePlainText(messageInput, 2000);

  if (!safeNamePlain || !safeMessagePlain) {
    return { success: false, error: "Le message fourni est invalide." };
  }

  const safeProjectTypePlain = sanitizePlainText(projectTypeInput, 120) || "Non précisé";
  const safePhonePlain = sanitizePlainText(phoneInput, 50);
  const safeMessageHtml = formatMessageHtml(messageInput);
  const safeNameHtml = escapeHtml(safeNamePlain);
  const safeProjectTypeHtml = escapeHtml(safeProjectTypePlain);
  const safePhoneHtml = safePhonePlain ? escapeHtml(safePhonePlain) : "Non fourni";
  const safeEmailHtml = escapeHtml(emailInput);
  const nowLabel = new Date().toLocaleString("fr-CH");
  const nowLabelHtml = escapeHtml(nowLabel);

  const firstNameHtml = escapeHtml(safeNamePlain.split(/\s+/)[0] ?? safeNamePlain);

  try {
    /* =======================
       EMAIL ADMIN (pour toi)
       ======================= */

    const adminHtml = `
<html lang="fr" style="background:#020617;">
  <body style="margin:0;padding:0;background:#020617;font-family:-apple-system,BlinkMacSystemFont,system-ui,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:32px 0;">
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" align="center" style="max-width:600px;margin:0 auto;background:#020617;color:#e5e7eb;border-radius:16px;border:1px solid #020617;box-shadow:0 24px 80px rgba(15,23,42,0.9);overflow:hidden;">

            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1f2937;background:radial-gradient(circle at top,rgba(56,189,248,0.18),rgba(2,6,23,0) 55%);">
                <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">KOSMONDE</div>
                <div style="font-size:18px;font-weight:600;color:#f9fafb;">Nouveau message depuis le site KOSMONDE</div>
                <div style="margin-top:4px;font-size:12px;color:#9ca3af;">Vous avez reçu un nouveau message via le formulaire de contact.</div>

                <div style="margin-top:10px;font-size:11px;color:#9ca3af;">
                  <span style="display:inline-block;padding:3px 9px;border-radius:999px;border:1px solid #1f2937;background:rgba(15,23,42,0.9);margin-right:6px;">${safeProjectTypeHtml}</span>
                  <span style="display:inline-block;padding:3px 9px;border-radius:999px;border:1px dashed #1f2937;color:#6b7280;">${nowLabelHtml}</span>
                </div>

                <div style="margin-top:8px;font-size:11px;color:#d1d5db;">
                  ${safeNameHtml} • ${safeProjectTypeHtml}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;border:1px solid #1f2937;background:#020617;">
                  
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Nom</div>
                      <div style="font-size:13px;color:#e5e7eb;font-weight:500;">${safeNameHtml}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Email</div>
                      <div style="font-size:13px;color:#38bdf8;">
                        <a href="mailto:${emailInput}" style="color:#38bdf8;text-decoration:none;">${safeEmailHtml}</a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Téléphone</div>
                      <div style="font-size:13px;color:#e5e7eb;font-weight:500;">${safePhoneHtml}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Type de projet</div>
                      <div style="font-size:13px;color:#e5e7eb;">${safeProjectTypeHtml}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Message</div>
                      <div style="font-size:13px;color:#e5e7eb;line-height:1.6;white-space:pre-line;">
                        ${safeMessageHtml}
                      </div>
                    </td>
                  </tr>

                </table>

                <div style="margin-top:12px;font-size:11px;color:#6b7280;">Reçu le : ${nowLabelHtml}</div>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px 18px;border-top:1px solid #1f2937;font-size:11px;color:#6b7280;">
                Ce message a été envoyé depuis le formulaire de contact de 
                <a href="https://kosmonde.ch" style="color:#38bdf8;text-decoration:none;">kosmonde.ch</a>.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `.trim();

    /* ============================
       EMAIL CLIENT (confirmation)
       ============================ */

    const replyHtml = `
<html lang="fr" style="background:#020617;">
  <body style="margin:0;padding:0;background:#020617;font-family:-apple-system,BlinkMacSystemFont,system-ui,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:32px 0;">
      <tr>
        <td>
          <table width="600" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;background:#020617;color:#e5e7eb;border-radius:16px;border:1px solid #020617;box-shadow:0 24px 80px rgba(15,23,42,0.9);overflow:hidden;">

            <!-- Préheader -->
            <tr>
              <td style="font-size:0;line-height:0;display:none;mso-hide:all;color:transparent;max-height:0;max-width:0;opacity:0;overflow:hidden;">
                Merci pour votre message — je vous réponds rapidement avec un premier retour.
              </td>
            </tr>

            <!-- HEADER -->
            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1f2937;background:radial-gradient(circle at top,rgba(56,189,248,0.18),rgba(2,6,23,0) 55%);">
                <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">KOSMONDE</div>
                <div style="font-size:18px;font-weight:600;color:#f9fafb;">Merci pour votre message</div>
                <div style="margin-top:4px;font-size:12px;color:#9ca3af;">Votre message est bien arrivé, je vais le lire avec attention.</div>
              </td>
            </tr>

            <!-- CONTENU -->
            <tr>
              <td style="padding:20px 24px 18px;">

                <p style="font-size:13px;color:#e5e7eb;margin:0 0 12px;">
                  Bonjour ${firstNameHtml},
                </p>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 12px;line-height:1.5;">
                  Merci d’avoir pris le temps de m’écrire à propos de votre projet ${
                    safeProjectTypePlain !== "Non précisé"
                      ? `&laquo; ${safeProjectTypeHtml} &raquo;`
                      : "web"
                  }.
                </p>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 12px;line-height:1.5;">
                  Je vais analyser votre message et votre contexte, puis je vous répondrai sous 24&nbsp;heures (hors week-end) avec un premier retour concret.
                </p>

                <!-- Résumé très simple -->
                <div style="margin-top:18px;margin-bottom:14px;">
                  <div style="font-size:12px;font-weight:600;color:#e5e7eb;margin-bottom:6px;">Résumé rapide</div>

                  <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;border:1px solid #1f2937;background:#020617;font-size:12px;color:#d1d5db;">
                    <tr>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;color:#9ca3af;width:40%;">Type de projet</td>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;">${safeProjectTypeHtml}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 12px;vertical-align:top;color:#9ca3af;">Message</td>
                      <td style="padding:8px 12px;line-height:1.5;white-space:pre-line;">${safeMessageHtml}</td>
                    </tr>
                  </table>
                </div>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 16px;line-height:1.5;">
                  Si vous souhaitez déjà partager des exemples de sites ou des idées supplémentaires, vous pouvez simplement répondre à cet email.
                </p>

                <p style="font-size:13px;color:#9ca3af;margin:0;line-height:1.6;">
                  À très bientôt,<br />
                  Yanis – KOSMONDE<br />
                  <span style="font-size:12px;color:#9ca3af;">Création de sites web clairs, modernes et efficaces.</span>
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:14px 24px 18px;border-top:1px solid #1f2937;font-size:11px;color:#6b7280;">
                Vous développez votre projet, KOSMONDE vous aide à lui donner une présence claire sur le web.
                <a href="https://kosmonde.ch" style="color:#38bdf8;text-decoration:none;">kosmonde.ch</a><br />
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `.trim();

    // ENVOI ADMIN
    await resend.emails.send({
      from: FROM_EMAIL,
      to: "mroussadiyanis@icloud.com",
      subject: `[${safeProjectTypePlain}] Nouveau message de ${safeNamePlain}`,
      replyTo: emailInput,
      html: adminHtml,
    });

    // ENVOI CLIENT
    await resend.emails.send({
      from: FROM_EMAIL,
      to: emailInput,
      subject: "Merci pour votre message – KOSMONDE",
      replyTo: "mroussadiyanis@icloud.com",
      html: replyHtml,
    });

    return { success: true };
  } catch (err) {
    console.error("Erreur Resend", err);
    return {
      success: false,
      error: "Échec de l’envoi du message.",
    };
  }
}

export async function sendBookingEmail(formData: FormData): Promise<SendResult> {
  const requestHeaders = await headers();
  const originCheck = checkRequestOrigin(requestHeaders);
  if (!originCheck.ok) {
    console.warn("Requête bloquée (origine)", originCheck.reason);
    return { success: false, error: "Requête refusée." };
  }

  const clientKey = getClientKey(requestHeaders);
  if (isRateLimited(clientKey)) {
    return { success: false, error: "Trop de tentatives. Merci de réessayer plus tard." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante dans l'environnement serveur");
    return {
      success: false,
      error:
        "Configuration email manquante. Vérifie la clé RESEND_API_KEY sur le serveur.",
    };
  }

  const honeypot = (formData.get("company") ?? "").toString().trim();
  if (honeypot) {
    console.warn("Honeypot déclenché pour le formulaire RDV");
    return {
      success: false,
      error: "Validation de sécurité échouée. Merci de réessayer.",
    };
  }

  const turnstileToken = (formData.get("cf-turnstile-response") ?? "").toString().trim();
  const turnstileOk = await verifyTurnstile(turnstileToken, requestHeaders);
  if (!turnstileOk) {
    return { success: false, error: "Vérification anti-robot échouée." };
  }

  const payload: BookingPayload = {
    name: sanitizePlainText((formData.get("name") ?? "").toString(), 120),
    email: (formData.get("email") ?? "").toString().trim(),
    phone: sanitizePlainText((formData.get("phone") ?? "").toString(), 60),
    service: sanitizePlainText((formData.get("service") ?? "").toString(), 200),
    date: sanitizePlainText((formData.get("date") ?? "").toString(), 80),
    time: sanitizePlainText((formData.get("time") ?? "").toString(), 20),
    notes: sanitizePlainText((formData.get("notes") ?? "").toString(), 500),
  };

  if (!payload.name || !payload.email || !payload.service || !payload.date || !payload.time) {
    return { success: false, error: "Champs requis manquants pour le rendez-vous." };
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return { success: false, error: "L'adresse email n'est pas valide." };
  }

  if (!isValidBookingSlot(payload.date, payload.time)) {
    return { success: false, error: "Le créneau sélectionné n'est plus disponible." };
  }

  const nowLabel = new Date().toLocaleString("fr-CH");
  const safeEmailHtml = escapeHtml(payload.email);
  const safeNameHtml = escapeHtml(payload.name);
  const safePhoneHtml = payload.phone ? escapeHtml(payload.phone) : "Non fourni";
  const safeServiceHtml = escapeHtml(payload.service);
  const safeDateHtml = escapeHtml(payload.date);
  const safeTimeHtml = escapeHtml(payload.time);
  const safeNotesHtml = payload.notes ? formatMessageHtml(payload.notes) : "—";
  const nowLabelHtml = escapeHtml(nowLabel);
  const firstNameHtml = escapeHtml(payload.name.split(/\s+/)[0] ?? payload.name);

  const adminHtml = `
<html lang="fr" style="background:#020617;">
  <body style="margin:0;padding:0;background:#020617;font-family:-apple-system,BlinkMacSystemFont,system-ui,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:32px 0;">
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" align="center" style="max-width:600px;margin:0 auto;background:#020617;color:#e5e7eb;border-radius:16px;border:1px solid #020617;box-shadow:0 24px 80px rgba(15,23,42,0.9);overflow:hidden;">
            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1f2937;background:radial-gradient(circle at top,rgba(56,189,248,0.18),rgba(2,6,23,0) 55%);">
                <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">KOSMONDE</div>
                <div style="font-size:18px;font-weight:600;color:#f9fafb;">Nouveau rendez-vous à confirmer</div>
                <div style="margin-top:4px;font-size:12px;color:#9ca3af;">Demande reçue depuis la page RDV.</div>
                <div style="margin-top:8px;font-size:11px;color:#d1d5db;">${safeServiceHtml} • ${safeDateHtml} • ${safeTimeHtml}</div>
                <div style="margin-top:8px;font-size:11px;color:#d1d5db;">${safeNameHtml}</div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;border:1px solid #1f2937;background:#020617;">
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Nom</div>
                      <div style="font-size:13px;color:#e5e7eb;font-weight:500;">${safeNameHtml}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Email</div>
                      <div style="font-size:13px;color:#38bdf8;">
                        <a href="mailto:${payload.email}" style="color:#38bdf8;text-decoration:none;">${safeEmailHtml}</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Téléphone</div>
                      <div style="font-size:13px;color:#e5e7eb;font-weight:500;">${safePhoneHtml}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Service</div>
                      <div style="font-size:13px;color:#e5e7eb;">${safeServiceHtml}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Créneau</div>
                      <div style="font-size:13px;color:#e5e7eb;">${safeDateHtml} à ${safeTimeHtml}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Notes</div>
                      <div style="font-size:13px;color:#e5e7eb;line-height:1.6;white-space:pre-line;">
                        ${safeNotesHtml}
                      </div>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:12px;font-size:11px;color:#6b7280;">Reçu le : ${nowLabelHtml}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  const clientHtml = `
<html lang="fr" style="background:#020617;">
  <body style="margin:0;padding:0;background:#020617;font-family:-apple-system,BlinkMacSystemFont,system-ui,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:32px 0;">
      <tr>
        <td>
          <table width="600" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;background:#020617;color:#e5e7eb;border-radius:16px;border:1px solid #020617;box-shadow:0 24px 80px rgba(15,23,42,0.9);overflow:hidden;">

            <tr>
              <td style="font-size:0;line-height:0;display:none;mso-hide:all;color:transparent;max-height:0;max-width:0;opacity:0;overflow:hidden;">
                Votre demande de rendez-vous est bien reçue. Nous revenons vers vous rapidement.
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1f2937;background:radial-gradient(circle at top,rgba(56,189,248,0.18),rgba(2,6,23,0) 55%);">
                <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">KOSMONDE</div>
                <div style="font-size:18px;font-weight:600;color:#f9fafb;">Merci, votre demande est bien reçue</div>
                <div style="margin-top:4px;font-size:12px;color:#9ca3af;">Nous bloquons le créneau 48 h en attente de validation.</div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 18px;">
                <p style="font-size:13px;color:#e5e7eb;margin:0 0 12px;">Bonjour ${firstNameHtml},</p>
                <p style="font-size:13px;color:#d1d5db;margin:0 0 12px;line-height:1.5;">
                  Votre demande de rendez-vous est bien enregistrée. Nous revenons vers vous sous 24 h (hors week-end) avec la confirmation et le lien visio.
                </p>

                <div style="margin-top:16px;margin-bottom:14px;">
                  <div style="font-size:12px;font-weight:600;color:#e5e7eb;margin-bottom:6px;">Récapitulatif</div>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;border:1px solid #1f2937;background:#020617;font-size:12px;color:#d1d5db;">
                    <tr>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;color:#9ca3af;width:40%;">Service</td>
                      <td style="padding:8px 12px;">${safeServiceHtml}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;color:#9ca3af;">Créneau</td>
                      <td style="padding:8px 12px;">${safeDateHtml} à ${safeTimeHtml}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;color:#9ca3af;">Téléphone</td>
                      <td style="padding:8px 12px;">${safePhoneHtml}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 12px;vertical-align:top;color:#9ca3af;">Notes</td>
                      <td style="padding:8px 12px;line-height:1.5;">${safeNotesHtml}</td>
                    </tr>
                  </table>
                </div>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 12px;line-height:1.5;">
                  Vous pourrez modifier ce créneau si besoin. Nous enverrons également l’invitation calendrier (.ics) avec le lien visio.
                </p>

                <p style="font-size:13px;color:#9ca3af;margin:0;line-height:1.6;">
                  À bientôt,<br />
                  Yanis – KOSMONDE
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px 18px;border-top:1px solid #1f2937;font-size:11px;color:#6b7280;">
                Vous développez votre projet, KOSMONDE vous aide à lui donner une présence claire sur le web.
                <a href="https://kosmonde.ch" style="color:#38bdf8;text-decoration:none;">kosmonde.ch</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.CONTACT_EMAIL_TO ?? "contact@kosmonde.ch",
      subject: `Nouveau rendez-vous : ${payload.service} (${payload.date} • ${payload.time})`,
      html: adminHtml,
      replyTo: payload.email,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      subject: `Nous avons bien reçu votre demande de rendez-vous`,
      html: clientHtml,
      replyTo: process.env.CONTACT_EMAIL_TO ?? "contact@kosmonde.ch",
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails de rendez-vous", error);
    return { success: false, error: "Impossible d'envoyer la confirmation pour l’instant." };
  }
}
