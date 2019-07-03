<template>
  <div id="app">
        <nav v-if="autenticado" class="navbar navbar-expand-lg animated fadeInDown" style="background-color: rgba(0,0,0,0.7);" >
                <div style="width:70px;">
                    <img src="./assets/LogoTelnovo.png" style="height:50px; width:150px; float:left;">
                </div>
                <div class="navbar-collapse" style="margin-left:250px;">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link class="item"   tag="a" active-class="activo" id="cliente"   to="/HomeCliente">
                              <i class="fas fa-wheelchair"></i>
                              Clientes
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  class="item" tag="a" active-class="activo"   to="/HomeProducto">
                              <i class="fas fa-mobile-alt"></i>
                              Productos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item"  tag="a" active-class="activo"   to="/HomeVenta">
                              <i class="fas fa-shopping-cart"></i>
                              Ventas
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item"  tag="a" active-class="activo"   to="/HomeCompra">
                              <i class="fas fa-coins"></i>
                              Compras
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="item"   tag="a"active-class="activo"   to="/HomeArreglo">
                              <i class="fas fa-tools"></i>
                              Arreglos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link  class="item" tag="a" active-class="activo"   to="/HomeProveedor">
                              <i class="fas fa-people-carry"></i>
                              Proveedores
                            </router-link>
                        </li>
                    </ul>
                    <div style="margin-right:0px; width:400px;">
                      <div class="dropdown" style="float:right;">
                        <button class="btn btn-warning">
                          <router-link   tag="a" style="color:black;"  to="/Login" v-on:click.native="logout()" title="Salir">
                                {{ user }}
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
  z-index:999
}

</style>
