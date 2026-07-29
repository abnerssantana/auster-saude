import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  title: string;
  preview: string;
  fields: Array<{ label: string; value: string }>;
};

/** Template único dos dois formulários — muda só o título e os campos. */
export function LeadEmail({ title, preview, fields }: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>{title}</Heading>
          <Hr style={hr} />
          <Section>
            {fields.map((field) => (
              <Text key={field.label} style={row}>
                <strong style={label}>{field.label}:</strong> {field.value}
              </Text>
            ))}
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Enviado pelo formulário do site austersaude.com.br
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#FFFFED",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
};

const heading = {
  color: "#0A3925",
  fontSize: "20px",
  fontWeight: 600,
  margin: "0 0 8px",
};

const hr = { borderColor: "#D9D9C6", margin: "16px 0" };

const row = { color: "#081B11", fontSize: "15px", margin: "0 0 10px" };

const label = { color: "#0A3925" };

const footer = { color: "#5A6B60", fontSize: "12px", margin: 0 };
