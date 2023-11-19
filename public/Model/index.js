import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);


// Adiciona um manipulador de evento ao botão de login.
document.querySelector('#btn-encomenda').addEventListener('click', () => {
    // Obtem a encomenda.
    const nome = document.querySelector('#nome').value;
    const contato = document.querySelector('#contato').value;
    const assunto = document.querySelector('#assunto').value;
    const mensagem = document.querySelector('#mensagem').value;

    // Tenta logar o usuário.
    push(ref(db, 'encomendas/'), {
        nome: nome,
        contato: contato,
        assunto: assunto,
        mensagem: mensagem
    })
        .then(() => {
            // Encomenda registra.
            console.log('Registrado com sucesso!');
            window.location.href = 'index.html';
        })
        .catch(() => {
            // Ocorreu um erro ao tentar logar o usuário.
            console.log('Erro ao registrar');
        });
});
