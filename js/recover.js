import { auth } from "../firebase/config.js"
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"

const message = document.getElementById('txtMessage')

const getEmail = () => {
    return document.getElementById('emailTxt').value
}

const recoverPassword = () => {
    sendPasswordResetEmail(auth, getEmail())
        .then(() => {
            message.innerHTML = "E-mail de redefinição de senha enviado"
            // alert('email enviado')
        })
}

document.getElementById("btnRecover").addEventListener('click', () => {
    recoverPassword()
})
