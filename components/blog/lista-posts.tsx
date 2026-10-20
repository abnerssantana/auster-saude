import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { PostCard, PostDestaque } from "@/components/blog/post-card";
import { CATEGORIAS } from "@/lib/blog/config";
import type { Post } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

/** Cabeçalho das páginas de listagem: /blog, paginação e categorias. */
export function BlogHero({
  badge,
  titulo,
  intro,
}: {
  badge: string;
  titulo: string;
  intro: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* anéis concêntricos — mesma assinatura visual do hero e do CTA final */}
      <div
        aria-hidden
        className="absolute top-[-120px] right-[-160px] -z-10 size-[480px] rounded-full border border-brand-600/10 max-md:hidden"
      />
      <div
        aria-hidden
        className="absolute top-[-60px] right-[-80px] -z-10 size-[340px] rounded-full border border-brand-600/15 max-md:hidden"
      />
      <div
        aria-hidden
        className="absolute top-[-10%] right-[-10%] -z-10 size-[420px] rounded-full bg-mint/70 blur-[110px]"
      />

      <div className="mx-auto max-w-[1140px] px-5 pt-14 pb-10 md:pt-20 md:pb-12">
        <div className="flex max-w-[760px] flex-col items-start gap-5">
          <Badge
            variant="outline"
            className="h-7 gap-1.5 border-primary/25 bg-card/60 px-3 text-[13px] text-primary backdrop-blur"
          >
            <BookOpen aria-hidden />
            {badge}
          </Badge>
          <h1 className="text-[34px] text-brand-800 md:text-[48px]">{titulo}</h1>
          <p className="max-w-[640px] text-[16px]/relaxed text-brand-800/80 md:text-[18px]/relaxed">
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}

const chip =
  "flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors";

/** Filtro por categoria. Só lista as categorias que já têm artigo. */
export function CategoriasNav({
  posts,
  ativa,
}: {
  posts: Post[];
  ativa?: string;
}) {
  const comPosts = CATEGORIAS.filter((categoria) =>
    posts.some((post) => post.categoria === categoria.slug),
  );
  if (comPosts.length < 2) return null;

  const itens = [{ slug: "", nome: "Todos" }, ...comPosts];

  return (
    <nav aria-label="Categorias do blog">
      <ul className="flex flex-wrap gap-2">
        {itens.map((categoria) => {
          const atual = (ativa ?? "") === categoria.slug;
          return (
            <li key={categoria.slug || "todos"}>
              <Link
                href={categoria.slug ? `/blog/categoria/${categoria.slug}` : "/blog"}
                aria-current={atual ? "page" : undefined}
                className={cn(
                  chip,
                  atual
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-brand-800/15 bg-card/70 text-brand-800/85 hover:border-primary/40 hover:text-primary",
                )}
              >
                {categoria.nome}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Paginacao({ pagina, total }: { pagina: number; total: number }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? "/blog" : `/blog/pagina/${n}`);
  const seta = cn(chip, "gap-1 border-brand-800/15 bg-card/70 text-brand-800/85 hover:border-primary/40 hover:text-primary");

  return (
    <nav aria-label="Páginas do blog" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {pagina > 1 ? (
        <Link href={href(pagina - 1)} rel="prev" className={seta}>
          <ChevronLeft aria-hidden className="size-4" /> Anteriores
        </Link>
      ) : null}
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === pagina ? "page" : undefined}
          className={cn(
            chip,
            "size-10 justify-center px-0",
            n === pagina
              ? "border-primary bg-primary text-primary-foreground"
              : "border-brand-800/15 bg-card/70 text-brand-800/85 hover:border-primary/40 hover:text-primary",
          )}
        >
          {n}
        </Link>
      ))}
      {pagina < total ? (
        <Link href={href(pagina + 1)} rel="next" className={seta}>
          Próximos <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : null}
    </nav>
  );
}

function SemArtigos({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-brand-800/20 bg-card/60 px-6 py-14 text-center">
      <p className="max-w-[460px] text-[16px]/relaxed text-brand-800/80">{mensagem}</p>
      <CtaWhatsapp variant="outline" className="bg-card/60">
        Tirar uma dúvida com a equipe
      </CtaWhatsapp>
    </div>
  );
}

/**
 * Grade de artigos. Com `destaque`, o primeiro sai grande em cima (só na
 * primeira página do blog); a paginação aparece quando `total` > 1.
 */
export function ListaPosts({
  posts,
  todos,
  destaque,
  categoriaAtiva,
  pagina = 1,
  totalPaginas = 1,
  vazio,
}: {
  posts: Post[];
  /** Todos os publicados, para montar o filtro de categorias. */
  todos: Post[];
  destaque?: Post;
  categoriaAtiva?: string;
  pagina?: number;
  totalPaginas?: number;
  vazio: string;
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10 px-5 pb-20">
        {destaque ? <PostDestaque post={destaque} /> : null}

        <CategoriasNav posts={todos} ativa={categoriaAtiva} />

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : !destaque ? (
          <SemArtigos mensagem={vazio} />
        ) : null}

        <Paginacao pagina={pagina} total={totalPaginas} />
      </div>
    </section>
  );
}
