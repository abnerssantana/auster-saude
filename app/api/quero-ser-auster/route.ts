import { NextResponse } from "next/server";
import { queroSerAusterSchema } from "@/lib/schemas";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendLead } from "@/lib/mailer";
import { LEAD_FILES, saveLead } from "@/lib/leads-store";

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

  const fields = [
    { label: "Nome", value: `${firstName} ${lastName}` },
    { label: "CPF", value: cpf },
    { label: "WhatsApp", value: whatsapp },
    { label: "E-mail", value: email },
    { label: "Endereço", value: address },
  ];

  // O CSV é registro, o e-mail é o aviso: rodam juntos e um não derruba o
  // outro. Só a falha do e-mail vira erro para quem preencheu — se o envio
  // falhar, ninguém do time fica sabendo do lead.
  const [stored, sent] = await Promise.allSettled([
    saveLead({ pathname: LEAD_FILES.queroSerAuster, fields }),
    sendLead({
      subject: `Novo cadastro Quero ser Auster — ${firstName} ${lastName}`,
      title: "Novo cadastro: Quero ser Auster",
      replyTo: email,
      fields,
    }),
  ]);

  if (stored.status === "rejected") {
    console.error("Falha ao gravar lead Quero ser Auster no Blob:", stored.reason);
  }

  if (sent.status === "rejected") {
    console.error("Falha ao enviar lead Quero ser Auster:", sent.reason);
    return NextResponse.json(
      { error: "Não foi possível enviar agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
