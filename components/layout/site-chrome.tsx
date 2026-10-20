"use client";

import { usePathname } from "next/navigation";

/**
 * Esconde o que é do site (header, rodapé, WhatsApp) no painel do blog, que
 * vive sob o mesmo layout raiz. Os filhos continuam sendo server components:
 * chegam aqui já renderizados, este componente só decide se aparecem.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return children;
}
