/**
 * Configuração do blog que o painel e as páginas públicas compartilham. Só
 * dados: este arquivo também vai para o navegador, no editor do painel.
 */

/**
 * Quem pode entrar no painel em /admin. Cada pessoa aqui é ao mesmo tempo um
 * login e um autor exibido nos artigos.
 *
 * A senha não fica no código (o repositório é público): fica em
 * BLOG_SENHA_<ID EM MAIÚSCULAS>, guardada como hash. Para incluir alguém,
 * acrescente uma entrada e gere a variável com `npm run blog:senha`.
 *
 * `cargo` e `bio` aparecem no fim de cada artigo e no schema de autor. Em
 * conteúdo sobre impostos o Google pesa quem assina o texto, então vale
 * preencher com formação e registro profissional (ex.: CRC).
 */
export const AUTORES = [
  {
    id: "abner",
    nome: "Abner Santana",
    cargo: "Equipe Auster Saúde",
    bio: "",
  },
  {
    id: "angelo",
    nome: "Angelo",
    cargo: "Equipe Auster Saúde",
    bio: "",
  },
] as const;

export type Autor = (typeof AUTORES)[number];
export type AutorId = Autor["id"];

export function autorPorId(id: string): Autor | undefined {
  return AUTORES.find((autor) => autor.id === id);
}

/** Categorias fixas: cada uma vira uma página em /blog/categoria/<slug>. */
export const CATEGORIAS = [
  { slug: "impostos", nome: "Impostos e tributação" },
  { slug: "abertura-de-pj", nome: "Abertura de PJ" },
  { slug: "credenciamentos", nome: "Credenciamentos" },
  { slug: "gestao-financeira", nome: "Gestão financeira" },
  { slug: "carreira-medica", nome: "Carreira médica" },
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((categoria) => categoria.slug === slug);
}

/** Textos fixos da página /blog. */
export const BLOG = {
  titulo: "Blog: impostos, PJ e carreira para médicos",
  descricao:
    "Artigos da equipe Auster sobre impostos, abertura de PJ, credenciamentos e gestão financeira para médicos — do primeiro plantão à clínica própria.",
  headline: "Impostos, PJ e carreira médica, explicados por quem só atende médicos",
  intro:
    "Conteúdo da equipe Auster para você decidir com números: regime tributário, plantões, credenciamentos e o dinheiro que fica no seu bolso no fim do mês.",
} as const;

/** Na primeira página o artigo mais recente vai em destaque, fora desta conta. */
export const POSTS_POR_PAGINA = 9;

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Pastas de /blog que um artigo não pode usar como endereço. */
export const SLUGS_RESERVADOS = ["categoria", "pagina", "imagens"];

export function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

/**
 * As imagens enviadas pelo painel levam a dimensão no nome
 * (`foto-1600x900-lq2x.jpg`). Assim o artigo reserva o espaço certo antes de a
 * imagem chegar, sem precisar ler o arquivo, e não há salto de layout (CLS).
 */
export function dimensoesDaImagem(src: string) {
  const match = /-(\d{2,5})x(\d{2,5})-[a-z0-9]+\.[a-z]+$/.exec(src);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}
