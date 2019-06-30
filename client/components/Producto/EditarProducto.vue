<template>
  <div>
    <div class="container">
        <div class="d-flex justify-content-left">
      		<div class="card animated fadeInDown">
        			<div class="card-header" style="background-color:#FFD700; ">
                <h3 style="text-align:center; color:black;">
                  <i class="fas fa-cog"></i>
                   Editar Producto
                 </h3>
        			</div>
                </hr style="color:black;">
        			<div class="card-body" >
            				<form @submit.prevent="editarProducto()">
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
              							<span class="input-group-text">Tipo</span>
              						</div>
                          <select required class="form-control" v-model="producto.tipoProducto">
                            <option disabled value="">Elige un Tipo Producto</option>
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
            					<div class="float-left">
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
        			</div>
      		</div>
      	</div>
   </div>
  </div>
</template>

<script>

import axios from 'axios'
import { alertEdit,alertEditSucessProducto,alertCompletarCampos } from '../../assets/sweetAlert.js';
import Producto from '../../models/Producto';


export default {
  name: 'app',
  created(){
    this.rellenarProducto();
  },
  data () {
    return {
      idp: this.$route.params.id,
      producto:  new Producto(),
      tipoProductos : [{name:"Celular"},
                       {name:"Tablet"},
                       {name:"Accesorio"},
                       {name:"Televisor"},
                       {name:"Laptop"},
                       {name:"Otros"}]
		         }
	},
  mounted(){

  },
  methods: {
      rellenarProducto(){
         axios.get('http://localhost:3000/producto/'+this.idp).then((response) =>{
           console.log(response.data);
           this.producto = new Producto(this.idp,response.data[0].modelo,response.data[0].marca,response.data[0].descripcion,response.data[0].tipoproducto,response.data[0].stock,response.data[0].precio);
         })
      },
      editarProducto(){
        if(this.producto.modelo && this.producto.marca && this.producto.descripcion && this.producto.tipoProducto && this.producto.stock && this.producto.precio){
           axios.put('http://localhost:3000/producto/'+ this.idp,
             this.producto,
             { headers: {
               'Content-Type': 'application/json',
             }
             }).then(alertEditSucessProducto());
        }else{
          alertCompletarCampos();
        }
      }
   }
}
</script>

<style scoped>
.input-group-prepend span{
  width: 120px;
  background-color: #FFC312;
  color: black;
  border:0 !important;
}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 1250px;
background-color: rgb(70,90,101);
border: 1px solid;
border-radius: 5px;
}

.input-group{
  width: 950px;
}

.editarProducto_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.editarProducto_btn:hover{
color: black;
background-color: white;
}

h1, h2 {
  font-weight: normal;
}

li {
  display: inline-block;
  margin: 0 10px;
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
