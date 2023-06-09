import { db } from "../firebase/config.js"
import { collection, query, where, getDocs, getDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const cards = document.querySelector(".cards")

window.onload = async () => {
    console.log('entrou no onload')
    consultaTeste()
}

const consultaTeste = () => {
    console.log('entrou no consulta teste')

    const userId = "VMZ8XmKXUsE4WQ2cAAYk"

    const que = query(collection(db, `users/${userId}/vacines`))

    onSnapshot(que, (snapshot) => {
        cards.innerHTML = ""
        snapshot.forEach((vacine) => {
            cards.appendChild(vacineCard(
                vacine.data().date,
                vacine.data().vacine,
                vacine.data().dose,
                vacine.data().image,
                vacine.data().nextVacine
            ))
        })
    })
}

const vacineCard = (date, vacine, dose, urlImage, nextVacine) => {
    console.log('entrou no vacine card')
    let card = document.createElement("div")
    card.setAttribute('class', 'card')
    card.style.cursor = 'pointer'
    card.addEventListener('click', function () {
        const idWithInc = id + 1
        window.location.href = `/pages/edit-vacine.html?id=${idWithInc}`
    })
    card.innerHTML += `<h2 class="card-name"> ${vacine} </h2>`
    card.innerHTML += `<div class="dose-card"> ${dose} </div>`
    card.innerHTML += `<p class="date-card"> ${date} </p>`
    card.innerHTML += `<img src="${urlImage}" class="img-card"/>`
    card.innerHTML += `<p class="next-card"> ${nextVacine} </p>`
    cards.appendChild(card)

    return card
}

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
            console.log(doc.data().vacine)
        })
        .catch((error) => {
            console.log('Erro ao tentar buscar documento ' + error)
        })
}

// const searchVacines = () => {
//     const userId = "VMZ8XmKXUsE4WQ2cAAYk"
//     const idVacine = "Z1GTsQ7hTgtHyR8BpCTl"

//     const docRef = collection(db, `users/${userId}/vacines`)
//     query(docRef, where('vacine', '==', 'Gh'))
//         .then((doc) => {
//             console.log(doc.data().vacine)
//         })
//         .catch((error) => {
//             console.log('Erro ao tentar buscar documento ' + error)
//         })
// }

document.getElementById("btnTest").addEventListener('click', () => {
    searchVacines()
})
