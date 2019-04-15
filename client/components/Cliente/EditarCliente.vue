<template>
  <div id="app">
    <div class="container">
      <section class="formulario animated fadeInDown">
          <section class="info">
              <section class="titulo">
                  <span class="fas fa-user-cog"></span>
                    <p style="font-size:25px;">EDITAR CLIENTE</p>
              </section>
          </section>
          <form @submit.prevent="editarCliente()">

                                <div class="input-field col s6">
                                   <input placeholder="Placeholder" id="dni" v-model="cliente.dni" type="number" class="validate">
                                   <label class="active" for="dni">Dni</label>
                                 </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="cliente.nombre" type="text" class="validate">
                                  <label class="active" for="nombre">Nombre</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="cliente.apellido" type="text" class="validate">
                                  <label class="active" for="nombre">Apellido</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="direccion"  v-model="cliente.direccion" type="text" class="validate">
                                  <label class="active" for="precio">Direccion</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="telefono"  v-model="cliente.telefono" type="number" class="validate">
                                  <label class="active" for="precio">Telefono</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="mail"  v-model="cliente.mail" type="email" class="validate">
                                  <label class="active" for="precio">Mail</label>
                                </div>
                                <br>
                                <div class="form-group">
                                    <button type="submit"  title="Guardar Cliente" >
                                          <i class="far fa-save fa-1x"></i>
                                          Guardar
                                    </button>
                                    <router-link to="/HomeCliente" tag="button"  title="Volver a HomeCliente" >
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
import { alertEdit,alertEditSucessCliente,alertCompletarCampos } from '../../assets/sweetAlert.js';
import Cliente from '../../models/Cliente';


export default {
  name: 'app',
  created(){
    this.rellenarCliente();
  },
  data () {
    return {
      idc: this.$route.params.id,
      datos: [],
      cliente:  new Cliente(),
		}
  },
  mounted(){

  },
  computed:{
    validation() {
        return this.dni
      }
  },
  methods: {
      rellenarCliente(){
         console.log(this.idc);
         axios.get('http://localhost:3000/cliente/'+this.idc).then((response) =>{
           console.log(response.data);
           this.cliente = new Cliente(this.idc,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
         });
      },
      editarCliente(){
          if (this.cliente.dni && this.cliente.nombre && this.cliente.apellido && this.cliente.direccion && this.cliente.telefono && this.cliente.mail){
            axios.put('http://localhost:3000/cliente/'+ this.idc,
                this.cliente,
                { headers: {
                  'Content-Type': 'application/json',
                }
            }).then((data) => console.log(data)).then(alertEditSucessCliente());
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
width: 450px;
background-color: rgba(0,0,0,0.5) !important;
}

.clientebtn{
color: black;
background-color: #FFC312;
width: 100px;
}

.clientebtn:hover{
color: black;
background-color: white;
}

/*Sirve para desabilitar las flechas en los inputs numer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

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

.formulario{
    width: 1050px;
    height: 525px;
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


</style>
