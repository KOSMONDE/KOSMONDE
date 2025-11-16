"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "KOSMONDE <contact@kosmonde.ch>";

type SendResult = {
  success: boolean;
  error?: string;
};

export async function sendMessage(formData: FormData): Promise<SendResult> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante dans l'environnement serveur");
    return {
      success: false,
      error:
        "Configuration email manquante. Vérifie la clé RESEND_API_KEY sur le serveur.",
    };
  }

  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const projectType = (formData.get("project-type") ?? "").toString().trim();
  const budget = (formData.get("budget") ?? "").toString().trim();
  const message = (formData.get("message") ?? "").toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: "Champs requis manquants." };
  }

  const safeProjectType = projectType || "Non précisé";
  const safeBudget = budget || "Non précisé";
  const safeMessage = message || "—";
  const safeName = name || "—";
  const nowLabel = new Date().toLocaleString("fr-CH");

  try {
    // HTML — ADMIN
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
                <div style="margin-top:4px;font-size:12px;color:#9ca3af;">Tu as reçu un nouveau message via le formulaire de contact.</div>

                <div style="margin-top:10px;font-size:11px;color:#9ca3af;">
                  <span style="display:inline-block;padding:3px 9px;border-radius:999px;border:1px solid #1f2937;background:rgba(15,23,42,0.9);margin-right:6px;">${safeProjectType}</span>
                  <span style="display:inline-block;padding:3px 9px;border-radius:999px;border:1px solid #1f2937;background:rgba(15,23,42,0.9);margin-right:6px;">${safeBudget}</span>
                  <span style="display:inline-block;padding:3px 9px;border-radius:999px;border:1px dashed #1f2937;color:#6b7280;">${nowLabel}</span>
                </div>

                <div style="margin-top:8px;font-size:11px;color:#d1d5db;">
                  ${safeName} • ${safeProjectType} • ${safeBudget}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;border:1px solid #1f2937;background:#020617;">
                  
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Nom</div>
                      <div style="font-size:13px;color:#e5e7eb;font-weight:500;">${safeName}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Email</div>
                      <div style="font-size:13px;color:#38bdf8;">
                        <a href="mailto:${email}" style="color:#38bdf8;text-decoration:none;">${email}</a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Type de projet</div>
                      <div style="font-size:13px;color:#e5e7eb;">${safeProjectType}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Budget approximatif</div>
                      <div style="font-size:13px;color:#e5e7eb;">${safeBudget}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 16px;">
                      <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Message</div>
                      <div style="font-size:13px;color:#e5e7eb;line-height:1.6;white-space:pre-line;">
                        ${safeMessage.replace(/\n/g, "<br>")}
                      </div>
                    </td>
                  </tr>

                </table>

                <div style="margin-top:12px;font-size:11px;color:#6b7280;">Reçu le : ${nowLabel}</div>
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

    // HTML — CLIENT (amélioré)
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
                Merci pour ton message — je te réponds rapidement avec un premier retour.
              </td>
            </tr>

            <!-- HEADER -->
            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1f2937;background:radial-gradient(circle at top,rgba(56,189,248,0.18),rgba(2,6,23,0) 55%);">
                
                <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">KOSMONDE</div>
                <div style="font-size:18px;font-weight:600;color:#f9fafb;">Merci pour ton message</div>
                <div style="margin-top:4px;font-size:12px;color:#9ca3af;">Ton message est bien arrivé, je vais le lire avec attention.</div>

              </td>
            </tr>

            <!-- CONTENU -->
            <tr>
              <td style="padding:20px 24px 18px;">

                <p style="font-size:13px;color:#e5e7eb;margin:0 0 12px;">
                  ${safeName ? `Salut ${safeName.split(" ")[0]},` : "Salut,"}
                </p>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 12px;line-height:1.5;">
                  Merci d’avoir pris le temps de m’écrire à propos de ton projet web.
                  ${
                    safeProjectType && safeProjectType !== "Non précisé"
                      ? ` Tu m’as indiqué un besoin de type « ${safeProjectType} ».`
                      : ""
                  }
                  ${
                    safeBudget && safeBudget !== "Non précisé"
                      ? ` Ton budget approximatif est d’environ ${safeBudget}.`
                      : ""
                  }
                </p>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 12px;line-height:1.5;">
                  Je vais analyser ton message et ton contexte, puis je te répondrai sous 24&nbsp;heures (hors week-end) avec un premier retour concret.
                </p>

                <!-- Résumé -->
                <div style="margin-top:18px;margin-bottom:14px;">
                  <div style="font-size:12px;font-weight:600;color:#e5e7eb;margin-bottom:6px;">Résumé de ta demande</div>

                  <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;border:1px solid #1f2937;background:#020617;font-size:12px;color:#d1d5db;">
                    
                    <tr>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;color:#9ca3af;width:40%;">Type de projet</td>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;">${safeProjectType}</td>
                    </tr>

                    <tr>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;color:#9ca3af;">Budget approximatif</td>
                      <td style="padding:8px 12px;border-bottom:1px solid #111827;">${safeBudget}</td>
                    </tr>

                    <tr>
                      <td style="padding:8px 12px;vertical-align:top;color:#9ca3af;">Message</td>
                      <td style="padding:8px 12px;line-height:1.5;white-space:pre-line;">${safeMessage.replace(
                        /\n/g,
                        "<br>"
                      )}</td>
                    </tr>

                  </table>
                </div>

                <!-- Prochaines étapes -->
                <div style="margin-top:8px;margin-bottom:16px;">
                  <div style="font-size:12px;font-weight:600;color:#e5e7eb;margin-bottom:4px;">Prochaines étapes</div>
                  <ol style="margin:0;padding-left:18px;font-size:12px;color:#d1d5db;line-height:1.6;">
                    <li>Je lis ton message et clarifie ton besoin.</li>
                    <li>Je te réponds sous 24h (hors week-end) avec un premier retour.</li>
                    <li>Si tout colle, on planifie un court appel pour valider ensemble la suite.</li>
                  </ol>
                </div>

                <p style="font-size:13px;color:#d1d5db;margin:0 0 16px;line-height:1.5;">
                  Si tu veux déjà m’envoyer des exemples de sites que tu aimes, des contraintes ou des idées, tu peux simplement répondre à cet email.
                </p>

                <p style="font-size:13px;color:#9ca3af;margin:0;line-height:1.6;">
                  À très vite,<br />
                  Yanis – KOSMONDE<br />
                  <span style="font-size:12px;color:#9ca3af;">Création de sites web clairs, modernes et efficaces.</span>
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:14px 24px 18px;border-top:1px solid #1f2937;font-size:11px;color:#6b7280;">
                Tu développes ton projet, KOSMONDE t’aide à lui donner une présence claire sur le web.
                <a href="https://kosmonde.ch" style="color:#38bdf8;text-decoration:none;">kosmonde.ch</a><br />
                <span style="display:inline-block;margin-top:4px;color:#4b5563;">
                  Si tu ne t’attendais pas à recevoir cet email, tu peux simplement l’ignorer.
                </span>
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
      subject: `[${safeProjectType}] Nouveau message de ${safeName} – ${safeBudget}`,
      replyTo: email,
      html: adminHtml,
    });

    // ENVOI CLIENT — replyTo FIXÉ SUR iCLOUD
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Merci pour ton message – KOSMONDE",
      replyTo: "mroussadiyanis@icloud.com",   // ← ICI !!!
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
