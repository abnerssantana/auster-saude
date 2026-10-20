import fs from "node:fs/promises";
import path from "node:path";
import {
  BlobPreconditionFailedError,
  del,
  get,
  list,
  put,
} from "@vercel/blob";

/**
 * Onde ficam os artigos (.mdx) e as imagens do blog.
 *
 * Na Vercel, no mesmo Blob dos leads. O store é privado, então nada aqui tem
 * URL pública: os artigos são lidos pelo servidor ao gerar as páginas e as
 * imagens passam por /blog/imagens/[arquivo].
 *
 * Fora da Vercel, em content/blog/ — e isso vale mesmo com o
 * BLOB_READ_WRITE_TOKEN no .env.local: ele aponta para o store de produção, e
 * um teste local publicaria o artigo no site real. Para trabalhar contra o
 * Blob de propósito, rode com BLOG_ARMAZENAMENTO=blob.
 */

const ACCESS = "private" as const;
const PREFIXO_POSTS = "blog/posts/";
const PREFIXO_IMAGENS = "blog/imagens/";

const PASTA_POSTS = path.join(process.cwd(), "content/blog");
const PASTA_IMAGENS = path.join(process.cwd(), "content/blog/imagens");

export type ArquivoPost = {
  slug: string;
  conteudo: string;
  /** ETag no Blob, data de modificação no disco. Muda a cada gravação. */
  versao: string;
};

/** Outra pessoa salvou o artigo depois que ele foi aberto no editor. */
export class ConflitoDeVersao extends Error {}

/** Já existe um artigo com esse endereço. */
export class PostJaExiste extends Error {}

export function modoArmazenamento(): "blob" | "local" {
  const modo = process.env.BLOG_ARMAZENAMENTO;
  if (modo === "blob" || modo === "local") return modo;
  return process.env.VERCEL ? "blob" : "local";
}

// ---------- Vercel Blob ----------

async function lerBlob(pathname: string) {
  // useCache: false porque o CDN do Blob segura a versão antiga por um tempo
  // depois de uma sobrescrita, e a página regenerada precisa da última.
  const resultado = await get(pathname, { access: ACCESS, useCache: false });
  if (resultado?.statusCode !== 200) return null;
  return {
    conteudo: await new Response(resultado.stream).text(),
    versao: resultado.blob.etag,
  };
}

async function listarPathnames(prefixo: string) {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const resultado = await list({ prefix: prefixo, cursor, limit: 1000 });
    pathnames.push(...resultado.blobs.map((blob) => blob.pathname));
    cursor = resultado.hasMore ? resultado.cursor : undefined;
  } while (cursor);
  return pathnames;
}

// ---------- disco ----------

async function lerArquivoLocal(arquivo: string) {
  try {
    const [conteudo, info] = await Promise.all([
      fs.readFile(arquivo, "utf8"),
      fs.stat(arquivo),
    ]);
    return { conteudo, versao: String(info.mtimeMs) };
  } catch {
    return null;
  }
}

// ---------- artigos ----------

export async function listarArquivosPost(): Promise<ArquivoPost[]> {
  if (modoArmazenamento() === "blob") {
    const slugs = (await listarPathnames(PREFIXO_POSTS))
      .filter((pathname) => pathname.endsWith(".mdx"))
      .map((pathname) => pathname.slice(PREFIXO_POSTS.length, -".mdx".length));
    const arquivos = await Promise.all(slugs.map(lerArquivoPost));
    return arquivos.filter((arquivo) => arquivo !== null);
  }

  let nomes: string[] = [];
  try {
    nomes = await fs.readdir(PASTA_POSTS);
  } catch {
    return [];
  }
  const arquivos = await Promise.all(
    nomes
      .filter((nome) => nome.endsWith(".mdx"))
      .map((nome) => lerArquivoPost(nome.slice(0, -".mdx".length))),
  );
  return arquivos.filter((arquivo) => arquivo !== null);
}

export async function lerArquivoPost(slug: string): Promise<ArquivoPost | null> {
  const lido =
    modoArmazenamento() === "blob"
      ? await lerBlob(`${PREFIXO_POSTS}${slug}.mdx`)
      : await lerArquivoLocal(path.join(PASTA_POSTS, `${slug}.mdx`));
  return lido ? { slug, ...lido } : null;
}

/**
 * Grava o artigo e devolve a nova versão.
 *
 * `versaoAnterior` é a versão que o editor carregou; `null` cria um artigo
 * novo. Se o arquivo mudou desde então (dois editores no mesmo texto), lança
 * ConflitoDeVersao em vez de apagar o trabalho de quem salvou primeiro.
 */
export async function gravarArquivoPost(
  slug: string,
  conteudo: string,
  versaoAnterior: string | null,
): Promise<string> {
  if (modoArmazenamento() === "blob") {
    const pathname = `${PREFIXO_POSTS}${slug}.mdx`;
    try {
      const resultado = await put(pathname, conteudo, {
        access: ACCESS,
        contentType: "text/markdown; charset=utf-8",
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        ...(versaoAnterior
          ? { allowOverwrite: true, ifMatch: versaoAnterior }
          : { allowOverwrite: false }),
      });
      return resultado.etag;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError) {
        throw new ConflitoDeVersao();
      }
      // Na criação, o erro só quer dizer "já existe" se o arquivo existe mesmo;
      // qualquer outra causa (token, store fora do ar) segue adiante.
      if (!versaoAnterior && (await lerBlob(pathname))) {
        throw new PostJaExiste();
      }
      throw error;
    }
  }

  const arquivo = path.join(PASTA_POSTS, `${slug}.mdx`);
  const atual = await lerArquivoLocal(arquivo);
  if (!versaoAnterior && atual) throw new PostJaExiste();
  if (versaoAnterior && atual?.versao !== versaoAnterior) {
    throw new ConflitoDeVersao();
  }

  await fs.mkdir(PASTA_POSTS, { recursive: true });
  await fs.writeFile(arquivo, conteudo);
  return String((await fs.stat(arquivo)).mtimeMs);
}

export async function excluirArquivoPost(slug: string) {
  if (modoArmazenamento() === "blob") {
    await del(`${PREFIXO_POSTS}${slug}.mdx`);
    return;
  }
  await fs.rm(path.join(PASTA_POSTS, `${slug}.mdx`), { force: true });
}

// ---------- imagens ----------

/**
 * Grava uma imagem. O nome já vem único do painel (leva um carimbo de tempo),
 * então o arquivo nunca é sobrescrito e pode ser servido como imutável.
 */
export async function salvarImagem(
  nome: string,
  dados: Buffer,
  contentType: string,
) {
  if (modoArmazenamento() === "blob") {
    await put(`${PREFIXO_IMAGENS}${nome}`, dados, {
      access: ACCESS,
      contentType,
      addRandomSuffix: false,
      allowOverwrite: false,
    });
    return;
  }

  await fs.mkdir(PASTA_IMAGENS, { recursive: true });
  await fs.writeFile(path.join(PASTA_IMAGENS, nome), dados);
}

export async function lerImagem(
  nome: string,
): Promise<ReadableStream<Uint8Array> | Uint8Array<ArrayBuffer> | null> {
  if (modoArmazenamento() === "blob") {
    // Aqui o cache do CDN do Blob pode ficar ligado: a imagem não muda.
    const resultado = await get(`${PREFIXO_IMAGENS}${nome}`, { access: ACCESS });
    return resultado?.statusCode === 200 ? resultado.stream : null;
  }

  try {
    return new Uint8Array(await fs.readFile(path.join(PASTA_IMAGENS, nome)));
  } catch {
    return null;
  }
}
