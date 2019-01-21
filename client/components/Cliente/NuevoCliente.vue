<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
              <h3> Nuevo Cliente </h3>
            </div>
            <div class="card-body">
                  <form @submit.prevent="nuevoCliente()">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                        <input required type="number" v-model="cliente.dni" class="form-control" placeholder="Ingrese Dni">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                        <input required  type="text" v-model="cliente.nombre" class="form-control" placeholder="Ingrese Nombre">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                        <input required  type="text" v-model="cliente.apellido" class="form-control" placeholder="Ingrese Apellido">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                        <input required type="text" v-model="cliente.ciudad" class="form-control" placeholder="Ingrese Ciudad">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                        <input required type="text" v-model="cliente.direccion" class="form-control" placeholder="Ingrese Direccion">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                        <input required type="number" v-model="cliente.telefono" class="form-control" placeholder="Ingrese Telefono">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"></span>
                        </div>
                          <input required type="text" v-model="cliente.mail" class="form-control" placeholder="Ingrese Mail">
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Guardar"  class="btn float-right login_btn">
                    </div>
              </form>

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
          this.id_cliente =   Number(new Date().getTime()),
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


.cliente{
height: 510px;
margin-top: 30px;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

/*
form input:focus:invalid{
       border:2px solid red;

}

form input:valid{
       border:2px solid green;

   }
*/

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


#cliente:{
  background-color: #fec400;
  color: black;
  height: 193%;
}
</style>
