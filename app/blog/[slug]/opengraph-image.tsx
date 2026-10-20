import { notFound } from "next/navigation";
import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { categoriaPorSlug } from "@/lib/blog/config";
import { buscarPost } from "@/lib/blog/posts";

export const alt = "Artigo do blog da Auster Saúde";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Corta no último espaço antes do limite, para não partir palavra. */
function encurtar(texto: string, limite: number) {
  if (texto.length <= limite) return texto;
  const corte = texto.lastIndexOf(" ", limite);
  return `${texto.slice(0, corte > 0 ? corte : limite)}…`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await buscarPost((await params).slug);
  if (!post) notFound();

  return renderOgImage({
    eyebrow: categoriaPorSlug(post.categoria)?.nome ?? "Blog",
    title: post.titulo,
    // Título longo já ocupa a altura toda; o resumo encolhe para caber.
    description: encurtar(post.resumo, post.titulo.length > 62 ? 90 : 130),
  });
}
