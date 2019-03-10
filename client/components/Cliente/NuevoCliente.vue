<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="card">
            <div class="card-header">
              <h3 style="text-align:center; color:white;"> Nuevo Cliente </h3>
            </div>
            <div class="card-body animated fadeInDown">
                  <form @submit.prevent="nuevoCliente()" class="simple-form">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input required type="number" min="0" v-model="cliente.dni" class="form-control" placeholder="Ingrese Dni">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input required  type="text" v-model="cliente.nombre" class="form-control" placeholder="Ingrese Nombre">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input required  type="text" v-model="cliente.apellido" class="form-control" placeholder="Ingrese Apellido">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Ciudad</span>
                        </div>
                        <input required type="text" v-model="cliente.ciudad" class="form-control" placeholder="Ingrese Ciudad">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input required type="text" v-model="cliente.direccion" class="form-control" placeholder="Ingrese Direccion">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input required type="number" min="0" v-model="cliente.telefono" class="form-control" placeholder="Ingrese Telefono">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                          <input required type="email" v-model="cliente.mail" class="form-control" placeholder="Ingrese Mail">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn float-right cliente_btn" title="Guardar Cliente">
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                        <router-link to="/HomeCliente" tag="button" class="btn" title="Volver a HomeCliente" style="background:white; margin-left:182px;">
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                    </div>
              </form>

            </div>
        </div>
      </div>
  </div>
  </br>
  </div>
</template>

<script>

import axios from 'axios'
import { alertSucessCliente,alertCompletarCampos } from '../../assets/sweetAlert.js'
import Cliente from '../../models/Cliente';

export default {
  created(){
      this.getCliente();
  },
  data () {
    return {
      datos: [],
      cliente: new Cliente()
		}
  },
  mounted(){


  },
  methods: {
    getCliente(){
      axios.get('http://localhost:3000/cliente').then((response) =>{
        this.datos = response.data;
        console.log(this.datos);
      });
    },
    nuevoCliente(){
            if (this.cliente.dni && this.cliente.nombre && this.cliente.apellido && this.cliente.ciudad && this.cliente.direccion && this.cliente.telefono && this.cliente.mail){
              console.log(this.cliente);
              axios.post('http://localhost:3000/cliente',
              this.cliente, // the data to posthttp://localhost:3000/cliente
              { headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000/cliente',
                'Content-Type': 'application/json',
              },
              }).then(this.cliente = new Cliente()).then(alertSucessCliente());
            }else{
              alertCompletarCampos();
            }
        }

    }

}

</script>

<style scoped>


form input:focus:invalid{
    /*background: url('http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/32/red-ok-icon.png') no-repeat 95% 50%;*/
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;
}


form input:required:focus:valid{
  background: url('http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/32/green-ok-icon.png') no-repeat 95% 50%;
  background-color: white;

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
border:0 !important;
}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 450px;
background-color: rgba(0,0,0,0.5) !important;
}

.cliente_btn{
color: black;
background-color: #FFC312;
}

.cliente_btn:hover{
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
</style>
