/**
 * Dados das páginas de captura /contabilidade-para-medicos e por localidade.
 *
 * Cada localidade nasceu de uma consulta real do Search Console (impressões
 * sem clique = demanda sem página) ou é praça estratégica em SC. A regra para
 * entrar aqui: conteúdo local verdadeiro — conselho, junta comercial, ISS e
 * instituições de referência —, nunca só o nome da cidade trocado no template,
 * que é o que o Google classifica como doorway page.
 *
 * Fatos tributários ficam propositalmente genéricos onde a lei varia por
 * município (ISS entre 2% e 5%, LC 116/2003): alíquota específica muda por
 * decreto e desatualiza a página. Instituições citadas são as consolidadas de
 * cada praça. Conteúdo novo: revisar com a equipe antes de publicar.
 */

export const LANDING_UPDATED_AT = "2026-08-27";

export type Local = {
  slug: string;
  /** Nome para exibição: "Florianópolis", "São Martinho" */
  nome: string;
  uf: string;
  /** Complemento do H1 e dos títulos: "em Florianópolis" */
  emLocal: string;
  /** <title> da página (o layout acrescenta "| Auster Saúde") */
  titulo: string;
  descricao: string;
  headline: string;
  intro: string[];
  contexto: {
    titulo: string;
    paragrafos: string[];
  };
  /** Fatos locais exibidos em cartões na seção de contexto */
  fatos: { rotulo: string; valor: string }[];
  faq: { question: string; answer: string }[];
  /** Índice em DEPOIMENTOS (lib/content.ts) do depoimento destacado */
  depoimentoIndex: number;
};

