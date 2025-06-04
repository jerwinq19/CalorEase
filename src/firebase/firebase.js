// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBfvASlAjQCzbuJBVy9sm5N86FH25rrWg",
    authDomain: "calorease-71b42.firebaseapp.com",
    projectId: "calorease-71b42",
    storageBucket: "calorease-71b42.appspot.com",
    messagingSenderId: "1080730339050",
    appId: "1:1080730339050:web:8bf48090a22d8ef4497993",
    measurementId: "G-F6QYL01FZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth};