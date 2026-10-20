import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AusterNextHero } from "@/components/auster-next/hero";
import { BotaoApp } from "@/components/auster-next/botao-app";
import { Cabecalho, Detalhes } from "@/components/auster-next/modulo";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { FaqSection } from "@/components/landing/faq-section";
import {
  AGENDA,
  AUSTER_NEXT,
  CELULAR,
  CHAMADA_FINAL,
  CONTABILIDADE,
  DOCUMENTOS,
  FAQ_AUSTER_NEXT,
  FINANCEIRO,
  OPEN_FINANCE,
  POR_DENTRO,
} from "@/lib/auster-next";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Auster Next: a plataforma financeira do médico",
  description: AUSTER_NEXT.description,
  alternates: { canonical: "/auster-next" },
  openGraph: { ...OPEN_GRAPH_BASE, url: "/auster-next" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Auster Next",
      item: `${SITE_URL}/auster-next`,
    },
  ],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Auster Next",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web, iOS, Android",
  description: AUSTER_NEXT.description,
  url: "https://austernext.com.br",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

/* Contêiner das seções, na mesma régua da home. */
const SECAO = "px-[5vw] py-[10vw] md:py-[6vw]";
const MIOLO = "mx-auto flex max-w-[1140px] flex-col gap-12 md:gap-14";
/*
 * As telas da web têm 1100px de interface: espremidas na largura do celular,
 * nada se lê. Abaixo de `sm` elas saem maiores e sangram pela borda direita
 * (a seção corta), mostrando a barra lateral e o começo do conteúdo.
 */
const TELA_WEB = "h-auto w-[165%] max-w-none sm:w-full sm:max-w-full";
const LARGURA_TELA = "(min-width: 1220px) 1140px, (min-width: 640px) 92vw, 165vw";

/*
 * O app parte por parte, para quem saiu da vitrine da home querendo saber
 * mais. Mesma sequência do /plataforma do austernext.com.br, sem a parte de
 * pacientes (que a landing de lá também deixa fora da vitrine), e com a
 * contabilidade puxando para o WhatsApp: é o que a Auster vende aqui.
 */
