<template>
  <body>
    <Navbar/>
    <div id="artic">
      <div class="header mt-5">
        <div class="d-flex justify-content-around">
          <h1 class="fw-bold text-black"> Id_Cena: <span class="badge badge-secondary">{{ conceptoId }}</span></h1>
          <h1 id="estadoCo" class="fw-bold text-black" > Estado:  <span class="badge badge-secondary">{{ estadoConcepto }}</span></h1>
        </div>
      </div>

      <div class="row row-cols-4 g-4">
        <div class="col" v-for="articul in articulos" :key="articul.id_articulo">
          <div class="card mt-5">
            <img :src="articul.imagenURL" class="card-img-top imagen" :alt="articul.nombre">
            <div class="card-footer bg-gray-200 border-top border-gray-300 p-4">
              <h4 class="card-title">{{ articul.nombre }}</h4>
              <p class="card-text"> {{ articul.descripcion }} </p>
              <div class="d-flex justify-content-around align-items-center mt-3">
                <h5 class="card-text">Precio: </h5>
                <span class="h5 mb-0 text-gray">{{ articul.precio }} €</span> 
              </div>
              <div class="d-flex justify-content-between align-content-end flex-wrap mt-4">
                <input type="number" class="input" placeholder="Cantidad"  @focus="resetEstado(articul.id_articulo)" v-model="selectedQuantities[articul.id_articulo]" min="1" />
                <button class="btn btn-primary" @click="addToBasket(articul)">
                  <i class="fa fa-shopping-basket" aria-hidden="true"></i> 
                  Añadir al carrito
                </button>
              </div>
              <div v-if="errors[articul.id_articulo]" class="alert alert-danger shadow-lg p-3 mt-3 rounded" role="alert">
                <i class='fas fa-exclamation-triangle' style='font-size:24px'></i>
                Por favor, introduce una cantidad válida.
              </div>
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
  name: 'vistaArticulos',
  components: { Navbar },
  data() {
    return {
      selectedQuantities: {},
      conceptoId: '',
      usuarioInvitado: '',
      estadoConcepto: '',
      articulos: [],
      conceptos: [],
      errors: {},
    };
  },
  methods: {
    async addToBasket(articul) {
      this.resetEstado;
      const quantity = this.selectedQuantities[articul.id_articulo];
      if (typeof quantity === 'undefined') {
        this.errors[articul.id_articulo] = true;
        return;
      } 
        this.errors[articul.id_articulo] = false;
        console.log('Artículo agregado al carrito con cantidad:', quantity);
       const token = localStorage.getItem('user-token');
      const response = await fetch('http://127.0.0.1:8000/api/carrito/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          cantidad: quantity,
          id_concepto:this.conceptoId,
          id_articulo: articul.id_articulo,
          id_invitado: articul.id_articulo
        })
      });
      const result = await response.json();
      console.log(result);
      if (result.message) {
        alert("articulo agregado")
      } else {
        this.error = true;
        return
      }  
    },
    resetEstado(articuloId) {
      this.errors[articuloId] = false;
    },
    async carregarArticulos() {
        const token = localStorage.getItem('user-token');
        fetch(`http://127.0.0.1:8000/api/articulos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.articulos = data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    async carregarConceptos(id) {

      const token = localStorage.getItem('user-token');
      const decodedToken = VueJwtDecode.decode(token);
      console.log(decodedToken);
      const usuario = decodedToken.id;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/concepto/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();
        console.log(data);

        let conceptos = data;
        let tieneIdConcepto = false;

        if ((conceptos.id_usuario === usuario && conceptos.estado == false) || (conceptos.id_concepto == this.usuarioInvitado && conceptos.estado == false) ) {
          tieneIdConcepto = true;
        }
    
        if (tieneIdConcepto) {
          this.estadoConcepto = "impagado";
          this.carregarArticulos();
        } else {
          const artic = document.getElementById('artic');
          artic.style.display = 'none';
          
          this.$swal({
            title: 'Alerta',
            text: 'No puedes elegir articulos si no estas creado o invitado a una cena',
            icon: 'info',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push({ name: 'vistaCliente' });
          })
        }
      } catch (error) {
        console.error(error);
      }
    },
    async carregarInvitados(id){
      
      const token = localStorage.getItem('user-token');
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/usuariosinvitados/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        console.log(data[0]);
        this.usuarioInvitado = data[0].id_concepto;
        console.log(data[0].id_concepto);
        console.log(this.usuarioInvitado);
      } catch (error) {
        console.error(error);
      }
    }

  },
  mounted() {
    const token = localStorage.getItem('user-token');
    if (token) {
      const idInvitado = localStorage.getItem('usuarioInvitado');
      console.log(idInvitado);
      this.carregarInvitados(idInvitado);
      this.conceptoId = localStorage.getItem('conceptoId');
      this.carregarConceptos(this.conceptoId);
      const decodedToken = VueJwtDecode.decode(token);
      const usuario = decodedToken.id;
      const idUsuarioCena = localStorage.getItem('idUsario');
      if (usuario == idUsuarioCena) {
        const estadoCon = document.getElementById('estadoCo');
        estadoCon.style.display = 'none';
      }else {
        const estadoCon = document.getElementById('estadoCo');
        estadoCon.style.display = 'block';
      }
        
    } else {
      this.$router.push({ name: 'LoginView' });
    }
  },  
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
body {
  display: block;
  background: #c9c9c9;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  color: #1b1b1b;
  font-family: 'Work Sans', sans-serif;
  font-weight: 900;
}
.imagen {
        width: auto;
        height: 210px;
        box-shadow: 0 2px 4px 0 rgb(14, 13, 13), 0 1px 6px 0 rgb(116, 116, 116);
}
.card {
  width: auto;
  height: 95%;
  margin-top: 20px;
  box-shadow: 13px 13px 10px #4d4d4d,
          -13px -13px 10px #5c5c5c;
}
.input {
border: none;
outline: none;
border-radius: 20px;
padding: 1em;
background-color: #ccc;
box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
  width: 31%;
height: 37px;
}
.header {
  position: relative;
  background-clip: border-box;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.75rem;
  background-color: rgb(33 150 243);
  box-shadow: 0 10px 15px -3px rgba(33,150,243,.4),0 4px 6px -4px rgba(33,150,243,.4);
  height: 50px;
}
</style>
