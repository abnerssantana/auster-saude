import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getLocal } from "@/lib/locais";

export const alt = "Contabilidade para médicos — Auster Saúde";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ cidade: string }>;
}) {
  const { cidade } = await params;
  const local = getLocal(cidade);

  return renderOgImage({
    eyebrow: local ? `${local.nome} – ${local.uf}` : "Contabilidade para médicos",
    title: local?.headline ?? "Contabilidade para médicos",
    description:
      "Diagnóstico gratuito, abertura de PJ e planejamento tributário com atendimento humano pelo WhatsApp.",
  });
}
