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
  {
    id:'criacao', titulo:'A Criação do Mundo', emoji:'🌍', cor:'#0ea5e9', bg:'#e0f2fe', referencia:'Gênesis 1-2',
    texto:`Antes de tudo existir, havia apenas escuridão e vazio. Não existia terra, nem mar, nem estrelas, nem animais — absolutamente nada! Só havia Deus, eterno e poderoso. E então Deus decidiu criar!

🌟 DIA 1 — A Luz
Deus disse: "Haja luz!" E imediatamente uma luz brilhante apareceu, rasgando a escuridão. Deus viu que a luz era boa e a separou das trevas. Chamou a luz de "dia" e as trevas de "noite". Era o primeiro dia da criação!

🌊 DIA 2 — O Céu
No segundo dia, Deus criou o firmamento — o céu azul que vemos acima de nós. Ele separou as águas que ficaram acima do céu das que ficaram abaixo. O céu se tornou um espaço imenso e maravilhoso!

🌱 DIA 3 — A Terra e as Plantas
Deus reuniu todas as águas num só lugar e fez aparecer a terra seca. Chamou a terra de "terra" e as águas de "mares". Depois Deus mandou a terra produzir plantas de todos os tipos: gramas verdes, flores coloridas, árvores enormes com frutos deliciosos — manga, laranja, banana, maçã e muito mais!

☀️ DIA 4 — O Sol, a Lua e as Estrelas
Para iluminar a terra, Deus criou dois grandes astros: o sol para governar o dia com sua luz quente e brilhante, e a lua para brilhar suavemente à noite. Além disso, encheu o céu de milhões de estrelas cintilantes — como uma manta de diamantes no céu escuro!

🐟 DIA 5 — Os Peixes e os Pássaros
"Encham os mares!" disse Deus, e o oceano se encheu de peixes de todas as formas e cores — baleia azul, peixe-palhaço, tubarão, polvo e tantos outros! O céu se encheu de pássaros que voavam com suas asas coloridas — papagaios, tucanos, águias e pombas.

🦁 DIA 6 — Os Animais e o Ser Humano
Deus criou todos os animais terrestres: leões majestosos, elefantes gigantes, girafas com seus pescoços compridos, formigas trabalhadoras e milhares de outras espécies! Então Deus fez algo muito especial: criou o ser humano à Sua própria imagem! Formou Adão do pó da terra e soprou vida em suas narinas. O homem se tornou um ser vivo com inteligência, sentimentos e capacidade de se relacionar com Deus!

😴 DIA 7 — O Descanso
No sétimo dia, Deus descansou de toda a Sua obra. Ele abençoou esse dia e o tornou sagrado. Por isso até hoje temos um dia especial de descanso por semana!

Tudo o que Deus criou era muito bom! 🌟`,
    quiz:[
      {pergunta:'O que Deus criou no primeiro dia?',opcoes:['Os animais','A luz','O sol','Os peixes'],correta:1},
      {pergunta:'Em qual dia Deus criou o ser humano?',opcoes:['Terceiro','Quarto','Quinto','Sexto'],correta:3},
      {pergunta:'O que Deus fez no sétimo dia?',opcoes:['Criou os animais','Criou as estrelas','Descansou e abençoou o dia','Criou a terra'],correta:2},
    ],
    vof:[
      {afirmacao:'Deus criou a luz no primeiro dia.',resposta:true},
      {afirmacao:'Os pássaros foram criados no terceiro dia.',resposta:false},
      {afirmacao:'Deus achou que tudo que criou era muito bom.',resposta:true},
      {afirmacao:'Deus trabalhou no sétimo dia também.',resposta:false},
    ],
  },
  {
    id:'adaoeva', titulo:'Adão e Eva', emoji:'🍎', cor:'#16a34a', bg:'#dcfce7', referencia:'Gênesis 2-3',
    texto:`Depois de criar o mundo, Deus tinha um plano especial. Ele formou o primeiro homem do pó da terra e soprou vida em suas narinas. O homem ganhou vida e se tornou um ser vivo! Seu nome era Adão.

🌿 O Jardim do Éden
Deus plantou um jardim maravilhoso no leste, chamado Éden. Era o lugar mais bonito que existia! Havia árvores de todos os tipos, rios cristalinos, flores perfumadas e frutas deliciosas em abundância. Deus colocou Adão lá para cuidar e guardar o jardim. Era uma responsabilidade muito importante!

⚠️ A única proibição
Deus disse a Adão: "Você pode comer livremente de qualquer árvore do jardim. Mas não coma da árvore do conhecimento do bem e do mal. No dia em que comer dela, certamente morrerá." Havia liberdade para tudo, exceto uma coisa. Deus queria que Adão confiasse nEle!

👫 A criação de Eva
Deus viu que não era bom o homem ficar sozinho. Então fez Adão dormir profundamente, tirou uma de suas costelas e criou a mulher. Quando Adão acordou e viu Eva disse: "Esta é osso dos meus ossos e carne da minha carne!" Eles eram perfeitos um para o outro e viviam felizes no jardim.

🐍 A tentação da serpente
Mas havia uma serpente astuta e malvada no jardim. Ela foi até Eva e disse: "Deus realmente disse que vocês não podem comer de nenhuma árvore?" Eva explicou sobre a proibição. Então a serpente mentiu: "Vocês não vão morrer! Quando comerem, seus olhos se abrirão e vocês serão como Deus, conhecendo o bem e o mal."

Eva olhou para a fruta. Parecia tão bonita, tão deliciosa, tão tentadora... Ela comeu! E deu para Adão, que também comeu. Naquele momento, algo mudou dentro deles.

😢 As consequências
Quando Deus foi ao jardim, chamou: "Adão, onde você está?" Eles estavam se escondendo, cheios de vergonha. Deus perguntou o que tinham feito e cada um tentou colocar a culpa no outro.

Com o coração cheio de tristeza, Deus precisou expulsá-los do Jardim do Éden. A vida ficaria mais difícil a partir daí. Mas mesmo assim, Deus nunca deixou de amar Adão e Eva! Ele já tinha um plano para salvar a humanidade — um plano que seria cumprido muitos anos depois através de Jesus! 💕`,
    quiz:[
      {pergunta:'Como se chamava o jardim onde Adão e Eva viviam?',opcoes:['Nazaré','Éden','Belém','Canaã'],correta:1},
      {pergunta:'O que estava proibido no jardim?',opcoes:['Nadar no rio','Correr nas manhãs','Comer da árvore do conhecimento','Falar com animais'],correta:2},
      {pergunta:'Quem enganou Eva?',opcoes:['Um leão','Adão','Uma serpente','Um anjo'],correta:2},
    ],
    vof:[
      {afirmacao:'Adão foi criado do pó da terra.',resposta:true},
      {afirmacao:'Eva foi criada antes de Adão.',resposta:false},
      {afirmacao:'Deus permitiu que comessem de todas as árvores sem exceção.',resposta:false},
      {afirmacao:'Deus continuou amando Adão e Eva mesmo depois da desobediência.',resposta:true},
    ],
  },
  {
    id:'noe', titulo:'Noé e o Dilúvio', emoji:'🌈', cor:'#7c3aed', bg:'#ede9fe', referencia:'Gênesis 6-9',
    texto:`Muitos anos depois de Adão e Eva, as pessoas multiplicaram pela terra. Mas algo triste aconteceu: as pessoas foram se afastando de Deus e enchendo o mundo de maldade, violência e injustiça. O coração de Deus ficou muito magoado com tudo isso.

🕊️ Noé, um homem diferente
Mas havia um homem diferente: Noé. Ele era justo, íntegro e caminhava com Deus todos os dias. Em meio a tanta corrupção ao redor, Noé escolheu viver de forma honesta e próxima de Deus. Sua família era composta por sua esposa, seus três filhos — Sem, Cam e Jafé — e as esposas deles.

🪵 A grande missão: construir a arca
Deus falou com Noé e revelou Seu plano: enviaria um dilúvio para cobrir toda a terra. E deu instruções detalhadas para Noé construir uma arca enorme de madeira de cipreste. A arca deveria ter 300 côvados de comprimento (cerca de 135 metros!), 50 de largura e 30 de altura. Era uma embarcação gigantesca!

Noé obedeceu imediatamente, mesmo que as pessoas ao redor rissem dele. Imagine a cena: um homem construindo um barco gigante em terra seca, sem rio nem mar por perto! As pessoas deviam achar que ele tinha enlouquecido. Mas Noé continuou confiando em Deus e trabalhando.

🦒 Os animais entram na arca
Quando a arca ficou pronta, Deus mandou Noé trazer um casal de cada espécie de animal — macho e fêmea — para dentro da arca. Também trouxe sete pares dos animais considerados puros. Imagine o desfile: elefantes, girafas, leões, ursos, cobras, pombas, formigas, borboletas e tantos outros! Também armazenaram alimento para todos.

🌧️ O dilúvio começa
Então Deus fechou a porta da arca. E a chuva começou. Choveu por 40 dias e 40 noites sem parar! As fontes do subsolo se abriram e as comportas do céu se romperam. A água subiu tanto que cobriu as montanhas mais altas. Mas dentro da arca, Noé, sua família e todos os animais estavam seguros e protegidos por Deus.

🌿 A terra seca
A água ficou alta por 150 dias. Depois Deus enviou um vento sobre a terra e as águas foram baixando aos poucos. A arca pousou sobre os montes de Ararate. Noé soltou primeiro um corvo, depois uma pomba. A pomba voltou sem encontrar lugar para pousar. Sete dias depois, a pomba voltou com um ramo de oliveira no bico — sinal de que a água havia baixado! Na terceira vez, a pomba não voltou mais. A terra estava seca!

🌈 A promessa do arco-íris
Quando saíram da arca, Noé construiu um altar e agradeceu a Deus. Deus ficou muito satisfeito e fez uma aliança — uma promessa solene — com Noé e toda a humanidade: nunca mais destruiria a terra com um dilúvio. E como sinal dessa promessa eterna, Deus colocou um arco-íris no céu!

Toda vez que vemos um arco-íris depois da chuva, podemos lembrar da fidelidade de Deus e de Sua promessa! 🌈`,
    quiz:[
      {pergunta:'Por quantos dias e noites choveu?',opcoes:['7','20','40','100'],correta:2},
      {pergunta:'Com o que a pomba voltou no segundo voo?',opcoes:['Com nada','Com um peixe','Com um ramo de oliveira','Com uma flor'],correta:2},
      {pergunta:'O que Deus colocou no céu como sinal da promessa?',opcoes:['Uma estrela','Um arco-íris','Uma nuvem branca','O sol'],correta:1},
    ],
    vof:[
      {afirmacao:'Noé era um homem mau e desobediente.',resposta:false},
      {afirmacao:'Noé levou um casal de cada animal para a arca.',resposta:true},
      {afirmacao:'A pomba voltou com um ramo de oliveira no bico.',resposta:true},
      {afirmacao:'Deus prometeu nunca mais destruir a terra com fogo.',resposta:false},
    ],
  },
  {
    id:'babel', titulo:'A Torre de Babel', emoji:'🏗️', cor:'#d97706', bg:'#fef3c7', referencia:'Gênesis 11:1-9',
    texto:`Depois do dilúvio, os descendentes de Noé foram se multiplicando. Naquela época, toda a humanidade falava uma única língua e usava as mesmas palavras. Era fácil se comunicar e trabalhar juntos!

🚶 A migração para o leste
As pessoas foram caminhando pelo mundo e encontraram uma grande planície na terra de Sinear — que hoje é o Iraque. Decidiram se estabelecer ali. Com uma língua em comum, podiam planejar e construir grandes coisas juntos.

🧱 O plano ambicioso
Um dia, as pessoas tiveram uma ideia: "Venha, vamos fazer tijolos e queimá-los bem." Elas descobriram como fazer tijolos duros usando argila e fogo — uma tecnologia avançada para a época! Usaram também betume, uma espécie de alcatrão, como argamassa.

Então disseram: "Venha, vamos construir para nós uma cidade com uma torre que alcance os céus! Vamos fazer um nome famoso para nós, para que não sejamos espalhados por toda a face da terra."

⚠️ O problema do coração
O problema não era construir uma cidade ou uma torre. O problema estava no coração das pessoas. Elas queriam:
1. Ser famosas por conta própria, sem precisar de Deus
2. Ficar todas juntas, contrariando o plano de Deus de espalhar as pessoas pela terra
3. "Alcançar os céus" — uma atitude de arrogância, como se quisessem se igualar a Deus

Elas dependiam apenas delas mesmas e não de Deus!

🔍 Deus observa
Deus desceu para ver a cidade e a torre que estavam construindo. Deus disse: "Se como um único povo falando uma única língua eles começaram a fazer isso, nada do que planejem será impossível para eles."

Deus não estava com medo deles. Mas sabia que aquele orgulho e autossuficiência traria muito mal para a humanidade.

😵 A confusão das línguas
Então Deus fez algo surpreendente: confundiu a linguagem de toda a terra! De repente, ninguém entendia mais ninguém. Um falava e o outro ouvia palavras completamente estranhas. Imagina a confusão! "Passa o tijolo!" — e o outro ficava olhando sem entender nada.

Sem conseguir se comunicar, as pessoas pararam de construir e se espalharam por toda a terra, cada grupo indo para uma direção diferente.

🌍 O legado de Babel
A cidade incompleta ficou conhecida como Babel, que em hebraico significa "confusão". E foi assim que surgiram os diferentes idiomas do mundo! O português, o inglês, o espanhol, o mandarim, o árabe — todas as línguas têm origem naquele momento em Babel.

Essa história nos ensina que a verdadeira grandeza não vem de construir monumentos para nós mesmos, mas de caminhar com humildade diante de Deus! 🌍`,
    quiz:[
      {pergunta:'Como se chamava a planície onde construíram a torre?',opcoes:['Éden','Sinear','Canaã','Egito'],correta:1},
      {pergunta:'Por que Deus confundiu as línguas das pessoas?',opcoes:['A torre era feia','Queriam se igualar a Deus e ser famosos sem Ele','Brigavam entre si','A torre era alta demais'],correta:1},
      {pergunta:'O que significa o nome "Babel"?',opcoes:['Paz','Alegria','Confusão','Torre'],correta:2},
    ],
    vof:[
      {afirmacao:'No começo, todas as pessoas falavam a mesma língua.',resposta:true},
      {afirmacao:'As pessoas construíram a torre para honrar e glorificar a Deus.',resposta:false},
      {afirmacao:'Deus aprovou a construção da torre.',resposta:false},
      {afirmacao:'Depois de Babel, as pessoas se espalharam por toda a terra.',resposta:true},
    ],
  },
  {
    id:'jose', titulo:'José e a Túnica Colorida', emoji:'👑', cor:'#7c3aed', bg:'#ede9fe', referencia:'Gênesis 37-45',
    texto:`Jacó era um homem que havia passado por muitas aventuras com Deus. Ele tinha doze filhos, mas amava especialmente José, que havia nascido quando Jacó já era mais velho. Para mostrar seu amor, Jacó presenteou José com uma túnica linda e colorida, cheia de cores vibrantes!

😠 A inveja dos irmãos
Os dez irmãos mais velhos ficaram com muita inveja e raiva. Se o pai amava tanto José, talvez fosse dar a herança toda para ele! A situação piorou quando José começou a contar seus sonhos: ele sonhou que estava amarrando feixes de trigo no campo e o feixe dele ficou em pé enquanto os feixes dos irmãos se curvavam para o dele. Depois sonhou que o sol, a lua e onze estrelas se inclinavam diante dele. Eram sonhos proféticos — de Deus — mas os irmãos ficaram furiosos!

🕳️ O plano cruel
Um dia, os irmãos estavam cuidando dos rebanhos longe de casa. Jacó mandou José verificar como eles estavam. Quando os irmãos viram José chegando de longe, tramaram algo terrível: "Aqui vem o sonhador! Vamos matá-lo!" Mas Rúben, o mais velho, convenceu os outros a apenas jogá-lo numa cisterna vazia.

Eles arrancaram a túnica colorida de José e o jogaram na cisterna. Depois sentaram para comer — sem sentir remorso! Quando uma caravana de mercadores ismaelitas passou, Judá teve outra ideia: "Por que matar nosso irmão? Vamos vendê-lo!" Venderam José por 20 moedas de prata.

Para enganar o pai, molharam a túnica no sangue de um cabrito e mandaram para Jacó. O velho pai ficou destruído de dor, achando que uma fera havia devorado seu filho amado.

⛓️ José no Egito
No Egito, José foi vendido como escravo para Potifar, capitão da guarda do Faraó. Mesmo sendo escravo, Deus estava com José! Tudo o que ele fazia prosperava, e Potifar percebeu isso e o colocou como administrador de toda a sua casa.

Mas José enfrentou mais uma injustiça: a esposa de Potifar mentiu sobre ele e José foi preso! Mesmo na prisão, Deus estava com José. O carcereiro percebeu que havia algo especial naquele jovem e o colocou para cuidar de todos os presos.

💭 O dom de interpretar sonhos
Na prisão, José conheceu o copeiro-mor e o padeiro do Faraó. Ambos tiveram sonhos perturbadores e José, com a ajuda de Deus, interpretou corretamente: o copeiro voltaria ao seu cargo, mas o padeiro seria executado. E aconteceu exatamente assim! José pediu ao copeiro que se lembrasse dele quando saísse, mas o homem o esqueceu por dois anos inteiros.

Então o próprio Faraó teve dois sonhos que ninguém conseguia interpretar. O copeiro finalmente se lembrou de José! Ele foi tirado da prisão, se apresentou ao Faraó e interpretou: os sete vacas gordas e as sete espigas cheias representavam sete anos de fartura; as sete vacas magras e as sete espigas murchas representavam sete anos de terrível fome que viria depois.

👑 De escravo a governador
O Faraó ficou tão impressionado com a sabedoria de José que o nomeou governador de todo o Egito — o segundo homem mais poderoso do país! José tinha apenas 30 anos. Deus havia transformado completamente sua situação!

Durante os sete anos de fartura, José armazenou grãos em grandes depósitos. Quando a fome chegou, o Egito tinha comida enquanto os países vizinhos sofriam.

🤝 O reencontro
A fome chegou também em Canaã, onde morava a família de José. Jacó mandou os dez irmãos mais velhos ao Egito comprar comida. Eles chegaram e se curvaram diante do governador — exatamente como no sonho de José! José os reconheceu imediatamente, mas eles não o reconheceram.

Depois de testar os irmãos para ver se haviam mudado de coração, José não conseguiu mais se conter. Mandou todos saírem da sala, ficou sozinho com os irmãos e começou a chorar tão alto que os egípcios lá fora ouviram. Então disse: "Eu sou José, seu irmão!"

Os irmãos ficaram paralisados de medo e choque. Mas José os abraçou e disse: "Não fiquem com medo nem com raiva de vocês mesmos por me terem vendido. Foi Deus quem me enviou antes de vocês para preservar vidas!" José entendeu que tudo havia sido o plano soberano de Deus!

Jacó e toda a família foram para o Egito, e a família se reuniu com lágrimas de alegria. Os planos de Deus são sempre maiores do que podemos imaginar! 💛`,
    quiz:[
      {pergunta:'Por quanto José foi vendido pelos irmãos?',opcoes:['10 moedas de ouro','20 moedas de prata','30 moedas de bronze','5 moedas de ouro'],correta:1},
      {pergunta:'Que dom especial Deus deu a José?',opcoes:['Cantar belamente','Interpretar sonhos','Curar doenças','Correr muito rápido'],correta:1},
      {pergunta:'Com quantos anos José se tornou governador do Egito?',opcoes:['20','25','30','40'],correta:2},
    ],
    vof:[
      {afirmacao:'José era o filho favorito de Jacó.',resposta:true},
      {afirmacao:'Os irmãos de José ficaram felizes com a túnica colorida.',resposta:false},
      {afirmacao:'José se vingou dos irmãos quando se tornou governador.',resposta:false},
      {afirmacao:'Deus estava com José em todas as situações difíceis.',resposta:true},
    ],
  },
  {
    id:'moises', titulo:'Moisés e o Mar Vermelho', emoji:'🌊', cor:'#0891b2', bg:'#cffafe', referencia:'Êxodo 1-14',
    texto:`Muitos anos depois de José, os israelitas multiplicaram tanto no Egito que os egípcios começaram a temê-los. Um novo faraó que não conhecia a história de José subiu ao poder e tomou uma decisão cruel: escravizou todo o povo de Israel!

👶 O nascimento de Moisés
O faraó ficou tão com medo do crescimento dos israelitas que ordenou que todos os bebês meninos hebreus fossem jogados no Rio Nilo! Foi nesse momento terrível que nasceu Moisés. Sua mãe, desesperada para salvar o filho, fez uma cestinha de papiro, a impermeabilizou com breu e colocou o bebê dentro, pondo-a entre os juncos à beira do rio.

A irmã de Moisés ficou observando de longe. A filha do faraó foi ao rio e encontrou o cesto. Quando o abriu, o bebê estava chorando. Ela teve pena e quis adotá-lo! A irmã de Moisés correu e ofereceu chamar uma ama de leite hebreia — que era a própria mãe de Moisés! Assim, Moisés foi criado por sua própria mãe, pago pela princesa do Egito, e depois foi morar no palácio como neto do faraó. Que plano incrível de Deus!

🔥 A sarça ardente
Já adulto, Moisés fugiu do Egito após matar um egípcio que espancava um escravo hebreu. Foi para o deserto de Midiã, onde se tornou pastor. Certo dia, enquanto cuidava das ovelhas, viu algo extraordinário: uma sarça (arbusto) que estava em chamas mas não se consumia! Curioso, se aproximou.

De dentro da sarça, Deus chamou: "Moisés! Moisés!" Ele respondeu: "Aqui estou." Deus disse que havia visto o sofrimento do Seu povo e que havia descido para libertá-los. E escolheu Moisés para essa missão!

Moisés ficou com medo e disse que não sabia falar bem, que o povo não acreditaria nele. Mas Deus respondeu que estaria com ele e que Arão, seu irmão, falaria por ele.

🦟 As dez pragas
Moisés voltou ao Egito e foi ao faraó com a mensagem de Deus: "Deixe meu povo partir!" Mas o faraó se recusou repetidamente. Então Deus enviou dez pragas terríveis sobre o Egito:

1. 🩸 As águas se transformaram em sangue
2. 🐸 Rãs invadiram todo o país
3. 🦟 Piolhos cobriram pessoas e animais
4. 🪰 Moscas inundaram o Egito
5. 💀 Morte do gado dos egípcios
6. 🤢 Úlceras e feridas nos corpos
7. ⛈️ Granizo devastador
8. 🦗 Gafanhotos que comeram tudo
9. 🌑 Trevas por três dias
10. 😢 Morte dos primogênitos egípcios

Após a décima praga, o faraó finalmente cedeu: "Levante-se e saia do meio do meu povo... vá e sirva ao Senhor como disse!"

🚶 A saída do Egito
Mais de 600 mil homens, mais mulheres e crianças, saíram do Egito — um exército de pessoas caminhando para a liberdade! Deus os guiava com uma coluna de nuvem durante o dia e uma coluna de fogo à noite. Era visível para todos que Deus estava com eles!

Mas então o faraó mudou de ideia novamente. Reuniu seu poderoso exército — cavalaria, carros de guerra, soldados — e saiu em perseguição aos israelitas.

😱 Encurralados!
Os israelitas chegaram à beira do Mar Vermelho e olharam para trás: o exército egípcio vinha com toda a força! Na frente: o mar imenso e intransponível. Atrás: o exército mais poderoso do mundo. Não havia saída!

O povo entrou em pânico e começou a reclamar com Moisés: "Por que nos tiraste do Egito? Era melhor servirmos os egípcios do que morrermos no deserto!"

Mas Moisés, com fé inabalável, respondeu: "Não tenham medo! Fiquem firmes e vejam a salvação que o Senhor realizará hoje. Os egípcios que vocês estão vendo hoje, nunca mais os verão!"

🌊 O milagre do mar
Deus disse a Moisés: "Por que clamas a mim? Dize aos filhos de Israel que marchem!" E então Moisés estendeu seu cajado sobre o mar. Deus enviou um forte vento leste que soprou a noite toda. As águas se dividiram! Formou-se um caminho seco no meio do mar, com paredes de água de cada lado!

Todo o povo — homens, mulheres, crianças, animais e pertences — atravessou o mar em terra seca. Quando o exército egípcio tentou seguir pelo mesmo caminho, as rodas dos carros travaram. Os soldados perceberam: "Fujamos de Israel, pois o Senhor está lutando por eles!" Mas era tarde. Moisés estendeu o cajado de volta e as águas voltaram, cobrindo todo o exército. Nenhum sobreviveu.

🎵 A canção da vitória
Do outro lado, os israelitas viram o que havia acontecido e ficaram cheios de reverência e fé em Deus. Moisés e todo o povo cantaram um cântico de louvor a Deus. Miriã, a irmã de Moisés, pegou um pandeiro e todas as mulheres saíram dançando e tocando, celebrando a grande libertação!

Deus havia mostrado Seu poder de forma que nunca seria esquecida. Ele é o Deus que liberta! 🎉`,
    quiz:[
      {pergunta:'O que guiava os israelitas no deserto?',opcoes:['Uma estrela','Uma coluna de nuvem e fogo','Um anjo visível','Moisés na frente'],correta:1},
      {pergunta:'O que Deus fez com o Mar Vermelho?',opcoes:['Secou completamente','Abriu as águas formando um caminho seco','Fez chover muito','Transformou em terra'],correta:1},
      {pergunta:'O que o povo fez depois de atravessar o mar?',opcoes:['Voltou para o Egito','Dormiu exausto','Cantou e dançou agradecendo a Deus','Reclamou de novo'],correta:2},
    ],
    vof:[
      {afirmacao:'Moisés foi criado no palácio do faraó.',resposta:true},
      {afirmacao:'O povo estava confiante e tranquilo quando viu o exército chegando.',resposta:false},
      {afirmacao:'As águas se abriram quando Moisés estendeu o cajado.',resposta:true},
      {afirmacao:'O exército egípcio também conseguiu atravessar o mar com segurança.',resposta:false},
    ],
  },
  {
    id:'davi', titulo:'Davi e Golias', emoji:'🪨', cor:'#dc2626', bg:'#fee2e2', referencia:'1 Samuel 16-17',
    texto:`Israel estava em guerra com os filisteus, povos inimigos que viviam nas planícies perto do Mar Mediterrâneo. Os dois exércitos estavam acampados em lados opostos de um vale. E os filisteus tinham uma arma secreta: Golias!

🦣 O gigante aterrorizante
Golias de Gate era um guerreiro filisteu de proporções assustadoras. Ele media cerca de 2,90 metros de altura — quase três andares! Usava um elmo de bronze, uma armadura de escamas que pesava 57 quilos, caneleiras de bronze e carregava uma lança com ponta de ferro pesando 7 quilos. Na frente dele caminhava um escudeiro.

Todo dia, de manhã e de tarde, Golias saía e gritava para o exército de Israel: "Por que vocês arrumaram suas linhas de batalha? Não sou eu o filisteu, e vocês os servos de Saul? Escolham um homem para lutar comigo! Se ele me vencer e me matar, seremos seus servos. Mas se eu o vencer, vocês serão nossos servos!" E então soltava uma gargalhada enorme.

😨 O medo do exército
Quando os israelitas ouviam isso, ficavam aterrorizados e fugiam. Quarenta dias isso aconteceu — toda manhã e toda tarde! O rei Saul e todos os seus soldados tremiam de medo. Ninguém se atrevia a enfrentar aquele gigante.

🎶 Davi, o pastorzinho
Davi era o filho mais novo de Jessé, de Belém. Seus três irmãos mais velhos serviam no exército de Saul. Davi ficava alternando entre cuidar das ovelhas do pai e ir ao acampamento levar comida para os irmãos.

Antes de ser chamado para o acampamento, algo importante havia acontecido: o profeta Samuel havia visitado a família de Jessé. Deus havia rejeitado o rei Saul por sua desobediência e escolhido um novo rei — alguém que Deus havia escolhido pelo seu coração, não pela aparência. Samuel ungiu Davi como o futuro rei de Israel! E desde então, o Espírito do Senhor estava sobre Davi.

Além de pastor, Davi era músico habilidoso. Ele tocava harpa para o rei Saul quando o rei se sentia perturbado, e a música o acalmava.

🏕️ Davi chega ao acampamento
Um dia, Jessé mandou Davi levar comida para os irmãos no acampamento. Quando Davi chegou, o exército estava se preparando para batalha. Davi ouviu Golias fazendo suas provocações habituais e perguntou aos soldados: "O que farão para o homem que matar esse filisteu e tirar a desonra de Israel? Quem é esse filisteu incircunciso para desafiar os exércitos do Deus vivo?"

Eliabe, o irmão mais velho, ficou com raiva: "Para que você veio aqui? E as ovelhinhas no deserto, com quem as deixou? Eu conheço a sua arrogância e a maldade do seu coração — você veio ver a batalha!" Mas Davi não se abalou.

As palavras de Davi chegaram aos ouvidos do rei Saul, que o mandou chamar. Davi disse ao rei: "Que ninguém perca o ânimo por causa desse filisteu. Eu, seu servo, irei lutar com ele!"

Saul olhou para aquele jovem e disse: "Você não pode lutar com ele. Você é apenas um rapaz e ele é guerreiro desde a juventude."

💪 A experiência de Davi
Mas Davi respondeu com confiança: "Seu servo apascentava as ovelhas de seu pai. Quando um leão ou um urso vinha roubar uma ovelha do rebanho, eu ia atrás dele, o golpeava e a arrancava da sua boca. Se ele se voltava contra mim, eu o agarrava pela juba e o golpeava até matá-lo. Seu servo matou tanto o leão como o urso. E esse filisteu incircunciso será como um deles, pois desafiou os exércitos do Deus vivo! O Senhor, que me livrou das garras do leão e do urso, me livrará também das mãos desse filisteu!"

Saul cedeu e disse: "Vai, e o Senhor seja contigo."

⚔️ A preparação para a batalha
Saul vestiu Davi com sua própria armadura — elmo de bronze e cota de malha. Mas Davi não conseguia nem andar! "Não consigo usar isso, pois não estou acostumado." E tirou tudo.

Em vez disso, Davi pegou seu cajado, foi ao riacho e escolheu cuidadosamente cinco pedras lisas, colocou-as no alforje de pastor, e tomou sua funda na mão. Era tudo o que precisava — porque confiava em Deus!

Golias se aproximou, e seu escudeiro na frente. Quando viu Davi, o gigante o desprezou: um menininho ruivo e de boa aparência. Golias o amaldiçoou: "Sou eu um cachorro para você vir contra mim com um cajado? Venha cá, e darei a sua carne às aves do céu e às feras do campo!"

🗡️ A resposta de Davi
Davi respondeu com coragem e fé: "Você vem contra mim com espada, lança e dardo. Mas eu venho contra você em nome do Senhor dos Exércitos, o Deus dos exércitos de Israel, a quem você desafiou! Hoje o Senhor o entregará em minhas mãos... e toda a terra saberá que há um Deus em Israel! E todos os que estão aqui saberão que o Senhor não salva por meio de espada nem de lança. Esta guerra é do Senhor, e ele os entregará em nossas mãos!"

Davi correu em direção ao gigante! Enfiou a mão no alforje, tirou uma pedra, colocou na funda e atirou. A pedra atingiu Golias exatamente na testa — o único lugar descoberto em toda aquela armadura. Golias foi ao chão, caindo de rosto para a terra. Derrubado!

O exército filisteu entrou em pânico e fugiu. Israel perseguiu os inimigos e alcançou a vitória!

🌟 O legado de Davi
A história de Davi e Golias nos ensina uma lição poderosa: o tamanho do seu problema não é nada diante do tamanho do seu Deus! Davi não confiou em armadura, espada ou força física — ele confiou em Deus. E Deus o tornou vencedor.

Davi mais tarde se tornaria o maior rei de Israel, e Jesus descenderia da linhagem de Davi! 🗡️`,
    quiz:[
      {pergunta:'Quantas pedras Davi pegou antes de enfrentar Golias?',opcoes:['1','3','5','10'],correta:2},
      {pergunta:'O que Davi usou para derrotar Golias?',opcoes:['Espada do rei Saul','Arco e flecha','Funda e pedra','Lança filisteia'],correta:2},
      {pergunta:'O que Davi era antes de ser guerreiro e rei?',opcoes:['Pescador','Pastor e músico','Carpinteiro','Soldado'],correta:1},
    ],
    vof:[
      {afirmacao:'Golias era um guerreiro israelita.',resposta:false},
      {afirmacao:'Os soldados de Israel tinham muito medo de Golias.',resposta:true},
      {afirmacao:'Davi confiou na força e sabedoria de Deus para vencer.',resposta:true},
      {afirmacao:'Davi usou a armadura do rei Saul na batalha.',resposta:false},
    ],
  },
  {
    id:'jonas', titulo:'Jonas e o Peixe Grande', emoji:'🐋', cor:'#0891b2', bg:'#cffafe', referencia:'Jonas 1-4',
    texto:`Jonas era um profeta de Deus que vivia em Israel. Os profetas eram pessoas escolhidas por Deus para receber e transmitir mensagens divinas ao povo. Era uma responsabilidade enorme e uma honra muito grande.

📢 O chamado de Deus
Um dia, Deus falou claramente com Jonas: "Levanta-te, vai à grande cidade de Nínive e clama contra ela, pois a sua maldade subiu até mim." Nínive era a capital do poderoso Império Assírio — o maior e mais cruel império da época. Os assírios eram inimigos terríveis de Israel, conhecidos por suas conquistas violentas.

🏃 A fuga de Jonas
Mas Jonas não queria ir a Nínive. Ele sabia que Deus era misericordioso e que se os ninivitas se arrependessem, Deus os perdoaria. E Jonas não queria que seus inimigos fossem perdoados! Em vez de obedecer, Jonas foi na direção completamente oposta — para Jope, onde encontrou um navio com destino a Társis, que ficava na ponta mais distante do mundo mediterrâneo.

Jonas pagou a passagem, embarcou e desceu ao porão do navio para dormir. Pensou que estava fugindo de Deus. Mas ninguém consegue fugir de Deus!

⛈️ A tempestade terrível
Deus enviou um vento forte sobre o mar, e uma tempestade tão violenta ameaçava partir o navio ao meio! Os marinheiros ficaram apavorados — eram homens experientes do mar, mas nunca tinham visto algo assim. Cada um clamou ao seu próprio deus. Jogaram a carga ao mar para aliviar o peso do navio.

E Jonas? Estava dormindo tranquilamente no porão! O capitão foi até ele: "Como podes estar dormindo? Levanta-te, clama ao teu Deus! Talvez Deus se lembre de nós para que não pereçamos!"

Os marinheiros decidiram lançar sortes para descobrir quem era o responsável pela tempestade. A sorte caiu sobre Jonas!

🔍 O interrogatório
"Dize-nos de onde és, qual a tua nação, e qual o teu trabalho." Jonas confessou: "Sou hebreu e temo o Senhor, o Deus dos céus, que fez o mar e a terra seca. Estou fugindo da presença do Senhor."

Os marinheiros ficaram com muito medo. "O que te faremos para que o mar se acalme para nós?" A tempestade estava piorando cada vez mais.

Jonas respondeu: "Tomai-me e lançai-me ao mar, e o mar se acalmará para vós. Pois sei que por minha causa esta grande tempestade está sobre vós."

Os marinheiros tentaram remar para chegar à terra firme, mas não conseguiram. Com muito pena de Jonas, oraram ao Deus de Israel pedindo que não os responsabilizasse pela morte de um inocente, e então jogaram Jonas ao mar.

Imediatamente a tempestade parou! O mar ficou completamente calmo. Os marinheiros ficaram com grande temor de Deus, fizeram ofertas e votos.

🐟 O grande peixe
Deus preparou um grande peixe para engolir Jonas. Jonas ficou dentro do peixe por três dias e três noites! Dentro do peixe, Jonas orou a Deus do fundo do seu desespero. Ele reconheceu que havia errado, agradeceu a Deus por sua misericórdia, e prometeu cumprir o voto que havia feito.

Deus falou com o peixe, e o peixe vomitou Jonas em terra firme!

🏙️ Jonas em Nínive
Desta vez, Jonas obedeceu. Ele entrou em Nínive — que era tão grande que levava três dias para atravessá-la — e começou a pregar: "Ainda quarenta dias e Nínive será destruída!"

Para a enorme surpresa de Jonas, as pessoas de Nínive acreditaram na mensagem de Deus! Desde o maior até o menor, todos se vestiram com pano de saco em sinal de arrependimento. O próprio rei de Nínive desceu do trono, tirou seu manto real, cobriu-se de pano de saco e se sentou na cinza. Ele declarou um jejum para todo o reino e ordenou que todos clamassem sinceramente a Deus e se arrependessem de seus maus caminhos.

❤️ A misericórdia de Deus
Deus viu os atos deles e que se tinham convertido do seu mau caminho, e não realizou o mal que havia dito que lhes faria.

Mas Jonas ficou descontente! Ficou com raiva porque Deus havia poupado Nínive. Ele saiu da cidade e ficou num abrigo esperando ver o que aconteceria com a cidade.

Deus fez uma planta crescer para dar sombra a Jonas — e Jonas ficou muito contente com a planta. Mas no dia seguinte, Deus enviou um verme que atacou a planta, e ela secou. Jonas ficou tão com raiva que desejou morrer!

Deus disse: "Você tem pena da planta que não plantou nem cultivou, que cresceu numa noite e numa noite morreu. E eu não teria pena de Nínive, a grande cidade, em que há mais de cento e vinte mil pessoas que não sabem distinguir a mão direita da esquerda?"

🌍 A lição mais importante
A história de Jonas nos ensina que o amor de Deus é para todas as pessoas de todas as nações, não apenas para o povo de Israel. Deus ama os ninivitas, os brasileiros, os americanos, os chineses — todos os seres humanos sem exceção.

Também aprendemos que não adianta fugir de Deus. Onde quer que vamos, Ele está lá. E quando nos arrependemos sinceramente, Deus está pronto para perdoar! ❤️`,
    quiz:[
      {pergunta:'Para onde Deus mandou Jonas ir?',opcoes:['Jerusalém','Nínive','Egito','Babilônia'],correta:1},
      {pergunta:'Por quantos dias Jonas ficou dentro do peixe?',opcoes:['1','2','3','7'],correta:2},
      {pergunta:'Como as pessoas de Nínive reagiram à mensagem de Jonas?',opcoes:['Ninguém ouviu','O expulsaram da cidade','Se arrependeram sinceramente','A cidade foi destruída'],correta:2},
    ],
    vof:[
      {afirmacao:'Jonas obedeceu imediatamente quando Deus o chamou.',resposta:false},
      {afirmacao:'A tempestade parou quando Jonas foi jogado ao mar.',resposta:true},
      {afirmacao:'Jonas ficou no peixe por 3 dias e 3 noites.',resposta:true},
      {afirmacao:'Jonas ficou muito feliz quando Deus perdoou Nínive.',resposta:false},
    ],
  },
  {
    id:'daniel', titulo:'Daniel na Cova dos Leões', emoji:'🦁', cor:'#d97706', bg:'#fef3c7', referencia:'Daniel 1 e 6',
    texto:`Daniel era um jovem judeu que vivia em Jerusalém quando o poderoso rei Nabucodonosor da Babilônia conquistou a cidade. Daniel e vários outros jovens israelitas foram levados como cativos para a Babilônia — muito longe de sua terra natal, sua família e tudo que conheciam.

🎓 Daniel na corte babilônica
Nabucodonosor ordenou que os jovens mais inteligentes e capazes fossem treinados por três anos para servir em sua corte. Daniel e seus três amigos — Hananias, Misael e Azarias — foram selecionados. Mas logo no início, Daniel enfrentou um dilema: o rei havia ordenado que comessem da comida e bebessem do vinho da mesa real, mas isso violaria as leis alimentares de Deus.

Daniel pediu gentilmente ao oficial responsável que lhes permitisse comer apenas legumes e água por dez dias, e depois comparassem com os outros jovens. Ao final dos dez dias, Daniel e seus amigos estavam mais saudáveis e fortes do que todos os outros! Deus honrou a decisão deles de obedecê-Lo.

Ao final dos três anos de treinamento, Daniel e seus amigos eram dez vezes mais sábios do que todos os magos e encantadores do reino! E Daniel tinha um dom especial de Deus: entender visões e sonhos.

👑 Daniel sob o rei Dário
Muitos anos depois, um novo império tomou o poder: o persa-medo. O rei Dário o Medo conquistou a Babilônia. Dário reorganizou o reino com 120 príncipes e três governadores principais. E Daniel, com sua sabedoria e integridade excepcionais, foi nomeado um dos três governadores principais!

Daniel se destacou tanto que o rei estava planejando colocá-lo sobre todo o reino. Os outros governadores e príncipes ficaram com muita inveja. Eles tentaram encontrar algum erro ou falha em Daniel — alguma corrupção, alguma negligência — mas não encontraram nada. Daniel era íntegro demais!

😠 A conspiração
Então os conspiradores perceberam: "Não encontraremos acusação contra esse Daniel, a menos que encontremos algo contra ele a respeito da lei do seu Deus." Eles foram ao rei Dário com um plano astuto:

"Ó rei Dário, vive para sempre! Todos os governadores, prefeitos, príncipes, conselheiros e capitães consultaram-se e concordam que o rei deve estabelecer uma lei: qualquer pessoa que fizer petição a qualquer deus ou homem nos próximos trinta dias, exceto a você, ó rei, será lançada na cova dos leões."

O rei, sem perceber a armadilha, assinou a lei. E de acordo com as leis dos medos e persas, uma lei assinada pelo rei não podia ser revogada — nem mesmo pelo próprio rei!

🙏 Daniel continua orando
Daniel soube que a lei havia sido assinada. Mas foi para casa, abriu as janelas em direção a Jerusalém — como era seu costume — e orou a Deus três vezes por dia, como sempre havia feito. Ele não escondeu sua fé, não orou em segredo, não parou de orar. Continuou fiel a Deus mesmo sabendo das consequências.

Os conspiradores o espionavam e o flagraram orando. Correram ao rei com a notícia. O rei Dário ficou profundamente perturbado. Passou o dia inteiro tentando encontrar uma solução legal para salvar Daniel, mas não conseguiu. A lei era irreversível.

😢 Na cova dos leões
Com o coração partido, o rei ordenou que Daniel fosse jogado na cova dos leões. Antes de fecharem a entrada, disse a Daniel: "O teu Deus, a quem serves continuamente, Ele te livrará."

Uma pedra foi colocada na entrada da cova e selada com o sinete do rei e dos grandes, para que nada fosse alterado. O rei voltou para o palácio, recusou-se a comer, dispensou todos os entretenimentos e passou a noite em claro, sem conseguir dormir de preocupação com Daniel.

🌅 O milagre da madrugada
Ao amanhecer, o rei correu para a cova dos leões. Gritou com voz angustiada: "Daniel, servo do Deus vivo! O teu Deus, a quem serves continuamente, foi capaz de te livrar dos leões?"

Então, do fundo da cova, veio a voz de Daniel: "Ó rei, vive para sempre! Meu Deus enviou seu anjo e fechou a boca dos leões. Eles não me feriram, porque diante dele fui achado inocente; e também diante de ti, ó rei, não cometi crime algum."

O rei ficou transbordando de alegria! Mandaram tirar Daniel da cova — e não havia nenhum ferimento nele, porque havia confiado no seu Deus!

⚖️ A justiça
O rei Dário então mandou prender os homens que haviam acusado Daniel e os jogou na cova dos leões junto com suas famílias. Os leões os dominaram antes mesmo de chegarem ao fundo da cova.

O rei Dário então escreveu para todos os povos e nações da terra: "Que em todo o meu reino real tremam e temam diante do Deus de Daniel; pois ele é o Deus vivo e permanece para sempre. O seu reino jamais será destruído e o seu domínio nunca terá fim. Ele liberta e resgata, e faz sinais e maravilhas no céu e na terra — foi Ele que livrou Daniel das garras dos leões!"

🦁 O que aprendemos
Daniel nos ensina que a fidelidade a Deus vale a pena mesmo quando é difícil, mesmo quando todos ao redor fazem diferente, mesmo quando há consequências sérias. Deus não prometeu que não teríamos provações — mas prometeu estar conosco em todas elas! 🦁✨`,
    quiz:[
      {pergunta:'Quantas vezes por dia Daniel orava a Deus?',opcoes:['1','2','3','7'],correta:2},
      {pergunta:'Por quantos dias durava a lei que proibia orar?',opcoes:['7','20','30','40'],correta:2},
      {pergunta:'O que Deus fez para proteger Daniel na cova dos leões?',opcoes:['Removeu todos os leões','Enviou um anjo que fechou a boca dos leões','Fez Daniel invisível','Domesticou os leões'],correta:1},
    ],
    vof:[
      {afirmacao:'Daniel parou de orar quando soube da nova lei.',resposta:false},
      {afirmacao:'O rei Dário gostava muito de Daniel e ficou triste com o que aconteceu.',resposta:true},
      {afirmacao:'Os leões feriram Daniel na cova.',resposta:false},
      {afirmacao:'Deus protegeu Daniel por causa de sua fidelidade e confiança.',resposta:true},
    ],
  },
  {
    id:'jesus', titulo:'O Nascimento de Jesus', emoji:'⭐', cor:'#7c3aed', bg:'#ede9fe', referencia:'Lucas 1-2, Mateus 1-2',
    texto:`Esta é a história mais importante de toda a Bíblia — o momento em que Deus mesmo entrou no mundo como ser humano para salvar a humanidade!

👼 O anúncio do anjo Gabriel
Em Nazaré, uma pequena cidade da Galileia, vivia uma jovem chamada Maria. Ela era noiva de José, um carpinteiro descendente do rei Davi. Maria era uma jovem simples, humilde e dedicada a Deus.

Um dia, o anjo Gabriel apareceu para ela e disse: "Alegra-te, Maria, cheia de graça! O Senhor é contigo. Bendita és tu entre as mulheres."

Maria ficou perturbada. O que seria aquela saudação? Gabriel continuou: "Não temas, Maria, pois achaste graça diante de Deus. Conceberás e darás à luz um filho, e lhe porás o nome de Jesus. Ele será grande e será chamado Filho do Altíssimo. E o Senhor Deus lhe dará o trono de seu pai Davi; e reinará sobre a casa de Jacó para sempre, e o seu reino não terá fim."

Maria perguntou: "Como se fará isso, pois não conheço homem?" Gabriel explicou: "O Espírito Santo virá sobre ti, e o poder do Altíssimo te cobrirá com a sua sombra; pelo que também o Santo, que há de nascer, será chamado Filho de Deus."

Com fé e humildade incríveis, Maria respondeu: "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra." Ela disse sim a Deus sem saber todas as consequências — apenas confiou!

🤰 José recebe a notícia
Quando José descobriu que Maria estava grávida, ficou muito confuso e pensou em desfazer o noivado discretamente para não expô-la publicamente. Mas um anjo apareceu para José em sonho: "José, filho de Davi, não temas receber Maria, tua mulher, porque o que nela foi gerado é do Espírito Santo. Ela dará à luz um filho, e lhe porás o nome de Jesus, porque ele salvará o seu povo dos seus pecados."

José acordou e fez como o anjo havia mandado. Ele recebeu Maria como sua esposa e a protegeu com amor e cuidado.

🗺️ A viagem para Belém
Naqueles dias, o imperador romano César Augusto decretou que todo o Império Romano deveria ser recenseado — cada família deveria se registrar na cidade de origem de sua família. Como José era da linhagem de Davi, precisava ir a Belém, a cidade de Davi, que ficava a cerca de 150 quilômetros de Nazaré.

Maria estava prestes a dar à luz, mas não havia escolha. Eles fizeram a longa jornada — provavelmente levando vários dias — por caminhos acidentados e montanhosos. Era uma viagem difícil para uma mulher grávida.

🏠 Sem lugar na pousada
Quando chegaram a Belém, a cidade estava completamente lotada de pessoas que haviam vindo para o recenseamento. José bateu em várias pousadas, mas em todas a resposta era a mesma: "Não há lugar!"

Finalmente, um estalajadeiro teve pena do casal e ofereceu o único lugar disponível: o estábulo onde os animais ficavam. Era um lugar humilde, com cheiro de animal, feno no chão e manjedouras de pedra. Não era um lugar onde se esperaria que nascesse alguém importante.

🌟 O nascimento do Salvador
E foi lá, naquele estábulo simples, que Jesus nasceu! Maria o envolve em faixas de pano — como era costume para bebês naquela época — e o deitou numa manjedoura, que era a caixa onde se colocava comida para os animais. O Filho de Deus, o Rei dos reis, nasceu numa manjedoura!

🐑 Os pastores recebem a notícia
Nos campos ao redor de Belém, havia pastores guardando seus rebanhos durante a noite. De repente, um anjo do Senhor apareceu para eles e a glória do Senhor os cercou de luz! Eles ficaram com muito medo.

O anjo disse: "Não temais! Eis que vos trago uma boa nova de grande alegria, que o será para todo o povo: que hoje, na cidade de Davi, vos nasceu o Salvador, que é Cristo, o Senhor. E isto vos servirá de sinal: achareis o menino envolto em faixas de pano, deitado numa manjedoura."

Então uma multidão de anjos se juntou ao primeiro, louvando a Deus e dizendo: "Glória a Deus nas alturas, e paz na terra entre os homens em quem ele se compraz!"

Os pastores correram para Belém e encontraram Maria, José e o menino deitado na manjedoura — exatamente como o anjo havia dito! Contaram tudo o que haviam visto e ouvido, e todos que ouviam ficavam maravilhados. Os pastores voltaram glorificando e louvando a Deus!

🌟 Os Reis Magos
Sábios do Oriente — chamados de Reis Magos — haviam observado nos céus o surgimento de uma estrela extraordinária. Sabiam que isso significava o nascimento de um grande rei. Seguiram a estrela por uma longa jornada até chegar a Jerusalém, onde foram ao palácio do rei Herodes perguntar onde estava o rei dos judeus que havia nascido.

Herodes ficou perturbado e reuniu os principais sacerdotes para perguntar onde o Messias nasceria. Responderam: em Belém! Herodes mandou os Magos para Belém, pedindo que voltassem para dizer onde o menino estava — mas seus planos eram maus.

A estrela guiou os Magos até o lugar onde estava o menino Jesus. Quando entraram e viram Jesus com Maria, sua mãe, prostraram-se e o adoraram. Abriram seus tesouros e ofereceram presentes: ouro (para um rei), incenso (para Deus) e mirra (um ungüento que representava a morte que Jesus enfrentaria). Eram presentes cheios de significado profético!

Por revelação divina em sonho, os Magos não voltaram por Herodes e foram para sua terra por outro caminho.

✨ O significado de tudo isso
O nascimento de Jesus não foi apenas o nascimento de um bebê bonito. Foi o momento em que Deus mesmo entrou no mundo humano — chamado de Encarnação. Jesus é ao mesmo tempo completamente humano e completamente divino.

Ele veio para cumprir todas as profecias do Antigo Testamento, para ensinar o caminho de Deus, para demonstrar o amor de Deus através de milagres e curas, e finalmente para morrer na cruz e ressuscitar, abrindo o caminho para que todos possam se reconciliar com Deus.

O Natal que celebramos todo ano é a comemoração desse momento extraordinário — quando o maior presente que o mundo já recebeu chegou numa manjedoura em Belém! 🌟`,
    quiz:[
      {pergunta:'Qual anjo apareceu para Maria com a mensagem de Deus?',opcoes:['Miguel','Rafael','Gabriel','Uriel'],correta:2},
      {pergunta:'Em qual cidade Jesus nasceu?',opcoes:['Nazaré','Jerusalém','Belém','Jericó'],correta:2},
      {pergunta:'O que Jesus usou como berço ao nascer?',opcoes:['Uma cama de madeira','Uma manjedoura','Um cesto de vime','Uma rede'],correta:1},
    ],
    vof:[
      {afirmacao:'Maria aceitou com fé e alegria ser a mãe de Jesus.',resposta:true},
      {afirmacao:'José e Maria encontraram facilmente lugar confortável na pousada.',resposta:false},
      {afirmacao:'Os pastores foram os primeiros a receber a notícia do nascimento de Jesus.',resposta:true},
      {afirmacao:'Jesus nasceu num palácio real em Jerusalém.',resposta:false},
    ],
  },
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
