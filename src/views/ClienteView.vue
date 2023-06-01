<template>
  <body>
    <div class="fundoTransp">
      <Navbar />

      <div class="title text-center">
        <h1 class="font-effect-fire-animation display-5">!Bienvendido a COMBOI!</h1>
      </div>
      <div class="main row">
        <div class="mt-5">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li v-for="index in imagenes.length" :key="index" data-target="#carouselExampleIndicators"
                :data-slide-to="(index - 1)" :class="{ active: (index - 1) === indiceImagenActual }"></li>
            </ol>

            <div class="carousel-inner">
              <div v-for="(imagen, index) in imagenes" :key="index" class="carousel-item"
                :class="{ active: index === indiceImagenActual }">
                <img class="imagen" :alt="imagen.titulo" :src="'http://127.0.0.1:8000/api/images/' + imagen.img"
                  style="width: 900px; height: 300px;">

              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"
              @click="retroceder">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
              </svg>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"
              @click="avanzar">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="mt-5">
          <div class="d-flex justify-content-center">
            <form @submit.prevent="crearCena">
              <button class="button1 d-inline-block mx-4" @click.prevent="crearCena">
                <i class="fa fa-pencil-square" aria-hidden="true"></i>
                Crear Cena
              </button>
            </form>
            <button class="button2 d-inline-block mx-4" @click.prevent="showInputAddCena()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
              Añadir Cena
            </button>
          </div>
          <div class="d-flex justify-content-center alertError">
            <div v-if="error && procesando" class="alert alert-warning shadow-lg p-3 mb-5 rounded" role="alert">
              <i class='fas fa-exclamation-triangle' style='font-size:24px'></i>
              Vuelve crear cena!
            </div>
          </div>
        </div>
        <div id="inpIdCena" style="display: none">
          <br><br>
          <div class="d-flex justify-content-center">
            <form @submit.prevent="addCena">
              <input type="number" id="addIdCena" name="addIdCena" autocomplete="off" class="input d-inline-block mx-4"
                placeholder="ID de La Cena" v-model="addIdCena" ref="addIdCena" @focus="resetEstado"
                @keypress="resetEstado" />
              <button class="button3 d-inline-block mx-4" @click.prevent="addCena(addIdCena)">Enviar</button>
            </form>
          </div>
          <div class="alertError">
            <div v-if="error1 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
              <i class='fas fa-exclamation-triangle' style='font-size:24px'></i>
              El ID de la cena no es valido!
            </div>
          </div>
          <div class="alertError">
            <div v-if="error2 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
              <i class='fas fa-exclamation-triangle' style='font-size:24px'></i>
              El ID de la cena no existe!
            </div>
          </div>
        </div>
      </div>

    </div>
  </body>
</template>

