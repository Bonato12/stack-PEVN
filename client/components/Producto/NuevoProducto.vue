<template>
  <div>
    <div class="container">
      <!--
        <div class="d-flex justify-content-center">
      		<div class="card">
        			<div class="card-header">
                <h3 style="text-align:center; color:white;"> Nuevo Producto </h3>
        			</div>
        			<div class="card-body animated fadeInDown" >
            				<form @submit.prevent="nuevoProducto()">
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
              							<span class="input-group-text">Tipo Producto</span>
              						</div>
                          <select required class="form-control" v-model="producto.tipoProducto">
                            <option disabled>Elige un Tipo Producto</option>
                            <option  v-for="item in tipoProductos">{{ item.name }}</option>
                         </select>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Stock</span>
              						</div>
              						<input required type="number" min="0" v-model="producto.stock" class="form-control" placeholder="Ingrese Stock">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Precio</span>
              						</div>
              						<input required type="number" min="0" v-model="producto.precio" class="form-control" placeholder="Ingrese Precio">
            					</div>
                      <br>
            					<div class="form-group">
                        <button type="submit"  title="Guardar Producto" style="background-color:#fec400">
                            <i class="far fa-save fa-1x"></i>
                            Guardar
                        </button>
                        <router-link to="/HomeProducto" tag="button" title="Volver a HomeProducto" style="background:white;">
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>


            					</div>
        				</form>
                      <br>
                      <br>
        			</div>
      		</div>
      	</div>
      -->
      <section class="formulario animated fadeInDown">
          <section class="info">
              <section class="titulo">
                  <span class="fas fa-mobile-alt"></span>
                  <p style="font-size:25px;">NUEVO PRODUCTO</p>
              </section>
          </section>
          <form @submit.prevent="nuevoProducto()">

                    <div class="input-field col s6">
                      <input required id="modelo"  v-model="producto.modelo" type="text" class="validate">
                      <label for="modelo">Modelo</label>
                    </div>
                    <div class="input-field col s6">
                      <input required id="marca"  v-model="producto.marca" type="text" class="validate">
                      <label for="marca">Marca</label>
                    </div>
                    <div class="input-field col s6">
                      <input required id="descripcion"  v-model="producto.descripcion" type="text" class="validate">
                      <label for="descripcion">Descripcion</label>
                    </div>
                    <div class="row" style="padding-left:20px; width:580px;">
                        <div class="input-field col s6">
                          <input required id="stock"  v-model="producto.stock" type="text" class="validate">
                          <label for="stock">Stock</label>
                        </div>
                        <div class="input-field col s6">
                          <input required id="precio"  v-model="producto.precio" type="text" class="validate">
                          <label for="precio">Precio</label>
                        </div>
                    </div>

                <br>
                <div class="form-group">
                  <button type="submit"  title="Guardar Producto">
                      <i class="far fa-save fa-1x"></i>
                      Guardar
                  </button>
                  <router-link to="/HomeProducto" tag="button" title="Volver a HomeProducto">
                      <i class="fas fa-arrow-left fa-1x"></i>
                      Volver
                  </router-link>
                  <br>
                </div>
              <br>
          </form>
      </section>
  </div>
  <br>

  </br>
  </div>
</template>

<script>
import axios from 'axios'
import { alertSucessProducto,alertCompletarCampos } from '../../assets/sweetAlert.js'
import Producto from '../../models/Producto';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'

export default {
  created(){

  },
  data () {
    return {
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
            if(this.producto.modelo && this.producto.marca && this.producto.descripcion && this.producto.tipoProducto && this.producto.stock && this.producto.precio ){
                  console.log(this.producto);
                  axios.post('http://localhost:3000/producto',
                  this.producto, // the data to posthttp://localhost:3000/producto
                  { headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/producto',
                    'Content-Type': 'application/json',
                  },
                  }).then(this.producto = new Producto()).then(alertSucessProducto());
            }else{
                alertCompletarCampos();
            }

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


.input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border: none;

}

.card{
height: 510px;
margin-top: 30px;
margin-bottom: auto;
width: 850px;
background-color: rgba(0,0,0,0.5) ;
}

button{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:150px;
  height:50px;
  margin-top:-10px;
  border:none;
  background-color: #00c853  !important;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 10px;
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

}

form select:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;


}


form input:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
}


form input:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
}

.form-control {
    border: 0;
    box-shadow: none;
    border-bottom: 2px solid gray;

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
    height: 450px;
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
