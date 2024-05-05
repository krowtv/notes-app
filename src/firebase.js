import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBDZj3XvQ2Kn-V2Ho-SYHL48LiVifnAvaY",
  authDomain: "react-notes-f4bee.firebaseapp.com",
  projectId: "react-notes-f4bee",
  storageBucket: "react-notes-f4bee.appspot.com",
  messagingSenderId: "337387319005",
  appId: "1:337387319005:web:9b65e93109f399715db534"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");