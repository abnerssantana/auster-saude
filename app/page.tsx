import { Hero } from "@/components/home/hero";
import { QuemSomos } from "@/components/home/quem-somos";
import { Solucoes } from "@/components/home/solucoes";
import { Clientes } from "@/components/home/clientes";
import { CtaFinal } from "@/components/home/cta-final";

export default function Home() {
  return (
    <>
      <Hero />
      <QuemSomos />
      <Solucoes />
      <Clientes />
      <CtaFinal />
    </>
  );
}
