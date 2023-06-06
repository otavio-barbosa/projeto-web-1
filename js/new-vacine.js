import { db } from "../firebase/config.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const getDate = () => {
    return document.getElementById('dateTxt').value
}

const getVacine = () => {
    return document.getElementById('vacineTxt').value
}

const getDose = () => {
    return document.querySelector('input[name=dose]:checked').value
}

const getNextVacine = () => {
    return document.getElementById('nextVacineTxt').value
}

const registerVacine = () => {
    const userId = "VMZ8XmKXUsE4WQ2cAAYk"

    const doc = {
        date: getDate(),
        vacine: getVacine(),
        dose: getDose(),
        nextVacine: getNextVacine()
    }

    addDoc(collection(db, `users/${userId}/vacines`), doc)
        .then((result) => {
            console.log('Vacinas documentadas com sucesso:' + JSON.stringify(result))
        })
        .cath((error) => {
            console.log('Erro ao documentar as vacinas: ' + JSON.stringify(error))
        })
}

document.getElementById("btnRegister").addEventListener('click', () => {
    registerVacine()
})
