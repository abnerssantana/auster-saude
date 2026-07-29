"use client";

import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: FieldError;
};

/**
 * Campo do formulário. Visual igual ao do site atual (input branco, sem label
 * visível), mas com <label> para leitores de tela e estado de erro anunciado.
 */
export function TextField({ id, label, error, className, ...props }: Props) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-[54px] w-full rounded-[10px] bg-white px-[18px] text-[16px] text-[#222] outline-none",
          "placeholder:text-[#767676] focus-visible:ring-2 focus-visible:ring-cream/70",
          error && "ring-2 ring-[#FFB4AB]",
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-[#FFB4AB]">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
