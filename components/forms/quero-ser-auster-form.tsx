"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { TextField } from "@/components/forms/form-field";
import { SelectField } from "@/components/forms/select-field";
import { ConsentField } from "@/components/forms/consent-field";
import { HoneypotField } from "@/components/forms/honeypot-field";
import { SubmitButton } from "@/components/forms/submit-button";
import {
  GRADUATION_SEMESTER_OPTIONS,
  GRADUATION_STATUS_OPTIONS,
  graduationYearOptions,
  maskCpf,
  maskPhone,
  queroSerAusterSchema,
  type QueroSerAusterInput,
} from "@/lib/schemas";

export function QueroSerAusterForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QueroSerAusterInput>({
    resolver: zodResolver(queroSerAusterSchema),
    defaultValues: { website: "" },
  });

  // useWatch, e não watch(): assina só este campo e não devolve função, que é o
  // que faria o React Compiler desistir de memoizar o formulário inteiro.
  const willGraduate =
    useWatch({ control, name: "graduationStatus" }) === "a-se-formar";

  async function onSubmit(values: QueroSerAusterInput) {
    try {
      const response = await fetch("/api/quero-ser-auster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(await response.text());

      setSent(true);
      toast.success("Recebemos seus dados. Em breve entramos em contato!");
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
        <p className="text-xl font-semibold">Cadastro enviado!</p>
        <p className="text-cream/80">
          Recebemos seus dados e um consultor da Auster vai falar com você em
          breve.
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
      <div className="grid gap-[18px] sm:grid-cols-2">
        <TextField
          id="first-name"
          label="Nome"
          placeholder="Nome"
          autoComplete="given-name"
          error={errors.firstName}
          {...register("firstName")}
        />
        <TextField
          id="last-name"
          label="Sobrenome"
          placeholder="Sobrenome"
          autoComplete="family-name"
          error={errors.lastName}
          {...register("lastName")}
        />
      </div>

      <div className="grid gap-[18px] sm:grid-cols-2">
        <TextField
          id="cpf"
          label="CPF"
          placeholder="CPF"
          inputMode="numeric"
          error={errors.cpf}
          {...register("cpf", {
            onChange: (e) => setValue("cpf", maskCpf(e.target.value)),
          })}
        />
        <TextField
          id="whatsapp"
          label="WhatsApp"
          placeholder="WhatsApp"
          inputMode="tel"
          autoComplete="tel"
          error={errors.whatsapp}
          {...register("whatsapp", {
            onChange: (e) => setValue("whatsapp", maskPhone(e.target.value)),
          })}
        />
      </div>

      <TextField
        id="email"
        label="E-mail"
        type="email"
        placeholder="E-mail"
        autoComplete="email"
        error={errors.email}
        {...register("email")}
      />

      <TextField
        id="address"
        label="Endereço"
        placeholder="Endereço"
        autoComplete="street-address"
        error={errors.address}
        {...register("address")}
      />

      <div className="grid gap-[18px] sm:grid-cols-2">
        <TextField
          id="college"
          label="Faculdade"
          placeholder="Faculdade"
          autoComplete="organization"
          error={errors.college}
          {...register("college")}
        />
        <SelectField
          id="graduation-status"
          label="Situação na faculdade"
          placeholder="Formado ou a se formar?"
          options={GRADUATION_STATUS_OPTIONS}
          error={errors.graduationStatus}
          {...register("graduationStatus", {
            // Trocar para "Formado" tira os campos da tela; sem limpar aqui, o
            // ano e o semestre escolhidos antes seguiriam no envio.
            onChange: () => {
              setValue("graduationYear", "");
              setValue("graduationSemester", "");
            },
          })}
        />
      </div>

      {willGraduate ? (
        <div className="grid gap-[18px] sm:grid-cols-2">
          <SelectField
            id="graduation-year"
            label="Ano de formatura"
            placeholder="Ano de formatura"
            options={graduationYearOptions()}
            error={errors.graduationYear}
            {...register("graduationYear")}
          />
          <SelectField
            id="graduation-semester"
            label="Semestre de formatura"
            placeholder="Semestre de formatura"
            options={GRADUATION_SEMESTER_OPTIONS}
            error={errors.graduationSemester}
            {...register("graduationSemester")}
          />
        </div>
      ) : null}

      <ConsentField
        id="consent-auster"
        error={errors.consent}
        {...register("consent")}
      />

      <HoneypotField {...register("website")} />

      <SubmitButton pending={isSubmitting}>Quero ser Auster</SubmitButton>
    </form>
  );
}
