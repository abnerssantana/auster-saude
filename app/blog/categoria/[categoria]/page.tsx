import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHero, ListaPosts } from "@/components/blog/lista-posts";
import { CATEGORIAS, categoriaPorSlug } from "@/lib/blog/config";
import { listarPosts } from "@/lib/blog/posts";
import { OPEN_GRAPH_BASE } from "@/lib/site";

type Props = { params: Promise<{ categoria: string }> };

/*
 * Só as categorias de lib/blog/config.ts existem; qualquer outra cai no
 * notFound() da página. De propósito sem `dynamicParams = false`: com ele, a
 * página regenerada pelo revalidatePath saía como 404 em produção.
 */
export function generateStaticParams() {
  return CATEGORIAS.map((categoria) => ({ categoria: categoria.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoria = categoriaPorSlug((await params).categoria);
  if (!categoria) return {};

  const temPosts = (await listarPosts()).some(
    (post) => post.categoria === categoria.slug,
  );
  const url = `/blog/categoria/${categoria.slug}`;

  return {
    title: `${categoria.nome} para médicos — Blog`,
    description: `Artigos da equipe Auster sobre ${categoria.nome.toLowerCase()} para médicos e clínicas.`,
    alternates: { canonical: url },
    openGraph: { ...OPEN_GRAPH_BASE, url },
    // Categoria ainda vazia é página fina: fica fora do índice até ter artigo.
    robots: temPosts ? undefined : { index: false, follow: true },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const categoria = categoriaPorSlug((await params).categoria);
  if (!categoria) notFound();

  const posts = await listarPosts();

  return (
    <>
      <BlogHero
        badge="Blog Auster"
        titulo={categoria.nome}
        intro={`Artigos da equipe Auster sobre ${categoria.nome.toLowerCase()} para médicos e clínicas.`}
      />
      <ListaPosts
        posts={posts.filter((post) => post.categoria === categoria.slug)}
        todos={posts}
        categoriaAtiva={categoria.slug}
        vazio="Ainda não há artigos nesta categoria."
      />
    </>
  );
}
