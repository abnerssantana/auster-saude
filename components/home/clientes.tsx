import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { VideoCarousel } from "@/components/home/video-carousel";
import { DEPOIMENTOS, RESULTADOS } from "@/lib/content";

function FiveStars() {
  return (
    <span
      role="img"
      aria-label="Avaliação 5 de 5 estrelas"
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className="size-4.5 fill-amber-400 text-amber-400"
        />
      ))}
    </span>
  );
}

export function Clientes() {
  return (
    <section
      id="nossosclientes"
      className="section-dark bg-noise relative isolate scroll-mt-24 overflow-hidden text-cream"
    >
      <div className="relative z-10 px-[5vw] py-[10vw] md:py-[6vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-10">
          <h2
            className="max-w-full text-center text-[30px] md:max-w-[75%] md:text-[44px] [&_u]:underline [&_u]:decoration-mint/70 [&_u]:decoration-4 [&_u]:underline-offset-8"
            // o <u> em "R$ 10 mil por mês" vem da copy original
            dangerouslySetInnerHTML={{ __html: RESULTADOS.titleHtml }}
          />

          <div className="flex max-w-full flex-col gap-4 text-center text-[15px]/relaxed text-cream/85 md:max-w-[63%] md:text-[18px]/relaxed">
            {RESULTADOS.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 className="pt-2 text-center text-[28px] md:text-[32px]">
            {RESULTADOS.depoimentosTitle}
          </h3>

          <ul className="flex w-full flex-col gap-6">
            {DEPOIMENTOS.map((depoimento, i) => (
              <li
                key={depoimento.name}
                data-reveal={i % 2 === 0 ? "left" : "right"}
                className="glass-card relative overflow-hidden p-6 md:p-9"
              >
                <Quote
                  aria-hidden
                  className="absolute top-6 right-6 size-10 text-mint/15 md:size-14"
                />
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10 md:group-even:flex-row-reverse">
                  <Image
                    src={depoimento.image}
                    alt={`Foto de ${depoimento.name}`}
                    quality={90}
                    sizes="(min-width: 768px) 260px, 70vw"
                    className="h-auto w-full max-w-[240px] shrink-0 rounded-2xl ring-1 ring-cream/15 md:w-[240px]"
                  />
                  <div className="flex flex-1 flex-col items-center gap-4 text-center md:items-start md:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
                      <h4 className="text-[24px] md:text-[28px]">
                        {depoimento.name}
                      </h4>
                      <FiveStars />
                    </div>
                    <div className="flex flex-col gap-3 text-[15px]/relaxed text-cream/85 md:text-[16px]/relaxed">
                      {depoimento.paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="w-full pt-4">
            <VideoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
