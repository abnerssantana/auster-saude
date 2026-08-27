import { Building2, FileCheck2, Landmark, MapPin } from "lucide-react";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { DIAGNOSTICO } from "@/lib/content";

type Props = {
  titulo: string;
  paragrafos: string[];
  fatos: { rotulo: string; valor: string }[];
};

/* Ícones dos fatos locais, na mesma ordem de Local.fatos */
const FATO_ICONS = [FileCheck2, Landmark, Building2, MapPin];

/** Seção escura com o conteúdo local único da página — o antídoto contra doorway page. */
export function ContextoLocal({ titulo, paragrafos, fatos }: Props) {
  return (
    <section className="section-dark bg-noise relative isolate overflow-hidden text-cream">
      <div className="relative z-10 px-[5vw] py-[10vw] md:py-[6vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col gap-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div className="flex flex-col gap-5">
              <h2 className="text-[30px] md:text-[40px]">{titulo}</h2>
              {paragrafos.map((p) => (
                <p
                  key={p}
                  className="text-[15px]/relaxed text-cream/85 md:text-[17px]/relaxed"
                >
                  {p}
                </p>
              ))}
              <CtaWhatsapp variant="secondary" withArrow className="mt-2 self-start">
                {DIAGNOSTICO.cta}
              </CtaWhatsapp>
            </div>

            <ul className="flex flex-col gap-4">
              {fatos.map((fato, i) => {
                const Icon = FATO_ICONS[i % FATO_ICONS.length];
                return (
                  <li
                    key={fato.rotulo}
                    data-reveal="up"
                    className="glass-card flex gap-4 p-5"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint/15 text-mint">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-heading text-[16px] font-semibold text-cream">
                        {fato.rotulo}
                      </h3>
                      <p className="text-[14px]/normal text-cream/80">
                        {fato.valor}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
