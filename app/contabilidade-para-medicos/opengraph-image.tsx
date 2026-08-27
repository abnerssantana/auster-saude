import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { HUB } from "@/lib/locais";

export const alt = "Contabilidade para médicos — Auster Saúde";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contabilidade para médicos",
    title: "Do primeiro plantão à clínica própria",
    description: HUB.descricao,
  });
}
