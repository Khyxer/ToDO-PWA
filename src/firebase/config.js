import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUbvxz6Mf8No-QUenhO_pwG5_GlijLspw",
  authDomain: "todo-capacitor-8b51c.firebaseapp.com",
  projectId: "todo-capacitor-8b51c",
  storageBucket: "todo-capacitor-8b51c.firebasestorage.app",
  messagingSenderId: "807340155545",
  appId: "1:807340155545:web:f61e6f394774420e37ce08",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
