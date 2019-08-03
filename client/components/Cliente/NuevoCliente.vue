<template>
  <div>
    <br>
    <br>
    <div class="container">
      <div class="d-flex justify-content-left">
        <div class="card animated fadeInDown">
            <div class="card-header" style="background-color:#FFD700;">
              <h2 style="text-align:center; color:black;">
                  <i class="fas fa-user"></i>
                  Nuevo Cliente
               </h2>
            </div>
            <div class="card-body" >
                  <p v-if="errors.length">
                    <ul  class="list-group" v-for="error in errors">
                        <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                          {{ error }}
                        </li>
                        <br>
                    </ul>
                  </p>
                  <notifications group="foo" position="top left" />
                  <form @submit.prevent="nuevoCliente()" style="width:780px; margin-top:-25px; margin:0px auto;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input  type="number"  v-model="cliente.dni"  class="form-control" placeholder="Ingrese Dni" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input   type="text"  v-model="cliente.nombre"  class="form-control" placeholder="Ingrese Nombre" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input  type="text"  v-model="cliente.apellido"  class="form-control" placeholder="Ingrese Apellido" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input  type="text" v-model="cliente.direccion"  class="form-control" placeholder="Ingrese Direccion" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input    type="number"  v-model="cliente.telefono"  class="form-control" placeholder="Ingrese Telefono" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                        <input  type="email"  v-model="cliente.mail"  class="form-control" placeholder="Ingrese Mail" >
                    </div>
                    <br>
                      <div class="d-flex justify-content-end">
                        <router-link to="/HomeCliente" tag="button" class="btn"  title="Volver a HomeCliente" >
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                        <button type="submit" class="btn"  title="Guardar Cliente" >
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                    </div>
              </form>
              <div>
              </div>
            </div>
        </div>
      </div>
  </div>
  <br>
</div>
</template>

<script>

import axios from 'axios'
import { alertSucessCliente,alertCompletarCampos,alertError } from '../../assets/sweetAlert.js'
import Cliente from '../../models/Cliente';

export default {
  created(){

  },
  data () {
    return {
      cliente: new Cliente(),
      errors: []
		}
  },
  mounted(){


  },
  methods: {
            nuevoCliente(){
                    this.errors = [];
                    if (!this.cliente.dni){
                      this.errors.push('Dni no puede ser Vacio');
                    }
                    if (!this.cliente.nombre){
                      this.errors.push('Nombre Vacio');
                    }
                    if (!this.cliente.apellido){
                      this.errors.push('Apellido Vacio');
                    }
                    if (!this.cliente.direccion){
                      this.errors.push('Direccion Vacia');
                    }
                    if (!this.cliente.telefono){
                      this.errors.push('Telefono Vacio');
                    }
                    if (!this.cliente.mail){
                      this.errors.push('Mail Vacio');
                    }
                    var _this = this;
                    if (this.errors.length == 0){
                            axios.post('http://localhost:3000/cliente',
                            this.cliente,
                            { headers: {
                              'Content-Type': 'application/json',
                            },
                          }).then(function(response){
                              console.log(response);
                              if (response.data == "OK"){
                                alertSucessCliente();
                                _this.cliente = new Cliente();

                              }else {
                                 if (response.data.length > 0) {
                                   for (var i = 0; i < response.data.length ; i++) {
                                          _this.errors.push(response.data[i].msg);
                                    }
                                 }else {
                                     _this.errors.push(response.data.msg);
                                 }
                              }
                            }).catch(function(error){
                              console.log(error);
                            })
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

.btn{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700  !important;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black;
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

form {
    width: 62%;
    padding: 30px 40px;
}

</style>
