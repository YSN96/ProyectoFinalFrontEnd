<template>
  <body>
    <Navbar />
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
                              <img :src="'http://127.0.0.1:8000/api/images/' + articul.archivo_imagen"
                                class="img-fluid rounded-3" :alt="articul.nombre" style="width: 65px;">
                            </div>
                            <div class="ms-3">
                              <h5>{{ articul.nombre }}</h5>
                              <p> {{ articul.descripcion }} </p>
                            </div>
                          </div>
                          <div class="d-flex flex-row align-items-center">
                            <button class="btn btn-link px-2" @click="restarCantidad(articul)">
                              <i class="fas fa-minus"></i>
                            </button>
                            <div style="width: 50px;">

                              <input id="cantidad" min="1" name="cantidad" v-model="articul.cantidad" type="number"
                                class="form-control form-control-sm" @input="actualizarCantidad(articul)" />

                            </div>
                            <button class="btn btn-link px-2" @click="sumarCantidad(articul)">
                              <i class="fas fa-plus"></i>
                            </button>

                            <div style="width: 80px;">
                              <h5 class="mb-0">{{ articul.precio * articul.cantidad }} €</h5>
                            </div>
                            <button @click.prevent="eleminarPedido(articul.id_carrito)" class="btn btn-danger mx-2" ><i class="fas fa-trash-alt"></i></button>
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
                          <button id="pagoPrueba" @click.prevent="pagoConcepto(this.idConcepto)" type="button" class="btn btn-info btn-block btn-lg">
                            <span>Prueba de Pagar <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                          </button>
                        </div>

                      </div>
                    </div>

                    <div class="card mt-3">
                      <div class="card-body">
                        <h4><strong>Nos Acceptamos</strong></h4>
                        <img class="me-2" width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                          alt="Visa" />
                        <img class="me-2" width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                          alt="Mastercard" />
                        <img class="me-2" width="45px"
                          src="../assets/paypal.jpg"
                          alt="PayPal" />
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
      pedidos: [],
      idConcepto:'',
    };
  },
  methods: {
    async articulosCarrito(id_concepto) {
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
    async articulosUsuario(id_concepto, id_usuario) {
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
    async actualizarCantidad(articul) {
      const token = localStorage.getItem('user-token');
      const data = {
        cantidad: articul.cantidad
      };

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/carrito/${articul.id_carrito}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData); // Puedes mostrar la respuesta en la consola para verificar el éxito de la actualización.
        } else {
          throw new Error('Error al actualizar la cantidad en la base de datos.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    restarCantidad(articul) {
      if (articul.cantidad > 1) {
        articul.cantidad--;
        this.actualizarCantidad(articul);
      }
    },
    sumarCantidad(articul) {
      articul.cantidad++;
      this.actualizarCantidad(articul);
    },
    async eleminarPedido(id){
      const token = localStorage.getItem('user-token');

      const response = await fetch(`http://127.0.0.1:8000/api/carrito/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      const result = await response.json();
      console.log(result);
      if (result.message) {
        this.carregarDatos();
    }

    },
    async pagoConcepto(id_concepto){
      const token = localStorage.getItem('user-token');
      const data = {
        estado: true
      };

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/concepto/${id_concepto}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          if (responseData.message) {
            this.$swal({
            title: '!Muchsimas Gracias!',
            text: 'El pago Realizado Correctamente',
            icon: 'info',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push({ name: 'vistaCliente' });
          })
          }
        } else {
          throw new Error('Error al actualizar el estado en la base de datos.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async carregarConceptos(id) {

      const token = localStorage.getItem('user-token');

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


        if (conceptos.estado == 1) {
          this.$swal({
            title: 'Alerta',
            text: 'No tienes acceso a esta pagina por Id de la cena no es valido',
            icon: 'info',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push({ name: 'vistaCliente' });
          })
        }
        if(data.error){
          this.$router.push({ name: 'vistaCliente' });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async carregarDatos(){
      let token = localStorage.getItem('user-token');
      if (token) {
        const concepto = localStorage.getItem('conceptoId');
        this.idConcepto = concepto;
        
        const idUsuario = localStorage.getItem('usuarioInvitado');
        console.log(concepto);
        console.log(idUsuario);
        if (idUsuario === 'null' || idUsuario === 'undefined' || idUsuario === '') {
          this.carregarConceptos(concepto);
          this.articulosCarrito(concepto);
          const btnPago = document.getElementById('pago');
          btnPago.style.display = 'block';
          const btnPagoPrueba = document.getElementById('pagoPrueba');
          btnPagoPrueba.style.display = 'block';
        } else {
          this.carregarConceptos(concepto);
          this.articulosUsuario(concepto, idUsuario);
          const btnPago = document.getElementById('pago');
          btnPago.style.display = 'none';
          const btnPagoPrueba = document.getElementById('pagoPrueba');
          btnPagoPrueba.style.display = 'none';
        }

      } else {
        this.$router.push({ name: 'LoginView' });
      }
    }

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
    this.carregarDatos();
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
  