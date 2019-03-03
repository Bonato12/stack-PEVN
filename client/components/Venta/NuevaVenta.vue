<template>
  <div id="NuevaVenta">
    <div class="container">
          <div class="d-flex justify-content-center h-100">
        		<div class="card" id="card">
          			<div class="card-header">
                  <h3 style="text-align:center; color:white;"> Nueva Venta </h3>
          			</div>
          			<div class="card-body">
              				<form @submit.prevent="nuevaVenta()">
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Cliente</span>
                            <v-select :options="cliente" label="dni"  v-model="clienteSelected" style="width:320px; background-color: white;">
                              <template slot="option" slot-scope="option">
                                  <span class="fa" :class="option.icon"></span>
                                  {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                              </template>
                            </v-select>
                          </div>
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Producto</span>
                                <v-select  :options="producto" label="modelo"  v-model="productoSelected" style="width:303px; background-color: white;">
                                  <template slot="option" slot-scope="option">
                                      <span class="fa" :class="option.icon"></span>
                                      {{ option.modelo }} {{ option.precio }}
                                  </template>
                                </v-select>
                            </div>
                        </div>
              					<div class="form-group">
              						  <input type="submit" value="Guardar"  class="btn float-right venta_btn">
              					</div>
                        <router-link to="/HomeProveedor" tag="button" class="btn" style="background:white; margin-left:202px;">
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
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

class Venta{
    constructor(id_venta,id_cliente,id_producto,fecha,precio){
      this.id_venta =  id_venta,
      this.id_cliente = id_cliente,
      this.id_producto = id_producto,
      this.fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()
      this.precio = precio
    }
}


export default {
  name: 'NuevaVenta',
  created(){

      this.getCliente();
      this.getProducto();

  },
  data () {
    return {
      venta: new Venta(),
      cliente: [],
      lista: [],
      producto: [],
      productoSelected: '',
      clienteSelected: ''
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
        console.log(response.data.stock)
      });
    },
  nuevaVenta(){
    console.log(this.clienteSelected);
    console.log(this.productoSelected);
    this.venta.id_cliente = this.clienteSelected.id_cliente;
    this.venta.id_producto= this.productoSelected.id_producto;
    this.venta.precio= this.productoSelected.precio;
    var id = this.venta.id_producto= this.productoSelected.id_producto;
    var stock = this.productoSelected.stock;
    axios.post('http://localhost:3000/venta',
                this.venta,
              {
                headers: {
                  'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                  'Content-Type': 'application/json'
                }
              }).then(axios.put('http://localhost:3000/productoStock/'+ id,
                   {
                   stock: (stock) - 1
                 },
                   { headers: {
                       'Content-Type': 'application/json',
                   }
                 }));
        }
      }
    }

</script>

<style scoped>


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
background-color: rgba(0,0,0,0.5) !important;

}


.venta_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.venta_btn:hover{
color: black;
background-color: white;
}

.input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
}

</style>
