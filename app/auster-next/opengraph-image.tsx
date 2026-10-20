import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { AUSTER_NEXT } from "@/lib/auster-next";

export const alt = "Auster Next — a plataforma financeira do médico";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Auster Next",
    title: "A plataforma financeira do médico",
    description: AUSTER_NEXT.description,
  });
}
