// src/firebase.js
// Firebase separado para o app Bíblia — NÃO é o despesas-c2f24

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';

// ⚠️  Substitua pelos valores do SEU novo projeto Firebase (biblia-app ou similar)
const firebaseConfig = {
  apiKey:            "COLE_AQUI",
  authDomain:        "COLE_AQUI",
  projectId:         "COLE_AQUI",
  storageBucket:     "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId:             "COLE_AQUI",
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// ── Auth ───────────────────────────────────────────────────────────────────
export async function loginGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export function logout() {
  return signOut(auth);
}

// ── Estrutura Firestore ────────────────────────────────────────────────────
// users/{uid} → {
//   version: 'jfaal' | 'arc',
//   progress: { bookId: string, chapter: number },   ← última posição lida
//   bookmarks: [ { bookId, chapter, verse, text, addedAt } ],
//   history:   [ { bookId, bookName, chapter, readAt } ],  ← últimos 100
// }

function userRef(uid) {
  return doc(db, 'users', uid);
}

// Lê (ou inicializa) o documento do usuário
export async function loadUserData(uid) {
  const ref  = userRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();

  // Primeira vez — cria o documento com defaults
  const defaults = {
    version:   'jfaal',
    progress:  { bookId: 'gn', chapter: 0 },
    bookmarks: [],
    history:   [],
  };
  await setDoc(ref, defaults);
  return defaults;
}

// Salva versão preferida
export function saveVersion(uid, version) {
  return updateDoc(userRef(uid), { version });
}

// Salva última posição lida
export function saveProgress(uid, bookId, chapter) {
  return updateDoc(userRef(uid), { progress: { bookId, chapter } });
}

// Adiciona marcador
export async function addBookmark(uid, bookmark) {
  // bookmark = { bookId, bookName, chapter, verse, text }
  return updateDoc(userRef(uid), {
    bookmarks: arrayUnion({ ...bookmark, addedAt: new Date().toISOString() }),
  });
}

// Remove marcador (por índice — recria o array)
export async function removeBookmark(uid, bookmarks, index) {
  const updated = bookmarks.filter((_, i) => i !== index);
  return updateDoc(userRef(uid), { bookmarks: updated });
}

// Registra entrada no histórico (mantém últimas 100 entradas)
export async function addHistory(uid, currentHistory, entry) {
  // entry = { bookId, bookName, chapter }
  const item = { ...entry, readAt: new Date().toISOString() };
  const updated = [item, ...currentHistory].slice(0, 100);
  return updateDoc(userRef(uid), { history: updated });
}
