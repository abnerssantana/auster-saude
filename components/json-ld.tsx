import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: SITE_NAME,
  alternateName: "Auster Contabilidade",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-auster.svg`,
  telephone: "+55 47 99611-4584",
  areaServed: "BR",
  knowsLanguage: "pt-BR",
  serviceType: [
    "Planejamento tributário para médicos",
    "Abertura de PJ médica",
    "Certificação digital",
    "Credenciamentos médicos",
    "Gestão contábil consultiva",
    "Recuperação de tributos",
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // conteúdo estático e controlado por nós
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
