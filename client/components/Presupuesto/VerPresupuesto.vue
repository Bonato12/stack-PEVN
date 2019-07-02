<template>
  <div>
    <div class="container animated zoomIn">
      <br>
      <br>
      <div>
          <div class="card-header" style="background-color:#FFD700; ">
            <h2 style="text-align:center; color:black;">
                <i class="fas fa-tools"></i>
                <i class="fas fa-clipboard-list"></i>
                Presupuesto {{presupuesto.id_presupuesto}}
             </h2>
          </div>
          <div class="modal-body" style="background-color:#f1f8e9;">
            <slot name="body">
              <b-row class="mb-1">
                 <b-col cols="3">ID:</b-col>
                   <b-col>{{presupuesto.id_presupuesto}}</b-col>
               </b-row>
               <hr>
               <b-row class="mb-1">
                 <b-col cols="3">Dni:</b-col>
                   <b-col>{{presupuesto.arreglo}}</b-col>
               </b-row>
               <hr>
               <b-row class="mb-1">
                 <b-col cols="3">Nombre:</b-col>
                   <b-col>{{presupuesto.observacion}}</b-col>
               </b-row>
               <hr>
               <b-row class="mb-1">
                 <b-col cols="3">Apellido:</b-col>
                   <b-col>{{presupuesto.precioTotal}}</b-col>
               </b-row>
               <hr>
            </slot>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete } from '../../assets/sweetAlert.js';
import moment from 'moment';

export default {
  name: 'HomeVenta',
  created(){
    this.getPresupuesto();
  },
  data () {
    return {
      idp: this.$route.params.id,
      showModal: false,
      presupuesto:'',
      arreglo: [],
      fecha: '',
      columns: [
        {
          label: 'Cliente',
          field: 'cliente',
        },
        {
          label: 'Producto',
          field: 'producto',
        },
        {
          label: 'Fecha',
          field: 'fecha',
        },
        {
          label: 'Observacion',
          field: 'observacion',
        },
        {
          label: 'Condicion',
          field: 'condicion',
        }
      ],
		}
  },
  computed:{

    },
  mounted(){
  },
  methods: {
    getPresupuesto(){
        axios.get('http://localhost:3000/presupuesto/'+this.idp).then((response) =>{
          this.presupuesto = JSON.stringify(response.data[0]);
          console.log(this.presupuesto);
        });
    },
    eliminarArreglo(){
        axios.delete('http://localhost:3000/arreglo/'+this.ida).then((data)=>{
          console.log(data)
          this.getArreglo()
        }).then(alertSucessDelete()).then(this.hide());
    },



}
}
</script>

<style>
#HomeVenta {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-family: 'Numans', sans-serif;
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

#formulario{
  background-color: rgba(0,0,0,0.8);
  width: 450px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;

}

.modal-container {
  width: 1000px;
  height: auto;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  border-radius: 10px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}




</style>
