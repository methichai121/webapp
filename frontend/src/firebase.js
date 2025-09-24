
//// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXZ2Rrlj2N4yuqofqB_jLZjFidLM3ttzs",
  authDomain: "student-volunteer-6e27b.firebaseapp.com",
  projectId: "student-volunteer-6e27b",
  storageBucket: "student-volunteer-6e27b.firebasestorage.app",
  messagingSenderId: "664136286821",
  appId: "1:664136286821:web:a5498133d09cfdc2e5fc8c",
  measurementId: "G-SF1HJFXB0Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
