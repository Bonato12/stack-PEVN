<template>
  <div>
    <br>
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
                  <form @submit.prevent="editarProveedor()" style="width:780px; margin-top:-30px; margin:0px auto;">
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
                      <button type="submit" class="btn"  title="Guardar Cliente" >
                            <i class="far fa-save fa-1x"></i>
                            Guardar
                      </button>
                      <router-link to="/HomeProveedor" tag="button" class="btn"  title="Volver a HomeCliente" >
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
