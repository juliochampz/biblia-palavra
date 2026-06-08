import { useState } from 'react';

const LIGHT = {
  bg:'#f8fafc', bg2:'#fff', bg3:'#f1f5f9',
  text:'#1e293b', text2:'#64748b', text3:'#94a3b8',
  border:'#e2e8f0', accent:'#1e40af', accentLight:'#bfdbfe',
  accentBg:'#eff6ff', headerBg:'#fff', cardBg:'#fff',
};
const DARK = {
  bg:'#0f172a', bg2:'#1e293b', bg3:'#1e293b',
  text:'#f1f5f9', text2:'#94a3b8', text3:'#64748b',
  border:'#334155', accent:'#60a5fa', accentLight:'#1e40af',
  accentBg:'#172554', headerBg:'#1e293b', cardBg:'#1e293b',
};

// ── Ilustrações SVG ────────────────────────────────────────────────────────
const Ilustracoes = {
  criacao: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <defs><radialGradient id="sky" cx="50%" cy="40%"><stop offset="0%" stopColor="#7dd3fc"/><stop offset="100%" stopColor="#1e40af"/></radialGradient></defs>
      <rect width="300" height="180" fill="url(#sky)"/>
      <ellipse cx="150" cy="160" rx="160" ry="50" fill="#16a34a"/>
      <circle cx="60" cy="50" r="28" fill="#fde68a" opacity="0.9"/>
      <circle cx="200" cy="40" r="18" fill="#fff" opacity="0.8"/>
      <circle cx="230" cy="50" r="22" fill="#fff" opacity="0.7"/>
      <circle cx="210" cy="35" r="15" fill="#fff" opacity="0.9"/>
      <ellipse cx="80" cy="130" rx="25" ry="18" fill="#15803d"/>
      <ellipse cx="100" cy="120" rx="20" ry="15" fill="#16a34a"/>
      <rect x="90" y="130" width="8" height="20" fill="#92400e"/>
      <ellipse cx="200" cy="125" rx="22" ry="16" fill="#15803d"/>
      <ellipse cx="215" cy="115" rx="18" ry="14" fill="#16a34a"/>
      <rect x="207" y="128" width="7" height="18" fill="#92400e"/>
      <path d="M130 155 Q150 140 170 155" stroke="#60a5fa" strokeWidth="3" fill="none"/>
    </svg>
  ),
  adaoeva: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#d1fae5"/>
      <ellipse cx="150" cy="170" rx="160" ry="40" fill="#15803d"/>
      <circle cx="100" cy="70" r="22" fill="#fbbf24"/>
      <rect x="92" y="90" width="16" height="40" rx="8" fill="#fbbf24"/>
      <circle cx="200" cy="70" r="22" fill="#f9a8d4"/>
      <rect x="192" y="90" width="16" height="40" rx="8" fill="#f9a8d4"/>
      <ellipse cx="150" cy="80" rx="18" ry="30" fill="#15803d"/>
      <ellipse cx="150" cy="60" rx="14" ry="22" fill="#16a34a"/>
      <circle cx="150" cy="42" r="10" fill="#dc2626"/>
      <text x="143" y="46" fontSize="12" fill="#fff">🍎</text>
      <path d="M118 80 Q150 95 182 80" stroke="#92400e" strokeWidth="2" fill="none"/>
    </svg>
  ),
  noe: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#7dd3fc"/>
      <ellipse cx="150" cy="200" rx="200" ry="80" fill="#1d4ed8"/>
      <path d="M60 120 L80 100 L220 100 L240 120 Z" fill="#92400e"/>
      <rect x="80" y="80" width="140" height="25" fill="#b45309"/>
      <rect x="110" y="55" width="80" height="30" fill="#d97706"/>
      <path d="M150 40 L130 55 L170 55 Z" fill="#b45309"/>
      <text x="80" y="117" fontSize="16">🦁🐘🦒🐦</text>
      <path d="M10 140 Q50 125 90 140 Q130 155 170 140 Q210 125 250 140 Q280 150 300 140" stroke="#fff" strokeWidth="3" fill="none" opacity="0.6"/>
      <circle cx="240" cy="40" r="15" fill="#fde68a"/>
      <path d="M220 30 Q240 10 260 30" stroke="#f97316" strokeWidth="3" fill="none"/>
    </svg>
  ),
  babel: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#fef3c7"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#d97706"/>
      <rect x="110" y="150" width="80" height="25" fill="#b45309"/>
      <rect x="115" y="125" width="70" height="28" fill="#d97706"/>
      <rect x="122" y="100" width="56" height="28" fill="#b45309"/>
      <rect x="130" y="75" width="40" height="28" fill="#d97706"/>
      <rect x="138" y="50" width="24" height="28" fill="#b45309"/>
      <rect x="144" y="30" width="12" height="22" fill="#d97706"/>
      <circle cx="250" cy="35" r="20" fill="#fbbf24"/>
      <text x="60" y="100" fontSize="14" opacity="0.6">?</text>
      <text x="220" y="120" fontSize="14" opacity="0.6">!</text>
      <text x="80" y="140" fontSize="12" opacity="0.5">...</text>
    </svg>
  ),
  jose: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#fef3c7"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#d4a373"/>
      <circle cx="150" cy="65" r="28" fill="#fbbf24"/>
      <rect x="122" y="90" width="56" height="60" rx="4" fill="#7c3aed"/>
      <rect x="118" y="92" width="8" height="55" fill="#ec4899"/>
      <rect x="174" y="92" width="8" height="55" fill="#3b82f6"/>
      <rect x="130" y="90" width="40" height="8" fill="#fbbf24"/>
      <line x1="122" y1="92" x2="178" y2="92" stroke="#f59e0b" strokeWidth="2"/>
      <path d="M126 150 L122 175 M174 150 L178 175" stroke="#6b7280" strokeWidth="3"/>
      <text x="60" y="80" fontSize="20">⭐</text>
      <text x="210" y="80" fontSize="20">⭐</text>
      <text x="135" y="170" fontSize="14">🌾🌾</text>
    </svg>
  ),
  moises: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#dbeafe"/>
      <rect x="0" y="100" width="300" height="80" fill="#1d4ed8"/>
      <path d="M0 100 Q75 70 150 100 Q225 130 300 100 L300 80 Q225 110 150 80 Q75 50 0 80 Z" fill="#3b82f6"/>
      <circle cx="50" cy="50" r="22" fill="#fbbf24"/>
      <rect x="38" y="70" width="24" height="40" rx="4" fill="#d97706"/>
      <line x1="50" y1="70" x2="50" y2="110" stroke="#92400e" strokeWidth="3"/>
      <path d="M30 110 L50 90 L70 110" fill="none" stroke="#92400e" strokeWidth="2"/>
      <path d="M150 95 L155 75 L165 70 L170 80 L160 85 Z" fill="#fbbf24" opacity="0.8"/>
      <text x="200" y="90" fontSize="24">🌊</text>
      <text x="130" y="170" fontSize="14">🐟🐟🐟</text>
    </svg>
  ),
  davi: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#fef3c7"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#86efac"/>
      <circle cx="80" cy="60" r="22" fill="#fbbf24"/>
      <rect x="68" y="80" width="24" height="50" rx="4" fill="#3b82f6"/>
      <line x1="80" y1="80" x2="80" y2="130" stroke="#1d4ed8" strokeWidth="2"/>
      <ellipse cx="220" cy="90" rx="30" ry="45" fill="#6b7280"/>
      <circle cx="220" cy="45" r="20" fill="#9ca3af"/>
      <rect x="205" y="60" width="30" height="8" fill="#6b7280"/>
      <path d="M75 70 Q110 55 145 65" stroke="#92400e" strokeWidth="3" fill="none" strokeDasharray="4"/>
      <circle cx="148" cy="66" r="5" fill="#92400e"/>
      <text x="65" y="155" fontSize="14">🐑🐑</text>
      <text x="55" y="55" fontSize="12">⭐</text>
    </svg>
  ),
  jonas: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#0c4a6e"/>
      <ellipse cx="150" cy="120" rx="130" ry="60" fill="#1d4ed8"/>
      <path d="M20 120 Q75 100 130 120 Q185 140 240 120 Q270 110 300 120 L300 180 L0 180 Z" fill="#1e3a8a"/>
      <ellipse cx="200" cy="115" rx="70" ry="35" fill="#16a34a"/>
      <ellipse cx="150" cy="110" rx="50" ry="25" fill="#15803d"/>
      <circle cx="240" cy="95" r="8" fill="#fff" opacity="0.8"/>
      <text x="170" y="118" fontSize="20">👁</text>
      <circle cx="50" cy="60" r="18" fill="#fbbf24"/>
      <rect x="38" y="76" width="24" height="30" rx="4" fill="#d97706"/>
      <path d="M40 80 Q50 95 60 80" stroke="#b45309" strokeWidth="2" fill="none"/>
      <text x="10" y="50" fontSize="16">⛈</text>
      <text x="255" y="50" fontSize="16">🌊</text>
    </svg>
  ),
  daniel: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#1c1917"/>
      <rect x="0" y="120" width="300" height="60" fill="#292524"/>
      <rect x="0" y="0" width="40" height="180" fill="#44403c"/>
      <rect x="260" y="0" width="40" height="180" fill="#44403c"/>
      <circle cx="150" cy="75" r="22" fill="#fbbf24"/>
      <rect x="138" y="95" width="24" height="40" rx="4" fill="#7c3aed"/>
      <ellipse cx="80" cy="140" rx="25" ry="18" fill="#b45309"/>
      <circle cx="80" cy="125" r="12" fill="#d97706"/>
      <ellipse cx="60" cy="135" rx="8" ry="6" fill="#d97706"/>
      <ellipse cx="100" cy="135" rx="8" ry="6" fill="#d97706"/>
      <ellipse cx="220" cy="140" rx="25" ry="18" fill="#b45309"/>
      <circle cx="220" cy="125" r="12" fill="#d97706"/>
      <ellipse cx="200" cy="135" rx="8" ry="6" fill="#d97706"/>
      <ellipse cx="240" cy="135" rx="8" ry="6" fill="#d97706"/>
      <text x="135" y="50" fontSize="20">✨</text>
      <circle cx="150" cy="20" r="8" fill="#fbbf24" opacity="0.8"/>
    </svg>
  ),
  jesus: (
    <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',borderRadius:12}}>
      <rect width="300" height="180" fill="#1e1b4b"/>
      <ellipse cx="150" cy="175" rx="160" ry="30" fill="#92400e"/>
      <rect x="110" y="110" width="80" height="50" rx="4" fill="#b45309"/>
      <rect x="100" y="125" width="100" height="10" fill="#92400e"/>
      <circle cx="150" cy="100" r="15" fill="#fde68a"/>
      <ellipse cx="150" cy="95" rx="10" ry="8" fill="#fbbf24" opacity="0.6"/>
      <circle cx="60" cy="60" r="10" fill="#fde68a"/>
      <circle cx="80" cy="40" r="8" fill="#fde68a" opacity="0.8"/>
      <circle cx="240" cy="55" r="12" fill="#fde68a"/>
      <circle cx="220" cy="35" r="8" fill="#fde68a" opacity="0.7"/>
      <circle cx="150" cy="25" r="15" fill="#fbbf24"/>
      <path d="M150 10 L155 20 L150 18 L145 20 Z" fill="#fbbf24"/>
      <text x="30" y="100" fontSize="14">🐑</text>
      <text x="240" y="110" fontSize="14">🐄</text>
      <text x="130" y="175" fontSize="12">🌟</text>
    </svg>
  ),
};

