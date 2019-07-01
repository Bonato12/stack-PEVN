<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-left">
        <div class="card animated fadeInDown">
            <div class="card-header" style="background-color:#FFD700; ">
              <h2 style="text-align:center; color:black;">
                  <i class="fas fa-people-carry"></i>
                  Nuevo Proveedor
               </h2>
            </div>
              </hr style="color:black;">
            <div class="card-body" >
                  <form @submit.prevent="nuevoProveedor()" style="width:1025px;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input required type="number"  v-model="proveedor.dni"  class="form-control" placeholder="Ingrese Dni" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input required type="text"  v-model="proveedor.nombre"  class="form-control" placeholder="Ingrese Nombre" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input required type="text"  v-model="proveedor.apellido"  class="form-control" placeholder="Ingrese Apellido" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input required type="text" v-model="proveedor.direccion"  class="form-control" placeholder="Ingrese Direccion" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input required type="number"  v-model="proveedor.telefono"  class="form-control" placeholder="Ingrese Telefono" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                        <input required type="mail"  v-model="proveedor.mail"  class="form-control" placeholder="Ingrese Mail" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Descripcion</span>
                        </div>
                        <input required type="text"   v-model="proveedor.descripcion"  class="form-control" placeholder="Ingrese Descripcion" >
                    </div>
                    <br>
                      <div style="margin-left:250px;">
                        <button type="submit"  title="Guardar Proveedor" >
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                        <router-link to="/HomeProveedor" tag="button"  title="Volver a HomeProveedor" >
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
import { alertSucessProveedor,alertCompletarCampos } from '../../assets/sweetAlert.js'
import Proveedor from '../../models/Proveedor';


export default {
  created(){

  },
  data () {
    return {
      proveedor: new Proveedor()
		}
  },
  mounted(){


  },
  methods: {
    nuevoProveedor(){
            if (this.proveedor.dni && this.proveedor.nombre && this.proveedor.apellido && this.proveedor.direccion && this.proveedor.telefono && this.proveedor.mail && this.proveedor.descripcion){
              console.log(this.proveedor);
              axios.post('http://localhost:3000/proveedor',
              this.proveedor, // the data to posthttp://localhost:3000/cliente
              { headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000/proveedor',
                'Content-Type': 'application/json',
              },
              }).then(this.proveedor = new Proveedor()).then(alertSucessProveedor());
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
  height:45px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700  !important;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
}

button:hover{
     background-color: white  !important;
     /*color: white;*/
}


/*Sirve para desabilitar las flechas en los inputs numBer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}


/* Formulario de contacto*/
form {
    width: 62%;
    padding: 30px 40px;
}


</style>
