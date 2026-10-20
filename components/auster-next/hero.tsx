import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  Check,
  FolderOpen,
  Landmark,
  Plus,
  Smartphone,
  Wallet,
} from "lucide-react";
import { BotaoApp } from "@/components/auster-next/botao-app";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUSTER_NEXT } from "@/lib/auster-next";

/* Ícones dos recursos, na mesma ordem de AUSTER_NEXT.features */
const FEATURE_ICONS = [Wallet, Landmark, CalendarDays, FolderOpen, Calculator];

type Props = {
  /** h1 no topo da página dedicada, h2 na vitrine da home. */
  heading: "h1" | "h2";
  campaign: "home" | "pagina";
  /** Para onde vão "E muito mais" e "Veja como funciona". */
  moreHref: string;
  id?: string;
};

/**
 * O herói da landing do Auster Next trazido para cá: os aparelhos à esquerda,
 * a manchete e os pontos à direita (no celular, o texto vem antes) e a faixa
 * dos cinco recursos embaixo. Tipografia e cores são as deste site.
 */
export function AusterNextHero({ heading: Heading, campaign, moreHref, id }: Props) {
  return (
    <section
      id={id}
      className="relative isolate scroll-mt-24 overflow-hidden bg-cream"
    >
      {/* lavagem menta no topo e anéis concêntricos, ecoando a arte do hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(60%_70%_at_50%_0%,rgb(46_255_172/0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute top-[-140px] right-[-180px] -z-10 size-[620px] rounded-full border border-brand-600/10 max-lg:hidden"
      />
      <div
        aria-hidden
        className="absolute top-[-60px] right-[-100px] -z-10 size-[460px] rounded-full border border-brand-600/15 max-lg:hidden"
      />

      <div className="mx-auto flex max-w-[1140px] flex-col gap-12 px-5 pt-14 pb-[8vw] md:gap-16 md:pt-20 md:pb-[4vw]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="flex flex-col gap-6 lg:order-2">
            <Badge
              variant="outline"
              className="h-7 gap-1.5 border-primary/25 bg-card/60 px-3 text-[13px] text-primary"
            >
              <Smartphone aria-hidden />
              {AUSTER_NEXT.eyebrow}
            </Badge>

            <Heading className="text-[36px] text-brand-800 md:text-[52px]">
              {AUSTER_NEXT.title}
            </Heading>

            <ul className="flex flex-col gap-2.5 text-[15px] text-brand-800/80 md:text-[17px]">
              {AUSTER_NEXT.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check
                    aria-hidden
                    strokeWidth={2.5}
                    className="mt-0.5 size-5 shrink-0 text-primary"
                  />
                  {point}
                </li>
              ))}
              <li className="flex items-start gap-3 font-semibold text-brand-800">
                <Plus
                  aria-hidden
                  strokeWidth={2.5}
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <Link href={moreHref} className="underline-offset-4 hover:underline">
                  {AUSTER_NEXT.more}
                </Link>
              </li>
            </ul>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <BotaoApp path="/planos" campaign={campaign}>
                {AUSTER_NEXT.cta}
                <ArrowRight data-icon="inline-end" />
              </BotaoApp>
              <Button
                variant="outline"
                size="xl"
                className="bg-card/60"
                nativeButton={false}
                render={<Link href={moreHref} />}
              >
                {AUSTER_NEXT.secondary}
              </Button>
            </div>

            <p className="text-[13px] font-medium text-brand-800/60">
              {AUSTER_NEXT.note}
            </p>
          </div>

          <Image
            src={AUSTER_NEXT.devices.src}
            alt={AUSTER_NEXT.devices.alt}
            quality={90}
            preload={Heading === "h1"}
            sizes="(min-width: 1024px) 540px, 90vw"
            className="mx-auto h-auto w-full max-w-[540px] lg:order-1"
            data-reveal={Heading === "h1" ? undefined : "left"}
          />
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {AUSTER_NEXT.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              // no celular, ícone ao lado do texto: cinco cartões empilhados em coluna ficavam longos demais
              <li
                key={feature.title}
                data-reveal="up"
                className="flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-brand-800/10 sm:flex-col sm:gap-4 sm:last:col-span-2 lg:last:col-span-1"
              >
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary sm:mt-0" />
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-sans text-[15px] font-semibold tracking-tight text-brand-800">
                    {feature.title}
                  </h3>
                  <p className="text-[14px]/normal text-brand-800/70">
                    {feature.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
