import { db } from "../firebase/config.js"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { collection, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const cards = document.querySelector(".cards")

window.onload = async () => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Entrou")
            loadCards()
        } else {
            window.location.href = "/pages/login.html"
            console.log("N existe")
        }
    })
}

const loadCards = () => {
    const auth = getAuth()
    const userId = auth.currentUser.uid

    const que = query(collection(db, `users/${userId}/vacines`))

    onSnapshot(que, (snapshot) => {
        cards.innerHTML = ""
        snapshot.forEach((vacine) => {
            const vacineData = vacine.data()

            cards.appendChild(vacineCard(
                vacineData.date,
                vacineData.vacine,
                vacineData.dose,
                vacineData.image,
                vacineData.nextVacine,
                vacine.id
            ))
        })
    })
}

const vacineCard = (date, vacine, dose, urlImage, nextVacine, idVacine) => {
    let card = document.createElement("div")
    card.addEventListener('click', function () {
        window.location.href = `/pages/edit-vacine.html?id=${idVacine}`
    })
    card.setAttribute('class', 'card')
    card.style.cursor = 'pointer'
    card.innerHTML += `<h2 class="card-name"> ${vacine} </h2>`
    card.innerHTML += `<div class="dose-card"> ${dose} </div>`
    card.innerHTML += `<p class="date-card"> ${date} </p>`
    card.innerHTML += `<img src="${urlImage}" class="img-card"/>`
    card.innerHTML += `<p class="next-card"> ${nextVacine} </p>`
    cards.appendChild(card)

    return card
}

//**TESTE DE BUSCA DO SERACH **/

const getSearch = () => {
    return document.getElementById('inputSearch').value
}

document.getElementById("btnTest").addEventListener('click', () => {
    window.location.href = "/pages/new-vacine.html"
})
