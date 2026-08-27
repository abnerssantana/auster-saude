import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { LOCAIS } from "@/lib/locais";

/**
 * Ponte da home para o cluster de páginas locais. A home é a página com mais
 * autoridade do site — o link daqui é o que faz o Google descobrir e ranquear
 * as páginas de captura por cidade.
 */
export function OndeAtendemos() {
  return (
    <section className="bg-cream">
      <div className="px-[5vw] pb-[10vw] md:pb-[5vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-6 rounded-3xl border border-brand-800/10 bg-card/60 px-6 py-10 text-center md:px-12">
          <h2 className="text-[26px] text-brand-800 md:text-[32px]">
            Contabilidade para médicos onde você está
          </h2>
          <p className="max-w-[640px] text-[15px]/relaxed text-brand-800/75 md:text-[16px]/relaxed">
            O atendimento é digital e chega a qualquer cidade do Brasil — de
            Santa Catarina, onde a Auster nasceu, ao interior do país.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {LOCAIS.map((local) => (
              <li key={local.slug}>
                <Link
                  href={`/contabilidade-para-medicos/${local.slug}`}
                  className="flex items-center gap-1.5 rounded-full border border-brand-800/15 bg-cream px-4 py-2 text-sm font-medium text-brand-800/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <MapPin aria-hidden className="size-4 text-primary/70" />
                  {local.nome} – {local.uf}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contabilidade-para-medicos"
            className="group flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-600"
          >
            Veja como funciona a contabilidade para médicos
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
