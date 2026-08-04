import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { SITE_URL } from "@/lib/site";

export type LeadField = {
  label: string;
  value: string;
  /** Deixa o valor clicável (wa.me, mailto). O CSV de leads ignora este campo. */
  href?: string;
};

type Props = {
  /** Formulário de origem: vira o selo no topo do cartão. */
  form: string;
  /**
   * Nome de quem interessa a quem abre o e-mail (quem preencheu ou quem foi
   * indicado). Entra como título no lugar de uma frase genérica — e sai da
   * lista de campos, para não aparecer duas vezes.
   */
  highlight: string;
  /** Contexto extra sob o título, quando existe ("Indicado por …"). */
  note?: string;
  /** Preheader: o trecho que o cliente de e-mail mostra ao lado do assunto. */
  preview: string;
  fields: LeadField[];
  /** Ação principal, em botão. */
  action?: { label: string; href: string };
  receivedAt: Date;
};

/* --------------------------------- paleta --------------------------------- */

/*
 * Mesmos valores de app/globals.css. Ficam repetidos aqui porque e-mail não
 * tem cascata confiável: cada regra vai inline no elemento.
 */
const CREAM = "#FFFFED";
const CARD = "#FFFFFF";
const BRAND_950 = "#05140D";
const BRAND_900 = "#06170F";
const BRAND_600 = "#0A3925";
const BRAND_500 = "#1B5A3A";
const BRAND_800 = "#081B11";
const MINT = "#E8FFE9";
const MUTED = "#5A6B60";
const HAIRLINE = "#E7E7D5";

/*
 * Fraunces e Instrument Sans, o mesmo par do site. Só clientes com @font-face
 * (Apple Mail, iOS Mail) baixam os arquivos; Gmail e Outlook descartam a regra
 * e caem no fallback — por isso Georgia nos títulos, que mantém a serifa de
 * display, e a pilha de sistema no corpo.
 */
