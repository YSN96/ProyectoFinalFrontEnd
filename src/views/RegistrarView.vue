<template>
  <body class="align">
    <div class="login">
      <header class="login__header">
        
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          Register
        </h1>
      </header>

      <form class="login__form" @submit.prevent="registrar">
        <div>
              <label for="user">Usario:</label>
              <input type="text" id="user" name="user" class="form-control" placeholder="Username" v-model="user" ref="user"
              :class="{ 'is-invalid': procesando && userInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                El usuario no es valido!
              </div> 
              <div v-if="error1_1 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                El usuario ya existe
              </div>   
        </div>
        <div>
              <label for="password">Contraseña</label>
              <input type="password" id="password" name="password" class="form-control" placeholder="Password" v-model="password"
              :class="{ 'is-invalid': procesando && passwordInvalido }" @focus="resetEstado" @keypress="resetEstado"/>
              <br>
              <div v-if="error2 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                Su contraseña debe tener al menos 6 caracteres!
              </div>
        </div>
        <div>
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Nombre" v-model="nombre"
              :class="{ 'is-invalid': procesando && nombreInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error3 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                El Nombre no es valido!
              </div>    
        </div>
        <div>
              <label for="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" class="form-control" placeholder="Apellido" v-model="apellido"
              :class="{ 'is-invalid': procesando && apellidoInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error4 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                El Apellido no es valido!
              </div>    
        </div>
        <div>
              <label for="edad">Edad:</label>
              <input type="number" id="edad" name="edad" class="form-control" placeholder="Edad" v-model="edad"
               @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error5 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                Aviso: no se permiten registros a menores de edad!
              </div>   
        </div>
        <div class="form-check">
              <label style="padding-right: 100%;">Genero:</label>
              <div class="form-check">
                <input type="radio" id="hombre" name="genero" value="hombre" v-model="genero" class="form-check-input" @focus="resetEstado" @keypress="resetEstado" />
                <label for="hombre" class="form-check-label" style="padding-right: 75%;">Hombre</label>
              </div>
              <div class="form-check">
                <input type="radio" id="mujer" name="genero" value="mujer" v-model="genero" class="form-check-input" @focus="resetEstado" @keypress="resetEstado" />
                <label for="mujer" class="form-check-label" style="padding-right: 75%;">Mujer</label>
              </div>
              <br>
              <div v-if="error6 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                Ninguna respuesta seleccionada!
              </div>
        </div>
        <div>
              <label for="dir">Domicilio:</label>
              <input type="text" id="dir" name="dir" class="form-control" placeholder="Domicilio" v-model="dir"
              :class="{ 'is-invalid': procesando && dirInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error7 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                El Domicilio no es valido!
              </div>    
        </div>
        <div>
              <label for="poblacion">Población:</label>
              <input type="text" id="poblacion" name="poblacion" class="form-control" placeholder="Población" v-model="poblacion"
              :class="{ 'is-invalid': procesando && poblacionInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error8 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                La Población no es valida!
              </div>    
        </div>
        <div>
              <label for="provincia">Provincia:</label>
              <input type="text" id="provincia" name="provincia" class="form-control" placeholder="Provincia" v-model="provincia"
              :class="{ 'is-invalid': procesando && provinciaInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error9 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                La Provincia no es valida!
              </div>    
        </div>
        <div>
              <label for="pais">País:</label>
              <input type="text" id="pais" name="pais" class="form-control" placeholder="País" v-model="pais"
              :class="{ 'is-invalid': procesando && paisInvalido }" @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error10 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                País no es valido!
              </div>    
        </div>
        <div>
              <label for="codigoPostal">Código Postal:</label>
              <input type="number" id="codigoPostal" name="codigoPostal" class="form-control" placeholder="Código Postal" v-model="codigoPostal"
              @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error11 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                EL Código Postal no debe tener menos de 5 numeros!
              </div>
              <div v-if="error12 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                EL Código Postal no debe tener más de 5 numeros!
              </div>      
        </div>
        <div>
              <label for="mobile">Teléfono móvil:</label>
              <input type="number" id="mobile" name="mobile" class="form-control" placeholder="Teléfono móvil" v-model="mobile"
               @focus="resetEstado" @keypress="resetEstado" />
              <br>
              <div v-if="error13 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                EL Teléfono móvil no debe tener menos de 9 numeros!
              </div>
              <div v-if="error14 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
                EL Teléfono móvil no debe tener más de 9 numeros!!
              </div>     
        </div>
        <div>
          <button @click.prevent="registrar" class="shadow__btn">Register</button>
          <br><br>
          <div class="social-icons">
            <h5>Ya tienes una cuenta? <router-link to="/" class="social-login__icon">Logiarse</router-link></h5> 
          </div>
        </div>
      </form>
      <br>
      <div v-if="error16 && procesando" class="alert alert-danger shadow-lg p-3 rounded" role="alert">
          Ocurrió un error
      </div>
      <div v-if="correcto" class="alert alert-success shadow-lg p-3 rounded" role="alert">
        Has sido registrado correctamente!
      </div>
    </div>
  </body>