export const LOCAIS: Local[] = [
  {
    slug: "santa-catarina",
    nome: "Santa Catarina",
    uf: "SC",
    emLocal: "em Santa Catarina",
    titulo: "Contabilidade para médicos e clínicas em Santa Catarina",
    descricao:
      "Contabilidade especializada na área da saúde em Santa Catarina: PJ médica, planejamento tributário e credenciamentos para médicos e clínicas. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos e clínicas em Santa Catarina",
    intro: [
      "A Auster nasceu atendendo médicos catarinenses e é em Santa Catarina que está boa parte dos nossos clientes: recém-formados saindo de UFSC, FURB, Univille, UNIVALI, UNISUL, UNOESC e UNIARP, plantonistas rodando o estado e clínicas já estabelecidas.",
      "Conhecemos a rotina de quem se forma e trabalha aqui — os editais, as fontes pagadoras, os prazos. E cuidamos de tudo a distância, pelo WhatsApp e pelo app, para você não gastar horário de plantão em escritório de contabilidade.",
    ],
    contexto: {
      titulo: "Um estado, vários mercados médicos",
      paragrafos: [
        "O médico da Grande Florianópolis, o do Vale do Itajaí e o do Oeste vivem realidades diferentes: muda a rede hospitalar, muda a prefeitura que cobra o ISS, muda a distância entre os plantões. O que não muda é a estrutura da carreira catarinense — quase todo mundo combina vínculo público ou CLT com plantões contratados via PJ e, mais adiante, consultório próprio.",
        "É essa combinação de fontes pagadoras que decide quanto imposto você paga. O enquadramento certo entre Simples Nacional e Lucro Presumido, feito por quem conhece o mercado local, costuma valer alguns plantões por mês.",
        "Para clínicas médicas, o trabalho vai além do fiscal: abertura com mais de um sócio, credenciamento em operadoras e convênios, folha da equipe e a contabilidade consultiva de quem acompanha o negócio de perto.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor:
          "A PJ médica é registrada no CRM de Santa Catarina (CRM/SC), além do registro individual de cada sócio.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "O contrato social passa pela JUCESC, a junta comercial catarinense — processo hoje totalmente digital.",
      },
      {
        rotulo: "ISS",
        valor:
          "O imposto municipal sobre serviços é definido por cada prefeitura, entre 2% e 5%. O enquadramento certo pesa mais que a alíquota local.",
      },
      {
        rotulo: "Onde nossos clientes estão",
        valor:
          "Grande Florianópolis, Vale do Itajaí, Norte, Sul e Oeste catarinense — atendimento remoto em todas as regiões.",
      },
    ],
    faq: [
      {
        question: "A Auster atende médicos de todo o estado de Santa Catarina?",
        answer:
          "Sim. O atendimento é digital, por WhatsApp e pelo app próprio, e alcança qualquer cidade catarinense — de Florianópolis a Chapecó. Documentos, guias e notas ficam no aplicativo, e o envio para hospitais e operadoras é feito pela equipe.",
      },
      {
        question: "Vocês atendem clínicas médicas ou só médicos com PJ individual?",
        answer:
          "Os dois. Atendemos do médico recém-formado abrindo a primeira PJ à clínica com vários sócios, incluindo credenciamento em operadoras e convênios, folha de pagamento da equipe e gestão contábil consultiva do negócio.",
      },
      {
        question: "Meu CRM é de outro estado, mas vou trabalhar em Santa Catarina. O que muda?",
        answer:
          "Quem passa a atuar em SC precisa de inscrição no CRM/SC, principal ou secundária, e a PJ registrada no conselho catarinense. A Auster orienta esse processo junto com a parte fiscal, para você começar a atender sem pendência.",
      },
      {
        question: "Quanto custa uma contabilidade especializada em Santa Catarina?",
        answer:
          "Depende do regime tributário, do número de fontes pagadoras e dos serviços contratados. O diagnóstico é gratuito e o valor é apresentado antes da contratação, sem taxas escondidas — modelo que vale para todo o estado.",
      },
    ],
    depoimentoIndex: 1,
  },
  {
    slug: "florianopolis",
    nome: "Florianópolis",
    uf: "SC",
    emLocal: "em Florianópolis",
    titulo: "Contabilidade para médicos em Florianópolis – SC",
    descricao:
      "Contabilidade especializada para médicos em Florianópolis e Grande Floripa: abertura de PJ, planejamento tributário e atendimento humano pelo WhatsApp. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos em Florianópolis",
    intro: [
      "Residência no HU, plantão em São José, consultório na capital: em Florianópolis é comum o médico acumular três ou quatro fontes pagadoras antes dos trinta anos. Cada uma delas muda o cálculo do imposto — e é aí que a contabilidade genérica deixa dinheiro na mesa.",
      "A Auster é especializada em médicos, atende centenas de catarinenses e resolve tudo a distância: você não precisa atravessar a ponte para assinar papel.",
    ],
    contexto: {
      titulo: "O mercado médico da capital catarinense",
      paragrafos: [
        "Florianópolis concentra a rede de referência do estado — HU-UFSC, Hospital Governador Celso Ramos, Hospital Infantil Joana de Gusmão, Imperial Hospital de Caridade e a rede privada, do Baía Sul às clínicas de bairro. Ao redor, São José, Palhoça e Biguaçu formam um circuito de plantões que emprega boa parte dos recém-formados.",
        "Nesse circuito, o padrão é claro: vínculo público ou bolsa de um lado, plantões contratados via PJ do outro. Dois médicos na mesma escala podem terminar o mês com valores bem diferentes — a diferença está no enquadramento tributário, não no contracheque.",
        "Nosso trabalho é garantir que você esteja do lado certo dessa conta: PJ aberta rápido, regime revisado todo ano e notas emitidas sem você precisar lembrar de nada.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor:
          "PJ médica registrada no CRM/SC — a Auster conduz o processo junto com a abertura da empresa.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "Registro na JUCESC e inscrição municipal na prefeitura da sede da empresa, tudo por via digital.",
      },
      {
        rotulo: "ISS",
        valor:
          "Definido pela Prefeitura de Florianópolis dentro do teto nacional de 2% a 5% — o diagnóstico mostra o peso real no seu caso.",
      },
      {
        rotulo: "Referências locais",
        valor:
          "HU-UFSC, Celso Ramos, Joana de Gusmão, Imperial Hospital de Caridade, Baía Sul e o circuito de plantões da Grande Floripa.",
      },
    ],
    faq: [
      {
        question: "Posso contratar uma contabilidade que não fica em Florianópolis?",
        answer:
          "Sim. Nota fiscal, junta comercial e CRM funcionam por sistemas digitais, então nada exige escritório na cidade. A Auster atende médicos de toda Santa Catarina a distância, com atendimento humano pelo WhatsApp e documentos no app.",
      },
      {
        question: "Onde fica registrada a minha PJ se eu atendo em Florianópolis?",
        answer:
          "A empresa é registrada na JUCESC, recebe inscrição municipal na prefeitura do município-sede e é registrada no CRM/SC. A Auster cuida das três etapas e do enquadramento tributário antes da primeira nota.",
      },
      {
        question: "Qual é o ISS para serviços médicos em Florianópolis?",
        answer:
          "O ISS é municipal e fica entre 2% e 5%, conforme a legislação da prefeitura. Mais importante que a alíquota é o regime tributário: entre Simples Nacional e Lucro Presumido, a diferença no fim do mês costuma ser muito maior que a variação do ISS.",
      },
      {
        question: "Faço plantões em São José e Palhoça além da capital. Isso complica?",
        answer:
          "Não. A PJ continua uma só, com sede única; o que muda é a rotina de notas e guias para cada contratante — e essa rotina fica com a equipe da Auster, que orienta caso a caso conforme o município de cada plantão.",
      },
    ],
    depoimentoIndex: 0,
  },
  {
    slug: "joinville",
    nome: "Joinville",
    uf: "SC",
    emLocal: "em Joinville",
    titulo: "Contabilidade para médicos em Joinville – SC",
    descricao:
      "Contabilidade especializada para médicos em Joinville e norte catarinense: PJ médica, planejamento tributário e atendimento pelo WhatsApp. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos em Joinville",
    intro: [
      "Maior cidade de Santa Catarina, Joinville tem um dos mercados médicos mais movimentados do Sul: rede pública de grande porte, hospitais privados em expansão e uma faculdade de medicina formando novas turmas todo ano.",
      "A Auster atende médicos catarinenses desde o início e cuida da sua PJ inteira a distância — do enquadramento tributário à nota de cada plantão.",
    ],
    contexto: {
      titulo: "O mercado médico do norte catarinense",
      paragrafos: [
        "A rede de Joinville gira em torno do Hospital Municipal São José, do Hospital Regional Hans Dieter Schmidt e de privados consolidados como o Dona Helena — além do circuito de plantões que se estende por Jaraguá do Sul, São Bento do Sul e região. A medicina da Univille abastece esse mercado com residentes e recém-formados.",
        "Volume de vagas significa volume de contratos PJ: plantões hospitalares, cooperativas, escalas de urgência. Quem entra nesse mercado com a empresa mal enquadrada paga imposto a mais desde o primeiro mês — e às vezes só descobre anos depois, quando um planejamento revisa as contas.",
        "O trabalho da Auster é esse: abrir ou migrar sua PJ com o regime certo, revisar o enquadramento todo ano e manter a rotina fiscal rodando sem tomar seu tempo.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor: "PJ médica registrada no CRM/SC, com o processo conduzido pela Auster.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "Registro digital na JUCESC e inscrição municipal na Prefeitura de Joinville.",
      },
      {
        rotulo: "ISS",
        valor:
          "Alíquota municipal entre 2% e 5%, definida pela prefeitura — o diagnóstico mostra o impacto no seu formato de trabalho.",
      },
      {
        rotulo: "Referências locais",
        valor:
          "Hospital Municipal São José, Hans Dieter Schmidt, Dona Helena e o circuito de plantões do norte catarinense.",
      },
    ],
    faq: [
      {
        question: "A Auster atende médicos em Joinville sem escritório na cidade?",
        answer:
          "Sim. Todo o processo — abertura na JUCESC, inscrição municipal, registro no CRM/SC e emissão de notas — é digital. O atendimento é humano, pelo WhatsApp, e os documentos ficam disponíveis no app próprio.",
      },
      {
        question: "Trabalho em escala PJ no hospital e quero saber se estou pagando imposto a mais.",
        answer:
          "Esse é exatamente o caso do diagnóstico gratuito: a equipe analisa suas fontes pagadoras e o regime atual e mostra, em números, se há economia possível. Um cliente Auster economizou mais de R$ 10 mil por mês só trocando o enquadramento.",
      },
      {
        question: "Faço plantões também em Jaraguá do Sul. Preciso de outra empresa?",
        answer:
          "Não. Uma única PJ médica atende contratos em municípios diferentes; o que muda é a rotina de notas e guias de cada contratante, que fica com a equipe da Auster.",
      },
      {
        question: "Quanto tempo leva para abrir uma PJ médica em Joinville?",
        answer:
          "A parte da contabilidade — contrato social, registro na junta e inscrições — a Auster resolve sem fila. O prazo total depende da JUCESC, da prefeitura e do registro no CRM/SC; peça a estimativa atualizada pelo WhatsApp.",
      },
    ],
    depoimentoIndex: 3,
  },
  {
    slug: "blumenau",
    nome: "Blumenau",
    uf: "SC",
    emLocal: "em Blumenau",
    titulo: "Contabilidade para médicos em Blumenau – SC",
    descricao:
      "Contabilidade especializada para médicos em Blumenau e Vale do Itajaí: abertura de PJ, planejamento tributário e atendimento humano. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos em Blumenau",
    intro: [
      "Quem se forma na FURB ou roda os plantões do Vale do Itajaí conhece o dilema: a carreira acelera rápido, e a burocracia de PJ, notas e impostos vem junto. É nessa hora que uma contabilidade especializada em médicos passa a valer plantões por mês.",
      "A Auster já atende médicos formados na FURB — o depoimento está aqui nesta página — e cuida de tudo a distância, pelo WhatsApp e pelo app.",
    ],
    contexto: {
      titulo: "O mercado médico do Vale do Itajaí",
      paragrafos: [
        "Blumenau se organiza em torno do Hospital Santa Isabel e do Hospital Santo Antônio, com a medicina da FURB formando turmas que abastecem a região — Brusque, Gaspar, Indaial, Timbó e o circuito de urgências do Vale.",
        "O padrão de carreira local combina residência ou vínculo fixo com plantões contratados via PJ em mais de uma cidade. Cada contratante tem sua rotina de notas; cada prefeitura, seu ISS. Sem uma contabilidade que conheça esse desenho, sobra imposto pago a mais e falta clareza sobre quanto o mês realmente rendeu.",
        "Com a Auster, o enquadramento é revisado todo ano, as notas saem sem você lembrar de nada e as dúvidas são respondidas no mesmo dia, por gente de verdade.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor: "PJ médica registrada no CRM/SC, processo conduzido pela equipe.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "Registro digital na JUCESC e inscrição municipal na Prefeitura de Blumenau.",
      },
      {
        rotulo: "ISS",
        valor:
          "Entre 2% e 5%, conforme a legislação municipal — no Vale, cada cidade define a sua alíquota.",
      },
      {
        rotulo: "Referências locais",
        valor:
          "Hospital Santa Isabel, Hospital Santo Antônio, medicina da FURB e o circuito de plantões do Vale do Itajaí.",
      },
    ],
    faq: [
      {
        question: "Tem contabilidade especializada em médicos em Blumenau?",
        answer:
          "A Auster atende médicos de Blumenau e região a distância, incluindo formados na FURB que estão conosco desde o início da carreira. Especialização importa mais que endereço: o que resolve seu imposto é conhecer a rotina médica, não ficar na mesma rua.",
      },
      {
        question: "Atendo em Blumenau e em outras cidades do Vale. Como fica o ISS?",
        answer:
          "O ISS é municipal e cada prefeitura define a sua alíquota entre 2% e 5%. A sua PJ continua uma só; a equipe da Auster cuida das notas e guias de cada contratante e orienta caso a caso.",
      },
      {
        question: "Acabei de me formar na FURB. Já vale a pena abrir PJ?",
        answer:
          "Se os seus plantões forem contratados como pessoa jurídica — o formato mais comum na região —, sim: a carga tributária da PJ costuma ficar bem abaixo dos até 27,5% do IRPF. O diagnóstico gratuito mostra a conta exata para o seu caso.",
      },
      {
        question: "Como funciona a troca de contador sem parar de atender?",
        answer:
          "A Auster solicita documentos e acessos ao contador anterior, revisa o enquadramento e assume a rotina fiscal a partir da competência combinada. Você segue emitindo notas normalmente durante a migração.",
      },
    ],
    depoimentoIndex: 2,
  },
  {
    slug: "sao-martinho",
    nome: "São Martinho",
    uf: "RS",
    emLocal: "em São Martinho",
    titulo: "Contabilidade para médicos em São Martinho – RS",
    descricao:
      "Contabilidade especializada para médicos em São Martinho (RS) e região: PJ médica, planejamento tributário e atendimento 100% digital. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos em São Martinho – RS",
    intro: [
      "Em cidades como São Martinho, no noroeste gaúcho, dificilmente existe um contador especializado em médicos na esquina — e o profissional acaba entregando a PJ a um escritório generalista ou administrando tudo de longe, sem apoio.",
      "O atendimento digital da Auster resolve exatamente isso: especialização em médicos, WhatsApp com resposta no mesmo dia e documentos no app, em qualquer cidade do Brasil.",
    ],
    contexto: {
      titulo: "Medicina no interior gaúcho",
      paragrafos: [
        "O médico que atua em São Martinho e nas cidades vizinhas do noroeste do Rio Grande do Sul costuma somar atendimento pela prefeitura, plantões em hospitais da região e, muitas vezes, deslocamento entre municípios. Parte desses contratos é feita via PJ — e é aí que o enquadramento tributário decide quanto sobra no fim do mês.",
        "A distância dos grandes centros não muda nada no papel: a empresa é registrada na JucisRS, a nota sai pelo sistema da prefeitura e o registro no CRM do estado é feito por via digital. O que muda é a falta de especialista por perto — lacuna que o atendimento remoto fecha.",
        "Também atendemos médicos de São Martinho da Serra (RS) e de São Martinho (SC): o modelo é o mesmo, ajustado ao conselho e à junta de cada estado.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor:
          "PJ médica registrada no CRM do Rio Grande do Sul, com processo conduzido a distância.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "Registro digital na JucisRS, a junta comercial gaúcha, e inscrição municipal na prefeitura local.",
      },
      {
        rotulo: "ISS",
        valor:
          "Definido pela prefeitura do município, entre 2% e 5% — em cidades pequenas, a alíquota costuma ficar no piso.",
      },
      {
        rotulo: "Como atendemos a região",
        valor:
          "Atendimento 100% remoto por WhatsApp e app próprio — o mesmo usado por centenas de médicos em todo o Brasil.",
      },
    ],
    faq: [
      {
        question: "Existe contabilidade especializada em médicos em São Martinho?",
        answer:
          "Cidades pequenas raramente têm um escritório dedicado à área médica. Com atendimento digital, você contrata uma equipe especializada sem sair da cidade: a Auster cuida de médicos em todo o Brasil pelo WhatsApp e pelo app próprio.",
      },
      {
        question: "Atendo pela prefeitura e faço plantões na região. PJ vale a pena?",
        answer:
          "Depende do vínculo. Cargo público estatutário ou CLT não passa pela PJ; já os plantões e atendimentos contratados como pessoa jurídica costumam pagar bem menos imposto quando bem enquadrados. O diagnóstico gratuito separa uma coisa da outra e mostra a conta.",
      },
      {
        question: "Vocês atendem São Martinho da Serra e São Martinho de Santa Catarina também?",
        answer:
          "Sim. O atendimento é remoto e cobre todo o Brasil — o que muda entre os estados é a junta comercial e o conselho regional, e a equipe ajusta o processo a cada caso.",
      },
      {
        question: "Como abro uma PJ médica morando no interior do RS?",
        answer:
          "Tudo por via digital: contrato social e registro na JucisRS, inscrição municipal na prefeitura e registro da empresa no CRM gaúcho. A Auster conduz as etapas e você acompanha pelo WhatsApp, sem viajar para resolver burocracia.",
      },
    ],
    depoimentoIndex: 3,
  },
  {
    slug: "tuntum",
    nome: "Tuntum",
    uf: "MA",
    emLocal: "em Tuntum",
    titulo: "Contabilidade para médicos em Tuntum – MA",
    descricao:
      "Contabilidade especializada para médicos em Tuntum (MA) e centro maranhense: abertura de PJ, impostos de plantões e atendimento digital. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos em Tuntum – MA",
    intro: [
      "No centro do Maranhão, entre Presidente Dutra e Barra do Corda, os plantões médicos de Tuntum e região são cada vez mais contratados via PJ — e o médico fica com a tarefa de abrir e manter uma empresa longe de qualquer contabilidade especializada.",
      "A Auster faz isso a distância há anos: PJ aberta por via digital, notas emitidas pela equipe e atendimento humano no WhatsApp, em qualquer cidade do país.",
    ],
    contexto: {
      titulo: "Medicina no centro maranhense",
      paragrafos: [
        "Quem atende em Tuntum geralmente combina hospital municipal, programas públicos de saúde e plantões em cidades vizinhas. Boa parte desses contratos exige nota fiscal de pessoa jurídica — e uma PJ mal enquadrada transforma cada plantão em imposto pago a mais.",
        "A distância de São Luís não é obstáculo: o registro da empresa sai pela JUCEMA por via digital, a prefeitura emite a inscrição municipal e o CRM do Maranhão registra a PJ sem exigir balcão. O que o médico do interior realmente precisa é de uma equipe que conheça a rotina médica e responda rápido.",
        "É esse o modelo da Auster: especialização em médicos, resposta no mesmo dia e a papelada inteira fora das suas costas.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor:
          "PJ médica registrada no CRM do Maranhão, com processo conduzido a distância pela equipe.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "Registro digital na JUCEMA, a junta comercial maranhense, e inscrição municipal na prefeitura.",
      },
      {
        rotulo: "ISS",
        valor:
          "Entre 2% e 5%, conforme a legislação do município onde a empresa tem sede.",
      },
      {
        rotulo: "Como atendemos a região",
        valor:
          "Atendimento 100% remoto por WhatsApp e app próprio, o mesmo usado por médicos de todo o Brasil.",
      },
    ],
    faq: [
      {
        question: "Preciso ir a São Luís para abrir minha PJ médica?",
        answer:
          "Não. O registro na JUCEMA, a inscrição municipal e o registro no CRM do Maranhão são feitos por via digital. A Auster conduz o processo inteiro a distância e você acompanha tudo pelo WhatsApp.",
      },
      {
        question: "O hospital pede que eu atenda como PJ. O que preciso ter em ordem?",
        answer:
          "Uma empresa regular — com CNAE correto, registro no CRM e inscrição municipal —, o enquadramento tributário bem escolhido e a emissão de notas em dia. A Auster monta essa estrutura e mantém a rotina fiscal funcionando todo mês.",
      },
      {
        question: "Faço plantões em mais de uma cidade da região. Preciso de mais de uma empresa?",
        answer:
          "Não. Uma única PJ médica atende contratos em municípios diferentes. A equipe cuida das notas e guias de cada contratante e orienta como fica o ISS em cada caso.",
      },
      {
        question: "Como funciona o atendimento a distância para quem está no interior do Maranhão?",
        answer:
          "Pelo WhatsApp, com resposta de pessoas de verdade, e pelo app próprio, onde ficam documentos, boletos e notas. O envio de documentos para os locais onde você atende é feito pela equipe — você não precisa lembrar de encaminhar nada.",
      },
    ],
    depoimentoIndex: 0,
  },
  {
    slug: "ribeirao-preto",
    nome: "Ribeirão Preto",
    uf: "SP",
    emLocal: "em Ribeirão Preto",
    titulo: "Contabilidade para médicos em Ribeirão Preto – SP",
    descricao:
      "Contabilidade especializada para médicos em Ribeirão Preto: PJ médica, impostos de plantões e residência, atendimento digital humano. Diagnóstico gratuito.",
    headline: "Contabilidade para médicos em Ribeirão Preto",
    intro: [
      "Poucas cidades do Brasil concentram tanta medicina por metro quadrado: a faculdade da USP, o Hospital das Clínicas, a Santa Casa e uma rede privada densa fazem de Ribeirão Preto um polo que forma e emprega milhares de médicos.",
      "Num mercado competitivo assim, cada plantão precisa render o que deve. A Auster cuida do enquadramento, das notas e da rotina fiscal da sua PJ — tudo a distância, com atendimento humano.",
    ],
    contexto: {
      titulo: "O polo médico de Ribeirão Preto",
      paragrafos: [
        "A FMRP-USP e o Hospital das Clínicas atraem residentes do país inteiro, e a Santa Casa e a rede privada completam um circuito onde o recém-formado emenda residência, plantões e consultório em poucos anos. É a transição mais delicada da vida financeira do médico: a bolsa vira honorário PJ, surgem várias fontes pagadoras e o imposto mal planejado cresce junto com a agenda.",
        "O ritmo da carreira em Ribeirão não deixa espaço para fila de cartório: a empresa precisa abrir rápido pela JUCESP, com inscrição municipal na prefeitura e registro no CRM paulista, e o regime tributário precisa ser revisto a cada mudança de contrato.",
        "A Auster acompanha essa curva de perto — do primeiro plantão como PJ à clínica própria — com a agilidade que uma carreira em polo médico exige.",
      ],
    },
    fatos: [
      {
        rotulo: "Registro profissional",
        valor:
          "PJ médica registrada no CRM de São Paulo, com o processo conduzido pela equipe da Auster.",
      },
      {
        rotulo: "Abertura da empresa",
        valor:
          "Registro digital na JUCESP e inscrição municipal na Prefeitura de Ribeirão Preto.",
      },
      {
        rotulo: "ISS",
        valor:
          "Alíquota municipal entre 2% e 5%, definida pela prefeitura — o diagnóstico mostra o peso real no seu formato de trabalho.",
      },
      {
        rotulo: "Referências locais",
        valor:
          "FMRP-USP, Hospital das Clínicas, Santa Casa de Ribeirão Preto e a rede privada da região.",
      },
    ],
    faq: [
      {
        question: "Sou residente em Ribeirão Preto. Já preciso de uma PJ?",
        answer:
          "A bolsa de residência não passa pela PJ. O gatilho costuma ser o primeiro plantão contratado como pessoa jurídica — comum já durante a residência, quando o programa permite. Nesse momento, abrir a empresa com o enquadramento certo evita começar a carreira pagando imposto a mais.",
      },
      {
        question: "Posso contratar uma contabilidade que não fica em Ribeirão Preto?",
        answer:
          "Sim. JUCESP, prefeitura e CRM operam por sistemas digitais, e a Auster atende médicos de todo o Brasil a distância — com WhatsApp respondido por gente de verdade e documentos organizados no app próprio.",
      },
      {
        question: "Atendo em Ribeirão e em cidades da região, como Sertãozinho e Jaboticabal. Complica?",
        answer:
          "Não. Uma única PJ atende contratos em municípios diferentes; muda apenas a rotina de notas e guias de cada contratante, que fica com a equipe da Auster, com orientação caso a caso.",
      },
      {
        question: "Quanto custa a contabilidade da Auster em Ribeirão Preto?",
        answer:
          "O valor depende do regime tributário, do número de fontes pagadoras e dos serviços contratados — e é apresentado antes da contratação, sem taxas escondidas. O diagnóstico inicial é gratuito.",
      },
    ],
    depoimentoIndex: 1,
  },
];

