# Auster Design System

Identidade visual da Auster Saúde para uso em **todas as ferramentas da empresa** — site, painel de notas, e-mails e qualquer interface nova.

- **Fonte da verdade dos tokens:** [`app/globals.css`](app/globals.css) deste repositório. Mudanças de marca começam lá; este doc e a página visual são atualizados em seguida.
- **Versão visual (compartilhável):** https://claude.ai/code/artifact/180921fa-6fae-4b7d-920c-e1f57e5efc03
- Versão 1.0 · agosto de 2026

---

## 1. Conceito

“Auster” vem de *austero*: rigor técnico, sobriedade, confiança — o que um médico espera de quem cuida dos seus impostos. O sistema traduz isso em verdes profundos e serifa de autoridade, equilibrados pelo que torna a marca humana: fundo cor de papel, formas em pílula, brilhos de menta e fotos de gente real.

Quatro princípios guiam qualquer decisão visual:

1. **Sóbrio, nunca frio** — verde profundo e serifa séria, mas chão cream (cor de papel) e cantos generosos. Autoridade sem parecer banco.
2. **Verde profundo, menta como luz** — o verde Auster carrega a marca; a menta nunca é protagonista: brilho nas seções escuras, fundo de destaque, detalhe. Jamais texto sobre cream.
3. **Material, não plástico** — profundidade vem de gradientes CSS com grão sutil e vidro translúcido. Nunca partículas, three.js ou 3D decorativo (decisão de marca já revisada).
4. **Componentes prontos primeiro** — interfaces novas partem de shadcn/ui com estes tokens e ícones lucide. Não se desenha botão novo; CTAs são pílulas.

## 2. Logotipo

Duas versões de cor, nenhuma outra recoloração é permitida:

| Versão | Uso | Arquivo |
|---|---|---|
| Verde `#0A3925` | sobre cream ou branco | [`public/images/logo-auster.svg`](public/images/logo-auster.svg) |
| Cream `#FFFFED` | sobre verde escuro | [`public/images/logo-auster-cream.svg`](public/images/logo-auster-cream.svg) |
| Cream (PNG p/ e-mail) | cabeçalho de e-mails sobre `#0A3925` | [`public/images/logo-auster-cream-email.png`](public/images/logo-auster-cream-email.png) |

Regras:

- Área de respiro mínima: a altura do símbolo (os dois “A” entrelaçados) em todos os lados.
- Tamanho mínimo: 100 px de largura na tela; abaixo disso, use somente o símbolo.
- Sobre fotos, sempre com overlay escuro (gradiente da marca) e a versão cream.
- Nunca recolorir, distorcer ou recriar o logotipo em outra fonte.

## 3. Cores

Nomes de token seguem o padrão shadcn usado no site — mantenha os mesmos nomes nas outras ferramentas para o CSS ser portável.

### Papéis principais

| Token | Hex | Uso |
|---|---|---|
| `primary` (verde Auster) | `#0A3925` | CTAs, links, títulos de destaque, logo |
| `background` (cream) | `#FFFFED` | fundo padrão de páginas claras |
| `foreground` (tinta) | `#081B11` | texto sobre fundos claros |
| `secondary` / `accent` (menta) | `#E8FFE9` | fundos de destaque, chips, brilhos no escuro |
| `muted` | `#F1F1E2` | fundos rebaixados |
| `muted-foreground` | `#5A6B60` | texto secundário, legendas, ajuda |
| `border` / `input` | `#D9D9C6` | bordas de cards, inputs, divisores |
| `ring` | `#1B5A3A` | anel de foco, hover |
| `destructive` | `#B3261E` | erros e ações destrutivas, com parcimônia |
| clay | `#653024` | acento raro e editorial; nunca em CTAs |

### Escala de verdes (`brand-*`)

| Token | Hex | Papel |
|---|---|---|
| `brand-950` | `#05140D` | gradiente escuro — início |
| `brand-900` | `#06170F` | gradiente escuro — meio |
| `brand-800` | `#081B11` | texto sobre claro (= foreground) |
| `brand-700` | `#0A2417` | gradiente escuro — fim |
| `brand-600` | `#0A3925` | **primary** |
| `brand-500` | `#1B5A3A` | hover, ring, detalhes |

### Contraste (verificado)

