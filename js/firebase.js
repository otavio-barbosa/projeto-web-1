// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 
const firebaseConfig = {
    apiKey: "AIzaSyAJ-x9dvLoOzO0uYD98oY9DNM0PWYNjevA",
    authDomain: "web-1-820d4.firebaseapp.com",
    projectId: "web-1-820d4",
    storageBucket: "web-1-820d4.appspot.com",
    messagingSenderId: "1028555949577",
    appId: "1:1028555949577:web:ab39ae1b88a7aff5489ad8",
    measurementId: "G-3SZ79P959N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("antes");
firebase.auth().signInWithEmailAndPassword("any@email.com", "123456").then(response => {
    console.log("sucesso", response);
}).catch(error => {
    console.log("error", error);
})

console.log("depois");

