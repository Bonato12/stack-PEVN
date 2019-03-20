<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="card">
            <div class="card-header">
              <h3 style="text-align:center; color:white; ">Nuevo Proveedor </h3>
            </div>
            <div class="card-body animated fadeInDown">
                  <form @submit.prevent="nuevoProveedor()">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input required type="number" min="0"  v-model="proveedor.dni"  class="form-control" placeholder="Ingrese Dni">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input required  type="text" v-model="proveedor.nombre"   class="form-control" placeholder="Ingrese Nombre">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input required  type="text" v-model="proveedor.apellido"   class="form-control" placeholder="Ingrese Apellido">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input required type="text" v-model="proveedor.direccion"   class="form-control" placeholder="Ingrese Direccion">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input required type="number" min="0" v-model="proveedor.telefono"   class="form-control" placeholder="Ingrese Telefono">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                          <input required type="email" v-model="proveedor.mail"   class="form-control" placeholder="Ingrese Mail">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Descripcion</span>
                        </div>
                          <input required type="text" v-model="proveedor.descripcion" class="form-control" placeholder="Ingrese Descripcion">
                    </div>
                    <br>
                    <div class="form-group">
                        <button type="submit" style="background-color:#fec400">
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                        <router-link to="/HomeProveedor" tag="button" style="background:white;">
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                    </div>
              </form>
            </div>
        </div>
      </div>
  </div>
  </br>
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
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 850px;
background-color: rgba(0,0,0,0.5) !important;
}

button{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:200px;
  height:50px;
  margin-top:-10px;
  border:none;
  color:black;
  -webkit-transition:.5s;
  transition:.5s;
}


.proveedor_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.proveedor_btn:hover{
color: black;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

</style>
