import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb7td3kBds1a2-peSCXdhZk2IGfcYkQBw",
  authDomain: "recolecta-familiar.firebaseapp.com",
  projectId: "recolecta-familiar",
  storageBucket: "recolecta-familiar.firebasestorage.app",
  messagingSenderId: "391157865533",
  appId: "1:391157865533:web:7e101fc63a438a1085de54"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc };