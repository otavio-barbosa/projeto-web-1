import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"

console.log("teste")

const authLogout = () => {
    const auth = getAuth();
    console.log("teste 2")

    signOut(auth)
        .then(() => {
            console.log("Deslogado com sucesso!")
        })
        .catch((error) => {
            console.log("Erro ao deslogar!")
        });
}

document.getElementById("logout").addEventListener('click', function () {
    console.log('clicouu')
    authLogout()
})