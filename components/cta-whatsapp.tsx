import type { VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
} & Pick<VariantProps<typeof buttonVariants>, "variant" | "size">;

/** CTA padrão do site: Button shadcn que abre a conversa no WhatsApp. */
export function CtaWhatsapp({
  children,
  className,
  variant = "default",
  size = "xl",
  withArrow = false,
}: Props) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        // CTAs longos do site quebram em duas linhas no mobile sem perder a pílula
        "h-auto min-h-12 whitespace-normal py-2.5 text-center",
        className,
      )}
      nativeButton={false}
      render={
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />
      }
    >
      <WhatsappIcon data-icon="inline-start" />
      {children}
      {withArrow ? <ArrowRight data-icon="inline-end" /> : null}
    </Button>
  );
}
