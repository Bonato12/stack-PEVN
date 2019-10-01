<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-left">
            <div class="card-body" >
                  <p v-if="errors.length">
                    <ul  class="list-group" v-for="error in errors">
                        <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                          {{ error }}
                        </li>
                        <br>
                    </ul>
                  </p>
                  <form @submit.prevent="nuevoCliente()" style="width:780px; margin-top:-25px; margin:0px auto;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input  type="number"  v-model="cliente.dni"  class="form-control" placeholder="Ingrese Dni" :class="{ 'is-invalid': submitted && $v.cliente.dni.$error }" >
                        <div v-if="submitted && !$v.cliente.dni.required.$error" class="invalid-feedback">
                              <span v-if="!$v.cliente.dni.required">El dni es requerido</span>
                              <span v-if="!$v.cliente.dni.maxLength">El Dni no puede tener mas de 10 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input   type="text"  v-model="cliente.nombre"  class="form-control" placeholder="Ingrese Nombre" :class="{ 'is-invalid': submitted && $v.cliente.nombre.$error }" >
                        <div v-if="submitted && !$v.cliente.nombre.required.$error" class="invalid-feedback">
                              <span v-if="!$v.cliente.nombre.required">Nombre is required</span>
                              <span v-if="!$v.cliente.nombre.maxLength">El Nombre no puede tener mas de 50 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input  type="text"  v-model="cliente.apellido"  class="form-control" placeholder="Ingrese Apellido" :class="{ 'is-invalid': submitted && $v.cliente.apellido.$error }" >
                        <div v-if="submitted && !$v.cliente.apellido.required.$error" class="invalid-feedback">
                              <span v-if="!$v.cliente.apellido.required">Apellido is required</span>
                              <span v-if="!$v.cliente.apellido.maxLength">El Apellido no puede tener mas de 50 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input  type="text" v-model="cliente.direccion"  class="form-control" placeholder="Ingrese Direccion" :class="{ 'is-invalid': submitted && $v.cliente.direccion.$error }" >
                        <div v-if="submitted && !$v.cliente.direccion.required.$error" class="invalid-feedback">
                              <span v-if="!$v.cliente.direccion.required">Telefono is required</span>
                              <span v-if="!$v.cliente.direccion.maxLength">El Telefono no puede tener mas de 10 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input  type="number"  v-model="cliente.telefono"  class="form-control" placeholder="Ingrese Telefono" :class="{ 'is-invalid': submitted && $v.cliente.telefono.$error }" >
                        <div v-if="submitted && !$v.cliente.telefono.required.$error" class="invalid-feedback">
                              <span v-if="!$v.cliente.telefono.required">Telefono is required</span>
                              <span v-if="!$v.cliente.telefono.maxLength">El Telefono no puede tener mas de 10 digitos</span>
                        </div>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                        <input  type="email"  v-model="cliente.mail"  class="form-control" placeholder="Ingrese Mail" :class="{ 'is-invalid': submitted && $v.cliente.mail.$error }">
                        <div v-if="submitted && !$v.cliente.telefono.required.$error" class="invalid-feedback">
                              <span v-if="!$v.cliente.mail.required">Mail is required</span>
                              <span v-if="!$v.cliente.mail.email">El Mail no tiene formato</span>
                        </div>
                    </div>
                    <br>
                    <div class="d-flex justify-content-end">
                      <router-link to="/HomeCliente" tag="button" class="btn btn-volver"  title="Volver a HomeCliente" >
                          <i class="fas fa-arrow-left"></i>
                            Volver
                      </router-link>
                      <div style="width:3px;"></div>
                      <button v-if="editCliente === false" type="submit" class="btn btn-guardar"  title="Guardar Cliente"  >
                            <i class="far fa-save fa-1x"></i>
                            Guardar
                      </button>
                      <button v-if="editCliente === true" type="submit" class="btn btn-guardar"  title="Guardar Cliente"  >
                            <i class="far fa-save fa-1x"></i>
                            Editar
                      </button>
                    </div>
                </form>
            </div>
      </div>
    </div>
</div>
</template>

<script>

import axios from 'axios'
import { alertSuccess, alertEditSuccess } from '../../assets/sweetAlert.js'
import Cliente from '../../models/Cliente';
import { required, email, minLength,maxLength, sameAs } from "vuelidate/lib/validators";

export default {
  created(){
    if (this.idc) {
        this.rellenarCliente();
    }
  },
  data () {
    return {
      cliente: new Cliente(),
      errors: [],
      submitted: false,
      idc: this.$route.params.id,
      editCliente: false
    }
  },
  validations: {
          cliente: {
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
                }
          }
    },
  
  methods: {
        rellenarCliente(){
          this.editCliente = true;
          axios.get('http://localhost:3000/cliente/'+this.idc).then((response) =>{
            console.log(response.data);
          this.cliente = new Cliente(this.idc,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
            }).catch(error=>{
              console.log(error);
            })
        },

            nuevoCliente(e){
                  this.errors = [];
                  this.submitted = true;
                  this.$v.$touch();
                  var _this = this;
                  if (this.$v.$invalid) {
                      return;
                  }
                  if  (this.editCliente == false){
                      axios.post('https://telnovo2000.herokuapp.com/cliente',
                      this.cliente,
                      { headers: {
                        'Content-Type': 'application/json',
                      },
                      }).then(function(response){
                        console.log(response);
                        if (response.data == "OK"){
                            _this.cliente = new Cliente();
                             alertSuccess();
                            _this.submitted = false;
                        }else {
                            _this.errors.push(response.data.msg);
                          
                        }
                      }).catch(function(error){
                        console.log(error);
                      })
                  }else{
                      axios.put('http://localhost:3000/cliente/'+ this.idc,
                      this.cliente,
                      { headers: {
                        'Content-Type': 'application/json',
                      }
                      }).then(function(response){
                          console.log(response);
                          if (response.data == "OK"){
                              alertEditSuccess();
                              _this.$router.push('/HomeCliente');
                          }else {
                              _this.errors.push(response.data.msg);
                          }
                        }).catch(error=>{
                          console.log(error);
                        })
                }   
            },   
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

.form-control:focus{
    border: none;
    box-shadow: none;
    border-color: none;

}

.form-control{
    border: none;
    box-shadow: none;
    border-color: none;

}

input:focus{
  background-color: white;
}

.container{
background-color: #2A363B;

}

.card{
height: auto;
margin-top: 50px;
margin-bottom: auto;
width: 1650px;
border-radius: 5px;
border:1px solid;
margin:0 auto;
}

.btn-guardar{
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

.btn-volver{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #5bc0de;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black;
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