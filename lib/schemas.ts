import { z } from "zod";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

/** Valida CPF pelos dois dígitos verificadores. */
export function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += Number(cpf[i]) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
}

/** Aceita fixo (10 dígitos) e celular (11 dígitos) com DDD. */
const phone = z
  .string()
  .trim()
  .refine((value) => [10, 11].includes(onlyDigits(value).length), {
    message: "Informe um telefone com DDD.",
  });

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(2, { message: `Informe ${label}.` })
    .max(120);

/**
 * Campo-armadilha: bots preenchem tudo, humanos não veem.
 * Aceita qualquer valor no schema — quem decide é a rota, que responde 200
 * sem enviar nada. Assim o bot não descobre a armadilha e nenhum usuário real
 * fica travado sem mensagem de erro caso o autofill preencha o campo.
 */
export const honeypot = z.string().optional();

/* -------------------------------- formatura ------------------------------- */

const graduationStatus = z.enum(["formado", "a-se-formar"], {
  message: "Selecione se já é formado ou ainda vai se formar.",
});

export type GraduationStatus = z.infer<typeof graduationStatus>;

/** Rótulos do select, do e-mail e do CSV — um lugar só para os três. */
export const GRADUATION_STATUS_LABEL: Record<GraduationStatus, string> = {
  formado: "Formado",
  "a-se-formar": "A se formar",
};

export const GRADUATION_STATUS_OPTIONS = Object.entries(
  GRADUATION_STATUS_LABEL,
).map(([value, label]) => ({ value, label }));

export const GRADUATION_SEMESTER_OPTIONS = [
  { value: "1", label: "1º semestre" },
  { value: "2", label: "2º semestre" },
];

/** Medicina dura seis anos: quem está entrando agora cabe nesta janela. */
const YEARS_AHEAD = 7;

/** Anos oferecidos a quem ainda vai se formar, do atual em diante. */
export function graduationYearOptions(from = new Date().getFullYear()) {
  return Array.from({ length: YEARS_AHEAD + 1 }, (_, index) => {
    const year = String(from + index);
    return { value: year, label: year };
  });
}

/**
 * A janela aceita no servidor é um ano maior dos dois lados que a do select:
 * a página pode ter sido aberta na véspera do Ano-Novo e enviada depois, e
 * recusar o ano que a própria pessoa viu na lista não teria conserto na tela.
 */
function isGraduationYear(value: string) {
  if (!/^\d{4}$/.test(value)) return false;
  const current = new Date().getFullYear();
  return Number(value) >= current - 1 && Number(value) <= current + YEARS_AHEAD + 1;
}

export const queroSerAusterSchema = z
  .object({
    firstName: name("seu nome"),
    lastName: name("seu sobrenome"),
    cpf: z.string().trim().refine(isValidCpf, { message: "CPF inválido." }),
    whatsapp: phone,
    email: z.email({ message: "Informe um e-mail válido." }).trim().max(200),
    address: z
      .string()
      .trim()
      .min(5, { message: "Informe seu endereço." })
      .max(300),
    college: z
      .string()
      .trim()
      .min(2, { message: "Informe sua faculdade." })
      .max(160),
    graduationStatus,
    /*
     * Só valem para quem ainda vai se formar, então ficam opcionais aqui e são
     * cobrados no superRefine. Se fossem obrigatórios no próprio campo, quem
     * marcasse "Formado" travaria o envio por causa de um erro em campo que
     * nem está na tela.
     */
    graduationYear: z.string().trim().optional(),
    graduationSemester: z.string().trim().optional(),
    consent: z.literal(true, {
      message: "É preciso concordar com o uso dos seus dados.",
    }),
    website: honeypot,
  })
  .superRefine((data, ctx) => {
    if (data.graduationStatus !== "a-se-formar") return;

    if (!isGraduationYear(data.graduationYear ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["graduationYear"],
        message: "Selecione o ano de formatura.",
      });
    }

    if (!["1", "2"].includes(data.graduationSemester ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["graduationSemester"],
        message: "Selecione o semestre.",
      });
    }
  });

export const indicacaoSchema = z.object({
  clientName: name("seu nome"),
  colleagueName: name("o nome do colega"),
  colleaguePhone: phone,
  consent: z.literal(true, {
    message: "É preciso concordar com o uso dos dados.",
  }),
  website: honeypot,
});

export type QueroSerAusterInput = z.infer<typeof queroSerAusterSchema>;
export type IndicacaoInput = z.infer<typeof indicacaoSchema>;

/* --------------------------------- máscaras -------------------------------- */

export function maskCpf(value: string) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}
