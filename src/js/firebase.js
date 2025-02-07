import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOiGf4P9qH6g_JQeGRNVbbwRim_rgSPcg",
  authDomain: "noteballs-463cf.firebaseapp.com",
  projectId: "noteballs-463cf",
  storageBucket: "noteballs-463cf.firebasestorage.app",
  messagingSenderId: "231023869093",
  appId: "1:231023869093:web:188f6d417b5fb736d4214c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }