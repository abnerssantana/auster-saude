import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { PostEditor } from "@/components/admin/post-editor";
import { exigirLogin } from "@/lib/blog/auth";
import { hoje } from "@/lib/blog/posts";

export const metadata: Metadata = { title: "Novo artigo" };

export default async function NovoPostPage() {
  const autor = await exigirLogin();

  return (
    <>
      <AdminHeader autor={autor} />
      <PostEditor
        novo
        post={{
          slug: "",
          titulo: "",
          resumo: "",
          data: hoje(),
          atualizadoEm: hoje(),
          categoria: "",
          // Quem cria assina; dá para trocar no editor.
          autor: autor.id,
          capa: "",
          capaAlt: "",
          status: "rascunho",
          corpo: "",
          versao: "",
          minutosLeitura: 0,
        }}
      />
    </>
  );
}
