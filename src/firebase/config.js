// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these with values from your Firebase project settings
const firebaseConfig = {
    apiKey: "AIzaSyAzvIau2XHUeqj4UAxk7uv7ZPeCa5Hz87E",
    authDomain: "foodorderingapp-ae750.firebaseapp.com",
    projectId: "foodorderingapp-ae750",
    storageBucket: "foodorderingapp-ae750.firebasestorage.app",
    messagingSenderId: "721439288183",
    appId: "1:721439288183:web:c71469573406ac8d95cf72"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
