import { NextResponse } from "next/server";
import { queroSerAusterSchema } from "@/lib/schemas";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendLead } from "@/lib/mailer";

export async function POST(request: Request) {
  if (!rateLimit(clientIp(request)).allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429 },
    );
  }

  const parsed = queroSerAusterSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // honeypot preenchido: responde 200 para o bot não perceber, mas não envia
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { firstName, lastName, cpf, whatsapp, email, address } = parsed.data;

  try {
    await sendLead({
      subject: `Novo cadastro Quero ser Auster — ${firstName} ${lastName}`,
      title: "Novo cadastro: Quero ser Auster",
      replyTo: email,
      fields: [
        { label: "Nome", value: `${firstName} ${lastName}` },
        { label: "CPF", value: cpf },
        { label: "WhatsApp", value: whatsapp },
        { label: "E-mail", value: email },
        { label: "Endereço", value: address },
      ],
    });
  } catch (error) {
    console.error("Falha ao enviar lead Quero ser Auster:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
