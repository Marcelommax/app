// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
const auth = getAuth(app);


// Adiciona um manipulador de evento ao botão de login.
document.querySelector('#botao').addEventListener('click', () => {
    // Obtem o e-mail e a senha do usuário.
    const email = document.querySelector('#Usuario').value;
    const password = document.querySelector('#Senha').value;

    // Tenta logar o usuário.
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // O usuário foi logado com sucesso.
            console.log('Logado com sucesso!');
            window.location.href = '../View/pedidos.html';
        })
        .catch((error) => {
            // Ocorreu um erro ao tentar logar o usuário.
            console.log('Erro ao logar');
        });
});