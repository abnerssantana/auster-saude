import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { sairAction } from "@/app/admin/actions";
import { modoArmazenamento } from "@/lib/blog/armazenamento";
import type { Autor } from "@/lib/blog/config";
import logo from "@/public/images/logo-auster.svg";

export function AdminHeader({ autor }: { autor: Autor }) {
  const local = modoArmazenamento() === "local";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src={logo} alt="Auster Saúde" className="h-7 w-auto" />
            <span className="border-l border-border pl-3 text-sm font-semibold text-brand-800 max-sm:hidden">
              Painel do blog
            </span>
          </Link>
          {local ? (
            // Aviso só fora da Vercel: lembra que nada aqui vai para o site.
            <span className="rounded-full bg-clay/10 px-2.5 py-0.5 text-xs font-medium text-clay">
              Arquivos locais
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-1 text-sm sm:gap-3">
          <span className="text-muted-foreground max-sm:hidden">
            Olá, <strong className="font-semibold text-brand-800">{autor.nome.split(" ")[0]}</strong>
          </span>
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-brand-800/80 transition-colors hover:bg-muted hover:text-brand-800"
          >
            <ExternalLink aria-hidden className="size-4" /> Ver blog
          </Link>
          <form action={sairAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-brand-800/80 transition-colors hover:bg-muted hover:text-brand-800"
            >
              <LogOut aria-hidden className="size-4" /> Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
