import type { Metadata } from "next";
import { FormPageShell } from "@/components/forms/form-page-shell";
import { IndicacaoForm } from "@/components/forms/indicacao-form";
import { CtaFinal } from "@/components/home/cta-final";
import { OPEN_GRAPH_BASE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Indicação",
  description:
    "Indique um colega médico para a Auster e ganhe benefícios. Leva menos de um minuto.",
  alternates: { canonical: "/indicacao" },
  openGraph: { ...OPEN_GRAPH_BASE, url: "/indicacao" },
};

export default function IndicacaoPage() {
  return (
    <>
      <FormPageShell title="Indique um colega e ganhe benefícios">
        <IndicacaoForm />
      </FormPageShell>
      <CtaFinal />
    </>
  );
}
