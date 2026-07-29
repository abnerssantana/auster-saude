import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { HERO } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Contabilidade especializada em médicos`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: HERO.title,
    description:
      "Planejamento tributário, abertura de PJ, credenciamentos e gestão contábil consultiva.",
  });
}
