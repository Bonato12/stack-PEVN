<template>
  <div id="app">
    <br>
    <h2> Productos</h2>
    <br>
    <div class="container">
    <table id="tabla"  class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>
                        Modelo
                    </th>
                    <th>
                        Tipo
                    </th>
                    <th>
                      Precio
                    </th>
                    <th>
                      Opciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in productos">
                    <td>
                        {{item.modelo}}
                    </td>
                    <td>
                        {{item.tipoproducto}}
                    </td>
                    <td>
                        {{item.precio}}
                    </td>
                    <td>
                        <button class="btn btn-danger" v-on:click="eliminarProducto(item.id_producto)" >Eliminar</button>
                        <button class="btn btn-warning" >Modificar</button>
                    </td>
                </tr>
            </tbody>
    </table>
    </br>
    <router-link to="/NuevoProducto" tag="button" class="btn btn-success">Nuevo Producto</router-link>
</div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'app',
  created(){
    this.getProducto()
  },
  data () {
    return {
      productos: [],

		}
  },
  mounted(){

  },
  methods: {
    getProducto(){
      console.log(this.productos)
      axios.get('http://localhost:3000/producto').then(response=>{
          this.productos = response.data;
          console.log(this.productos);
      }).catch((error)=>{
        console.log(error);
      })
    },
    eliminarProducto(idp){
      axios.delete('http://localhost:3000/producto/'+idp).then((data)=>{
        this.getProducto();
      })

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
