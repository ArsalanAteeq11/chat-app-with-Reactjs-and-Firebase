import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-cee8f.firebaseapp.com",
  projectId: "reactchat-cee8f",
  storageBucket: "reactchat-cee8f.appspot.com",
  messagingSenderId: "183899046887",
  appId: "1:183899046887:web:004a263aa922388cdbb342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
