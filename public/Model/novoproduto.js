import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, push, ref } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getStorage, ref as refstor, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1JJRwHWN_xuES4nI52FwHBQg6VWetirw",
    authDomain: "rainhaducake.firebaseapp.com",
    databaseURL: "https://rainhaducake-default-rtdb.firebaseio.com",
    projectId: "rainhaducake",
    storageBucket: "rainhaducake.appspot.com",
    messagingSenderId: "53422776328",
    appId: "1:53422776328:web:d120a127ed3aca5b4a31bd",
    measurementId: "G-FWXWXQLMCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getDatabase(app)
const storage = getStorage(app);

document.querySelector('#upload-button').addEventListener('click', () => {
    const i = document.querySelector("#file-input").files[0].name
    const n = document.querySelector('#nome').value
    const v = document.querySelector('#valor').value
    const d = document.querySelector('#descricao').value

    const file = document.querySelector("#file-input").files[0]
    const storageRef = refstor(storage, `imagens/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {

        console.log('Imagem enviada com sucesso!')

        getDownloadURL(storageRef).then((url) => {

            // Registra um novo produto.
            push(ref(db, 'catalogo/'), {
                produto: n,
                valor: v,
                imagem: i,
                descricao: d,
                url_img: url
            })
                .then(() => {

                    console.log('Registrado com sucesso!');
                    window.location.href = '../View/novoproduto.html';
                })
                .catch(() => {
                    // Ocorreu um erro.
                    console.log('Erro ao registrar');
                })
        })
    })

})