<script>
import Navbar from '@/components/Navbar'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'vistaCliente',
  components: { Navbar },
  data() {
    return {
      imagenes: [
        { img: '1.png', titulo: 'bocadillos' },
        { img: "2.jpg", titulo: "burger" },
        { img: '3.jpg', titulo: 'fanta' },
        { img: '4.jpg', titulo: 'coca' },
        { img: '5.jpg', titulo: 'corona' },
        { img: '6.jpg', titulo: 'ice cream' },
        { img: '7.jpg', titulo: 'Mousse' },
        { img: '8.jpg', titulo: 'pizza' },
        { img: '9.jpg', titulo: 'postre' },
        { img: '10.jpg', titulo: 'postre frutas' },
        { img: "11.jpg", titulo: "tacos" },
        { img: '12.jpg', titulo: 'zumo' },
      ],
      procesando: false,
      error: false,
      error1: false,
      error2: false,
      addIdCena: '',
      indiceImagenActual: 0,
      idCena: '',
    };
  },
  created() {
    setInterval(() => {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenes.length;
    }, 5000);
  },
  methods: {
    avanzar() {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenes.length;
    },
    retroceder() {
      this.indiceImagenActual = (this.indiceImagenActual + this.imagenes.length - 1) % this.imagenes.length;
    },
    showInputAddCena() {
      const campCena = document.getElementById('inpIdCena');
      campCena.style.display = 'block';
    },
    genIdCena() {
      var digits = '0123456789';
      let iDCena = '';
      do {
        iDCena = '';
        for (let i = 0; i < 10; i++) {
          iDCena += digits[Math.floor(Math.random() * 10)];
        }
      } while (iDCena.startsWith('0'));
      this.idCena = iDCena;
      console.log(this.idCena);
    },
    async crearCena() {
      this.genIdCena();
      const token = localStorage.getItem('user-token');
      const decodedToken = VueJwtDecode.decode(token);
      console.log(decodedToken);
      const id_usario = decodedToken.id;


      const response = await fetch('http://127.0.0.1:8000/api/concepto/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_concepto: parseInt(this.idCena),
          id_usuario: id_usario,
        })
      });
      const result = await response.json();
      console.log(result);
      if (result.message) {
        localStorage.setItem('idUsario', id_usario);
        localStorage.setItem('conceptoId', this.idCena);
        this.$router.push({ name: 'vistaArticulos' });
      } else {
        this.error = true;
        return
      }
      this.error = false;
    },
    async carregarConceptos(id) {
      const token = localStorage.getItem('user-token');

      const response = await fetch(`http://127.0.0.1:8000/api/concepto/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      //    console.log(result);
      return result.id_usuario;
    },
    async addUsuarioInvitado() {
      const token = localStorage.getItem('user-token');
      const decodedToken = VueJwtDecode.decode(token);
      //    console.log(decodedToken);
      const id_usario = decodedToken.id;
      //    console.log(id_usario);

      const id_user = await this.carregarConceptos(this.addIdCena);
      //console.log({id_en_addUsuarioInvitado: id_user})
      if (id_user !== id_usario) {
        const response = await fetch('http://127.0.0.1:8000/api/usuariosinvitados/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            id_usuario: id_usario,
            id_concepto: this.addIdCena,
          })
        });
        const result = await response.json();
        return result.id;
      } else {
        return null;
      }
    },
    async addCena(id) {
      this.procesando = true;
      this.resetEstado();
      if (this.addIdCena.toString().length < 10) {
        this.error1 = true
        return
      } else if (this.addIdCena.toString().length > 10) {
        this.error1 = true
        return
      }
      this.$refs.addIdCena.focus();

      const token = localStorage.getItem('user-token');

      const response = await fetch(`http://127.0.0.1:8000/api/concepto/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();

      if (result.id_concepto === this.addIdCena && result.estado == false) {
        this.procesando = false;
        this.error1 = false;
        this.error2 = false;
        const id_userInv = await this.addUsuarioInvitado();

        localStorage.setItem('usuarioInvitado', id_userInv);
        localStorage.setItem('conceptoId', this.addIdCena);
        localStorage.setItem('idUsario', result.id_usuario);

        this.$router.push({ name: 'vistaArticulos' });
      } else {
        this.error2 = true
        return
      }
    },
    resetEstado() {
      this.error = false;
      this.error1 = false;
      this.error2 = false;
    },
  },
  mounted() {
    let user = localStorage.getItem('user-token')
    if (!user) {
      this.$router.push({ name: 'LoginView' });
    }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sofia&effect=fire-animation');

* {
  box-sizing: border-box;
}

body {
  display: block;
  background: #141414 url(../assets/5.webp);
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  font-weight: 900;
}

.fundoTransp {
  background-color: rgba(0, 0, 0, .80);
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;

}

h1 {
  font-family: "Sofia", sans-serif;
  text-align: center;
  font-size: 5em;
  font-weight: bold;
  padding-top: 2%;
  padding-bottom: 1.5%;
}

.arCarousel {
  width: 50%;
  margin: 0 auto;
}

.button1 {
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #2c9caf;
}

.button1:hover {
  color: #ffffff;
  transform: scale(1.1);
  outline: 2px solid #70bdca;
  box-shadow: 4px 5px 17px -4px #268391;
}

.button1::before {
  content: "";
  position: absolute;
  left: -50px;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #2c9caf;
  transform: skewX(45deg);
  z-index: -1;
  transition: width 1000ms;
}

.button1:hover::before {
  width: 250%;
}

.button2 {
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #2c9caf;
}

.button2:hover {
  color: #ffffff;
  transform: scale(1.1);
  outline: 2px solid #70bdca;
  box-shadow: 4px 5px 17px -4px #268391;
}

.button2::before {
  content: "";
  position: absolute;
  right: -50px;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #2c9caf;
  transform: skewX(45deg);
  z-index: -1;
  transition: width 1000ms;
}

.button2:hover::before {
  width: 250%;
}

.input {
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 1em;
  background-color: #ccc;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
  transition: 300ms ease-in-out;
}

.input:focus {
  background-color: white;
  transform: scale(1.05);
  box-shadow: 5px 5px 35px #969696,
    -5px -5px 35px #797979;
}

.button3 {
  --hover-shadows: 16px 16px 33px #696969,
    -16px -16px 33px #a0a0a0;
  --accent: fuchsia;
  font-weight: bold;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 1.1em;
  background-color: #949494;
  color: black;
  padding: 1em 2em;
  transition: box-shadow ease-in-out 0.3s,
    background-color ease-in-out 0.1s,
    letter-spacing ease-in-out 0.1s,
    transform ease-in-out 0.1s;
  box-shadow: 13px 13px 10px #1c1c1c,
    -13px -13px 10px #262626;
}

.button3:hover {
  box-shadow: var(--hover-shadows);
}

.button3:active {
  box-shadow: var(--hover-shadows),
    var(--accent) 0px 0px 30px 5px;
  background-color: var(--accent);
  transform: scale(0.95);
}

.alertError {
  padding-left: 17em;
  padding-right: 17em;
  padding-top: 2em;
}

.imagen {
  box-shadow: 15px 20px 50px #a1a1a1,
    -15px -20px 50px #383737;
  transform: scale(1.0);
}</style>
