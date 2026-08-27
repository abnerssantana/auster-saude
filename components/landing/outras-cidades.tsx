import Link from "next/link";
import { MapPin } from "lucide-react";
import { LOCAIS } from "@/lib/locais";

/**
 * Malha de links entre as páginas locais (hub and spoke): toda página aponta
 * para as irmãs e para o hub, então nenhuma fica órfã para o crawler.
 */
export function OutrasCidades({ atualSlug }: { atualSlug?: string }) {
  const outras = LOCAIS.filter((local) => local.slug !== atualSlug);

  return (
    <section className="bg-cream">
      <div className="px-[5vw] py-[8vw] md:py-[4vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-6 text-center">
          <h2 className="text-[24px] text-brand-800 md:text-[30px]">
            Contabilidade para médicos onde você está
          </h2>
          <p className="max-w-[640px] text-[15px]/relaxed text-brand-800/75">
            O atendimento da Auster é digital e chega a qualquer cidade do
            Brasil. Estas são algumas das praças onde nossos médicos estão:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {outras.map((local) => (
              <li key={local.slug}>
                <Link
                  href={`/contabilidade-para-medicos/${local.slug}`}
                  className="flex items-center gap-1.5 rounded-full border border-brand-800/15 bg-card/70 px-4 py-2 text-sm font-medium text-brand-800/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <MapPin aria-hidden className="size-4 text-primary/70" />
                  {local.nome} – {local.uf}
                </Link>
              </li>
            ))}
            {atualSlug ? (
              <li>
                <Link
                  href="/contabilidade-para-medicos"
                  className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-secondary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/60"
                >
                  Todas as cidades
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
