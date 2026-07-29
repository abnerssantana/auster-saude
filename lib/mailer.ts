import { Resend } from "resend";
import { LeadEmail } from "@/emails/lead-email";

type SendLeadArgs = {
  subject: string;
  title: string;
  fields: Array<{ label: string; value: string }>;
  replyTo?: string;
};

/**
 * Envia o lead por e-mail. As credenciais só são lidas no momento do envio
 * para o build não quebrar quando as variáveis ainda não estão configuradas.
 */
export async function sendLead({
  subject,
  title,
  fields,
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
    react: LeadEmail({ title, preview: subject, fields }),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}
