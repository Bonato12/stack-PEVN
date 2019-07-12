<template>
  <div id="app">
    <br>
    <div class="container">
      <div class="d-flex justify-content-left">
        <div class="card animated fadeInDown">
            <div class="card-header" style="background-color:#FFD700; ">
              <h2 style="text-align:center; color:black;">
                  <i class="fas fa-user-cog"></i>
                  Editar Cliente
               </h2>
            </div>
            </hr style="color:black;">
            <div class="card-body" >
              <p v-if="errors.length">
                <ul  class="list-group" v-for="error in errors">
                    <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                      {{ error }}
                    </li>
                    <br>
                </ul>
              </p>
              <form @submit.prevent="editarCliente()" style="width:780px; margin-top:-20px; margin:0px auto;">
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Dni</span>
                    </div>
                    <input  type="number" v-model="cliente.dni"  class="form-control" placeholder="Ingrese Dni" >
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Nombre</span>
                    </div>
                    <input  type="text"  v-model="cliente.nombre"  class="form-control" placeholder="Ingrese Nombre" >
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Apellido</span>
                    </div>
                    <input   type="text"  v-model="cliente.apellido"  class="form-control" placeholder="Ingrese Apellido" >
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
                    <input   type="number"  v-model="cliente.telefono"  class="form-control" placeholder="Ingrese Telefono" >
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Mail</span>
                    </div>
                    <input type="email"  v-model="cliente.mail"  class="form-control" placeholder="Ingrese Mail" >
                </div>
                <br>
                  <div style="margin-left:250px;">
                    <button type="submit" class="btn btn-success"  title="Guardar Cliente" >
                          <i class="far fa-save fa-1x"></i>
                          Guardar
                    </button>
                    <router-link to="/HomeCliente" tag="button" class="btn btn-info"  title="Volver a HomeCliente" >
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
import { alertEdit,alertEditSucessCliente,alertCompletarCampos } from '../../assets/sweetAlert.js';
import Cliente from '../../models/Cliente';


export default {
  name: 'app',
  created(){
    this.rellenarCliente();
  },
  data () {
    return {
      idc: this.$route.params.id,
      datos: [],
      cliente:  new Cliente(),
      errors: []
		}
  },
  mounted(){

  },
  computed:{

  },
  methods: {
      rellenarCliente(){
         axios.get('http://localhost:3000/cliente/'+this.idc).then((response) =>{
           console.log(response.data);
           this.cliente = new Cliente(this.idc,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
         });

      },
      editarCliente(){
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
            axios.put('http://localhost:3000/cliente/'+ this.idc,
                this.cliente,
                { headers: {
                  'Content-Type': 'application/json',
                }
            }).then((data) => console.log(data)).then(alertEditSucessCliente());
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
  height:40px;
  margin-top:-10px;
  border:none;
  /*background-color: #FFD700  !important;*/
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
