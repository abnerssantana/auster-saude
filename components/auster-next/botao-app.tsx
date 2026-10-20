import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { austerNextUrl } from "@/lib/auster-next";

type Props = {
  /** Caminho no austernext.com.br, como "/planos". */
  path: string;
  campaign: "home" | "pagina";
  children: React.ReactNode;
  className?: string;
} & Pick<VariantProps<typeof buttonVariants>, "variant">;

/** Botão que abre o Auster Next em outra aba, com a UTM da posição. */
export function BotaoApp({ path, campaign, children, className, variant }: Props) {
  return (
    <Button
      variant={variant}
      size="xl"
      className={className}
      nativeButton={false}
      render={
        <a href={austerNextUrl(path, campaign)} target="_blank" rel="noopener" />
      }
    >
      {children}
    </Button>
  );
}
