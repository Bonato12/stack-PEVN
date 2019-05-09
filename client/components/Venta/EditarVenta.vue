<template>
      <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-center">
              <div class="card animated fadeInDown">
                  <div class="card-header" style="background-color:#FFD700;">
                    <h2 style="text-align:center; color:black;">
                      <i class="fas fa-cart-plus"></i>
                       Editar Venta
                     </h2>
                  </div>
                    </hr style="color:black;">
                  <div class="card-body">
                    <form style="margin-left: 30px; margin-top:30px;">
                            <div class="caja">
                                <span class="input-group-text">Cliente</span>
                                <v-select :options="cliente" label="dni" id="clienteSelect"  v-model="clienteSelected" style="width:290px; height:57px; background-color: white; border-radius: 4px;">
                                  <template slot="option" slot-scope="option">
                                      <span class="fa" :class="option.icon"></span>
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                    </form>
                  </div>
                  <div>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeVenta" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="nuevaVenta()" class="botones" style="width:115px; background-color:#fec400;">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                          </div>
                  </div>
              </div>
            </div>
       </div>
      </div>
</template>
<script>

import axios from 'axios'
import { alertWarningLimiteStock,alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessVenta} from '../../assets/sweetAlert.js'
import Venta from '../../models/Venta';
import VentaProducto from '../../models/VentaProducto';

export default {
  name: 'NuevaVenta',
  created(){
      this.getCliente();
      this.getProducto();
      this.rellenarVenta();
  },
  data () {
    return {
      idv: this.$route.params.id,
      venta: new Venta(),
      Lista: [],
      ventaProducto: new VentaProducto(),
      cliente: [],
      producto: [],
      precio: '',
      precioTotal: 0,
      productoSelected: '',
      clienteSelected: '',
      num: '',
      index: ''

		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    getCliente(){
      axios.get('http://localhost:3000/cliente').then((response) =>{
        this.cliente = response.data;
      });
    },
    nuevaVenta(){
                  if (this.clienteSelected){
                      //Asignamos el Cliente Selecionado a this.venta.clientes
                      //Asignamos a this.venta total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a vender
                      this.venta.cliente = this.clienteSelected;
                      this.venta.total = this.precioTotal;
                      axios.put('http://localhost:3000/venta/'+this.idv,
                          {
                          venta: this.venta
                          },
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/venta/'+this.idv,
                            'Content-Type': 'application/json'
                             }
                        })
                          alertSucessVenta();
                          this.ventaProducto = new VentaProducto();

                  }else {
                    alert("Completar Los Campos");
                  }

    }
  }
}

</script>

<style scoped>


.card{
height: auto;
margin-bottom: auto;
width: 1650px;
background-color: #696969;
border: 1px solid;
border-radius: 5px;
}



.venta_btn:hover{
color: black;
background-color: white;
}

.input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
}

.form-control {
    border: 0;
    box-shadow: none;
}



.botones{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:100px;
  height:50px;
  margin-top:-10px;
  border:none;
  color:black;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 10px;
}

.caja{
   float:left;
   margin-left:5px;
   height: 100px;

}

.input-group-text{
width: auto;
background-color: #FFD700;
color: black;
border: none;


}

input{
  background-color: white;
}

</style>
