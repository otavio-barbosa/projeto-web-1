import { db, storage } from "../firebase/config.js"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"
import { uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js"

let file;

window.onload = async () => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Entrou')
        } else {
          window.location.href = "/pages/login.html"
          console.log("N existe")
        }
    })
}

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
    const auth = getAuth()
    const userId = auth.currentUser.uid

    const imgRef = ref(storage, "images/" + getVacine() + ".jpg")

    uploadBytes(imgRef, file)
        .then((result) => {
            console.log("Imagem enviada com sucesso!")
            getDownloadURL(imgRef)
                .then((url) => {
                    const doc = {
                        date: getDate(),
                        vacine: getVacine(),
                        dose: getDose(),
                        image: url,
                        nextVacine: getNextVacine()
                    }
                    
                    addDoc(collection(db, `users/${userId}/vacines`), doc)
                        .then((result) => {
                            console.log('Vacinas documentadas com sucesso:' + JSON.stringify(result))
                            window.location.href = "/pages/home.html" 
                        })
                        .cath((error) => {
                            console.log('Erro ao documentar as vacinas: ' + JSON.stringify(error))
                        })
                })
        })
        .catch((error) => {
            console.log("Erro ao tentar enviar imagem!")
        })
}

document.getElementById("btnRegister").addEventListener('click', () => {
    registerVacine()
})
document.getElementById("file").addEventListener("change", function(event) {
    file = event.target.files[0]
    document.getElementById("imgSelected").src = URL.createObjectURL(file)
})
