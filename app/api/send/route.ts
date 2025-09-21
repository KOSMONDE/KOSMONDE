import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    const data = await resend.emails.send({
      from: "Kosmonde <contact@kosmonde.fr>", // ⚠️ tu changeras avec ton domaine validé
      to: "contact@kosmonde.fr",
      replyTo: email, // ✅ corrigé ici
      subject: subject || "Nouveau message depuis le site",
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
