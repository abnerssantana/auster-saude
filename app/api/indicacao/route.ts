import { NextResponse } from "next/server";
import { indicacaoSchema } from "@/lib/schemas";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendLead } from "@/lib/mailer";

export async function POST(request: Request) {
  if (!rateLimit(clientIp(request)).allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429 },
    );
  }

  const parsed = indicacaoSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { clientName, colleagueName, colleaguePhone } = parsed.data;

  try {
    await sendLead({
      subject: `Nova indicação — ${colleagueName} (por ${clientName})`,
      title: "Nova indicação de colega",
      fields: [
        { label: "Nome do cliente", value: clientName },
        { label: "Nome do colega", value: colleagueName },
        { label: "WhatsApp do colega", value: colleaguePhone },
      ],
    });
  } catch (error) {
    console.error("Falha ao enviar indicação:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
