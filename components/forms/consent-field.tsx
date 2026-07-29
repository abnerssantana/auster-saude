"use client";

import type { FieldError } from "react-hook-form";

type Props = React.ComponentProps<"input"> & {
  id: string;
  error?: FieldError;
};

/** Consentimento LGPD — obrigatório para enviar o formulário. */
export function ConsentField({ id, error, ...props }: Props) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-4 shrink-0 accent-[#0C5A39]"
          {...props}
        />
        <label htmlFor={id} className="text-sm leading-snug text-cream/80">
          Autorizo a Auster a usar meus dados para entrar em contato sobre esta
          solicitação.
        </label>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-[#FFB4AB]">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
