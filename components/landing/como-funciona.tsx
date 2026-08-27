import { Badge } from "@/components/ui/badge";

/*
 * O processo é o mesmo em qualquer cidade — é justamente o argumento das
 * páginas locais: atendimento digital com as mesmas etapas em todo o Brasil.
 */
const PASSOS = [
  {
    titulo: "Diagnóstico gratuito",
    descricao:
      "Você chama no WhatsApp e a equipe analisa suas fontes pagadoras, contratos e regime atual — e mostra em números onde está a economia.",
  },
  {
    titulo: "Proposta transparente",
    descricao:
      "O valor é apresentado antes da contratação, sem taxas escondidas e sem surpresas no contrato.",
  },
  {
    titulo: "Abertura ou migração sem parar de atender",
    descricao:
      "PJ nova sai pela junta comercial do seu estado; troca de contador é conduzida pela equipe, sem interromper a emissão de notas.",
  },
  {
    titulo: "Rotina no app, atendimento no WhatsApp",
    descricao:
      "Notas, guias e documentos organizados no app próprio. Dúvidas respondidas por gente de verdade, no mesmo dia.",
  },
];

export function ComoFunciona() {
  return (
    <section className="bg-linear-to-b from-cream to-[#f4f4e6]">
      <div className="px-[5vw] py-[10vw] md:py-[6vw]">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge
              variant="outline"
              className="h-7 border-primary/25 bg-card/60 px-3 text-[13px] text-primary"
            >
              Como funciona
            </Badge>
            <h2 className="text-[30px] text-brand-800 md:text-[40px]">
              Do primeiro contato à rotina resolvida
            </h2>
          </div>

          <ol className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS.map((passo, i) => (
              <li
                key={passo.titulo}
                data-reveal="up"
                className="flex flex-col gap-3 rounded-2xl border border-brand-800/10 bg-card/70 p-6"
              >
                <span
                  aria-hidden
                  className="font-heading text-[36px] font-semibold text-primary/30"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-[18px] font-semibold text-brand-800">
                  {passo.titulo}
                </h3>
                <p className="text-[14px]/relaxed text-brand-800/75">
                  {passo.descricao}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
