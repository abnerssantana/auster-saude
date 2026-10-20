import Image from "next/image";
import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { dimensoesDaImagem, slugify } from "@/lib/blog/config";
import { cn } from "@/lib/utils";

/*
 * Como cada elemento do Markdown aparece no artigo. Não há plugin de tipografia
 * no projeto: o estilo do corpo do texto vive todo aqui, com os tokens da marca.
 */

/** Texto puro de um título, para virar âncora (#planejamento-tributario). */
function textoDe(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(textoDe).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return textoDe(children.props.children);
  }
  return "";
}

/**
 * Só as imagens enviadas pelo painel passam pelo next/image: são as únicas com
 * dimensão conhecida (vem no nome do arquivo) e com origem garantida. Um
 * endereço externo colado no editor quebraria o next/image, que exige o
 * domínio liberado no next.config — esse vai como <img> simples.
 */
function Imagem({
  src,
  alt,
  className,
}: {
  src?: unknown;
  alt?: string;
  className?: string;
}) {
  if (typeof src !== "string" || !src) return null;
  const classe = cn("mx-auto h-auto w-full rounded-2xl bg-muted", className);
  const dimensoes = src.startsWith("/blog/imagens/")
    ? dimensoesDaImagem(src)
    : null;

  if (dimensoes) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        {...dimensoes}
        sizes="(min-width: 768px) 720px, 100vw"
        className={classe}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className={classe} />
  );
}

const TIPOS_DESTAQUE = {
  info: {
    Icone: Info,
    caixa: "border-primary/15 bg-mint/70",
    icone: "text-primary",
  },
  dica: {
    Icone: Lightbulb,
    caixa: "border-border bg-card",
    icone: "text-primary",
  },
  atencao: {
    Icone: TriangleAlert,
    caixa: "border-clay/20 bg-clay/5",
    icone: "text-clay",
  },
} as const;

export type TipoDestaque = keyof typeof TIPOS_DESTAQUE;

/** Caixa de destaque. No editor: botão "+ Destaque". */
function Destaque({
  titulo,
  tipo,
  children,
}: {
  titulo?: string;
  tipo?: string;
  children?: ReactNode;
}) {
  const estilo = TIPOS_DESTAQUE[tipo as TipoDestaque] ?? TIPOS_DESTAQUE.info;
  const { Icone } = estilo;

  return (
    <aside className={cn("my-8 flex gap-3.5 rounded-2xl border p-5 md:p-6", estilo.caixa)}>
      <Icone aria-hidden className={cn("mt-1 size-5 shrink-0", estilo.icone)} />
      <div className="min-w-0 [&_li]:text-[16px] [&_p]:my-2 [&_p]:text-[16px] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {titulo ? (
          <p className="mb-1! font-semibold text-brand-800">{titulo}</p>
        ) : null}
        {children}
      </div>
    </aside>
  );
}

/** Imagem com legenda. No editor: inserida pelo botão de imagem + legenda. */
function Figura({
  src,
  alt,
  legenda,
}: {
  src?: string;
  alt?: string;
  legenda?: string;
}) {
  return (
    <figure className="my-10">
      <Imagem src={src} alt={alt} />
      {legenda ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {legenda}
        </figcaption>
      ) : null}
    </figure>
  );
}

const corpo = "text-[17px]/[1.75] text-brand-800/85 md:text-[18px]/[1.75]";

export const mdxComponents = {
  // O H1 da página é o título do artigo: um H1 no meio do texto vira H2.
  h1: ({ children }: React.ComponentProps<"h2">) => (
    <h2 id={slugify(textoDe(children))} className="mt-12 mb-4 scroll-mt-28 text-[26px] text-brand-800 md:text-[32px]">
      {children}
    </h2>
  ),
  h2: ({ children }: React.ComponentProps<"h2">) => (
    <h2 id={slugify(textoDe(children))} className="mt-12 mb-4 scroll-mt-28 text-[26px] text-brand-800 md:text-[32px]">
      {children}
    </h2>
  ),
  h3: ({ children }: React.ComponentProps<"h3">) => (
    <h3 id={slugify(textoDe(children))} className="mt-9 mb-3 scroll-mt-28 text-[21px] text-brand-800 md:text-[24px]">
      {children}
    </h3>
  ),
  h4: ({ children }: React.ComponentProps<"h4">) => (
    <h4 className="mt-7 mb-2 text-[18px] text-brand-800">{children}</h4>
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className={cn("my-5", corpo)} {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-5 ml-6 list-disc space-y-2 marker:text-primary/50" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-5 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-primary/70" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className={cn("pl-1.5 [&>p]:my-1", corpo)} {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-9 border-l-2 border-primary/40 pl-6 font-heading text-[20px]/snug text-brand-800 italic md:text-[22px]/snug [&>p]:text-inherit"
      {...props}
    />
  ),
  a: ({ href = "", children }: React.ComponentProps<"a">) => {
    const classe =
      "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary";
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={classe}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
        {children}
      </a>
    );
  },
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-brand-800" {...props} />
  ),
  hr: () => <hr className="my-12 border-border" />,
  img: ({ src, alt }: React.ComponentProps<"img">) => (
    <Imagem src={src} alt={alt} className="my-8" />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="bg-muted px-4 py-3 font-semibold text-brand-800" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border-t border-border px-4 py-3 align-top text-brand-800/85" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  Destaque,
  Figura,
};

/** Componentes que o texto pode usar — o painel recusa qualquer outro. */
export const COMPONENTES_DO_ARTIGO = ["Destaque", "Figura"];
