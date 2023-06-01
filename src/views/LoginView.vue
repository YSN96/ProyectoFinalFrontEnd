<template>
	<header class="login__header">
		<h1>
			<svg xmlns="http://www.w3.org/2000/svg" width="60" height="66" fill="currentColor" class="bi bi-person-lock" viewBox="0 0 20 16">
				<path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z"/>
			</svg>
			Login
		</h1>
</header>
	<body >	
		<div class="container">
			<div class="screen">
				<div class="screen__content">
					<form class="login" @submit.prevent="loginCom">
						<div class="login__field">
							<i class="login__icon fas fa-user"></i>
							<input type="text" id="user" name="user" class="login__input" placeholder="User name"
					v-model="user" ref="user" :class="{ 'is-invalid': procesando && userInvalido }" 
					@focus="resetEstado" @keypress="resetEstado" />
						</div>
						<div class="login__field">
							<i class="login__icon fas fa-lock"></i>
							<input type="password" id="password" name="password" class="login__input" placeholder="Password"
					v-model="password" :class="{ 'is-invalid': procesando && passwordInvalido }" @focus="resetEstado" />
						</div>
						<button class="button login__submit" @click.prevent="loginCom">
							<span class="button__text">Iniciar Sesion</span>
							<i class="button__icon fas fa-chevron-right"></i>
						</button>				
					</form>
				</div>
				<div class="screen__background">
					<span class="screen__background__shape screen__background__shape4"></span>
					<span class="screen__background__shape screen__background__shape3"></span>		
					<span class="screen__background__shape screen__background__shape2"></span>
					<span class="screen__background__shape screen__background__shape1"></span>
				</div>
				<div v-if="error && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
					¡El usuario o contraseña no es valido!
				</div>
				<div v-if="error2 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
					¡El usuario no esta registrado!
				</div>
				<div v-if="correcto" class="alert alert-success shadow-lg p-3 mb-5 rounded" role="alert">
					¡Inicio de sesión exitoso!
				</div>		
			</div>
		</div>
	</body>
	<footer class="login__footer">
		<h3>Crear una cuenta?</h3>
		<div class="social-icons">
			<router-link to="/registrar" class="social-login__icon">Registrar</router-link>
		</div>
	</footer>
</template>
  
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'LoginView',
  data() {
    return {
      procesando: false,
      correcto: false,
      error: false,
      error2: false,
      user: '',
      password: ''
    }
  },
  methods: {
    async loginCom() {
      this.procesando = true
      this.resetEstado()
      if (this.userInvalido || this.passwordInvalido) {
        this.error = true
        return
      }
      this.$refs.user.focus()
      const response = await fetch('http://127.0.0.1:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.user,
          password: this.password
        })
      });
      const result = await response.json();
      console.log(result);

      if (result.token) {
		this.procesando=false;
		this.error=false;
		this.correcto=true;
        localStorage.setItem('user-token', result.token); 
		const decodedToken = VueJwtDecode.decode(result.token);
        console.log(decodedToken);
		let role = decodedToken.role;
		if (role==="ROLE_ADMIN" ) {
			this.$router.push({ name: 'vistaAdmin' });
		} else {
			this.$router.push({ name: 'vistaCliente' });
		}

      }
      if(result.error){
        this.error2 = true
        return
      }
    },
    resetEstado() {
      this.correcto = false
      this.error = false
      this.error2 = false
    }
  },
  computed: {
    userInvalido() {
      return this.user.length < 1
    },
    passwordInvalido() {
      return this.password.length < 6
    }
  },
}
</script>

<style scoped>
.login__header {
  background: linear-gradient(90deg, #121213, #a4a4a7);
  border-top-left-radius: 1.25em;
  border-top-right-radius: 1.25em;
  color: #ffffff;
  padding: 1em 1.375em;
}

.login__header :first-child {
  margin-top: 0;
}

.login__header :last-child {
  margin-bottom: 0;
}
.login__footer {
  background: linear-gradient(90deg, #121213, #a4a4a7);
  border-bottom-left-radius: 1.25em;
  border-bottom-right-radius: 1.25em;
  color: #ffffff;
  padding: 1em 1.375em;
}

.login__footer :first-child {
  margin-top: 0;
}

.login__footer :last-child {
  margin-bottom: 0;
}
* {
	box-sizing: border-box;
	font-family: Raleway, sans-serif;
}
  
body {
	background: linear-gradient(90deg, #a4a4a7, #121213);		
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 80vh;
}

.screen {		
	background: linear-gradient(90deg, #050505, #4f4f55);		
	position: relative;	
	height: 600px;
	width: 360px;	
	box-shadow: 0px 0px 24px #050505;
}

.screen__content {
	z-index: 1;
	position: relative;	
	height: 100%;
}

.screen__background {		
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);	
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;	
	top: -50px;
	right: 120px;	
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #6C63AC;	
	top: -172px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #050505, #4f4f55);
	top: -24px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #7E7BB9;	
	top: 420px;
	right: 50px;	
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	padding-top: 156px;
}

.login__field {
	padding: 20px 0px;	
	position: relative;	
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #7875B5;
}

.login__input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 24px;
	font-weight: 700;
	width: 75%;
	transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #29292b;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #12111d;
	box-shadow: 0px 2px 2px #050505;
	cursor: pointer;
	transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #29292b;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #7875B5;
}

.social-login {	
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: #fff;
}

.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #020202;
	text-decoration: none;	
	text-shadow: 0px 0px 8px #000000;
}

.social-login__icon:hover {
	transform: scale(1.5);	
}
</style>
