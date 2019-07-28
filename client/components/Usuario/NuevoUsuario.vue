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
                  <form @submit.prevent="nuevoCliente()" style="width:780px; margin-top:-25px; margin:0px auto;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Usuario</span>
                        </div>
                        	<input required  type="email" v-model="usuario" class="form-control" placeholder="Ingrese Usuario">
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
                          <option  disabled selected>Elige un Rol/option>
                          <option  v-for="item in roles">{{ item.name }}</option>
                       </select>
                    </div>
                    <br>
                      <div class="d-flex justify-content-end">
                        <router-link to="/HomeCliente" tag="button" class="btn btn-info"  title="Volver a HomeCliente" >
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                        <button type="submit" class="btn btn-success"  title="Guardar Cliente" >
                              <i class="far fa-save fa-1x"></i>
                              Registrar
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
import firebase from 'firebase'

export default {
  created(){

  },
  data () {
    return {
      usuario: '',
      password: '',
      password1: '',
      uuid: '',
      perfil: '',
      errors: [],
      roles : [{name:"ADMINISTRADOR", value: 0},
               {name:"REPARADOR", value: 1}]
    }


		}
  },
  mounted(){

  },
  methods: {
    registrar(){
          if (this.password ==  this.password1){
              firebase.auth().createUserWithEmailAndPassword(this.usuario,this.password).
              then((response)=>{
                    console.log(response.user.uid)
                    this.uuid == response.user.uid
                    this.perfil = 2;
                    axios.post('http://localhost:3000/usuario',
                    {
                    usuario: this.usuario,
                    contraseña: this.password,
                    uuid: response.user.uid,
                    perfil: this.perfil
                  }).then(this.$router.replace('/Login'))
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

html,body{
background-color: rgb(70,90,101);
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
}

.container{
height: 100%;
align-content: center;

}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 450px;
background-color: black;
border-radius: 5px;
}

.card-header h3{
color: white;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.registrar_btn{
color: black;
background-color: #FFC312;
}

.registrar_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}

</style>
