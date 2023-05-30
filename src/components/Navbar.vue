<template>
  <nav>
    
      <div id="logo-cli" class="logo" style="display: none">
        <router-link to="/cliente" class="navbar-brand font-effect-3d">
          <img class="logoImg" src="../assets/logo.png" alt="COMBOI">
        </router-link>
      </div>
      <div id="cliente-link" class="container" style="display: none">
        <router-link to="/cliente">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link :to="'/perfil/' + clienteActual">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </router-link>
        <a @click.prevent="cerrarSesion" href="">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </a>
      </div>

      <div id="logo-admin" class="logo" style="display: none">
      <router-link to="/admin" class="navbar-brand font-effect-3d">
        <img class="logoImg" src="../assets/logo.png" alt="COMBOI">
      </router-link>
    </div>
      <div id="admin-link" class="container" style="display: none">
          <router-link to="/admin">Home</router-link>
          <router-link :to="'/perfil/' + clienteActual">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </router-link>
          <a @click.prevent="cerrarSesion" href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </a>
      </div>
  </nav>

</template>
  
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'navBar',
  data() {
        return {
            clienteActual: null,
        }
    },
  methods: {
    async carregarDatos() {
            const token = localStorage.getItem('user-token');
            const decodedToken = VueJwtDecode.decode(token);
            //console.log(decodedToken);
            const usuario = decodedToken.id;
            this.clienteActual =usuario;

            const role = decodedToken.role;
            // si tiene role como admin se va a a la pagina de administrador si no se va al pagina de clientes
            if (role==="ROLE_ADMIN" ) {
              const logoAdmin = document.getElementById('logo-admin');
              logoAdmin.style.display = 'block';
              const adminLink = document.getElementById('admin-link');
              adminLink.style.display = 'block';
            } else {
              const logoCli = document.getElementById('logo-cli');
              logoCli.style.display = 'block';
              const clienteLink = document.getElementById('cliente-link');
              clienteLink.style.display = 'block';
            }
    },
    cerrarSesion() {
      localStorage.clear();
      this.$router.push({ name: 'LoginView' });
    },
  },
  async mounted() {
        let user = localStorage.getItem('user-token')
        if (user) {
            this.carregarDatos();
        }else{
            this.$router.push({ name: 'LoginView' });
        }
        
    },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sofia&effect=3d');
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: sans-serif;
  background:#000;
  text-align: center;

}
.container {
  overflow: hidden;
  background-color: black;
  text-align:center;
}
.container a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
  text-transform: uppercase;
}
.container a::before {
  content:'';
  width:0%;
  height:3px;
  display:block;
  background-color: #fff;
  margin-bottom:10px;
}
.container a:hover::before {
  width:100%;
  transition:all .5s;
}

nav {
  display: flex;
  padding:7px;
  text-align: center;
  align-items:center;
  margin: 0;
  font-family: sans-serif;
  background:#000;

}

nav .logo {
  width: 250px;
  font-size: 33px;
  padding: 7px;
  font-weight: bold;
  color:#fff
}

.logoImg {
  object-fit: cover;
  width:100%;
  height:100%;
}

</style>
  