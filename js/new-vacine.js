import { db, storage } from "../firebase/config.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"
import { uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js"

let file;

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
