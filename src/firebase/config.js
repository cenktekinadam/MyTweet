// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjKHLOOmr225XGWwxsMHKEvcbkP2PijjI",
    authDomain: "twitter-52dc6.firebaseapp.com",
    projectId: "twitter-52dc6",
    storageBucket: "twitter-52dc6.appspot.com",
    messagingSenderId: "1086310579954",
    appId: "1:1086310579954:web:bf5d9b3bf06e2bed231a6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth referanslarını alma

export const auth = getAuth(app)

// google provider kurulumu

export const provider = new GoogleAuthProvider();

// Veritabanının referansını alma 
export const db = getFirestore(app);

// Medydepolama alanının referansını alme 
export const storage = getStorage(app)