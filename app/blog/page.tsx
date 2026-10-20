import type { Metadata } from "next";
import { BlogHero, ListaPosts } from "@/components/blog/lista-posts";
import { BLOG, POSTS_POR_PAGINA } from "@/lib/blog/config";
import { listarPosts } from "@/lib/blog/posts";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: BLOG.titulo,
  description: BLOG.descricao,
  alternates: { canonical: "/blog" },
  openGraph: { ...OPEN_GRAPH_BASE, url: "/blog" },
};

/*
 * Estática: gerada no build e de novo a cada artigo salvo no painel, que chama
 * revalidatePath. Ninguém espera o Blob ao abrir a página.
 */
export default async function BlogPage() {
  const posts = await listarPosts();
  const [destaque, ...demais] = posts;
  const totalPaginas = Math.max(1, Math.ceil(demais.length / POSTS_POR_PAGINA));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog da ${SITE_NAME}`,
    description: BLOG.descricao,
    url: `${SITE_URL}/blog`,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <BlogHero badge="Blog Auster" titulo={BLOG.headline} intro={BLOG.intro} />
      <ListaPosts
        posts={demais.slice(0, POSTS_POR_PAGINA)}
        todos={posts}
        destaque={destaque}
        totalPaginas={totalPaginas}
        vazio="Os primeiros artigos estão a caminho. Enquanto isso, a equipe responde suas dúvidas sobre impostos e PJ pelo WhatsApp."
      />

      <script
        type="application/ld+json"
        // conteúdo controlado por nós
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
