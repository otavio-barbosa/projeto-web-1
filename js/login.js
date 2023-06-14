import { auth } from "../firebase/config.js"
import { db } from "../firebase/config.js"
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { getDoc, collection, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const getEmail = () => {
    return document.getElementById('email').value
}

const getPassword = () => {
    return document.getElementById('password').value
}

const authUser = () => {
    signInWithEmailAndPassword(auth, getEmail(), getPassword())
        .then(() => {
            const auth = getAuth()
            const user = auth.currentUser;
            console.log('logado ' + auth + 'userrr: ' + user.uid)

            const docRef = doc(db, "users", user.uid)

            getDoc(docRef)
                .then((result) => {
                    console.log('Aqui o result: ' + JSON.stringify(result.data()))
                    window.location.href = "/pages/home.html"
                })
                .catch((error) => {
                    console.log("Deu erro no doc" + error)
                })

            console.log('logado com sucesso')
        })
        .catch((error) => {
            console.log('Erro ao logar, tente novamente.' + error)
        })
}

document.getElementById("btn-login").addEventListener('click', () => {
    authUser()
})

function onChangeEmail() {
    const email = form.email().value;
    email ? form.emailError().style.display = "none" : form.emailError().style.display = "block"
}

function onChangePassword() {
    const password = form.password().value;
    password ? form.passwordError().style.display = "none" : form.passwordError().style.display = "block"
}

function login() {
    form.email().value == "" || form.password().value == "" ? form.btnLogin().href = "#" :form.btnLogin().href = "/pages/home.html" 
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailError: () => document.getElementById('email-error'),
    passwordError: () => document.getElementById('password-error'),
    btnLogin: () => document.getElementById('btn-login'),
}

