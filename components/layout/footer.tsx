import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE_NAME, WHATSAPP_URL } from "@/lib/site";
import { LOCAIS } from "@/lib/locais";
import logoCream from "@/public/images/logo-auster-cream.svg";

export function Footer() {
  return (
    <footer className="section-dark bg-noise relative isolate overflow-hidden">
      <div className="relative z-10 mx-auto flex max-w-[1140px] flex-col items-center gap-8 px-5 py-14 text-center">
        <Image
          src={logoCream}
          alt={SITE_NAME}
          className="h-[49px] w-auto"
        />

        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cream/80 transition-colors hover:text-cream"
              >
                FALE CONOSCO
              </a>
            </li>
          </ul>
        </nav>

        {/*
         * Links do cluster local em todas as páginas: é o caminho de rastreio
         * permanente para as páginas de captura por cidade.
         */}
        <nav aria-label="Contabilidade para médicos por cidade">
          <ul className="flex max-w-[720px] flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <li>
              <Link
                href="/contabilidade-para-medicos"
                className="text-xs font-medium text-cream/70 transition-colors hover:text-cream"
              >
                Contabilidade para médicos
              </Link>
            </li>
            {LOCAIS.map((local) => (
              <li key={local.slug}>
                <Link
                  href={`/contabilidade-para-medicos/${local.slug}`}
                  className="text-xs text-cream/55 transition-colors hover:text-cream"
                >
                  {local.nome} – {local.uf}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-cream/60">
          © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
