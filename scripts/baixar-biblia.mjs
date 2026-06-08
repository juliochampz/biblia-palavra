// scripts/baixar-biblia.mjs
// Baixa ARC (thiagobodruk) e JFAAL (BibliaJFAAL) e converte para o formato normalizado:
// { "name": "Nome do livro", "chapters": [ ["v1", "v2", ...], ... ] }
// Salva em:
//   public/biblia/arc/<id>.json
//   public/biblia/jfaal/<id>.json

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// IDs canônicos dos 66 livros (mesma ordem da JFAAL e ARC)
const BOOKS = [
  { id: 'gn',   name: 'Gênesis' },
  { id: 'ex',   name: 'Êxodo' },
  { id: 'lv',   name: 'Levítico' },
  { id: 'nm',   name: 'Números' },
  { id: 'dt',   name: 'Deuteronômio' },
  { id: 'js',   name: 'Josué' },
  { id: 'jz',   name: 'Juízes' },
  { id: 'rt',   name: 'Rute' },
  { id: '1sm',  name: '1 Samuel' },
  { id: '2sm',  name: '2 Samuel' },
  { id: '1rs',  name: '1 Reis' },
  { id: '2rs',  name: '2 Reis' },
  { id: '1cr',  name: '1 Crônicas' },
  { id: '2cr',  name: '2 Crônicas' },
  { id: 'ed',   name: 'Esdras' },
  { id: 'ne',   name: 'Neemias' },
  { id: 'et',   name: 'Ester' },
  { id: 'jo',   name: 'Jó' },
  { id: 'sl',   name: 'Salmos' },
  { id: 'pv',   name: 'Provérbios' },
  { id: 'ec',   name: 'Eclesiastes' },
  { id: 'ct',   name: 'Cantares' },
  { id: 'is',   name: 'Isaías' },
  { id: 'jr',   name: 'Jeremias' },
  { id: 'lm',   name: 'Lamentações' },
  { id: 'ez',   name: 'Ezequiel' },
  { id: 'dn',   name: 'Daniel' },
  { id: 'os',   name: 'Oséias' },
  { id: 'jl',   name: 'Joel' },
  { id: 'am',   name: 'Amós' },
  { id: 'ob',   name: 'Obadias' },
  { id: 'jn',   name: 'Jonas' },
  { id: 'mq',   name: 'Miquéias' },
  { id: 'na',   name: 'Naum' },
  { id: 'hc',   name: 'Habacuque' },
  { id: 'sf',   name: 'Sofonias' },
  { id: 'ag',   name: 'Ageu' },
  { id: 'zc',   name: 'Zacarias' },
  { id: 'ml',   name: 'Malaquias' },
  { id: 'mt',   name: 'Mateus' },
  { id: 'mc',   name: 'Marcos' },
  { id: 'lc',   name: 'Lucas' },
  { id: 'jo2',  name: 'João' },
  { id: 'at',   name: 'Atos' },
  { id: 'rm',   name: 'Romanos' },
  { id: '1co',  name: '1 Coríntios' },
  { id: '2co',  name: '2 Coríntios' },
  { id: 'gl',   name: 'Gálatas' },
  { id: 'ef',   name: 'Efésios' },
  { id: 'fp',   name: 'Filipenses' },
  { id: 'cl',   name: 'Colossenses' },
  { id: '1ts',  name: '1 Tessalonicenses' },
  { id: '2ts',  name: '2 Tessalonicenses' },
  { id: '1tm',  name: '1 Timóteo' },
  { id: '2tm',  name: '2 Timóteo' },
  { id: 'tt',   name: 'Tito' },
  { id: 'fm',   name: 'Filemom' },
  { id: 'hb',   name: 'Hebreus' },
  { id: 'tg',   name: 'Tiago' },
  { id: '1pe',  name: '1 Pedro' },
  { id: '2pe',  name: '2 Pedro' },
  { id: '1jo',  name: '1 João' },
  { id: '2jo',  name: '2 João' },
  { id: '3jo',  name: '3 João' },
  { id: 'jd',   name: 'Judas' },
  { id: 'ap',   name: 'Apocalipse' },
];

// ── ARC (thiagobodruk/biblia) ──────────────────────────────────────────────
// Formato: array de livros { abbrev, chapters: [["v1","v2",...], ...] }
// Os livros chegam em ordem canônica igual ao nosso BOOKS.
async function downloadARC() {
  const URL = 'https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/pt_arc.json';
  console.log('⬇️  Baixando ARC...');
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao baixar ARC`);
  const data = await res.json(); // array[66]

  const outDir = join(process.cwd(), 'public', 'biblia', 'arc');
  await mkdir(outDir, { recursive: true });

  for (let i = 0; i < data.length; i++) {
    const book = data[i];
    const meta = BOOKS[i];
    if (!meta) { console.warn(`ARC: sem meta para índice ${i}`); continue; }

    // chapters já é array de arrays de strings — formato normalizado direto
    const normalized = { name: meta.name, chapters: book.chapters };
    await writeFile(join(outDir, `${meta.id}.json`), JSON.stringify(normalized), 'utf-8');
    process.stdout.write(`  ✅ arc/${meta.id}\n`);
  }
  console.log(`🎉 ARC: ${data.length} livros salvos\n`);
}

// ── JFAAL ──────────────────────────────────────────────────────────────────
// Formato: { books: [{ nr, name, chapters: [{ chapter, verses: [{verse,text}] }] }] }
// Arquivo único com os 66 livros em ordem canônica.
async function downloadJFAAL() {
  const URL = 'https://raw.githubusercontent.com/BibliaJFAAL/JFAAL/main/atualizada/1911-JFAAtualizadaLivre.json';
  console.log('⬇️  Baixando JFAAL (~4 MB)...');
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao baixar JFAAL`);
  const data = await res.json();

  const outDir = join(process.cwd(), 'public', 'biblia', 'jfaal');
  await mkdir(outDir, { recursive: true });

  const books = data.books;
  if (books.length !== 66) console.warn(`⚠️  JFAAL: ${books.length} livros (esperado 66)`);

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const meta = BOOKS[i];
    if (!meta) { console.warn(`JFAAL: sem meta para índice ${i}`); continue; }

    const chapters = book.chapters.map(ch => {
      const sorted = [...ch.verses].sort((a, b) => a.verse - b.verse);
      return sorted.map(v => v.text);
    });

    const normalized = { name: book.name, chapters };
    await writeFile(join(outDir, `${meta.id}.json`), JSON.stringify(normalized), 'utf-8');
    process.stdout.write(`  ✅ jfaal/${meta.id}\n`);
  }
  console.log(`🎉 JFAAL: ${books.length} livros salvos\n`);
}

async function main() {
  await downloadARC();
  await downloadJFAAL();
  console.log('✨ Todas as versões prontas em public/biblia/');
}

main().catch(err => { console.error(err); process.exit(1); });