- Cream sobre verde / verde sobre cream: **12,8:1 — AAA**. São os dois pares oficiais da marca.
- Menta sobre `brand-950`: **17,9:1 — AAA**.
- `muted-foreground` sobre cream: **5,6:1 — AA**.
- **Menta sobre cream não passa** — menta funciona como *fundo* em páginas claras ou como *texto/brilho* em fundos escuros, nunca como texto em fundo claro.

## 4. Tipografia

Duas famílias, papéis fixos:

- **Fraunces** (serifa de display, eixos `opsz` + `SOFT`) — títulos, números de destaque e a itálica ocasional. Nunca em texto corrido, botões, formulários ou caixa alta.
- **Instrument Sans** — corpo, interface, formulários, tabelas. Nunca em títulos de página.
- Fallbacks (e-mail incluso): Georgia para a Fraunces; Arial/Helvetica para a Instrument Sans.

Regras de títulos (já aplicadas globalmente no site):

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), serif; /* Fraunces */
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.08;
  text-wrap: balance;
}
p { line-height: 1.5; }
```

### Escala

| Papel | Fonte | Tamanho |
|---|---|---|
| h1 | Fraunces 600 | 38 px móvel · 54 px desktop |
| h2 | Fraunces 600 | 30–40 px |
| h3 | Fraunces 600 | 20–24 px |
| eyebrow | Instrument Sans 700 | 12 px · caixa alta · letter-spacing 0.14em |
| body | Instrument Sans 400 | 16–18 px · line-height 1.5 · ~60–65 caracteres por linha |
| small | Instrument Sans 400 | 13–14 px · cor `muted-foreground` (não opacidade) |

## 5. Elementos

Em projetos React tudo já existe pronto: shadcn/ui com os tokens da marca ([`components/ui/`](components/ui/)) + lucide-react.

- **Botão CTA (“xl”)** — pílula de 48 px, raio total, `px` 28 px, 15 px semibold, ícone lucide de 18 px. Hover clareia o fundo 20% (`bg-primary/80`); o clique afunda 1 px. Ver [`components/ui/button.tsx`](components/ui/button.tsx).
- **CTA de WhatsApp** — ícone WhatsApp + texto + seta; padrão de conversão em toda ferramenta voltada ao cliente. Ver [`components/cta-whatsapp.tsx`](components/cta-whatsapp.tsx).
- **Badge eyebrow** — pílula de 28 px com borda `primary/25`, fundo `card/60` com blur, texto 13 px em primary, ícone lucide de 14 px. Abre seções de destaque (é o do hero do site).
- **Badges de status** — sólidos: verde `primary` com texto cream, ou menta com texto verde.
- **Cards** — fundo branco puro sobre o cream, borda `#D9D9C6`, raio 2xl (21,6 px), padding ≥ 24 px, ícone lucide em tile de menta. Sem sombras fortes: a profundidade da marca vem de cor, não de sombra.
- **Formulários** — inputs de ~42 px, raio md, borda `#D9D9C6`; foco troca a borda por `#1B5A3A` com anel translúcido de 3 px. Rótulo semibold em cima, ajuda em muted embaixo, erros em `#B3261E`.

### Raio de canto

Base `--radius: 0.75rem`:

| Token | Valor | Uso |
|---|---|---|
| sm | 0.45rem | detalhes |
| md | 0.6rem | inputs, botões compactos |
| lg | 0.75rem | tiles |
| xl | 1.05rem | blocos |
| 2xl | 1.35rem | cards |
| full | pílula | CTAs, badges, avatares |

## 6. Superfícies

Páginas e ferramentas vivem no cream. Seções escuras são momentos de ênfase (hero, fechamento, números) e seguem **uma única receita** — as classes `.section-dark` e `.bg-noise` de [`app/globals.css`](app/globals.css):

- Gradiente linear a 170° entre `brand-950 → brand-900 → brand-700`. Nunca preto puro.
- Dois brilhos radiais de menta (`rgb(46 255 172)`) a 7% e 5% de opacidade — topo direito e base esquerda.
- Grão de 3,5% por cima (turbulência SVG em data-URI) para evitar banding.
- Cartões sobre o escuro são de vidro: `.glass-card` (fundo cream a 5%, borda cream a 12%, blur 8 px, raio 2xl).

## 7. Movimento, ícones e imagens

