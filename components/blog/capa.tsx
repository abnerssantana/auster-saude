import Image from "next/image";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Só na capa do artigo aberto, que é o LCP da página. */
  priority?: boolean;
};

/**
 * Capa de artigo em proporção fixa (a classe define o aspect-ratio). Sem capa,
 * mostra o fundo escuro da marca: o card não fica com um buraco cinza.
 */
export function Capa({ src, alt, sizes, className, priority }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {!src ? (
        <div className="section-dark bg-noise absolute inset-0 flex items-center justify-center">
          <div
            aria-hidden
            className="absolute -top-1/3 -right-1/4 aspect-square w-3/4 rounded-full border border-cream/10"
          />
          <div
            aria-hidden
            className="absolute -top-1/5 -right-1/8 aspect-square w-1/2 rounded-full border border-cream/15"
          />
          <Stethoscope aria-hidden className="relative size-9 text-mint/70" />
        </div>
      ) : src.startsWith("/blog/imagens/") ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        // Endereço externo colado no painel: fora da lista do next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  );
}
