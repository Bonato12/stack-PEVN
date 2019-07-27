<template>
  <div>
    <div class="container">
        <br>
        <br>
      	<div class="d-flex justify-content-center animated fadeIn">
      		<div class="card">
        			<div class="card-header">
                <img src="../../assets/LogoTelnovo.png" class="input-group form-group" >
        			</div>
        			<div class="card-body">
            				<form @submit.prevent="login()">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-user"></i></span>
              						</div>
              						<input required type="email" v-model="usuario" class="form-control" placeholder="Ingrese Usuario">
            					</div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-key"></i></span>
              						</div>
              						<input required type="password" v-model="password" class="form-control" placeholder="Ingrese Password">
            					</div>
                      <div class="form-group">
                          <button type="submit" class="btn float-right login_btn" title="Login">
                                <i class="fas fa-sign-in-alt fa-1x"></i>
                                Login
                          </button>
            					</div>
                    </form>
        			</div>
        			<div class="card-footer">
            				<div class="d-flex justify-content-center links">
                      <div class="form-group">
                          <div class="d-flex justify-content-end social_icon">
                    					<span><i class="fab fa-facebook-square" v-on:click="loginFacebook()"></i></span>
                    					<span><i class="fab fa-google-plus-square" v-on:click="loginGoogle()"></i></span>
                  				</div>
                      </div>
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
import {mapMutations} from 'vuex'

export default {
  created(){

  },
  data () {
    return {
      usuario: '',
      password: ''

		}
  },
  mounted(){

  },
  methods: {
    login(){
        if (this.usuario && this.password){
            firebase.auth().signInWithEmailAndPassword(this.usuario,this.password)
            .then((user)=>{
              this.$router.replace('/Home');
            })
            .catch((error)=>{
                console.log(error);
                this.$swal( 'Error!','Usuario y Password Incorrecta','error');
            });
        }else{
          this.$swal( 'Error!','Completa los Campos Vacios','error');
        }
    },
    loginGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    loginFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },




}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Numans');
body{
  background-image: url('../../assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  background-color: lightgray;
  background-blend-mode: multiply;
  font-family: 'Numans', sans-serif;
}
.container{
height: 100%;
align-content: center
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
.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}
.login_btn:hover{
color: black;
background-color: white;
}
.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}
.social_icon span:hover{
color: white;
cursor: pointer;
}

</style>
