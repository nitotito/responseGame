// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxUDNQ0CsBTeStlQGdqbM2Zt4RfrKo7yA",
  authDomain: "preguntasrespuestas-a7843.firebaseapp.com",
  projectId: "preguntasrespuestas-a7843",
  storageBucket: "preguntasrespuestas-a7843.firebasestorage.app",
  messagingSenderId: "764513728816",
  appId: "1:764513728816:web:f73efb2a205096d39030f5",
  measurementId: "G-QNPQM3MC86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export {db};