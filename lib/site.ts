/*
 * Domínio canônico de produção. Tem que ser o host que realmente serve o site:
 * é daqui que saem canonical, og:url, sitemap e a linha Sitemap do robots.txt.
 *
 * `novosite.austersaude.com.br` era o host de homologação e hoje só faz 301
 * para o apex — apontar para ele fazia cada página se declarar canônica de uma
 * URL que redireciona, e as três URLs do sitemap caírem em "Página com
 * redirecionamento" no Search Console.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://austersaude.com.br";

export const SITE_NAME = "Auster Saúde";

export const SITE_DESCRIPTION =
  "Contabilidade especializada em médicos: planejamento tributário, abertura de PJ, credenciamentos e gestão contábil consultiva. Atendimento humano, ágil e transparente.";

/*
 * Data da última revisão do conteúdo. Vai para o <lastmod> do sitemap, que é
 * como buscadores e buscas com IA medem frescor. Atualize ao mexer na copy.
 *
 * De propósito não é `new Date()`: um lastmod que muda a cada deploy sem o
 * conteúdo ter mudado é ruído, e o Google passa a ignorar o campo do site
 * inteiro quando percebe que ele não é confiável.
 */
export const CONTENT_UPDATED_AT = "2026-07-29";

/*
 * Base de Open Graph compartilhada. Definir `openGraph` numa página substitui
 * o objeto do layout inteiro (não faz merge por chave), então cada página
 * espalha isto e só acrescenta a própria `url`. Título e descrição ficam de
 * fora de propósito: o Next herda os da página quando não estão declarados.
 */
export const OPEN_GRAPH_BASE = {
  type: "website",
  locale: "pt_BR",
  siteName: SITE_NAME,
} as const;

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
