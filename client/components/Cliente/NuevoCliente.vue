<template>
  <div>
    <div class="container">
      <section class="formulario animated fadeInDown">
          <section class="info">
              <section class="titulo">
                  <span class="fas fa-user-circle"></span>
                    <p style="font-size:25px;">NUEVO CLIENTE</p>
              </section>
          </section>
          <form @submit.prevent="nuevoCliente()">
                                <div class="input-field col s6">
                                  <input required id="dni"  v-model="cliente.dni" type="number" class="validate">
                                  <label for="dni">Dni</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="cliente.nombre" type="text" class="validate">
                                  <label for="nombre">Nombre</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="nombre"  v-model="cliente.apellido" type="text" class="validate">
                                  <label for="nombre">Apellido</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="direccion"  v-model="cliente.direccion" type="text" class="validate">
                                  <label for="precio">Direccion</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="telefono"  v-model="cliente.telefono" type="number" class="validate">
                                  <label for="precio">Telefono</label>
                                </div>
                                <div class="input-field col s6">
                                  <input required id="mail"  v-model="cliente.mail" type="email" class="validate">
                                  <label for="precio">Mail</label>
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
import { alertSucessCliente,alertCompletarCampos } from '../../assets/sweetAlert.js'
import Cliente from '../../models/Cliente';

export default {
  created(){

  },
  data () {
    return {
      cliente: new Cliente()
		}
  },
  mounted(){


  },
  methods: {
    nuevoCliente(){
                    if(this.cliente.dni && this.cliente.nombre && this.cliente.apellido && this.cliente.direccion && this.cliente.telefono && this.cliente.mail){
                          console.log(this.cliente);
                          axios.post('http://localhost:3000/cliente',
                          this.cliente, // the data to posthttp://localhost:3000/cliente
                          { headers: {
                            'Access-Control-Allow-Origin': 'http://localhost:3000/cliente',
                            'Content-Type': 'application/json',
                          },
                        }).then(data=> console.log(data)).then(this.cliente = new Cliente()).then(alertSucessCliente());
                    }
              }

}
}

</script>

<style scoped>


form input:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;
    /*box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);*/
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
}


form input:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;
/*  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 255, 0, 0.6);*/
}


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
border: none;
}


.cliente_btn{
color: black;
background-color: #FFC312;
}

.cliente_btn:hover{
color: black;
background-color: white;
}

.form-control {
    border: 0;
    box-shadow: none;
    border-bottom: 2px solid gray;

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

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}



</style>
