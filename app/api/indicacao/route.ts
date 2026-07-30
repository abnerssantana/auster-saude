import { NextResponse } from "next/server";
import { indicacaoSchema } from "@/lib/schemas";
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

  // `href` só é usado no e-mail; o CSV grava apenas label e value.
  const fields = [
    { label: "Nome do cliente", value: clientName },
    { label: "Nome do colega", value: colleagueName },
    {
      label: "WhatsApp do colega",
      value: colleaguePhone,
      href: whatsappUrlFor(colleaguePhone),
    },
  ];

  // Ver a nota em app/api/quero-ser-auster/route.ts.
  const [stored, sent] = await Promise.allSettled([
    saveLead({ pathname: LEAD_FILES.indicacao, fields }),
    sendLead({
      subject: `Nova indicação — ${colleagueName} (por ${clientName})`,
      form: "Indicação",
      highlight: colleagueName,
      note: `Indicado por ${clientName}.`,
      action: {
        label: "Falar no WhatsApp",
        href: whatsappUrlFor(colleaguePhone),
      },
      fields,
    }),
  ]);

  if (stored.status === "rejected") {
    console.error("Falha ao gravar indicação no Blob:", stored.reason);
  }

  if (sent.status === "rejected") {
    console.error("Falha ao enviar indicação:", sent.reason);
    return NextResponse.json(
      { error: "Não foi possível enviar agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
