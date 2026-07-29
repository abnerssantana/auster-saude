import Image from "next/image";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { CTA_FINAL } from "@/lib/content";
import corpoClinico from "@/public/images/fotos-corpo-clinico-grupo-auster.avif";

export function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* anéis concêntricos ecoando a arte do hero */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[-140px] -z-10 size-[520px] -translate-y-1/2 rounded-full border border-brand-600/10 max-md:hidden"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-[-60px] -z-10 size-[360px] -translate-y-1/2 rounded-full border border-brand-600/15 max-md:hidden"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-[-10%] -z-10 size-[480px] -translate-y-1/2 rounded-full bg-mint/70 blur-[110px]"
      />

      <div className="mx-auto grid max-w-[1140px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-6 md:py-20">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <h2 className="text-[34px] text-brand-800 md:text-[44px]">
            {CTA_FINAL.title}
          </h2>
          <p className="text-[16px]/relaxed text-brand-800/80 md:text-[18px]/relaxed">
            {CTA_FINAL.body}
          </p>
          <CtaWhatsapp withArrow>{CTA_FINAL.cta}</CtaWhatsapp>
        </div>

        <Image
          src={corpoClinico}
          alt="Corpo clínico atendido pelo Grupo Auster"
          quality={90}
          sizes="(min-width: 768px) 361px, 80vw"
          className="mx-auto h-auto w-full max-w-[361px]"
          data-reveal="right"
        />
      </div>
    </section>
  );
}
