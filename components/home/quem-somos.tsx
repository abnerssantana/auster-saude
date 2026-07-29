import Image from "next/image";
import {
  ClipboardCheck,
  Handshake,
  MessageCircleHeart,
  Smartphone,
  Zap,
} from "lucide-react";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { ATENDIMENTO, DIAGNOSTICO, DIFERENCIAIS } from "@/lib/content";
import dinheiro from "@/public/images/dinheiro.avif";
import atendimento from "@/public/images/foto-2-auter.avif";

/* Ícones dos diferenciais, na mesma ordem de DIFERENCIAIS.items */
const DIFERENCIAL_ICONS = [
  MessageCircleHeart,
  Handshake,
  Zap,
  ClipboardCheck,
  Smartphone,
];

export function QuemSomos() {
  return (
    <section
      id="quemsomos"
      className="section-dark bg-noise relative isolate scroll-mt-24 overflow-hidden text-cream"
    >
      <div className="relative z-10 px-[5vw] py-[10vw] md:py-[6vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col gap-16 md:gap-20">
          {/* diagnóstico + ilustração */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <h2 className="text-[30px] md:text-[44px]">
                {DIAGNOSTICO.title}
              </h2>
              <p className="text-[15px]/relaxed text-cream/85 md:text-[18px]/relaxed">
                {DIAGNOSTICO.body}
              </p>
              <CtaWhatsapp variant="secondary" withArrow>
                {DIAGNOSTICO.cta}
              </CtaWhatsapp>
            </div>
            <Image
              src={dinheiro}
              alt="Ilustração de economia de impostos"
              quality={90}
              sizes="(min-width: 768px) 480px, 90vw"
              className="mx-auto h-auto w-full max-w-[480px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              data-reveal="right"
            />
          </div>

          {/* atendimento */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative" data-reveal="left">
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[28px] bg-mint/10 blur-xl"
              />
              <Image
                src={atendimento}
                alt="Equipe da Auster em atendimento"
                quality={90}
                sizes="(min-width: 768px) 540px, 90vw"
                className="h-auto w-full rounded-3xl ring-1 ring-cream/15"
              />
            </div>
            <div className="flex flex-col gap-4 text-center text-[15px]/relaxed text-cream/85 md:text-left md:text-[18px]/relaxed">
              {ATENDIMENTO.paragraphs.map((p) =>
                p.startsWith("**") ? (
                  <p
                    key={p}
                    className="font-heading text-[22px] font-semibold text-cream md:text-[28px]"
                  >
                    {p.replaceAll("**", "")}
                  </p>
                ) : (
                  <p key={p}>{p}</p>
                ),
              )}
            </div>
          </div>

          {/* diferenciais */}
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-center text-[30px] md:text-[38px]">
              {DIFERENCIAIS.title}
            </h2>

            <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {DIFERENCIAIS.items.map((item, i) => {
                const Icon = DIFERENCIAL_ICONS[i % DIFERENCIAL_ICONS.length];
                return (
                  <li
                    key={item}
                    data-reveal="up"
                    className="glass-card flex flex-col gap-4 p-5 transition-colors hover:bg-cream/10"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-mint/15 text-mint">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <p className="text-[15px]/normal text-cream/90">{item}</p>
                  </li>
                );
              })}
            </ul>

            <CtaWhatsapp variant="secondary" withArrow className="mt-2">
              {DIAGNOSTICO.cta}
            </CtaWhatsapp>
          </div>
        </div>
      </div>
    </section>
  );
}
