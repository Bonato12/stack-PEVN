<template>
  <div>
    <div class="container">
      <section class="formulario animated fadeInDown">
          <section class="info">
              <section class="titulo">
                    <span  class="fas fa-people-carry"></span>
                    <p style="font-size:25px;">NUEVO PROVEEDOR</p>
              </section>
          </section>
          <form @submit.prevent="nuevoCliente()">
                                <div class="input-field col s6">
                                  <input required id="dni"  v-model="proveedor.dni" type="number" class="validate">
                                  <label for="dni">Dni</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="proveedor.nombre" type="text" class="validate">
                                  <label for="nombre">Nombre</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="proveedor.apellido" type="text" class="validate">
                                  <label for="nombre">Apellido</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="direccion"  v-model="proveedor.direccion" type="text" class="validate">
                                  <label for="precio">Direccion</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="telefono"  v-model="proveedor.descripcion" type="number" class="validate">
                                  <label for="precio">Descripcion</label>
                                </div>
                                <div class="row" style="padding-left:20px; width:580px;">
                                  <div class="input-field col s6">
                                    <input required id="telefono"  v-model="proveedor.telefono" type="number" class="validate">
                                    <label for="precio">Telefono</label>
                                  </div>
                                  <div class="input-field col s6">
                                    <input required id="mail"  v-model="proveedor.mail" type="email" class="validate">
                                    <label for="precio">Mail</label>
                                  </div>
                                </div>
                                <br>
                                <div class="form-group">
                                    <button type="submit"  title="Guardar Cliente" >
                                          <i class="far fa-save fa-1x"></i>
                                          Guardar
                                    </button>
                                    <router-link to="/HomeProveedor" tag="button"  title="Volver a HomeCliente" >
                                        <i class="fas fa-arrow-left"></i>
                                          Volver
                                    </router-link>
                                </div>
                      </form>
        </section>
  </div>
  </div>
</template>

<script>

import axios from 'axios'
import { alertSucessProveedor,alertCompletarCampos } from '../../assets/sweetAlert.js'
import Proveedor from '../../models/Proveedor';


export default {
  created(){

  },
  data () {
    return {
      proveedor: new Proveedor()
		}
  },
  mounted(){


  },
  methods: {
    nuevoProveedor(){
            if (this.proveedor.dni && this.proveedor.nombre && this.proveedor.apellido && this.proveedor.direccion && this.proveedor.telefono && this.proveedor.mail && this.proveedor.descripcion){
              console.log(this.proveedor);
              axios.post('http://localhost:3000/proveedor',
              this.proveedor, // the data to posthttp://localhost:3000/cliente
              { headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000/proveedor',
                'Content-Type': 'application/json',
              },
              }).then(this.proveedor = new Proveedor()).then(alertSucessProveedor());
            }else{
                alertCompletarCampos();
            }
        }

    }

}

</script>

<style scoped>


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


.input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 850px;
background-color: rgba(0,0,0,0.5) !important;
}

button{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  background-color: #00c853  !important;
  float:right;
  width:150px;
  height:50px;
  margin-top:-20px;
  border:none;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 10px;
}

/*Sirve para desabilitar las flechas en los inputs numBer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.formulario{
    width: 1050px;
    height: 565px;
    margin: 40px auto;
    display: flex;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
}

/* Informacion de Contacto*/

.info::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #FEC404;
    opacity: 0.9;
}

.info{
    width: 38%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center center;
    background-image: url('http://farm6.staticflickr.com/5068/5744132135_34835702ec_b.jpg');


}

.titulo{
    position: relative;
    z-index: 2;
    color: #fff;
}


.titulo span{
    font-size: 100px;
    display: block;
    text-align: center;
    margin-bottom: 15px;
}

/* Formulario de contacto*/
form {
    width: 62%;
    padding: 30px 40px;
}


</style>
