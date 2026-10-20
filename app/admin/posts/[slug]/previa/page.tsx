import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { Artigo } from "@/components/blog/artigo";
import { exigirLogin } from "@/lib/blog/auth";
import { renderizarMdx } from "@/lib/blog/mdx";
import { buscarPostQualquerStatus } from "@/lib/blog/posts";

export const metadata: Metadata = { title: "Prévia" };

/** O artigo como vai aparecer no site, inclusive rascunho. Só para quem está logado. */
export default async function PreviaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await exigirLogin();
  const post = await buscarPostQualquerStatus((await params).slug);
  if (!post) notFound();

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-clay/20 bg-[#fbf1ea]">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-2 px-5 py-2.5 text-sm text-clay">
          <p className="flex items-center gap-2 font-medium">
            <Eye aria-hidden className="size-4" />
            Prévia da versão salva
            {post.status === "rascunho" ? " — rascunho, ainda fora do site" : ""}
          </p>
          <Link
            href={`/admin/posts/${post.slug}`}
            className="inline-flex items-center gap-1.5 font-semibold hover:underline"
          >
            <ArrowLeft aria-hidden className="size-4" /> Voltar ao editor
          </Link>
        </div>
      </div>
      <Artigo post={post} conteudo={await renderizarMdx(post.corpo)} />
    </>
  );
}
