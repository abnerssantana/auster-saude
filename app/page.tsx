import { Hero } from "@/components/home/hero";
import { QuemSomos } from "@/components/home/quem-somos";
import { AusterNextHero } from "@/components/auster-next/hero";
import { Solucoes } from "@/components/home/solucoes";
import { Clientes } from "@/components/home/clientes";
import { Faq } from "@/components/home/faq";
import { OndeAtendemos } from "@/components/home/onde-atendemos";
import { CtaFinal } from "@/components/home/cta-final";

export default function Home() {
  return (
    <>
      <Hero />
      <QuemSomos />
      <AusterNextHero
        heading="h2"
        campaign="home"
        moreHref="/auster-next"
        id="auster-next"
      />
      <Solucoes />
      <Clientes />
      <Faq />
      <OndeAtendemos />
      <CtaFinal />
    </>
  );
}
