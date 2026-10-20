"use client";

import { Trash2 } from "lucide-react";
import { excluirPostAction } from "@/app/admin/actions";

export function ExcluirPostButton({ slug, titulo }: { slug: string; titulo: string }) {
  return (
    <form
      action={excluirPostAction}
      onSubmit={(event) => {
        if (
          !confirm(
            `Excluir "${titulo || slug}"? O artigo sai do site e não dá para desfazer.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
      >
        <Trash2 aria-hidden className="size-4" /> Excluir
      </button>
    </form>
  );
}
