// src/App.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  auth, loginGoogle, logout, checkRedirectResult,
  loadUserData, saveVersion, saveProgress,
  addBookmark, removeBookmark, addHistory,
} from './firebase';

// Base path para JSONs (funciona em dev e no GitHub Pages)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// ── Lista canônica dos 66 livros ───────────────────────────────────────────
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

// ── Views ─────────────────────────────────────────────────────────────────
const VIEW = { HOME: 'home', READER: 'reader', BOOKMARKS: 'bookmarks', HISTORY: 'history', PROFILE: 'profile' };

// ── Busca o JSON normalizado do livro ─────────────────────────────────────
async function fetchBook(version, bookId) {
  const res = await fetch(`${BASE}/biblia/${version}/${bookId}.json`);
  if (!res.ok) throw new Error(`Livro não encontrado: ${bookId}`);
  return res.json(); // { name, chapters: [["v1","v2",...], ...] }
}

// ── Componente principal ──────────────────────────────────────────────────
export default function App() {
  const [user, setUser]           = useState(null);
  const [userData, setUserData]   = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [view, setView]           = useState(VIEW.HOME);
  const [bookFilter, setBookFilter] = useState('');

  // Reader state
  const [bookMeta, setBookMeta]   = useState(null);   // { name, chapters }
  const [currentBook, setCurrentBook] = useState(null); // { id, name, ... }
  const [currentChapter, setCurrentChapter] = useState(0); // 0-indexed
  const [readerLoading, setReaderLoading] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState(null); // índice do versículo selecionado
  const [toast, setToast]         = useState('');
  const toastTimer = useRef(null);
  const topRef = useRef(null);

  // ── Auth observer ───────────────────────────────────────────────────────
  useEffect(() => {
    // Verificar resultado de redirect (iPhone/Safari)
    checkRedirectResult().catch(() => {});

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const data = await loadUserData(firebaseUser.uid);
        setUserData(data);
      } else {
        setUser(null);
        setUserData(null);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // ── Toast helper ────────────────────────────────────────────────────────
  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  }

  // ── Abrir livro + capítulo ───────────────────────────────────────────────
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

      // Salva progresso no Firestore (sem await para não bloquear UI)
      if (user) {
        saveProgress(user.uid, book.id, chapterIndex).catch(() => {});
        addHistory(
          user.uid,
          userData?.history || [],
          { bookId: book.id, bookName: book.name, chapter: chapterIndex }
        ).then(
          () => setUserData(prev => ({
            ...prev,
            history: [
              { bookId: book.id, bookName: book.name, chapter: chapterIndex, readAt: new Date().toISOString() },
              ...(prev?.history || []),
            ].slice(0, 100),
            progress: { bookId: book.id, chapter: chapterIndex },
          }))
        ).catch(() => {});
      }
    } catch (e) {
      showToast('Erro ao carregar o livro.');
    } finally {
      setReaderLoading(false);
    }
  }, [userData, user]);

  // ── Trocar capítulo no reader ─────────────────────────────────────────────
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

  // ── Marcador ────────────────────────────────────────────────────────────
  async function handleBookmark(verseIdx) {
    if (!user) { showToast('Entre com o Google para salvar marcadores.'); return; }
    const verse = bookMeta.chapters[currentChapter][verseIdx];
    const bm = {
      bookId:   currentBook.id,
      bookName: currentBook.name,
      chapter:  currentChapter,
      verse:    verseIdx,
      text:     verse,
    };
    await addBookmark(user.uid, bm);
    setUserData(prev => ({
      ...prev,
      bookmarks: [...(prev.bookmarks || []), { ...bm, addedAt: new Date().toISOString() }],
    }));
    showToast('✅ Versículo marcado!');
    setSelectedVerse(null);
  }

  async function handleRemoveBookmark(idx) {
    const updated = (userData.bookmarks || []).filter((_, i) => i !== idx);
    await removeBookmark(user.uid, userData.bookmarks, idx);
    setUserData(prev => ({ ...prev, bookmarks: updated }));
    showToast('Marcador removido.');
  }

  // ── Trocar versão ──────────────────────────────────────────────────────
  async function handleVersionChange(v) {
    if (!user) return;
    await saveVersion(user.uid, v);
    setUserData(prev => ({ ...prev, version: v }));
    showToast(`Versão alterada para ${v.toUpperCase()}`);
    // Se estiver no leitor, recarrega o capítulo na nova versão
    if (view === VIEW.READER && currentBook) {
      openBook(currentBook, currentChapter);
    }
  }

  // ── "Continuar lendo" ──────────────────────────────────────────────────
  function resumeReading() {
    if (!userData?.progress) return;
    const { bookId, chapter } = userData.progress;
    const book = BOOKS.find(b => b.id === bookId);
    if (book) openBook(book, chapter);
  }

  // ── Login ───────────────────────────────────────────────────────────────
  async function handleLogin() {
    try { await loginGoogle(); }
    catch (e) { showToast('Erro ao entrar com Google.'); }
  }

  // ── Render guards ────────────────────────────────────────────────────────
  if (authLoading) return <Splash />;

  const version = userData?.version || 'jfaal';

  return (
    <div style={styles.root}>
      {/* Toast */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* Header */}
      <header style={styles.header}>
        <button style={styles.logoBtn} onClick={() => setView(VIEW.HOME)}>
          📖 <span style={styles.logoText}>Bíblia</span>
        </button>
        <nav style={styles.nav}>
          {user && (
            <>
              <NavBtn icon="🔖" label="Marcadores" onClick={() => setView(VIEW.BOOKMARKS)} active={view === VIEW.BOOKMARKS} />
              <NavBtn icon="🕐" label="Histórico"  onClick={() => setView(VIEW.HISTORY)}   active={view === VIEW.HISTORY} />
            </>
          )}
          <NavBtn icon="👤" label={user ? 'Perfil' : 'Entrar'} onClick={() => user ? setView(VIEW.PROFILE) : handleLogin()} active={view === VIEW.PROFILE} />
        </nav>
      </header>

      {/* ── HOME ─────────────────────────────────────────────────────────── */}
      {view === VIEW.HOME && (
        <main style={styles.main}>
          {user && userData?.progress && (
            <div style={styles.resumeCard} onClick={resumeReading}>
              <div style={styles.resumeIcon}>▶</div>
              <div>
                <div style={styles.resumeLabel}>Continuar lendo</div>
                <div style={styles.resumeBook}>
                  {BOOKS.find(b => b.id === userData.progress.bookId)?.name} — Cap. {userData.progress.chapter + 1}
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div style={styles.loginBanner}>
              <p style={{ margin: 0, color: '#64748b' }}>Entre com sua conta Google para salvar sua posição de leitura, marcadores e histórico.</p>
              <button style={styles.googleBtn} onClick={handleLogin}>
                <span style={{ fontSize: 18 }}>G</span> Entrar com Google
              </button>
            </div>
          )}

          <input
            style={styles.search}
            placeholder="Buscar livro..."
            value={bookFilter}
            onChange={e => setBookFilter(e.target.value)}
          />

          <Section title="Antigo Testamento" books={AT_BOOKS} filter={bookFilter} onSelect={openBook} />
          <Section title="Novo Testamento"   books={NT_BOOKS} filter={bookFilter} onSelect={openBook} />

          <footer style={styles.footer}>
            {version === 'jfaal'
              ? 'As Escrituras em português são da JFAAL, Copyright © Marcos Cristiano Alves Ferreira. Setembro de 2024. Licença CC BY 3.0 BR.'
              : 'Almeida Revista e Corrigida (ACF) — Domínio Público.'}
          </footer>
        </main>
      )}

      {/* ── READER ────────────────────────────────────────────────────────── */}
      {view === VIEW.READER && (
        <main style={styles.main} ref={topRef}>
          {readerLoading ? (
            <div style={styles.loading}>Carregando…</div>
          ) : bookMeta ? (
            <>
              <div style={styles.readerHeader}>
                <button style={styles.backBtn} onClick={() => setView(VIEW.HOME)}>← Livros</button>
                <div style={styles.readerTitle}>
                  {currentBook?.name} — Cap. {currentChapter + 1}/{bookMeta.chapters.length}
                </div>
                {/* Seletor de capítulo */}
                <select
                  style={styles.chapSelect}
                  value={currentChapter}
                  onChange={e => {
                    const ch = Number(e.target.value);
                    setCurrentChapter(ch);
                    setSelectedVerse(null);
                    if (user) saveProgress(user.uid, currentBook.id, ch).catch(() => {});
                  }}
                >
                  {bookMeta.chapters.map((_, i) => (
                    <option key={i} value={i}>Capítulo {i + 1}</option>
                  ))}
                </select>
              </div>

              <div style={styles.verses}>
                {bookMeta.chapters[currentChapter].map((verse, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.verseRow,
                      background: selectedVerse === i ? '#fef9c3' : 'transparent',
                    }}
                    onClick={() => setSelectedVerse(selectedVerse === i ? null : i)}
                  >
                    <span style={styles.verseNum}>{i + 1}</span>
                    <span style={styles.verseText}>{verse}</span>
                  </div>
                ))}
              </div>

              {/* Popup de ação ao selecionar versículo */}
              {selectedVerse !== null && (
                <div style={styles.verseActions}>
                  <button style={styles.actionBtn} onClick={() => handleBookmark(selectedVerse)}>
                    🔖 Marcar versículo {selectedVerse + 1}
                  </button>
                  <button style={styles.actionBtnGhost} onClick={() => setSelectedVerse(null)}>✕ Cancelar</button>
                </div>
              )}

              {/* Navegação prev/next */}
              <div style={styles.chapterNav}>
                <button style={styles.navBtn} onClick={() => goChapter(-1)} disabled={currentChapter === 0}>
                  ← Anterior
                </button>
                <button style={styles.navBtn} onClick={() => goChapter(1)} disabled={currentChapter === bookMeta.chapters.length - 1}>
                  Próximo →
                </button>
              </div>
            </>
          ) : null}
        </main>
      )}

      {/* ── MARCADORES ──────────────────────────────────────────────────── */}
      {view === VIEW.BOOKMARKS && (
        <main style={styles.main}>
          <h2 style={styles.sectionTitle}>🔖 Marcadores</h2>
          {!user ? (
            <p style={{ color: '#64748b' }}>Entre com o Google para ver seus marcadores.</p>
          ) : (userData?.bookmarks || []).length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Nenhum versículo marcado ainda.<br />Toque em um versículo durante a leitura para marcar.</p>
          ) : (
            [...(userData.bookmarks || [])].reverse().map((bm, i) => {
              const realIdx = (userData.bookmarks.length - 1) - i;
              return (
                <div key={i} style={styles.bmCard}>
                  <div style={styles.bmRef} onClick={() => {
                    const book = BOOKS.find(b => b.id === bm.bookId);
                    if (book) openBook(book, bm.chapter);
                  }}>
                    {bm.bookName} {bm.chapter + 1}:{bm.verse + 1}
                  </div>
                  <p style={styles.bmText}>"{bm.text}"</p>
                  <button style={styles.bmRemove} onClick={() => handleRemoveBookmark(realIdx)}>Remover</button>
                </div>
              );
            })
          )}
        </main>
      )}

      {/* ── HISTÓRICO ────────────────────────────────────────────────────── */}
      {view === VIEW.HISTORY && (
        <main style={styles.main}>
          <h2 style={styles.sectionTitle}>🕐 Histórico de Leitura</h2>
          {!user ? (
            <p style={{ color: '#64748b' }}>Entre com o Google para ver seu histórico.</p>
          ) : (userData?.history || []).length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Nenhuma leitura registrada ainda.</p>
          ) : (
            (userData.history || []).map((h, i) => {
              const book = BOOKS.find(b => b.id === h.bookId);
              return (
                <div key={i} style={styles.histRow} onClick={() => book && openBook(book, h.chapter)}>
                  <span style={styles.histBook}>{h.bookName} — Cap. {h.chapter + 1}</span>
                  <span style={styles.histDate}>{new Date(h.readAt).toLocaleDateString('pt-BR')}</span>
                </div>
              );
            })
          )}
        </main>
      )}

      {/* ── PERFIL / CONFIGURAÇÕES ──────────────────────────────────────── */}
      {view === VIEW.PROFILE && (
        <main style={styles.main}>
          {user ? (
            <>
              <div style={styles.profileCard}>
                {user.photoURL && <img src={user.photoURL} alt="" style={styles.avatar} referrerPolicy="no-referrer" />}
                <div>
                  <div style={styles.profileName}>{user.displayName}</div>
                  <div style={styles.profileEmail}>{user.email}</div>
                </div>
              </div>

              <div style={styles.settingsSection}>
                <h3 style={styles.settingsTitle}>⚙️ Configurações</h3>

                <label style={styles.settingLabel}>Versão da Bíblia</label>
                <div style={styles.versionRow}>
                  {['jfaal', 'acf'].map(v => (
                    <button
                      key={v}
                      style={{
                        ...styles.versionBtn,
                        ...(version === v ? styles.versionBtnActive : {}),
                      }}
                      onClick={() => handleVersionChange(v)}
                    >
                      {v === 'jfaal' ? 'JFAAL (atual)' : 'ACF (clássica)'}
                    </button>
                  ))}
                </div>
                <p style={styles.settingHint}>
                  {version === 'jfaal'
                    ? 'João Ferreira de Almeida atualizada — linguagem contemporânea.'
                    : 'Almeida Revista e Corrigida — texto clássico.'}
                </p>

                <div style={styles.statsRow}>
                  <div style={styles.statBox}>
                    <span style={styles.statNum}>{(userData?.bookmarks || []).length}</span>
                    <span style={styles.statLabel}>Marcadores</span>
                  </div>
                  <div style={styles.statBox}>
                    <span style={styles.statNum}>{(userData?.history || []).length}</span>
                    <span style={styles.statLabel}>Capítulos lidos</span>
                  </div>
                </div>
              </div>

              <button style={styles.logoutBtn} onClick={() => { logout(); setView(VIEW.HOME); }}>
                Sair da conta
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <p style={{ color: '#64748b', marginBottom: 24 }}>Entre com sua conta Google para personalizar o app.</p>
              <button style={styles.googleBtn} onClick={handleLogin}>
                <span style={{ fontSize: 18 }}>G</span> Entrar com Google
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

// ── Sub-componentes ─────────────────────────────────────────────────────────

function Splash() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontSize:32 }}>
      📖
    </div>
  );
}

