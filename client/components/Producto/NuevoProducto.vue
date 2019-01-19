<template>
  <div id="app">
    <div class="container">
        <br>
        <h2> Producto </h2>
        <br>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="nuevoProducto">
                <div class="form-group">
                  <input required type="text"  v-model="producto.modelo" class="form-control" placeholder="Ingrese Modelo">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="producto.descripcion" class="form-control" placeholder="Ingrese Descripcion">
                </div>
                <div class="form-group">
                  <input required type="text"  v-model="producto.tipoProducto" class="form-control" placeholder="Tipo Producto">
                </div>
                <div class="form-group">
                  <input required type="number"  v-model="producto.stock" class="form-control" placeholder="Stock">
                </div>
                <div class="form-group">
                  <input required type="number"  v-model="producto.precio" class="form-control" placeholder="Precio">
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

  },
  data () {
    return {
      datos: [],
      producto:  new Producto(),
		}
  },
  mounted(){
    /*
    axios.get('http://localhost:3000/cliente').then((response) =>{
      this.datos = response.data;
      console.log(this.datos);
    });
    */
  },
  methods: {

    nuevoProducto(){
        console.log(this.producto);
        axios.post('http://localhost:3000/producto',
        this.producto, // the data to posthttp://localhost:3000/producto
        { headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000/producto',
          'Content-Type': 'application/json',
        },
      }).then(this.$swal( 'Exito!',
                          'Nuevo Producto Añadido!',
                          'success'));

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
