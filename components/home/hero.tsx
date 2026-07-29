import Image from "next/image";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { AvatarStack } from "@/components/avatar-stack";
import { HERO, SOCIAL_PROOF } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FEFFED]">
      {/* arte completa do hero como fundo no desktop (2560×1080, alta qualidade) */}
      <Image
        src="/images/ot-heder-1grupo-auster.avif"
        alt=""
        fill
        preload
        quality={90}
        sizes="100vw"
        className="-z-10 hidden object-cover object-[20%_center] md:block"
      />

      <div className="mx-auto max-w-[1140px] px-5">
        <div className="flex flex-col items-center gap-6 pt-12 text-center md:min-h-[760px] md:w-[48%] md:items-start md:justify-center md:py-16 md:text-left">
          <Badge
            variant="outline"
            className="h-7 gap-1.5 border-primary/25 bg-card/60 px-3 text-[13px] text-primary backdrop-blur"
          >
            <Stethoscope aria-hidden />
            Contabilidade especializada em médicos
          </Badge>

          <h1 className="text-[38px] text-brand-800 md:text-[54px]">
            {HERO.title}
          </h1>

          <p className="max-w-[560px] text-[16px]/relaxed text-brand-800/80 md:max-w-[470px] md:text-[18px]/relaxed">
            {HERO.body}
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <CtaWhatsapp withArrow>{HERO.cta}</CtaWhatsapp>
            <Button
              variant="outline"
              size="xl"
              className="bg-card/60 backdrop-blur"
              nativeButton={false}
              render={<Link href="/#solucoes" />}
            >
              Conheça as soluções
            </Button>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <AvatarStack />
            <p className="max-w-[220px] text-left text-sm/snug text-brand-800/80">
              {SOCIAL_PROOF.text}
            </p>
          </div>
        </div>
      </div>

      {/* mobile: arte em tamanho completo abaixo do conteúdo */}
      <div className="pt-8 md:hidden" data-reveal="up">
        <Image
          src="/images/heder-1grupo-auster-mobileS.jpg"
          alt="Médico do Grupo Auster"
          width={1080}
          height={794}
          preload
          quality={90}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
