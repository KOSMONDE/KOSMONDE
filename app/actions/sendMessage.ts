"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("project-type") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Champs requis manquants." };
  }

  try {
    await resend.emails.send({
      from: "KOSMONDE <contact@kosmonde.ch>",
      to: "mroussadiyanis@icloud.com",
      subject: `Nouveau message de ${name}`,
      replyTo: email, // 👈 ici
      html: `
        <div>
          <h2>Nouveau message depuis le site KOSMONDE</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Type de projet :</strong> ${projectType}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Erreur Resend", err);
    return { success: false, error: "Échec de l’envoi du message." };
  }
}
