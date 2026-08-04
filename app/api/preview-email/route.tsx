import { render } from "@react-email/render";
import { LeadEmail, type LeadField } from "@/emails/lead-email";
import { SITE_URL, whatsappUrlFor } from "@/lib/site";

/**
 * Preview do e-mail em dev. Some em produção.
 *
 *   http://localhost:3000/api/preview-email
 *   http://localhost:3000/api/preview-email?form=indicacao
 */

type Sample = {
  form: string;
  highlight: string;
  note: string;
  preview: string;
  action: { label: string; href: string };
  fields: LeadField[];
};

const SAMPLES: Record<string, Sample> = {
  "quero-ser-auster": {
    form: "Quero ser Auster",
    highlight: "Ana Silva",
    note: "Aguardando o contato de um consultor.",
    preview: "Novo cadastro Quero ser Auster — Ana Silva",
    action: {
      label: "Falar no WhatsApp",
      href: whatsappUrlFor("(47) 99611-4584"),
    },
    fields: [
      { label: "Nome", value: "Ana Silva" },
      { label: "CPF", value: "529.982.247-25" },
      {
        label: "WhatsApp",
        value: "(47) 99611-4584",
        href: whatsappUrlFor("(47) 99611-4584"),
      },
      {
        label: "E-mail",
        value: "ana@exemplo.com",
        href: "mailto:ana@exemplo.com",
      },
      {
        label: "Endereço",
        value: "Rua das Flores, 100 — Centro, Joinville/SC",
      },
      { label: "Faculdade", value: "Univille" },
      { label: "Situação", value: "A se formar" },
      { label: "Formatura", value: "2028/2" },
    ],
  },
  indicacao: {
    form: "Indicação",
    highlight: "Dr. João Souza",
    note: "Indicado por Ana Silva.",
    preview: "Nova indicação — Dr. João Souza (por Ana Silva)",
    action: {
      label: "Falar no WhatsApp",
      href: whatsappUrlFor("(47) 98812-3344"),
    },
    fields: [
      { label: "Nome do cliente", value: "Ana Silva" },
      { label: "Nome do colega", value: "Dr. João Souza" },
      {
        label: "WhatsApp do colega",
        value: "(47) 98812-3344",
        href: whatsappUrlFor("(47) 98812-3344"),
      },
    ],
  },
};

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const sample = SAMPLES[url.searchParams.get("form") ?? ""] ?? SAMPLES["quero-ser-auster"];

  /*
   * O logo do e-mail aponta para o domínio de produção — e é de lá que ele sai
   * quando o e-mail é enviado. No preview isso deixaria a faixa sem imagem
   * (o arquivo local ainda não está publicado), então aqui o host vira o desta
   * requisição.
   */
  const html = (
    await render(LeadEmail({ ...sample, receivedAt: new Date() }))
  ).replaceAll(SITE_URL, url.origin);

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
