import { useState } from 'react';

const PONTOS_QUIZ = 30;
const PONTOS_VOF  = 20;

const Ilustracoes = {
  criacao: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <defs><radialGradient id="sky" cx="50%" cy="40%"><stop offset="0%" stopColor="#7dd3fc"/><stop offset="100%" stopColor="#1e40af"/></radialGradient></defs>
      <rect width="300" height="180" fill="url(#sky)"/>
      <ellipse cx="150" cy="160" rx="160" ry="50" fill="#16a34a"/>
      <circle cx="60" cy="50" r="28" fill="#fde68a" opacity="0.9"/>
      <circle cx="200" cy="40" r="18" fill="#fff" opacity="0.8"/>
      <circle cx="230" cy="50" r="22" fill="#fff" opacity="0.7"/>
      <ellipse cx="80" cy="130" rx="25" ry="18" fill="#15803d"/>
      <ellipse cx="100" cy="120" rx="20" ry="15" fill="#16a34a"/>
      <rect x="90" y="130" width="8" height="20" fill="#92400e"/>
      <ellipse cx="200" cy="125" rx="22" ry="16" fill="#15803d"/>
      <rect x="207" y="128" width="7" height="18" fill="#92400e"/>
    </svg>
  ),
  adaoeva: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#d1fae5"/>
      <ellipse cx="150" cy="170" rx="160" ry="40" fill="#15803d"/>
      <circle cx="100" cy="70" r="22" fill="#fbbf24"/>
      <rect x="92" y="90" width="16" height="40" rx="8" fill="#fbbf24"/>
      <circle cx="200" cy="70" r="22" fill="#f9a8d4"/>
      <rect x="192" y="90" width="16" height="40" rx="8" fill="#f9a8d4"/>
      <ellipse cx="150" cy="60" rx="14" ry="22" fill="#16a34a"/>
      <circle cx="150" cy="42" r="10" fill="#dc2626"/>
      <text x="143" y="46" fontSize="12" fill="#fff">🍎</text>
    </svg>
  ),
  noe: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#7dd3fc"/>
      <ellipse cx="150" cy="200" rx="200" ry="80" fill="#1d4ed8"/>
      <path d="M60 120 L80 100 L220 100 L240 120 Z" fill="#92400e"/>
      <rect x="80" y="80" width="140" height="25" fill="#b45309"/>
      <rect x="110" y="55" width="80" height="30" fill="#d97706"/>
      <path d="M150 40 L130 55 L170 55 Z" fill="#b45309"/>
      <text x="80" y="117" fontSize="16">🦁🐘🦒🐦</text>
      <circle cx="240" cy="40" r="15" fill="#fde68a"/>
    </svg>
  ),
  babel: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#fef3c7"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#d97706"/>
      <rect x="110" y="150" width="80" height="25" fill="#b45309"/>
      <rect x="115" y="125" width="70" height="28" fill="#d97706"/>
      <rect x="122" y="100" width="56" height="28" fill="#b45309"/>
      <rect x="130" y="75" width="40" height="28" fill="#d97706"/>
      <rect x="138" y="50" width="24" height="28" fill="#b45309"/>
      <rect x="144" y="30" width="12" height="22" fill="#d97706"/>
      <circle cx="250" cy="35" r="20" fill="#fbbf24"/>
    </svg>
  ),
  jose: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#fef3c7"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#d4a373"/>
      <circle cx="150" cy="65" r="28" fill="#fbbf24"/>
      <rect x="122" y="90" width="56" height="60" rx="4" fill="#7c3aed"/>
      <rect x="118" y="92" width="8" height="55" fill="#ec4899"/>
      <rect x="174" y="92" width="8" height="55" fill="#3b82f6"/>
      <text x="60" y="80" fontSize="20">⭐</text>
      <text x="210" y="80" fontSize="20">⭐</text>
    </svg>
  ),
  moises: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#dbeafe"/>
      <rect x="0" y="100" width="300" height="80" fill="#1d4ed8"/>
      <path d="M0 100 Q75 70 150 100 Q225 130 300 100 L300 80 Q225 110 150 80 Q75 50 0 80 Z" fill="#3b82f6"/>
      <circle cx="50" cy="50" r="22" fill="#fbbf24"/>
      <rect x="38" y="70" width="24" height="40" rx="4" fill="#d97706"/>
      <text x="200" y="90" fontSize="24">🌊</text>
    </svg>
  ),
  davi: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#fef3c7"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#86efac"/>
      <circle cx="80" cy="60" r="22" fill="#fbbf24"/>
      <rect x="68" y="80" width="24" height="50" rx="4" fill="#3b82f6"/>
      <ellipse cx="220" cy="90" rx="30" ry="45" fill="#6b7280"/>
      <circle cx="220" cy="45" r="20" fill="#9ca3af"/>
      <text x="65" y="155" fontSize="14">🐑🐑</text>
    </svg>
  ),
  jonas: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#0c4a6e"/>
      <ellipse cx="150" cy="120" rx="130" ry="60" fill="#1d4ed8"/>
      <ellipse cx="200" cy="115" rx="70" ry="35" fill="#16a34a"/>
      <text x="170" y="118" fontSize="20">👁</text>
      <circle cx="50" cy="60" r="18" fill="#fbbf24"/>
      <text x="10" y="50" fontSize="16">⛈</text>
    </svg>
  ),
  daniel: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#1c1917"/>
      <rect x="0" y="120" width="300" height="60" fill="#292524"/>
      <circle cx="150" cy="75" r="22" fill="#fbbf24"/>
      <rect x="138" y="95" width="24" height="40" rx="4" fill="#7c3aed"/>
      <ellipse cx="80" cy="140" rx="25" ry="18" fill="#b45309"/>
      <circle cx="80" cy="125" r="12" fill="#d97706"/>
      <ellipse cx="220" cy="140" rx="25" ry="18" fill="#b45309"/>
      <circle cx="220" cy="125" r="12" fill="#d97706"/>
      <text x="135" y="50" fontSize="20">✨</text>
    </svg>
  ),
  jesus: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:20}}>
      <rect width="300" height="180" fill="#1e1b4b"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#92400e"/>
      <rect x="110" y="110" width="80" height="50" rx="4" fill="#b45309"/>
      <circle cx="150" cy="100" r="15" fill="#fde68a"/>
      <circle cx="150" cy="25" r="15" fill="#fbbf24"/>
      <text x="30" y="100" fontSize="14">🐑</text>
      <text x="240" y="110" fontSize="14">🐄</text>
      <text x="130" y="175" fontSize="12">🌟</text>
    </svg>
  ),
};

