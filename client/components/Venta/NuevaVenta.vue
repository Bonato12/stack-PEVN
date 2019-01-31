<template>
  <div id="NuevaVenta">
    <div class="container">
          <div class="d-flex justify-content-center h-100">
        		<div class="card" id="card">
          			<div class="card-header">
                  <h3> Nueva Venta </h3>
          			</div>
          			<div class="card-body">
              				<form @submit.prevent="nuevaVenta()">
                        <div class="form-group">
                            <v-select  placeholder="Ingrese Cliente" v-model="clienteSelected" label="dni" :options="this.cliente"></v-select>
                        </div>
                        <div class="form-group">
                              {{clienteSelected.nombre}} {{clienteSelected.apellido}}
                        </div>
                        <div class="form-group">
                            <v-select placeholder="Producto" v-model="productoSelected" label="modelo" :options="this.producto"></v-select>
                        </div>
                        <div class="form-group">
                              {{productoSelected.modelo}} {{productoSelected.descripcion}} {{productoSelected.precio}}
                        </div>
              					<div class="form-group">
              						  <input type="submit" value="Guardar"  class="btn float-right login_btn">
              					</div>
          				</form>
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
              }).then(this.clienteSelected = '', this.productoSelected = '').then(this.$swal( 'Exito!','Nuevo Producto Añadido!','success'));

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
width: 400px;
background-color: rgba(0,0,0,1) !important;
color: white;
}


</style>
