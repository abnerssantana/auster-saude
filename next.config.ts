import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // fotos principais servidas em alta qualidade; 75 é o padrão para o resto
    qualities: [75, 90],
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
    ];
  },
};

export default nextConfig;
