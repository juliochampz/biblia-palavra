// src/App.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  auth, registrar, entrar, logout,
  loadUserData, saveVersion, saveProgress,
  addBookmark, removeBookmark, addHistory, clearHistory, saveKidsScore,
} from './firebase';
import Kids from './Kids';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const BOOKS = [
  { id: 'gn',  name: 'Gênesis',          abbrev: 'Gn',  testament: 'AT' },
  { id: 'ex',  name: 'Êxodo',            abbrev: 'Êx',  testament: 'AT' },
  { id: 'lv',  name: 'Levítico',         abbrev: 'Lv',  testament: 'AT' },
  { id: 'nm',  name: 'Números',          abbrev: 'Nm',  testament: 'AT' },
  { id: 'dt',  name: 'Deuteronômio',     abbrev: 'Dt',  testament: 'AT' },
  { id: 'js',  name: 'Josué',            abbrev: 'Js',  testament: 'AT' },
  { id: 'jz',  name: 'Juízes',           abbrev: 'Jz',  testament: 'AT' },
  { id: 'rt',  name: 'Rute',             abbrev: 'Rt',  testament: 'AT' },
  { id: '1sm', name: '1 Samuel',         abbrev: '1Sm', testament: 'AT' },
  { id: '2sm', name: '2 Samuel',         abbrev: '2Sm', testament: 'AT' },
  { id: '1rs', name: '1 Reis',           abbrev: '1Rs', testament: 'AT' },
  { id: '2rs', name: '2 Reis',           abbrev: '2Rs', testament: 'AT' },
  { id: '1cr', name: '1 Crônicas',       abbrev: '1Cr', testament: 'AT' },
  { id: '2cr', name: '2 Crônicas',       abbrev: '2Cr', testament: 'AT' },
  { id: 'ed',  name: 'Esdras',           abbrev: 'Ed',  testament: 'AT' },
  { id: 'ne',  name: 'Neemias',          abbrev: 'Ne',  testament: 'AT' },
  { id: 'et',  name: 'Ester',            abbrev: 'Et',  testament: 'AT' },
  { id: 'jo',  name: 'Jó',              abbrev: 'Jó',  testament: 'AT' },
  { id: 'sl',  name: 'Salmos',           abbrev: 'Sl',  testament: 'AT' },
  { id: 'pv',  name: 'Provérbios',       abbrev: 'Pv',  testament: 'AT' },
  { id: 'ec',  name: 'Eclesiastes',      abbrev: 'Ec',  testament: 'AT' },
  { id: 'ct',  name: 'Cantares',         abbrev: 'Ct',  testament: 'AT' },
  { id: 'is',  name: 'Isaías',           abbrev: 'Is',  testament: 'AT' },
  { id: 'jr',  name: 'Jeremias',         abbrev: 'Jr',  testament: 'AT' },
  { id: 'lm',  name: 'Lamentações',      abbrev: 'Lm',  testament: 'AT' },
  { id: 'ez',  name: 'Ezequiel',         abbrev: 'Ez',  testament: 'AT' },
  { id: 'dn',  name: 'Daniel',           abbrev: 'Dn',  testament: 'AT' },
  { id: 'os',  name: 'Oséias',           abbrev: 'Os',  testament: 'AT' },
  { id: 'jl',  name: 'Joel',             abbrev: 'Jl',  testament: 'AT' },
  { id: 'am',  name: 'Amós',             abbrev: 'Am',  testament: 'AT' },
  { id: 'ob',  name: 'Obadias',          abbrev: 'Ob',  testament: 'AT' },
  { id: 'jn',  name: 'Jonas',            abbrev: 'Jn',  testament: 'AT' },
  { id: 'mq',  name: 'Miquéias',         abbrev: 'Mq',  testament: 'AT' },
  { id: 'na',  name: 'Naum',             abbrev: 'Na',  testament: 'AT' },
  { id: 'hc',  name: 'Habacuque',        abbrev: 'Hc',  testament: 'AT' },
  { id: 'sf',  name: 'Sofonias',         abbrev: 'Sf',  testament: 'AT' },
  { id: 'ag',  name: 'Ageu',             abbrev: 'Ag',  testament: 'AT' },
  { id: 'zc',  name: 'Zacarias',         abbrev: 'Zc',  testament: 'AT' },
  { id: 'ml',  name: 'Malaquias',        abbrev: 'Ml',  testament: 'AT' },
  { id: 'mt',  name: 'Mateus',           abbrev: 'Mt',  testament: 'NT' },
  { id: 'mc',  name: 'Marcos',           abbrev: 'Mc',  testament: 'NT' },
  { id: 'lc',  name: 'Lucas',            abbrev: 'Lc',  testament: 'NT' },
  { id: 'jo2', name: 'João',             abbrev: 'Jo',  testament: 'NT' },
  { id: 'at',  name: 'Atos',             abbrev: 'At',  testament: 'NT' },
  { id: 'rm',  name: 'Romanos',          abbrev: 'Rm',  testament: 'NT' },
  { id: '1co', name: '1 Coríntios',      abbrev: '1Co', testament: 'NT' },
  { id: '2co', name: '2 Coríntios',      abbrev: '2Co', testament: 'NT' },
  { id: 'gl',  name: 'Gálatas',          abbrev: 'Gl',  testament: 'NT' },
  { id: 'ef',  name: 'Efésios',          abbrev: 'Ef',  testament: 'NT' },
  { id: 'fp',  name: 'Filipenses',       abbrev: 'Fp',  testament: 'NT' },
  { id: 'cl',  name: 'Colossenses',      abbrev: 'Cl',  testament: 'NT' },
  { id: '1ts', name: '1 Tessalonicenses',abbrev: '1Ts', testament: 'NT' },
  { id: '2ts', name: '2 Tessalonicenses',abbrev: '2Ts', testament: 'NT' },
  { id: '1tm', name: '1 Timóteo',        abbrev: '1Tm', testament: 'NT' },
  { id: '2tm', name: '2 Timóteo',        abbrev: '2Tm', testament: 'NT' },
  { id: 'tt',  name: 'Tito',             abbrev: 'Tt',  testament: 'NT' },
  { id: 'fm',  name: 'Filemom',          abbrev: 'Fm',  testament: 'NT' },
  { id: 'hb',  name: 'Hebreus',          abbrev: 'Hb',  testament: 'NT' },
  { id: 'tg',  name: 'Tiago',            abbrev: 'Tg',  testament: 'NT' },
  { id: '1pe', name: '1 Pedro',          abbrev: '1Pe', testament: 'NT' },
  { id: '2pe', name: '2 Pedro',          abbrev: '2Pe', testament: 'NT' },
  { id: '1jo', name: '1 João',           abbrev: '1Jo', testament: 'NT' },
  { id: '2jo', name: '2 João',           abbrev: '2Jo', testament: 'NT' },
  { id: '3jo', name: '3 João',           abbrev: '3Jo', testament: 'NT' },
  { id: 'jd',  name: 'Judas',            abbrev: 'Jd',  testament: 'NT' },
  { id: 'ap',  name: 'Apocalipse',       abbrev: 'Ap',  testament: 'NT' },
];

