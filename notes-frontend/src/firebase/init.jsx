// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpkOT5s9o3XICrSVQlB5GG1_1qTUx4Tzc",
  authDomain: "notes-firebase-412fb.firebaseapp.com",
  projectId: "notes-firebase-412fb",
  storageBucket: "notes-firebase-412fb.firebasestorage.app",
  messagingSenderId: "596200144049",
  appId: "1:596200144049:web:0ddedac54bbe6a6ae13690",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
