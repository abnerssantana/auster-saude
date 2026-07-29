import type { Metadata } from "next";
import { FormPageShell } from "@/components/forms/form-page-shell";
import { QueroSerAusterForm } from "@/components/forms/quero-ser-auster-form";
import { CtaFinal } from "@/components/home/cta-final";

export const metadata: Metadata = {
  title: "Quero ser Auster",
  description:
    "Preencha seus dados e um consultor da Auster entra em contato para começar sua migração — sem burocracia e com atendimento humano.",
  alternates: { canonical: "/quero-ser-auster" },
};

export default function QueroSerAusterPage() {
  return (
    <>
      <FormPageShell title="Seja Auster">
        <QueroSerAusterForm />
      </FormPageShell>
      <CtaFinal />
    </>
  );
}
