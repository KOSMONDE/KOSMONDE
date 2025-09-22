import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    console.log("API KEY:", process.env.RESEND_API_KEY ? "✅ Chargée" : "❌ Manquante");

    // 1️⃣ Mail admin
    await resend.emails.send({
      from: `Kosmonde <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: subject || "Nouveau message depuis le site",
      html: `
        <h2>📩 Nouveau message via le site Kosmonde.fr</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    });

    // 2️⃣ Mail visiteur
    await resend.emails.send({
      from: `Kosmonde <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "✅ Nous avons bien reçu votre demande",
      html: `
        <h2>Merci ${name} 🙏</h2>
        <p>Nous avons bien reçu votre demande et nous reviendrons vers vous rapidement.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
