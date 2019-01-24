<template>
  <div id="app">
    <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-header">
              <h3> Editar Cliente </h3>
            </div>
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
                <div class="form-group">
                    <input type="submit" value="Modificar"  class="btn float-right login_btn">
                </div>
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
         console.log(response.data);
         this.cliente = new Cliente(this.idc,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].ciudad,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
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
          }))
        }
     })

 }
}
}
</script>

<style>

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




</style>