const AT_BOOKS = BOOKS.filter(b => b.testament === 'AT');
const NT_BOOKS = BOOKS.filter(b => b.testament === 'NT');
const VIEW = { HOME: 'home', READER: 'reader', BOOKMARKS: 'bookmarks', HISTORY: 'history', PROFILE: 'profile', AUTH: 'auth' };

async function fetchBook(version, bookId) {
  const res = await fetch(`${BASE}/biblia/${version}/${bookId}.json`);
  if (!res.ok) throw new Error(`Livro não encontrado: ${bookId}`);
  return res.json();
}

const LIGHT = {
  bg:'#f8fafc', bg2:'#fff', bg3:'#f1f5f9',
  text:'#1e293b', text2:'#64748b', text3:'#94a3b8',
  border:'#e2e8f0', accent:'#1e40af', accentLight:'#bfdbfe',
  accentBg:'#eff6ff', verseNum:'#93c5fd', headerBg:'#fff', cardBg:'#fff',
};
const DARK = {
  bg:'#0f172a', bg2:'#1e293b', bg3:'#1e293b',
  text:'#f1f5f9', text2:'#94a3b8', text3:'#64748b',
  border:'#334155', accent:'#60a5fa', accentLight:'#1e40af',
  accentBg:'#172554', verseNum:'#3b82f6', headerBg:'#1e293b', cardBg:'#1e293b',
};

