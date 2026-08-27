import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { DEPOIMENTOS } from "@/lib/content";

/**
 * Um único depoimento real da home, destacado nas páginas de captura — prova
 * social verdadeira em vez de avaliações inventadas por cidade.
 */
export function DepoimentoDestaque({ index }: { index: number }) {
  const depoimento = DEPOIMENTOS[index % DEPOIMENTOS.length];

  return (
    <section className="bg-[#f4f4e6]">
      <div className="px-[5vw] py-[8vw] md:py-[5vw]">
        <figure className="mx-auto flex max-w-[820px] flex-col items-center gap-6 rounded-3xl border border-brand-800/10 bg-card/80 p-8 text-center md:p-12">
          <Quote aria-hidden className="size-8 text-primary/40" />
          <blockquote className="flex flex-col gap-4">
            {depoimento.paragraphs.slice(0, 2).map((p) => (
              <p
                key={p}
                className="text-[16px]/relaxed text-brand-800/85 md:text-[18px]/relaxed"
              >
                {p}
              </p>
            ))}
          </blockquote>
          <figcaption className="flex flex-col items-center gap-3">
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
            <span className="flex items-center gap-3">
              <Image
                src={depoimento.image}
                alt=""
                quality={90}
                sizes="44px"
                className="size-11 rounded-full object-cover"
              />
              <span className="font-heading text-[16px] font-semibold text-brand-800">
                {depoimento.name}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
