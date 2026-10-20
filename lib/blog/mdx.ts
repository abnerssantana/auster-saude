import { compileMDX } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import {
  COMPONENTES_DO_ARTIGO,
  mdxComponents,
} from "@/components/blog/mdx-components";

type No = { type: string; name?: string | null; children?: No[] };

/**
 * Recusa componentes que o blog não conhece. O MDX compila `<Tabela>` sem
 * reclamar e só quebra ao renderizar — ou seja, na página pública. Validar
 * aqui leva o erro para o editor, na hora de salvar.
 */
function somenteComponentesConhecidos() {
  return (arvore: No) => {
    const visitar = (no: No) => {
      const ehComponente =
        (no.type === "mdxJsxFlowElement" || no.type === "mdxJsxTextElement") &&
        no.name &&
        /^[A-Z]/.test(no.name);
      if (ehComponente && !COMPONENTES_DO_ARTIGO.includes(no.name!)) {
        throw new Error(
          `O componente <${no.name}> não existe no blog. Use só ${COMPONENTES_DO_ARTIGO.map((nome) => `<${nome}>`).join(" e ")}.`,
        );
      }
      no.children?.forEach(visitar);
    };
    visitar(arvore);
  };
}

/*
 * blockJS fica no padrão (ligado): expressões `{...}` no texto são removidas.
 * Os componentes do blog só recebem textos, então nada se perde, e o conteúdo
 * do painel nunca executa código no servidor.
 */
export async function renderizarMdx(corpo: string) {
  const { content } = await compileMDX({
    source: corpo,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return content;
}

/** Mensagem do erro que impediria o artigo de abrir, ou null se está tudo certo. */
export async function erroNoMdx(corpo: string): Promise<string | null> {
  try {
    await serialize(corpo, {
      mdxOptions: { remarkPlugins: [remarkGfm, somenteComponentesConhecidos] },
    });
    return null;
  } catch (error) {
    // Só a frase do erro (já traz linha e coluna): sem o prefixo da
    // biblioteca, o trecho de código e o link da documentação do MDX.
    const mensagem = error instanceof Error ? error.message : String(error);
    return (
      mensagem
        .replace(/^\[next-mdx-remote\] error compiling MDX:/, "")
        .split("\n")
        .find((linha) => linha.trim())
        ?.trim() ?? mensagem
    );
  }
}
