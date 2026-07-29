"use client";

/**
 * Campo-armadilha. Fica fora do fluxo visual e do foco por teclado;
 * bots que preenchem tudo entregam o envio no servidor.
 */
export function HoneypotField(props: React.ComponentProps<"input">) {
  return (
    <div
      aria-hidden
      className="absolute -left-[9999px] size-px overflow-hidden"
    >
      <label htmlFor="website">Não preencha este campo</label>
      <input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}
