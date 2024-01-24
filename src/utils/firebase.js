// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8Ii-BbYq57uwhZDC__IzJQPjhejYAKe4",
  authDomain: "netflixgpt-3f258.firebaseapp.com",
  projectId: "netflixgpt-3f258",
  storageBucket: "netflixgpt-3f258.appspot.com",
  messagingSenderId: "420029748760",
  appId: "1:420029748760:web:11a79111bbe5c4b379156d",
  measurementId: "G-672CC8S8HD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
