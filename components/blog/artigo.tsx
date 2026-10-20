import Link from "next/link";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { Capa } from "@/components/blog/capa";
import { Compartilhar } from "@/components/blog/compartilhar";
import { autorPorId, categoriaPorSlug } from "@/lib/blog/config";
import { formatarData, type Post } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site";

function Iniciais({ nome, grande }: { nome: string; grande?: boolean }) {
  const iniciais = nome
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={
        grande
          ? "flex size-14 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[20px] font-semibold text-primary-foreground"
          : "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[15px] font-semibold text-primary-foreground"
      }
    >
      {iniciais}
    </span>
  );
}

/**
 * O artigo aberto: cabeçalho, capa, texto, compartilhamento e assinatura.
 * Usado pela página pública e pela prévia do painel, que mostra rascunhos.
 */
export function Artigo({
  post,
  conteudo,
}: {
  post: Post;
  conteudo: React.ReactNode;
}) {
  const autor = autorPorId(post.autor);
  const categoria = categoriaPorSlug(post.categoria);
  const atualizado = post.atualizadoEm > post.data;

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-cream">
        {/* anéis concêntricos — mesma assinatura visual do hero e do CTA final */}
        <div
          aria-hidden
          className="absolute top-[-120px] right-[-160px] -z-10 size-[480px] rounded-full border border-brand-600/10 max-md:hidden"
        />
        <div
          aria-hidden
          className="absolute top-[-10%] right-[-10%] -z-10 size-[420px] rounded-full bg-mint/70 blur-[110px]"
        />

        <div className="mx-auto max-w-[820px] px-5 pt-10 pb-10 md:pt-14 md:pb-12">
          <nav aria-label="Você está em">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              {categoria ? (
                <li className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden className="size-3.5" />
                  <Link
                    href={`/blog/categoria/${categoria.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {categoria.nome}
                  </Link>
                </li>
              ) : null}
            </ol>
          </nav>

          <h1 className="mt-5 text-[34px] text-brand-800 md:text-[48px]">
            {post.titulo}
          </h1>

          {post.resumo ? (
            <p className="mt-5 text-[18px]/relaxed text-brand-800/80 md:text-[20px]/relaxed">
              {post.resumo}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted-foreground">
            {autor ? (
              <div className="flex items-center gap-3">
                <Iniciais nome={autor.nome} />
                <div className="leading-tight">
                  <p className="font-semibold text-brand-800">{autor.nome}</p>
                  <p>{autor.cargo}</p>
                </div>
              </div>
            ) : null}
            <p className="flex items-center gap-1.5">
              <CalendarDays aria-hidden className="size-4" />
              <time dateTime={post.data}>{formatarData(post.data)}</time>
            </p>
            <p className="flex items-center gap-1.5">
              <Clock aria-hidden className="size-4" />
              {post.minutosLeitura} min de leitura
            </p>
          </div>
        </div>
      </header>

      {post.capa ? (
        <div className="bg-cream">
          <Capa
            src={post.capa}
            alt={post.capaAlt}
            sizes="(min-width: 1000px) 960px, 100vw"
            priority
            className="mx-auto aspect-[16/9] max-w-[960px] md:rounded-3xl"
          />
        </div>
      ) : null}

      <div className="bg-cream">
        <div className="mx-auto max-w-[720px] px-5 pt-6 pb-16 md:pt-10">
          {conteudo}

          {atualizado ? (
            <p className="mt-10 text-sm text-muted-foreground">
              Atualizado em{" "}
              <time dateTime={post.atualizadoEm}>
                {formatarData(post.atualizadoEm)}
              </time>
              .
            </p>
          ) : null}

          <div className="mt-10 border-t border-border pt-8">
            <Compartilhar titulo={post.titulo} url={`${SITE_URL}/blog/${post.slug}`} />
          </div>

          {autor ? (
            <aside
              aria-label="Sobre quem escreveu"
              className="mt-10 flex gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <Iniciais nome={autor.nome} grande />
              <div>
                <p className="text-[12px] font-bold tracking-[0.14em] text-primary/80 uppercase">
                  Escrito por
                </p>
                <p className="mt-1 font-heading text-[20px] font-semibold text-brand-800">
                  {autor.nome}
                </p>
                <p className="text-sm text-muted-foreground">{autor.cargo}</p>
                {autor.bio ? (
                  <p className="mt-3 text-[15px]/relaxed text-brand-800/80">
                    {autor.bio}
                  </p>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </article>
  );
}
