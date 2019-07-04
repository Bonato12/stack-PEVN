<template>
  <div id="HomeReparaciones">
  <br>
  <br>
  <div>
          <div class="card-header" style="background-color:#FFD700; ">
            <h2 style="text-align:center; color:black;">
                <i class="fas fa-tools"></i>
                <i class="fas fa-clipboard-list"></i>
                Reparaciones
             </h2>
          </div>
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
              @on-row-click="onRowClick"
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
         </vue-good-table>
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
      fecha: '',
      fechafin: '',
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
      id_reparacion:''
		}
  },


}

</script>

<style>
#HomeReparaciones {
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
