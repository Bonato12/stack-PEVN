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
                       Editar Compra
                     </h2>
                  </div>
                  <hr style="color:black;">
                  <div class="card-body">
                    <form style="margin-left: 30px; margin-top:30px;">
                      <div class="input-group form-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text">Proveedor</span>
                          </div>
                          <v-select  class="form-control" :options="proveedor" label="dni" id="proveedorSelect" v-model="proveedorSelected">
                            <template slot="option" slot-scope="option">
                                {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                            </template>
                          </v-select>
                      </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text;">Editar Fecha</span>
                                </div>
                                <datepicker class="datepicker" v-model="date" name="fecha"
                                    @opened="datepickerAbierto"
                                    @selected="fechaSeleccionada"
                                    @closed="datepickerCerrado">
                                </datepicker>
                            </div>
                    </form>
                  </div>
                  <div>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeCompra" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="editarCompra()" class="botones" style="width:115px; background-color:#fec400;">
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
import { alertEditSucessCompra } from '../../assets/sweetAlert.js'
import Compra from '../../models/Compra';
import moment from 'moment';

export default {
  name: 'EditarCompra',
  created(){
      this.getProveedor();
      this.getIdCompra();
  },
  data () {
    return {
      idc: this.$route.params.id,
      compra: new Compra(),
      proveedor:[],
      proveedorSelected: '',
      producto: [],
      pro: '',
      num: '',
      fecha: '',
      date: '',
		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    getProveedor(){
      axios.get('http://localhost:3000/proveedor').then((response) =>{
        this.proveedor = response.data;
      });
    },
    getIdCompra(){
      console.log(this.idv);
      axios.get('http://localhost:3000/compra/'+this.idc).then((response) =>{
          var dia =  moment(response.data[0].fecha).format("D");;
          var mes =  moment(response.data[0].fecha).format("M");;
          var anio =  moment(response.data[0].fecha).format("YYYY");;
          this.date = new Date(anio,mes-1,dia);
          this.pro = response.data[0].id_proveedor;
          axios.get('http://localhost:3000/proveedor/'+this.pro).then((response) =>{
              this.proveedorSelected = response.data;
              console.log(this.proveedorSelected);
          });
      });
    },
    editarCompra(){
                      console.log("EL ID ES :", this.proveedorSelected.id_proveedor)
                      this.compra.fecha = this.date;
                      this.compra.proveedor = this.proveedorSelected.id_proveedor;
                      axios.put('http://localhost:3000/compra/'+this.idc,
                          this.compra,
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/compra/'+this.idc,
                            'Access-Control-Allow-Methods': 'PUT',
                            'Content-Type': 'application/json'
                             }
                        })
                          alertEditSucessCompra()();
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
width: 900px;
background-color: #696969;
border: 1px solid;
border-radius: 5px;
}



.compra_btn:hover{
color: black;
background-color: white;
}

.input-group-prepend span{
padding: 5px;
margin-right: 5px;
margin-bottom: 3px;
width: auto;
background-color: #FFC312;
color: black;
border:0;
}

.datepicker {
  padding: 5px;
}

.form-control {
    border: 0;
    box-shadow: none;
}

.btn-ghost{
  position:relative;
  display:inline-block;
  border: 2pc solid var(--white);


}

.botones{
  cursor:pointer;
  display:inline-block;
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
