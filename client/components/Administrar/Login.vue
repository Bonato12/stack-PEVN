<template>
  <div>
  <div class="limiter animated fadeIn">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title">
					<span class="login100-form-title-1">
					<img src="./LogoTelnovo.png">
					</span>
				</div>
				<form class="login100-form" @submit.prevent="login()">
					<div class="wrap-input100">
						<span class="label-input100">Usuario</span>
						<input class="input100" type="text" v-model="usuario" placeholder="Ingrese Usuario" autocomplete="off">
					</div>
					<div class="wrap-input100">
						<span class="label-input100">Password</span>
						<input class="input100" type="password" v-model="password"  placeholder="Ingrese Password" autocomplete="off">
					</div>
					<div class="row">
            <br>
						<button type="submit" class="btn btn-login" style="margin-left:280px; padding-top:10px; background:color:#FEC404;">
							Login
						</button>
					</div>
				</form>
        <div class="social_icon">
              <span ><i class="fab fa-facebook-square" v-on:click="loginFacebook()"></i></span>
              <span ><i class="fab fa-google-plus-square" v-on:click="loginGoogle()"></i></span>
        </div>
			</div>
		</div>
	</div>
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
              axios.post('http://localhost:3000/usuario',
              {
              uss: this.usuario
              })

            })
            .catch((error)=>{
                console.log(error);
                this.$swal( 'Error!','Usuario y Password Incorrecta','error');
            });
            axios.post('http://localhost:3000/user');
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

html,body{
background-image: url('./background.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
background-color: lightgray;
background-blend-mode: multiply;
}


label {
  display: block;
  margin: 0;
}

.fixed-action-btn{
right:50px;/*desired value*/
}

.txt1 {
  font-family: 'Numans', sans-serif;
  font-size: 13px;
  line-height: 1.4;
  color: black;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
}


.wrap-login100 {
  width: 620px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: 600px;
}


.login100-form-title {
  width: 100%;
  position: relative;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  padding: 70px 15px 74px 15px;
}


.login100-form-title::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #424242;
}


.login100-form {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 43px 88px 93px 190px;
}


.wrap-input100 {
  width: 100%;
  position: relative;
}

.label-input100 {
  font-family: 'Numans', sans-serif;
  font-size: 15px;
  line-height: 1.2;
  text-align: right;
  position: absolute;
  top: 14px;
  left: -105px;
  width: 80px;
  color: black;


}

/*---------------------------------------------*/
.input100 {
  font-family: 'Numans', sans-serif;
  font-size: 15px;
  color: black;
  line-height: 1.2;
  display: block;
  width: 100%;
  padding: 0 5px;
}

.social_icon span{
font-size: 60px;
margin-left: 5px;
color: #FFC312;
}

.social_icon{
  position: absolute;
  margin-top: -100px;
  margin-left: 250px;
}


.social_icon span:hover{
color: white;
cursor: pointer;
}



input.input100 {
  height: 45px;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #000;
}

.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}



</style>
