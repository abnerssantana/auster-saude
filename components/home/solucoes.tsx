import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Calculator,
  ChartLine,
  HandCoins,
  Landmark,
  ShieldCheck,
  Umbrella,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SOLUCOES } from "@/lib/content";

const REVEALS = ["left", "up", "right"] as const;

/* Ícones das soluções, na mesma ordem de SOLUCOES.items */
const SOLUCAO_ICONS = [
  Calculator,
  Building2,
  ShieldCheck,
  BadgeCheck,
  ChartLine,
  HandCoins,
  Umbrella,
  Landmark,
];

export function Solucoes() {
  return (
    <section
      id="solucoes"
      className="scroll-mt-24 bg-linear-to-b from-cream to-[#f4f4e6]"
    >
      <div className="px-[5vw] py-[10vw] md:py-[6vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge
              variant="outline"
              className="h-7 border-primary/25 bg-card/60 px-3 text-[13px] text-primary"
            >
              Soluções
            </Badge>
            <h2 className="text-[30px] text-brand-800 md:text-[40px]">
              {SOLUCOES.title}
            </h2>
          </div>

          <ul className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUCOES.items.map((item, i) => {
              const Icon = SOLUCAO_ICONS[i % SOLUCAO_ICONS.length];
              return (
                <li key={item.title} data-reveal={REVEALS[i % REVEALS.length]}>
                  <Card className="group h-full gap-0 pt-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10 hover:ring-primary/25">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pt-5 pb-5">
                      <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="text-[19px] text-brand-800">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-[14px]/normal">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
