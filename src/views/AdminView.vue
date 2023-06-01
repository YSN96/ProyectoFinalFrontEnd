<template>

    <Navbar/>
    <div class="container-xxl mt-5">
      <div class="title text-center">
          <h1 class="display-5">
            <i class="fas fa-user-alt text-success"></i> <strong>Administracion de Articulos</strong>
          </h1>
      </div>
      <div class="main row">
        <!--Añadir-->
        <div id="add" class="col-sm-12 col-md-4" style="display: none">
          <form id="articulos-form" class="shadow-lg p-3 mb-5 bg-white rounded" autocomplete="off" @submit.prevent="addArticulo">
            <div class="title text-center">
                <h2>
                  <strong>Añadir Articulo</strong>
                </h2>
            </div>
            <div class="form-group">
              <label for="nombre">Articulo</label>
              <input 
                type="text" 
                id="nombre" 
                class="form-control"
                v-model="articuls.nombre" 
                ref="nombre" 
                :class="{'is-invalid':procesando && nombreInvalido}"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡Debes rellenar todos los campos!
              </div>
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <input 
                type="text" 
                id="descripcion" 
                class="form-control"
                v-model="articuls.descripcion"
                :class="{'is-invalid':procesando && descripcionInvalido}"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error1 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡Debes rellenar todos los campos!
              </div>
            </div>
            <div class="form-group">
              <label for="precio">Precio</label>
              <input 
                type="number" 
                id="precio" 
                class="form-control"
                v-model="articuls.precio"
                :class="{'is-invalid':procesando && precioInvalido}"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error2 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡El precio no debe ser menor que 1€ o Vacio!
              </div>
            </div>
            <div class="form-group">
              <label for="foto">Foto</label>
              <input 
                type="file" 
                id="foto" 
                class="form-control"
                @change="onFileAdd" 
                accept="image/*"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error3 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡Necesitas seleccionar un foto!
              </div>
            </div>
            <div class="form-group">
              <br>
              <button type="submit" class="btn btn-success btn-lg" @click.prevent="addArticulo"><i class="fa fa-plus-square" aria-hidden="true"></i> Guardar</button>
              <br><br>
              <button type="submit" class="btn btn-danger btn-lg" @click.prevent="cancelar()"><i class="fa fa-times" aria-hidden="true"></i> Cancelar</button>
              <br><br>
            </div>
          </form>
        </div>
        <!--Editar-->
        <div id="edit" class="col-sm-12 col-md-4" style="display: none">
          <form id="articulos-form"  class="shadow-lg p-3 mb-5 bg-white rounded" autocomplete="off" @submit.prevent="updArticulo">
            <div class="title text-center">
                <h2>
                  <strong>Actualizar Articulo</strong>
                </h2>
            </div>
            <div class="form-group">
              <label for="nombre">Articulo</label>
              <input 
                type="text" 
                id="nombre" 
                class="form-control"
                v-model="articul.nombre" 
                ref="nombre" 
                :class="{'is-invalid':procesando && nombreInvalido}"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡Debes rellenar todos los campos!
              </div>
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <input 
                type="text" 
                id="descripcion" 
                class="form-control"
                v-model="articul.descripcion"
                :class="{'is-invalid':procesando && descripcionInvalido}"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error1 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡Debes rellenar todos los campos!
              </div>
            </div>
            <div class="form-group">
              <label for="precio">Precio</label>
              <input 
                type="number" 
                id="precio" 
                class="form-control"
                v-model="articul.precio"
                :class="{'is-invalid':procesando && precioInvalido}"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
              <div v-if="error2 && procesando" class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert">
                ¡El precio no debe ser menor que 1€ o Vacio!
              </div>
            </div>
            <div class="form-group">
              <label for="foto">Foto</label>
              <input 
                type="file" 
                id="foto" 
                class="form-control"
                @change="onFileChange" 
                accept="image/*"
                @focus="resetEstado"
                @keypress="resetEstado"
                >
              <br>
            </div>
            <div class="form-group">
              <br>
              <button type="submit" class="btn btn-primary btn-lg" @click.prevent="updArticulo(articul.id_articulo)"><i class="fa fa-refresh" aria-hidden="true"></i> Actualizar</button>
              <br><br>
              <button type="submit" class="btn btn-danger btn-lg" @click.prevent="cancelar()"><i class="fa fa-times" aria-hidden="true"></i> Cancelar</button>
              <br><br>
            </div>
          </form>
        </div>
        <!--Mostrar un articulo-->
        <div id="mostrar" class="col-sm-12 col-md-4 " style="display: none">
                <div class="flex flex-wrap w-full sm:w-1/2 md:w-1/3 flex-col -m-3 shadow-lg p-3 mb-5 bg-white rounded"> 
                  <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                    <div class="bg-cover h-48">
                      <img class="img-fluid" :src="articulo.imagenURL" :alt="articulo.nombre">
                    </div>
                    <div class="p-4 flex-1 flex flex-col" style="">
                      <h3 class="mb-4 text-2xl">{{ articulo.nombre }}</h3>
                      <div class="mb-4 text-grey-darker text-sm flex-1">
                        <p><b>ID de Articulo: </b> {{ articulo.id_articulo }}</p>
                        <p><b>Descripción   : </b> {{ articulo.descripcion }}</p>
                        <p><b>Precio        : </b> {{ articulo.precio }} €</p>
                      </div>
                      <input type="submit" value="Ocultar" class="btn btn-danger btn-block add-btn" @click.prevent="cancelar()">
                    </div>
                  </div>  
                </div>
                
        </div>
        <!-- all articulos -->
        <div id="tdArticulos" class="mt-5 shadow-lg p-3 mb-5 bg-white rounded">
          <div v-if="!articulos || !articulos.length" class="alert alert-info shadow-lg p-3 mb-5 rounded" role="alert">
            No se han agregado Articulos
          </div>
          <div v-if="correcto" class="alert alert-success shadow-lg p-3 mb-5 rounded" role="alert">
            {{mensaje}}
          </div>
          <table class="table table-striped mt-5 ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Articulo</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="articulo in articulos" :key="articulo.id">
                    <td>{{ articulo.id_articulo }}</td>
                    <td>{{ articulo.nombre }}</td>
                    <td>{{ articulo.precio }} €</td>
                    <td>
                        <button class="btn btn-success mx-2"  @click.prevent="mostrararticulo(articulo.id_articulo)"><i class="fa fa-eye"></i></button>
                        <button class="btn btn-primary mr-2"  @click.prevent="editArticulo(articulo.id_articulo)"><i class="fa fa-pencil"></i></button>
                        <button class="btn btn-danger mx-2"  @click.prevent="deleteArticulos(articulo.id_articulo)"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
          </table>
          <button class="btn btn-link btn-lg addArt" @click.prevent="anadirArticulo()">Añadir Articulo</button>
          <button class="btn btn-link btn-lg addArt" @click.prevent="deleteAllArticulos()">Eliminar Todos los Articulos</button>
        </div>
      </div>
    </div>    
