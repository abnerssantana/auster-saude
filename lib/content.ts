/**
 * Todo o conteúdo editorial da Home, transcrito do export do Elementor
 * (_source/elementor-551-2026-07-29.json). Alterar textos aqui, não nos componentes.
 *
 * As imagens entram por import estático (e não por string "/images/..."): o
 * Next injeta um hash do conteúdo na URL e serve o arquivo com
 * `Cache-Control: public, max-age=31536000, immutable`. Isso vale tanto para o
 * arquivo original quanto para as versões otimizadas do /_next/image, que
 * herdam o max-age do upstream. Trocar a imagem troca o hash, então não existe
 * risco de cache preso.
 */

import avatar1 from "@/public/images/Ellipse-177.webp";
import avatar2 from "@/public/images/Ellipse-178.webp";
import avatar3 from "@/public/images/Ellipse-179.webp";
import avatar4 from "@/public/images/Ellipse-180.webp";
import solucaoTributario from "@/public/images/Frame-61-5.avif";
import solucaoAberturaPj from "@/public/images/Frame-61-4.avif";
import solucaoCertificacao from "@/public/images/Frame-61-3.avif";
import solucaoCredenciamento from "@/public/images/Frame-61-2.avif";
import solucaoContabil from "@/public/images/Frame-61-1.avif";
import solucaoRecuperacao from "@/public/images/Frame-61-6.avif";
import solucaoSeguros from "@/public/images/image-134.avif";
import solucaoPatrimonio from "@/public/images/image-135.avif";
import depoimentoMariana from "@/public/images/Rectangle-6684.avif";
import depoimentoPriscila from "@/public/images/Sem-Titulo-3.avif";
import depoimentoMateus from "@/public/images/mateus.avif";
import depoimentoPaola from "@/public/images/Rectangle-6685.avif";
import videoWilliam from "@/public/images/videos/GkOl3-RAq-I.avif";
import videoEmanuelle from "@/public/images/videos/4KWFcgxtf_0.avif";
import videoJussara from "@/public/images/videos/3tSwpX0jZxA.avif";
import videoNatalia from "@/public/images/videos/IIskME0bFqg.avif";

export const HERO = {
  title: "Um ecossistema para o médico que sabe onde quer chegar.",
  body: "Somos especializados em médicos e olhamos para cada cliente de forma individual e criteriosa. Usamos tecnologia para potencializar nosso trabalho mas nenhum sistema substitui o olhar humano de quem realmente entende sua realidade: plantões, prazos, transição de carreira.",
  cta: "Converse com o consultor",
};

export const SOCIAL_PROOF = {
  avatars: [avatar1, avatar2, avatar3, avatar4],
  text: "+ centenas de médicos já tomaram essa decisão",
};

export const DIAGNOSTICO = {
  title:
    "Seu plantão rende mais quando o imposto é pago do jeito certo. Garanta isso agora.",
  body: "Dois médicos podem trabalhar no mesmo lugar, na mesma função, e terminar o mês com valores bem diferentes no bolso. A diferença não está no que eles ganham está em como pagam os impostos: quem faz o enquadramento certo paga só o que deve; quem erra, paga a mais. Garanta que você estará do lado certo.",
  cta: "FAÇA SEU DIAGNÓSTICO GRATUITO",
};

export const ATENDIMENTO = {
  paragraphs: [
    "Você já passou pela frustração de esperar dias por uma resposta da sua contabilidade? Ou de receber taxas extras que nunca foram combinadas? Na hora que você mais precisa, vem uma mensagem automática ou uma resposta genérica?",
    "**Na Auster, isso não existe.**",
    "Cada médico tem atendimento individualizado, ágil e transparente. Enquanto outras contabilidades complicam, nós simplificamos.",
  ],
};

export const DIFERENCIAIS = {
  title: "Nossos diferencias reais:",
  items: [
    "Atendimento humano, sem chatbots e sem enrolação.",
    "Contratação direta, sem taxas escondidas ou surpresas no contrato.",
    "Agilidade na abertura de PJ e na emissão de notas fiscais.",
    "Organização completa para que você tenha clareza desde o primeiro dia.",
    "App próprio para acompanhar tudo na palma da sua mão.",
  ],
};

export const SOLUCOES = {
  title: "Soluções especializadas para médicos:",
  items: [
    {
      title: "Planejamento Tributário",
      description: "Definição do melhor regime para pagar menos imposto.",
      image: solucaoTributario,
    },
    {
      title: "Abertura de PJ Médica",
      description: "Empresa rápida, regular e sem burocracia.",
      image: solucaoAberturaPj,
    },
    {
      title: "Certificação Digital",
      description: "Emissão e suporte completos.",
      image: solucaoCertificacao,
    },
    {
      title: "Credenciamentos Médicos",
      description:
        "Registro em operadoras e convênios, além de assessoria completa para credenciamentos e contratações em órgãos públicos e privados — incluindo hospitais e prefeituras.",
      image: solucaoCredenciamento,
    },
    {
      title: "Gestão Contábil Consultiva",
      description: "Acompanhamento contínuo focado em médicos.",
      image: solucaoContabil,
    },
    {
      title: "Recuperação de Tributos",
      description: "Análise e restituição de impostos pagos a mais.",
      image: solucaoRecuperacao,
    },
    {
      title: "Seguros para médicos",
      description:
        "Seguro de Responsabilidade Civil, Seguro de Vida e Seguro de Automóveis.",
      image: solucaoSeguros,
    },
    {
      title: "Sua proteção patrimonial.",
      description:
        "Estratégias para preservar seus bens e proteger tudo o que você construiu ao longo da vida.",
      image: solucaoPatrimonio,
    },
  ],
};

