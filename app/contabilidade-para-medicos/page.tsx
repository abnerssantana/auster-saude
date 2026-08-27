import type { Metadata } from "next";
import { LocalHero } from "@/components/landing/local-hero";
import { ContextoLocal } from "@/components/landing/contexto-local";
import { ComoFunciona } from "@/components/landing/como-funciona";
import { OutrasCidades } from "@/components/landing/outras-cidades";
import { FaqSection } from "@/components/landing/faq-section";
import { Solucoes } from "@/components/home/solucoes";
import { Clientes } from "@/components/home/clientes";
import { CtaFinal } from "@/components/home/cta-final";
import { HUB } from "@/lib/locais";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: HUB.titulo,
  description: HUB.descricao,
  alternates: { canonical: "/contabilidade-para-medicos" },
  openGraph: { ...OPEN_GRAPH_BASE, url: "/contabilidade-para-medicos" },
};

/*
 * Hub do cluster de páginas locais (hub and spoke): concentra a autoridade de
 * "contabilidade para médicos" e distribui para as páginas por cidade.
 */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contabilidade para médicos",
      item: `${SITE_URL}/contabilidade-para-medicos`,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Contabilidade para médicos",
  name: "Contabilidade para médicos",
  description: HUB.descricao,
  url: `${SITE_URL}/contabilidade-para-medicos`,
  areaServed: { "@type": "Country", name: "Brasil" },
  provider: {
    "@type": "AccountingService",
    name: SITE_NAME,
    alternateName: ["Auster Contabilidade", "Grupo Auster"],
    url: SITE_URL,
    telephone: "+55 47 99611-4584",
  },
};

/* Fatos do painel escuro do hub — o resumo nacional do serviço. */
const FATOS_HUB = [
  {
    rotulo: "Especialização exclusiva",
    valor:
      "Só atendemos a área da saúde: plantões, editais, credenciamentos e transição de carreira fazem parte da rotina da equipe.",
  },
  {
    rotulo: "Todo o Brasil",
    valor:
      "Abertura de PJ, notas e obrigações resolvidas por via digital na junta comercial, prefeitura e CRM de qualquer estado.",
  },
  {
    rotulo: "Sem taxas escondidas",
    valor:
      "O valor é apresentado antes da contratação. Contratação direta, sem surpresas no contrato.",
  },
  {
    rotulo: "App próprio",
    valor:
      "Documentos, boletos e notas na palma da mão — e o envio para os locais onde você atende é feito pela equipe.",
  },
];

export default function ContabilidadeParaMedicosPage() {
  return (
    <>
      <LocalHero
        badge="Contabilidade especializada em médicos"
        title={HUB.headline}
        intro={[...HUB.intro]}
        secondary={{ label: "Conheça as soluções", href: "#solucoes" }}
      />
      <ContextoLocal
        titulo={HUB.argumento.titulo}
        paragrafos={[...HUB.argumento.paragrafos]}
        fatos={FATOS_HUB}
      />
      <Solucoes />
      <ComoFunciona />
      <OutrasCidades />
      <Clientes />
      <FaqSection
        title="Perguntas frequentes sobre contabilidade para médicos"
        items={[...HUB.faq]}
      />
      <CtaFinal />

      <script
        type="application/ld+json"
        // conteúdo estático e controlado por nós
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, serviceSchema]),
        }}
      />
    </>
  );
}
