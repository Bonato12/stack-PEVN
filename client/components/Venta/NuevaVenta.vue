<template>
  <div id="NuevaVenta">
    <div class="container">
          <div class="d-flex justify-content-center h-100">
        		<div class="card" id="card">
          			<div class="card-header">
                  <h3 style="text-alig:center; color:black;"> Nueva Venta </h3>
          			</div>
          			<div class="card-body">
              				<form @submit.prevent="nuevaVenta()">
                        <div class="form-group" style="width:70px;">
                          <v-select :options="cliente" label="dni" style="width:400px;" v-model="clienteSelected">
                            <template slot="option" slot-scope="option">
                                <span class="fa" :class="option.icon"></span>
                                {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                            </template>
                          </v-select>
                        </div>
                          <div class="form-group" style="width:70px;">
                            <v-select v-on:change="listar()" :options="producto" label="modelo" style="width:400px;" v-model="productoSelected">
                              <template slot="option" slot-scope="option">
                                  <span class="fa" :class="option.icon"></span>
                                  {{ option.modelo }} {{ option.precio }}
                              </template>
                            </v-select>
                          </div>
                          <div class="form-group" style="color:black;">
                            <ul>
                              <li v-for="item in lista">
                                <h3>{{ item.modelo }}</h3>
                              </li>
                            </ul>
                          </div>
              					<div class="form-group">
              						  <input type="submit" value="Guardar"  class="btn float-right login_btn">
              					</div>
          				</form>
          			</div>
        		</div>
            </div>
          </div>
        <br>
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
  name: 'NuevaVenta',
  created(){

      this.getCliente();
      this.getProducto();

  },
  data () {
    return {
      cliente: [],
      lista: [],
      producto: [],
      clienteSelected: '',
      productoSelected: '',
      //venta: new Venta()
      id_venta: '',
      fecha: '',
      options: [
      {
          title: 'Read the Docs',
          icon: 'fa-book',
          url: 'https://codeclimate.com/github/sagalbot/vue-select'
        },
        {
          title: 'View on GitHub',
          icon: 'fa-github',
          url: 'https://codeclimate.com/github/sagalbot/vue-select'
        },
        {
          title: 'View on NPM',
          icon: 'fa-database',
          url: 'https://codeclimate.com/github/sagalbot/vue-select'
        },
        {
          title: 'View Codepen Examples',
          icon: 'fa-pencil',
          url: 'https://codeclimate.com/github/sagalbot/vue-select'
        }
    ]
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
              }).then(this.clienteSelected = '', this.productoSelected = '').then(this.$swal( 'Exito!','Nuevo Producto Añadido!','success'));

  },
  listar(){
    this.lista.push(this.productoSelected);
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

a {
  color: #42b983;
}



#card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 450px;
color: white;
}


</style>
