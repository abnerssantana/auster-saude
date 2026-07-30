import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /*
   * O `build` roda com --webpack de propósito (veja package.json). O Turbopack
   * do Next 16 não decodifica AVIF — ele avisa "does not support AVIF images"
   * durante o build — e, sem conseguir ler o cabeçalho, os imports estáticos
   * .avif perdem a dimensão intrínseca e saem como width=100 height=100. Como
   * quase toda foto do site é AVIF servida com `h-auto w-full`, o navegador
   * reservava uma caixa quadrada e reposicionava tudo quando a imagem chegava:
   * CLS em ~8 imagens. Com o webpack as dimensões reais voltam sozinhas.
   *
   * O `dev` usa a mesma flag: com bundlers diferentes o layout local não bate
   * com o de produção justamente nas imagens, que é o que se está conferindo.
   */
  images: {
    // fotos principais servidas em alta qualidade; 75 é o padrão para o resto
    qualities: [75, 90],

    /*
     * As imagens entram por import estático, então a URL upstream já carrega um
     * hash do conteúdo e é imutável. Sem isto, o /_next/image reotimizaria e
     * reexpiraria tudo a cada 4h (padrão do Next 16) mesmo o arquivo nunca
     * mudando. Um ano é seguro: alterar a imagem gera outro hash e outra URL.
     */
    minimumCacheTTL: 31536000,
  },

  async redirects() {
    return [
      // URLs herdadas do WordPress
      { source: "/home", destination: "/", permanent: true },
      { source: "/indicacoes", destination: "/indicacao", permanent: true },
      { source: "/seja-auster", destination: "/quero-ser-auster", permanent: true },
      // páginas de anexo que o WP gerava para cada mídia
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/:slug(.*-(?:png|jpg|jpeg|svg|webp|avif))", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      /*
       * Por padrão o Next serve /public com `no-store, must-revalidate`, ou
       * seja, sem cache nenhum. Os componentes já consomem essas imagens por
       * import estático (URL com hash, cache imutável), mas os caminhos crus
       * continuam acessíveis — o logo do JSON-LD, por exemplo. Como o nome do
       * arquivo não tem hash, fica em 30 dias em vez de `immutable`.
       */
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      /* Mesmo motivo: sem isto o /llms.txt sai com `no-store`. */
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
