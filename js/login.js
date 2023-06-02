import { auth } from "../firebase/config.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"

const getEmail = () => {
    return document.getElementById('email').value
}

const getPassword = () => {
    return document.getElementById('password').value
}

const authUser = () => {
    signInWithEmailAndPassword(auth, getEmail(), getPassword())
        .then(() => {
            console.log('logado com sucesso')
            window.location.href = "../pages/home.html"
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

