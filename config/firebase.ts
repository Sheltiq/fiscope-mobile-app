// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD13Er9Id7Uh3zTtTd6eKp7bVPbEHTs_0s",
  authDomain: "fiscope-277e8.firebaseapp.com",
  projectId: "fiscope-277e8",
  storageBucket: "fiscope-277e8.firebasestorage.app",
  messagingSenderId: "1024518867867",
  appId: "1:1024518867867:web:bbc1ca9a30a7b536e86f3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Авторизация
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// БД
export const firestore = getFirestore(app);

