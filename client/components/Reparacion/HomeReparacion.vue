<template>
  <div id="HomeReparaciones">
  <br>
  <br>
  <div class="container">
          <div class="card-header" style="background-color:#FFD700; ">
            <h2 style="text-align:center; color:black;">
                <i class="fas fa-tools"></i>
                <i class="fas fa-clipboard-list"></i>
                Reparaciones
             </h2>
          </div>
    <div v-if="this.reparacion.length">
      <vue-good-table
              :columns="columns"
              :rows="reparacion"
              title="Ver Opciones y Detalles"
              :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Reparacion',
              }"
              :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  perPage: 5,
                  perPageDropdown: [3, 7, 9],
                  dropdownAllowAll: false,
                  setCurrentPage: 1,
                  nextLabel: 'Siguiente',
                  prevLabel: 'Anterior',
                  rowsPerPageLabel: 'Filas por paginas',
                  ofLabel: 'of',
                  pageLabel: 'page', // for 'pages' mode
                  allLabel: 'All',
                }"

                theme="default">
                <template slot="table-row" slot-scope="props" >
                  <span v-if="props.column.field == 'opciones'">
                    <button @click="verMas(props.row)" class="btn btn-info" style="width:150px;"  title="Ver Mas" >
                        <i class="fas fa-clipboard-list"></i>
                        Ver Mas
                    </button>
                  </span>
                </template>
         </vue-good-table>
       </div>
       <transition v-if="showModal" class="animation fadeInLeft" name="modal">
         <div class="modal-mask">
           <div class="modal-wrapper">
             <div class="modal-container animated fadeInLeft">
               <div class="modal-header" style="background-color:#424242;">
                 <slot name="header">
                   <h2 style="color:white; text-align:left;">
                     <i class="fas fa-id-card"></i>
                     Detalles
                   </h2>
                   <button class="modal-default-button" @click="hideModal()">
                    <i class="far fa-times-circle"></i>
                   </button>
                 </slot>
               </div>
               <div class="modal-body" style="background-color:#f1f8e9;">
                 <slot name="body">
                   <b-row class="mb-1">
                      <b-col cols="3">ID:</b-col>
                        <b-col></b-col>
                    </b-row>
                    <hr>
                    <b-row class="mb-1">
                      <b-col cols="3">Dni:</b-col>
                        <b-col></b-col>
                    </b-row>
                    <hr>
                    <b-row class="mb-1">
                      <b-col cols="3">Nombre:</b-col>
                        <b-col></b-col>
                    </b-row>
                    <hr>
                    <b-row class="mb-1">
                      <b-col cols="3">Apellido:</b-col>
                        <b-col></b-col>
                    </b-row>
                    <hr>
                    <b-row class="mb-1">
                      <b-col cols="3">Direccion:</b-col>
                        <b-col></b-col>
                    </b-row>
                    <hr>
                    <b-row class="mb-1">
                      <b-col cols="3">Telefono:</b-col>
                        <b-col></b-col>
                    </b-row>
                    <hr>
                    <b-row class="mb-1">
                      <b-col cols="3">Mail:</b-col>
                        <b-col></b-col>
                    </b-row>
                 </slot>
               </div>
               <div class="modal-header" style="background-color:#FEC404;" >
                 <h2 class="opciones" style="color:white;">Opciones</h2>
                 <div class="row" style="float:right; padding-right:15px;">

                      <div>
                        <button class="btn btn-danger" v-on:click="eliminarReparacion()" title="Eliminar Reparacion">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <div style="width:5px;">
                      </div>
                      <div>
                        <router-link class="btn btn-dark" :to="/EditarReparacion/+reparacion.id_reparacion" tag="button" title="Editar Reparacion">
                            <i class="fas fa-edit fa-1x"></i>

                        </router-link>
                      </div>
                      <div style="width:5px;">
                      </div>
                  </div>
              </div>
             </div>
           </div>
         </div>
       </transition>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import { imgData } from '../../assets/imagenPDF';
  import { alertSucessDelete,alertError,alertWarningArregloFK } from '../../assets/sweetAlert.js';
  import moment from 'moment';

  export default {
  name: 'HomeReparaciones',
    created(){
      this.getReparacion();
  },
  data () {
    return {
      idr:'',
      idp: '',
      showModal: false,
      reparacion: [],
      columns: [
        {
          label: 'Reparacion',
          field: 'id_reparacion',
        },
        {
          label: 'Fecha Inicial',
          field: 'fecha_ini',
        },
        {
          label: 'Fecha Final',
          field: 'fecha_fin',
        },
        {
          label: 'Presupuesto',
          field: 'id_presupuesto',
        },
        {
          label: 'Opciones',
          field: 'opciones',
          width: '150px',
        }
      ],
		}
  },
  methods: {
    getReparacion(){
        axios.get('http://localhost:3000/reparacion').then((response) =>{
          this.reparacion = response.data;
          console.log(this.reparacion);
        });
    },
    verMas(reparacion) {
        this.showModal = true;
        console.log(reparacion);
        this.reparacion.id_reparacion = reparacion.id_reparacion;
    },
    hideModal(){
      this.showModal = false;
    }


}
}

</script>
<style>
#HomeReparaciones{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-family: 'Numans', sans-serif;
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