export function getLocal(slug: string) {
  return LOCAIS.find((local) => local.slug === slug);
}

/** Conteúdo do hub /contabilidade-para-medicos. */
export const HUB = {
  titulo: "Contabilidade para médicos: PJ, impostos e plantões",
  descricao:
    "Contabilidade especializada em médicos em todo o Brasil: abertura de PJ, planejamento tributário, credenciamentos e gestão consultiva. Diagnóstico gratuito pelo WhatsApp.",
  headline: "Contabilidade para médicos, do primeiro plantão à clínica própria",
  intro: [
    "A Auster só atende a área da saúde. Isso muda tudo: a equipe conhece plantões, editais, credenciamentos e a transição de carreira — e usa esse repertório para fazer sua PJ pagar só o imposto que deve.",
    "O atendimento é digital e alcança qualquer cidade do Brasil, com WhatsApp respondido por gente de verdade e documentos organizados no app próprio.",
  ],
  argumento: {
    titulo: "Por que uma contabilidade especializada em médicos?",
    paragrafos: [
      "A vida fiscal do médico não se parece com a de nenhuma outra profissão: várias fontes pagadoras ao mesmo tempo, contratos PJ que mudam a cada semestre, bolsa de residência de um lado e plantão de outro, credenciamento em convênio, edital de prefeitura. Um escritório generalista trata isso como qualquer empresa de serviços — e é aí que o imposto sai errado.",
      "Dois médicos na mesma escala podem terminar o mês com valores bem diferentes no bolso. A diferença não está no que ganham: está no enquadramento. Quem acerta o regime paga só o que deve; quem erra, financia o governo sem perceber.",
      "É por isso que o primeiro passo na Auster é sempre um diagnóstico gratuito: antes de falar de honorários, mostramos em números onde está a economia.",
    ],
  },
  faq: [
    {
      question: "Como funciona uma contabilidade a distância para médicos?",
      answer:
        "Todo o ciclo é digital: a empresa é registrada na junta comercial do seu estado por via eletrônica, as notas saem pelo sistema da prefeitura e os documentos ficam no app da Auster. O atendimento é pelo WhatsApp, com pessoas de verdade — sem chatbot e sem fila.",
    },
    {
      question: "Em quais cidades a Auster atende?",
      answer:
        "Em todas. A base de clientes se concentra em Santa Catarina, onde a Auster nasceu, mas o modelo digital atende médicos de qualquer cidade do Brasil — de capitais como Florianópolis e polos médicos como Ribeirão Preto a cidades do interior como São Martinho (RS) e Tuntum (MA).",
    },
    {
      question: "Se eu mudar de cidade ou de estado, preciso trocar de contador?",
      answer:
        "Não. Como o atendimento é remoto, a Auster acompanha a mudança: ajusta inscrição municipal, orienta o registro no CRM do novo estado quando necessário e mantém a rotina fiscal sem interrupção — algo que a contabilidade de bairro não consegue fazer.",
    },
    {
      question: "O diagnóstico é gratuito mesmo? O que ele inclui?",
      answer:
        "Sim. A equipe analisa suas fontes pagadoras, o regime tributário atual e o formato dos seus contratos, e devolve em números o que dá para economizar — antes de qualquer contratação. O valor dos honorários é apresentado junto, sem taxas escondidas.",
    },
  ],
} as const;