- **Movimento único da marca:** revelação no scroll — fade + deslocamento de 30 px + desfoque, ~1 s, uma vez só (`data-reveal` em globals.css). `prefers-reduced-motion` **obrigatório** em qualquer ferramenta: quem pede movimento reduzido vê tudo estático.
- **Ícones:** sempre lucide-react (traço 2 px). Nunca emoji nem SVG avulso de outra família.
- **Imagens:** fotos de pessoas reais, tons quentes, `quality={90}` (allowlist `images.qualities` no next.config).

### Sempre / Nunca

| ✓ Sempre | ✕ Nunca |
|---|---|
| Partir destes tokens (mesmos nomes e valores) em qualquer ferramenta nova | Partículas, three.js ou 3D decorativo |
| CTAs em pílula verde com ícone lucide; WhatsApp como canal padrão | Menta como texto sobre cream; verdes neon fora da escala |
| Títulos em Fraunces 600; corpo em Instrument Sans 16 px+ | Fraunces em parágrafos/botões/caixa alta; Instrument Sans em títulos |
| Profundidade com gradiente + grão + vidro, respeitando reduced-motion | Preto `#000` ou branco `#FFF` como fundo de página |
| Verde sobre cream ou cream sobre verde (pares AAA) | Recolorir o logo ou aplicá-lo sobre foto sem overlay |

## 8. Aplicação em outra ferramenta

### 8.1 Tailwind v4 + shadcn

Mesmo formato do site — copie de [`app/globals.css`](app/globals.css) os blocos `@theme inline` (paleta `--color-brand-*`, `--color-cream`, `--color-mint`, `--color-clay`, raios) e `:root` (tokens shadcn), mais as regras de `@layer base` para títulos e `::selection`.

### 8.2 CSS puro (qualquer stack)

```css
:root {
  /* Marca */
  --brand-950: #05140d;  /* gradiente escuro, início */
  --brand-900: #06170f;  /* gradiente escuro, meio   */
  --brand-800: #081b11;  /* texto sobre claro        */
  --brand-700: #0a2417;  /* gradiente escuro, fim    */
  --brand-600: #0a3925;  /* PRIMARY: CTAs, links     */
  --brand-500: #1b5a3a;  /* hover, foco (ring)       */
  --cream:     #ffffed;  /* fundo padrão             */
  --mint:      #e8ffe9;  /* destaque, brilhos        */
  --clay:      #653024;  /* acento raro              */
  --muted:     #f1f1e2;  /* fundos rebaixados        */
  --muted-fg:  #5a6b60;  /* texto secundário         */
  --border:    #d9d9c6;  /* bordas e inputs          */
  --error:     #b3261e;

  --radius: 0.75rem;     /* cards: 1.35rem · CTAs e badges: pílula */
  --font-heading: "Fraunces", Georgia, serif;
  --font-sans: "Instrument Sans", "Helvetica Neue", Arial, sans-serif;
}

body {
  background: var(--cream);
  color: var(--brand-800);
  font-family: var(--font-sans);
  line-height: 1.5;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.08;
}

/* Seção escura da marca (hero, fechamentos, números) */
.section-dark {
  color: var(--cream);
  background:
    radial-gradient(900px 500px at 85% 0%, rgb(46 255 172 / 0.07), transparent 70%),
    radial-gradient(700px 420px at 8% 100%, rgb(46 255 172 / 0.05), transparent 70%),
    linear-gradient(170deg, var(--brand-950) 0%, var(--brand-900) 45%, var(--brand-700) 100%);
}

/* Cartão de vidro sobre a seção escura */
.glass-card {
  background: rgb(255 255 237 / 0.05);
  border: 1px solid rgb(255 255 237 / 0.12);
  backdrop-filter: blur(8px);
  border-radius: 1.35rem;
}

/* CTA pílula */
.btn-auster {
  display: inline-flex; align-items: center; gap: 8px;
  height: 48px; padding: 0 28px; border-radius: 999px;
  background: var(--brand-600); color: var(--cream);
  font: 600 15px var(--font-sans); border: 0; cursor: pointer;
}
.btn-auster:hover { filter: brightness(1.25); }
.btn-auster:active { transform: translateY(1px); }
```

### 8.3 Fontes

HTML puro / ferramentas internas:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
```

Next.js (padrão do site, ver [`app/layout.tsx`](app/layout.tsx)):

```tsx
import { Fraunces, Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});
```

### 8.4 E-mail

Sem webfonts confiáveis: títulos em Georgia, corpo em Arial/Helvetica, cores sólidas (sem gradiente) e `logo-auster-cream-email.png` sobre `#0A3925` — como nos e-mails de lead em [`emails/`](emails/).
