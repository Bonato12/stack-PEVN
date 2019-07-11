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
                       Editar Reparacion
                     </h2>
                  </div>
                  <hr style="color:black;">
                  <div class="card-body">
                  <form style="margin-left: 30px; margin-top:30px;">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Fecha Inicial</span>
                        </div>
                        <datepicker  class="datepicker" :language="es"  v-model="dateIni" name="fecha"
                            @opened="datepickerAbierto"
                            @selected="fechaSeleccionada"
                            @closed="datepickerCerrado">
                        </datepicker>
                      </div>
                      <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Fecha Final</span>
                          </div>
                          <datepicker  class="datepicker"  v-model="dateFin" name="fecha"
                              @opened="datepickerAbierto"
                              @selected="fechaSeleccionada"
                              @closed="datepickerCerrado">
                          </datepicker>
                        </div>
                    </form>
                  </div>
                  <div>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeReparacion" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="editarReparacion()" class="botones" style="width:115px; background-color:#fec400;">
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
import Reparacion from '../../models/Reparacion';
import moment from 'moment';

export default {
  name: 'EditarCompra',
  created(){
      this.getIdReparacion();
  },
  data () {
    return {
      idr: this.$route.params.id,
      reparacion: new Reparacion(),
      fecha: '',
      dateIni: '',
      dateFin: ''
		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    getIdReparacion(){
      console.log(this.idr);
      axios.get('http://localhost:3000/reparacion/'+this.idr).then((response) =>{
          var diaIni =  moment(response.data[0].fecha_ini).format("D");;
          var mesIni =  moment(response.data[0].fecha_ini).format("M");;
          var anioIni =  moment(response.data[0].fecha_ini).format("YYYY");
          if (response.data[0].fecha_fin){
            var diaFin =  moment(response.data[0].fecha_fin).format("D");;
            var mesFin =  moment(response.data[0].fecha_fin).format("M");;
            var anioFin =  moment(response.data[0].fecha_fin).format("YYYY");
            this.dateFin = new Date(anioFin,mesFin-1,diaFin);
          }

          this.dateIni = new Date(anioIni,mesIni-1,diaIni);

      });
    },
    editarReparacion(){
                      if (this.dateIni){
                      this.reparacion.fecha_ini = this.dateIni;
                      this.reparacion.fecha_fin = this.dateFin;
                      axios.put('http://localhost:3000/reparacion/'+this.idr,
                          this.reparacion,
                          {
                            headers:{
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
