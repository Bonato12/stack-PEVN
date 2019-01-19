<template>
  <div id="login">
    <div class="container">
      	<div class="d-flex justify-content-center h-100">
      		<div class="card">
        			<div class="card-header">
                <img src="./LogoTelnovo.png" class="input-group form-group" >
        			</div>
        			<div class="card-body">
            				<form @submit.prevent="login()">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-user"></i></span>
              						</div>
              						<input  type="text" v-model="usuario" class="form-control" placeholder="username">
            					</div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-key"></i></span>
              						</div>
              						<input type="password" v-model="password" class="form-control" placeholder="password">
            					</div>
            					<div class="form-group">
            						  <input type="submit" value="login"  class="btn float-right login_btn">
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
      password: ''

		}
  },
  mounted(){

  },
  methods: {
    login(){
        firebase.auth().signInWithEmailAndPassword(this.usuario,this.password)
        .then((user)=> this.$router.replace('/Home'), (error)=>{
          console.log(error);
          this.$swal( 'Error!','Usuario y Password Incorrecta','error');
        });
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
background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
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
height: 370px;
margin-top: 110px;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
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

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
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

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
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
