import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalHero } from "@/components/landing/local-hero";
import { ContextoLocal } from "@/components/landing/contexto-local";
import { ComoFunciona } from "@/components/landing/como-funciona";
import { DepoimentoDestaque } from "@/components/landing/depoimento-destaque";
import { OutrasCidades } from "@/components/landing/outras-cidades";
import { FaqSection } from "@/components/landing/faq-section";
import { Solucoes } from "@/components/home/solucoes";
import { CtaFinal } from "@/components/home/cta-final";
import { getLocal, LOCAIS } from "@/lib/locais";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_URL } from "@/lib/site";

/*
 * Páginas locais nascem só de LOCAIS (lib/locais.ts): cada uma existe porque
 * há demanda real no Search Console, com conteúdo local próprio. Slug fora da
 * lista é 404 — não geramos página em branco para cidade sem conteúdo.
 */
export function generateStaticParams() {
  return LOCAIS.map((local) => ({ cidade: local.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/contabilidade-para-medicos/[cidade]">): Promise<Metadata> {
  const { cidade } = await params;
  const local = getLocal(cidade);
  if (!local) return {};

  const path = `/contabilidade-para-medicos/${local.slug}`;
  return {
    title: local.titulo,
    description: local.descricao,
    alternates: { canonical: path },
    openGraph: { ...OPEN_GRAPH_BASE, url: path },
  };
}

export default async function CidadePage({
  params,
}: PageProps<"/contabilidade-para-medicos/[cidade]">) {
  const { cidade } = await params;
  const local = getLocal(cidade);
  if (!local) notFound();

  const pageUrl = `${SITE_URL}/contabilidade-para-medicos/${local.slug}`;

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
      {
        "@type": "ListItem",
        position: 3,
        name: `${local.nome} – ${local.uf}`,
        item: pageUrl,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Contabilidade para médicos",
    name: `Contabilidade para médicos ${local.emLocal}`,
    description: local.descricao,
    url: pageUrl,
    areaServed: {
      // santa-catarina é a única página de estado do cluster
      "@type": local.slug === "santa-catarina" ? "State" : "City",
      name: local.nome,
      address: { "@type": "PostalAddress", addressRegion: local.uf, addressCountry: "BR" },
    },
    provider: {
      "@type": "AccountingService",
      name: SITE_NAME,
      alternateName: ["Auster Contabilidade", "Grupo Auster"],
      url: SITE_URL,
      telephone: "+55 47 99611-4584",
    },
  };

  return (
    <>
      <LocalHero
        badge={`Contabilidade para médicos • ${local.nome} – ${local.uf}`}
        title={local.headline}
        intro={local.intro}
        secondary={{
          label: "Todas as cidades",
          href: "/contabilidade-para-medicos",
        }}
      />
      <ContextoLocal
        titulo={local.contexto.titulo}
        paragrafos={local.contexto.paragrafos}
        fatos={local.fatos}
      />
      <ComoFunciona />
      <Solucoes />
      <DepoimentoDestaque index={local.depoimentoIndex} />
      <FaqSection
        title={`Perguntas de médicos ${local.emLocal}`}
        items={local.faq}
      />
      <OutrasCidades atualSlug={local.slug} />
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
