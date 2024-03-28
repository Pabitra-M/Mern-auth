// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-406bf.firebaseapp.com",
  projectId: "mern-auth-406bf",
  storageBucket: "mern-auth-406bf.appspot.com",
  messagingSenderId: "134734284850",
  appId: "1:134734284850:web:e350257cac897e98c2d42b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);