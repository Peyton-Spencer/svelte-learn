// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
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
