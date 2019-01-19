<template>
  <div id="app">
    <div class="container">
        <br>
        <h2> Cliente </h2>
        <br>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="nuevoCliente">
                <p v-if="errors.length">
                    <ul>
                      <li v-for="error in errors">
                        <div class="alert alert-danger" role="alert">
                            {{error}}
                        </div>
                      </li>
                    </ul>
                </p>
                <div class="form-group">
                  <input required type="number"  v-model="cliente.dni" class="form-control" placeholder="Ingrese Dni">
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
                  <input required type="number"  v-model="cliente.telefono" class="form-control" placeholder="Ingrese Telefono">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="cliente.mail" class="form-control" placeholder="Ingrese Mail">
                </div>
                 <button class="btn btn-primary btn-block">Guardar</button>
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
          this.id_cliente =   10,
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
      this.getCliente();
  },
  data () {
    return {
      datos: [],
      errors: [],
      cliente: new Cliente
		}
  },
  mounted(){
    axios.get('http://localhost:3000/cliente').then((response) =>{
      this.datos = response.data;
      console.log(this.datos);
    });

  },
  methods: {
    getCliente(){
    axios.get('http://localhost:3000/cliente').then((response) =>{
      this.datos = response.data;
      console.log(this.datos);
    });
    },
    nuevoCliente(){
        if (this.cliente.dni && this.cliente.nombre && this.cliente.apellido && this.cliente.ciudad && this.cliente.direccion && this.cliente.telefono && this.cliente.mail){
        this.errors = [];
        console.log(this.cliente);
        axios.post('http://localhost:3000/cliente',
        this.cliente, // the data to posthttp://localhost:3000/cliente
        { headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000/cliente',
          'Content-Type': 'application/json',
        },
        }).then(this.$swal( 'Exito!','Nuevo Cliente Añadido!','success'))
          .then(this.getCliente());

      }
      else{
        this.errors = [];
        if (!this.cliente.dni){
        this.errors.push('DNI Requerido');
        }
        if (!this.cliente.nombre){
        this.errors.push('Nombre Requerido');
        }
        if (!this.cliente.apellido){
          this.errors.push('Apellido Requerido');
        }
        if (!this.cliente.ciudad){
          this.errors.push('Ciudad Requerida');
        }
        if (!this.cliente.direccion){
          this.errors.push('Direccion Requerida');
        }
        if (!this.cliente.telefono){
          this.errors.push('Telefono Requerido');
        }
        if (!this.cliente.mail){
          this.errors.push('Mail Requerido');
        }
      }
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



form input:focus:invalid{
       border:2px solid red;
       /* otras propiedades */
}

form input:valid{
       border:2px solid green;
       /* otras propiedades */
   }

h1, h2 {
  font-weight: normal;
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
