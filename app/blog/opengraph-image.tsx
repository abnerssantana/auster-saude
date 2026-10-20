import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { BLOG } from "@/lib/blog/config";

export const alt = "Blog da Auster Saúde";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Impostos, PJ e carreira médica",
    description: BLOG.descricao,
  });
}
