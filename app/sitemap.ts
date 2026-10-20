import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";
import { LANDING_UPDATED_AT, LOCAIS } from "@/lib/locais";
import { AUSTER_NEXT_UPDATED_AT } from "@/lib/auster-next";
import { CATEGORIAS } from "@/lib/blog/config";
import { listarPosts } from "@/lib/blog/posts";

/*
 * A home entra como `SITE_URL` sem barra final: é exatamente o que o Next
 * emite no canonical do layout (ele normaliza `alternates.canonical: "/"`
 * resolvido contra o metadataBase e tira a barra). URL do sitemap diferente da
 * canônica faz o Google tratar as duas como candidatas da mesma página.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = CONTENT_UPDATED_AT;

  /*
   * Artigos do blog com a data da última gravação, que é edição de verdade
   * (o painel só a atualiza ao salvar). Salvar no painel revalida este
   * arquivo junto com as páginas.
   */
  const posts = await listarPosts();
  const ultimoPost = posts.reduce(
    (maisRecente, post) =>
      post.atualizadoEm > maisRecente ? post.atualizadoEm : maisRecente,
    "",
  );
  const blog: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: ultimoPost || lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.atualizadoEm,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Categoria vazia sai com noindex, então fica de fora daqui também.
    ...CATEGORIAS.filter((categoria) =>
      posts.some((post) => post.categoria === categoria.slug),
    ).map((categoria) => ({
      url: `${SITE_URL}/blog/categoria/${categoria.slug}`,
      lastModified: ultimoPost,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];

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
    {
      url: `${SITE_URL}/auster-next`,
      lastModified: AUSTER_NEXT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contabilidade-para-medicos`,
      lastModified: LANDING_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...LOCAIS.map((local) => ({
      url: `${SITE_URL}/contabilidade-para-medicos/${local.slug}`,
      lastModified: LANDING_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blog,
  ];
}
