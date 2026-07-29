"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  pending: boolean;
  children: React.ReactNode;
  pendingLabel?: string;
};

/** Botão de envio dos formulários. */
export function SubmitButton({
  pending,
  children,
  pendingLabel = "Enviando...",
}: Props) {
  return (
    <Button type="submit" size="xl" disabled={pending} className="w-full">
      {pending ? <Spinner data-icon="inline-start" aria-hidden /> : null}
      {pending ? pendingLabel : children}
    </Button>
  );
}