function NavBtn({ icon, label, onClick, active }) {
  return (
    <button style={{ ...styles.navBtnBase, color: active ? '#2563eb' : '#64748b' }} onClick={onClick} title={label}>
      <span>{icon}</span>
      <span style={styles.navLabel}>{label}</span>
    </button>
  );
}

function Section({ title, books, filter, onSelect }) {
  const filtered = filter
    ? books.filter(b => b.name.toLowerCase().includes(filter.toLowerCase()) || b.abbrev.toLowerCase().includes(filter.toLowerCase()))
    : books;
  if (filtered.length === 0) return null;
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={styles.testament}>{title}</h3>
      <div style={styles.bookGrid}>
        {filtered.map(b => (
          <button key={b.id} style={styles.bookCard} onClick={() => onSelect(b, 0)}>
            <span style={styles.bookAbbrev}>{b.abbrev}</span>
            <span style={styles.bookName}>{b.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Estilos inline ──────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    background: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
  },
  header: {
    position: 'sticky', top: 0, zIndex: 100,
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 16px', height: 56,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  logoBtn: { background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:8, padding:0 },
  logoText: { fontSize: 18, fontWeight: 700, color: '#1e40af' },
  nav: { display:'flex', gap:4, alignItems:'center' },
  navBtnBase: {
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    fontSize: 20, padding: '4px 10px', gap: 1, borderRadius: 8,
  },
  navLabel: { fontSize: 10, marginTop: 1 },

  main: { maxWidth: 680, margin: '0 auto', padding: '20px 16px', paddingBottom: 80 },

  resumeCard: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: '#eff6ff', border: '1px solid #bfdbfe',
    borderRadius: 12, padding: '14px 18px', marginBottom: 20, cursor: 'pointer',
  },
  resumeIcon: { fontSize: 20, color: '#2563eb' },
  resumeLabel: { fontSize: 11, color: '#60a5fa', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: 1 },
  resumeBook: { fontSize: 16, fontWeight: 600, color: '#1e40af' },

  loginBanner: {
    background: '#f1f5f9', borderRadius: 12, padding: 18, marginBottom: 20,
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  googleBtn: {
    display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
    background: '#fff', border: '1px solid #d1d5db', borderRadius: 8,
    padding: '10px 20px', cursor: 'pointer', fontFamily: 'sans-serif',
    fontSize: 14, fontWeight: 600, color: '#374151', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },

  search: {
    width: '100%', boxSizing: 'border-box',
    border: '1px solid #e2e8f0', borderRadius: 10,
    padding: '10px 14px', fontSize: 15, fontFamily: 'sans-serif',
    marginBottom: 24, background: '#fff', outline: 'none',
  },

  testament: { fontSize: 12, letterSpacing: 2, color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12 },
  bookGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 },
  bookCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
    padding: '10px 4px', cursor: 'pointer', gap: 3,
    transition: 'box-shadow .15s', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  bookAbbrev: { fontSize: 13, fontWeight: 700, color: '#1e40af', fontFamily: 'sans-serif' },
  bookName: { fontSize: 11, color: '#64748b', fontFamily: 'sans-serif', textAlign: 'center' },

  footer: { fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 40, fontFamily: 'sans-serif', lineHeight: 1.6 },

  // Reader
  readerHeader: {
    display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10,
    marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #e2e8f0',
  },
  backBtn: { background:'none', border:'none', cursor:'pointer', color:'#2563eb', fontSize:14, fontFamily:'sans-serif', padding:0 },
  readerTitle: { flex:1, fontSize:16, fontWeight:700, color:'#1e293b' },
  chapSelect: { border:'1px solid #e2e8f0', borderRadius:8, padding:'6px 10px', fontFamily:'sans-serif', fontSize:13 },

  verses: { display:'flex', flexDirection:'column', gap:2 },
  verseRow: {
    display: 'flex', gap: 10, padding: '8px 6px', borderRadius: 8, cursor: 'pointer',
    transition: 'background .1s',
  },
  verseNum: { minWidth: 24, color: '#93c5fd', fontFamily:'sans-serif', fontSize:12, paddingTop:3, textAlign:'right' },
  verseText: { lineHeight: 1.8, fontSize: 16, color: '#1e293b' },

  verseActions: {
    position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)',
    background:'#1e293b', color:'#fff', borderRadius:14,
    padding:'10px 18px', display:'flex', gap:12, alignItems:'center',
    boxShadow:'0 4px 24px rgba(0,0,0,0.2)', zIndex:200,
  },
  actionBtn: { background:'#2563eb', color:'#fff', border:'none', borderRadius:8, padding:'8px 14px', cursor:'pointer', fontSize:14, fontFamily:'sans-serif' },
  actionBtnGhost: { background:'none', color:'#94a3b8', border:'none', cursor:'pointer', fontSize:14, fontFamily:'sans-serif' },

  chapterNav: { display:'flex', justifyContent:'space-between', marginTop:32, paddingTop:16, borderTop:'1px solid #e2e8f0' },
  navBtn: {
    background:'#eff6ff', color:'#2563eb', border:'none', borderRadius:8,
    padding:'10px 20px', cursor:'pointer', fontFamily:'sans-serif', fontSize:14, fontWeight:600,
  },

  // Bookmarks
  sectionTitle: { fontSize:20, fontWeight:700, marginBottom:20 },
  bmCard: {
    background:'#fff', border:'1px solid #e2e8f0', borderRadius:12,
    padding:16, marginBottom:12,
  },
  bmRef: { fontWeight:700, color:'#2563eb', cursor:'pointer', fontFamily:'sans-serif', fontSize:14, marginBottom:6 },
  bmText: { color:'#475569', fontSize:15, lineHeight:1.7, margin:'0 0 10px' },
  bmRemove: { background:'none', border:'1px solid #fca5a5', color:'#dc2626', borderRadius:6, padding:'4px 10px', cursor:'pointer', fontSize:12, fontFamily:'sans-serif' },

  // History
  histRow: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'12px 0', borderBottom:'1px solid #f1f5f9', cursor:'pointer',
  },
  histBook: { fontSize:15, color:'#1e293b' },
  histDate: { fontSize:12, color:'#94a3b8', fontFamily:'sans-serif' },

  // Profile
  profileCard: {
    display:'flex', alignItems:'center', gap:16,
    background:'#fff', border:'1px solid #e2e8f0', borderRadius:14,
    padding:20, marginBottom:24,
  },
  avatar: { width:56, height:56, borderRadius:'50%' },
  profileName: { fontWeight:700, fontSize:18 },
  profileEmail: { color:'#64748b', fontSize:13, fontFamily:'sans-serif' },

  settingsSection: {
    background:'#fff', border:'1px solid #e2e8f0', borderRadius:14,
    padding:20, marginBottom:20,
  },
  settingsTitle: { fontSize:16, fontWeight:700, marginBottom:18, margin:'0 0 18px' },
  settingLabel: { fontSize:12, color:'#64748b', textTransform:'uppercase', letterSpacing:1, fontFamily:'sans-serif', display:'block', marginBottom:10 },
  versionRow: { display:'flex', gap:10, marginBottom:10 },
  versionBtn: {
    flex:1, padding:'10px', border:'1px solid #e2e8f0', borderRadius:10,
    background:'#f8fafc', cursor:'pointer', fontFamily:'sans-serif', fontSize:14, color:'#475569',
  },
  versionBtnActive: { background:'#eff6ff', border:'1px solid #93c5fd', color:'#1e40af', fontWeight:700 },
  settingHint: { fontSize:12, color:'#94a3b8', fontFamily:'sans-serif', margin:'0 0 20px' },

  statsRow: { display:'flex', gap:12, marginTop:8 },
  statBox: {
    flex:1, background:'#f8fafc', borderRadius:10, padding:'14px 10px',
    display:'flex', flexDirection:'column', alignItems:'center',
  },
  statNum: { fontSize:24, fontWeight:700, color:'#1e40af' },
  statLabel: { fontSize:11, color:'#94a3b8', fontFamily:'sans-serif' },

  logoutBtn: {
    width:'100%', padding:'12px', border:'1px solid #fca5a5',
    background:'#fff', color:'#dc2626', borderRadius:10, cursor:'pointer',
    fontFamily:'sans-serif', fontSize:15,
  },

  // Toast
  toast: {
    position:'fixed', bottom:80, left:'50%', transform:'translateX(-50%)',
    background:'#1e293b', color:'#fff', borderRadius:10, padding:'10px 20px',
    fontFamily:'sans-serif', fontSize:14, zIndex:300, whiteSpace:'nowrap',
    boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
  },

  loading: { textAlign:'center', padding:60, color:'#94a3b8', fontFamily:'sans-serif' },
};
