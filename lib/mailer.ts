import { Resend } from "resend";
import { LeadEmail, type LeadField } from "@/emails/lead-email";

type SendLeadArgs = {
  subject: string;
  /** Formulário de origem: vira o selo no topo do e-mail. */
  form: string;
  /** Nome que entra como título — quem preencheu ou quem foi indicado. */
  highlight: string;
  /** Contexto extra sob o título, quando existe. */
  note?: string;
  fields: LeadField[];
  /** Ação principal do e-mail, em botão. */
  action?: { label: string; href: string };
  replyTo?: string;
};

/**
 * Envia o lead por e-mail. As credenciais só são lidas no momento do envio
 * para o build não quebrar quando as variáveis ainda não estão configuradas.
 */
export async function sendLead({
  subject,
  form,
  highlight,
  note,
  fields,
  action,
  replyTo,
}: SendLeadArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error(
      "Configuração de e-mail ausente: defina RESEND_API_KEY, LEAD_TO_EMAIL e LEAD_FROM_EMAIL.",
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((address) => address.trim()),
    replyTo,
    subject,
    react: LeadEmail({
      form,
      highlight,
      note,
      preview: subject,
      fields,
      action,
      receivedAt: new Date(),
    }),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}
