import { auth } from "../firebase/config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"

const getEmail = () => {
    return document.getElementById('emailTxt').value
}

const getPassword = () => {
    return document.getElementById('password').value
}

const registerUser = () => {
    createUserWithEmailAndPassword(auth, getEmail(), getPassword())
        .then((result) => {
            console.log('Usuário cadastradp com sucesso!!' + JSON.stringify(result))
            console.log(getEmail() + " " + getPassword())
        })
        .cath((error) => {
            console.log('Erro ao cadastrar o usuário!!' + JSON.stringify(error))
        })
}

document.getElementById("btnRegister").addEventListener('click', () => {
    registerUser()
})

