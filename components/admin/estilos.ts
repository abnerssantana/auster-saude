/*
 * Campos do painel, no padrão de formulário do design system: ~42px, raio md,
 * borda `border`; no foco a borda vira `ring` com anel translúcido de 3px.
 * Valem para input, select e textarea nativos, que o shadcn do projeto não tem.
 */
export const campoClass =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-[15px] text-brand-800 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground";

export const rotuloClass = "mb-1.5 block text-sm font-semibold text-brand-800";

export const ajudaClass = "mt-1.5 text-xs text-muted-foreground";

export const painelClass = "rounded-2xl border border-border bg-card p-5";
