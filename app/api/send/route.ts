import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 🔎 Debug: log des variables d'environnement
    console.log("API KEY:", process.env.RESEND_API_KEY ? "✅ Chargée" : "❌ Manquante");
    console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("EMAIL_TO:", process.env.EMAIL_TO);

    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // 1️⃣ Email envoyé à TOI (admin)
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Kosmonde <contact@kosmonde.fr>",
      to: process.env.EMAIL_TO || "contact@kosmonde.fr",
      replyTo: email,
      subject: subject || "Nouveau message depuis le site",
      html: `
        <h2>📩 Nouveau message via le site Kosmonde.fr</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong><br/>${message}</p>
        <hr/>
        <p style="font-size:12px;color:#666">Cet email a été généré automatiquement par le site kosmonde.fr</p>
      `,
    });

    // 2️⃣ Email de confirmation pour le VISITEUR
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Kosmonde <contact@kosmonde.fr>",
      to: email,
      subject: "✅ Nous avons bien reçu votre demande",
      html: `
        <h2>Merci ${name} 🙏</h2>
        <p>Nous avons bien reçu votre demande et nous reviendrons vers vous rapidement.</p>
        
        <p><strong>Résumé de votre message :</strong></p>
        <ul>
          <li><strong>Sujet :</strong> ${subject}</li>
          <li><strong>Message :</strong> ${message}</li>
        </ul>

        <p>📧 Si besoin, vous pouvez répondre directement à cet email.</p>
        <br/>
        <p>— L'équipe <strong>Kosmonde</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
