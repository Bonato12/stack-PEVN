<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg animated fadeInDown" style="background-color: rgba(0,0,0,0.7);" >
                <div style="width:70px;">
                    <img src="./assets/LogoTelnovo.png" style="height:50px; width:150px; float:left;">
                </div>
                <div class="navbar-collapse" style="margin-left:150px;">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link class="item"   tag="a" :class="{ 'router-link-active': isActiveCliente }" active-class="activo"   to="/HomeCliente">
                              <i class="fas fa-wheelchair"></i>
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
                              Compras
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item" :class="{ 'router-link-active': isActiveArreglo }"   tag="a"active-class="activo"   to="/HomeArreglo">
                              <i class="fas fa-toolbox"></i>
                              Arreglos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item" :class="{ 'router-link-active': isActiveReparacion }"   tag="a"active-class="activo"   to="/HomeReparacion">
                              <i class="fas fa-tools"></i>
                              Reparaciones
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
    return this.$route.matched.some(route => route.name === 'NuevoArreglo' ||  route.name === 'NuevoPresupuesto')
    },
    isActiveUsuario() {
    return this.$route.matched.some(route => route.name === 'NuevoUsuario' ||  route.name === 'HomeUsuario')
    },
    isActiveReparacion() {
    return this.$route.matched.some(route => route.name === 'HomeReparacion')
    },

  },
  methods: {
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
        cortar(value) {
            var palabra = value.split("@");
            return palabra[0];
        }
    }


}
</script>

<style>
body,html{
  background-image: url('http://www.fondosni.com/images/2013-02-09/Barra%20de%20colores-934760.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: 'Numans', sans-serif;
}


.navbar{background:#222222;}
.nav-item::after{content:'';display:block;width:0px;height:1px;background:#fec400;transition: 0.2s;}
.nav-item:hover::after{width:100%;}
.nav-link{padding:15px 5px;transition:0.2s;}



.activo{
    background-color: #fec400;
    color: black;
    height: 123%;
    width:auto;
    margin-top:-55;


}

.router-link-active{
  background-color: #fec400;
  color: black;
  height: 123%;
  width:auto;
  margin-top:-55;

}

.dropdown{
}

a{

  height: 10%;
  display: inline-block;

}

.item{
  height: 120%;
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

/*nuevo boton*/
.btns{
  border: 1px solid black;
  background: none;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 20px;
  font-family: 'Numans', sans-serif;
  cursor: pointer;
  transition: 0.8s;
  position: relative;
  overflow: hidden;
}

.btns1{
  color: #fec400;
}

.btns1:hover{
  color: #fff;
}

.btns::before{
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 0%;
  background: #fec400;
  z-index: -1;
  transition: 0.8s;
}
.btns1::before{
  top: 0;
  border-radius: 0 0 50% 50%;
}

.btns1:hover::before{
  height: 180%;
}

dropbtn {
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 16px;
  border: none;
}

.salir{
  width: 220px;
  height:5px;
}

</style>
