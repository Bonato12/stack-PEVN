<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg navbar-dark">
                <div style="width:70px;">
                    <img src="./assets/LogoTelnovo.png" style="height:50px; width:150px; float:left;">
                </div>
                <div class="navbar-collapse">
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
                    </ul>
                    <div>
                        <li style="float:right; ">
                            <router-link   tag="li" class="fas fa-sign-out-alt fa-3x" style="color:#FFC312;"  to="/Login" v-on:click.native="logout()" title="Salir"></router-link>
                        </li>
                    </div>
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
    this.control();
  },
  data () {
    return {
      autenticado: false,

    }
  },
  mounted(){


  },
  methods: {
    control(){
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
html,body{
background-image: url('https://i0.wp.com/www.carrerasaludmental.com/wp-content/uploads/2017/12/At-the-Office-Mac-Apple-Wallpapers-Creative-Planning-2982192420.jpeg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
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
