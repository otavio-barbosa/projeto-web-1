import { auth, db } from "../firebase/config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const getName = () => {
    return document.getElementById('nameTxt').value
}

const getDate = () => {
    return document.getElementById('dateTxt').value
}

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

            const doc = {
                name: getName(),
                date: getDate(),
                email: getEmail(),
                password: getPassword()
            }

            addDoc(collection(db, "users"), doc)
                .then((result) => {
                    console.log('Documento cadastrado com sucesso: ' + JSON.stringify(result))
                })
                .cath((error) => {
                    console.log('Erro ao cadastrar documento: ' + JSON.stringify(error))
                })
        })
        .cath((error) => {
            console.log('Erro ao cadastrar o usuário!!' + JSON.stringify(error))
        })
}

document.getElementById("btnRegister").addEventListener('click', () => {
    registerUser()
})

