// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-6f6K9D4sTzcnWZimc35iYOdJSrk4lvw",
  authDomain: "marketease-75e09.firebaseapp.com",
  databaseURL: "https://marketease-75e09-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marketease-75e09",
  storageBucket: "marketease-75e09.appspot.com",
  messagingSenderId: "32186579531",
  appId: "1:32186579531:web:d6d3a75038545f3b4c6bce",
  measurementId: "G-1EFNVM3RXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);