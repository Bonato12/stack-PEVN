<template>
  <div>
    <div class="container">
        <br>
        <br>
        <br>
        <br>
      	<div class="d-flex justify-content-center h-100">
      		<div class="card">
        			<div class="card-header">
                <img src="./LogoTelnovo.png" class="input-group form-group" >
        			</div>
        			<div class="card-body">
            				<form @submit.prevent="registrar()">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-user"></i></span>
              						</div>
              						<input required  type="mail" v-model="usuario" class="form-control" placeholder="Ingrese Usuario">
            					</div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-key"></i></span>
              						</div>
              						<input  type="password" v-model="password" class="form-control" placeholder="Ingrese Contraseña" pattern=".{6,}"   required title="Debe tener 6 Caracteres como Minimo">
            					</div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-key"></i></span>
              						</div>
                          <input  type="password" v-model="password1" class="form-control" placeholder="Ingrese Otra Vez la Contraseña" pattern=".{6,}"   required title="Debe tener 6 Caracteres como Minimo">
            					</div>
            					<div class="form-group">
                          <button type="submit" class="btn float-right registrar_btn" title="Registrar">
                                <i class="fas fa-user-plus fa-1x"></i>
                                Registrar
                          </button>
            					</div>
                      <div class="form-group" style="float:left; padding-top:10px;">
                        <router-link to="/Login" style="color: #FFC312;">Volver a Login</router-link>
            					</div>
        				</form>
        			</div>
        			<div class="card-footer">
            				<div class="d-flex justify-content-center links">

            				</div>
            				<div class="d-flex justify-content-center">

            				</div>
        			</div>
      		</div>
      	</div>
</div>
  </br>
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
      password1: ''

		}
  },
  mounted(){

  },
  methods: {
    registrar(){
          if (this.password ==  this.password1){
              firebase.auth().createUserWithEmailAndPassword(this.usuario,this.password).
              then((response)=>{
                    console.log(response);
                    alert("Exitoso Registro");
                    this.$router.replace('/Login');
              })
              .catch((error)=> {
              console.log(error);
              this.$swal.fire({
                  type: 'error',
                  title: 'Error',
                  text: error,
                });
              });
              axios.post('http://localhost:3000/usuario',
              {
              usuario: this.usuario,
              contraseña: this.password
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

<style>
/*
body{
  background-image: url('./TELNOVO.png');
  background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
}
*/
@import url('https://fonts.googleapis.com/css?family=Numans');

html,body{
background-image: url('./background.jpg');
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
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
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

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
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
