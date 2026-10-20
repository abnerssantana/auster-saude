// Gera a variável de senha de um usuário do painel do blog.
//
//   npm run blog:senha -- angelo            → cria uma senha aleatória
//   npm run blog:senha -- angelo "minha senha"
//
// Imprime a senha (para entregar à pessoa) e a linha BLOG_SENHA_<ID>=... para
// colar no .env.local e em Settings → Environment Variables na Vercel. Só o
// hash vai para o ambiente; a senha em si não fica guardada em lugar nenhum.
import { randomBytes, scryptSync } from "node:crypto";

const [id, senhaInformada] = process.argv.slice(2);

if (!id || !/^[a-z0-9-]+$/.test(id)) {
  console.error('Uso: npm run blog:senha -- <usuario> ["senha"]');
  process.exit(1);
}

if (senhaInformada !== undefined && senhaInformada.length < 10) {
  console.error("Use uma senha com pelo menos 10 caracteres.");
  process.exit(1);
}

// 18 bytes em base64url = 24 caracteres, sem símbolos que confundam ao digitar.
const senha = senhaInformada ?? randomBytes(18).toString("base64url");
const salt = randomBytes(16);
const hash = scryptSync(senha, salt, 64);

// Mesmo formato que lib/blog/auth.ts lê. Sem `$`: o .env expande variáveis.
const valor = `scrypt:${salt.toString("base64url")}:${hash.toString("base64url")}`;

console.log(`Usuário: ${id}`);
if (senhaInformada === undefined) console.log(`Senha:   ${senha}`);
console.log("");
console.log(`BLOG_SENHA_${id.toUpperCase().replace(/-/g, "_")}=${valor}`);
