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
                  Nuevo Usuario
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
                        	<input required  type="email" v-model="user" class="form-control" placeholder="Ingrese Usuario">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Contraseña</span>
                        </div>
                        <input  type="password" v-model="password" class="form-control" placeholder="Ingrese Contraseña" pattern=".{6,}"   required title="Debe tener 6 Caracteres como Minimo">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Contraseña</span>
                        </div>
                        <input  type="password" v-model="password1" class="form-control" placeholder="Ingrese Otra Vez la Contraseña" pattern=".{6,}"   required title="Debe tener 6 Caracteres como Minimo">
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
                              Registrar
                        </button>
                    </div>
                    <br>
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
import firebase from 'firebase'
import Usuario from '../../models/Usuario';

export default {
  created(){

  },
  data () {
    return {
      usuario : new Usuario(),
      user: '',
      password: '',
      password1: '',
      uuid: '',
      rol: '',
      errors: [],
      options: [
      { text: 'ADMINISTRADOR', value: 1 },
      { text: 'REPARADOR', value: 2 },
      ]
    }
  },
  mounted(){

  },
  methods: {
    registrar(){
          console.log(this.rol)
          if (this.password ==  this.password1){
                    this.usuario.mail = this.user
                    this.usuario.password = this.password
                    this.usuario.rol = this.rol
                    axios.post('http://localhost:3000/usuario',this.usuario).then(response=>{
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
              })
          }else {
            this.$swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Las Contraseñas no Coinciden',
              });
          }
    }
}
}
</script>

<style  scoped>

@import url('https://fonts.googleapis.com/css?family=Numans');

select{
  display: block !important;
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
background-color: #2A363B;
border-radius: 5px;
border:1px solid;
margin:0 auto;
}

button{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:130px;
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

/*Sirve para desabilitar las flechas en los inputs numer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.form-control {
    border: 0;
    box-shadow: none;
}


</style>
