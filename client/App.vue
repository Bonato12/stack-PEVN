<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg" style="background-color: rgba(0,0,0,0.7)" >
                <div style="width:70px;">
                    <img src="./assets/LogoTelnovo.png" style="height:50px; width:150px; float:left;">
                </div>
                <div class="navbar-collapse">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link   tag="li" active-class="activo" id="cliente"   to="/HomeCliente">Clientes</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" active-class="activo"   to="/HomeProducto">Productos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" active-class="activo"   to="/HomeVenta">Ventas</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li"active-class="activo"   to="/HomeArreglo">Arreglos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li" active-class="activo"   to="/HomeProovedor">Proveedores</router-link>
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
background-image: url('./components/Administrar/background.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
background-color: #0C94F5;
background-blend-mode: multiply;

}

.navbar{background:#222222;}
.nav-item::after{content:'';display:block;width:0px;height:2px;background:#fec400;transition: 0.2s;}
.nav-item:hover::after{width:100%;}
.nav-link{padding:15px 5px;transition:0.2s;}



.activo{
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
