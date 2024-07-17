// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgYby8CYtQh28Dzt0sF7YvJ3UMg4bbmg4",
  authDomain: "realestate-listing-react-e8107.firebaseapp.com",
  projectId: "realestate-listing-react-e8107",
  storageBucket: "realestate-listing-react-e8107.appspot.com",
  messagingSenderId: "158229782712",
  appId: "1:158229782712:web:4db6187d41b862cd91144d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()