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
                      <i class="fas fa-cog"></i>
                       Editar Venta
                     </h2>
                  </div>
                  </hr style="color:black;">
                  <div class="card-body">
                    <form style="margin-left: 30px; margin-top:30px;">
                      <div class="form group">
                            <div class="input-group form-group">
                                <span class="input-group-text">Cliente</span>
                                <v-select :options="clienteS" label="dni" id="clienteSelect"  v-model="clienteSelected" style="width:290px; height:57px; background-color: white; border-radius: 4px;">
                                  <template slot="option" slot-scope="option">
                                      <span class="fa" :class="option.icon"></span>
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                            <div>
                            <Dropdown
                              :options="clienteS"
                              v-on:selected=""
                              v-on:filter=""
                              :disabled="false"
                              name="dni"
                              :maxItem="10"
                              placeholder="Please select an option">
                            </Dropdown>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Fecha</span>
                                </div>
                                <datepicker v-model="date" name="fecha"
                                    @opened="datepickerAbierto"
                                    @selected="fechaSeleccionada"
                                    @closed="datepickerCerrado">
                                </datepicker>
                            </div>
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
                              <button v-on:click="editarVenta()" class="botones" style="width:115px; background-color:#fec400;">
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
import moment from 'moment';

export default {
  name: 'EditarVenta',
  created(){
      this.getCliente();
      this.getIdVenta();
  },
  data () {
    return {
      idv: this.$route.params.id,
      venta: new Venta(),
      clienteSelected: '',
      producto: [],
      num: '',
      cliente:'',
      fecha: '',
      date: '',
      clienteS: []
		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    getCliente(){
      axios.get('http://localhost:3000/cliente').then((response) =>{
        this.clienteS = response.data;
      });
    },
    getIdVenta(){
      console.log(this.idv);
      axios.get('http://localhost:3000/venta/'+this.idv).then((response) =>{
          this.cliente = response.data[0].id_cliente;
          console.log(this.cliente);
          var dia =  moment(response.data[0].fecha).format("D");;
          var mes =  moment(response.data[0].fecha).format("M");;
          var anio =  moment(response.data[0].fecha).format("YYYY");;
          this.date = new Date(anio,mes-1,dia);
          axios.get('http://localhost:3000/cliente/'+this.cliente).then((response) =>{
              this.clienteSelected = response.data;
              console.log(this.clienteSelected);
          });
      });
    },
    editarVenta(){
                  if (this.clienteSelected){
                      //Asignamos el Cliente Selecionado a this.venta.clientes
                      //Asignamos a this.venta total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a vender
                      this.venta.cliente = this.clienteSelected;
                      this.venta.fecha = this.date
                      axios.put('http://localhost:3000/venta/'+this.idv,
                          this.venta,
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

              },
                  datepickerAbierto: function() {
                        console.log('El datepicker ha sido abierto');
                   },
                   fechaSeleccionada: function() {
                       console.log('Una fecha ha sido seleccionada');
                   },
                   datepickerCerrado: function() {
                       console.log('El datepicker ha sido cerrado');
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
