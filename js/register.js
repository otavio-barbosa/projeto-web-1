import { auth, db } from "../firebase/config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

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
            const docData = {
                name: getName(),
                date: getDate(),
                userUid: result.user.uid
            }

            setDoc(doc(db, "users", result.user.uid), docData)
                .then((result) => {
                    console.log('Documento cadastrado com sucesso: ' + JSON.stringify(result))
                    window.location.href = "/pages/home.html"
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

