import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Detalhe = { title: string; body: string };

/** Selo, título e linha fina de cada parte da página do Auster Next. */
export function Cabecalho({
  eyebrow,
  title,
  lead,
  dark = false,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("flex max-w-[640px] flex-col gap-4", className)}>
      <span
        className={cn(
          "text-[12px] font-semibold tracking-[0.14em] uppercase",
          dark ? "text-mint" : "text-primary",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-[32px] md:text-[44px]",
          dark ? "text-cream" : "text-brand-800",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-[16px]/relaxed md:text-[18px]/relaxed",
          dark ? "text-cream/80" : "text-brand-800/75",
        )}
      >
        {lead}
      </p>
      {children}
    </div>
  );
}

/** Os detalhes de cada parte: título curto e explicação, com fio por cima. */
export function Detalhes({
  items,
  dark = false,
  className,
}: {
  items: Detalhe[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <li
          key={item.title}
          data-reveal="up"
          className={cn(
            "flex flex-col gap-2 border-t pt-5",
            dark ? "border-cream/15" : "border-brand-800/10",
          )}
        >
          <h3
            className={cn(
              "font-sans text-[16px] font-semibold tracking-tight",
              dark ? "text-cream" : "text-brand-800",
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "text-[14px]/relaxed",
              dark ? "text-cream/70" : "text-brand-800/70",
            )}
          >
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
