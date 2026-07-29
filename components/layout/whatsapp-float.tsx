import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/site";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Auster no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-brand-900/30 transition-transform hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
