<template>
  <div id="app">
    <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-header">
              <h3> Editar Producto </h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="editarProducto()">
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"></span>
                      </div>
                      <input required type="text" v-model="producto.modelo" class="form-control" placeholder="Ingrese Modelo">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"></span>
                      </div>
                      <input required type="text" v-model="producto.descripcion" class="form-control" placeholder="Ingrese Descripcion">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"></span>
                      </div>
                      <input required type="text" v-model="producto.tipoProducto" class="form-control" placeholder="tipo de Producto">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"></span>
                      </div>
                      <input required type="number" v-model="producto.stock" class="form-control" placeholder="Ingrese Stock">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"></span>
                      </div>
                      <input required type="number" v-model="producto.precio" class="form-control" placeholder="Ingrese Precio">
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

class Producto {
    constructor(id_producto,modelo,descripcion,tipoProducto,stock,precio){
          this.id_producto =   Number(new Date().getTime()),
          this.modelo = modelo,
          this.descripcion = descripcion,
          this.tipoProducto = tipoProducto,
          this.stock = stock,
          this.precio = precio

    }
}


export default {
  name: 'app',
  created(){
    this.rellenarProducto();
  },
  data () {
    return {
      idc: this.$route.params.id,
      datos: [],
      producto:  new Producto(),
		}
  },
  mounted(){

  },
  methods: {
    rellenarProducto(){
       axios.get('http://localhost:3000/producto/'+this.idc).then((response) =>{
         console.log(response.data);
         this.producto = new Producto(this.idc,response.data[0].modelo,response.data[0].descripcion,response.data[0].tipoproducto,response.data[0].stock,response.data[0].precio);
     })
   },

   editarProducto(){
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
         'El Producto ha sido Editado!',
         'success'
       ).then(axios.put('http://localhost:3000/producto/'+ this.idc,
            this.producto,
            { headers: {
                'Content-Type': 'application/json',
            }
          }));
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
