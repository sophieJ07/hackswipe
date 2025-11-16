import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuEONJ8aarJT0KrddGcys7TYIdSMh66Bg",
    authDomain: "hackswipe-6881f.firebaseapp.com",
    projectId: "hackswipe-6881f",
    storageBucket: "hackswipe-6881f.firebasestorage.app",
    messagingSenderId: "647354924814",
    appId: "1:647354924814:web:8f39a6972a434dec88215f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);