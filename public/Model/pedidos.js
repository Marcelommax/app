import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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

const dbRef = ref(db, 'encomendas');

const lista = document.querySelector('.lista_pedidos')


onValue(dbRef, (snapshot) => {
    lista.innerHTML = ''

    let codigo = 156
    snapshot.forEach((pedidos) => {
        codigo++
        const dados = pedidos.val();
        console.log(codigo)
        console.log(dados.nome)
        console.log(dados.mensagem)


        const card = `  <td>#00${codigo}</td>
                        <td>${dados.mensagem}</td>
                        <td>${dados.nome}</td>
                        <td>
                        <div class="row">
                        <div class="col-md-5"><label><input id="Check1" name="Check1" type="checkbox" value="Check1">Pronto</input></label></div>
                        <div class="col-md-5"><label><input id="Check2" name="Check2" type="checkbox" value="Check2">Enviado</input></label></div>
                        </div>
                        </td>`


        const tr = document.createElement('tr')
        tr.innerHTML = card
        lista.appendChild(tr)

    });
}, {

});