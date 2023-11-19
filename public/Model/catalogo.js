import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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

const dbRef = ref(db, 'catalogo');


const lista = document.querySelector('#catalogo')


onValue(dbRef, (snapshot) => {
  lista.innerHTML = ''


  snapshot.forEach((catalogo) => {

    const dados = catalogo.val();

    const card = `  
        <div class="card">       
          <img src="${dados.url_img}" class="card-img-top">
          <div class="">
            <p>${dados.produto}</p>
            <div class="card-body">
              <h5 class="card-title">Preço R$${dados.valor} a unidade</h5>
              <p class="card-text"></p>
            </div>
            <div class="card-footer">
              <form class="d-block">
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter" name="${catalogo.key}">
                  REMOVER
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="divue">
                  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-body">
                        Tem certeza que <br> deseja remover esse <br> item?
                        <br>
                        <button type="button" class="bt" class="btn btn-dark" data-dismiss="modal">NÃO</button>
                        <button type="button" class="bt" class="btn btn-dark" id="sim">SIM</button>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="../View/editarproduto.html" class="btn btn-warning" id="btn-editar" name="${catalogo.key}">EDITAR</a>
              </form>
              <br>
            </div>
          </div>
        </div>
   `


    const div = document.createElement('div')
    div.setAttribute('class', 'col-lg-4')
    div.innerHTML = card
    lista.appendChild(div)

  })

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      var rash = event.target.name

      document.querySelector('#sim').addEventListener('click', () => {
        console.log(rash);

        const refcat = ref(db, `catalogo/${rash}`);
        remove(refcat).then(() => {

          console.log('Excluido com sucesso!');
          window.location.href = '../View/catalogo.html';
        })
          .catch(() => {
            // Ocorreu um erro.
            console.log('Erro ao excluir');
          })

      })

    })


  }, {})

  const a = document.querySelectorAll("#btn-editar");

  a.forEach((as) => {
    as.addEventListener("click", (event) => {
      var rash = event.target.name
 
      set(ref(db, `editar/${rash}`), {
        rash: rash

      })
    })


  }, {})


})

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})