const HISTORIAS = [
  { id:'criacao', titulo:'A Criação do Mundo', emoji:'🌍', cor:'#0ea5e9', bg:'#e0f2fe', referencia:'Gênesis 1-2', texto:`No começo, não existia nada — nem luz, nem terra, nem animais. Só havia escuridão. Então Deus começou a criar!\n\nNo primeiro dia, Deus disse: "Haja luz!" E a luz apareceu, separando o dia da noite.\n\nNo segundo dia, Deus criou o céu. No terceiro dia, fez aparecer a terra seca e cobriu com plantas e árvores!\n\nNo quarto dia, criou o sol, a lua e as estrelas. No quinto dia, os oceanos ganharam peixes e o céu ficou cheio de pássaros!\n\nNo sexto dia, Deus criou os animais e o ser humano, feito à Sua imagem!\n\nNo sétimo dia, Deus descansou. Tudo o que Deus criou era muito bom! 🌟`, quiz:[{pergunta:'O que Deus criou no primeiro dia?',opcoes:['Os animais','A luz','O sol','Os peixes'],correta:1},{pergunta:'Em qual dia Deus criou o ser humano?',opcoes:['Terceiro','Quarto','Quinto','Sexto'],correta:3},{pergunta:'O que Deus fez no sétimo dia?',opcoes:['Criou os animais','Criou as estrelas','Descansou','Criou a terra'],correta:2}], vof:[{afirmacao:'Deus criou a luz no primeiro dia.',resposta:true},{afirmacao:'Os pássaros foram criados no terceiro dia.',resposta:false},{afirmacao:'Deus achou que tudo que criou era muito bom.',resposta:true},{afirmacao:'Deus trabalhou no sétimo dia também.',resposta:false}] },
  { id:'adaoeva', titulo:'Adão e Eva', emoji:'🍎', cor:'#16a34a', bg:'#dcfce7', referencia:'Gênesis 2-3', texto:`Deus formou o primeiro homem do pó da terra e soprou vida em suas narinas. Seu nome era Adão!\n\nDeus plantou um jardim maravilhoso chamado Éden. Ele disse: "Você pode comer de qualquer árvore, exceto da árvore do conhecimento do bem e do mal."\n\nDepois, Deus criou Eva para ser a companheira de Adão.\n\nMas uma serpente astuta enganou Eva. Ela comeu a fruta proibida e deu para Adão também.\n\nDeus precisou tirá-los do Jardim do Éden. Mas mesmo assim, Deus nunca deixou de amá-los! 💕`, quiz:[{pergunta:'Como se chamava o jardim onde Adão e Eva viviam?',opcoes:['Nazaré','Éden','Belém','Canaã'],correta:1},{pergunta:'O que estava proibido no jardim?',opcoes:['Nadar','Correr','Comer da árvore do conhecimento','Falar com animais'],correta:2},{pergunta:'Quem enganou Eva?',opcoes:['Um leão','Adão','Uma serpente','Um anjo'],correta:2}], vof:[{afirmacao:'Adão foi criado do pó da terra.',resposta:true},{afirmacao:'Eva foi criada antes de Adão.',resposta:false},{afirmacao:'Deus permitiu que comessem de todas as árvores.',resposta:false},{afirmacao:'Deus continuou amando Adão e Eva mesmo depois da desobediência.',resposta:true}] },
  { id:'noe', titulo:'Noé e o Dilúvio', emoji:'🌈', cor:'#7c3aed', bg:'#ede9fe', referencia:'Gênesis 6-9', texto:`Havia muita maldade no mundo. Mas Noé era justo e caminhava com Deus!\n\nDeus disse: "Vou enviar um grande dilúvio. Construa uma arca enorme para você, sua família e um casal de cada animal."\n\nNoé obedeceu! Mesmo com todo mundo rindo dele, construiu a arca gigante com elefantes, girafas, leões e muitos outros animais!\n\nChoveu por 40 dias e 40 noites! Mas todos dentro da arca estavam seguros.\n\nQuando parou, uma pomba voltou com um ramo de oliveira. Deus colocou um ARCO-ÍRIS no céu como promessa! 🌈`, quiz:[{pergunta:'Por quantos dias e noites choveu?',opcoes:['7','20','40','100'],correta:2},{pergunta:'Que animal Noé soltou para ver se a terra estava seca?',opcoes:['Corvo e pomba','Águia','Pomba','Pardal'],correta:2},{pergunta:'O que Deus colocou no céu como sinal da promessa?',opcoes:['Uma estrela','Um arco-íris','Uma nuvem','O sol'],correta:1}], vof:[{afirmacao:'Noé era um homem mau.',resposta:false},{afirmacao:'Noé levou um casal de cada animal para a arca.',resposta:true},{afirmacao:'A pomba voltou com um ramo de oliveira.',resposta:true},{afirmacao:'Deus prometeu nunca mais destruir a terra com fogo.',resposta:false}] },
  { id:'babel', titulo:'A Torre de Babel', emoji:'🏗️', cor:'#d97706', bg:'#fef3c7', referencia:'Gênesis 11:1-9', texto:`Depois do dilúvio, todo mundo falava a mesma língua e se entendia perfeitamente.\n\nAs pessoas chegaram numa planície chamada Sinear e disseram: "Vamos construir uma torre tão alta que chegue até o céu!"\n\nMas elas queriam se igualar a Deus sem precisar d'Ele. Então Deus confundiu a linguagem de todos!\n\nDe repente, ninguém entendia mais ninguém. As pessoas se espalharam pelo mundo.\n\nA cidade ficou conhecida como Babel, que significa "confusão". 🌍`, quiz:[{pergunta:'Como se chamava a planície onde construíram a torre?',opcoes:['Éden','Sinear','Canaã','Egito'],correta:1},{pergunta:'Por que Deus confundiu as línguas?',opcoes:['A torre era feia','Queriam se igualar a Deus','Brigavam entre si','A torre era alta demais'],correta:1},{pergunta:'O que significa "Babel"?',opcoes:['Paz','Alegria','Confusão','Torre'],correta:2}], vof:[{afirmacao:'No começo, todas as pessoas falavam a mesma língua.',resposta:true},{afirmacao:'As pessoas construíram a torre para honrar a Deus.',resposta:false},{afirmacao:'Deus aprovou a construção da torre.',resposta:false},{afirmacao:'Depois de Babel, as pessoas se espalharam pelo mundo.',resposta:true}] },
  { id:'jose', titulo:'José e a Túnica Colorida', emoji:'👑', cor:'#7c3aed', bg:'#ede9fe', referencia:'Gênesis 37-45', texto:`Jacó tinha doze filhos, mas José era seu favorito. Jacó deu a José uma túnica linda e colorida!\n\nOs irmãos ficaram com muita inveja. Eles venderam José por 20 moedas de prata!\n\nNo Egito, José foi escravo. Mas Deus estava com ele! Deus deu a José um dom especial: interpretar sonhos.\n\nQuando o Faraó teve sonhos perturbadores, José explicou: 7 anos de fartura e 7 de fome. O Faraó nomeou José como segundo homem mais poderoso do Egito!\n\nQuando os irmãos foram pedir comida, se curvaram diante de José — exatamente como no sonho! José os perdoou com amor. 💛`, quiz:[{pergunta:'Por quanto José foi vendido pelos irmãos?',opcoes:['10 moedas de ouro','20 moedas de prata','30 moedas de bronze','5 moedas de ouro'],correta:1},{pergunta:'Que dom especial Deus deu a José?',opcoes:['Cantar','Interpretar sonhos','Curar doenças','Correr rápido'],correta:1},{pergunta:'O que aconteceu quando os irmãos foram ao Egito?',opcoes:['Foram presos','Se curvaram diante de José','Não reconheceram José','Voltaram sem comida'],correta:1}], vof:[{afirmacao:'José era o filho favorito de Jacó.',resposta:true},{afirmacao:'Os irmãos ficaram felizes com a túnica colorida.',resposta:false},{afirmacao:'José se vingou dos irmãos.',resposta:false},{afirmacao:'Deus estava com José mesmo quando ele sofria.',resposta:true}] },
  { id:'moises', titulo:'Moisés e o Mar Vermelho', emoji:'🌊', cor:'#0891b2', bg:'#cffafe', referencia:'Êxodo 14', texto:`O povo de Israel estava escravizado no Egito. Deus escolheu Moisés para libertá-los!\n\nApós muitas pragas, o Faraó deixou o povo partir. Mas logo enviou seu exército atrás deles!\n\nCom o mar à frente e o exército atrás, o povo ficou aterrorizado. Moisés disse: "Não tenham medo! Vejam a salvação do Senhor!"\n\nDeus mandou Moisés estender seu cajado. As águas se abriram! Formou-se um caminho seco com paredes de água dos dois lados!\n\nTodo o povo atravessou com segurança! O povo cantou e dançou de alegria! 🎉`, quiz:[{pergunta:'O que o povo estava fazendo no Egito?',opcoes:['Reinando','Estudando','Escravizado trabalhando','Descansando'],correta:2},{pergunta:'O que Deus fez com o Mar Vermelho?',opcoes:['Secou completamente','Abriu as águas formando um caminho','Fez chover muito','Transformou em terra'],correta:1},{pergunta:'O que o povo fez depois de atravessar o mar?',opcoes:['Voltou para o Egito','Cantou e dançou agradecendo a Deus','Dormiu','Reclamou de novo'],correta:1}], vof:[{afirmacao:'Moisés foi escolhido por Deus para libertar o povo.',resposta:true},{afirmacao:'O povo estava confiante quando viu o exército chegando.',resposta:false},{afirmacao:'As águas se abriram quando Moisés estendeu o cajado.',resposta:true},{afirmacao:'O exército egípcio também conseguiu atravessar o mar.',resposta:false}] },
  { id:'davi', titulo:'Davi e Golias', emoji:'🪨', cor:'#dc2626', bg:'#fee2e2', referencia:'1 Samuel 17', texto:`Os filisteus tinham um guerreiro terrível: Golias! Ele media quase 3 metros de altura e provocava Israel todo dia.\n\nTodos os soldados ficavam paralisados de medo!\n\nMas o jovem pastor Davi chegou e disse: "Quem é esse que desafia os exércitos de Deus?"\n\nDavi pegou 5 pedras lisas e sua funda. Golias gargalhou quando viu o menininho.\n\nMas Davi gritou: "Você vem com espada, mas eu venho em nome do Senhor!" A pedra acertou a testa de Golias — e o gigante caiu! 🗡️`, quiz:[{pergunta:'Quantas pedras Davi pegou para lutar?',opcoes:['1','3','5','10'],correta:2},{pergunta:'O que Davi usou para derrotar Golias?',opcoes:['Espada','Arco e flecha','Funda e pedra','Lança'],correta:2},{pergunta:'O que Davi era antes de ser guerreiro?',opcoes:['Pescador','Pastor','Carpinteiro','Soldado'],correta:1}], vof:[{afirmacao:'Golias era um guerreiro israelita.',resposta:false},{afirmacao:'Os soldados de Israel tinham muito medo de Golias.',resposta:true},{afirmacao:'Davi confiou na força de Deus para vencer.',resposta:true},{afirmacao:'Golias usava uma armadura muito leve.',resposta:false}] },
  { id:'jonas', titulo:'Jonas e o Peixe Grande', emoji:'🐋', cor:'#0891b2', bg:'#cffafe', referencia:'Jonas 1-4', texto:`Deus chamou Jonas: "Vai à cidade de Nínive!" Mas Jonas não queria ir e fugiu de navio!\n\nDeus enviou uma tempestade enorme. Jonas confessou: "Eu fugi de Deus. Me joguem ao mar!"\n\nOs marinheiros jogaram Jonas — e a tempestade parou! Deus preparou um GRANDE PEIXE que engoliu Jonas.\n\nDentro do peixe, por 3 dias e 3 noites, Jonas orou e pediu perdão. O peixe o vomitou em terra firme!\n\nDesta vez Jonas obedeceu. Ele pregou em Nínive e as pessoas se arrependeram! ❤️`, quiz:[{pergunta:'Para onde Deus mandou Jonas ir?',opcoes:['Jerusalém','Nínive','Egito','Babilônia'],correta:1},{pergunta:'Por quantos dias Jonas ficou dentro do peixe?',opcoes:['1','2','3','7'],correta:2},{pergunta:'O que aconteceu quando Jonas pregou em Nínive?',opcoes:['Ninguém ouviu','As pessoas o expulsaram','As pessoas se arrependeram','A cidade foi destruída'],correta:2}], vof:[{afirmacao:'Jonas obedeceu imediatamente quando Deus o chamou.',resposta:false},{afirmacao:'A tempestade parou quando Jonas foi jogado ao mar.',resposta:true},{afirmacao:'Jonas ficou no peixe por 3 dias e 3 noites.',resposta:true},{afirmacao:'Deus não perdoou as pessoas de Nínive.',resposta:false}] },
  { id:'daniel', titulo:'Daniel na Cova dos Leões', emoji:'🦁', cor:'#d97706', bg:'#fef3c7', referencia:'Daniel 6', texto:`Daniel era um jovem judeu que se tornou conselheiro importante do rei. Ele orava a Deus três vezes por dia!\n\nConselheiros com inveja fizeram o rei criar uma lei: por 30 dias, ninguém poderia orar a nenhum deus. Quem desobedecesse seria jogado na cova dos leões!\n\nDaniel soube da lei. Mas foi para casa e orou a Deus como sempre fazia.\n\nDaniel foi jogado na cova dos leões! De manhã, o rei correu até a cova: "Daniel! Teu Deus te livrou?"\n\nDaniel respondeu: "Meu Deus enviou seu anjo e fechou a boca dos leões!" Daniel saiu sem um arranhão! 🦁✨`, quiz:[{pergunta:'Quantas vezes por dia Daniel orava?',opcoes:['1','2','3','7'],correta:2},{pergunta:'Por quantos dias durava a lei que proibia orar?',opcoes:['7','20','30','40'],correta:2},{pergunta:'O que Deus fez para proteger Daniel?',opcoes:['Removeu os leões','Enviou um anjo que fechou a boca dos leões','Fez Daniel invisível','Domou os leões'],correta:1}], vof:[{afirmacao:'Daniel parou de orar quando soube da nova lei.',resposta:false},{afirmacao:'O rei Dário gostava muito de Daniel.',resposta:true},{afirmacao:'Os leões feriram Daniel.',resposta:false},{afirmacao:'Deus protegeu Daniel por causa de sua fidelidade.',resposta:true}] },
  { id:'jesus', titulo:'O Nascimento de Jesus', emoji:'⭐', cor:'#7c3aed', bg:'#ede9fe', referencia:'Lucas 1-2, Mateus 1-2', texto:`O anjo Gabriel apareceu para Maria: "Deus a escolheu para ser a mãe do Filho de Deus. Chame-o de Jesus!"\n\nMaria respondeu com fé: "Que aconteça comigo como você disse!"\n\nJosé e Maria viajaram a Belém. A cidade estava lotada — não havia lugar nas pousadas!\n\nUm estalajadeiro ofereceu o estábulo dos animais. E foi lá que nasceu Jesus! Maria o deitou numa manjedoura.\n\nAnjos anunciaram aos pastores: "Nasceu o Salvador!" Uma estrela brilhante guiou os Reis Magos de longe.\n\nO maior presente do mundo havia chegado! 🌟`, quiz:[{pergunta:'Qual anjo apareceu para Maria?',opcoes:['Miguel','Rafael','Gabriel','Uriel'],correta:2},{pergunta:'Em qual cidade Jesus nasceu?',opcoes:['Nazaré','Jerusalém','Belém','Jericó'],correta:2},{pergunta:'O que Jesus usou como berço?',opcoes:['Uma cama de madeira','Uma manjedoura','Um cesto','Uma rede'],correta:1}], vof:[{afirmacao:'Maria aceitou com alegria ser a mãe de Jesus.',resposta:true},{afirmacao:'José e Maria encontraram facilmente lugar na pousada.',resposta:false},{afirmacao:'Pastores foram os primeiros a receber a notícia do nascimento.',resposta:true},{afirmacao:'Jesus nasceu num palácio de rei.',resposta:false}] },
];

