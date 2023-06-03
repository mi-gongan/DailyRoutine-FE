import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "image-upload-39ea1.firebaseapp.com",
  projectId: "image-upload-39ea1",
  storageBucket: "image-upload-39ea1.appspot.com",
  messagingSenderId: "118100689875",
  appId: "1:118100689875:web:ca2b7c88aa548cade6e526",
  measurementId: "G-PHQRDFM0G0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);