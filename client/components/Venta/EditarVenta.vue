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
                  <div class="card-body">
                    <form @submit.prevent="editarVenta()" style="margin-left: 30px; margin-top:30px; width:500px;">
                      <div class="form-group row">
                        <label for="example-date-input" class="col col-form-label" style="color:white">Fecha</label>
                        <div class="col-10">
                          <datepicker :bootstrap-styling="true" v-model="date" :language="es" name="fecha"
                                    @opened="datepickerAbierto"
                                    @selected="fechaSeleccionada"
                                    @closed="datepickerCerrado">
                          </datepicker>
                        </div>
                      </div>
                      <br>
                      <br>
                      <div>
                          <div class="d-flex justify-content-end" style="margin:0 auto; width:500px;">
                              <router-link to="/HomeVenta" tag="button" class="btn btn-info">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <button  type="submit"  class="btn btn-guardar">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                          </div>
                          <br>
                    </div>
                    </form>
                  </div>
              </div>
            </div>
       </div>
      </div>
</template>
<script>

import axios from 'axios'
import { alertEditSuccess } from '../../assets/sweetAlert.js'
import Venta from '../../models/Venta';
import moment from 'moment';
import {en, es} from 'vuejs-datepicker/dist/locale'


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
      num: '',
      fecha: '',
      date: '',
      en: en,
      es: es
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
      });
    },
    editarVenta(){
                  if (this.date){
                      this.venta.fecha = this.date
                      axios.put('http://localhost:3000/venta/'+this.idv,
                          this.venta,
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/venta/'+this.idv,
                            'Content-Type': 'application/json'
                             }
                        }).then(alertEditSucessVenta());
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
width: 700px;
background-color: #2A363B;
border: 1px solid;
border-radius: 5px;
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



.btn{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  /*background-color: #FFD700  !important;*/
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black !important;
}

.btn-guardar{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700  !important;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black !important;
}

.btn:hover{
     background-color: white  !important;
     color: black;
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
