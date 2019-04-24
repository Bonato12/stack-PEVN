<template>
  <div>
    <div class="container">
        <div class="d-flex justify-content-left">
      		<div class="card animated fadeInDown">
        			<div class="card-header" style="background-color:#FFD700; ">
                <h2 style="text-align:center; color:black;">
                  <i class="fas fa-mobile-alt"></i>
                   Nuevo Producto
                 </h2>
        			</div>
                </hr style="color:black;">
        			<div class="card-body" >
            				<form @submit.prevent="nuevoProducto()" style="width:1025px;">
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
                            <option disabled value="">Elige un Tipo Producto</option>
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
                        <div style="margin-left:250px;">
                          <button type="submit"  title="Guardar Producto" style="background-color:#fec400">
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                          </button>
                          <router-link to="/HomeProducto" tag="button" title="Volver a HomeProducto" style="background:white;">
                              <i class="fas fa-arrow-left"></i>
                                Volver
                          </router-link>
                          <!--
                          <div v-if="loading" class="d-flex justify-content-left mb-2">
                            <b-spinner label="Loading..."></b-spinner>
                          </div>
                        -->
                      </div>
        				</form>
        			</div>
      		</div>
      	</div>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
import { alertSucessProducto,alertCompletarCampos } from '../../assets/sweetAlert.js'
import Producto from '../../models/Producto';


export default {
  created(){

  },
  data () {
    return {
      loading:  false,
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
    isNumeric(n){
        var digito =  /^\d*$/;
        return digito.test(n);
    },
    nuevoProducto(){
            this.loading = true;
            console.log(this.isNumeric(this.producto.stock))
            if(this.producto.modelo && this.producto.marca && this.producto.descripcion && this.producto.tipoProducto && this.producto.stock && this.producto.precio ){
                  console.log(this.producto);
                  axios.post('http://localhost:3000/producto',
                  this.producto, // the data to posthttp://localhost:3000/producto
                  { headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/producto',
                    'Content-Type': 'application/json',
                  },
                }).then(this.producto = new Producto())
            }else{
                alertCompletarCampos();
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
  width: 950px;
}

input:focus{
  background-color: white;
}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 1100px;
background-color: rgb(70,90,101);
border: 1px solid;
border-radius: 5px;
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
  background-color: #FFD700  !important;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 10px;
}

button:hover{
     background-color: white  !important;
     /*color: white;*/
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
