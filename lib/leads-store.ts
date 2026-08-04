import { BlobPreconditionFailedError, get, put } from "@vercel/blob";

/**
 * Guarda os leads em um CSV por formulário no Vercel Blob, para baixar pelo
 * painel da Vercel ou por /api/leads/export.
 *
 * O Blob não tem "append": para acrescentar uma linha é preciso ler o arquivo
 * inteiro e regravá-lo. Duas submissões simultâneas leriam a mesma versão e a
 * segunda apagaria a linha da primeira — por isso a gravação usa `ifMatch` com
 * a ETag lida. Se o arquivo mudou nesse meio-tempo, o Blob recusa a escrita e
 * a tentativa recomeça com o conteúdo atualizado.
 */

/** O store precisa ser criado como privado: os leads têm CPF e endereço. */
const ACCESS = "private" as const;

const MAX_ATTEMPTS = 5;

/** BOM + ";" fazem o Excel em português abrir o arquivo já com as colunas
 *  separadas e os acentos corretos. */
const BOM = "\uFEFF";
const SEPARATOR = ";";
const NEWLINE = "\r\n";

export const LEAD_FILES = {
  queroSerAuster: "leads/quero-ser-auster-2.csv",
  /**
   * Cadastros anteriores às colunas de faculdade e formatura. O cabeçalho é
   * escrito só na criação do arquivo, então as colunas novas pediram um arquivo
   * novo; este continua baixável por /api/leads/export?form=quero-ser-auster-1.
   */
  queroSerAusterAnterior: "leads/quero-ser-auster.csv",
  indicacao: "leads/indicacao.csv",
} as const;

export type LeadFile = (typeof LEAD_FILES)[keyof typeof LEAD_FILES];

type SaveLeadArgs = {
  pathname: LeadFile;
  /** Mesma lista enviada no e-mail. Os `label` viram o cabeçalho do CSV na
   *  primeira gravação, então mudar a ordem depois desalinha as linhas
   *  antigas — nesse caso, renomeie o arquivo em LEAD_FILES. */
  fields: Array<{ label: string; value: string }>;
};

/**
 * Escapa um valor para CSV.
 *
 * Aspas em tudo resolve separador e aspas internas. O prefixo com apóstrofo
 * quando o texto começa com `=`, `+`, `-` ou `@` evita que o Excel interprete
 * o que a pessoa digitou como fórmula: os campos vêm de formulário público.
 */
function csvCell(value: string) {
  const clean = value.replace(/[\r\n]+/g, " ").trim();
  const safe = /^[=+\-@\t]/.test(clean) ? `'${clean}` : clean;
  return `"${safe.replace(/"/g, '""')}"`;
}

function csvRow(values: string[]) {
  return values.map(csvCell).join(SEPARATOR) + NEWLINE;
}

function timestamp() {
  // Horário de Brasília, no formato que o Excel reconhece como data.
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date());
}

/**
 * Acrescenta o lead ao CSV do formulário, criando o arquivo na primeira vez.
 *
 * Lança se não conseguir gravar — quem chama decide o que fazer, já que o
 * e-mail é o canal principal e não deve depender disto.
 */
export async function saveLead({ pathname, fields }: SaveLeadArgs) {
  const header = ["Data", ...fields.map((field) => field.label)];
  const row = [timestamp(), ...fields.map((field) => field.value)];

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // useCache: false porque o CDN serve versão antiga por até 60s depois de
    // uma sobrescrita, e aqui precisamos sempre da última.
    const current = await get(pathname, { access: ACCESS, useCache: false });

    const previous =
      current?.statusCode === 200
        ? {
            // Response.text() descarta o BOM do começo do arquivo. Tiramos
            // também o que sobrar, porque ele é recolocado na gravação.
            body: (await new Response(current.stream).text()).replace(/^\uFEFF/, ""),
            etag: current.blob.etag,
          }
        : null;

    const body = previous ? previous.body : csvRow(header);

    try {
      await put(pathname, BOM + body + csvRow(row), {
        access: ACCESS,
        contentType: "text/csv; charset=utf-8",
        addRandomSuffix: false,
        // 60s é o mínimo aceito; as leituras que precisam do dado fresco
        // passam useCache: false de qualquer forma.
        cacheControlMaxAge: 60,
        ...(previous
          ? { allowOverwrite: true, ifMatch: previous.etag }
          : // Sem ETag para comparar: allowOverwrite: false faz o próprio Blob
            // recusar a escrita se outra requisição criou o arquivo antes.
            { allowOverwrite: false }),
      });
      return;
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) throw error;

      // Outra requisição gravou entre o get e o put: recomeça em cima do
      // conteúdo novo. Erro na criação só é corrida se o arquivo passou a
      // existir; qualquer outra causa (token, store) é relançada na hora.
      const raced = previous
        ? error instanceof BlobPreconditionFailedError
        : Boolean(await get(pathname, { access: ACCESS, useCache: false }));

      if (!raced) throw error;
    }
  }
}
