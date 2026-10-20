import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { PostEditor } from "@/components/admin/post-editor";
import { exigirLogin } from "@/lib/blog/auth";
import { buscarPostQualquerStatus } from "@/lib/blog/posts";

export const metadata: Metadata = { title: "Editar artigo" };

export default async function EditarPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ criado?: string }>;
}) {
  const autor = await exigirLogin();
  const [{ slug }, { criado }] = await Promise.all([params, searchParams]);

  const post = await buscarPostQualquerStatus(slug);
  if (!post) notFound();

  return (
    <>
      <AdminHeader autor={autor} />
      {/* key: trocar de artigo remonta o editor com o conteúdo novo */}
      <PostEditor key={post.slug} post={post} criado={criado === "1"} />
    </>
  );
}
