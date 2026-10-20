"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { entrarAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { campoClass, rotuloClass } from "./estilos";

export function LoginForm() {
  const [estado, enviar, enviando] = useActionState(entrarAction, undefined);

  return (
    <form action={enviar} className="flex flex-col gap-4">
      <div>
        <label htmlFor="usuario" className={rotuloClass}>
          Usuário
        </label>
        <input
          id="usuario"
          name="usuario"
          required
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="ex.: angelo"
          className={campoClass}
        />
      </div>
      <div>
        <label htmlFor="senha" className={rotuloClass}>
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          autoComplete="current-password"
          className={campoClass}
        />
      </div>

      {estado?.erro ? (
        <p role="alert" className="text-sm text-destructive">
          {estado.erro}
        </p>
      ) : null}

      <Button type="submit" size="xl" disabled={enviando} className="mt-1 w-full">
        {enviando ? (
          <Spinner data-icon="inline-start" aria-hidden />
        ) : (
          <LogIn data-icon="inline-start" aria-hidden />
        )}
        {enviando ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
