// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBytqtiSIntOneDkTxsQq0oI2jNXHd0jcc",
  authDomain: "health-tracker-web-84c42.firebaseapp.com",
  projectId: "health-tracker-web-84c42",
  storageBucket: "health-tracker-web-84c42.firebasestorage.app",
  messagingSenderId: "571970335499",
  appId: "1:571970335499:web:599a814ad1c179c0c8680e",
  measurementId: "G-NEKS9R2BYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db = getFirestore(app);

