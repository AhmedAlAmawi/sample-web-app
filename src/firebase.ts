// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo1UnC_qZ_uPS-Hmryg2VHGA5m0oWIGjA",
  authDomain: "bill-lax.firebaseapp.com",
  projectId: "bill-lax",
  storageBucket: "bill-lax.appspot.com",
  messagingSenderId: "407134455815",
  appId: "1:407134455815:web:fc850ffd3bcf4e5f7702a2",
  measurementId: "G-3PWLRB5B78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
