import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { DIAGNOSTICO, FAQ } from "@/lib/content";

/*
 * O JSON-LD sai do mesmo FAQ.items que o acordeão renderiza, então a marcação
 * nunca descreve uma pergunta que não está na página — divergir é justamente o
 * que o Google trata como structured data enganoso.
 *
 * Vale saber: desde 2023 o Google só mostra rich result de FAQ para sites de
 * saúde e governo, então isto não vira sanfona na SERP. O ganho aqui é outro —
 * é o bloco que ChatGPT, Perplexity e AI Overviews leem para extrair resposta,
 * e o Bing ainda usa.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-linear-to-b from-[#f4f4e6] to-cream"
    >
      <div className="px-[5vw] py-[10vw] md:py-[6vw]">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge
              variant="outline"
              className="h-7 border-primary/25 bg-card/60 px-3 text-[13px] text-primary"
            >
              Dúvidas frequentes
            </Badge>
            <h2 className="text-[30px] text-brand-800 md:text-[40px]">
              {FAQ.title}
            </h2>
          </div>

          {/*
           * <details> em vez de acordeão com estado: a resposta fica no HTML
           * mesmo fechada (é o que crawler e LLM leem), funciona sem JS e já
           * vem com teclado e ARIA de graça.
           */}
          <ul className="flex w-full flex-col gap-3">
            {FAQ.items.map((item) => (
              <li key={item.question} data-reveal="up">
                <details className="group rounded-2xl border border-brand-800/10 bg-card/70 px-5 transition-colors open:bg-card hover:border-brand-800/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-heading text-[17px] font-semibold text-brand-800 md:text-[19px]">
                      {item.question}
                    </h3>
                    <ChevronDown
                      aria-hidden
                      className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-5 text-[15px]/relaxed text-brand-800/80 md:text-[16px]/relaxed">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>

          <CtaWhatsapp withArrow>{DIAGNOSTICO.cta}</CtaWhatsapp>
        </div>
      </div>

      <script
        type="application/ld+json"
        // gerado acima a partir de conteúdo nosso, sem entrada de usuário
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