export const RESULTADOS = {
  titleHtml:
    "Um cliente Auster economizou mais de <u>R$ 10 mil por mês</u> apenas trocando de contabilidade.",
  paragraphs: [
    "Outro recuperou R$ 47 mil em impostos pagos indevidamente.",
    "Resultados como esses acontecem porque temos uma missão clara: cuidar das suas finanças para que você foque em cuidar de pessoas.",
  ],
  depoimentosTitle: "Médicos que já escolheram a Auster:",
};

export const DEPOIMENTOS = [
  {
    name: "Mariana Siqueira Leite - UNIARP",
    image: depoimentoMariana,
    paragraphs: [
      "Ter a Auster Contabilidade facilitou muito minha vida. Eu não fico presa a horário, porque eles respondem a qualquer momento, e sempre com pessoas de verdade — nunca robô.",
      "Quando preciso de algum documento, recebo no mesmo dia. Não preciso ficar lembrando de enviar notas ou comprovantes, porque eles mesmos encaminham tudo automaticamente para os lugares onde trabalho. Isso tira um peso enorme da rotina.",
      "O aplicativo deles também ajuda muito: consigo ver documentos e boletos de forma simples, sem confusão.",
      "No fim, é aquela contabilidade que realmente resolve e te deixa tranquila, por um preço justo. É uma preocupação a menos no dia a dia — e isso, pra mim, faz toda a diferença.",
    ],
  },
  {
    name: "Dra Priscila - UNOESC",
    image: depoimentoPriscila,
    paragraphs: [
      "Desde antes de me formar, a Auster sempre me auxiliou em todos os processos burocráticos e contábeis que precisei (foram e ainda são muitos). Sempre fui atendida com muita dedicação e excelência, além de agilidade nos processos. Sem contar na disponibilidade para resolver os problemas quando eu preciso, de maneira fácil pelo WhatsApp. A carreira médica por si só já é agitada e cheia de aflições e desafios, saber com quem contar para tornar tudo mais simples e acessível é ótimo. Sou muito satisfeita com os serviços prestados, agradeço e indico a Auster sem nenhuma dúvida!",
    ],
  },
  {
    name: "Mateus Campanelli - FURB",
    image: depoimentoMateus,
    paragraphs: [
      "Meu nome é Mateus, médico e cliente da Auster Contabilidade. Além de fazerem uma boa gestão contábil da minha PJ, sempre tiram as minhas dúvidas no mesmo dia e são bem acessíveis para resolver problemas e dar orientações. O diferencial da Auster é essa proximidade, que te dá mais segurança e tranquilidade!",
    ],
  },
  {
    name: "Paola Lima - UNIARP",
    image: depoimentoPaola,
    paragraphs: [
      "Eu queria agradecer por todo trabalho que a Auster tem feito por mim!! A gente sai da faculdade muito perdido nessa questão financeira, de impostos, descontos, trabalho… se não fosse por vocês tenho certeza que eu estaria perdendo muito dinheiro 😅",
      "Sem contar todo suporte que vocês dão na oportunidades de trabalho, avaliação dos editais e contratos que eu mando, é surreal pensar que uma contabilidade oferece todo esse apoio, e que responde super rápido também 🙌🏼🫶🏼",
      "Eu recomendo pra todos que estão se formando, é muito útil e necessário ter um serviço como o de vocês na nossa carreira médica!",
    ],
  },
];

export const VIDEO_DEPOIMENTOS = [
  {
    id: "GkOl3-RAq-I",
    name: "Dr. ⁠William Guzi",
    subtitle: "CRM 38359",
    thumb: videoWilliam,
  },
  {
    id: "4KWFcgxtf_0",
    name: "Dra. Emanuelle Kuller",
    subtitle: "CRM 41180",
    thumb: videoEmanuelle,
  },
  {
    id: "3tSwpX0jZxA",
    name: "Jussara Panceri",
    subtitle: "Clínica Fidelis",
    thumb: videoJussara,
  },
  {
    id: "IIskME0bFqg",
    name: "Natália Gniech",
    subtitle: "CRM 41240",
    thumb: videoNatalia,
  },
];

export const CTA_FINAL = {
  title: "Se você sabe onde quer chegar, a Auster pode te ajudar a chegar lá.",
  body: "Tenha como parceiro um grupo preparado para levar você ao seu melhor nível profissional — com transparência, agilidade e resultados reais.",
  cta: "SEJA AUSTER!",
};
