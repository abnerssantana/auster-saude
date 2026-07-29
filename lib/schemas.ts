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

export const queroSerAusterSchema = z.object({
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
  consent: z.literal(true, {
    message: "É preciso concordar com o uso dos seus dados.",
  }),
  website: honeypot,
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
