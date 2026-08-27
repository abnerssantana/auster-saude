import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { AvatarStack } from "@/components/avatar-stack";
import { DIAGNOSTICO, SOCIAL_PROOF } from "@/lib/content";

type Props = {
  badge: string;
  title: string;
  intro: string[];
  /** Link secundário sob o CTA — nas cidades aponta para o hub. */
  secondary?: { label: string; href: string };
};

/**
 * Hero das páginas de captura. Sem a arte pesada da home de propósito: quem
 * chega por busca local quer confirmação imediata de que a página fala da
 * cidade dele — o H1 é o LCP e carrega instantâneo.
 */
export function LocalHero({ badge, title, intro, secondary }: Props) {
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

      <div className="mx-auto max-w-[1140px] px-5 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="flex max-w-[760px] flex-col items-start gap-6">
          <Badge
            variant="outline"
            className="h-7 gap-1.5 border-primary/25 bg-card/60 px-3 text-[13px] text-primary backdrop-blur"
          >
            <Stethoscope aria-hidden />
            {badge}
          </Badge>

          <h1 className="text-[34px] text-brand-800 md:text-[48px]">{title}</h1>

          {intro.map((p) => (
            <p
              key={p}
              className="max-w-[640px] text-[16px]/relaxed text-brand-800/80 md:text-[18px]/relaxed"
            >
              {p}
            </p>
          ))}

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <CtaWhatsapp withArrow>{DIAGNOSTICO.cta}</CtaWhatsapp>
            {secondary ? (
              <Button
                variant="outline"
                size="xl"
                className="bg-card/60 backdrop-blur"
                nativeButton={false}
                render={<Link href={secondary.href} />}
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>

          <div className="flex items-center gap-3 pt-1">
            <AvatarStack />
            <p className="max-w-[220px] text-left text-sm/snug text-brand-800/80">
              {SOCIAL_PROOF.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
