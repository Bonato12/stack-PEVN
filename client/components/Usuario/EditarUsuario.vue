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
                  Editar Usuario
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
                  <form @submit.prevent="registrar()" style="width:700px; margin-top:-25px; margin:0px auto;">
                    <br>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Usuario</span>
                        </div>
                        	<input required disabled  type="email" v-model="user" class="form-control" placeholder="Ingrese Usuario">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Rol</span>
                        </div>
                        <select required class="form-control" v-model="rol" placeholder="Elige un Tipo Producto">
                          <option  disabled selected>Elige un Rol</option>
                          <option  v-for="option in options" v-bind:value="option.value" >{{ option.text }}</option>
                       </select>
                    </div>
                    <br>
                      <div class="d-flex justify-content-end">
                        <router-link to="/HomeUsuario" tag="button" class="btn btn-info"  title="Volver a HomeCliente" >
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                        <button type="submit" class="btn btn-success"  title="Guardar Usuario" >
                              <i class="far fa-save fa-1x"></i>
                              Editar
                        </button>
                    </div>
                    <br>
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
import firebase from 'firebase'
import Usuario from '../../models/Usuario';

export default {
  created(){
    this.getIdUsuario();
  },
  data () {
    return {
      usuario : new Usuario(),
      idUsuario: this.$route.params.id,
      errors: [],
      user: '',
      rol: '',
      options: [
            { text: 'ADMINISTRADOR', value: 1 },
            { text: 'REPARADOR', value: 2 },
      ]
    }
  },
 
  methods: {
     getIdUsuario(){
            alert(this.idUsuario);
            axios.get('http://localhost:3000/usuario/'+this.idUsuario).then((response) =>{
            console.log(response);
            this.user = response.data[0].mail;
            this.rol = response.data[0].rol;
            }).catch(error=>{
              console.log(error);
            })
        },

    editarUsuario(){
          console.log(this.rol)        
              axios.put('http://localhost:3000/usuario/'+this.usuario).then(response=>{
                if (response.data == "OK"){
                  alert("Registro Exitoso");
                }
              })
              .catch((error)=> {
              console.log(error);
              this.$swal.fire({
                  type: 'error',
                  title: 'Error',
                  text: error,
                });
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
