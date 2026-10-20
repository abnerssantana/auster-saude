import { lerImagem } from "@/lib/blog/armazenamento";

/**
 * Entrega as imagens do blog. O Blob é privado (por causa dos leads), então as
 * imagens não têm URL pública própria: passam por aqui, e o next/image
 * otimiza a partir deste endereço.
 *
 * Fica fora de /api de propósito: o robots.txt bloqueia /api, e o Google
 * Imagens e os previews de link precisam alcançar estas imagens.
 */

const TIPOS: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ arquivo: string }> },
) {
  const { arquivo } = await params;
  // O mesmo formato que o painel gera; barra qualquer outro caminho.
  const extensao = /^[a-z0-9-]+\.([a-z]+)$/.exec(arquivo)?.[1];
  const tipo = extensao ? TIPOS[extensao] : undefined;
  if (!tipo) return new Response("Não encontrado", { status: 404 });

  const corpo = await lerImagem(arquivo);
  if (!corpo) return new Response("Não encontrado", { status: 404 });

  return new Response(corpo, {
    headers: {
      // Tipo pela extensão, não pelo que foi gravado: nunca sai como HTML.
      "Content-Type": tipo,
      "X-Content-Type-Options": "nosniff",
      // O nome leva um carimbo de tempo e nunca é regravado: pode ser imutável,
      // no navegador e no CDN da Vercel (s-maxage).
      "Cache-Control":
        "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
