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
                    <form @submit.prevent="editarCompra()" style="margin-left: 30px; margin-top:30px; width:500px;">
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
                              <router-link to="/HomeCompra" tag="button" class="btn btn-info">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <button  type="submit"  class="btn btn-success">
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
      fecha: '',
      date: '',
		}
  },
  
  methods: {
    getIdCompra(){
      axios.get('http://localhost:3000/compraFecha/'+this.idc).then((response) =>{
          this.date = new Date(response.data[0].fecha);
      })
    },
    editarCompra(){
                      if (this.date){
                      this.compra.fecha = this.date;
                      axios.put('http://localhost:3000/compra/'+this.idc,
                          this.compra,
                          {
                            headers:{
                            'Content-Type': 'application/json'
                             }
                        }).then(alertEditSuccess());
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
