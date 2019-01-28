<template>
  <div>
    <div class="container">
        <div class="d-flex justify-content-center h-100">
      		<div class="card">
        			<div class="card-header">
                <h3> Nuevo Producto </h3>
        			</div>
        			<div class="card-body" >
            				<form @submit.prevent="nuevoProducto()">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Modelo</span>
              						</div>
              						<input required type="text" v-model="producto.modelo" class="form-control" placeholder="Ingrese Modelo">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Descripcion</span>
              						</div>
              						<textarea required type="text" v-model="producto.descripcion" class="form-control" placeholder="Ingrese Descripcion"></textarea>
            					</div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Tipo Producto</span>
              						</div>
                          <select required class="form-control" v-model="producto.tipoProducto">
                            <option disabled>Elige un Tipo Producto</option>
                            <option v-for="item in tipoProductos">{{ item.name }}</option>
                         </select>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Stock</span>
              						</div>
              						<input required type="number" v-model="producto.stock" class="form-control" placeholder="Ingrese Stock">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Precio</span>
              						</div>
              						<input required type="number" v-model="producto.precio" class="form-control" placeholder="Ingrese Precio">
            					</div>
            					<div class="form-group">
            						  <input type="submit" value="Guardar"  class="btn float-right nuevoProducto_btn">
            					</div>
        				</form>
                      <br>
                      <br>
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
  created(){

  },
  data () {
    return {
      datos: [],
      producto:  new Producto(),
      tipoProductos : [{name:"Celular"},
                       {name:"Tablet"},
                       {name:"Accesorio"},
                       {name:"Televisor"},
                       {name:"Laptop"},
                       {name:"Otros"}],
		}

  },
  mounted(){

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
      }).then(this.producto = new Producto()).then(this.$swal( 'Exito!','Nuevo Producto Añadido!','success'));

        }


}
}
</script>

<style>

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 410px;
background-color: rgba(0,0,0,0.5) !important;
}

input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
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

.nuevoProducto_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.nuevoProducto_btn:hover{
color: black;
background-color: white;
}



</style>
