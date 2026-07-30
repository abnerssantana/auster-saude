import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";

/*
 * A home entra como `SITE_URL` sem barra final: é exatamente o que o Next
 * emite no canonical do layout (ele normaliza `alternates.canonical: "/"`
 * resolvido contra o metadataBase e tira a barra). URL do sitemap diferente da
 * canônica faz o Google tratar as duas como candidatas da mesma página.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED_AT;

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/quero-ser-auster`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/indicacao`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
