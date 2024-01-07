// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvbkIivePmS2iCT9rnc08YtZWnRqQy4Qw",
  authDomain: "sample-web-ec852.firebaseapp.com",
  projectId: "sample-web-ec852",
  storageBucket: "sample-web-ec852.appspot.com",
  messagingSenderId: "1074011158968",
  appId: "1:1074011158968:web:73f9b2f2a2ee03c95cf74d",
  measurementId: "G-L73CTCZL31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
