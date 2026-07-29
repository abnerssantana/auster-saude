import type { Metadata } from "next";
import { FormPageShell } from "@/components/forms/form-page-shell";
import { IndicacaoForm } from "@/components/forms/indicacao-form";
import { CtaFinal } from "@/components/home/cta-final";

export const metadata: Metadata = {
  title: "Indicação",
  description:
    "Indique um colega médico para a Auster e ganhe benefícios. Leva menos de um minuto.",
  alternates: { canonical: "/indicacao" },
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
