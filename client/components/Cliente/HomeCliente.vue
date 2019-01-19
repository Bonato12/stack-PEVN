<template>
  <div id="app">
    <div class="container">
    </br>
    <h2> Clientes</h2>
    </br>
    <table id="tabla"  class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>
                        DNI
                    </th>
                    <th>
                        Nombre
                    </th>
                    <th>
                      Apellido
                    </th>
                    <th>
                      Opciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in datos">
                    <td>
                        {{item.dni}}
                    </td>
                    <td>
                        {{item.nombre}}
                    </td>
                    <td>
                        {{item.apellido}}
                    </td>
                    <td>
                        <button class="btn btn-danger" v-on:click="eliminarCliente(item.id_cliente)">Eliminar</button>
                        <router-link :to="/editarCliente/+item.id_cliente" active-class="activo" class="btn btn-warning" tag="button" >Editar</router-link>
                    </td>
                </tr>
            </tbody>
    </table>
    </br>
    </br>
    </br>
    <router-link to="/NuevoCliente" tag="button" class="btn btn-success" style="float: left;"  >Nuevo Cliente</router-link>
    </div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'app',
  created(){

      this.getCliente();

  },
  data () {
    return {
      datos: [],

		}
  },
  mounted(){

  },
  methods: {
    getCliente(){
    axios.get('http://localhost:3000/cliente').then((response) =>{
      this.datos = response.data;
      console.log(this.datos);
    });
  },
    eliminarCliente(id) {
          axios.delete('http://localhost:3000/cliente/' + id).then((data)=>{
                this.getCliente();
          });
    },


    editarCliente(id){
      console.log(id);
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

#tabla{
   background-color: rgba(0,0,0,0.8);
}


</style>