// ── Histórias ──────────────────────────────────────────────────────────────
const HISTORIAS = [
  {
    id: 'criacao',
    titulo: 'A Criação do Mundo',
    emoji: '🌍',
    cor: '#0ea5e9',
    corClara: '#e0f2fe',
    texto: `No começo, não existia nada — nem luz, nem terra, nem animais. Só havia escuridão. Então Deus começou a criar!

No primeiro dia, Deus disse: "Haja luz!" E a luz apareceu, separando o dia da noite.

No segundo dia, Deus criou o céu, separando as águas de cima das águas de baixo.

No terceiro dia, Deus juntou as águas num só lugar e fez aparecer a terra seca. Depois cobriu a terra de plantas, flores, árvores e frutos deliciosos!

No quarto dia, Deus criou o sol para iluminar o dia, a lua para a noite, e encheu o céu de estrelas brilhantes.

No quinto dia, os oceanos ganharam peixes de todas as cores, e o céu ficou cheio de pássaros cantantes.

No sexto dia, Deus criou os animais terrestres — leões, elefantes, borboletas, formigas... e também criou o ser humano, feito à Sua imagem!

No sétimo dia, Deus descansou e abençoou esse dia, tornando-o especial.

Tudo o que Deus criou era muito bom! 🌟`,
    referencia: 'Gênesis 1-2',
    quiz: [
      { pergunta: 'O que Deus criou no primeiro dia?', opcoes: ['Os animais', 'A luz', 'O sol', 'Os peixes'], correta: 1 },
      { pergunta: 'Em qual dia Deus criou o ser humano?', opcoes: ['Terceiro', 'Quarto', 'Quinto', 'Sexto'], correta: 3 },
      { pergunta: 'O que Deus fez no sétimo dia?', opcoes: ['Criou os animais', 'Criou as estrelas', 'Descansou', 'Criou a terra'], correta: 2 },
    ],
    vof: [
      { afirmacao: 'Deus criou a luz no primeiro dia.', resposta: true },
      { afirmacao: 'Os pássaros foram criados no terceiro dia.', resposta: false },
      { afirmacao: 'Deus achou que tudo que criou era muito bom.', resposta: true },
      { afirmacao: 'Deus trabalhou no sétimo dia também.', resposta: false },
    ],
  },
  {
    id: 'adaoeva',
    titulo: 'Adão e Eva',
    emoji: '🍎',
    cor: '#16a34a',
    corClara: '#dcfce7',
    texto: `Depois de criar o mundo, Deus formou o primeiro homem do pó da terra e soprou vida em suas narinas. Seu nome era Adão!

Deus plantou um jardim maravilhoso chamado Éden, cheio de árvores lindas e frutos deliciosos. Ele colocou Adão lá para cuidar do jardim.

Deus disse a Adão: "Você pode comer de qualquer árvore do jardim, exceto da árvore do conhecimento do bem e do mal. Se comer dela, vai morrer."

Depois, Deus criou Eva para ser a companheira de Adão, pois não era bom o homem ficar sozinho.

Mas uma serpente astuta enganou Eva, dizendo que a fruta proibida era deliciosa e faria ela ficar sábia como Deus. Eva comeu e deu para Adão também.

Quando Deus foi ao jardim, viu que eles tinham desobedecido. Com o coração cheio de tristeza, Deus precisou tirá-los do Jardim do Éden.

Mas mesmo assim, Deus nunca deixou de amar Adão e Eva! Deus já tinha um plano para salvar a humanidade. 💕`,
    referencia: 'Gênesis 2-3',
    quiz: [
      { pergunta: 'Como se chamava o jardim onde Adão e Eva viviam?', opcoes: ['Nazaré', 'Éden', 'Belém', 'Canaã'], correta: 1 },
      { pergunta: 'O que estava proibido no jardim?', opcoes: ['Nadar', 'Correr', 'Comer da árvore do conhecimento', 'Falar com animais'], correta: 2 },
      { pergunta: 'Quem enganou Eva?', opcoes: ['Um leão', 'Adão', 'Uma serpente', 'Um anjo'], correta: 2 },
    ],
    vof: [
      { afirmacao: 'Adão foi criado do pó da terra.', resposta: true },
      { afirmacao: 'Eva foi criada antes de Adão.', resposta: false },
      { afirmacao: 'Deus permitiu que comessem de todas as árvores.', resposta: false },
      { afirmacao: 'Deus continuou amando Adão e Eva mesmo depois da desobediência.', resposta: true },
    ],
  },
  {
    id: 'noe',
    titulo: 'Noé e o Dilúvio',
    emoji: '🌈',
    cor: '#7c3aed',
    corClara: '#ede9fe',
    texto: `Muitos anos depois de Adão e Eva, as pessoas no mundo tinham se afastado muito de Deus. Havia muita maldade por toda parte.

Mas havia um homem diferente: Noé. Ele era justo e caminhava com Deus. Deus escolheu Noé para uma missão especial!

Deus disse a Noé: "Vou enviar um grande dilúvio. Construa uma arca enorme de madeira para você, sua família e um casal de cada animal."

Noé obedeceu! Mesmo com todo mundo rindo dele, ele trabalhou por anos construindo a arca gigante. Quando ficou pronta, entrou com sua família e com os animais — elefantes, girafas, leões, pombas, formigas e muitos outros!

Então a chuva começou. Choveu por 40 dias e 40 noites! A água cobriu toda a terra. Mas Noé e todos dentro da arca estavam seguros.

Quando a chuva parou, Noé soltou uma pomba que voltou com um ramo de oliveira — sinal de que a terra estava seca!

Ao sair da arca, Noé agradeceu a Deus. Então algo lindo apareceu no céu: um ARCO-ÍRIS! Deus prometeu que nunca mais destruiria a terra com um dilúvio. 🌈`,
    referencia: 'Gênesis 6-9',
    quiz: [
      { pergunta: 'Por quantos dias e noites choveu?', opcoes: ['7', '20', '40', '100'], correta: 2 },
      { pergunta: 'Que animal Noé soltou para ver se a terra estava seca?', opcoes: ['Corvo e pomba', 'Águia', 'Pomba', 'Pardal'], correta: 2 },
      { pergunta: 'O que Deus colocou no céu como sinal da promessa?', opcoes: ['Uma estrela', 'Um arco-íris', 'Uma nuvem', 'O sol'], correta: 1 },
    ],
    vof: [
      { afirmacao: 'Noé era um homem mau.', resposta: false },
      { afirmacao: 'Noé levou um casal de cada animal para a arca.', resposta: true },
      { afirmacao: 'A pomba voltou com um ramo de oliveira.', resposta: true },
      { afirmacao: 'Deus prometeu nunca mais destruir a terra com fogo.', resposta: false },
    ],
  },
  {
    id: 'babel',
    titulo: 'A Torre de Babel',
    emoji: '🏗️',
    cor: '#d97706',
    corClara: '#fef3c7',
    texto: `Depois do dilúvio, as pessoas se espalharam pela terra. Naquela época, todo mundo falava a mesma língua e se entendia perfeitamente.

Um dia, as pessoas chegaram numa planície chamada Sinear e tiveram uma ideia. Elas disseram: "Vamos construir uma cidade enorme e uma torre tão alta que chegue até o céu! Assim vamos ficar famosos e ninguém vai nos espalhar pela terra!"

Elas começaram a trabalhar duro, fazendo tijolos e construindo cada vez mais alto. A torre crescia, crescia e crescia...

Mas Deus viu o que estavam fazendo. O problema não era a torre em si, mas o coração das pessoas: elas queriam se igualar a Deus e dependiam só delas mesmas, sem precisar d'Ele.

Então Deus fez algo surpreendente: confundiu a linguagem das pessoas! De repente, ninguém entendia mais ninguém. Um dizia "tijolo" e o outro ouvia palavras estranhas!

Sem conseguir se comunicar, as pessoas pararam de construir e se espalharam pelos quatro cantos do mundo. A cidade incompleta ficou conhecida como Babel, que significa "confusão".

E foi assim que surgiram as diferentes línguas e culturas do mundo! 🌍`,
    referencia: 'Gênesis 11:1-9',
    quiz: [
      { pergunta: 'Como se chamava a planície onde as pessoas construíram a torre?', opcoes: ['Éden', 'Sinear', 'Canaã', 'Egito'], correta: 1 },
      { pergunta: 'Por que Deus confundiu as línguas das pessoas?', opcoes: ['Porque a torre era feia', 'Porque elas queriam se igualar a Deus sem depender d\'Ele', 'Porque elas brigavam', 'Porque a torre era muito alta'], correta: 1 },
      { pergunta: 'O que significa o nome "Babel"?', opcoes: ['Paz', 'Alegria', 'Confusão', 'Torre'], correta: 2 },
    ],
    vof: [
      { afirmacao: 'No começo, todas as pessoas falavam a mesma língua.', resposta: true },
      { afirmacao: 'As pessoas queriam construir a torre para honrar a Deus.', resposta: false },
      { afirmacao: 'Deus aprovou a construção da torre.', resposta: false },
      { afirmacao: 'Depois de Babel, as pessoas se espalharam pelo mundo.', resposta: true },
    ],
  },
  {
    id: 'jose',
    titulo: 'José e a Túnica Colorida',
    emoji: '🌈',
    cor: '#7c3aed',
    corClara: '#ede9fe',
    texto: `Jacó tinha doze filhos, mas José era seu filho favorito. Para mostrar seu amor, Jacó deu a José uma túnica linda e colorida, cheia de cores vibrantes!

Os irmãos de José ficaram com muita inveja. A situação piorou quando José contou seus sonhos: ele sonhou que todos os irmãos se curvavam para ele como feixes de trigo, e que o sol, a lua e onze estrelas se inclinavam diante dele.

Com raiva, os irmãos fizeram uma coisa terrível: jogaram José numa cisterna e depois o venderam para mercadores egípcios por 20 moedas de prata!

Eles mentiram para o pai, mostrando a túnica ensanguentada de um animal, dizendo que José tinha morrido.

No Egito, José foi vendido como escravo. Mesmo sofrendo injustiças, ele confiou em Deus. Deus estava com José em tudo!

Deus deu a José um dom especial: interpretar sonhos. Quando o Faraó teve sonhos perturbadores, chamaram José. Ele explicou que haveria 7 anos de fartura e 7 de fome no Egito.

Impressionado, o Faraó nomeou José como segundo homem mais poderoso do Egito!

Quando a fome chegou, os irmãos de José foram ao Egito pedir comida — e se curvaram diante dele, exatamente como no sonho! José os perdoou com amor e trouxe toda a família para o Egito. Os planos de Deus são sempre maiores! 💛`,
    referencia: 'Gênesis 37-45',
    quiz: [
      { pergunta: 'Por quanto José foi vendido pelos irmãos?', opcoes: ['10 moedas de ouro', '20 moedas de prata', '30 moedas de bronze', '5 moedas de ouro'], correta: 1 },
      { pergunta: 'Que dom especial Deus deu a José?', opcoes: ['Cantar', 'Interpretar sonhos', 'Curar doenças', 'Correr rápido'], correta: 1 },
      { pergunta: 'O que aconteceu quando os irmãos foram ao Egito?', opcoes: ['Foram presos', 'Se curvaram diante de José', 'Não reconheceram José', 'Voltaram sem comida'], correta: 1 },
    ],
    vof: [
      { afirmacao: 'José era o filho favorito de Jacó.', resposta: true },
      { afirmacao: 'Os irmãos de José ficaram felizes com a túnica colorida.', resposta: false },
      { afirmacao: 'José guardou rancor dos irmãos e se vingou.', resposta: false },
      { afirmacao: 'Deus estava com José mesmo quando ele sofria.', resposta: true },
    ],
  },
  {
    id: 'moises',
    titulo: 'Moisés e o Mar Vermelho',
    emoji: '🌊',
    cor: '#0891b2',
    corClara: '#cffafe',
    texto: `O povo de Israel estava escravizado no Egito há muitos anos. Eles trabalhavam muito, sofriam e clamavam a Deus por ajuda.

Deus escolheu Moisés para libertá-los! Após muitas pragas no Egito, o Faraó finalmente deixou o povo partir. Mais de 600 mil pessoas saíram do Egito!

Mas logo o Faraó se arrependeu e enviou seu poderoso exército atrás deles. Quando os israelitas chegaram à beira do Mar Vermelho, ficaram aterrorizados: o mar à frente e o exército atrás!

O povo reclamou com Moisés: "Para que nos tiraste do Egito para morrer aqui?"

Moisés disse com fé: "Não tenham medo! Vejam a salvação do Senhor!"

Então Deus fez algo INCRÍVEL: mandou Moisés estender seu cajado sobre o mar. Um vento forte soprou a noite toda, e as águas se abriram! Formou-se um caminho seco no meio do mar, com paredes de água dos dois lados!

Todo o povo atravessou com segurança! Quando o exército egípcio tentou seguir, as águas voltaram e os cobriram.

O povo ficou tão maravilhado que cantou e dançou de alegria, agradecendo a Deus pela libertação! 🎉`,
    referencia: 'Êxodo 14',
    quiz: [
      { pergunta: 'O que o povo de Israel estava fazendo no Egito?', opcoes: ['Reinando', 'Estudando', 'Escravizado trabalhando', 'Descansando'], correta: 2 },
      { pergunta: 'O que Deus fez com o Mar Vermelho?', opcoes: ['Secou completamente', 'Abriu as águas formando um caminho', 'Fez chover muito', 'Transformou em terra'], correta: 1 },
      { pergunta: 'O que o povo fez depois de atravessar o mar?', opcoes: ['Voltou para o Egito', 'Cantou e dançou agradecendo a Deus', 'Dormiu', 'Reclamou de novo'], correta: 1 },
    ],
    vof: [
      { afirmacao: 'Moisés foi escolhido por Deus para libertar o povo.', resposta: true },
      { afirmacao: 'O povo estava confiante quando viu o exército chegando.', resposta: false },
      { afirmacao: 'As águas se abriram quando Moisés estendeu o cajado.', resposta: true },
      { afirmacao: 'O exército egípcio também conseguiu atravessar o mar.', resposta: false },
    ],
  },
  {
    id: 'davi',
    titulo: 'Davi e Golias',
    emoji: '🪨',
    cor: '#dc2626',
    corClara: '#fee2e2',
    texto: `O exército de Israel estava em guerra com os filisteus. E os filisteus tinham um guerreiro terrível: Golias!

Golias media quase 3 metros de altura! Era enorme. Ele usava uma armadura pesada e carregava uma lança enorme. Todo dia ele gritava: "Mandem alguém lutar comigo! Se ele me vencer, seremos seus servos. Se eu vencer, vocês serão nossos servos!"

Os soldados israelitas ficavam paralisados de medo. Ninguém queria enfrentar Golias!

Mas um jovem pastor chamado Davi chegou ao campo de batalha para levar comida aos irmãos. Quando ouviu Golias provocando Israel, ficou indignado: "Quem é esse filisteu que desafia os exércitos de Deus?"

Davi se ofereceu para lutar! O rei Saul ficou surpreso: Davi era apenas um garoto! Mas Davi disse: "Eu cuidei de ovelhas e matei leões e ursos que as atacavam. Deus me protegeu lá, e vai me proteger aqui também!"

Davi pegou sua funda e escolheu 5 pedras lisas no riacho. Golias gargalhou quando viu o menininho se aproximando.

Mas Davi gritou: "Você vem com espada, mas eu venho em nome do Senhor!" Ele colocou uma pedra na funda, girou e atirou. A pedra acertou exatamente a testa de Golias — e o gigante caiu!

O maior gigante foi derrubado por um garoto que confiou em Deus! 🗡️`,
    referencia: '1 Samuel 17',
    quiz: [
      { pergunta: 'Quantas pedras Davi pegou para lutar?', opcoes: ['1', '3', '5', '10'], correta: 2 },
      { pergunta: 'O que Davi usou para derrotar Golias?', opcoes: ['Espada', 'Arco e flecha', 'Funda e pedra', 'Lança'], correta: 2 },
      { pergunta: 'O que Davi era antes de ser guerreiro?', opcoes: ['Pescador', 'Pastor', 'Carpinteiro', 'Soldado'], correta: 1 },
    ],
    vof: [
      { afirmacao: 'Golias era um guerreiro israelita.', resposta: false },
      { afirmacao: 'Os soldados de Israel tinham muito medo de Golias.', resposta: true },
      { afirmacao: 'Davi confiou na força de Deus para vencer.', resposta: true },
      { afirmacao: 'Golias usava uma armadura muito leve.', resposta: false },
    ],
  },
  {
    id: 'jonas',
    titulo: 'Jonas e o Peixe Grande',
    emoji: '🐋',
    cor: '#0891b2',
    corClara: '#cffafe',
    texto: `Deus chamou o profeta Jonas: "Levanta e vai à grande cidade de Nínive! As pessoas de lá estão fazendo coisas muito erradas."

Mas Jonas não queria ir. Nínive era inimiga de Israel! Jonas fugiu na direção oposta, embarcando num navio rumo a Társis.

No mar, Deus enviou uma tempestade enorme. O navio sacudia tanto que os marinheiros ficaram apavorados! Eles jogavam a carga ao mar para aliviar o peso.

Jonas estava dormindo lá embaixo. Quando o capitão o acordou, fizeram uma sorte para descobrir quem era o culpado. A sorte caiu sobre Jonas!

Jonas confessou: "Eu fugi de Deus. Joguem-me ao mar e a tempestade vai parar."

Os marinheiros, com muita pena, jogaram Jonas ao mar. E imediatamente a tempestade parou!

Então Deus preparou um GRANDE PEIXE que engoliu Jonas. Dentro do peixe, durante 3 dias e 3 noites, Jonas orou e pediu perdão a Deus.

O peixe vomitou Jonas em terra firme!

Desta vez, Jonas obedeceu. Ele foi a Nínive e pregou. Para sua surpresa, as pessoas se arrependeram! Deus perdoou toda a cidade.

Jonas aprendeu que o amor de Deus é para todas as pessoas! ❤️`,
    referencia: 'Jonas 1-4',
    quiz: [
      { pergunta: 'Para onde Deus mandou Jonas ir?', opcoes: ['Jerusalém', 'Nínive', 'Egito', 'Países Baixos'], correta: 1 },
      { pergunta: 'Por quantos dias Jonas ficou dentro do peixe?', opcoes: ['1', '2', '3', '7'], correta: 2 },
      { pergunta: 'O que aconteceu quando Jonas pregou em Nínive?', opcoes: ['Ninguém ouviu', 'As pessoas o expulsaram', 'As pessoas se arrependeram', 'A cidade foi destruída'], correta: 2 },
    ],
    vof: [
      { afirmacao: 'Jonas obedeceu imediatamente quando Deus o chamou.', resposta: false },
      { afirmacao: 'A tempestade parou quando Jonas foi jogado ao mar.', resposta: true },
      { afirmacao: 'Jonas ficou no peixe por 3 dias e 3 noites.', resposta: true },
      { afirmacao: 'Deus não perdoou as pessoas de Nínive.', resposta: false },
    ],
  },
  {
    id: 'daniel',
    titulo: 'Daniel na Cova dos Leões',
    emoji: '🦁',
    cor: '#d97706',
    corClara: '#fef3c7',
    texto: `Daniel era um jovem judeu que foi levado como escravo para a Babilônia. Mas Deus estava com ele! Daniel se tornou um dos conselheiros mais importantes do rei.

Daniel tinha o hábito de orar a Deus três vezes por dia, ajoelhado diante de sua janela aberta em direção a Jerusalém. Era uma prática sagrada para ele.

Mas alguns conselheiros tinham inveja de Daniel e queriam acabar com ele. Eles convenceram o rei Dário a assinar uma lei dizendo que, por 30 dias, ninguém poderia pedir nada a nenhum deus ou homem, exceto ao rei. Quem desobedecesse seria jogado na cova dos leões!

Daniel soube da lei. Mas ele foi para casa, abriu sua janela e orou a Deus como sempre fazia.

Os inimigos correram ao rei para denunciá-lo. O rei ficou muito triste — ele gostava muito de Daniel! Mas a lei não podia ser mudada.

Daniel foi jogado na cova dos leões. O rei passou a noite sem dormir, sem comer, sem música — preocupado com Daniel.

De manhã cedinho, o rei correu até a cova e gritou: "Daniel! Teu Deus, a quem serves continuamente, foi capaz de te livrar dos leões?"

E Daniel respondeu: "Meu Deus enviou seu anjo e fechou a boca dos leões! Eles não me tocaram!"

Daniel saiu sem um arranhão! Deus havia salvado quem permaneceu fiel! 🦁✨`,
    referencia: 'Daniel 6',
    quiz: [
      { pergunta: 'Quantas vezes por dia Daniel orava?', opcoes: ['1', '2', '3', '7'], correta: 2 },
      { pergunta: 'Por quantos dias durava a lei que proibia orar?', opcoes: ['7', '20', '30', '40'], correta: 2 },
      { pergunta: 'O que Deus fez para proteger Daniel na cova?', opcoes: ['Removeu os leões', 'Enviou um anjo que fechou a boca dos leões', 'Fez Daniel invisível', 'Domou os leões'], correta: 1 },
    ],
    vof: [
      { afirmacao: 'Daniel parou de orar quando soube da nova lei.', resposta: false },
      { afirmacao: 'O rei Dário gostava muito de Daniel.', resposta: true },
      { afirmacao: 'Os leões feriram Daniel.', resposta: false },
      { afirmacao: 'Deus protegeu Daniel por causa de sua fidelidade.', resposta: true },
    ],
  },
  {
    id: 'jesus',
    titulo: 'O Nascimento de Jesus',
    emoji: '⭐',
    cor: '#7c3aed',
    corClara: '#ede9fe',
    texto: `Há mais de 2000 anos, em Nazaré, vivia uma jovem chamada Maria. Um dia, um anjo chamado Gabriel apareceu para ela com uma mensagem especial de Deus!

O anjo disse: "Salve, Maria! Deus a escolheu para ser a mãe do Filho de Deus. Você vai ter um filho e deverá chamá-lo de Jesus. Ele será grande e reinará para sempre!"

Maria ficou surpresa, mas respondeu com fé: "Que aconteça comigo como você disse!"

Maria era noiva de José, um carpinteiro. Quando ficou grávida, José ficou confuso. Mas um anjo apareceu em sonho para José também: "Não tenha medo de receber Maria como sua esposa. O filho que ela vai ter é do Espírito Santo."

Próximo ao nascimento, o imperador ordenou que todos fossem registrados em suas cidades de origem. José e Maria viajaram de Nazaré a Belém, uma longa jornada!

Belém estava lotada. Não havia lugar nas pousadas. Um estalajadeiro bondoso ofereceu o estábulo dos animais. E foi lá, entre a palha e os animais, que nasceu Jesus!

Maria o embrulhou em faixas de pano e o deitou numa manjedoura.

Anjos anunciaram aos pastores que guardavam seus rebanhos: "Glória a Deus nas alturas! Nasceu o Salvador!" Uma estrela brilhante guiou os Reis Magos que vieram de longe adorar o menino Jesus.

O maior presente que o mundo já recebeu havia chegado! 🌟`,
    referencia: 'Lucas 1-2, Mateus 1-2',
    quiz: [
      { pergunta: 'Qual anjo apareceu para Maria?', opcoes: ['Miguel', 'Rafael', 'Gabriel', 'Uriel'], correta: 2 },
      { pergunta: 'Em qual cidade Jesus nasceu?', opcoes: ['Nazaré', 'Jerusalém', 'Belém', 'Jericó'], correta: 2 },
      { pergunta: 'O que Jesus usou como berço?', opcoes: ['Uma cama de madeira', 'Uma manjedoura', 'Um cesto', 'Uma rede'], correta: 1 },
    ],
    vof: [
      { afirmacao: 'Maria aceitou com alegria ser a mãe de Jesus.', resposta: true },
      { afirmacao: 'José e Maria encontraram facilmente lugar na pousada.', resposta: false },
      { afirmacao: 'Pastores foram os primeiros a receber a notícia do nascimento.', resposta: true },
      { afirmacao: 'Jesus nasceu num palácio de rei.', resposta: false },
    ],
  },
];

