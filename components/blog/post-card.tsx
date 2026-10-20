import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Capa } from "@/components/blog/capa";
import { autorPorId, categoriaPorSlug } from "@/lib/blog/config";
import { formatarData, type Post } from "@/lib/blog/posts";

function Meta({ post }: { post: Post }) {
  return (
    <p className="text-[13px] text-muted-foreground">
      <time dateTime={post.data}>{formatarData(post.data)}</time>
      <span aria-hidden> · </span>
      {post.minutosLeitura} min de leitura
    </p>
  );
}

function Eyebrow({ categoria }: { categoria: string }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.14em] text-primary/80 uppercase">
      {categoriaPorSlug(categoria)?.nome ?? "Artigo"}
    </p>
  );
}

/**
 * Card de artigo. O card inteiro é clicável pelo `after:` do link, mas o
 * leitor de tela anuncia só o título — e não o card todo como um link.
 */
export function PostCard({
  post,
  titulo: Titulo = "h2",
}: {
  post: Post;
  /** h3 quando o card vem sob um h2 da página (ex.: "Continue lendo"). */
  titulo?: "h2" | "h3";
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30">
      <Capa
        src={post.capa}
        alt={post.capaAlt}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/9]"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Eyebrow categoria={post.categoria} />
        <Titulo className="text-[21px] text-brand-800 transition-colors group-hover:text-primary">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {post.titulo}
          </Link>
        </Titulo>
        <p className="line-clamp-3 text-[15px]/relaxed text-brand-800/70">
          {post.resumo}
        </p>
        <div className="mt-auto pt-2">
          <Meta post={post} />
        </div>
      </div>
    </article>
  );
}

/** O artigo mais recente, no topo da primeira página do blog. */
export function PostDestaque({ post }: { post: Post }) {
  const autor = autorPorId(post.autor);

  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/30 md:grid-cols-2">
      <Capa
        src={post.capa}
        alt={post.capaAlt}
        sizes="(min-width: 1140px) 570px, (min-width: 768px) 50vw, 100vw"
        priority
        className="aspect-[16/9] md:aspect-auto md:min-h-[360px]"
      />
      <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
        <Eyebrow categoria={post.categoria} />
        <h2 className="text-[26px] text-brand-800 transition-colors group-hover:text-primary md:text-[34px]">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {post.titulo}
          </Link>
        </h2>
        <p className="line-clamp-4 text-[16px]/relaxed text-brand-800/75 md:text-[17px]/relaxed">
          {post.resumo}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div>
            {autor ? (
              <p className="text-sm font-medium text-brand-800">{autor.nome}</p>
            ) : null}
            <Meta post={post} />
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Ler artigo
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
