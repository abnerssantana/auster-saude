import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogHero, ListaPosts } from "@/components/blog/lista-posts";
import { BLOG, POSTS_POR_PAGINA } from "@/lib/blog/config";
import { listarPosts, type Post } from "@/lib/blog/posts";
import { OPEN_GRAPH_BASE } from "@/lib/site";

type Props = { params: Promise<{ pagina: string }> };

/** O primeiro artigo fica em destaque na /blog; a paginação conta a partir do segundo. */
function paginar(posts: Post[]) {
  const demais = posts.slice(1);
  const total = Math.max(1, Math.ceil(demais.length / POSTS_POR_PAGINA));
  return { demais, total };
}

export async function generateStaticParams() {
  const { total } = paginar(await listarPosts());
  return Array.from({ length: total - 1 }, (_, i) => ({ pagina: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pagina } = await params;
  return {
    title: `${BLOG.titulo} — página ${pagina}`,
    description: BLOG.descricao,
    alternates: { canonical: `/blog/pagina/${pagina}` },
    openGraph: { ...OPEN_GRAPH_BASE, url: `/blog/pagina/${pagina}` },
  };
}

export default async function BlogPaginaPage({ params }: Props) {
  const { pagina } = await params;
  const numero = /^\d+$/.test(pagina) ? Number(pagina) : NaN;

  // A página 1 é a própria /blog: um endereço só para o mesmo conteúdo.
  if (numero === 1) permanentRedirect("/blog");

  const posts = await listarPosts();
  const { demais, total } = paginar(posts);
  if (!(numero >= 2 && numero <= total)) notFound();

  const inicio = (numero - 1) * POSTS_POR_PAGINA;

  return (
    <>
      <BlogHero
        badge={`Blog Auster · página ${numero}`}
        titulo={BLOG.headline}
        intro={BLOG.intro}
      />
      <ListaPosts
        posts={demais.slice(inicio, inicio + POSTS_POR_PAGINA)}
        todos={posts}
        pagina={numero}
        totalPaginas={total}
        vazio="Nenhum artigo nesta página."
      />
    </>
  );
}
