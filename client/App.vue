<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg animated fadeInDown" style="background-color: rgba(0,0,0,0.7);" >
                <div style="width:70px;">
                    <img src="./assets/LogoTelnovo.png" style="height:50px; width:150px; float:left;">
                </div>
                <div class="navbar-collapse" style="margin-left:150px;">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link   tag="li" active-class="activo" id="cliente"   to="/HomeCliente">
                              <i class="fas fa-wheelchair"></i>
                              Clientes
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" active-class="activo"   to="/HomeProducto">
                              <i class="fas fa-mobile-alt"></i>
                              Productos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" active-class="activo"   to="/HomeVenta">
                              <i class="fas fa-shopping-cart"></i>
                              Ventas
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  tag="li" active-class="activo"   to="/HomeCompra">
                              <i class="fas fa-coins"></i>
                              Compras
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li"active-class="activo"   to="/HomeArreglo">
                              <i class="fas fa-tools"></i>
                              Arreglos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link   tag="li" active-class="activo"   to="/HomeProveedor">
                              <i class="fas fa-people-carry"></i>
                              Proveedores
                            </router-link>
                        </li>
                    </ul>
                    <div>
                      <b-dropdown id="dropdown-right" right text="Usuario" variant="warning" class="m-2">
                        <b-dropdown-item href="#">
                            <i class="fas fa-user"></i>
                            {{ user }}
                        </b-dropdown-item>
                        <b-dropdown-item>
                          <router-link   tag="a" style="color:black;"  to="/Login" v-on:click.native="logout()" title="Salir">
                                 <i class="fas fa-sign-out-alt"></i>
                                 Salir
                           </router-link>
                        </b-dropdown-item>

                      </b-dropdown>
                    </div>
                </div>
            </nav>
        <router-view></router-view>
  </div>
</template>

<script>

import firebase from 'firebase'
import {mapMutations} from 'vuex'
export default {
  name: 'app',
  created(){
    this.control();
  },
  data () {
    return {
      autenticado: false,
      user: ''
    }
  },
  mounted(){


  },
  methods: {
    control(){
      let usuario = firebase.auth().currentUser;
      if (usuario != null){
          this.autenticado = true;
          this.$router.push('/Home');
          this.user = usuario.email;

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
background-image: url('./components/Administrar/background1.png');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
background-color: lightgray;
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
}

nav{
     height: 65px;
     text-align:center;


}

/* DROPDOWN DEL USUARIO */
.dropbtn {
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 16px;
  border: none;
}

.dropdown {
  background-color: rgba(0,0,0,0.7);
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

</style>
