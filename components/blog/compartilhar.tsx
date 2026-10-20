"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

const botao =
  "inline-flex h-10 items-center gap-2 rounded-full border border-brand-800/15 bg-card/70 px-4 text-sm font-medium text-brand-800/85 transition-colors hover:border-primary/40 hover:text-primary [&_svg]:size-4";

/** WhatsApp primeiro: é por onde médico compartilha com colega. */
export function Compartilhar({ titulo, url }: { titulo: string; url: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      toast.success("Link copiado.");
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      toast.error("Não foi possível copiar. Copie o endereço na barra do navegador.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="mr-2 text-sm font-semibold text-brand-800">Compartilhe:</p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${titulo} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={botao}
      >
        <WhatsappIcon aria-hidden /> WhatsApp
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={botao}
      >
        LinkedIn
      </a>
      <button type="button" onClick={copiar} className={botao}>
        {copiado ? <Check aria-hidden /> : <Link2 aria-hidden />}
        {copiado ? "Copiado" : "Copiar link"}
      </button>
    </div>
  );
}
