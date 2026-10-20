import { cache } from "react";
import matter from "gray-matter";
import {
  listarArquivosPost,
  lerArquivoPost,
  type ArquivoPost,
} from "@/lib/blog/armazenamento";
import { AUTORES, SLUG_PATTERN } from "@/lib/blog/config";

export type StatusPost = "publicado" | "rascunho";

/** Campos do front matter, na ordem em que são gravados no .mdx. */
export type DadosPost = {
  titulo: string;
  resumo: string;
  /** AAAA-MM-DD. */
  data: string;
  /** AAAA-MM-DD, atualizado sozinho a cada gravação pelo painel. */
  atualizadoEm: string;
  categoria: string;
  autor: string;
  capa: string;
  capaAlt: string;
  status: StatusPost;
};

export type Post = DadosPost & {
  slug: string;
  corpo: string;
  versao: string;
  minutosLeitura: number;
};

function texto(valor: unknown) {
  if (valor instanceof Date) return valor.toISOString().slice(0, 10);
  return typeof valor === "string" ? valor : "";
}

/** ~200 palavras por minuto, a média de leitura em português na tela. */
function minutosDeLeitura(corpo: string) {
  const palavras = corpo
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

function lerFrontMatter({ slug, conteudo, versao }: ArquivoPost): Post {
  // Passar um objeto de opções desliga o cache interno do gray-matter, que
  // devolveria o resultado antigo para um texto igual.
  const { data, content } = matter(conteudo, {});
  const corpo = content.replace(/^\n+/, "");
  const dataPost = texto(data.data);

  return {
    slug,
    titulo: texto(data.titulo),
    resumo: texto(data.resumo),
    data: dataPost,
    atualizadoEm: texto(data.atualizadoEm) || dataPost,
    categoria: texto(data.categoria),
    autor: texto(data.autor) || AUTORES[0].id,
    capa: texto(data.capa),
    capaAlt: texto(data.capaAlt),
    status: data.status === "rascunho" ? "rascunho" : "publicado",
    corpo,
    versao,
    minutosLeitura: minutosDeLeitura(corpo),
  };
}

/**
 * Monta o .mdx. Os valores vão entre aspas duplas via JSON.stringify, que gera
 * strings YAML válidas e escapa aspas e quebras de linha do que foi digitado.
 */
export function serializarPost(dados: DadosPost, corpo: string) {
  const linhas = (Object.keys(dados) as Array<keyof DadosPost>).map(
    (campo) => `${campo}: ${JSON.stringify(dados[campo])}`,
  );
  const texto = corpo.replace(/\r\n?/g, "\n").trim();
  return ["---", ...linhas, "---", "", texto, ""].join("\n");
}

function maisRecentesPrimeiro(a: Post, b: Post) {
  return b.data.localeCompare(a.data) || a.titulo.localeCompare(b.titulo);
}

/**
 * Todos os artigos, rascunhos incluídos. `cache` evita ler o Blob de novo
 * quando a mesma renderização pede a lista mais de uma vez (metadata, página,
 * imagem de Open Graph).
 */
export const listarTodosPosts = cache(async (): Promise<Post[]> => {
  const arquivos = await listarArquivosPost();
  return arquivos.map(lerFrontMatter).sort(maisRecentesPrimeiro);
});

/** O que o público vê: só os publicados. */
export async function listarPosts() {
  return (await listarTodosPosts()).filter(
    (post) => post.status === "publicado",
  );
}

export const buscarPostQualquerStatus = cache(
  async (slug: string): Promise<Post | null> => {
    if (!SLUG_PATTERN.test(slug)) return null;
    const arquivo = await lerArquivoPost(slug);
    return arquivo ? lerFrontMatter(arquivo) : null;
  },
);

export async function buscarPost(slug: string) {
  const post = await buscarPostQualquerStatus(slug);
  return post?.status === "publicado" ? post : null;
}

/** "20 de outubro de 2026". UTC porque a data gravada não tem fuso. */
export function formatarData(data: string) {
  const instante = new Date(`${data}T00:00:00Z`);
  if (Number.isNaN(instante.getTime())) return data;
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(instante);
}

/** Data de hoje no horário de Brasília, no formato do front matter. */
export function hoje() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}
