import { NextResponse } from "next/server";
import { GRADUATION_STATUS_LABEL, queroSerAusterSchema } from "@/lib/schemas";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendLead } from "@/lib/mailer";
import { LEAD_FILES, saveLead } from "@/lib/leads-store";
import { whatsappUrlFor } from "@/lib/site";

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

  const {
    firstName,
    lastName,
    cpf,
    whatsapp,
    email,
    address,
    college,
    graduationStatus,
    graduationYear,
    graduationSemester,
  } = parsed.data;

  const fullName = `${firstName} ${lastName}`;

  /*
   * "2028/1", como se escreve o semestre. Fica vazio para quem já é formado —
   * o e-mail omite linhas sem valor e o CSV mantém a coluna. A situação entra
   * na condição para que um ano enviado fora do fluxo (o schema só o cobra de
   * quem vai se formar) não vire dado gravado.
   */
  const graduation =
    graduationStatus === "a-se-formar" && graduationYear && graduationSemester
      ? `${graduationYear}/${graduationSemester}`
      : "";

  // `href` só é usado no e-mail, para o time abrir a conversa ou responder com
  // um toque; o CSV grava apenas label e value.
  const fields = [
    { label: "Nome", value: fullName },
    { label: "CPF", value: cpf },
    { label: "WhatsApp", value: whatsapp, href: whatsappUrlFor(whatsapp) },
    { label: "E-mail", value: email, href: `mailto:${email}` },
    { label: "Endereço", value: address },
    { label: "Faculdade", value: college },
    { label: "Situação", value: GRADUATION_STATUS_LABEL[graduationStatus] },
    { label: "Formatura", value: graduation },
  ];

  // O CSV é registro, o e-mail é o aviso: rodam juntos e um não derruba o
  // outro. Só a falha do e-mail vira erro para quem preencheu — se o envio
  // falhar, ninguém do time fica sabendo do lead.
  const [stored, sent] = await Promise.allSettled([
    saveLead({ pathname: LEAD_FILES.queroSerAuster, fields }),
    sendLead({
      subject: `Novo cadastro Quero ser Auster — ${fullName}`,
      form: "Quero ser Auster",
      highlight: fullName,
      note: "Aguardando o contato de um consultor.",
      action: { label: "Falar no WhatsApp", href: whatsappUrlFor(whatsapp) },
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
