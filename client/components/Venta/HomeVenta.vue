<template>
  <div id="app">
    <div class="container">
      <br>
      <h2>Ventas</h2>
      <br>
      <table id="tabla"  class="table table-striped table-bordered">
              <thead>
                  <tr>
                      <th>
                        Nombre
                      </th>
                      <th>
                        Apellido
                      </th>
                      <th>
                        Modelo
                      </th>
                      <th>
                        Fecha
                      </th>
                      <th>
                        Opciones
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in venta">
                      <td>
                          {{item.nombre}}
                      </td>
                      <td>
                          {{item.apellido}}
                      </td>
                      <td>
                          {{item.modelo}}
                      </td>
                      <td>
                          {{item.fecha}}
                      </td>
                      <td>
                          <button class="btn btn-danger" v-on:click="borrarVenta(item.id_venta)" >Eliminar</button>
                          <button class="btn btn-warning" >Editar</button>
                      </td>
                  </tr>
              </tbody>
      </table>
      </br>
        <router-link to="/NuevaVenta" tag="button" class="btn btn-success" style="float: left;">Nueva Venta</router-link>
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
    this.getVenta();

  },
  data () {
    return {
      venta: []
		}
  },
  computed:{

    },
  mounted(){
  },
  methods: {
    getVenta(){
    axios.get('http://localhost:3000/venta').then((response) =>{
      this.venta = response.data;
      console.log(this.venta);
    });
    },
    borrarVenta(id){
      console.log(id);
      axios.delete('http://localhost:3000/venta/' + id).then(this.getVenta);
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
