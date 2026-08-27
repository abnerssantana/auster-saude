import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion, Home, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { LOCAIS } from "@/lib/locais";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/* Destinos úteis para quem caiu num endereço quebrado. */
const PAGINAS = [
  { label: "Quero ser Auster", href: "/quero-ser-auster" },
  { label: "Indicações", href: "/indicacao" },
  { label: "Contabilidade para médicos", href: "/contabilidade-para-medicos" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Perguntas frequentes", href: "/#faq" },
];

/**
 * 404 do site inteiro: renderiza dentro do root layout (header e footer
 * continuam), tanto para URL inexistente quanto para notFound() das rotas —
 * ex.: cidade fora de lib/locais.ts.
 */
export default function NotFound() {
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

      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-5 py-20 text-center md:py-28">
        <Badge
          variant="outline"
          className="h-7 gap-1.5 border-primary/25 bg-card/60 px-3 text-[13px] text-primary backdrop-blur"
        >
          <FileQuestion aria-hidden />
          Erro 404
        </Badge>

        <p
          aria-hidden
          className="font-heading text-[96px] font-semibold leading-none text-primary/15 md:text-[140px]"
        >
          404
        </p>

        <h1 className="text-[34px] text-brand-800 md:text-[44px]">
          Página não encontrada
        </h1>

        <p className="max-w-[560px] text-[16px]/relaxed text-brand-800/80 md:text-[18px]/relaxed">
          O endereço pode ter mudado ou nunca existiu — acontece nas melhores
          escalas. O que você procura provavelmente está a um clique daqui.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button
            size="xl"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <Home data-icon="inline-start" />
            Voltar para a página inicial
          </Button>
          <CtaWhatsapp variant="outline" className="bg-card/60 backdrop-blur">
            Falar com um consultor
          </CtaWhatsapp>
        </div>

        <nav aria-label="Páginas principais" className="pt-4">
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {PAGINAS.map((pagina) => (
              <li key={pagina.href}>
                <Link
                  href={pagina.href}
                  className="flex items-center rounded-full border border-brand-800/15 bg-card/70 px-4 py-2 text-sm font-medium text-brand-800/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {pagina.label}
                </Link>
              </li>
            ))}
            {LOCAIS.map((local) => (
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
          </ul>
        </nav>
      </div>
    </section>
  );
}
