<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg animated fadeInDown" style="background-color: rgba(0,0,0,0.7);" >
                <div style="width:70px;">
                    <img src="./assets/LogoTelnovo.png" style="height:50px; width:150px; float:left;" @click="irHome()">
                </div>
                <div class="navbar-collapse" style="margin-left:200px;">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link class="item"   tag="a" :class="{ 'router-link-active': isActiveCliente }" active-class="activo"   to="/HomeCliente">
                              <i class="fas fa-user"></i>
                              Clientes
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  class="item" tag="a" :class="{ 'router-link-active': isActiveProducto }" active-class="activo"   to="/HomeProducto">
                              <i class="fas fa-mobile-alt"></i>
                              Productos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item" :class="{ 'router-link-active': isActiveVenta }"  tag="a" active-class="activo"   to="/HomeVenta">
                              <i class="fas fa-shopping-cart"></i>
                              Ventas
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item" :class="{ 'router-link-active': isActiveCompra }" tag="a" active-class="activo"   to="/HomeCompra">
                              <i class="fas fa-coins"></i>
                              Buy
                            </router-link>
                        </li>
                        <li class="nav-item">
                                <router-link class="item" id="arreglo" :class="{ 'router-link-active': isActiveArreglo }"   tag="a"active-class="activo"   to="/HomeArreglo">
                                 <i class="fas fa-toolbox"></i>
                                 Arreglos
                               </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  class="item" tag="a" :class="{ 'router-link-active': isActiveProveedor }" active-class="activo"   to="/HomeProveedor">
                              <i class="fas fa-people-carry"></i>
                              Proveedores
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  class="item" tag="a" :class="{ 'router-link-active': isActiveUsuario }" active-class="activo"   to="/HomeUsuario">
                              <i class="fas fa-cog"></i>
                              Configuracion
                            </router-link>
                        </li>
                    </ul>
                    <div style="margin-right:0px; width:200px;">
                      <div class="dropdown" style="float:right;">
                        <button class="btn btn-warning">
                          <router-link   tag="a" style="color:black;"  to="/Login" v-on:click.native="logout()" title="Salir">
                                {{ user | cortar }}
                                <i class="fas fa-sign-out-alt"></i>
                          </router-link>
                        </button>
                      </div>
                    </div>
                </div>
            </nav>
        <router-view>
        </router-view>
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
  computed:{
      isActiveVenta() {
          return this.$route.matched.some(route => route.name === 'NuevaVenta' ||  route.name === 'EditarVenta' )
      },
      isActiveProducto() {
          return this.$route.matched.some(route => route.name === 'NuevoProducto' ||  route.name === 'EditarProducto' )
      },
      isActiveCliente() {
          return this.$route.matched.some(route => route.name === 'NuevoCliente' ||  route.name === 'EditarCliente' )
      },
      isActiveProveedor() {
          return this.$route.matched.some(route => route.name === 'NuevoProveedor' ||  route.name === 'EditarProveedor' )
      },
      isActiveCompra() {
          return this.$route.matched.some(route => route.name === 'NuevaCompra' ||  route.name === 'EditarCompra' )
      },
      isActiveArreglo() {
          return this.$route.matched.some(route => route.name === 'NuevoArreglo' ||  route.name === 'NuevoPresupuesto' || route.name === 'VerPresupuesto')
      },
      isActiveUsuario() {
          return this.$route.matched.some(route => route.name === 'NuevoUsuario' ||  route.name === 'HomeUsuario')
      }
  },
  methods: {
      irHome(){
        this.$router.push('/Home');
      },
      control(){
        let usuario = firebase.auth().currentUser;
        if (usuario != null){
            console.log(usuario);
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
            //this.autenticado = false;
          }).catch(function(error) {
             console.log(error);
          });
      },
  },
  filters: {
      cortar(value){
          var palabra = value.split("@");
          return palabra[0];
      }
    }
}
</script>
<style>
.dropbtn {
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
#item a:hover {background-color: #ddd;}
/* Show the dropdown menu on hover */
.nav-item:hover .dropdown-content {display: block;}
body,html{
  background-color: #2A363B;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: 'Numans', sans-serif;
}

.activo{
    background-color: #fec400;
    color: black;
    height:  120%;
    width:auto;
    margin-top:-55;
}

.router-link-active{
  background-color: #fec400;
  color: black;
  height: 120%;
  width:auto;
  margin-top:-55;
}

a{
  height: 10%;
  display: inline-block;
}

a:link
{
text-decoration:none;
color:white;
}
a:hover{
  color:white;
}
nav a{
    color: white;
    padding: 4px 1px 4px 1px;
}
nav{
     height: 60px;
     text-align:center;
}
</style>
