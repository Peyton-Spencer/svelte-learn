// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPIZ5sCm8f32NfolzR0NIUIdYd3t7t4vA",
  authDomain: "learning-full-stack-f7096.firebaseapp.com",
  projectId: "learning-full-stack-f7096",
  storageBucket: "learning-full-stack-f7096.appspot.com",
  messagingSenderId: "938521169230",
  appId: "1:938521169230:web:32ed1d5efecf7ba0d0221f",
  measurementId: "G-M7PCDG3LCB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
/**
 * @returns a store for the current user
 */
function userStore() {
  let unsub: () => void;
  if (!auth || !globalThis.window) {
    console.warn("auth or window not available");
    const { subscribe } = writable<User | null>(null);
    return { subscribe };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set: any) => {
    unsub = auth.onAuthStateChanged((user: any) => {
      set(user);
    });

    return () => unsub();
  });

  return { subscribe };
}

export const user = userStore();

export function docStore<T>(path: string) {
  let unsub: () => void;
  const docRef = doc(db, path);
  const { subscribe } = writable<T | null>(null, (set: any) => {
    unsub = onSnapshot(docRef, (doc: any) => {
      set((doc.data() as T) ?? null);
    });

    return () => unsub();
  });
  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}
