import { render } from "@react-email/render";
import { LeadEmail } from "@/emails/lead-email";

/** Preview do e-mail em dev (http://localhost:3000/api/_preview-email). Some em produção. */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const html = await render(
    LeadEmail({
      title: "Novo cadastro: Quero ser Auster",
      preview: "Novo cadastro Quero ser Auster — Ana Silva",
      fields: [
        { label: "Nome", value: "Ana Silva" },
        { label: "CPF", value: "529.982.247-25" },
        { label: "WhatsApp", value: "(47) 99611-4584" },
        { label: "E-mail", value: "ana@exemplo.com" },
        { label: "Endereço", value: "Rua das Flores, 100 - Joinville" },
      ],
    }),
  );

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
