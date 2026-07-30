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
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob, onde os leads viram CSV (ver [Leads](#leads)) |
| `LEADS_EXPORT_TOKEN` | Senha da rota que baixa o CSV. `openssl rand -hex 32` |

Sem as três primeiras, os formulários respondem 502 e registram o erro no log —
o resto do site funciona normalmente.

Em desenvolvimento, `http://localhost:3000/api/preview-email` mostra como fica
o e-mail que o time recebe (`?form=indicacao` para a outra variante). A rota
devolve 404 em produção.

O logo da faixa escura é o PNG em `public/images/logo-auster-cream-email.png` —
cliente de e-mail não renderiza SVG. Se o logo mudar, regrave o arquivo a partir
do SVG:

```bash
sips -s format png --resampleWidth 300 public/images/logo-auster-cream.svg \
  --out public/images/logo-auster-cream-email.png
```

## Leads

Cada envio vai por e-mail (Resend) **e** é gravado em um CSV no Vercel Blob, um
arquivo por formulário:

- `leads/quero-ser-auster.csv`
- `leads/indicacao.csv`

O e-mail é o aviso; o CSV é o registro. Se a gravação falhar, o envio continua
(e vice-versa) — só a falha do e-mail devolve 502 para quem preencheu.

### Criando o store

Em **Storage → Create Database → Blob**, com acesso **Private**, e conecte ao
projeto. Privado porque os leads têm CPF, e-mail e endereço: em um store
público, qualquer pessoa com a URL leria o arquivo inteiro. **O modo de acesso
não pode ser alterado depois da criação.**

### Baixando o CSV

Pelo painel da Vercel, em **Storage → seu store**, navegando até `leads/`.

Ou pelo site, sem passar pelo painel:

```
https://SEU-DOMINIO/api/leads/export?form=quero-ser-auster&token=LEADS_EXPORT_TOKEN
https://SEU-DOMINIO/api/leads/export?form=indicacao&token=LEADS_EXPORT_TOKEN
```

O link contém a senha — trate como link secreto e não compartilhe em grupo.

### Detalhes

O CSV usa `;` e BOM UTF-8, então o Excel em português abre já com as colunas
separadas e os acentos certos. Valores começando com `=`, `+`, `-` ou `@`
recebem um apóstrofo na frente para o Excel não tratar como fórmula.

O Blob não tem "append": [lib/leads-store.ts](lib/leads-store.ts) lê o arquivo,
acrescenta a linha e regrava usando `ifMatch` com a ETag lida, repetindo se
outra submissão gravou no meio do caminho. Sem isso, dois envios simultâneos
perderiam uma das linhas.

As colunas saem dos `label` dos campos na primeira gravação. Mudar a ordem ou
os nomes depois desalinha as linhas antigas — nesse caso, troque o nome do
arquivo em `LEAD_FILES` para começar um CSV novo.

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
| Colunas e nomes dos CSVs de lead | [lib/leads-store.ts](lib/leads-store.ts) |
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
