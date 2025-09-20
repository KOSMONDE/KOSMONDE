import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    await resend.emails.send({
  from: "Kosmonde <onboarding@resend.dev>", // expéditeur
  to: "contact@kosmonde.fr",                // destinataire
  subject: subject || "Nouveau message depuis le site",
  replyTo: email,                           // ✅ correction ici
  text: `
Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Message :
${message}
  `,
})


    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
