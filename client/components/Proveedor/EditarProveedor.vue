<template>
  <div id="app">
    <div class="container">
      <section class="formulario animated fadeInDown">
          <section class="info">
              <section class="titulo">
                  <span class="fas fa-people-carry"></span>
                    <p style="font-size:25px;">EDITAR PROVEEDOR</p>
              </section>
          </section>
          <form @submit.prevent="nuevoCliente()">
                                <div class="input-field col s6">
                                  <input required id="dni"  v-model="proveedor.dni" type="number" class="validate">
                                  <label class="active" for="dni">Dni</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="proveedor.nombre" type="text" class="validate">
                                  <label class="active" for="nombre">Nombre</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="proveedor.apellido" type="text" class="validate">
                                  <label class="active" for="nombre">Apellido</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="direccion"  v-model="proveedor.direccion" type="text" class="validate">
                                  <label class="active" for="precio">Direccion</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="telefono"  v-model="proveedor.descripcion" type="number" class="validate">
                                  <label class="active" for="precio">Descripcion</label>
                                </div>
                                <div class="row" style="padding-left:20px; width:580px;">
                                  <div class="input-field col s6">
                                    <input required id="telefono"  v-model="proveedor.telefono" type="number" class="validate">
                                    <label class="active" for="precio">Telefono</label>
                                  </div>
                                  <div class="input-field col s6">
                                    <input required id="mail"  v-model="proveedor.mail" type="email" class="validate">
                                    <label class="active" for="precio">Mail</label>
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
import Proveedor from '../../models/Proveedor';
import { alertEdit,alertEditSucessProveedor } from '../../assets/sweetAlert.js';

export default {
  name: 'app',
  created(){
    this.rellenarProveedor();
  },
  data () {
    return {
      idp: this.$route.params.id,
      proveedor:  new Proveedor(),
		}
  },
  mounted(){

  },
  methods: {
      rellenarProveedor(){
        console.log(this.idp);
        axios.get('http://localhost:3000/proveedor/'+this.idp).then((response) =>{
          console.log(response.data);
          this.proveedor = new Proveedor(this.idp,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail,response.data[0].descripcion);
        });
      },
      editarProveedor(){
          axios.put('http://localhost:3000/proveedor/'+ this.idp,
            this.proveedor,
            { headers: {
                'Content-Type': 'application/json',
            }
            }).then(alertEditSucessProveedor());
      }
}
}
</script>

<style scoped>

form input:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;
}


form input:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;
}

.form-control {
    border: 0;
    box-shadow: none;
}

h1, h2 {
  font-weight: normal;
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
