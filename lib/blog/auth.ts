import { createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTORES, autorPorId, type Autor } from "@/lib/blog/config";

/**
 * Login do painel do blog: um usuário por pessoa em AUTORES, senha em
 * BLOG_SENHA_<ID> como hash scrypt (gerado por `npm run blog:senha`).
 *
 * A sessão é um cookie assinado com HMAC, sem banco: `id.expira.assinatura`.
 * O hash da senha entra na assinatura, então trocar a senha de alguém derruba
 * as sessões abertas dessa pessoa — e só dela.
 */

const COOKIE = "auster_blog_sessao";
const DURACAO_MS = 7 * 24 * 60 * 60 * 1000;
const TAMANHO_HASH = 64;

const scryptAsync = promisify(scrypt) as (
  senha: string,
  salt: Buffer,
  tamanho: number,
) => Promise<Buffer>;

/** Falta de configuração do painel, com a mensagem para quem vai configurar. */
export class PainelNaoConfigurado extends Error {}

function segredo() {
  const valor = process.env.BLOG_SESSAO_SECRET;
  if (!valor || valor.length < 32) {
    throw new PainelNaoConfigurado(
      "Defina BLOG_SESSAO_SECRET (32+ caracteres; gere com `openssl rand -hex 32`).",
    );
  }
  return valor;
}

function hashArmazenado(id: string) {
  return process.env[`BLOG_SENHA_${id.toUpperCase()}`];
}

/** Formato `scrypt:<salt>:<hash>`, ambos em base64url — sem `$`, que o .env expandiria. */
async function senhaConfere(senha: string, armazenado: string) {
  const [algoritmo, salt, hash] = armazenado.split(":");
  if (algoritmo !== "scrypt" || !salt || !hash) return false;

  const esperado = Buffer.from(hash, "base64url");
  const calculado = await scryptAsync(
    senha,
    Buffer.from(salt, "base64url"),
    esperado.length || TAMANHO_HASH,
  );
  return (
    esperado.length === calculado.length && timingSafeEqual(esperado, calculado)
  );
}

/**
 * Hash qualquer para quando o usuário não existe: o scrypt roda do mesmo
 * jeito, e o tempo de resposta não revela quais usuários são válidos.
 */
const HASH_FICTICIO = `scrypt:${Buffer.alloc(16).toString("base64url")}:${Buffer.alloc(TAMANHO_HASH).toString("base64url")}`;

export async function verificarCredenciais(
  usuario: string,
  senha: string,
): Promise<Autor | null> {
  const autor = autorPorId(usuario.trim().toLowerCase());
  const armazenado = autor ? hashArmazenado(autor.id) : undefined;

  const confere = await senhaConfere(senha, armazenado ?? HASH_FICTICIO);
  return autor && armazenado && confere ? autor : null;
}

/*
 * Freio contra adivinhação de senha: só tentativas erradas contam. O
 * rateLimit dos formulários conta todo envio, e aqui isso bloquearia todo
 * mundo que sai pelo mesmo IP (um escritório inteiro) depois de alguns
 * logins normais. Em memória por instância, como o de lib/rate-limit.
 */
const JANELA_FALHAS_MS = 15 * 60 * 1000;
const MAX_FALHAS = 8;
const falhas = new Map<string, number[]>();

function falhasRecentes(chave: string) {
  const agora = Date.now();
  const recentes = (falhas.get(chave) ?? []).filter(
    (instante) => agora - instante < JANELA_FALHAS_MS,
  );
  if (recentes.length) falhas.set(chave, recentes);
  else falhas.delete(chave);
  return recentes;
}

export function loginBloqueado(chave: string) {
  return falhasRecentes(chave).length >= MAX_FALHAS;
}

export function registrarFalhaDeLogin(chave: string) {
  falhas.set(chave, [...falhasRecentes(chave), Date.now()]);
}

function assinar(id: string, expira: string) {
  return createHmac("sha256", segredo())
    .update(`${id}.${expira}.${hashArmazenado(id) ?? ""}`)
    .digest("base64url");
}

function iguais(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export async function criarSessao(id: string) {
  const expira = Date.now() + DURACAO_MS;
  const valor = `${id}.${expira}.${assinar(id, String(expira))}`;

  (await cookies()).set(COOKIE, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expira),
  });
}

export async function encerrarSessao() {
  (await cookies()).delete(COOKIE);
}

/** Quem está logado, ou null. Nunca lança: cookie inválido é só "ninguém". */
export async function usuarioLogado(): Promise<Autor | null> {
  const valor = (await cookies()).get(COOKIE)?.value;
  if (!valor) return null;

  const [id, expira, assinatura] = valor.split(".");
  const autor = id ? autorPorId(id) : undefined;
  if (!autor || !expira || !assinatura) return null;
  if (Number(expira) < Date.now()) return null;
  if (!hashArmazenado(autor.id)) return null;

  try {
    return iguais(assinatura, assinar(autor.id, expira)) ? autor : null;
  } catch {
    return null;
  }
}

/** Para páginas e actions do painel: manda para o login quem não entrou. */
export async function exigirLogin(): Promise<Autor> {
  const autor = await usuarioLogado();
  if (!autor) redirect("/admin/login");
  return autor;
}

/** Quais usuários ainda não têm senha configurada — aviso na tela de login. */
export function usuariosSemSenha() {
  return AUTORES.filter((autor) => !hashArmazenado(autor.id)).map(
    (autor) => autor.id,
  );
}
