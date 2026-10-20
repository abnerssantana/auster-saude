"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  criarSessao,
  encerrarSessao,
  exigirLogin,
  loginBloqueado,
  PainelNaoConfigurado,
  registrarFalhaDeLogin,
  verificarCredenciais,
} from "@/lib/blog/auth";
import {
  ConflitoDeVersao,
  excluirArquivoPost,
  gravarArquivoPost,
  PostJaExiste,
  salvarImagem,
} from "@/lib/blog/armazenamento";
import {
  autorPorId,
  categoriaPorSlug,
  SLUG_PATTERN,
  SLUGS_RESERVADOS,
  slugify,
} from "@/lib/blog/config";
import { erroNoMdx } from "@/lib/blog/mdx";
import { hoje, serializarPost, type DadosPost } from "@/lib/blog/posts";

/*
 * Toda action confere o login de novo: uma server action é um endpoint
 * público, e a página que a chama estar protegida não protege a action.
 */

export type EstadoLogin = { erro?: string } | undefined;

export async function entrarAction(
  _anterior: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "desconhecido";
  if (loginBloqueado(ip)) {
    return {
      erro: "Muitas tentativas erradas. Espere 15 minutos e tente de novo.",
    };
  }

  try {
    const autor = await verificarCredenciais(
      String(formData.get("usuario") ?? ""),
      String(formData.get("senha") ?? ""),
    );
    if (!autor) {
      registrarFalhaDeLogin(ip);
      return { erro: "Usuário ou senha incorretos." };
    }
    await criarSessao(autor.id);
  } catch (error) {
    if (error instanceof PainelNaoConfigurado) return { erro: error.message };
    throw error;
  }

  redirect("/admin");
}

export async function sairAction() {
  await encerrarSessao();
  redirect("/admin/login");
}

/** Páginas públicas que mostram artigos. */
function atualizarSite() {
  revalidatePath("/blog", "layout");
  revalidatePath("/sitemap.xml");
}

export type EstadoPost =
  | { erro?: string; ok?: string; versao?: string; status?: DadosPost["status"] }
  | undefined;

function campo(formData: FormData, nome: string) {
  return String(formData.get(nome) ?? "").trim();
}

export async function salvarPostAction(
  _anterior: EstadoPost,
  formData: FormData,
): Promise<EstadoPost> {
  await exigirLogin();

  const slug = campo(formData, "slug");
  const versaoAnterior = campo(formData, "versao") || null;
  const corpo = String(formData.get("corpo") ?? "");
  const dados: DadosPost = {
    titulo: campo(formData, "titulo"),
    resumo: campo(formData, "resumo"),
    data: campo(formData, "data"),
    atualizadoEm: hoje(),
    categoria: campo(formData, "categoria"),
    autor: campo(formData, "autor"),
    capa: campo(formData, "capa"),
    capaAlt: campo(formData, "capaAlt"),
    status: campo(formData, "status") === "publicado" ? "publicado" : "rascunho",
  };

  if (!SLUG_PATTERN.test(slug) || SLUGS_RESERVADOS.includes(slug)) {
    return { erro: "Endereço inválido. Use letras minúsculas, números e hífens." };
  }
  if (!dados.titulo || !corpo.trim()) {
    return { erro: "Preencha o título e o texto do artigo." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.data)) {
    return { erro: "Informe a data de publicação." };
  }
  if (!categoriaPorSlug(dados.categoria)) {
    return { erro: "Escolha uma categoria." };
  }
  if (!autorPorId(dados.autor)) {
    return { erro: "Escolha quem assina o artigo." };
  }
  if (dados.status === "publicado" && !dados.resumo) {
    // Vira a meta description e o texto dos cards: sem ele o Google inventa.
    return { erro: "Escreva o resumo antes de publicar." };
  }
  if (dados.capa && !dados.capaAlt) {
    return { erro: "Descreva a imagem de capa (texto alternativo)." };
  }

  const erroMdx = await erroNoMdx(corpo);
  if (erroMdx) {
    return {
      erro: `O texto tem um trecho que o site não consegue exibir — ${erroMdx.replace(/\.?$/, ".")} Abra "Código (avançado)" no editor para corrigir.`,
    };
  }

  let versao: string;
  try {
    versao = await gravarArquivoPost(
      slug,
      serializarPost(dados, corpo),
      versaoAnterior,
    );
  } catch (error) {
    if (error instanceof ConflitoDeVersao) {
      return {
        erro: "Alguém salvou este artigo depois que você o abriu. Copie o seu texto, recarregue a página e aplique as mudanças na versão nova.",
      };
    }
    if (error instanceof PostJaExiste) {
      return { erro: "Já existe um artigo com esse endereço. Troque o endereço." };
    }
    console.error("Falha ao gravar artigo do blog:", error);
    return { erro: "Não foi possível salvar agora. Tente de novo em instantes." };
  }

  atualizarSite();

  if (!versaoAnterior) redirect(`/admin/posts/${slug}?criado=1`);

  return {
    ok: dados.status === "publicado" ? "Artigo salvo e publicado." : "Rascunho salvo.",
    versao,
    status: dados.status,
  };
}

export async function excluirPostAction(formData: FormData) {
  await exigirLogin();

  const slug = campo(formData, "slug");
  if (!SLUG_PATTERN.test(slug)) return;

  await excluirArquivoPost(slug);
  atualizarSite();
  redirect("/admin?excluido=1");
}

const TIPOS_IMAGEM: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
/** O navegador já reduz a foto antes de enviar; isto só barra o absurdo. */
const TAMANHO_MAXIMO = 3 * 1024 * 1024;

export async function enviarImagemAction(
  formData: FormData,
): Promise<{ url?: string; erro?: string }> {
  await exigirLogin();

  const arquivo = formData.get("imagem");
  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return { erro: "Selecione uma imagem." };
  }
  const extensao = TIPOS_IMAGEM[arquivo.type];
  if (!extensao) {
    return { erro: "Formato não suportado. Use JPG, PNG, WEBP, AVIF ou GIF." };
  }
  if (arquivo.size > TAMANHO_MAXIMO) {
    return { erro: "A imagem passou de 3 MB mesmo depois de reduzida. Use uma menor." };
  }

  // A dimensão vai no nome: o artigo reserva o espaço da imagem sem lê-la.
  const largura = Number(formData.get("largura"));
  const altura = Number(formData.get("altura"));
  const dimensoes =
    Number.isInteger(largura) && Number.isInteger(altura) && largura > 9 && altura > 9
      ? `-${largura}x${altura}`
      : "";

  const base = slugify(arquivo.name.replace(/\.[^.]+$/, "")).slice(0, 50) || "imagem";
  const nome = `${base}${dimensoes}-${Date.now().toString(36)}.${extensao}`;

  try {
    await salvarImagem(nome, Buffer.from(await arquivo.arrayBuffer()), arquivo.type);
  } catch (error) {
    console.error("Falha ao gravar imagem do blog:", error);
    return { erro: "Não foi possível enviar a imagem agora." };
  }

  return { url: `/blog/imagens/${nome}` };
}
