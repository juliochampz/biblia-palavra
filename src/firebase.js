import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider,
  signInWithPopup, signInWithRedirect,
  getRedirectResult, signOut
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc,
  setDoc, updateDoc, arrayUnion,
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

function isMobileSafari() {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(ua) ||
         (/Safari/i.test(ua) && !/Chrome/i.test(ua));
}

export async function loginGoogle() {
  if (isMobileSafari() || /And
