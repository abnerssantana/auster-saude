import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Quero ser Auster — comece sua migração contábil";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Quero ser Auster",
    title: "Seja Auster",
    description:
      "Preencha seus dados e um consultor entra em contato para começar sua migração — sem burocracia e com atendimento humano.",
  });
}
