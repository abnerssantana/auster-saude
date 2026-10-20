import {
  ArrowUpRight,
  Calculator,
  CalendarDays,
  Landmark,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUSTER_NEXT } from "@/lib/content";
import { AUSTER_NEXT_URL } from "@/lib/site";

/* Ícones dos recursos, na mesma ordem de AUSTER_NEXT.items */
const ITEM_ICONS = [Wallet, Landmark, CalendarDays, Calculator];

export function AusterNext() {
  return (
    <section className="bg-cream px-[5vw] pt-[10vw] md:pt-[6vw]">
      <div
        data-reveal="up"
        className="relative isolate mx-auto grid max-w-[1140px] items-center gap-8 overflow-hidden rounded-3xl bg-mint/60 p-7 ring-1 ring-brand-600/10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:p-12"
      >
        <div
          aria-hidden
          className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-mint blur-3xl"
        />

        <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <Badge
            variant="outline"
            className="h-7 border-primary/25 bg-card/60 px-3 text-[13px] text-primary"
          >
            {AUSTER_NEXT.eyebrow}
          </Badge>
          <h2 className="text-[28px] text-brand-800 md:text-[38px]">
            {AUSTER_NEXT.title}
          </h2>
          <p className="text-[15px]/relaxed text-brand-800/80 md:text-[17px]/relaxed">
            {AUSTER_NEXT.body}
          </p>
          <Button
            size="xl"
            className="h-auto min-h-12 whitespace-normal py-2.5 text-center"
            nativeButton={false}
            render={<a href={AUSTER_NEXT_URL} target="_blank" rel="noopener" />}
          >
            {AUSTER_NEXT.cta}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {AUSTER_NEXT.items.map((item, i) => {
            const Icon = ITEM_ICONS[i % ITEM_ICONS.length];
            return (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-card/80 p-4 ring-1 ring-brand-600/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="text-[15px]/snug font-medium text-brand-800">
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
