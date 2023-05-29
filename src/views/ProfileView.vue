<template>
    <Navbar/>
  <body>
    <div class="wrapper">
      <div class="left">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <br><br>
        <h1>{{cliente.nombre}} {{cliente.apellido}}</h1>
      </div>
      <div class="right">
        <div class="info">
          <h3>Informaciones Personales</h3>
          <div class="info_data">
              <div class="data">
                <h4>Edad</h4>
                <p>{{cliente.edad}}</p>
              </div>
              <div class="data">
                <h4>Teléfono móvil</h4>
                <p>{{cliente.mobile}}</p>
              </div>
          </div>
          <div class="info_data">
              <div class="data">
                <h4>Genero</h4>
                <p>{{cliente.genero}}</p>
              </div>
              <div class="data">
                <h4>Domicilio</h4>
                <p>{{cliente.direccion}}</p>
              </div>
          </div>
          <div class="info_data">
              <div class="data">
                <h4>Población</h4>
                <p>{{cliente.poblacion}}</p>
              </div>
              <div class="data">
                <h4>Provincia</h4>
                <p>{{cliente.provincia}}</p>
              </div>
          </div>
          <div class="info_data">
              <div class="data">
                <h4>País</h4>
                <p>{{cliente.pais}}</p>
              </div>
              <div class="data">
                <h4>Código Postal</h4>
                <p>{{cliente.codigopostal}}</p>
              </div>
          </div>
        </div>
        <div class="info_data">
              <div class="data">
                <button class="btn btn-danger mx-2 button" @click.prevent="deleteClient(cliente.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
                  Eliminar
                </button>
              </div>
              <div class="data">
                <router-link :to="'/update/' + cliente.id" class="btn btn-primary button2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                  Actualizar
                </router-link>
              </div>
          </div>
      </div>
    </div>
  </body>
</template>
  
<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'vistaPerfile',
  components: { Navbar },
  data() {
    return {
      cliente: [],
    }
  },
  methods: {
    async deleteClient(id) {
      const token = localStorage.getItem('user-token');

      const response = await fetch(`http://127.0.0.1:8000/api/user/delete/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.status === 200) {
        localStorage.clear();
        this.$router.push({ name: 'LoginView' });
        alert('Tu cuenta esta eliminada correctamente!');
      }
    },
    async carregarDatos() {
      const token = localStorage.getItem('user-token');
      fetch(`http://127.0.0.1:8000/api/user/clientes/${this.$route.params.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.cliente = data;
      })
      .catch(error => {
        console.error(error);
      });
    }
  },
  async mounted() {
    let user = localStorage.getItem('user-token')
        if (user) {
            this.carregarDatos();
        }else{
            this.$router.push({ name: 'LoginView' });
        }
  } 
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: 'Josefin Sans', sans-serif;
}

body{
   
  background-color: #f3f3f3;
}

.wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 600px;
  display: flex;
  box-shadow: 0 1px 30px 0 rgba(69, 90, 100, 0.849);
}

.wrapper .left{
  width: 35%;
  background: linear-gradient(to right,#181818,#868686);
  padding: 30px 25px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
  color: #fff;
}

.wrapper .left svg{
  border-radius: 5px;
  margin-bottom: 10px;
}

.wrapper .left h4{
  margin-bottom: 10px;
}

.wrapper .left p{
  font-size: 16px;
}

.wrapper .right{
  width: 65%;
  background: #fff;
  padding: 30px 25px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.wrapper .right .info
{
  margin-bottom: 25px;
}

.wrapper .right .info h3
{
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #000000;
    color: #353c4e;
  text-transform: uppercase;
  letter-spacing: 5px;
}

.wrapper .right .info_data
{
  display: flex;
  justify-content: space-between;
}

.wrapper .right .info_data .data
{
  width: 45%;
}

.wrapper .right .info_data .data h4
{
    color: #353c4e;
    margin-bottom: 5px;
}

.wrapper .right .info_data .data p
{
  font-size: 16px;
  margin-bottom: 10px;
  color: #5e7185;
}

.button {
  color: #fff;
  padding: 0.25em 1.5em;
}

.button2 {
  background-color: #3370cc;
  color: #fff;
  padding: 0.25em 1.5em;
}

.button2:focus,
.button2:hover {
  background-color: #2840ad;
}


</style>
