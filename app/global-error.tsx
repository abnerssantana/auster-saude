"use client"; // error boundary precisa ser Client Component

import { useEffect } from "react";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

/*
 * Este arquivo substitui o root layout quando o próprio layout quebra, então
 * html/body, fontes e CSS global precisam ser declarados de novo aqui — nada
 * do layout.tsx sobrevive. Sem Header/Footer de propósito: eles moram no
 * layout que acabou de falhar.
 */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      lang="pt-BR"
      className={`${instrumentSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <title>Algo deu errado | Auster Saúde</title>
        <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-cream">
          <div
            aria-hidden
            className="absolute top-[-10%] right-[-10%] -z-10 size-[420px] rounded-full bg-mint/70 blur-[110px]"
          />

          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 px-5 py-24 text-center">
            <h1 className="text-[34px] text-brand-800 md:text-[44px]">
              Algo deu errado por aqui
            </h1>
            <p className="text-[16px]/relaxed text-brand-800/80 md:text-[18px]/relaxed">
              Falha nossa, não sua. Tente de novo ou volte para a página
              inicial.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => unstable_retry()}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-brand-600"
              >
                Tentar novamente
              </button>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-brand-800/20 bg-card/60 px-7 text-[15px] font-semibold text-brand-800 transition-colors hover:border-primary/40 hover:text-primary"
              >
                Voltar para a página inicial
              </Link>
            </div>

            {error.digest ? (
              <p className="text-xs text-brand-800/50">
                Código do erro: {error.digest}
              </p>
            ) : null}
          </div>
        </main>
      </body>
    </html>
  );
}
