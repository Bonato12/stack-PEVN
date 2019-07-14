<template>
  <div>
    </br>
    <div class="container">
        <div class="d-flex justify-content-left">
      		<div class="card animated fadeInDown">
        			<div class="card-header" style="background-color:#FFD700;">
                <h2 style="text-align:center; color:black;">
                  <i class="fas fa-mobile-alt"></i>
                   Nuevo Producto
                 </h2>
        			</div>
                </hr style="color:black;">
        			<div class="card-body" >
                    <p v-if="errors.length">
                      <ul  class="list-group" v-for="error in errors">
                          <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                            {{ error }}
                          </li>
                          <br>
                      </ul>
                    </p>
            				<form @submit.prevent="nuevoProducto()" style="width:780px; margin-top:-20px; margin:0px auto;">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Modelo</span>
              						</div>
              						<input required type="text" v-model="producto.modelo" class="form-control" placeholder="Ingrese Modelo">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Marca</span>
              						</div>
              						<input required type="text" v-model="producto.marca" class="form-control" placeholder="Ingrese Marca">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Descripcion</span>
              						</div>
              						<textarea required type="text" v-model="producto.descripcion" class="form-control" placeholder="Ingrese Descripcion"></textarea>
            					</div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Tipo </span>
              						</div>
                          <select required class="form-control" v-model="producto.tipoProducto" placeholder="Elige un Tipo Producto">
                            <option  disabled selected>Elige un Tipo Producto</option>
                            <option  v-for="item in tipoProductos">{{ item.name }}</option>
                         </select>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Stock</span>
              						</div>
              						<input required type="number" min="0" v-model.number="producto.stock" class="form-control" placeholder="Ingrese Stock">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Precio</span>
              						</div>
              						<input required type="number" min="0" v-model="producto.precio" class="form-control" placeholder="Ingrese Precio">
            					</div>
                      <br>
                        <div class="d-flex justify-content-end">
                          <router-link class="btn btn-info" to="/HomeProducto" tag="button" title="Volver a HomeProducto">
                              <i class="fas fa-arrow-left"></i>
                                Volver
                          </router-link>
                          <button type="submit" class="btn btn-success" title="Guardar Producto">
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                          </button>
                      </div>
        				</form>
        			</div>
      		</div>
      	</div>
   </div>
  <br> 
  </div>
</template>

<script>
import axios from 'axios'
import { alertSucessProducto,alertCompletarCampos,alertWarningCompletarCampos } from '../../assets/sweetAlert.js'
import Producto from '../../models/Producto';


export default {
  created(){

  },
  data () {
    return {
      producto:  new Producto(),
      errors: [],
      tipoProductos : [{name:"Celular"},
                       {name:"Tablet"},
                       {name:"Accesorio"},
                       {name:"Laptop"},
                       {name:"Repuesto"},
                       {name:"Otros"}]
		}

  },
  mounted(){

  },
  methods: {

      nuevoProducto(){
              this.errors = [];
              if (!this.producto.modelo){
                this.errors.push('Modelo Vacio');
              }
              if (!this.producto.marca){
                this.errors.push('Marca Vacia');
              }
              if (!this.producto.descripcion){
                this.errors.push('Descripcion Vacia');
              }
              if (!this.producto.tipoProducto){
                this.errors.push('Tipo Producto Vacia');
              }
              if (!this.producto.stock){
                this.errors.push('Stock Vacio');
              }
              if (!this.producto.precio){
                this.errors.push('Precio Vacio');
              }
              var _this = this;
              if(this.errors.length == 0 ){
                    console.log(this.producto);
                    axios.post('http://localhost:3000/producto',
                    this.producto, // the data to posthttp://localhost:3000/producto
                    { headers: {
                      'Access-Control-Allow-Origin': 'http://localhost:3000/producto',
                      'Content-Type': 'application/json',
                    },
                  }).then(function(response){
                    console.log(response);
                    if (response.data == "OK"){
                      alertSucessProducto();
                      _this.producto = new Producto();
                    }else {
                       if (response.data.length > 0) {
                         for (var i = 0; i < response.data.length ; i++) {
                                _this.errors.push(response.data[i].msg);
                          }
                       }else {
                           _this.errors.push(response.data.msg);
                       }

                    }
                  })
              }

          }
  }
}
</script>

<style scoped>

select{
  display: block !important;
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


.input-group-prepend span{
width: 120px;
background-color: #FFD700;
color: black;
border: none;


}

.input-group{
  width: 700px;
}

input:focus{
  background-color: white;
}

.card{
height: auto;
margin-top: 50px;
margin-bottom: auto;
width: 1650px;
background-color: rgb(70,90,101);
border-radius: 5px;
border:1px solid;
margin:0 auto;
}

button{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  /*background-color: #FFD700  !important;*/
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black;
}

button:hover{
     background-color: white  !important;
     color: black;
}

/*Sirve para desabilitar las flechas en los inputs numer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

form select:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;

}

form select:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;


}


form input:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;

}


form input:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;

}

.form-control {
    border: 0;
    box-shadow: none;
}


form textarea:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;
}


form textarea:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;

}



.formulario{
    width: 1050px;
    height: auto;
    margin: 50px auto;
    display: flex;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;

}

/* Informacion de Contacto*/

.info::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #FEC404;
    opacity: 0.9;

}

.info{
    width: 38%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center center;
    background-image: url('https://i0.wp.com/brunettebraid.com/wp-content/uploads/2017/11/nuevos-wallpapers-celular-noviembre-2.jpg');


}

.titulo{
    position: relative;
    z-index: 2;
    color: #fff;
}


.titulo span{
    font-size: 100px;
    display: block;
    text-align: center;
    margin-bottom: 15px;
}

/* Formulario de contacto*/
form{
    width: 62%;
    padding: 30px 40px;
}


</style>
