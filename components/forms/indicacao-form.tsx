"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { TextField } from "@/components/forms/form-field";
import { ConsentField } from "@/components/forms/consent-field";
import { HoneypotField } from "@/components/forms/honeypot-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { indicacaoSchema, maskPhone, type IndicacaoInput } from "@/lib/schemas";

export function IndicacaoForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IndicacaoInput>({
    resolver: zodResolver(indicacaoSchema),
    defaultValues: { website: "" },
  });

  async function onSubmit(values: IndicacaoInput) {
    try {
      const response = await fetch("/api/indicacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(await response.text());

      setSent(true);
      toast.success("Indicação enviada. Obrigado!");
    } catch {
      toast.error(
        "Não conseguimos enviar agora. Tente novamente ou fale com a gente no WhatsApp.",
      );
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-cream/20 bg-cream/10 p-8"
      >
        <CheckCircle2 className="size-10" aria-hidden />
        <p className="text-xl font-semibold">Indicação enviada!</p>
        <p className="text-cream/80">
          Vamos falar com seu colega e te avisar sobre os benefícios.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col gap-[18px]"
    >
      <TextField
        id="client-name"
        label="Nome do Cliente"
        placeholder="Digite seu nome"
        autoComplete="name"
        error={errors.clientName}
        {...register("clientName")}
      />

      <TextField
        id="colleague-name"
        label="Nome do Colega"
        placeholder="Digite o nome do colega"
        error={errors.colleagueName}
        {...register("colleagueName")}
      />

      <TextField
        id="colleague-phone"
        label="Telefone do Colega (WhatsApp)"
        placeholder="(00) 00000-0000"
        inputMode="tel"
        error={errors.colleaguePhone}
        {...register("colleaguePhone", {
          onChange: (e) =>
            setValue("colleaguePhone", maskPhone(e.target.value)),
        })}
      />

      <ConsentField
        id="consent-indicacao"
        error={errors.consent}
        {...register("consent")}
      />

      <HoneypotField {...register("website")} />

      <SubmitButton pending={isSubmitting}>Enviar Indicação</SubmitButton>
    </form>
  );
}