</template>
  
  <script>
  export default {
    name: 'RegistrarView',
    data() {
      return {
        procesando: false,
        correcto: false,
        error: false,
        error1_1: false,
        error2: false,
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
        user: '',
        password: '',
        nombre:'',
        apellido:'',
        edad:'',
        genero: null,
        dir:'',
        poblacion:'',
        provincia:'',
        pais:'',
        codigoPostal:'',
        mobile:'',
      }
    },
    methods: {
      async registrar() {
        this.procesando = true
        this.resetEstado()
        if (this.userInvalido) {
          this.error = true
          return
        }
        if (this.passwordInvalido) {
          this.error2 = true
          return
        }
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
        if (this.codigoPostal.toString().length < 5) {
          this.error11 = true
          return
        }else if (this.codigoPostal.toString().length > 5) {
          this.error12 = true
          return
        }
        if (this.mobile.toString().length < 9) {
          this.error13 = true
          return
        } else if (this.mobile.toString().length > 9) {
          this.error14 = true
          return
        }
        this.$refs.user.focus()

        const response = await fetch('http://127.0.0.1:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.user,
                password: this.password,
                nombre: this.nombre,
                apellido: this.apellido,
                edad:this.edad,
                direccion: this.dir,
                poblacion:this.poblacion,
                provincia:this.provincia,
                pais:this.pais,
                codigopostal:this.codigoPostal,
                genero: this.genero,
                mobile: this.mobile
            })
        });
        const result = await response.json();
        console.log(result);
        if (response.status) {
            if (result.message && result.message.includes("Usuario registrado correctamente")) {
                this.procesando= false;
                this.correcto= true;
                this.$router.push({ name: 'LoginView' })
            } else if (result.message && result.message.includes("already exists")) {
                this.error1_1 = true
                return
            } else {
                this.error16 = true
                return
            }
        }

      },
      resetEstado() {
        this.correcto = false;
        this.error = false;
        this.error1_1 = false;
        this.error2 = false;
        this.error3 = false;
        this.error4 = false;
        this.error5 = false;
        this.error6 = false;
        this.error7 = false;
        this.error8 = false;
        this.error9 = false;
        this.error10 = false;
        this.error11 = false;
        this.error12 = false;
        this.error13 = false;
        this.error14 = false;
        this.error16 = false;
      },
    },
    computed: {
      userInvalido() {
        return this.user.length < 1
      },
      passwordInvalido() {
        return this.password.length < 6
      },
      nombreInvalido() {
        return this.nombre.length < 1
      },
      apellidoInvalido() {
        return this.apellido.length < 1
      },
      dirInvalido(){
        return this.dir.length < 1
      },
      poblacionInvalido(){
        return this.poblacion.length < 1
      },
      provinciaInvalido(){
        return this.provincia.length < 1
      },
      paisInvalido(){
        return this.pais.length < 1
      }
    },
  }
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
	background: linear-gradient(90deg, #121213, #a4a4a7);		
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

.shadow__btn {
  padding: 10px 20px;
  border: none;
  font-size: 17px;
  color: #fff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  transition-property: box-shadow;
}

.shadow__btn {
  background: #b3a6a6;
  box-shadow: 0 0 25px #b6b6b6;
}

.shadow__btn:hover {
  box-shadow: 0 0 5px #c9c9c9,
              0 0 25px #c9c9c9,
              0 0 50px #c9c9c9,
              0 0 100px #c9c9c9;
}
.login {
  width: 400px;
}

.login__header {
  background: linear-gradient(90deg, #a4a4a7, #121213 );
  border-top-left-radius: 1.25em;
  border-top-right-radius: 1.25em;
  box-shadow: 0px 0px 24px #f3f3f3;
  color: #ffffff;
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
  background: linear-gradient(90deg, #121213, #7d7d80 );
  border-bottom-left-radius: 1.25em;
  border-bottom-right-radius: 1.25em;
  box-shadow: 0px 0px 24px #868686;
  color: #ffffff;
  display: grid;
  gap: 0.875em;
  padding: 1.25em 1.625em;
}

.login input {
  border-radius: 0.1875em;
}

.login input[type='text'],
.login input[type='password'],
.login input[type='number'] {
  background-color: #ffffff;
  color: #000000;
  padding: 0.25em 0.625em;
  width: 100%;
}

.login input[type='submit'] {
  display: block;
  margin: 0 auto;
}
.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #111991;
	text-decoration: none;
	text-shadow: 0px 0px 8px #000000;
}

.social-login__icon:hover {
	transform: scale(1.5);
}
</style>
  
  