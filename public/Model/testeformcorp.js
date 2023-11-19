
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, update, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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
const dbRef = ref(db, 'carrinho')

onValue(dbRef, (snapshot) => {
    const n = snapshot.size - 1
    const lista = []
    snapshot.forEach((pedidos) => {
        const codigo = pedidos.key
        lista.push(codigo)
    })

    const c = (lista[n])



    // Menu carrinho.
    document.querySelector('#comprar').addEventListener('click', () => {


        get(child(dbRef, `/${c}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const p = snapshot.val().pedido
                const t = snapshot.val().total
                const n = document.querySelector('#nome').value
                const e = document.querySelector('#endereço').value
                const cep = document.querySelector('#CEP').value
                const de = document.querySelector('#data_entrega').value

                update(ref(db, `carrinho/${c}`), {
                    pedido: p,
                    total: t,
                    nome: n,
                    endereco: e,
                    cep: cep,
                    data_entrega: de

                })
                    .then(() => {
                        // Registra a encomenda.
                        window.location.href = '../View/checlfinal.html';
                    })
                    .catch(() => {
                        // Ocorreu um erro ao tentar registra.
                        alert('Erro ao registrar');
                    });

            } else {
                console.log("");
            }
        }).catch((error) => {
            console.error(error);
        })

    }, {

    })

    document.querySelector('#pagamento_qrcode').addEventListener('click', () => {


        get(child(dbRef, `/${c}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const p = snapshot.val().pedido
                const t = snapshot.val().total
                const n = document.querySelector('#nome').value
                const e = document.querySelector('#endereço').value
                const cep = document.querySelector('#CEP').value
                const de = document.querySelector('#data_entrega').value

                update(ref(db, `carrinho/${c}`), {
                    pedido: p,
                    total: t,
                    nome: n,
                    endereco: e,
                    cep: cep,
                    data_entrega: de

                })
                    .then(() => {
                        // Registra a encomenda.
                        window.location.href = '../View/qrcode.html';
                    })
                    .catch(() => {
                        // Ocorreu um erro ao tentar registra.
                        alert('Erro ao registrar');
                    });

            } else {
                console.log("");
            }
        }).catch((error) => {
            console.error(error);
        })

    }, {

    })


});








