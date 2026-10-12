// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0wm9IQz6uSxrEEhvGptJxlUkA041Wqzk",
  authDomain: "learning-5abca.firebaseapp.com",
  projectId: "learning-5abca",
  storageBucket: "learning-5abca.firebasestorage.app",
  messagingSenderId: "116424209345",
  appId: "1:116424209345:web:28b1b2f92e3134d3f27540",
  measurementId: "G-CWT722F6WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);