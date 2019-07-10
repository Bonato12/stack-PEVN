<template>
  <div id="app">
    <div class="container">
      <div class="d-flex justify-content-left">
        <div class="card animated fadeInDown">
            <div class="card-header" style="background-color:#FFD700; ">
              <h2 style="text-align:center; color:black;">
                  <i class="fa fa-cog"></i>
                  Editar Proveedor
               </h2>
            </div>
              </hr style="color:black;">
            <div class="card-body" >
                  <form @submit.prevent="editarProveedor()" style="width:1025px; margin-top:-25px;">
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
import Proveedor from '../../models/Proveedor';
import { alertEdit,alertEditSucessProveedor,alertCompletarCampos } from '../../assets/sweetAlert.js';

export default {
  name: 'app',
  created(){
    this.rellenarProveedor();
  },
  data () {
    return {
      idp: this.$route.params.id,
      proveedor:  new Proveedor(),
		}
  },
  mounted(){

  },
  methods: {
      rellenarProveedor(){
        console.log(this.idp);
        axios.get('http://localhost:3000/proveedor/'+this.idp).then((response) =>{
          console.log(response.data);
          this.proveedor = new Proveedor(this.idp,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail,response.data[0].descripcion);
        });
      },
      editarProveedor(){
            if (this.proveedor.dni && this.proveedor.nombre && this.proveedor.apellido && this.proveedor.direccion && this.proveedor.telefono && this.proveedor.mail && this.proveedor.descripcion){
                axios.put('http://localhost:3000/proveedor/'+ this.idp,
                this.proveedor,
                { headers: {
                    'Content-Type': 'application/json',
                }
                }).then(alertEditSucessProveedor());
            }else{
                alertCompletarCampos();
            }
      }
}
}
</script>

<style scoped>

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

h1, h2 {
  font-weight: normal;
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