export default function App() {
  const [user, setUser]               = useState(null);
  const [userData, setUserData]       = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dark, setDark]               = useState(() => { try { return localStorage.getItem('darkMode') === '1'; } catch(e) { return false; } });
  const [modo, setModo]               = useState(null);
  const [view, setView]               = useState(VIEW.HOME);
  const [authMode, setAuthMode]       = useState('login');
  const [email, setEmail]             = useState('');
  const [senha, setSenha]             = useState('');
  const [authError, setAuthError]     = useState('');
  const [authLoading2, setAuthLoading2] = useState(false);
  const [bookFilter, setBookFilter]   = useState('');
  const [bookMeta, setBookMeta]       = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [readerLoading, setReaderLoading]   = useState(false);
  const [selectedVerse, setSelectedVerse]   = useState(null);
  const [toast, setToast]             = useState('');
  const [confirmLimpar, setConfirmLimpar] = useState(false);
  const toastTimer = useRef(null);
  const topRef     = useRef(null);
  const T = dark ? DARK : LIGHT;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const data = await loadUserData(firebaseUser.uid);
          setUserData(data);
        } catch(e) {
          setUserData({ version:'jfaal', progress:{ bookId:'gn', chapter:0 }, bookmarks:[], history:[], kidsScore:0 });
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('darkMode', next ? '1' : '0'); } catch(e) {}
  }

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  }

  async function handleAuth() {
    setAuthError('');
    setAuthLoading2(true);
    try {
      if (authMode === 'register') {
        await registrar(email, senha);
        showToast('Conta criada com sucesso!');
      } else {
        await entrar(email, senha);
        showToast('Bem-vindo!');
      }
      setView(VIEW.HOME);
      setEmail('');
      setSenha('');
    } catch(e) {
      const msgs = {
        'auth/email-already-in-use': 'Este email já está cadastrado.',
        'auth/invalid-email': 'Email inválido.',
        'auth/weak-password': 'Senha muito fraca (mín. 6 caracteres).',
        'auth/user-not-found': 'Email não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-credential': 'Email ou senha incorretos.',
      };
      setAuthError(msgs[e.code] || 'Erro ao entrar. Tente novamente.');
    } finally {
      setAuthLoading2(false);
    }
  }

  async function limparHistorico() {
    await clearHistory(user.uid);
    setUserData(prev => ({ ...prev, history: [] }));
    setConfirmLimpar(false);
    showToast('Histórico limpo!');
  }

  const openBook = useCallback(async (book, chapterIndex = 0) => {
    setReaderLoading(true);
    setView(VIEW.READER);
    setSelectedVerse(null);
    try {
      const version = userData?.version || 'jfaal';
      const data = await fetchBook(version, book.id);
      setBookMeta(data);
      setCurrentBook(book);
      setCurrentChapter(chapterIndex);
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (user) {
        saveProgress(user.uid, book.id, chapterIndex).catch(() => {});
        const newHistory = [
          { bookId: book.id, bookName: book.name, chapter: chapterIndex, readAt: new Date().toISOString() },
          ...(userData?.history || []),
        ].slice(0, 100);
        addHistory(user.uid, userData?.history || [], { bookId: book.id, bookName: book.name, chapter: chapterIndex }).catch(() => {});
        setUserData(prev => ({ ...prev, history: newHistory, progress: { bookId: book.id, chapter: chapterIndex } }));
      }
    } catch(e) {
      showToast('Erro ao carregar o livro.');
    } finally {
      setReaderLoading(false);
    }
  }, [userData, user]);

  function goChapter(delta) {
    const next = currentChapter + delta;
    if (!bookMeta || next < 0 || next >= bookMeta.chapters.length) return;
    setCurrentChapter(next);
    setSelectedVerse(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (user) {
      saveProgress(user.uid, currentBook.id, next).catch(() => {});
      setUserData(prev => ({ ...prev, progress: { bookId: currentBook.id, chapter: next } }));
    }
  }

  async function handleBookmark(verseIdx) {
    if (!user) { showToast('Entre para salvar marcadores.'); return; }
    const verse = bookMeta.chapters[currentChapter][verseIdx];
    const bm = { bookId: currentBook.id, bookName: currentBook.name, chapter: currentChapter, verse: verseIdx, text: verse };
    await addBookmark(user.uid, bm);
    setUserData(prev => ({ ...prev, bookmarks: [...(prev.bookmarks || []), { ...bm, addedAt: new Date().toISOString() }] }));
    showToast('✅ Versículo marcado!');
    setSelectedVerse(null);
  }

  async function handleRemoveBookmark(idx) {
    const updated = (userData.bookmarks || []).filter((_, i) => i !== idx);
    await removeBookmark(user.uid, userData.bookmarks, idx);
    setUserData(prev => ({ ...prev, bookmarks: updated }));
    showToast('Marcador removido.');
  }

  async function handleVersionChange(v) {
    if (!user) return;
    await saveVersion(user.uid, v);
    setUserData(prev => ({ ...prev, version: v }));
    showToast('Versão: ' + v.toUpperCase());
    if (view === VIEW.READER && currentBook) openBook(currentBook, currentChapter);
  }

  function resumeReading() {
    if (!userData?.progress) return;
    const { bookId, chapter } = userData.progress;
    const book = BOOKS.find(b => b.id === bookId);
    if (book) openBook(book, chapter);
  }

  if (authLoading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize:48 }}>📖</div>
  );

  if (!modo) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ fontSize:64, marginBottom:8 }}>📖</div>
      <h1 style={{ fontSize:28, fontWeight:900, color:'#fff', margin:'0 0 8px', textAlign:'center', textShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>Bíblia Palavra Viva</h1>
      <p style={{ color:'rgba(255,255,255,0.85)', fontFamily:'sans-serif', fontSize:16, margin:'0 0 40px', textAlign:'center' }}>Para quem é essa sessão?</p>
      <div style={{ display:'flex', gap:16, width:'100%', maxWidth:340 }}>
        <button onClick={() => setModo('kids')}
          style={{ flex:1, padding:'28px 10px', background:'#fff', border:'4px solid #fbbf24', borderRadius:24, cursor:'pointer', textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize:48, marginBottom:8 }}>👶</div>
          <div style={{ fontSize:20, fontWeight:900, color:'#7c3aed' }}>Kids</div>
          <div style={{ fontSize:12, color:'#94a3b8', fontFamily:'sans-serif', marginTop:4 }}>Histórias e atividades</div>
        </button>
        <button onClick={() => setModo('adulto')}
          style={{ flex:1, padding:'28px 10px', background:'#fff', border:'4px solid #60a5fa', borderRadius:24, cursor:'pointer', textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize:48, marginBottom:8 }}>📖</div>
          <div style={{ fontSize:20, fontWeight:900, color:'#1e40af' }}>Adulto</div>
          <div style={{ fontSize:12, color:'#94a3b8', fontFamily:'sans-serif', marginTop:4 }}>Leitura completa</div>
        </button>
      </div>
    </div>
  );

  if (modo === 'kids') return (
    <Kids
      dark={dark}
      onVoltar={() => setModo(null)}
      user={user}
      userData={userData}
      setUserData={setUserData}
      saveKidsScore={(score) => user ? saveKidsScore(user.uid, score) : Promise.resolve()}
    />
  );

  const version = userData?.version || 'jfaal';

  return (
    <div style={{ fontFamily:"'Georgia', serif", background: T.bg, minHeight:'100vh', color: T.text }}>
      {toast && (
        <div style={{ position:'fixed', bottom:80, left:'50%', transform:'translateX(-50%)', background:'#1e293b', color:'#fff', borderRadius:10, padding:'10px 20px', fontFamily:'sans-serif', fontSize:14, zIndex:300, whiteSpace:'nowrap', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
          {toast}
        </div>
      )}

      <header style={{ position:'sticky', top:0, zIndex:100, background: T.headerBg, borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px', height:56, boxShadow:'0 1px 4px rgba(0,0,0,0.08)' }}>
        <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:8, padding:0 }} onClick={() => setView(VIEW.HOME)}>
          📖 <span style={{ fontSize:18, fontWeight:700, color: T.accent }}>Bíblia</span>
        </button>
        <nav style={{ display:'flex', gap:4, alignItems:'center' }}>
          <button onClick={toggleDark} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, padding:'4px 10px', borderRadius:8 }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setModo(null)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, padding:'4px 10px', borderRadius:8 }} title="Trocar modo">🔄</button>
          {user && (
            <>
              <NavBtn icon="🔖" label="Marcadores" onClick={() => setView(VIEW.BOOKMARKS)} active={view === VIEW.BOOKMARKS} T={T} />
              <NavBtn icon="🕐" label="Histórico"  onClick={() => setView(VIEW.HISTORY)}   active={view === VIEW.HISTORY} T={T} />
            </>
          )}
          <NavBtn icon="👤" label={user ? 'Perfil' : 'Entrar'} onClick={() => user ? setView(VIEW.PROFILE) : setView(VIEW.AUTH)} active={view === VIEW.PROFILE || view === VIEW.AUTH} T={T} />
        </nav>
      </header>

      {view === VIEW.AUTH && (
        <main style={{ maxWidth:400, margin:'0 auto', padding:'40px 20px' }}>
          <div style={{ background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:16, padding:28 }}>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ fontSize:40, marginBottom:8 }}>📖</div>
              <h2 style={{ fontSize:22, fontWeight:700, color: T.text, margin:0 }}>{authMode === 'login' ? 'Entrar' : 'Criar conta'}</h2>
              <p style={{ color: T.text2, fontFamily:'sans-serif', fontSize:14, marginTop:6 }}>{authMode === 'login' ? 'Acesse sua conta para continuar' : 'Crie sua conta gratuita'}</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <input type="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)}
                style={{ padding:'12px 14px', border:`1px solid ${T.border}`, borderRadius:10, fontSize:15, fontFamily:'sans-serif', background: T.bg, color: T.text, outline:'none' }} />
              <input type="password" placeholder="Senha (mín. 6 caracteres)" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAuth()}
                style={{ padding:'12px 14px', border:`1px solid ${T.border}`, borderRadius:10, fontSize:15, fontFamily:'sans-serif', background: T.bg, color: T.text, outline:'none' }} />
              {authError && <p style={{ color:'#dc2626', fontFamily:'sans-serif', fontSize:13, margin:0, textAlign:'center' }}>{authError}</p>}
              <button onClick={handleAuth} disabled={authLoading2}
                style={{ padding:'13px', background: T.accent, color:'#fff', border:'none', borderRadius:10, fontSize:16, fontFamily:'sans-serif', fontWeight:600, cursor:'pointer' }}>
                {authLoading2 ? 'Aguarde...' : (authMode === 'login' ? 'Entrar' : 'Criar conta')}
              </button>
              <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }}
                style={{ background:'none', border:'none', color: T.accent, fontFamily:'sans-serif', fontSize:14, cursor:'pointer', padding:4 }}>
                {authMode === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
              </button>
            </div>
          </div>
        </main>
      )}

      {view === VIEW.HOME && (
        <main style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
          {user && userData?.progress?.bookId && (
            <div onClick={resumeReading} style={{ display:'flex', alignItems:'center', gap:14, background: T.accentBg, border:`1px solid ${T.accentLight}`, borderRadius:12, padding:'14px 18px', marginBottom:20, cursor:'pointer' }}>
              <div style={{ fontSize:20, color: T.accent }}>▶</div>
              <div>
                <div style={{ fontSize:11, color: T.accent, fontFamily:'sans-serif', textTransform:'uppercase', letterSpacing:1 }}>Continuar lendo</div>
                <div style={{ fontSize:16, fontWeight:600, color: T.accent }}>{BOOKS.find(b => b.id === userData.progress.bookId)?.name} — Cap. {userData.progress.chapter + 1}</div>
              </div>
            </div>
          )}
          {!user && (
            <div style={{ background: T.bg3, borderRadius:12, padding:18, marginBottom:20, display:'flex', flexDirection:'column', gap:12 }}>
              <p style={{ margin:0, color: T.text2, fontFamily:'sans-serif' }}>Entre para salvar sua posição de leitura, marcadores e histórico.</p>
              <button onClick={() => setView(VIEW.AUTH)} style={{ background: T.accent, color:'#fff', border:'none', borderRadius:8, padding:'11px 20px', cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:600 }}>
                Entrar / Criar conta
              </button>
            </div>
          )}
          <input style={{ width:'100%', boxSizing:'border-box', border:`1px solid ${T.border}`, borderRadius:10, padding:'10px 14px', fontSize:15, fontFamily:'sans-serif', marginBottom:24, background: T.bg2, color: T.text, outline:'none' }}
            placeholder="Buscar livro..." value={bookFilter} onChange={e => setBookFilter(e.target.value)} />
          <Section title="Antigo Testamento" books={AT_BOOKS} filter={bookFilter} onSelect={openBook} T={T} />
          <Section title="Novo Testamento"   books={NT_BOOKS} filter={bookFilter} onSelect={openBook} T={T} />
          <footer style={{ fontSize:11, color: T.text3, textAlign:'center', marginTop:40, fontFamily:'sans-serif', lineHeight:1.6 }}>
            {version === 'jfaal' ? 'As Escrituras em português são da JFAAL, Copyright © Marcos Cristiano Alves Ferreira. Setembro de 2024. Licença CC BY 3.0 BR.' : 'Almeida Corrigida Fiel (ACF) — Domínio Público.'}
          </footer>
        </main>
      )}

      {view === VIEW.READER && (
        <main style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }} ref={topRef}>
          {readerLoading ? (
            <div style={{ textAlign:'center', padding:60, color: T.text3, fontFamily:'sans-serif' }}>Carregando…</div>
          ) : bookMeta ? (
            <>
              <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, marginBottom:20, paddingBottom:14, borderBottom:`1px solid ${T.border}` }}>
                <button style={{ background:'none', border:'none', cursor:'pointer', color: T.accent, fontSize:14, fontFamily:'sans-serif', padding:0 }} onClick={() => setView(VIEW.HOME)}>← Livros</button>
                <div style={{ flex:1, fontSize:16, fontWeight:700, color: T.text }}>{currentBook?.name} — Cap. {currentChapter + 1}/{bookMeta.chapters.length}</div>
                <select style={{ border:`1px solid ${T.border}`, borderRadius:8, padding:'6px 10px', fontFamily:'sans-serif', fontSize:13, background: T.bg2, color: T.text }}
                  value={currentChapter} onChange={e => { const ch = Number(e.target.value); setCurrentChapter(ch); setSelectedVerse(null); if (user) saveProgress(user.uid, currentBook.id, ch).catch(() => {}); }}>
                  {bookMeta.chapters.map((_, i) => <option key={i} value={i}>Capítulo {i + 1}</option>)}
                </select>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                {bookMeta.chapters[currentChapter].map((verse, i) => (
                  <div key={i} style={{ display:'flex', gap:10, padding:'8px 6px', borderRadius:8, cursor:'pointer', background: selectedVerse === i ? (dark ? '#422006' : '#fef9c3') : 'transparent' }}
                    onClick={() => setSelectedVerse(selectedVerse === i ? null : i)}>
                    <span style={{ minWidth:24, color: T.verseNum, fontFamily:'sans-serif', fontSize:12, paddingTop:3, textAlign:'right' }}>{i + 1}</span>
                    <span style={{ lineHeight:1.8, fontSize:16, color: T.text }}>{verse}</span>
                  </div>
                ))}
              </div>
              {selectedVerse !== null && (
                <div style={{ position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#1e293b', color:'#fff', borderRadius:14, padding:'10px 18px', display:'flex', gap:12, alignItems:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.3)', zIndex:200 }}>
                  <button style={{ background:'#2563eb', color:'#fff', border:'none', borderRadius:8, padding:'8px 14px', cursor:'pointer', fontSize:14, fontFamily:'sans-serif' }} onClick={() => handleBookmark(selectedVerse)}>
                    🔖 Marcar versículo {selectedVerse + 1}
                  </button>
                  <button style={{ background:'none', color:'#94a3b8', border:'none', cursor:'pointer', fontSize:14, fontFamily:'sans-serif' }} onClick={() => setSelectedVerse(null)}>✕</button>
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:32, paddingTop:16, borderTop:`1px solid ${T.border}` }}>
                <button style={{ background: T.accentBg, color: T.accent, border:'none', borderRadius:8, padding:'10px 20px', cursor:'pointer', fontFamily:'sans-serif', fontSize:14, fontWeight:600 }} onClick={() => goChapter(-1)} disabled={currentChapter === 0}>← Anterior</button>
                <button style={{ background: T.accentBg, color: T.accent, border:'none', borderRadius:8, padding:'10px 20px', cursor:'pointer', fontFamily:'sans-serif', fontSize:14, fontWeight:600 }} onClick={() => goChapter(1)} disabled={currentChapter === bookMeta.chapters.length - 1}>Próximo →</button>
              </div>
            </>
          ) : null}
        </main>
      )}

      {view === VIEW.BOOKMARKS && (
        <main style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
          <h2 style={{ fontSize:20, fontWeight:700, marginBottom:20, color: T.text }}>🔖 Marcadores</h2>
          {!user ? <p style={{ color: T.text2 }}>Entre para ver seus marcadores.</p>
          : (userData?.bookmarks || []).length === 0 ? <p style={{ color: T.text3 }}>Nenhum versículo marcado ainda.</p>
          : [...(userData.bookmarks || [])].reverse().map((bm, i) => {
            const realIdx = (userData.bookmarks.length - 1) - i;
            return (
              <div key={i} style={{ background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:12, padding:16, marginBottom:12 }}>
                <div style={{ fontWeight:700, color: T.accent, cursor:'pointer', fontFamily:'sans-serif', fontSize:14, marginBottom:6 }}
                  onClick={() => { const book = BOOKS.find(b => b.id === bm.bookId); if (book) openBook(book, bm.chapter); }}>
                  {bm.bookName} {bm.chapter + 1}:{bm.verse + 1}
                </div>
                <p style={{ color: T.text2, fontSize:15, lineHeight:1.7, margin:'0 0 10px' }}>"{bm.text}"</p>
                <button style={{ background:'none', border:'1px solid #fca5a5', color:'#dc2626', borderRadius:6, padding:'4px 10px', cursor:'pointer', fontSize:12, fontFamily:'sans-serif' }}
                  onClick={() => handleRemoveBookmark(realIdx)}>Remover</button>
              </div>
            );
          })}
        </main>
      )}

      {view === VIEW.HISTORY && (
        <main style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <h2 style={{ fontSize:20, fontWeight:700, color: T.text, margin:0 }}>🕐 Histórico</h2>
            {user && (userData?.history || []).length > 0 && (
              <button onClick={() => setConfirmLimpar(true)} style={{ background:'none', border:`1px solid #fca5a5`, color:'#dc2626', borderRadius:8, padding:'6px 12px', cursor:'pointer', fontSize:13, fontFamily:'sans-serif' }}>Limpar tudo</button>
            )}
          </div>
          {confirmLimpar && (
            <div style={{ background: T.cardBg, border:`1px solid #fca5a5`, borderRadius:12, padding:16, marginBottom:16 }}>
              <p style={{ color: T.text, fontFamily:'sans-serif', fontSize:14, margin:'0 0 12px' }}>Tem certeza que deseja limpar todo o histórico?</p>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={limparHistorico} style={{ flex:1, padding:'9px', background:'#dc2626', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontFamily:'sans-serif', fontSize:14 }}>Sim, limpar</button>
                <button onClick={() => setConfirmLimpar(false)} style={{ flex:1, padding:'9px', background: T.bg3, color: T.text2, border:`1px solid ${T.border}`, borderRadius:8, cursor:'pointer', fontFamily:'sans-serif', fontSize:14 }}>Cancelar</button>
              </div>
            </div>
          )}
          {!user ? <p style={{ color: T.text2 }}>Entre para ver seu histórico.</p>
          : (userData?.history || []).length === 0 ? <p style={{ color: T.text3 }}>Nenhuma leitura registrada ainda.</p>
          : (userData.history || []).map((h, i) => {
            const book = BOOKS.find(b => b.id === h.bookId);
            return (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:`1px solid ${T.border}`, cursor:'pointer' }}
                onClick={() => book && openBook(book, h.chapter)}>
                <span style={{ fontSize:15, color: T.text }}>{h.bookName} — Cap. {h.chapter + 1}</span>
                <span style={{ fontSize:12, color: T.text3, fontFamily:'sans-serif' }}>{new Date(h.readAt).toLocaleDateString('pt-BR')}</span>
              </div>
            );
          })}
        </main>
      )}

      {view === VIEW.PROFILE && (
        <main style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px', paddingBottom:80 }}>
          {user ? (
            <>
              <div style={{ background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:14, padding:20, marginBottom:24 }}>
                <div style={{ fontSize:18, fontWeight:700, color: T.text }}>{user.email}</div>
              </div>
              <div style={{ background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:14, padding:20, marginBottom:20 }}>
                <h3 style={{ fontSize:16, fontWeight:700, margin:'0 0 18px', color: T.text }}>⚙️ Configurações</h3>
                <label style={{ fontSize:12, color: T.text2, textTransform:'uppercase', letterSpacing:1, fontFamily:'sans-serif', display:'block', marginBottom:10 }}>Aparência</label>
                <div style={{ display:'flex', gap:10, marginBottom:20 }}>
                  {[['☀️ Claro', false], ['🌙 Escuro', true]].map(([label, val]) => (
                    <button key={String(val)} onClick={() => { setDark(val); try { localStorage.setItem('darkMode', val ? '1' : '0'); } catch(e) {} }}
                      style={{ flex:1, padding:10, border:`1px solid ${dark===val ? T.accentLight : T.border}`, borderRadius:10, background: dark===val ? T.accentBg : T.bg3, cursor:'pointer', fontFamily:'sans-serif', fontSize:14, color: dark===val ? T.accent : T.text2, fontWeight: dark===val ? 700 : 400 }}>
                      {label}
                    </button>
                  ))}
                </div>
                <label style={{ fontSize:12, color: T.text2, textTransform:'uppercase', letterSpacing:1, fontFamily:'sans-serif', display:'block', marginBottom:10 }}>Versão da Bíblia</label>
                <div style={{ display:'flex', gap:10, marginBottom:20 }}>
                  {['jfaal','acf'].map(v => (
                    <button key={v} onClick={() => handleVersionChange(v)}
                      style={{ flex:1, padding:10, border:`1px solid ${version===v ? T.accentLight : T.border}`, borderRadius:10, background: version===v ? T.accentBg : T.bg3, cursor:'pointer', fontFamily:'sans-serif', fontSize:14, color: version===v ? T.accent : T.text2, fontWeight: version===v ? 700 : 400 }}>
                      {v === 'jfaal' ? 'JFAAL (atual)' : 'ACF (clássica)'}
                    </button>
                  ))}
                </div>
                <div style={{ display:'flex', gap:12 }}>
                  <div style={{ flex:1, background: T.bg3, borderRadius:10, padding:'14px 10px', display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <span style={{ fontSize:24, fontWeight:700, color: T.accent }}>{(userData?.bookmarks||[]).length}</span>
                    <span style={{ fontSize:11, color: T.text3, fontFamily:'sans-serif' }}>Marcadores</span>
                  </div>
                  <div style={{ flex:1, background: T.bg3, borderRadius:10, padding:'14px 10px', display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <span style={{ fontSize:24, fontWeight:700, color: T.accent }}>{(userData?.history||[]).length}</span>
                    <span style={{ fontSize:11, color: T.text3, fontFamily:'sans-serif' }}>Capítulos lidos</span>
                  </div>
                  <div style={{ flex:1, background: T.bg3, borderRadius:10, padding:'14px 10px', display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <span style={{ fontSize:24, fontWeight:700, color:'#7c3aed' }}>{userData?.kidsScore || 0}</span>
                    <span style={{ fontSize:11, color: T.text3, fontFamily:'sans-serif' }}>Pts Kids</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { logout(); setView(VIEW.HOME); setModo(null); }}
                style={{ width:'100%', padding:12, border:'1px solid #fca5a5', background: T.bg2, color:'#dc2626', borderRadius:10, cursor:'pointer', fontFamily:'sans-serif', fontSize:15 }}>
                Sair da conta
              </button>
            </>
          ) : (
            <div style={{ textAlign:'center', paddingTop:40 }}>
              <button onClick={() => setView(VIEW.AUTH)} style={{ background: T.accent, color:'#fff', border:'none', borderRadius:8, padding:'12px 24px', cursor:'pointer', fontFamily:'sans-serif', fontSize:15, fontWeight:600 }}>
                Entrar / Criar conta
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

function NavBtn({ icon, label, onClick, active, T }) {
  return (
    <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', fontSize:20, padding:'4px 10px', gap:1, borderRadius:8, color: active ? T.accent : T.text2 }} onClick={onClick} title={label}>
      <span>{icon}</span>
      <span style={{ fontSize:10, marginTop:1 }}>{label}</span>
    </button>
  );
}

function Section({ title, books, filter, onSelect, T }) {
  const filtered = filter ? books.filter(b => b.name.toLowerCase().includes(filter.toLowerCase()) || b.abbrev.toLowerCase().includes(filter.toLowerCase())) : books;
  if (filtered.length === 0) return null;
  return (
    <section style={{ marginBottom:32 }}>
      <h3 style={{ fontSize:12, letterSpacing:2, color: T.text3, textTransform:'uppercase', fontFamily:'sans-serif', marginBottom:12 }}>{title}</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(100px, 1fr))', gap:8 }}>
        {filtered.map(b => (
          <button key={b.id} onClick={() => onSelect(b, 0)}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background: T.cardBg, border:`1px solid ${T.border}`, borderRadius:10, padding:'10px 4px', cursor:'pointer', gap:3, boxShadow:'0 1px 2px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize:13, fontWeight:700, color: T.accent, fontFamily:'sans-serif' }}>{b.abbrev}</span>
            <span style={{ fontSize:11, color: T.text2, fontFamily:'sans-serif', textAlign:'center' }}>{b.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
