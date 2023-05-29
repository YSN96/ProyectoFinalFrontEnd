<template>
    <body>
      <Navbar/>
      <section class="h-100 h-custom" style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card">
          <div class="card-body p-4">

            <div class="row">

              <div class="col-lg">
                <h5 class="mb-3"><router-link to="/articulos" class="text-body"><i
                      class="fas fa-long-arrow-alt-left me-2"></i>Vuelve a elegir más Articulos</router-link></h5>
                <hr>

                <div class="card mb-3" v-for="articul in pedidos" :key="articul.id_carrito">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            :src="'http://127.0.0.1:8000/api/images/'+articul.archivo_imagen"
                            class="img-fluid rounded-3" :alt="articul.nombre" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <h5>{{ articul.nombre }}</h5>
                          <p> {{ articul.descripcion }} </p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 50px;">
                          <h5 class="fw-normal mb-0">{{ articul.cantidad }} </h5>
                        </div>

                        <div class="d-flex mb-4" style="max-width: 300px">
                          <button class="btn btn-primary px-3 me-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                          </button>

                          <div class="form-outline">
                            <label class="form-label" for="cantidad">Cantidad</label>
                            <input id="cantidad" min="1" name="cantidad" type="number" v-model="articul.cantidad" class="form-control" />
                          </div>

                          <button class="btn btn-primary px-3 ms-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>

                        <div style="width: 80px;">
                          <h5 class="mb-0">{{ articul.precio * articul.cantidad }} €</h5>
                        </div>
                        <a href="#!" style="color: #ff0000;"><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card bg-primary text-white rounded-3">
                  <div class="card-body">
  
                    <div class="d-flex justify-content-between mb-4">
                      <h4 class="mb-2">Total</h4>
                      <h4 class="mb-2">{{ total }} €</h4>
                    </div>
  
                    <div class="d-flex justify-content-center">
                      <button id="pago" type="button" class="btn btn-info btn-block btn-lg">
                        <span>Pagar <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </button>
                    </div>
  
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </body>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar'

  export default {
    name: 'vistaCarrito',
    components: { Navbar },
    data() {
      return {
        pedidos:[],
      };
    },
    methods: {
      async articulosCarrito(id_concepto){
        const token = localStorage.getItem('user-token');

        const response = await fetch(`http://127.0.0.1:8000/api/carrito/${id_concepto}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        console.log(result);
        this.pedidos = result;
      },
      async articulosUsuario(id_concepto, id_usuario){
        const token = localStorage.getItem('user-token');

        const response = await fetch(`http://127.0.0.1:8000/api/carrito/${id_concepto}/${id_usuario}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        console.log(result);
        this.pedidos = result;
      },

    },
    computed: {
      total() {
        let total = 0;
        for (let i = 0; i < this.pedidos.length; i++) {
          total += this.pedidos[i].precio * this.pedidos[i].cantidad;
        }
        return total;
      },
    },
    async mounted() {
      let token = localStorage.getItem('user-token');
      if (token) {
        const concepto = localStorage.getItem('conceptoId');
        const idUsuario = localStorage.getItem('usuarioInvitado');
        console.log(concepto);
        console.log(idUsuario);
        if (idUsuario === null || idUsuario === 'undefined' || idUsuario === '') {
          this.articulosCarrito(concepto);
          const btnPago = document.getElementById('pago');
          btnPago.style.display = 'block';
        } else {
          this.articulosUsuario(concepto, idUsuario);
          const btnPago = document.getElementById('pago');
          btnPago.style.display = 'none';
        }
      } else {
        this.$router.push({ name: 'LoginView' });
      }
    },
  }
  </script>
  <style>
  @media (min-width: 1025px) {
.h-custom {
height: 100vh !important;
}
}
  </style>
  