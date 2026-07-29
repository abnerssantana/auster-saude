import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Indique um colega médico para a Auster e ganhe benefícios";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Indicações",
    title: "Indique um colega e ganhe benefícios",
    description:
      "Leva menos de um minuto: você indica um médico, a gente cuida do resto.",
  });
}
