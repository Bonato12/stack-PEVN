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
                          <span class="input-group-text">Fecha Compra</span>
                        </div>
                        <datepicker  class="datepicker"  v-model="date" name="fecha"
                            @opened="datepickerAbierto"
                            @selected="fechaSeleccionada"
                            @closed="datepickerCerrado">
                        </datepicker>
                      </div>
                    </form>
                  </div>
                  <div>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeCompra" tag="button" class="btn btn-info">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="editarCompra()" class="btn btn-success">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                          </div>
                          <br>
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
      this.getIdCompra();
  },
  data () {
    return {
      idc: this.$route.params.id,
      compra: new Compra(),
      producto: [],
      fecha: '',
      date: '',
		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    getIdCompra(){
      console.log(this.idv);
      axios.get('http://localhost:3000/compra/'+this.idc).then((response) =>{
          var dia =  moment(response.data[0].fecha).format("D");;
          var mes =  moment(response.data[0].fecha).format("M");;
          var anio =  moment(response.data[0].fecha).format("YYYY");;
          this.date = new Date(anio,mes-1,dia);
      });
    },
    editarCompra(){
                      if (this.date){
                      this.compra.fecha = this.date;
                      axios.put('http://localhost:3000/compra/'+this.idc,
                          this.compra,
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/compra/'+this.idc,
                            'Access-Control-Allow-Methods': 'PUT',
                            'Content-Type': 'application/json'
                             }
                        }).then(alertEditSucessCompra());
                      }else {
                        alertCompletarCampos();
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
width: 900px;
background-color: rgb(70,90,101);
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

.btn-ghost{
  position:relative;
  display:inline-block;
  border: 2pc solid var(--white);
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

.btn:hover{
     background-color: white  !important;
     color: black;
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
