import { db, storage } from "../firebase/config.js"
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { getDoc, doc, updateDoc, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"
import { uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js"

window.onload = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
      if (user) {
        searchVacines()
      } else {
        window.location.href = "/pages/login.html"
        console.log("N existe")
      }
  })
}

let file;

const getDate = () => {
  return document.getElementById('date').value
}

const getVacine = () => {
  return document.getElementById('vacine').value
}

const getDose = () => {
  return document.querySelector('input[name=dose]:checked').value
}

const getNextVacine = () => {
  return document.getElementById('dateNext').value
}

const searchVacines = () => {
  const auth = getAuth()
  const userId = auth.currentUser.uid
  const idVacine = window.location.href.split("id=")[1]

  const docRef = doc(db, `users/${userId}/vacines`, idVacine)
  getDoc(docRef)
      .then((vacine) => {
        document.getElementById('vacine').setAttribute('value', vacine.data().vacine)
        document.getElementById('date').setAttribute('value', vacine.data().date)
        document.getElementById('dateNext').setAttribute('value', vacine.data().nextVacine)
        document.getElementById('image-select').setAttribute('src', vacine.data().image)

        switch(vacine.data().dose) {
          case '1dose':
            document.getElementById('1-dose').setAttribute('checked', vacine.dose);
            break;
          case '2dose':
            document.getElementById('2-dose').setAttribute('checked', vacine.dose);
            break;
          case '3dose':
            document.getElementById('3-dose').setAttribute('checked', vacine.dose);
            break;
          case 'reforco':
            document.getElementById('reinforcement').setAttribute('checked', vacine.dose);
            break;
          case 'dose-unica':
            document.getElementById('single-dose').setAttribute('checked', vacine.dose);
            break;
        }
      })
      .catch((error) => {
          console.log('Erro ao tentar buscar documento ' + error)
      })
}

const editVacine = () => {
  const imgRef = ref(storage, "images/" + getVacine() + ".jpg")

  uploadBytes(imgRef, file)
  .then((result) => {
    getDownloadURL(imgRef)
    .then((url) => {
          const auth = getAuth()
          const userId = auth.currentUser.uid
          const idVacine = window.location.href.split("id=")[1]
          
          const docRef = doc(db, `users/${userId}/vacines`, idVacine)
          
          const newDoc = {
            date: getDate(),
            vacine: getVacine(),
            dose: getDose(),
            image: url,
            nextVacine: getNextVacine()
          }

          updateDoc(docRef, newDoc)
            .then((result) => {
              console.log("Documento Alterado com Sucesso")
              window.location.href = "/pages/home.html"
            })
            .catch((error) => {
              console.log("Erro ao alterar o documento" + JSON.stringify(error))
            })
        })
    })
    .catch((error) => {
      console.log("Erro ao tentar enviar imagem!" + JSON.stringify(error))
  })
}

const deleteVacine = () => {
  const auth = getAuth()
  const userId = auth.currentUser.uid
  const idVacine = window.location.href.split("id=")[1]

  const docRef = doc(db, `users/${userId}/vacines`, idVacine)
  
  deleteDoc(docRef)
    .then((result) => {
      console.log('Documento excluido com sucesso!')
      window.location.href = "/pages/home.html"
    })
    .catch((error) => {
      console.log('Erro ao excluir o documento')
    })
}

document.getElementById("btnEdit").addEventListener('click', () => {
  editVacine()
})

document.getElementById("btnDelete").addEventListener('click', () => {
  deleteVacine()
})

document.getElementById("file").addEventListener("change", function(event) {
  file = event.target.files[0]
  document.getElementById("image-select").src = URL.createObjectURL(file)
})

