import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG_KYVrlm65Tk5-Kjuv1NWEMwqITtXYs4",
  authDomain: "blog-website-c7989.firebaseapp.com",
  projectId: "blog-website-c7989",
  storageBucket: "blog-website-c7989.appspot.com",
  messagingSenderId: "439790302143",
  appId: "1:439790302143:web:b7dd79bfd13738e4fe270a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
