import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyABy3tkivt09rfmMp8M1EJS45Dz8cWJleA",
  authDomain: "my-heath-caebd.firebaseapp.com",
  projectId: "my-heath-caebd",
  storageBucket: "my-heath-caebd.appspot.com",
  messagingSenderId: "552879455867",
  appId: "1:552879455867:web:b5cbbec71d50534ece6cde",
  measurementId: "G-5BJMH1N9Z7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };