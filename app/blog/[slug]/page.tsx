import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artigo } from "@/components/blog/artigo";
import { PostCard } from "@/components/blog/post-card";
import { CtaFinal } from "@/components/home/cta-final";
import { autorPorId, categoriaPorSlug } from "@/lib/blog/config";
import { renderizarMdx } from "@/lib/blog/mdx";
import { buscarPost, listarPosts, type Post } from "@/lib/blog/posts";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/*
 * Os artigos do build saem estáticos; um artigo novo é gerado na primeira
 * visita e fica em cache. Salvar ou excluir no painel chama revalidatePath,
 * que joga fora a versão antiga.
 */
export async function generateStaticParams() {
  return (await listarPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await buscarPost((await params).slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  const autor = autorPorId(post.autor);

  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: url },
    authors: autor ? [{ name: autor.nome }] : undefined,
    // A imagem de Open Graph vem de ./opengraph-image.tsx.
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: "article",
      url,
      publishedTime: post.data,
      modifiedTime: post.atualizadoEm,
      authors: autor ? [autor.nome] : undefined,
      section: categoriaPorSlug(post.categoria)?.nome,
    },
  };
}

/** Até três da mesma categoria; se faltar, completa com os mais recentes. */
function relacionados(post: Post, todos: Post[]) {
  const outros = todos.filter((outro) => outro.slug !== post.slug);
  const mesmaCategoria = outros.filter((outro) => outro.categoria === post.categoria);
  const resto = outros.filter((outro) => outro.categoria !== post.categoria);
  return [...mesmaCategoria, ...resto].slice(0, 3);
}

export default async function PostPage({ params }: Props) {
  const post = await buscarPost((await params).slug);
  if (!post) notFound();

  const [conteudo, todos] = await Promise.all([
    renderizarMdx(post.corpo),
    listarPosts(),
  ]);
  const leiaTambem = relacionados(post, todos);

  const url = `${SITE_URL}/blog/${post.slug}`;
  const autor = autorPorId(post.autor);
  const categoria = categoriaPorSlug(post.categoria);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.titulo,
      description: post.resumo,
      url,
      mainEntityOfPage: url,
      inLanguage: "pt-BR",
      datePublished: post.data,
      dateModified: post.atualizadoEm,
      image: post.capa
        ? new URL(post.capa, SITE_URL).toString()
        : `${url}/opengraph-image`,
      articleSection: categoria?.nome,
      wordCount: post.corpo.split(/\s+/).filter(Boolean).length,
      author: autor
        ? { "@type": "Person", name: autor.nome, jobTitle: autor.cargo }
        : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-auster.svg` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        ...(categoria
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: categoria.nome,
                item: `${SITE_URL}/blog/categoria/${categoria.slug}`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: categoria ? 4 : 3,
          name: post.titulo,
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <Artigo post={post} conteudo={conteudo} />

      {leiaTambem.length > 0 ? (
        <section className="border-t border-border bg-[#f4f4e6]">
          <div className="mx-auto max-w-[1140px] px-5 py-16">
            <h2 className="mb-8 text-[28px] text-brand-800 md:text-[34px]">
              Continue lendo
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leiaTambem.map((outro) => (
                <PostCard key={outro.slug} post={outro} titulo="h3" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaFinal />

      <script
        type="application/ld+json"
        // título e resumo vêm do painel: `<` vira < para que um
        // "</script>" digitado neles não feche a tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
