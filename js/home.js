import { db } from "../firebase/config.js"
import { collection, query, where, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const loadVacines = () => {
    const userId = "VMZ8XmKXUsE4WQ2cAAYk"
    const queryVacines = query(collection(db, `users/${userId}/vacines`))

    getDocs(queryVacines)
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                vacinesList.push(doc.data())
                console.log(doc.data())
                console.log('Lista das vacinas: ' + vacinesList[0].dose)

            })
        })
        .catch((error) => {
            console.log('Erro ao carregar as vacinas: ' + JSON.stringify(error))
        }) 

    console.log(vacinesList)
}

const searchVacines = () => {
    const userId = "VMZ8XmKXUsE4WQ2cAAYk"
    const idVacine = "Z1GTsQ7hTgtHyR8BpCTl"

    const docRef = doc(db, `users/${userId}/vacines`, idVacine)
    getDoc(docRef)
        .then((doc) => {
            console.log('Docccc: ' + doc.data())
        })
        .catch((error) => {
            console.log('Erro ao tentar buscar documento ' + error)
        })
}

document.getElementById("btnTest").addEventListener('click', () => {
    searchVacines()
})
