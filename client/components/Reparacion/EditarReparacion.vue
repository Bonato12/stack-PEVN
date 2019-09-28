<template>
      <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-center">
              <div class="card animated fadeInDown">
                  <div class="card-header" style="background-color:#FFD700;">
                    <h2 style="text-align:center; color:black;">
                      <i class="fas fa-tools"></i>
                      <i class="fas fa-cog"></i>
                       Editar Reparacion
                     </h2>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="editarReparacion()" style="margin-left: 30px; margin-top:30px; width:500px;">
                      <div class="form-group row">
                        <label  class="col" style="color:white;">Fecha Inicial</label>
                        <div class="col-10">
                          <datepicker :bootstrap-styling="true" v-model="dateIni"  name="fecha"
                                  >
                          </datepicker>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col" style="color:white;">Fecha Final</label>
                        <div class="col-10">
                          <datepicker :bootstrap-styling="true" v-model="dateFin"  name="fecha"
                                  >
                          </datepicker>
                        </div>
                      </div>
                      <br>
                      <br>
                      <div>
                          <div class="d-flex justify-content-end" style="margin:0 auto; width:500px;">
                              <router-link to="/HomeReparacion" tag="button" class="btn btn-info">
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
import { alertWarningLimiteStock,alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertEditSucessReparacion } from '../../assets/sweetAlert.js'
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
      dateFin: '',
      mail: ''
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
          this.mail = response.data[0].mail;
          console.log(this.mail);
          var diaIni =  moment(response.data[0].fecha_ini).format("D");
          var mesIni =  moment(response.data[0].fecha_ini).format("M");
          var anioIni =  moment(response.data[0].fecha_ini).format("YYYY");
          this.dateIni = new Date(anioIni,mesIni-1,diaIni);
          if (response.data[0].fecha_fin){
            var diaFin =  moment(response.data[0].fecha_fin).format("D");
            var mesFin =  moment(response.data[0].fecha_fin).format("M");
            var anioFin =  moment(response.data[0].fecha_fin).format("YYYY");
            this.dateFin = new Date(anioFin,mesFin-1,diaFin);
          }

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
                            'Content-Type': 'application/json'
                             }
                        }).then(alertEditSucessReparacion(),
                        this.enviarMail());
                      }else {
                        alertCompletarCampos();
                      }
              },
              enviarMail() {
                    console.log(this.mail);
                    axios.post('http://localhost:3000/email',
                      {
                        mensaje: 'ESTIMADO SU REPARACION ESTA HECHA',
                        destinatario : this.mail
                      },
                      {
                      headers:{
                      'Content-Type': 'application/json'
                       }
                  })
              },

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

.btn-guardar{
 margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700  !important;*/
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
