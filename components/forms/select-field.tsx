"use client";

import { ChevronDown } from "lucide-react";
import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props = Omit<React.ComponentProps<"select">, "children"> & {
  id: string;
  label: string;
  /** Texto da opção vazia — faz o papel do placeholder dos campos de texto. */
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  error?: FieldError;
};

/**
 * Select nativo com a mesma casca do TextField. Nativo de propósito: no celular
 * abre a roleta do sistema, que é mais rápida de usar que qualquer lista feita
 * em JS — e o formulário inteiro continua funcionando sem estado controlado.
 */
export function SelectField({
  id,
  label,
  placeholder,
  options,
  error,
  className,
  ...props
}: Props) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-[54px] w-full appearance-none rounded-[10px] bg-white pl-[18px] pr-11 text-[16px] text-[#222] outline-none",
            "focus-visible:ring-2 focus-visible:ring-cream/70",
            // Enquanto nada foi escolhido o campo segue :invalid — é assim que
            // a opção vazia ganha a cor de placeholder dos outros campos, sem
            // precisar acompanhar o valor em estado.
            "invalid:text-[#767676]",
            error && "ring-2 ring-[#FFB4AB]",
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-[18px] top-1/2 size-4 -translate-y-1/2 text-[#767676]"
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-[#FFB4AB]">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
