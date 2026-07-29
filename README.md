# Auster Saúde

Site institucional do Grupo Auster, reconstruído em Next.js a partir do site
WordPress/Elementor que rodava em `novosite.austersaude.com.br`.

São 3 páginas estáticas (`/`, `/quero-ser-auster`, `/indicacao`) e dois formulários
que enviam os leads por e-mail via Resend.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- react-hook-form + zod
- Resend + React Email
- Deploy na Vercel

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

| Variável | Para que serve |
|---|---|
| `RESEND_API_KEY` | Chave da API do [Resend](https://resend.com/api-keys) |
| `LEAD_TO_EMAIL` | Destino dos leads (aceita vários e-mails separados por vírgula) |
| `LEAD_FROM_EMAIL` | Remetente. O domínio precisa estar verificado no Resend |
| `NEXT_PUBLIC_SITE_URL` | Domínio público (canonical, sitemap, Open Graph) |

Sem as três primeiras, os formulários respondem 502 e registram o erro no log —
o resto do site funciona normalmente.

Em desenvolvimento, `http://localhost:3000/api/preview-email` mostra como fica
o e-mail que o time recebe. A rota devolve 404 em produção.

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Textos da home | [lib/content.ts](lib/content.ts) |
| Telefone do WhatsApp, itens do menu, domínio | [lib/site.ts](lib/site.ts) |
| Cores, fundos das seções, animações de scroll | [app/globals.css](app/globals.css) |
| Fontes (Fraunces + Instrument Sans) | [app/layout.tsx](app/layout.tsx) |
| Variantes e tamanhos dos botões | [components/ui/button.tsx](components/ui/button.tsx) |
| Campos e validação dos formulários | [lib/schemas.ts](lib/schemas.ts) |
| Conteúdo do e-mail de lead | [emails/lead-email.tsx](emails/lead-email.tsx) |
| Redirects das URLs antigas do WordPress | [next.config.ts](next.config.ts) |

As seções da home ficam em [components/home/](components/home/), uma por arquivo,
na mesma ordem em que aparecem na página.

## Mídias

As imagens vieram do WordPress e estão em `public/images` **nos bytes originais**
(sem recompressão) — o `next/image` otimiza na entrega, e as fotos principais
usam `quality={90}` (allowlist em `next.config.ts`). O script
[scripts/fetch-media.mjs](scripts/fetch-media.mjs) lê as URLs do export em
`_source/` e baixa o que estiver faltando; ícones e fundos que viraram
componentes (lucide) ou gradientes CSS foram removidos da pasta.

`_source/` guarda o export original do WordPress (XML) e a estrutura da home
exportada do Elementor (JSON). Não entram no build; ficam versionados como
referência do que foi migrado.

## Diferenças em relação ao site antigo

Mudanças conscientes, todas fáceis de reverter:

- **Vídeos de depoimento** carregam só no clique (thumbnail local + iframe sob demanda),
  em vez de 4 iframes do YouTube no carregamento inicial.
- **Animações de scroll** usam IntersectionObserver + CSS, sem a biblioteca Lenis,
  e respeitam `prefers-reduced-motion`.
- **Formulários** validam no cliente e no servidor, têm máscara de CPF/telefone,
  honeypot e rate limit — o Contact Form 7 não tinha nada disso.
- **Checkbox de consentimento (LGPD)** nos dois formulários: não existia antes.
  Remover em [components/forms/consent-field.tsx](components/forms/consent-field.tsx)
  e no schema, se não for desejado.
- **Botão flutuante do WhatsApp**: adição nossa
  ([components/layout/whatsapp-float.tsx](components/layout/whatsapp-float.tsx)).
- **Rodapé** ganhou links de navegação e linha de copyright; o original só tinha o logo.
- **Labels dos campos** existem para leitores de tela (`sr-only`), mantendo o
  visual original de placeholder-only.