</template>
  
<script>
import Navbar from '@/components/Navbar'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'vistaAdmin',
  components: { Navbar },
  data() {
  return {
    procesando: false,
    correcto: false,
    error: false,
    error1: false,
    error2: false,
    error3: false,
    mensaje: '',
    articul: {
      id_articulo: '',
      nombre:'',
      descripcion:'',
      precio:'',
      archivo_imagen:'' ,
      file:'' 
    },
    articuls: {
      nombre:'',
      descripcion:'',
      precio:'',
      archivo_imagen:'' ,
      file:'' 
    },
    articulos:[],
    articulo:[],
    compruebaImage:'',
  };
},
methods: {
  onFileAdd(e) {
      this.compruebaImage = e.target.files[0];
      const file = e.target.files[0];
      console.log(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.articuls.archivo_imagen = file.name;
            this.articuls.file = e.target.result; 
        };
      }
  },
  onFileChange(e) {
      this.compruebaImage = e.target.files[0];
      const file = e.target.files[0];

      console.log(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.articul.archivo_imagen =file.name; 
            this.articul.file=e.target.result; 
        };
      }
  },
  anadirArticulo(){
    this.resetEstado();
    const allArticulos = document.getElementById('tdArticulos');
    allArticulos.setAttribute('class','col-sm-12 col-md-8 shadow-lg p-3 mb-5 bg-white rounded');
    const mostrarArticulo = document.getElementById('mostrar');
    mostrarArticulo.style.display = 'none';
    const addArticulos = document.getElementById('add');
    addArticulos.style.display = 'block';
    const editArticulo = document.getElementById('edit');
    editArticulo.style.display = 'none';
  },
  async editArticulo(id){
    this.resetEstado();
    const allArticulos = document.getElementById('tdArticulos');
    allArticulos.setAttribute('class','col-sm-12 col-md-8 shadow-lg p-3 mb-5 bg-white rounded');
    const mostrarArticulo = document.getElementById('mostrar');
    mostrarArticulo.style.display = 'none';
    const addArticulos = document.getElementById('add');
    addArticulos.style.display = 'none';
    const editArticulo = document.getElementById('edit');
    editArticulo.style.display = 'block';
    const token = localStorage.getItem('user-token');
      fetch(`http://127.0.0.1:8000/api/articulos/${id}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.articul = data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  mostrararticulo(id){
    this.resetEstado();
    const allArticulos = document.getElementById('tdArticulos');
      allArticulos.setAttribute('class','col-sm-12 col-md-8 shadow-lg p-3 mb-5 bg-white rounded');
      const mostrarArticulo = document.getElementById('mostrar');
      mostrarArticulo.style.display = 'block';
      const addArticulo = document.getElementById('add');
      addArticulo.style.display = 'none';
      const editArticulo = document.getElementById('edit');
      editArticulo.style.display = 'none';
      this.carregarDatosArticulo(id);
  },
  cancelar(){
    this.resetEstado();
    const allArticulos = document.getElementById('tdArticulos');
    allArticulos.setAttribute('class','mt-5 shadow-lg p-3 mb-5 bg-white rounded');
    const mostrarArticulo = document.getElementById('mostrar');
    mostrarArticulo.style.display = 'none';
    const addArticulos = document.getElementById('add');
    addArticulos.style.display = 'none';
    const editArticulo = document.getElementById('edit');
    editArticulo.style.display = 'none';

  },
  //
  async deleteAllArticulos() {
    this.resetEstado();
    const token = localStorage.getItem('user-token');

    const response = await fetch(`http://127.0.0.1:8000/api/articulos/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await response.json();
    console.log(result);

    if (result.message) {
        this.cancelar();
        this.mensaje =result.message;
        this.correcto= true;
        this.carregarDatos();
    }
  },
  //
  async deleteArticulos(id) {
    this.resetEstado();
    const token = localStorage.getItem('user-token');

    const response = await fetch(`http://127.0.0.1:8000/api/articulos/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await response.json();
    console.log(result);


    if (result.message) {
        this.mensaje =result.message;
        this.correcto= true;
        this.carregarDatos();
    }
  },
  //
  async addArticulo() {
    this.procesando = true;
    this.resetEstado();
    if (this.nombreInvalidoAdd) {
      this.error=true;
      return;          
    }
    if (this.descripcionInvalidoAdd) {
      this.error1=true;
      return;          
    }
    if(this.precioInvalidoAdd){
      this.error2=true;
      return;
    }
    if (!this.compruebaImage) {
        this.articuls.archivo_imagen = '';
        this.error3 = true;
        return;
    }
    this.onFileAdd;

    this.$refs.nombre.focus();

    const token = localStorage.getItem('user-token');
    const response = await fetch('http://127.0.0.1:8000/api/articulos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre: this.articuls.nombre,
        descripcion: this.articuls.descripcion,
        precio: this.articuls.precio,
        archivo_imagen: this.articuls.archivo_imagen,
        file:this.articuls.file 
      })
    });

    const result = await response.json();
    console.log(result);

    if (result.message) {
          this.error = false;
          this.error1 = false;
          this.error2 = false;
          this.error3 = false;
          this.mensaje =result.message;
          this.cancelar();
          this.procesando= false;
          this.correcto= true;
          this.carregarDatos();
    } else {
      alert('Ocurrió un error');
    }
      this.articuls = {
      nombre:'',
      descripcion:'',
      precio:'',
      archivo_imagen:'',
      file:'' 
    };
    this.compruebaImage= null;
},
//
async carregarDatos() {
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
//
async carregarDatosArticulo(id){
  const token = localStorage.getItem('user-token');
  fetch(`http://127.0.0.1:8000/api/articulos/${id}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    this.articulo = data;
  })
  .catch(error => {
    console.error(error);
  });
},
//
async updArticulo(id) {
    this.procesando = true;
    this.resetEstado();
    if (this.nombreInvalido) {
      this.error=true;
      return;          
    }
    if (this.descripcionInvalido) {
      this.error1=true;
      return;          
    }
    if(this.precioInvalido){
      this.error2=true;
      return;
    }
    this.onFileChange;

    this.$refs.nombre.focus();

    const token = localStorage.getItem('user-token');
    const response = await fetch(`http://127.0.0.1:8000/api/articulos/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre: this.articul.nombre,
        descripcion: this.articul.descripcion,
        precio: this.articul.precio,
        archivo_imagen: this.articul.archivo_imagen,
        file:this.articul.file
      })
    });

    const result = await response.json();
    console.log(result);

    if (result.message) {
          this.error = false;
          this.error1 = false;
          this.error2 = false;
          this.error3 = false;
          this.mensaje =result.message;
          this.cancelar();
          this.procesando= false;
          this.correcto= true;
          this.carregarDatos();
    } else {
      alert('Ocurrió un error');
    }
    this.compruebaImage= null;  
},
resetEstado(){
    this.correcto = false
    this.error = false;
    this.error1 = false;
    this.error2 = false;
    this.error3 = false;
}
},
computed: {
    nombreInvalidoAdd(){
        return this.articuls.nombre.length < 1;
    },
    descripcionInvalidoAdd(){
        return this.articuls.descripcion.length < 1;
    },
    precioInvalidoAdd(){
        return this.articuls.precio < 1;
    },
    nombreInvalido(){
        return this.articul.nombre.length < 1;
    },
    descripcionInvalido(){
        return this.articul.descripcion.length < 1;
    },
    precioInvalido(){
        return this.articul.precio < 1;
    },

},
async mounted() {
  const user = localStorage.getItem('user-token')
    if (user) {
      const decodedToken = VueJwtDecode.decode(user);
      console.log(decodedToken);
      let role = decodedToken.role;
      if (role==="ROLE_ADMIN" ) {
        this.carregarDatos();
      } else {
        this.$router.push({ name: 'LoginView' });
      }
    }else{
        this.$router.push({ name: 'LoginView' });
    }
},  
}
</script>
<style scoped>
body {
  background: #eee;
  margin: 30px auto;
  padding: 20px;
/*   outline: 1px solid #ccc; */
}
p {
  margin-bottom: 0.8em;
}
.addArt {
    float: left;
}
</style>

