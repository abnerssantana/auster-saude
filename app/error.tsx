"use client"; // error boundary precisa ser Client Component

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/site";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

/**
 * Erro de runtime das páginas. Renderiza dentro do root layout (header e
 * footer continuam de pé) — só o conteúdo da página é substituído.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // em produção o erro chega mascarado; o digest é o que liga ao log do servidor
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* anéis concêntricos — mesma assinatura visual do hero e do CTA final */}
      <div
        aria-hidden
        className="absolute top-[-120px] right-[-160px] -z-10 size-[480px] rounded-full border border-brand-600/10 max-md:hidden"
      />
      <div
        aria-hidden
        className="absolute top-[-60px] right-[-80px] -z-10 size-[340px] rounded-full border border-brand-600/15 max-md:hidden"
      />
      <div
        aria-hidden
        className="absolute top-[-10%] right-[-10%] -z-10 size-[420px] rounded-full bg-mint/70 blur-[110px]"
      />

      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-5 py-20 text-center md:py-28">
        <Badge
          variant="outline"
          className="h-7 gap-1.5 border-primary/25 bg-card/60 px-3 text-[13px] text-primary backdrop-blur"
        >
          <TriangleAlert aria-hidden />
          Erro inesperado
        </Badge>

        <h1 className="text-[34px] text-brand-800 md:text-[44px]">
          Algo deu errado por aqui
        </h1>

        <p className="max-w-[560px] text-[16px]/relaxed text-brand-800/80 md:text-[18px]/relaxed">
          Falha nossa, não sua. Tente de novo — se não resolver, o WhatsApp
          responde com gente de verdade.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button size="xl" onClick={() => unstable_retry()}>
            <RotateCcw data-icon="inline-start" />
            Tentar novamente
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="bg-card/60 backdrop-blur"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <Home data-icon="inline-start" />
            Voltar para a página inicial
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="bg-card/60 backdrop-blur"
            nativeButton={false}
            render={
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />
            }
          >
            <WhatsappIcon data-icon="inline-start" />
            Falar conosco
          </Button>
        </div>

        {error.digest ? (
          <p className="text-xs text-brand-800/50">
            Código do erro: {error.digest}
          </p>
        ) : null}
      </div>
    </section>
  );
}
