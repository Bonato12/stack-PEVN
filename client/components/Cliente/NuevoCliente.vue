<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
              <h3> Nuevo Cliente </h3>
            </div>
            <div class="card-body">
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
                        <input type="submit" value="Guardar"  class="btn float-right cliente_btn">
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

class Cliente {
    constructor(id_cliente,dni,nombre,apellido,ciudad,direccion,telefono,mail){
          this.id_cliente =  id_cliente,
          this.dni = dni,
          this.nombre = nombre,
          this.apellido = apellido,
          this.ciudad = ciudad,
          this.direccion = direccion,
          this.telefono = telefono,
          this.mail = mail
    }
}

export default {
  created(){
      this.getCliente();
  },
  data () {
    return {
      datos: [],
      cliente: new Cliente
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
        console.log(this.cliente);
        axios.post('http://localhost:3000/cliente',
        this.cliente, // the data to posthttp://localhost:3000/cliente
        { headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000/cliente',
          'Content-Type': 'application/json',
        },
        }).then(this.cliente = new Cliente()).then(this.$swal( 'Exito!','Nuevo Cliente Añadido!','success'));
        }

    }

}

</script>

<style>

@keyframes jello {
  11.1% {
    transform: none
  }
  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg)
  }
  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg)
  }
  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg)
  }
  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg)
  }
  66.6% {
    transform: skewX(-0.78125deg) skewY(-0.78125deg)
  }
  77.7% {
    transform: skewX(0.390625deg) skewY(0.390625deg)
  }
  88.8% {
    transform: skewX(-0.1953125deg) skewY(-0.1953125deg)
  }
  100% {
    transform: none
  }
}



form input:focus:invalid{
    background: url('invalid.png') no-repeat 95% 50%;
    /*animation: jello 1s;*/
    background-color: white;
}


form input:required:focus:valid{

  background: url('valid.png') no-repeat 95% 50%;
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
width: 410px;
background-color: rgba(0,0,0,0.5) !important;
}

.cliente_btn{
color: black;
background-color: #FFC312;
width: 100px;
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