export default function AusterNextPage() {
  return (
    <>
      <AusterNextHero heading="h1" campaign="pagina" moreHref="#por-dentro" />

      {/* Por dentro: a área logada, na faixa escura. */}
      <section
        id="por-dentro"
        className="section-dark bg-noise relative isolate scroll-mt-24 overflow-hidden"
      >
        <div className={`relative z-10 ${SECAO}`}>
          <div className={MIOLO}>
            <Cabecalho dark {...POR_DENTRO} />
            <Image
              src={POR_DENTRO.image.src}
              alt={POR_DENTRO.image.alt}
              quality={90}
              sizes={LARGURA_TELA}
              className={TELA_WEB}
              data-reveal="up"
            />
            <Detalhes dark items={POR_DENTRO.details} className="lg:grid-cols-4" />
          </div>
        </div>
      </section>

      <section id="financeiro" className={`scroll-mt-24 overflow-hidden bg-cream ${SECAO}`}>
        <div className={MIOLO}>
          <Cabecalho {...FINANCEIRO} />
          <Image
            src={FINANCEIRO.image.src}
            alt={FINANCEIRO.image.alt}
            quality={90}
            sizes={LARGURA_TELA}
            className={TELA_WEB}
            data-reveal="up"
          />
          <Detalhes items={FINANCEIRO.details} />
        </div>
      </section>

      <section id="open-finance" className={`scroll-mt-24 bg-[#f4f4e6] ${SECAO}`}>
        <div className="mx-auto grid max-w-[1140px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-10">
            <Cabecalho {...OPEN_FINANCE} />
            <ol className="flex flex-col gap-6">
              {OPEN_FINANCE.steps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal="up"
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-1"
                >
                  <span className="row-span-2 font-heading text-[26px] leading-none font-semibold text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-[16px] font-semibold tracking-tight text-brand-800">
                    {step.title}
                  </h3>
                  <p className="text-[14px]/relaxed text-brand-800/70">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="flex items-start gap-2 text-[14px] font-medium text-brand-800">
              <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
              {OPEN_FINANCE.note}
            </p>
          </div>
          <Image
            src={OPEN_FINANCE.image.src}
            alt={OPEN_FINANCE.image.alt}
            quality={90}
            sizes="(min-width: 1024px) 520px, 92vw"
            className="mx-auto h-auto w-full max-w-[520px]"
            data-reveal="right"
          />
        </div>
      </section>

      <section id="agenda" className={`scroll-mt-24 bg-cream ${SECAO}`}>
        <div className={MIOLO}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Cabecalho {...AGENDA} className="lg:order-2" />
            <Image
              src={AGENDA.image.src}
              alt={AGENDA.image.alt}
              quality={90}
              sizes="(min-width: 1024px) 480px, 90vw"
              className="mx-auto h-auto w-full max-w-[480px] lg:order-1"
              data-reveal="left"
            />
          </div>
          <Detalhes items={AGENDA.details} className="lg:grid-cols-4" />
        </div>
      </section>

      <section id="documentos" className={`scroll-mt-24 bg-[#f4f4e6] ${SECAO}`}>
        <div className={MIOLO}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Cabecalho {...DOCUMENTOS} />
            <Image
              src={DOCUMENTOS.image.src}
              alt={DOCUMENTOS.image.alt}
              quality={90}
              sizes="(min-width: 1024px) 520px, 92vw"
              className="mx-auto h-auto w-full max-w-[520px]"
              data-reveal="right"
            />
          </div>
          <Detalhes items={DOCUMENTOS.details} />
        </div>
      </section>

      {/* Contabilidade: o elo com a Auster, na faixa escura e com o WhatsApp. */}
      <section
        id="contabilidade"
        className="section-dark bg-noise relative isolate scroll-mt-24 overflow-hidden"
      >
        <div className={`relative z-10 ${SECAO}`}>
          <div className={MIOLO}>
            <Cabecalho dark {...CONTABILIDADE} />
            <Image
              src={CONTABILIDADE.image.src}
              alt={CONTABILIDADE.image.alt}
              quality={90}
              sizes={LARGURA_TELA}
              className={TELA_WEB}
              data-reveal="up"
            />
            <Detalhes dark items={CONTABILIDADE.details} />
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CtaWhatsapp variant="secondary" withArrow>
                {CONTABILIDADE.cta}
              </CtaWhatsapp>
              <BotaoApp
                path="/planos"
                campaign="pagina"
                variant="ghost"
                className="text-cream hover:bg-cream/10 hover:text-cream"
              >
                Ver o plano Médico + Contabilidade
                <ArrowRight data-icon="inline-end" />
              </BotaoApp>
            </div>
          </div>
        </div>
      </section>

      <section id="celular" className={`scroll-mt-24 overflow-hidden bg-cream ${SECAO}`}>
        <div className="mx-auto grid max-w-[1140px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-10">
            <Cabecalho {...CELULAR}>
              <BotaoApp path="/downloads" campaign="pagina" className="mt-2 w-fit">
                {CELULAR.cta}
                <ArrowRight data-icon="inline-end" />
              </BotaoApp>
            </Cabecalho>
            <Detalhes items={CELULAR.details} className="lg:grid-cols-1" />
          </div>
          <Image
            src={CELULAR.image.src}
            alt={CELULAR.image.alt}
            quality={90}
            sizes="(min-width: 1024px) 480px, 90vw"
            className="mx-auto h-auto w-full max-w-[480px]"
            data-reveal="right"
          />
        </div>
      </section>

      <FaqSection title="Perguntas sobre o Auster Next" items={FAQ_AUSTER_NEXT} />

      {/* Chamada final: o painel escuro, como o da landing do app. */}
      <section className="bg-cream px-5 pb-16 md:pb-24">
        <div className="section-dark bg-noise relative isolate mx-auto max-w-[1140px] overflow-hidden rounded-3xl">
          <div className="relative z-10 grid gap-8 px-7 py-12 text-cream sm:px-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-col gap-5">
              <h2 className="max-w-[520px] text-[32px] md:text-[44px]">
                {CHAMADA_FINAL.title}
              </h2>
              <p className="max-w-[480px] text-[16px]/relaxed text-cream/75">
                {CHAMADA_FINAL.body}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <BotaoApp path="/criar-conta" campaign="pagina" variant="secondary">
                {CHAMADA_FINAL.cta}
                <ArrowRight data-icon="inline-end" />
              </BotaoApp>
              <BotaoApp
                path="/planos"
                campaign="pagina"
                variant="outline"
                className="border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                {CHAMADA_FINAL.secondary}
              </BotaoApp>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // conteúdo estático e controlado por nós
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, appSchema]),
        }}
      />
    </>
  );
}
