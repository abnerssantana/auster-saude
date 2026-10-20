/**
 * Conteúdo do Auster Next, o app do grupo, para a vitrine da home e a página
 * /auster-next. Os textos seguem a landing e o /plataforma de
 * austernext.com.br, que lá são conferidos contra o código do produto: ao
 * mudar o app, confira aqui também. Preço fica de fora de propósito (vive no
 * banco de lá e muda); quem quer comparar planos vai para o /planos do app.
 *
 * As ilustrações são capturas das telas desenhadas da landing do app (dados
 * fictícios), com fundo transparente, exportadas em AVIF a 2–3x.
 */

import heroDevices from "@/public/images/auster-next/hero-devices.avif";
import webVisaoGeral from "@/public/images/auster-next/web-visao-geral.avif";
import webFinanceiro from "@/public/images/auster-next/web-financeiro.avif";
import webContabilidade from "@/public/images/auster-next/web-contabilidade.avif";
import openFinance from "@/public/images/auster-next/open-finance.avif";
import documentos from "@/public/images/auster-next/documentos.avif";
import phonesAgenda from "@/public/images/auster-next/phones-agenda.avif";
import phonesCelular from "@/public/images/auster-next/phones-celular.avif";

/** Data da última revisão da página, para o <lastmod> do sitemap. */
export const AUSTER_NEXT_UPDATED_AT = "2026-10-20";

/**
 * Link para o app com UTM: o GA4 de lá separa quem chegou pela vitrine da home
 * de quem chegou pela página dedicada.
 */
