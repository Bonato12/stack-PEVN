<template>
  <div id="HomeReparaciones">
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
                    <router-link class="btn btn-warning" :to="/EditarReparacion/+props.row.id_reparacion" tag="button" title="Editar Reparacion">
                          <i class="fas fa-edit fa-1x"></i>
                    </router-link>
                  </span>
                </template>
         </vue-good-table>
       </div>
       <br>
       <div class="row" style="float:right; padding-right:15px;">
         <button type="button" class="btn btn-danger" v-on:click="exportarPdf()" style="float:right;">
             <i class="fa fa-file-pdf" aria-hidden="true"></i>
             Exportar Pdf
         </button>
           <div style="width:5px;">
           </div>
           <button type="button" class="btn btn-success"  v-on:click="exportarXls()" >
             <i class="fa fa-file-excel" aria-hidden="true"></i>
               Exportar Excel
           </button>
           <div style="width:5px;">
           </div>
           <button type="button" class="btn btn-info"  v-on:click="exportarCsv()">
             <i class="fa fa-file-csv" aria-hidden="true"></i>
               Exportar Csv
           </button>
       </div>
</div>
</template>

<script>
  import axios from 'axios'
  import * as jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import XLSX from 'xlsx'
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
          label: 'Cliente',
          field: 'dni',
        },
        {
          label: 'Producto',
          field: 'producto',
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
          field: 'observacion',
        },
        {
          label: 'Precio Total',
          field: 'precio_total',
          width: '100px',
        },
        {
          label: 'Opciones',
          field: 'opciones',
          width: '110px',
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
    },

    exportarPdf(){
          var columnas = [
            {title: "CLIENTE", dataKey:"dni"},
            {title: "PRODUCTO", dataKey:"id_producto"},
            {title: "FECHA INICIAL", dataKey:"fecha_ini"},
            {title: "FECHA FINAL", dataKey:"fecha_fin"},
            {title: "TOTAL", dataKey:"precio_total"}
            ]
          var doc = new jsPDF();
          var fecha = new Date();
          var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
          doc.addImage(imgData, 'JPEG', 15, 5, 80, 40);
          doc.text(15,60,'Lista de Reparaciones')
          doc.text(15, 70, 'Fecha: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
          doc.text(65, 70, 'Hora: '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());
          doc.autoTable(columnas,this.reparacion, {
          				theme : 'grid',
          				margin : {
          					top : 75
          				}
                });
          doc.save(now+'-reparacion.pdf');
        },

    exportarXls() {
      var fecha = new Date();
      var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
      var reparar = XLSX.utils.json_to_sheet(this.reparacion)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, reparar, this.reparacion)
      XLSX.writeFile(wb,now+'-reparacion.xlsx');
    },
    exportarCsv() {
      var fecha = new Date();
      var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
      var reparar = XLSX.utils.json_to_sheet(this.reparacion)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, reparar, this.reparacion)
      XLSX.writeFile(wb,now+'-reparacion.csv');
    },




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
  margin-top:100px;
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
