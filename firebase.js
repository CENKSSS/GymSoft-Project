// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDU1lBG9USpAcpt8iskpHR5eb21B7qKYTY",
  authDomain: "gymm-66434.firebaseapp.com",
  projectId: "gymm-66434",
  storageBucket: "gymm-66434.appspot.com",
  messagingSenderId: "116845754814",
  appId: "1:116845754814:web:23158e1157b507e16de1ef",
  measurementId: "G-Q8SM4MZVC1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
