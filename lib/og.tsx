import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_URL } from "@/lib/site";

/** 1200x630 é o formato que Facebook, WhatsApp, LinkedIn e X esperam. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
 * Cores espelhadas de app/globals.css — o Satori não lê CSS nem variáveis,
 * então a paleta precisa estar literal aqui. Ao mexer nos tokens, ajuste os dois.
 */
const CREAM = "#ffffed";
const BRAND_950 = "#05140d";
const BRAND_900 = "#06170f";
const BRAND_700 = "#0a2417";
const MINT = "#e8ffe9";

const glow = (alpha: number) => `rgba(46, 255, 172, ${alpha})`;
const cream = (alpha: number) => `rgba(255, 255, 237, ${alpha})`;

/*
 * O Satori ignora as palavras-chave de extensão (`closest-side` e afins) e usa
 * sempre farthest-corner, o que deixava o gradiente ainda visível na borda da
 * caixa e desenhava um disco de contorno duro. Por isso os stops são explícitos
 * e chegam a zero antes do fim do quadrado.
 */
const glowGradient = (alpha: number) =>
  `radial-gradient(circle, ${glow(alpha)} 0%, ${glow(alpha * 0.4)} 32%, ${glow(0)} 66%)`;

/*
 * Caminhos literais de propósito: o tracer do Turbopack precisa resolver os
 * arquivos estaticamente. Montá-los a partir de uma variável faz ele incluir
 * o projeto inteiro no bundle da rota.
 */
async function loadBrandAssets() {
  const root = process.cwd();
  const [fraunces, sans, sansSemiBold, logo] = await Promise.all([
    readFile(join(root, "assets/fonts/Fraunces-SemiBold.ttf")),
    readFile(join(root, "assets/fonts/InstrumentSans-Regular.ttf")),
    readFile(join(root, "assets/fonts/InstrumentSans-SemiBold.ttf")),
    readFile(join(root, "public/images/logo-auster-cream.svg"), "base64"),
  ]);

  return {
    fonts: [
      { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      { name: "Instrument Sans", data: sans, weight: 400, style: "normal" },
      {
        name: "Instrument Sans",
        data: sansSemiBold,
        weight: 600,
        style: "normal",
      },
    ] as const,
    logoSrc: `data:image/svg+xml;base64,${logo}`,
  };
}

/** Títulos longos precisam encolher para não estourar os 630px de altura. */
function titleFontSize(title: string) {
  if (title.length > 62) return 52;
  if (title.length > 42) return 62;
  return 72;
}

type OgImageProps = {
  /** Rótulo curto acima do título, nomeando a seção. Omitido na home, onde o logo já basta. */
  eyebrow?: string;
  title: string;
  description: string;
};

export async function renderOgImage({
  eyebrow,
  title,
  description,
}: OgImageProps) {
  const { fonts, logoSrc } = await loadBrandAssets();
  const domain = new URL(SITE_URL).host.replace(/^www\./, "");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: BRAND_950,
          backgroundImage: `linear-gradient(170deg, ${BRAND_950} 0%, ${BRAND_900} 45%, ${BRAND_700} 100%)`,
          fontFamily: "Instrument Sans",
          color: CREAM,
        }}
      >
        {/* brilhos de menta — mesma composição de .section-dark */}
        <div
          style={{
            position: "absolute",
            top: -420,
            right: -300,
            width: 900,
            height: 900,
            borderRadius: "50%",
            backgroundImage: glowGradient(0.2),
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -400,
            left: -320,
            width: 800,
            height: 800,
            borderRadius: "50%",
            backgroundImage: glowGradient(0.13),
          }}
        />

        {/* anéis concêntricos — a mesma arte do hero e do CTA final */}
        <div
          style={{
            position: "absolute",
            top: 55,
            right: -170,
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: `1px solid ${cream(0.1)}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 135,
            right: -90,
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: `1px solid ${cream(0.16)}`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "58px 72px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={172} height={64} />

          <div
            style={{ display: "flex", flexDirection: "column", maxWidth: 830 }}
          >
            {eyebrow ? (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  marginBottom: 26,
                  padding: "9px 20px",
                  borderRadius: 999,
                  border: `1px solid ${cream(0.16)}`,
                  backgroundColor: cream(0.05),
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: 1.8,
                  textTransform: "uppercase",
                  color: MINT,
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: titleFontSize(title),
                lineHeight: 1.06,
                letterSpacing: -1.2,
              }}
            >
              {title}
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 26,
                lineHeight: 1.45,
                color: cream(0.72),
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              color: cream(0.6),
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: MINT,
              }}
            />
            {domain}
            <div
              style={{
                width: 1,
                height: 24,
                backgroundColor: cream(0.2),
              }}
            />
            Contabilidade especializada em médicos
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [...fonts] },
  );
}
