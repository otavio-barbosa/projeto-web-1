import { db } from "../firebase/config.js"
import { doc, updateDoc, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"
import { getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

// document.addEventListener("DOMContentLoaded", function() {
//     const { search: paramsText } = window.location
//     const params = paramsText
//       .replace('?', '')
//       .split('&')
//       .map((param) => {
//         const [key, value] = param.split('=')
//         return { key, value }
//       })
//     const { value: vacineIdWithInc } = params.find((param) => param.key === 'id')
//     const vacineId = vacineIdWithInc - 1
//     fetch('../js/vacine.json')
//       .then((response) => response.json())
//       .then((data) => {
//         const { vacines } = data
//         if (vacines.length < vacineId && vacineId < 1) {
//           return
//         }
//         const vacine = vacines[vacineId]
//         document.getElementById('vacine').setAttribute('value', vacine.name)
//         document.getElementById('date').setAttribute('value', vacine.date)
//         document.getElementById('dateNext').setAttribute('value', vacine.dateNext)
//         document.getElementById('image-select').setAttribute('src', vacine.image)

//         switch(vacine.dose) {
//           case '1a. dose':
//             document.getElementById('1-dose').setAttribute('checked', vacine.dose);
//             break;
//           case '2a. dose':
//             document.getElementById('2-dose').setAttribute('checked', vacine.dose);
//             break;
//           case '3a. dose':
//             document.getElementById('3-dose').setAttribute('checked', vacine.dose);
//             break;
//           case 'reinforcement':
//             document.getElementById('Reforço').setAttribute('checked', vacine.dose);
//             break;
//           case 'Dose única':
//             document.getElementById('single-dose').setAttribute('checked', vacine.dose);
//             break;
//         }
//       })
//   })

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


window.onload = async () => {
  console.log('entrou no onload')
  searchVacines()
}

const searchVacines = () => {
  const userId = "VMZ8XmKXUsE4WQ2cAAYk"
  const idVacine = "n1G9Vwi2EWxiEeWupxH6"

  const docRef = doc(db, `users/${userId}/vacines`, idVacine)
  getDoc(docRef)
      .then((vacine) => {
        console.log(vacine.data().dose)
        console.log('aq vacine' + vacine.data())
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
            document.getElementById('Reforço').setAttribute('checked', vacine.dose);
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
  const idUser = "VMZ8XmKXUsE4WQ2cAAYk"
  const idVacine = "Z1GTsQ7hTgtHyR8BpCTl"


  const docRef = doc(db, `users/${idUser}/vacines`, idVacine)
  const newDoc = {
    date: getDate(),
    vacine: getVacine(),
    dose: getDose(),
    nextVacine: getNextVacine()
  }

  updateDoc(docRef, newDoc)
    .then((result) => {
      console.log("Documento Alterado com Sucesso")
    })
    .catch((error) => {
      console.log("Erro ao alterar o documento")
    })
}

const deleteVacine = () => {
  const idUser = "VMZ8XmKXUsE4WQ2cAAYk"
  const idVacine = "kFEQGqAt6hOiGJtMSB2t"

  const docRef = doc(db, `users/${idUser}/vacines`, idVacine)
  
  deleteDoc(docRef)
    .then((result) => {
      console.log('Documento excluido com sucesso!')
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

