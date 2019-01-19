<template>
  <div id="login">
    <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <nav style="background-color:black; height=15px; color:#fec400;">
                  <br>
                  <p class="h2 text-black">Login</p>
            </nav>
            <div class="card-body">
              <form @submit.prevent="login()">
                <div class="form-group">
                  <input type="email"  v-model="usuario" class="form-control" placeholder="Ingrese Usuario">
                </div>
                <div class="form-group">
                  <input type="password"  v-model="password" class="form-control" placeholder="Ingrese Password">
                </div>
                 <button class="btn-block" style="background-color: black; color:#fec400; height:50px;">Ingresar</button>
              </form>
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

#login {
  margin-top: 130px;
  text-align: center;
}


h1 {
color: blue;

}
span{
color: black;

}




</style>
