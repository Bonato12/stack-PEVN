<template>
  <div id="app">
    <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="editarCliente()">
                <div class="form-group">
                  <input required type="text"  v-model="cliente.dni" class="form-control" placeholder="Ingrese Dni">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.nombre" class="form-control" placeholder="Ingrese Nombre">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.apellido" class="form-control" placeholder="Ingrese Apellido">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.ciudad" class="form-control" placeholder="Ingrese Ciudad">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.direccion" class="form-control" placeholder="Ingrese Direccion">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.telefono" class="form-control" placeholder="Ingrese Telefono">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.mail" class="form-control" placeholder="Ingrese Mail">
                </div>
                 <button class="btn btn-primary btn-block">Modificar</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </br>
  </div>
</template>

<script>

import axios from 'axios'

class Cliente {
    constructor(id_cliente,dni,nombre,apellido,ciudad,direccion,telefono,mail){
          this.id_cliente = id_cliente
          this.dni = dni,
          this.nombre = nombre,
          this.apellido = apellido,
          this.ciudad = ciudad,
          this.direccion = direccion,
          this.telefono = telefono,
          this.mail = mail
    }
}

export default {
  name: 'app',
  created(){
    this.rellenarCliente();
  },
  data () {
    return {
      idc: this.$route.params.id,
      datos: [],
      cliente:  new Cliente(),
		}
  },
  mounted(){

  },
  methods: {
    rellenarCliente(){
       console.log(this.idc);
       axios.get('http://localhost:3000/cliente/'+this.idc).then((response) =>{
         this.datos = response.data;
         console.log(this.datos);
         for (var item in this.datos){
           var dni = this.datos[item].dni;
           var nombre = this.datos[item].nombre;
           var apellido = this.datos[item].apellido;
           var ciudad = this.datos[item].ciudad;
           var direccion = this.datos[item].direccion;
           var telefono = this.datos[item].telefono;
           var mail = this.datos[item].mail;
         }
         this.cliente = new Cliente(this.idc,dni,nombre,apellido,ciudad,direccion,telefono,mail);
     });
   },

   editarCliente(){
     this.$swal({
     title: 'Seguro que desea Editar?',
     text: "No podra recuperar los datos!",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, Editar'
     }).then((result) => {
     if (result.value) {
       this.$swal(
         'Editado!',
         'El Cliente ha sido Editado!',
         'success'
       ).then(axios.put('http://localhost:3000/cliente/'+ this.idc,
            this.cliente,
            { headers: {
                'Content-Type': 'application/json',
            }
          }).then(this.cliente = new Cliente()).
            then(this.$router.push('/Home')));
       }
     });

 }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

form input:focus:invalid{
       border:2px solid red;
       /* otras propiedades */
}

form input:valid{
       border:2px solid green;
       /* otras propiedades */
   }

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#table {
	margin: 0 auto;
	width: 500px;
}
</style>
