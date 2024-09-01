// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs1gJP23YYyKXChA1y1eFSQFDo6IeRfLE",
  authDomain: "react-crud-app-7fe03.firebaseapp.com",
  projectId: "react-crud-app-7fe03",
  storageBucket: "react-crud-app-7fe03.appspot.com",
  messagingSenderId: "631497342637",
  appId: "1:631497342637:web:eebc80b8d4dc3db9ea5024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// console.log(auth);
// console.log(db);

export { db, auth };

export default app;