// ── Componente principal Kids ──────────────────────────────────────────────
export default function Kids({ dark, onVoltar }) {
  const [tela, setTela] = useState('lista'); // 'lista' | 'historia' | 'atividade'
  const [historiaAtual, setHistoriaAtual] = useState(null);
  const [atividadeTipo, setAtividadeTipo] = useState('quiz'); // 'quiz' | 'vof'
  const [respostas, setRespostas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const T = dark ? DARK : LIGHT;

  function abrirHistoria(h) {
    setHistoriaAtual(h);
    setTela('historia');
    setRespostas({});
    setMostrarResultado(false);
  }

  function abrirAtividade(tipo) {
    setAtividadeTipo(tipo);
    setRespostas({});
    setMostrarResultado(false);
    setTela('atividade');
  }

  function responder(idx, valor) {
    if (mostrarResultado) return;
    setRespostas(prev => ({ ...prev, [idx]: valor }));
  }

  function verificar() {
    setMostrarResultado(true);
  }

  function calcularPontos() {
    const perguntas = atividadeTipo === 'quiz' ? historiaAtual.quiz : historiaAtual.vof;
    return perguntas.filter((p, i) => {
      if (atividadeTipo === 'quiz') return respostas[i] === p.correta;
      return respostas[i] === p.resposta;
    }).length;
  }

  // ── LISTA ──────────────────────────────────────────────────────────────
  if (tela === 'lista') return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
      <button onClick={onVoltar} style={{ background:'none', border:'none', cursor:'pointer', color: T.accent, fontSize:14, fontFamily:'sans-serif', padding:0, marginBottom:16 }}>← Voltar</button>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <div style={{ fontSize:48, marginBottom:8 }}>📚</div>
        <h1 style={{ fontSize:24, fontWeight:800, color: T.text, margin:0 }}>Área Kids</h1>
        <p style={{ color: T.text2, fontFamily:'sans-serif', fontSize:15, marginTop:6 }}>Histórias incríveis da Bíblia para você!</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:12 }}>
        {HISTORIAS.map(h => (
          <button key={h.id} onClick={() => abrirHistoria(h)}
            style={{ background: T.cardBg, border:`2px solid ${h.cor}20`, borderRadius:16, padding:'16px 10px', cursor:'pointer', textAlign:'center', transition:'transform .15s', boxShadow:`0 2px 8px ${h.cor}20` }}>
            <div style={{ fontSize:32, marginBottom:8 }}>{h.emoji}</div>
            <div style={{ fontSize:13, fontWeight:700, color: T.text, lineHeight:1.3 }}>{h.titulo}</div>
            <div style={{ fontSize:11, color: T.text3, fontFamily:'sans-serif', marginTop:4 }}>{h.referencia}</div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── HISTÓRIA ──────────────────────────────────────────────────────────
  if (tela === 'historia') return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
      <button onClick={() => setTela('lista')} style={{ background:'none', border:'none', cursor:'pointer', color: T.accent, fontSize:14, fontFamily:'sans-serif', padding:0, marginBottom:16 }}>← Histórias</button>

      <div style={{ borderRadius:16, overflow:'hidden', marginBottom:20, boxShadow:'0 4px 16px rgba(0,0,0,0.1)' }}>
        {Ilustracoes[historiaAtual.id]}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
        <span style={{ fontSize:28 }}>{historiaAtual.emoji}</span>
        <div>
          <h2 style={{ fontSize:22, fontWeight:800, color: T.text, margin:0 }}>{historiaAtual.titulo}</h2>
          <span style={{ fontSize:12, color: T.text3, fontFamily:'sans-serif' }}>{historiaAtual.referencia}</span>
        </div>
      </div>

      <div style={{ background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:16, padding:20, marginBottom:24, lineHeight:1.9, fontSize:16, color: T.text, whiteSpace:'pre-line' }}>
        {historiaAtual.texto}
      </div>

      <div style={{ display:'flex', gap:12, marginBottom:12 }}>
        <button onClick={() => abrirAtividade('quiz')}
          style={{ flex:1, padding:'14px', background: historiaAtual.cor, color:'#fff', border:'none', borderRadius:12, cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:700 }}>
          🎯 Quiz
        </button>
        <button onClick={() => abrirAtividade('vof')}
          style={{ flex:1, padding:'14px', background: T.bg3, color: T.text, border:`1px solid ${T.border}`, borderRadius:12, cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:700 }}>
          ✅ Verdadeiro ou Falso
        </button>
      </div>
    </div>
  );

  // ── ATIVIDADE ──────────────────────────────────────────────────────────
  if (tela === 'atividade') {
    const perguntas = atividadeTipo === 'quiz' ? historiaAtual.quiz : historiaAtual.vof;
    const todasRespondidas = perguntas.every((_, i) => respostas[i] !== undefined);
    const pontos = mostrarResultado ? calcularPontos() : 0;
    const total = perguntas.length;

    return (
      <div style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
        <button onClick={() => setTela('historia')} style={{ background:'none', border:'none', cursor:'pointer', color: T.accent, fontSize:14, fontFamily:'sans-serif', padding:0, marginBottom:16 }}>← Voltar para a história</button>

        <div style={{ textAlign:'center', marginBottom:24 }}>
          <span style={{ fontSize:28 }}>{atividadeTipo === 'quiz' ? '🎯' : '✅'}</span>
          <h2 style={{ fontSize:20, fontWeight:800, color: T.text, margin:'8px 0 4px' }}>
            {atividadeTipo === 'quiz' ? 'Quiz' : 'Verdadeiro ou Falso'}
          </h2>
          <p style={{ color: T.text2, fontFamily:'sans-serif', fontSize:14, margin:0 }}>{historiaAtual.titulo}</p>
        </div>

        {mostrarResultado && (
          <div style={{ background: pontos === total ? '#dcfce7' : pontos >= total/2 ? '#fef3c7' : '#fee2e2', borderRadius:16, padding:20, marginBottom:24, textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:8 }}>
              {pontos === total ? '🏆' : pontos >= total/2 ? '👍' : '💪'}
            </div>
            <div style={{ fontSize:22, fontWeight:800, color: pontos === total ? '#16a34a' : pontos >= total/2 ? '#d97706' : '#dc2626' }}>
              {pontos} de {total} acertos!
            </div>
            <div style={{ fontSize:14, color: '#64748b', fontFamily:'sans-serif', marginTop:4 }}>
              {pontos === total ? 'Perfeito! Você conhece muito bem essa história!' :
               pontos >= total/2 ? 'Muito bem! Continue estudando!' :
               'Que tal ler a história de novo? Você vai se sair melhor!'}
            </div>
          </div>
        )}

        {atividadeTipo === 'quiz' ? (
          historiaAtual.quiz.map((q, i) => (
            <div key={i} style={{ background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:16, padding:18, marginBottom:14 }}>
              <p style={{ fontSize:16, fontWeight:700, color: T.text, margin:'0 0 14px' }}>{i+1}. {q.pergunta}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {q.opcoes.map((op, j) => {
                  let bg = T.bg3;
                  let cor = T.text;
                  let borda = T.border;
                  if (respostas[i] === j) { bg = historiaAtual.cor + '30'; borda = historiaAtual.cor; cor = historiaAtual.cor; }
                  if (mostrarResultado) {
                    if (j === q.correta) { bg = '#dcfce7'; borda = '#16a34a'; cor = '#15803d'; }
                    else if (respostas[i] === j && j !== q.correta) { bg = '#fee2e2'; borda = '#dc2626'; cor = '#dc2626'; }
                  }
                  return (
                    <button key={j} onClick={() => responder(i, j)}
                      style={{ padding:'12px 14px', background: bg, border:`2px solid ${borda}`, borderRadius:10, cursor: mostrarResultado ? 'default' : 'pointer', textAlign:'left', fontSize:15, color: cor, fontFamily:'sans-serif', fontWeight: respostas[i] === j ? 700 : 400 }}>
                      {mostrarResultado && j === q.correta ? '✅ ' : mostrarResultado && respostas[i] === j ? '❌ ' : ''}{op}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          historiaAtual.vof.map((v, i) => {
            const resp = respostas[i];
            const certo = mostrarResultado && resp === v.resposta;
            const errado = mostrarResultado && resp !== undefined && resp !== v.resposta;
            return (
              <div key={i} style={{ background: T.cardBg, border:`1px solid ${certo ? '#16a34a' : errado ? '#dc2626' : T.border}`, borderRadius:16, padding:18, marginBottom:14 }}>
                <p style={{ fontSize:16, fontWeight:600, color: T.text, margin:'0 0 14px' }}>{i+1}. {v.afirmacao}</p>
                <div style={{ display:'flex', gap:10 }}>
                  {[true, false].map(val => {
                    let bg = T.bg3;
                    let cor = T.text;
                    let borda = T.border;
                    if (respostas[i] === val) { bg = historiaAtual.cor + '30'; borda = historiaAtual.cor; cor = historiaAtual.cor; }
                    if (mostrarResultado) {
                      if (val === v.resposta) { bg = '#dcfce7'; borda = '#16a34a'; cor = '#15803d'; }
                      else if (respostas[i] === val) { bg = '#fee2e2'; borda = '#dc2626'; cor = '#dc2626'; }
                    }
                    return (
                      <button key={String(val)} onClick={() => responder(i, val)}
                        style={{ flex:1, padding:'12px', background: bg, border:`2px solid ${borda}`, borderRadius:10, cursor: mostrarResultado ? 'default' : 'pointer', fontSize:16, color: cor, fontFamily:'sans-serif', fontWeight:700 }}>
                        {val ? '✅ Verdadeiro' : '❌ Falso'}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        {!mostrarResultado && (
          <button onClick={verificar} disabled={!todasRespondidas}
            style={{ width:'100%', padding:'15px', background: todasRespondidas ? historiaAtual.cor : T.bg3, color: todasRespondidas ? '#fff' : T.text3, border:'none', borderRadius:12, cursor: todasRespondidas ? 'pointer' : 'default', fontFamily:'sans-serif', fontSize:16, fontWeight:700, marginTop:8 }}>
            {todasRespondidas ? '✔️ Ver resultado' : `Responda todas as ${perguntas.length} perguntas`}
          </button>
        )}

        {mostrarResultado && (
          <div style={{ display:'flex', gap:10, marginTop:8 }}>
            <button onClick={() => { setRespostas({}); setMostrarResultado(false); }}
              style={{ flex:1, padding:'13px', background: historiaAtual.cor, color:'#fff', border:'none', borderRadius:12, cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:700 }}>
              🔄 Tentar de novo
            </button>
            <button onClick={() => setTela('historia')}
              style={{ flex:1, padding:'13px', background: T.bg3, color: T.text, border:`1px solid ${T.border}`, borderRadius:12, cursor:'pointer', fontFamily:'sans-serif', fontSize:15 }}>
              📖 Voltar à história
            </button>
          </div>
        )}
      </div>
    );
  }
}
