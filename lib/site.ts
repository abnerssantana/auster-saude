export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://novosite.austersaude.com.br";

export const SITE_NAME = "Auster Saúde";

export const SITE_DESCRIPTION =
  "Contabilidade especializada em médicos: planejamento tributário, abertura de PJ, credenciamentos e gestão contábil consultiva. Atendimento humano, ágil e transparente.";

const WHATSAPP_PHONE = "5547996114584";
const WHATSAPP_MESSAGE = "Olá estou entrando em contato através do site";

/** Mesmo link usado em todos os CTAs do site atual. */
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=+${WHATSAPP_PHONE}&text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const NAV_LINKS = [
  { label: "QUEM SOMOS", href: "/#quemsomos" },
  { label: "SOLUÇÕES", href: "/#solucoes" },
  { label: "CLIENTES", href: "/#nossosclientes" },
  { label: "QUERO SER AUSTER", href: "/quero-ser-auster" },
  { label: "INDICAÇÕES", href: "/indicacao" },
] as const;
