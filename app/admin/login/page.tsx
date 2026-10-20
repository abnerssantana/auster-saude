import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { usuarioLogado, usuariosSemSenha } from "@/lib/blog/auth";
import logo from "@/public/images/logo-auster.svg";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  if (await usuarioLogado()) redirect("/admin");

  // Ajuda na configuração: diz quem ainda não consegue entrar e por quê.
  const semSenha = usuariosSemSenha();
  const semSegredo = (process.env.BLOG_SESSAO_SECRET ?? "").length < 32;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Image src={logo} alt="Auster Saúde" className="h-10 w-auto" />
          <div>
            <h1 className="text-[28px] text-brand-800">Painel do blog</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Entre com o seu usuário para escrever e publicar artigos.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <LoginForm />
        </div>

        {semSegredo || semSenha.length > 0 ? (
          <div className="mt-4 rounded-xl border border-clay/20 bg-clay/5 p-4 text-sm text-clay">
            <p className="font-semibold">Configuração pendente</p>
            <ul className="mt-1 list-disc pl-5">
              {semSegredo ? <li>Falta a variável BLOG_SESSAO_SECRET.</li> : null}
              {semSenha.map((id) => (
                <li key={id}>
                  Sem senha para <strong>{id}</strong>: gere com{" "}
                  <code>npm run blog:senha -- {id}</code>.
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