const HEADING_FONT = "'Fraunces', Georgia, 'Times New Roman', serif";
const BODY_FONT =
  "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const STYLE_SHEET = `
  @font-face {
    font-family: 'Fraunces';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    mso-font-alt: 'Georgia';
    src: url(https://fonts.gstatic.com/s/fraunces/v38/6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7iQcIfJD58njt0rc5oPgKRw.woff2) format('woff2');
  }
  @font-face {
    font-family: 'Instrument Sans';
    font-style: normal;
    font-weight: 400 600;
    font-display: swap;
    mso-font-alt: 'Helvetica';
    src: url(https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr4SRU0rmU.woff2) format('woff2');
  }

  /* Em telas estreitas as duas colunas de cada campo viram uma só, empilhadas. */
  @media only screen and (max-width: 480px) {
    .field-cell { display: block !important; width: 100% !important; }
    .field-label { padding: 14px 0 0 !important; }
    .field-value { padding: 2px 0 14px !important; border-top: 0 !important; }
  }
`;

const RECEIVED_AT = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  dateStyle: "long",
  timeStyle: "short",
});

/** Template único dos dois formulários — muda o selo, o destaque e os campos. */
export function LeadEmail({
  form,
  highlight,
  note,
  preview,
  fields,
  action,
  receivedAt,
}: Props) {
  /*
   * O que já está no título e na linha de apoio sai da tabela: repetir o mesmo
   * nome duas vezes é ruído. A comparação é por conteúdo porque cada
   * formulário chama o campo do destaque de um jeito ("Nome", "Nome do
   * colega") — e o `note` é escrito por nós, não pela pessoa, então não há
   * risco de esconder um campo por coincidência.
   */
  const shown = `${highlight} ${note ?? ""}`;
  const rows = fields.filter(
    // Campo vazio também sai: há coluna que só vale para parte dos cadastros
    // (o semestre de formatura) e que o CSV precisa manter mesmo em branco.
    (field) => field.value && !shown.includes(field.value),
  );

  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style dangerouslySetInnerHTML={{ __html: STYLE_SHEET }} />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Faixa escura com o logo, como o rodapé do site. */}
          <Row>
            <Column style={brandBar} align="center">
              <Img
                src={`${SITE_URL}/images/logo-auster-cream-email.png`}
                width="150"
                height="56"
                alt="Grupo Auster"
                style={logo}
              />
            </Column>
          </Row>

          <Row>
            <Column style={card}>
              <Section style={badgeTable}>
                <Row>
                  <Column style={badge}>{form}</Column>
                  {/* Absorve a sobra da linha para o selo ficar do tamanho do texto. */}
                  <Column width="100%" />
                </Row>
              </Section>

              <Heading as="h1" style={title}>
                {highlight}
              </Heading>

              {note ? <Text style={noteText}>{note}</Text> : null}

              <Text style={meta}>
                Recebido em {RECEIVED_AT.format(receivedAt)}
              </Text>

              {/* Tabela crua, e não um <Row> por campo: só com todas as linhas
                  na mesma tabela os valores alinham na mesma coluna. */}
              <table
                align="center"
                width="100%"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={fieldsTable}
              >
                <tbody>
                  {rows.map((field) => (
                    <tr key={field.label}>
                      <td
                        className="field-cell field-label"
                        style={fieldLabel}
                      >
                        {field.label}
                      </td>
                      <td
                        className="field-cell field-value"
                        style={fieldValue}
                      >
                        {field.href ? (
                          <Link href={field.href} style={fieldLink}>
                            {field.value}
                          </Link>
                        ) : (
                          field.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {action ? (
                <Button href={action.href} style={cta}>
                  {action.label}
                </Button>
              ) : null}
            </Column>
          </Row>

          <Row>
            <Column style={footer}>
              <Text style={footerText}>
                Enviado automaticamente pelo formulário de{" "}
                <Link href={SITE_URL} style={footerLink}>
                  austersaude.com.br
                </Link>
                .
              </Text>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
}

/* --------------------------------- estilos -------------------------------- */

const body = {
  margin: 0,
  padding: "32px 12px 40px",
  backgroundColor: CREAM,
  fontFamily: BODY_FONT,
  WebkitFontSmoothing: "antialiased" as const,
};

const container = { width: "100%", maxWidth: "600px" };

/*
 * Gradiente + brilho de menta reproduzem a `.section-dark` do site. Outlook
 * ignora background-image e fica com o `bgcolor` — daí a cor sólida próxima.
 */
const brandBar = {
  padding: "28px 32px 24px",
  backgroundColor: BRAND_900,
  backgroundImage: `radial-gradient(420px 220px at 88% 0%, rgba(46, 255, 172, 0.09), transparent 70%), linear-gradient(160deg, ${BRAND_950} 0%, ${BRAND_900} 45%, #0A2417 100%)`,
  borderRadius: "18px 18px 0 0",
  textAlign: "center" as const,
};

/*
 * A cor e a fonte valem para o texto alternativo: quando o cliente bloqueia
 * imagens, é ele que aparece em cima da faixa escura.
 */
const logo = {
  display: "inline-block",
  height: "56px",
  width: "150px",
  color: CREAM,
  fontFamily: HEADING_FONT,
  fontSize: "20px",
};

const card = {
  padding: "30px 32px 32px",
  backgroundColor: CARD,
  borderRadius: "0 0 18px 18px",
  borderLeft: `1px solid ${HAIRLINE}`,
  borderRight: `1px solid ${HAIRLINE}`,
  borderBottom: `1px solid ${HAIRLINE}`,
};

const badgeTable = { marginBottom: "16px" };

const badge = {
  padding: "6px 12px",
  backgroundColor: MINT,
  borderRadius: "999px",
  color: BRAND_600,
  fontFamily: BODY_FONT,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
};

const title = {
  margin: "0 0 6px",
  color: BRAND_800,
  fontFamily: HEADING_FONT,
  fontSize: "30px",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  lineHeight: 1.12,
};

const noteText = {
  margin: "0 0 4px",
  color: "#3E5044",
  fontFamily: BODY_FONT,
  fontSize: "15px",
  lineHeight: 1.5,
};

const meta = {
  margin: 0,
  color: MUTED,
  fontFamily: BODY_FONT,
  fontSize: "13px",
  lineHeight: 1.5,
};

const fieldsTable = { margin: "22px 0 0" };

/*
 * `width: 1%` + `nowrap` fazem a coluna encolher até o rótulo mais longo da
 * tabela, em vez de fixar uma largura que sobra num formulário e falta no
 * outro ("CPF" x "WhatsApp do colega").
 */
const fieldLabel = {
  width: "1%",
  whiteSpace: "nowrap" as const,
  padding: "14px 24px 14px 0",
  borderTop: `1px solid ${HAIRLINE}`,
  color: MUTED,
  fontFamily: BODY_FONT,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  lineHeight: 1.5,
  textTransform: "uppercase" as const,
  verticalAlign: "top" as const,
};

const fieldValue = {
  padding: "12px 0",
  borderTop: `1px solid ${HAIRLINE}`,
  color: BRAND_800,
  fontFamily: BODY_FONT,
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: 1.5,
  verticalAlign: "top" as const,
};

const fieldLink = {
  color: BRAND_500,
  fontWeight: 600,
  textDecoration: "underline",
  textDecorationColor: "rgba(27, 90, 58, 0.3)",
  textUnderlineOffset: "2px",
};

/* Pílula igual à do site: cheia, verde da marca, texto creme. */
const cta = {
  margin: "26px 0 0",
  padding: "14px 28px",
  backgroundColor: BRAND_600,
  borderRadius: "999px",
  color: CREAM,
  display: "inline-block",
  fontFamily: BODY_FONT,
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: 1,
  textDecoration: "none",
};

const footer = { padding: "20px 32px 0", textAlign: "center" as const };

const footerText = {
  margin: 0,
  color: MUTED,
  fontFamily: BODY_FONT,
  fontSize: "12px",
  lineHeight: 1.6,
};

const footerLink = { color: BRAND_500, textDecoration: "underline" };
