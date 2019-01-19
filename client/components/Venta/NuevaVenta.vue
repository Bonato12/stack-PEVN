<template>
  <div id="app">
    <div class="container">
        </br>
        <h2> Venta</h2>
        </br>
        <div style="background-color: rgba(0,0,0,0.2);">
          <div class="row h-100 justify-content-center">
            <div class="col-md-5">
                <form @submit.prevent="nuevaVenta()">
                  <h3> Ingrese Cliente </h3>
                  <v-select style="background-color: white;" v-model="clienteSelected" label="dni" :options="this.cliente"></v-select>
                  <br>
                  <h3>{{clienteSelected.nombre}} {{clienteSelected.apellido}}</h3>
                  <h3> Ingrese Producto </h3>
                  <v-select style="background-color: white;" v-model="productoSelected" label="modelo" :options="this.producto"></v-select>
                  <br>
                  <h3>{{productoSelected.modelo}} {{productoSelected.precio}}</h3>
                  <h3>Precio:</h3>
                  <p v-if="calcular">{{calcular}}</p>
                  <button class="btn btn-primary btn-block">Guardar</button>
                </form>
            </br>
            </br>
            </br>
            </div>
          </div>
        </div>
        <router-link to="/NuevoCliente" tag="button" class="btn btn-success" style="float: left;"  >Nuevo Cliente</router-link>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

/*
class Venta{
    constructor(id_venta,id_cliente,id_producto,fecha){
      this.id_venta =  Number(new Date().getTime()),
      this.id_cliente = id_cliente,
      this.id_producto = id_producto,
      this.fecha = fecha
    }
}
*/

export default {
  name: 'app',
  created(){

      this.getCliente();
      this.getProducto();

  },
  data () {
    return {
      cliente: [],
      producto: [],
      clienteSelected: '',
      productoSelected: '',
      //venta: new Venta()
      id_venta: '',
      fecha: ''
		}
  },
  computed:{
      calcular(){
      var precio = this.productoSelected.precio * 3;
      return precio;
      }
    },
  mounted(){

  },
  methods: {
    getCliente(){
    axios.get('http://localhost:3000/cliente').then((response) =>{
      this.cliente = response.data;
    });
  },
    getProducto(){
      axios.get('http://localhost:3000/producto').then(response=>{
        this.producto = response.data;
      });
    },
  nuevaVenta(){
    console.log(this.clienteSelected);
    console.log(this.productoSelected);
    axios.post('http://localhost:3000/venta',
                {
                  id_venta: Number(new Date().getTime()),
                  id_cliente: this.clienteSelected.id_cliente,
                  id_producto: this.productoSelected.id_producto,
                  fecha: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()
              },
              {
                headers: {
                  'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                  'Content-Type': 'application/json'
                }
              }).then(console.log('Hecho'))

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
  color: white;
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

#formulario{
  background-color: rgba(0,0,0,0.8);
}


</style>