export function austerNextUrl(path: string, campaign: "home" | "pagina") {
  const url = new URL(path, "https://austernext.com.br");
  url.searchParams.set("utm_source", "austersaude");
  url.searchParams.set("utm_medium", "site");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export const AUSTER_NEXT = {
  eyebrow: "Auster Next · o app da Auster",
  title: "A plataforma financeira definitiva para o médico.",
  description:
    "Financeiro da pessoa física e da PJ, integração direta com o seu banco, a Auster Contabilidade, agenda de compromissos e plantões e os seus documentos à mão. Na web, no iPhone e no Android.",
  points: [
    "Controle financeiro da pessoa física e da PJ",
    "Integração direta com o seu banco",
    "Integração com a Auster Contabilidade",
    "Agenda de compromissos pessoais e plantões",
    "Arquivo de documentos (tudo à mão, de forma fácil e rápida)",
  ],
  more: "E muito mais",
  cta: "Escolha seu plano",
  secondary: "Veja como funciona",
  // O teste grátis vem de billing_settings lá; se mudar, ajuste aqui.
  note: "Teste 7 dias grátis · Versão web, iPhone e Android",
  devices: {
    src: heroDevices,
    alt: "Auster Next no celular: o financeiro da pessoa física no iPhone, a agenda do mês e a contabilidade da PJ no Android.",
  },
  features: [
    {
      title: "Financeiro PF e PJ",
      body: "Pessoal e empresa separados, no mesmo painel.",
    },
    {
      title: "Open Finance",
      body: "Os lançamentos chegam do banco sozinhos. Sem baixar extrato.",
    },
    {
      title: "Agenda completa",
      body: "Compromissos pessoais e plantões, com o valor de cada hospital.",
    },
    {
      title: "Documentos à mão",
      body: "Tudo guardado na plataforma, pronto pra consultar ou enviar.",
    },
    {
      title: "Contabilidade integrada",
      body: "Cliente Auster Contabilidade recebe guias e obrigações direto aqui.",
    },
  ],
};

type Detalhe = { title: string; body: string };

export const POR_DENTRO = {
  eyebrow: "Por dentro",
  title: "O seu dia e o seu dinheiro na mesma tela.",
  lead: "A primeira tela depois do login responde o que importa agora: o que está esperando por você, como fecha o mês da PF e da PJ e o que vem na agenda.",
  image: {
    src: webVisaoGeral,
    alt: "Visão geral do Auster Next na web: um aviso de guia vencendo e o resumo financeiro da pessoa física e da PJ lado a lado.",
  },
  details: [
    {
      title: "Precisa de você",
      body: "Conta vencida, guia da contabilidade, pedido do contador, lançamento para revisar: o que espera uma ação sua, na ordem do que dói mais.",
    },
    {
      title: "PF e PJ lado a lado",
      body: "O saldo do mês da pessoa física e da PJ, com as entradas e as despesas de cada uma.",
    },
    {
      title: "O seu dia",
      body: "Os próximos compromissos e os lembretes que estão chegando, sem abrir a agenda.",
    },
    {
      title: "Com o contador",
      body: "Com a contabilidade contratada, o seu contador e o que ele enviou ficam a um clique.",
    },
  ] satisfies Detalhe[],
};

export const FINANCEIRO = {
  eyebrow: "Financeiro PF e PJ",
  title: "Pessoal e empresa, cada um no seu livro.",
  lead: "O controle que um bom app de finanças daria, pensado para quem tem PF e PJ. Sem jargão: verde é o que entra, vermelho é o que sai, e o saldo da tela bate com o extrato.",
  image: {
    src: webFinanceiro,
    alt: "Financeiro da PJ no Auster Next: saldo, entradas e despesas do mês, os últimos lançamentos vindos do banco e as contas e cartões.",
  },
  details: [
    {
      title: "Pessoal e empresa separados",
      body: "A PF e a PJ têm saldos, contas e resultados próprios. Os relatórios mostram cada uma sozinha ou as duas somadas.",
    },
    {
      title: "Um botão para registrar tudo",
      body: "Despesa, receita ou transferência no mesmo formulário: única, parcelada ou fixa todo mês. Compra no cartão já cai na fatura certa.",
    },
    {
      title: "Pró-labore sem confusão",
      body: "Transferência entre a PF e a PJ pede o motivo (pró-labore, distribuição de lucros, aporte) e não infla a receita nem a despesa de nenhum dos lados.",
    },
    {
      title: "A pagar e a receber",
      body: "Os vencimentos do período num lugar, com baixa em um clique. As contas fixas geram os próximos vencimentos sozinhas.",
    },
    {
      title: "Metas e orçamento",
      body: "Teto de despesa, meta de receita e meta de economia, com o progresso calculado sozinho.",
    },
    {
      title: "Relatórios para levar",
      body: "Fluxo de caixa, gastos por categoria e comparação com o período anterior, exportados em PDF, CSV ou Excel.",
    },
  ] satisfies Detalhe[],
};

export const OPEN_FINANCE = {
  eyebrow: "Open Finance",
  title: "Conecte o banco uma vez. O resto chega sozinho.",
  lead: "Nada de baixar extrato, digitar lançamento ou montar planilha: entradas, despesas e compras no cartão entram no Auster Next por conta própria.",
  image: {
    src: openFinance,
    alt: "Bancos conectados por Open Finance (contas da PF e da PJ e o cartão) e os lançamentos que chegaram do banco já categorizados.",
  },
  steps: [
    {
      title: "Escolha o banco",
      body: "Contas e cartões, da pessoa física e da PJ, em quantos bancos você usar.",
    },
    {
      title: "Autorize no próprio banco",
      body: "O consentimento é dado no ambiente do seu banco. A Auster não vê nem guarda a sua senha, e você revoga quando quiser.",
    },
    {
      title: "Pronto: o resto é automático",
      body: "Os lançamentos chegam sozinhos e já categorizados, a fatura do cartão se monta e o saldo da tela bate com o extrato.",
    },
  ] satisfies Detalhe[],
  note: "Só leitura: o Auster Next não movimenta o seu dinheiro.",
};

export const AGENDA = {
  eyebrow: "Agenda e plantões",
  title: "Consultas, plantões e a vida, no mesmo calendário.",
  lead: "A agenda sabe quanto vale cada plantão, quais horários estão livres para consulta e quando vence o IPVA. E manda o plantão feito direto para o financeiro.",
  image: {
    src: phonesAgenda,
    alt: "Agenda do Auster Next no iPhone: as consultas do dia com o plantão da noite e a visão do mês com os compromissos pessoais.",
  },
  details: [
    {
      title: "O valor de cada hospital",
      body: "Cadastre os hospitais onde você dá plantão. Escolheu o hospital, o local, o horário e o valor vêm preenchidos.",
    },
    {
      title: "Plantão feito vira receita",
      body: "Marcou o plantão como realizado, o valor entra como receita no financeiro da PJ.",
    },
    {
      title: "Junto com o Google e a Apple",
      body: "Assine a sua agenda no Google Agenda ou no Calendário da Apple e traga até cinco calendários de fora para ver tudo num lugar.",
    },
    {
      title: "Lembretes que não deixam passar",
      body: "IPVA, licenciamento, anuidade do CRM, declaração do IR e CNH, com aviso de 7 a 90 dias antes.",
    },
  ] satisfies Detalhe[],
};

export const DOCUMENTOS = {
  eyebrow: "Documentos",
  title: "Os documentos da carreira, à mão.",
  lead: "Diploma, CRM, títulos, certificados e os documentos pessoais guardados num cofre só. Quando o hospital ou a cooperativa pedir, você manda em segundos, do computador ou do celular.",
  image: {
    src: documentos,
    alt: "Documentos profissionais guardados no Auster Next (CRM, diploma e título de especialista) e um link seguro com prazo para o hospital.",
  },
  details: [
    {
      title: "O checklist da carreira",
      body: "Pessoais e profissionais (diploma, CRM, residência, RQE, títulos): você vê o que já está guardado e o que falta.",
    },
    {
      title: "Mande para quem pedir",
      body: "Até 20 documentos por vez, pelo WhatsApp, por e-mail ou por link, com o texto pronto.",
    },
    {
      title: "Link com prazo",
      body: "O link vale 1, 7 ou 30 dias, mostra quantas vezes foi aberto e pode ser revogado a qualquer momento.",
    },
  ] satisfies Detalhe[],
};

export const CONTABILIDADE = {
  eyebrow: "Contabilidade",
  title: "A contabilidade da sua PJ, dentro do app.",
  lead: "A Auster também é contabilidade. No plano Médico + Contabilidade, a sua PJ é atendida pela Auster e tudo o que o contador faz chega pelo próprio app.",
  image: {
    src: webContabilidade,
    alt: "Contabilidade no Auster Next: guias da competência com valor e situação e um pedido do contador aguardando resposta.",
  },
  details: [
    {
      title: "Guias prontas para pagar",
      body: "DAS, INSS, ISS e as demais guias chegam com vencimento, PDF, linha digitável e PIX, e entram nas suas contas a pagar.",
    },
    {
      title: "Pagou, virou despesa",
      body: "Ao dar baixa na guia, a despesa entra sozinha no financeiro certo, PF ou PJ.",
    },
    {
      title: "Agenda de entregas",
      body: "As obrigações do mês com o prazo de cada uma, e aviso por e-mail quando algo está para vencer.",
    },
    {
      title: "Pedidos do contador",
      body: "Ele pede, com prazo; você responde anexando os arquivos, sem procurar e-mail antigo.",
    },
    {
      title: "Documentos da empresa",
      body: "Contrato social, cartão CNPJ, certidões e declarações por ano, prontos para baixar ou enviar.",
    },
    {
      title: "Os mesmos números",
      body: "Você decide se o contador vê as finanças da PF, da PJ ou das duas.",
    },
  ] satisfies Detalhe[],
  cta: "Quero a Auster na minha PJ",
};

export const CELULAR = {
  eyebrow: "Web, iPhone e Android",
  title: "Uma conta. Web, iPhone e Android.",
  lead: "Os aplicativos são nativos e usam a mesma conta da web. O que você registra entre um plantão e outro já está no computador quando você chega em casa.",
  image: {
    src: phonesCelular,
    alt: "Financeiro do Auster Next no iPhone (pessoa física) e no Android (PJ), com saldo do mês e últimos lançamentos.",
  },
  details: [
    { title: "iPhone", body: "Na App Store. Também abre no iPad." },
    { title: "Android", body: "Pelo aplicativo da página de downloads do Auster Next." },
    {
      title: "Entre como preferir",
      body: "E-mail e senha, Google ou Apple, com o mesmo e-mail do seu cadastro.",
    },
  ] satisfies Detalhe[],
  cta: "Baixar o aplicativo",
};

export const FAQ_AUSTER_NEXT = [
  {
    question: "O que muda entre os planos?",
    answer:
      "O plano Médico tem o financeiro PF e PJ, o Open Finance, a agenda, os documentos e os aplicativos. O Médico + Contabilidade soma a contabilidade da sua PJ feita pela Auster, com guias, entregas, pedidos e documentos da empresa chegando pelo app.",
  },
  {
    question: "Como funciona a conexão com o banco?",
    answer:
      "Por Open Finance, com consentimento seu e revogável quando quiser. O Auster Next lê saldos e lançamentos de contas e cartões, pessoais e da empresa, para o saldo da tela bater com o extrato. Não movimenta dinheiro.",
  },
  {
    question: "Sou cliente da Auster Contabilidade. Como entro?",
    answer:
      "Recebeu um convite da Auster? Abra o link do e-mail e defina a senha. Se ainda não recebeu, fale com o seu consultor pelo WhatsApp.",
  },
  {
    question: "Preciso digitar os lançamentos?",
    answer:
      "Não, se conectar o banco: pelo Open Finance eles chegam sozinhos e já categorizados. Registrar à mão continua possível, para o dinheiro em espécie ou uma conta que você não conectou.",
  },
  {
    question: "Consigo levar os meus dados se sair?",
    answer:
      "Sim. Os relatórios exportam em PDF, CSV ou Excel e, em Minha conta › Privacidade, você baixa todos os seus dados num arquivo.",
  },
];

export const CHAMADA_FINAL = {
  title: "O seu dinheiro e o seu dia, a um login.",
  body: "Crie a sua conta em um minuto e use tudo por 7 dias, sem pagar nada. Já é assinante? Entre com e-mail e senha, Google ou Apple.",
  cta: "Criar conta",
  secondary: "Ver os planos",
};
