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
                  <form @submit.prevent="nuevoCliente()" style="width:780px; margin-top:-25px; margin:0px auto;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input required type="number" v-model="cliente.dni"  class="form-control" placeholder="Ingrese Dni" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input required  type="text"  v-model="cliente.nombre"  class="form-control" placeholder="Ingrese Nombre" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input required  type="text"  v-model="cliente.apellido"  class="form-control" placeholder="Ingrese Apellido" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input required type="text" v-model="cliente.direccion"  class="form-control" placeholder="Ingrese Direccion" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input required  type="number"  v-model="cliente.telefono"  class="form-control" placeholder="Ingrese Telefono" >
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                        <input required type="email"  v-model="cliente.mail"  class="form-control" placeholder="Ingrese Mail" >
                    </div>
                    <br>
                      <div style="margin-left:250px;">
                        <button type="submit" class="btn"  title="Guardar Cliente" >
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                        <router-link to="/HomeCliente" tag="button" class="btn"  title="Volver a HomeCliente" >
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                    </div>
              </form>
              <div>
                <transition v-if="showModal" class="animation fadeInRight" name="modal">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-container animated fadeInRight">
                        <div class="modal-header" style="background-color:#424242;">
                          <slot name="header">
                            <img src="../../assets/invalid.png">
                            <button class="modal-default-button" @click="hideModal()">
                             <i class="far fa-times-circle"></i>
                            </button>
                          </slot>
                        </div>
                        <div class="modal-body" style="background-color:#f1f8e9;">
                          <p v-if="errors.length">
                            <h4 style="margin-left:10px;">Errores:</h4>
                            <ul  class="list-group">
                                <li class="list-group-item" v-for="error in errors">{{ error }}</li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
        </div>
      </div>
  </div>
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
      errors: [],
      showModal: false,

		}
  },
  mounted(){


  },
  methods: {
            nuevoCliente(){
                    this.errors = [];

                    if (!this.cliente.dni){
                      this.errors.push('Dni Vacio');
                    }else {
                      if(this.isInteger(this.cliente.dni) == false){
                           this.errors.push('Dni debe ser un numero entero');
                      }
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
                    }else {
                        if(this.isInteger(this.cliente.telefono) == false){
                             this.errors.push('Telefono debe ser un numero entero');
                        }
                    }
                    if (!this.cliente.mail){
                      this.errors.push('Mail Vacio');
                    }

                    if (this.errors.length == 0){
                            axios.post('http://localhost:3000/cliente',
                            this.cliente, // the data to posthttp://localhost:3000/cliente
                            { headers: {
                              'Access-Control-Allow-Origin': 'http://localhost:3000/cliente',
                              'Access-Control-Allow-Methods': 'POST',
                              'Content-Type': 'application/json',
                            },
                            }).then(function(data){
                              console.log(data)
                              if (data.data.status == 200){
                                alertSucessCliente();
                              }else {
                                alertError();
                              }
                            }).then(this.cliente = new Cliente());
                    }else {
                      this.showModal = true;
                    }
                  },
          isInteger(valor) {
                var er = /^-?[0-9]+$/;
                return er.test(valor);
          },
          hideModal(){
            this.showModal = false;
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
width: 900px;
background-color: rgb(70,90,101);
border-radius: 5px;
border:none;
margin:0 auto;
}

.btn{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:50px;
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

.formulario{
    width: 1050px;
    height: 525px;
    margin: 40px auto;
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


form {
    width: 62%;
    padding: 30px 40px;
}



.modal-mask {
  position: fixed;
  z-index: 9998;
  float: right;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  height: auto;
  margin-left: 900px;
  background-color: #fff;
  transition: all .3s ease;
  border-radius: 8px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}




</style>
