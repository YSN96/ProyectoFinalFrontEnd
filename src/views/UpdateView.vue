<template>
    <Navbar/>
    <body class="align">
      <div class="login">
        <header class="login__header">
          
          <h1>
            <i class="bi bi-pencil-fill"></i> 
            Editar Informaciones
          </h1>
        </header>
  
        <form class="login__form" @submit.prevent="infoEdit">
          <div>
            <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Nombre" v-model="cliente.nombre" ref="nombre" 
              :class="{ 'is-invalid': procesando && nombreInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error3 && procesando" class="alert alert-danger" role="alert">
                El Nombre no es valido!
              </div>  
          </div>
          <div>
            <label for="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" class="form-control" placeholder="Apellido" v-model="cliente.apellido"
              :class="{ 'is-invalid': procesando && apellidoInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error4 && procesando" class="alert alert-danger" role="alert">
                El Apellido no es valido!
              </div> 
          </div>
          <div>
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" class="form-control" placeholder="Edad" v-model="cliente.edad"
              @focus="resetEstado" @keypress="resetEstado" />
            <br>
            <div v-if="error5 && procesando" class="alert alert-danger" role="alert">
              Aviso: no se permiten registros a menores de edad!
            </div>   
          </div>
          <div class="form-check">
              <label style="padding-right: 100%;">Genero:</label>
              <div class="form-check">
                <input type="radio" id="hombre" name="genero" value="hombre" v-model="cliente.genero" class="form-check-input" @focus="resetEstado" @keypress="resetEstado"/>
                <label for="hombre" class="form-check-label" style="padding-right: 75%;">Hombre</label>
              </div>
              <div class="form-check">
                <input type="radio" id="mujer" name="genero" value="mujer" v-model="cliente.genero" class="form-check-input" @focus="resetEstado" @keypress="resetEstado"/>
                <label for="mujer" class="form-check-label" style="padding-right: 75%;">Mujer</label>
              </div>
              <br>
              <div v-if="error6 && procesando" class="alert alert-danger" role="alert">
                Ninguna respuesta seleccionada!
              </div>
          </div>
          <div>
            <label for="dir">Domicilio:</label>
              <input type="text" id="dir" name="dir" class="form-control" placeholder="Domicilio" v-model="cliente.direccion"
              :class="{ 'is-invalid': procesando && dirInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error7 && procesando" class="alert alert-danger" role="alert">
                El Domicilio no es valido!
              </div>  
          </div>
          <div>
            <label for="poblacion">Población:</label>
              <input type="text" id="poblacion" name="poblacion" class="form-control" placeholder="Población" v-model="cliente.poblacion"
              :class="{ 'is-invalid': procesando && poblacionInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error8 && procesando" class="alert alert-danger" role="alert">
                La Población no es valida!
              </div> 
          </div>
          <div>
            <label for="provincia">Provincia:</label>
              <input type="text" id="provincia" name="provincia" class="form-control" placeholder="Provincia" v-model="cliente.provincia"
              :class="{ 'is-invalid': procesando && provinciaInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error9 && procesando" class="alert alert-danger" role="alert">
                La Provincia no es valida!
              </div>   
          </div>
          <div>
            <label for="codigoPostal">Código Postal:</label>
              <input type="number" id="codigoPostal" name="codigoPostal" class="form-control" placeholder="Código Postal" v-model="cliente.codigopostal"
              @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error11 && procesando" class="alert alert-danger" role="alert">
                EL Código Postal no debe tener menos de 5 numeros!
              </div>
              <div v-if="error12 && procesando" class="alert alert-danger" role="alert">
                EL Código Postal no debe tener más de 5 numeros!
              </div>      
          </div>
          <div>
              <label for="mobile">Teléfono móvil:</label>
              <input type="number" id="mobile" name="mobile" class="form-control" placeholder="Teléfono móvil" v-model="cliente.mobile"
               @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error13 && procesando" class="alert alert-danger" role="alert">
                EL Teléfono móvil no debe tener menos de 9 numeros!
              </div>
              <div v-if="error14 && procesando" class="alert alert-danger" role="alert">
                EL Teléfono móvil no debe tener más de 9 numeros!!
              </div>     
        </div>
            <div>
                <br>
                <router-link :to="'/perfil/'+cliente.id" class="btn btn-success mx-2 button"><i class="bi bi-backspace"></i> Volver</router-link>
                <button type="submit" class="btn btn-primary button2" @click.prevent="infoEdit"><i class="bi bi-pencil-fill"></i> Guardar</button>
            </div>
        </form>
        <br>
        <div v-if="error16 && procesando" class="alert alert-danger" role="alert">
            Ocurrió un error
        </div>
        <div v-if="correcto" class="alert alert-success" role="alert">
          Has sido registrado correctamente!
        </div>
      </div>
  
    </body>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar'
  export default {
    name:'vistaUpdate',
    components: { Navbar },
    data() {
      return {
        procesando: false,
        correcto: false,
        error3: false,
        error4: false,
        error5: false,
        error6: false,
        error7: false,
        error8: false,
        error9: false,
        error10: false,
        error11: false,
        error12: false,
        error13: false,
        error14: false,
        error16: false,
        cliente: {
          nombre:'',
          apellido:'',
          edad:'',
          genero: null,
          direccion:'',
          poblacion:'',
          provincia:'',
          pais:'',
          codigopostal:'',
          mobile:'',
        },
      };
    },
    methods: {
        async infoEdit() {
            this.procesando = true;
            this.resetEstado();
            if (this.nombreInvalido) {
              this.error3 = true
              return
            }
            if (this.apellidoInvalido) {
              this.error4 = true
              return
            }
            if (this.edad < 18) {
              this.error5 = true
              return
            }
            if (this.genero === null) {
              this.error6 = true
              return
            }
            if (this.dirInvalido) {
              this.error7 = true
              return
            }
            if (this.poblacionInvalido) {
              this.error8 = true
              return
            }
            if (this.poblacionInvalido) {
              this.error9 = true
              return
            }
            if (this.paisInvalido) {
              this.error10 = true
              return
            }
            if (this.cliente.codigopostal.toString().length < 5) {
              this.error11 = true
              return
            }else if (this.cliente.codigopostal.toString().length > 5) {
              this.error12 = true
              return
            }
            if (this.cliente.mobile.toString().length < 9) {
              this.error13 = true
              return
            } else if (this.cliente.mobile.toString().length > 9) {
              this.error14 = true
              return
            }
            this.$refs.nombre.focus()

            const token = localStorage.getItem('user-token');
            fetch(`http://127.0.0.1:8000/api/user/update/${this.$route.params.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                nombre: this.cliente.nombre,
                apellido: this.cliente.apellido,
                edad:this.cliente.edad,
                direccion: this.cliente.direccion,
                poblacion:this.cliente.poblacion,
                provincia:this.cliente.provincia,
                pais:this.cliente.pais,
                codigopostal:this.cliente.codigopostal,
                genero: this.cliente.genero,
                mobile: this.cliente.mobile
              })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.procesando= false;
                this.correcto= true;
                this.$router.push({ name: 'vistaPerfile' });
            })
            .catch(error => {
                console.error(error);
            });

  
        },
        resetEstado(){
          this.correcto = false
          this.error3 = false
          this.error4 = false
          this.error5 = false
          this.error6 = false
          this.error7 = false
          this.error8 = false
          this.error9 = false
          this.error10 = false
          this.error11 = false
          this.error12 = false
          this.error13 = false
          this.error14 = false
          this.error16 = false
        }
    },
    computed: {
        nombreInvalido() {
          return this.cliente.nombre.length < 1
        },
        apellidoInvalido() {
          return this.cliente.apellido.length < 1
        },
        dirInvalido(){
          return this.cliente.direccion.length < 1
        },
        poblacionInvalido(){
          return this.cliente.poblacion.length < 1
        },
        provinciaInvalido(){
          return this.cliente.provincia.length < 1
        },
        paisInvalido(){
          return this.cliente.pais.length < 1
        }
    },
    async mounted() {
      const token = localStorage.getItem('user-token');
          if (token) {
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
          }else{
              this.$router.push({ name: 'LoginView' });
          }
    }
  };
  </script>
  <style scoped>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"); 
  * {
    box-sizing: inherit;
  }
  
  html {
    box-sizing: border-box;
  }
  
  body {
    background-color: #ffffff;
    font-family: 'Varela Round', sans-serif;
    line-height: 1.5;
    margin: 0;
    min-block-size: 100vh;
    padding: 5vmin;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  input {
    background-image: none;
    border: none;
    font: inherit;
    margin: 0;
    padding: 0;
    transition: all 0.3s;
  }
  
  svg {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
  
  .align {
    display: grid;
    place-items: center;
  }
  
  .button {
    background-color: #33cc77;
    color: #fff;
    padding: 0.25em 1.5em;
  }
  
  .button:focus,
  .button:hover {
    background-color: #19aa5a;
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
  
  .icons {
    display: none;
  }
  
  .icon {
    fill: currentcolor;
    display: inline-block;
    height: 1em;
    width: 1em;
  }
  
  .login {
    width: 400px;
  }
  
  .login__header {
    background-color: #3836b9;
    border-top-left-radius: 1.25em;
    border-top-right-radius: 1.25em;
    color: #fff;
    padding: 1.25em 1.625em;
  }
  
  .login__header :first-child {
    margin-top: 0;
  }
  
  .login__header :last-child {
    margin-bottom: 0;
  }
  
  .login h1 .icon {
    margin-right: 14px;
  }
  
  .login__form {
    background-color: #5c5c5e;
    border-bottom-left-radius: 1.25em;
    border-bottom-right-radius: 1.25em;
    color: #cec5c5;
    display: grid;
    gap: 0.875em;
    padding: 1.25em 1.625em;
  }
  
  .login input {
    border-radius: 0.1875em;
  }
  
  .login input[type='text'],
  .login input[type='password'] {
    background-color: #ffffff;
    color: #000000;
    padding: 0.25em 0.625em;
    width: 100%;
  }
  
  .login input[type='submit'] {
    display: block;
    margin: 0 auto;
  }
  
  </style>
  