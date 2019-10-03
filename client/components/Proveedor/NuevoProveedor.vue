<template>
  <div>
    <br>
    <br>
    <div class="container">
      <div class="d-flex justify-content-left">
        <div class="card animated fadeInDown">
            <div class="card-header" style="background-color:#FFD700; ">
              <h2 style="text-align:center; color:black;">
                  <i class="fas fa-people-carry"></i>
                  Nuevo Proveedor
               </h2>
            </div>
            <div class="card-body">
                  <p v-if="errors.length">
                    <ul  class="list-group" v-for="error in errors">
                        <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                          {{ error }}
                        </li>
                        <br>
                    </ul>
                  </p>
                 <form @submit.prevent="nuevoProveedor()" style="width:780px; margin-top:-25px; margin:0px auto;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input  type="number"  v-model="proveedor.dni"  class="form-control" placeholder="Ingrese Dni" :class="{ 'is-invalid': submitted && $v.proveedor.dni.$error }" >
                        <div v-if="submitted && !$v.proveedor.dni.required.$error" class="invalid-feedback">
                              <span v-if="!$v.proveedor.dni.required">El dni es requerido</span>
                              <span v-if="!$v.proveedor.dni.maxLength">El Dni no puede tener mas de 10 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input   type="text"  v-model="proveedor.nombre"  class="form-control" placeholder="Ingrese Nombre" :class="{ 'is-invalid': submitted && $v.proveedor.nombre.$error }" >
                        <div v-if="submitted && !$v.proveedor.nombre.required.$error" class="invalid-feedback">
                              <span v-if="!$v.proveedor.nombre.required">Nombre is required</span>
                              <span v-if="!$v.proveedor.nombre.maxLength">El Nombre no puede tener mas de 50 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input  type="text"  v-model="proveedor.apellido"  class="form-control" placeholder="Ingrese Apellido" :class="{ 'is-invalid': submitted && $v.proveedor.apellido.$error }" >
                        <div v-if="submitted && !$v.proveedor.apellido.required.$error" class="invalid-feedback">
                              <span v-if="!$v.proveedor.apellido.required">Apellido is required</span>
                              <span v-if="!$v.proveedor.apellido.maxLength">El Apellido no puede tener mas de 50 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input  type="text" v-model="proveedor.direccion"  class="form-control" placeholder="Ingrese Direccion" :class="{ 'is-invalid': submitted && $v.proveedor.direccion.$error }" >
                        <div v-if="submitted && !$v.proveedor.direccion.required.$error" class="invalid-feedback">
                              <span v-if="!$v.proveedor.direccion.required">Telefono is required</span>
                              <span v-if="!$v.proveedor.direccion.maxLength">El Telefono no puede tener mas de 10 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input  type="number"  v-model="proveedor.telefono"  class="form-control" placeholder="Ingrese Telefono" :class="{ 'is-invalid': submitted && $v.proveedor.telefono.$error }" >
                        <div v-if="submitted && !$v.proveedor.telefono.required.$error" class="invalid-feedback">
                              <span v-if="!$v.proveedor.telefono.required">Telefono is required</span>
                              <span v-if="!$v.proveedor.telefono.maxLength">El Telefono no puede tener mas de 10 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                        <input  type="email"  v-model="proveedor.mail"  class="form-control" placeholder="Ingrese Mail" :class="{ 'is-invalid': submitted && $v.proveedor.mail.$error }">
                        <div v-if="submitted && !$v.proveedor.mail.required.$error" class="invalid-feedback">
                              <span v-if="!$v.proveedor.mail.required">Mail is required</span>
                              <span v-if="!$v.proveedor.mail.email">El Mail no tiene formato</span>
                        </div>
                    </div>
                     <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Descripcion</span>
                        </div>
                        <input  type="text"  v-model="proveedor.descripcion"  class="form-control" placeholder="Ingrese Descripcion">
                        
                    </div>
                    <br>
                    <div class="d-flex justify-content-end">
                      <router-link to="/HomeProveedor" tag="button" class="btn btn-volver"  title="Volver a HomeProveedor" >
                          <i class="fas fa-arrow-left"></i>
                            Volver
                      </router-link>
                      <div style="width:3px;"></div>
                      <button type="submit" class="btn btn-guardar"  title="Guardar Proveedor"  >
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
import { alertSuccess } from '../../assets/sweetAlert.js'
import Proveedor from '../../models/Proveedor';
import { required, email, minLength,maxLength  } from "vuelidate/lib/validators";


export default {
  created(){

  },
  data () {
    return {
      proveedor: new Proveedor(),
      errors: [],
      submit: false
		}
  },
  validations: {
          proveedor: {
                dni: { 
                  required,
                  maxLength: maxLength(10)  
                },
                nombre:{
                   required,
                   maxLength: maxLength(50)  
                },
                apellido:{
                   required,
                   maxLength: maxLength(50)  
                },
                direccion:{
                   required,
                   maxLength: maxLength(50)
                },
                 telefono:{
                   required,
                   maxLength: maxLength(50)
                },
                mail:{
                  required,
                  email
                },
                descripcion:{
                  required
                }
          }
    },
    methods: {
      nuevoProveedor(){
        this.errors = [];
        var _this = this;
        this.submitted = true;
        this.$v.$touch();
        var _this = this;
        if (this.$v.$invalid) {
            return;
        }
        console.log(this.proveedor);
        axios.post('http://localhost:3000/proveedor',
        this.proveedor,
        { headers: {
          'Content-Type': 'application/json',
        },
        }).then(function(response){
            console.log(response);
            if (response.data == "OK"){
              alertSuccess();
              _this.proveedor = new Proveedor();
              _this.submitted = false;
            }else {
              _this.errors.push(response.data.msg);
            }
          }).catch(error=>{
            console.log(error);
          });
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
background-color: #2A363B;
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
     color: black;

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
