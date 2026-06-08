// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyAgWyvn_PwOc0evH29ktwREKCiPhf9sXyc",
  authDomain:        "biblia-app-de7cb.firebaseapp.com",
  projectId:         "biblia-app-de7cb",
  storageBucket:     "biblia-app-de7cb.firebasestorage.app",
  messagingSenderId: "471426587384",
  appId:             "1:471426587384:web:760fa36f15b977d864390d",
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// Detecta se é mobile/Safari para usar redirect em vez de popup
function isMobileSafari() {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(ua) || 
         (/Safari/i.test(ua) && !/Chrome/i.test(ua));
}

export async function loginGoogle() {
  if (isMobileSafari()) {
    await signInWithRedirect(auth, googleProvider);
  } else {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  }
}

export async function checkRedirectResult() {
  const result = await getRedirectResult(auth);
  return result?.user || null;
}

export function logout() {
  return signOut(auth);
}

function userRef(uid) {
  return doc(db, 'users', uid);
}

export async function loadUserData(uid) {
  const ref  = userRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  const defaults = {
    version:   'jfaal',
    progress:  { bookId: 'gn', chapter: 0 },
    bookmarks: [],
    history:   [],
  };
  await setDoc(ref, defaults);
  return defaults;
}

export function saveVersion(uid, version) {
  return updateDoc(userRef(uid), { version });
}

export function saveProgress(uid, bookId, chapter) {
  return updateDoc(userRef(uid), { progress: { bookId, chapter } });
}

export async function addBookmark(uid, bookmark) {
  return updateDoc(userRef(uid), {
    bookmarks: arrayUnion({ ...bookmark, addedAt: new Date().toISOString() }),
  });
}

export async function removeBookmark(uid, bookmarks, index) {
  const updated = bookmarks.filter((_, i) => i !== index);
  return updateDoc(userRef(uid), { bookmarks: updated });
}

export async function addHistory(uid, currentHistory, entry) {
  const item = { ...entry, readAt: new Date().toISOString() };
  const updated = [item, ...currentHistory].slice(0, 100);
  return updateDoc(userRef(uid), { history: updated });
}
