import Link from "next/link";
import { ExternalLink, Eye, Pencil, Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { ExcluirPostButton } from "@/components/admin/excluir-post-button";
import { Button } from "@/components/ui/button";
import { exigirLogin } from "@/lib/blog/auth";
import { autorPorId, categoriaPorSlug } from "@/lib/blog/config";
import { formatarData, listarTodosPosts } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

const acao =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-brand-800/80 transition-colors hover:bg-muted hover:text-brand-800";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ excluido?: string }>;
}) {
  const autor = await exigirLogin();
  const [posts, { excluido }] = await Promise.all([listarTodosPosts(), searchParams]);
  const publicados = posts.filter((post) => post.status === "publicado").length;

  return (
    <>
      <AdminHeader autor={autor} />
      <div className="mx-auto max-w-[1140px] px-5 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[32px] text-brand-800">Artigos</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {publicados} publicado(s) · {posts.length - publicados} rascunho(s)
            </p>
          </div>
          <Button size="xl" nativeButton={false} render={<Link href="/admin/posts/novo" />}>
            <Plus data-icon="inline-start" /> Novo artigo
          </Button>
        </div>

        {excluido ? (
          <p role="status" className="mb-4 rounded-xl bg-mint px-4 py-3 text-sm text-primary">
            Artigo excluído.
          </p>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {posts.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-heading text-[20px] font-semibold text-brand-800">
                Nenhum artigo ainda
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Comece pelo botão “Novo artigo”. Dá para salvar como rascunho e
                publicar depois.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {posts.map((post) => {
                const rascunho = post.status === "rascunho";
                return (
                  <li
                    key={post.slug}
                    className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            rascunho
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary text-primary-foreground",
                          )}
                        >
                          {rascunho ? "Rascunho" : "Publicado"}
                        </span>
                        <Link
                          href={`/admin/posts/${post.slug}`}
                          className="truncate font-semibold text-brand-800 hover:text-primary"
                        >
                          {post.titulo || post.slug}
                        </Link>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatarData(post.data)} ·{" "}
                        {categoriaPorSlug(post.categoria)?.nome ?? "Sem categoria"} ·{" "}
                        {autorPorId(post.autor)?.nome ?? post.autor}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-1">
                      <Link href={`/admin/posts/${post.slug}`} className={acao}>
                        <Pencil aria-hidden className="size-4" /> Editar
                      </Link>
                      {rascunho ? (
                        <Link href={`/admin/posts/${post.slug}/previa`} className={acao}>
                          <Eye aria-hidden className="size-4" /> Prévia
                        </Link>
                      ) : (
                        <Link href={`/blog/${post.slug}`} target="_blank" className={acao}>
                          <ExternalLink aria-hidden className="size-4" /> Ver no site
                        </Link>
                      )}
                      <ExcluirPostButton slug={post.slug} titulo={post.titulo} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
