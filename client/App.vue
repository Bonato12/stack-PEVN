<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg navbar-dark">
                <div style="width:70px;">
                    <img src="./LogoTelnovo.png" style="height:50px; width:150px; float:left;">
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link   tag="li" class-active="active" id="cliente"   to="/HomeCliente">Clientes</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" class-active="active"   to="/HomeProducto">Productos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" class-active="active"   to="/HomeVenta">Ventas</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li" class-active="active"   to="/HomeArreglo">Arreglos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li" class-active="active"   to="/HomeProovedor">Proveedores</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li" class-active="active"   to="/Login" v-on:click.native="logout()" replace>Salir</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        <router-view></router-view>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'app',
  created(){

  },
  data () {
    return {
      autenticado: false,

    }
  },
  mounted(){
    let usuario = firebase.auth().currentUser;
    console.log(usuario);
    if (usuario != null){
        this.autenticado = true;
        this.$router.push('/Home');
    }
    else {
      this.$router.push('/Login');
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(function() {
        this.$router.replace('/Login');
        }).catch(function(error) {
           console.log(error);
        });

  }
}


}
</script>

<style>
body{
    background-repeat: no-repeat;
   background-attachment: fixed;
   background-position: center;
    color: white;
  }

  .navbar{background:#222222;}
  .nav-item::after{content:'';display:block;width:0px;height:2px;background:#fec400;transition: 0.2s;}
  .nav-item:hover::after{width:100%;}
  .nav-link{padding:15px 5px;transition:0.2s;}



   nav li.router-link-active {
     background-color: #fec400;
     color: black;
     height: 193%;
   }



   nav li{
     color: white;
     padding: 2px 1px 2px 1px;

   }

   nav{
     height: 75px;
   }


</style>
