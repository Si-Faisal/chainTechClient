// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyCQubWpkZZDjMnn1Dvz-YfKrhMfnDcALuY",
  authDomain: "firestore-project-ff4ab.firebaseapp.com",
  projectId: "firestore-project-ff4ab",
  storageBucket: "firestore-project-ff4ab.appspot.com",
  messagingSenderId: "780323629130",
  appId: "1:780323629130:web:46ea00332f07ff3a285eb3",
  measurementId: "G-SQ6DZBX4GB"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);