const TOTAL_MAX = HISTORIAS.length * (PONTOS_QUIZ + PONTOS_VOF);

function medalha(pts) {
  const p = pts / TOTAL_MAX;
  if (p >= 0.9) return { icon:'🏆', label:'Campeão Bíblico!', cor:'#f59e0b' };
  if (p >= 0.7) return { icon:'🥇', label:'Expert Bíblico!', cor:'#f97316' };
  if (p >= 0.5) return { icon:'🥈', label:'Estudante Dedicado!', cor:'#6b7280' };
  if (p >= 0.3) return { icon:'🥉', label:'Explorador Bíblico!', cor:'#92400e' };
  return { icon:'🌱', label:'Iniciante Corajoso!', cor:'#16a34a' };
}

export default function Kids({ dark, onVoltar, user, userData, setUserData, saveKidsScore }) {
  const [tela, setTela] = useState('lista');
  const [historiaAtual, setHistoriaAtual] = useState(null);
  const [atividadeTipo, setAtividadeTipo] = useState('quiz');
  const [respostas, setRespostas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const pontosAtuais = userData?.kidsScore || 0;
  const med = medalha(pontosAtuais);

  function abrirHistoria(h) { setHistoriaAtual(h); setTela('historia'); setRespostas({}); setMostrarResultado(false); }
  function abrirAtividade(tipo) { setAtividadeTipo(tipo); setRespostas({}); setMostrarResultado(false); setTela('atividade'); }
  function responder(idx, valor) { if (mostrarResultado) return; setRespostas(prev => ({ ...prev, [idx]: valor })); }

  const perguntas = historiaAtual ? (atividadeTipo === 'quiz' ? historiaAtual.quiz : historiaAtual.vof) : [];
  const todasRespondidas = perguntas.length > 0 && perguntas.every((_, i) => respostas[i] !== undefined);

  function calcAcertos() {
    return perguntas.filter((p, i) => atividadeTipo === 'quiz' ? respostas[i] === p.correta : respostas[i] === p.resposta).length;
  }
  function calcPontos() {
    const max = atividadeTipo === 'quiz' ? PONTOS_QUIZ : PONTOS_VOF;
    return Math.round((calcAcertos() / perguntas.length) * max);
  }

  async function verificar() {
    setMostrarResultado(true);
    const pts = calcPontos();
    if (pts > 0 && saveKidsScore) {
      const novo = pontosAtuais + pts;
      await saveKidsScore(novo);
      setUserData(prev => ({ ...prev, kidsScore: novo }));
    }
  }

  if (tela === 'lista') return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding:'20px 16px', paddingBottom:80 }}>
      <button onClick={onVoltar} style={{ background:'rgba(255,255,255,0.2)', border:'none', cursor:'pointer', color:'#fff', fontSize:14, fontFamily:'sans-serif', padding:'8px 16px', borderRadius:20, marginBottom:16, fontWeight:600 }}>← Voltar</button>
      <div style={{ textAlign:'center', marginBottom:20 }}>
        <div style={{ fontSize:56, marginBottom:4 }}>📚</div>
        <h1 style={{ fontSize:28, fontWeight:900, color:'#fff', margin:0, textShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>Área Kids!</h1>
        <p style={{ color:'rgba(255,255,255,0.85)', fontFamily:'sans-serif', fontSize:15, marginTop:4 }}>Histórias incríveis da Bíblia! 🎉</p>
      </div>
      <div style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', borderRadius:20, padding:'16px 20px', marginBottom:20, border:'2px solid rgba(255,255,255,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:900, color:'#fff' }}>{med.icon} {pontosAtuais} pontos</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.8)', fontFamily:'sans-serif' }}>{med.label}</div>
          </div>
          <div style={{ textAlign:'right', fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'sans-serif' }}>
            <div>Máximo: {TOTAL_MAX} pts</div>
            <div>Quiz=30 • V/F=20</div>
          </div>
        </div>
        <div style={{ background:'rgba(255,255,255,0.2)', borderRadius:10, height:14, overflow:'hidden' }}>
          <div style={{ height:'100%', background:'linear-gradient(90deg, #fbbf24, #f97316)', borderRadius:10, width:`${Math.min(100,(pontosAtuais/TOTAL_MAX)*100)}%`, transition:'width .5s' }} />
        </div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'sans-serif', textAlign:'right', marginTop:4 }}>{Math.round((pontosAtuais/TOTAL_MAX)*100)}% completo</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14 }}>
        {HISTORIAS.map(h => (
          <button key={h.id} onClick={() => abrirHistoria(h)}
            style={{ background:'#fff', border:`3px solid ${h.cor}`, borderRadius:20, padding:'18px 10px', cursor:'pointer', textAlign:'center', boxShadow:`0 4px 16px ${h.cor}40` }}>
            <div style={{ fontSize:36, marginBottom:8 }}>{h.emoji}</div>
            <div style={{ fontSize:13, fontWeight:800, color:h.cor, lineHeight:1.3 }}>{h.titulo}</div>
            <div style={{ fontSize:10, color:'#94a3b8', fontFamily:'sans-serif', marginTop:4 }}>{h.referencia}</div>
          </button>
        ))}
      </div>
    </div>
  );

  if (tela === 'historia') return (
    <div style={{ minHeight:'100vh', background:historiaAtual.bg, padding:'20px 16px', paddingBottom:80 }}>
      <button onClick={() => setTela('lista')} style={{ background:historiaAtual.cor, border:'none', cursor:'pointer', color:'#fff', fontSize:14, fontFamily:'sans-serif', padding:'8px 16px', borderRadius:20, marginBottom:16, fontWeight:700 }}>← Histórias</button>
      <div style={{ borderRadius:24, overflow:'hidden', marginBottom:20, boxShadow:`0 8px 32px ${historiaAtual.cor}40` }}>
        {Ilustracoes[historiaAtual.id]}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
        <span style={{ fontSize:36 }}>{historiaAtual.emoji}</span>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:historiaAtual.cor, margin:0 }}>{historiaAtual.titulo}</h2>
          <span style={{ fontSize:12, color:'#64748b', fontFamily:'sans-serif' }}>{historiaAtual.referencia}</span>
        </div>
      </div>
      <div style={{ background:'#fff', border:`2px solid ${historiaAtual.cor}40`, borderRadius:20, padding:20, marginBottom:24, lineHeight:2, fontSize:16, color:'#1e293b', whiteSpace:'pre-line', boxShadow:`0 4px 16px ${historiaAtual.cor}20` }}>
        {historiaAtual.texto}
      </div>
      <div style={{ display:'flex', gap:12 }}>
        <button onClick={() => abrirAtividade('quiz')}
          style={{ flex:1, padding:'16px', background:historiaAtual.cor, color:'#fff', border:'none', borderRadius:16, cursor:'pointer', fontFamily:'sans-serif', fontSize:16, fontWeight:900, boxShadow:`0 4px 16px ${historiaAtual.cor}60` }}>
          🎯 Quiz<br/><span style={{fontSize:11,opacity:0.85}}>+{PONTOS_QUIZ} pts</span>
        </button>
        <button onClick={() => abrirAtividade('vof')}
          style={{ flex:1, padding:'16px', background:'#fff', color:historiaAtual.cor, border:`3px solid ${historiaAtual.cor}`, borderRadius:16, cursor:'pointer', fontFamily:'sans-serif', fontSize:16, fontWeight:900 }}>
          ✅ V ou F<br/><span style={{fontSize:11,opacity:0.7}}>+{PONTOS_VOF} pts</span>
        </button>
      </div>
    </div>
  );

  if (tela === 'atividade') {
    const acertos = mostrarResultado ? calcAcertos() : 0;
    const pts = mostrarResultado ? calcPontos() : 0;
    const total = perguntas.length;
    const max = atividadeTipo === 'quiz' ? PONTOS_QUIZ : PONTOS_VOF;

    return (
      <div style={{ minHeight:'100vh', background:historiaAtual.bg, padding:'20px 16px', paddingBottom:80 }}>
        <button onClick={() => setTela('historia')} style={{ background:historiaAtual.cor, border:'none', cursor:'pointer', color:'#fff', fontSize:14, fontFamily:'sans-serif', padding:'8px 16px', borderRadius:20, marginBottom:16, fontWeight:700 }}>← Voltar à história</button>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:40 }}>{atividadeTipo === 'quiz' ? '🎯' : '✅'}</div>
          <h2 style={{ fontSize:22, fontWeight:900, color:historiaAtual.cor, margin:'8px 0 4px' }}>{atividadeTipo === 'quiz' ? 'Quiz' : 'Verdadeiro ou Falso'}</h2>
          <p style={{ color:'#64748b', fontFamily:'sans-serif', fontSize:14, margin:0 }}>{historiaAtual.titulo}</p>
        </div>

        {mostrarResultado && (
          <div style={{ background: acertos===total ? '#dcfce7' : acertos>=total/2 ? '#fef3c7' : '#fee2e2', borderRadius:20, padding:20, marginBottom:24, textAlign:'center', border:`3px solid ${acertos===total ? '#16a34a' : acertos>=total/2 ? '#d97706' : '#dc2626'}` }}>
            <div style={{ fontSize:48, marginBottom:8 }}>{acertos===total ? '🏆' : acertos>=total/2 ? '👍' : '💪'}</div>
            <div style={{ fontSize:24, fontWeight:900, color: acertos===total ? '#16a34a' : acertos>=total/2 ? '#d97706' : '#dc2626' }}>{acertos} de {total} acertos!</div>
            <div style={{ fontSize:20, fontWeight:800, color:'#7c3aed', marginTop:8 }}>+{pts} pontos! 🎉</div>
            <div style={{ fontSize:14, color:'#64748b', fontFamily:'sans-serif', marginTop:4 }}>{acertos===total ? 'Incrível! Você é demais! 🌟' : acertos>=total/2 ? 'Muito bem! Continue assim! 💪' : 'Tente de novo, você consegue! 🚀'}</div>
          </div>
        )}

        {atividadeTipo === 'quiz' ? historiaAtual.quiz.map((q, i) => (
          <div key={i} style={{ background:'#fff', border:`2px solid ${historiaAtual.cor}30`, borderRadius:20, padding:18, marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize:16, fontWeight:800, color:'#1e293b', margin:'0 0 14px', lineHeight:1.4 }}>{i+1}. {q.pergunta}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {q.opcoes.map((op, j) => {
                let bg='#f8fafc', cor='#1e293b', borda='#e2e8f0', fw=400;
                if (respostas[i]===j) { bg=historiaAtual.cor+'20'; borda=historiaAtual.cor; cor=historiaAtual.cor; fw=700; }
                if (mostrarResultado) {
                  if (j===q.correta) { bg='#dcfce7'; borda='#16a34a'; cor='#15803d'; fw=700; }
                  else if (respostas[i]===j) { bg='#fee2e2'; borda='#dc2626'; cor='#dc2626'; fw=700; }
                }
                return <button key={j} onClick={() => responder(i,j)} style={{ padding:'13px 16px', background:bg, border:`2px solid ${borda}`, borderRadius:14, cursor:mostrarResultado?'default':'pointer', textAlign:'left', fontSize:15, color:cor, fontFamily:'sans-serif', fontWeight:fw }}>{mostrarResultado&&j===q.correta?'✅ ':mostrarResultado&&respostas[i]===j?'❌ ':''}{op}</button>;
              })}
            </div>
          </div>
        )) : historiaAtual.vof.map((v, i) => {
          const certo = mostrarResultado && respostas[i]===v.resposta;
          const errado = mostrarResultado && respostas[i]!==undefined && respostas[i]!==v.resposta;
          return (
            <div key={i} style={{ background:'#fff', border:`2px solid ${certo?'#16a34a':errado?'#dc2626':historiaAtual.cor+'30'}`, borderRadius:20, padding:18, marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize:16, fontWeight:700, color:'#1e293b', margin:'0 0 14px', lineHeight:1.4 }}>{i+1}. {v.afirmacao}</p>
              <div style={{ display:'flex', gap:10 }}>
                {[true,false].map(val => {
                  let bg='#f8fafc', cor='#1e293b', borda='#e2e8f0', fw=600;
                  if (respostas[i]===val) { bg=historiaAtual.cor+'20'; borda=historiaAtual.cor; cor=historiaAtual.cor; fw=800; }
                  if (mostrarResultado) {
                    if (val===v.resposta) { bg='#dcfce7'; borda='#16a34a'; cor='#15803d'; fw=800; }
                    else if (respostas[i]===val) { bg='#fee2e2'; borda='#dc2626'; cor='#dc2626'; fw=800; }
                  }
                  return <button key={String(val)} onClick={() => responder(i,val)} style={{ flex:1, padding:'13px', background:bg, border:`2px solid ${borda}`, borderRadius:14, cursor:mostrarResultado?'default':'pointer', fontSize:15, color:cor, fontFamily:'sans-serif', fontWeight:fw }}>{val?'✅ Verdadeiro':'❌ Falso'}</button>;
                })}
              </div>
            </div>
          );
        })}

        {!mostrarResultado && (
          <button onClick={verificar} disabled={!todasRespondidas}
            style={{ width:'100%', padding:'16px', background:todasRespondidas?historiaAtual.cor:'#e2e8f0', color:todasRespondidas?'#fff':'#94a3b8', border:'none', borderRadius:16, cursor:todasRespondidas?'pointer':'default', fontFamily:'sans-serif', fontSize:17, fontWeight:900, marginTop:8, boxShadow:todasRespondidas?`0 4px 16px ${historiaAtual.cor}60`:'none' }}>
            {todasRespondidas ? `✔️ Ver resultado (+${max} pts)` : `Responda todas as ${perguntas.length} perguntas`}
          </button>
        )}
        {mostrarResultado && (
          <div style={{ display:'flex', gap:10, marginTop:8 }}>
            <button onClick={() => { setRespostas({}); setMostrarResultado(false); }}
              style={{ flex:1, padding:'14px', background:historiaAtual.cor, color:'#fff', border:'none', borderRadius:14, cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:800, boxShadow:`0 4px 16px ${historiaAtual.cor}60` }}>
              🔄 Tentar de novo
            </button>
            <button onClick={() => setTela('historia')}
              style={{ flex:1, padding:'14px', background:'#fff', color:historiaAtual.cor, border:`2px solid ${historiaAtual.cor}`, borderRadius:14, cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:700 }}>
              📖 Ver história
            </button>
          </div>
        )}
      </div>
    );
  }
}
