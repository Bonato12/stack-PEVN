<template>
  <div id="Cliente">
    <div class="container">
      </br>
          <h2 style="text-align:center; color:white;"> Proveedores </h2>
      </br>
      <div v-if="datos.length" class="animated zoomIn">
          <vue-good-table
                :columns="columns"
                :rows="datos"
                title="Ver Opciones y Detalles"
                :search-options="{
                  enabled: true,
                  skipDiacritics: true,
                  placeholder: 'Buscar Proveedor',
                }"
                @on-row-click="detalleProveedor"
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
     <div style="color:black;" >
          <b-modal
              title="Detalle Proveedor"
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
              :body-bg-variant="bodyBgVariant"
              :body-text-variant="bodyTextVariant"
              :footer-bg-variant="footerBgVariant"
              :footer-text-variant="footerTextVariant"
               size="lg"
               ref="myModalRef"
        >
        <b-container fluid>
              <b-row class="mb-1">
                <b-col cols="3">ID:</b-col>
                  <b-col>{{proveedor.id_proveedor}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Dni:</b-col>
                  <b-col>{{proveedor.dni}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Nombre:</b-col>
                  <b-col>{{proveedor.nombre}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Apellido:</b-col>
                  <b-col>{{proveedor.apellido}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Direccion:</b-col>
                  <b-col>{{proveedor.direccion}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Telefono:</b-col>
                  <b-col>{{proveedor.telefono}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Mail:</b-col>
                  <b-col>{{proveedor.mail}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Descripcion:</b-col>
                  <b-col>{{ proveedor.descripcion }}</b-col>
              </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <p class="float-left">Opciones</p>
          <div style="float:right;">
              <button class="btn btn-danger" v-on:click="eliminarProveedor(proveedor.id_proveedor)" title="Eliminar Proveedor">
                  <i class="fas fa-trash-alt"></i>
                  Eliminar
              </button>
              <router-link :to="/EditarProveedor/+proveedor.id_proveedor"  class="btn" style="background-color:yellow;" tag="button" title="Editar Proveedor">
                  <i class="fas fa-edit fa-1x">
                  </i>
                  Editar
              </router-link>
        </div>
      </div>
      </b-modal>
    </div>
    </br>
    </br>
      <router-link tag="button" to="/HomeProveedor/NuevoProveedor" class="btn" style="float:left;">
            <i class="fas fa-plus-circle fa-1x"></i>
            Nuevo Proveedor
      </router-link>
      <div class="row" style="float:right;">
          <button type="button" class="btn" v-on:click="exportarPdf()"  style="float:right;">
              <i class="fa fa-file-pdf" aria-hidden="true"></i>
              Exportar Pdf
          </button>
          <button type="button" class="btn"  v-on:click="exportarXls()" >
            <i class="fa fa-file-excel" aria-hidden="true"></i>
              Exportar Excel
          </button>
          <button type="button" class="btn"  v-on:click="exportarCsv()">
            <i class="fa fa-file-csv" aria-hidden="true"></i>
              Exportar Csv
          </button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import Proveedor from '../../models/Proveedor';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from 'xlsx'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete } from '../../assets/sweetAlert.js';

export default {
  created(){
    this.getProveedor();
  },
  data () {
    return {
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      idp: '',
      proveedor: new Proveedor(),
      datos: [],
      columns: [
        {
          label: 'Dni',
          field: 'dni',
          type: 'number',
        },
        {
          label: 'Nombre',
          field: 'nombre',
        },
        {
          label: 'Apellido',
          field: 'apellido',

        },
        {
          label: 'Telefono',
          field: 'telefono',

        },
        {
          label: 'Mail',
          field: 'mail',
        },
        {
          label: 'Descripcion',
          field: 'descripcion',
        },
      ],

		}
  },
  mounted(){

  },
  methods: {
    getProveedor(){
        axios.get('http://localhost:3000/proveedor').then((response) =>{
          this.datos = response.data;
        });
  },
  eliminarProveedor(id) {
        axios.delete('http://localhost:3000/proveedor/' + id).then((data)=>{
              this.getProveedor();
        }).then(alertSucessDelete()).then(this.hideDetalle());
  },
  exportarPdf(){
      var columnas = [
        {title: "DNI", dataKey:"dni"},
        {title: "NOMBRE", dataKey:"nombre"},
        {title: "APELLIDO", dataKey:"apellido"},
        {title: "TELEFONO", dataKey:"telefono"},
        {title: "MAIL", dataKey:"mail"},
        {title: "DESCRIPCION", dataKey:"descripcion"}

        ]
        var doc = new jsPDF();
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        doc.addImage(imgData, 'JPEG', 15, 10, 80, 40);
        doc.text(15,60,'Lista Proveedores')
        doc.text(15, 70, 'Fecha: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
        doc.text(65, 70, 'Hora: '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());
        doc.autoTable(columnas,this.datos,{
            theme: 'grid',
            margin: {
              top: 75
            }
        });
        doc.save(now+'-proveedores.pdf');
    },
    exportarXls() {
      var proveedores = XLSX.utils.json_to_sheet(this.datos)
      var wb = XLSX.utils.book_new() // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, proveedores, this.datos);
      XLSX.writeFile(wb, 'proveedores.xlsx');
    },
    exportarCsv() {
      var proveedores = XLSX.utils.json_to_sheet(this.datos)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, proveedores, this.datos)
      XLSX.writeFile(wb, 'proveedores.csv');
    },
    detalleProveedor(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.proveedor.id_proveedor = params.row.id_proveedor;
        this.proveedor.dni = params.row.dni;
        this.proveedor.nombre = params.row.nombre;
        this.proveedor.apellido = params.row.apellido;
        this.proveedor.direccion = params.row.direccion;
        this.proveedor.telefono = params.row.telefono;
        this.proveedor.mail = params.row.mail;
        this.proveedor.descripcion = params.row.descripcion;
    },
    hideDetalle() {
        this.$refs.myModalRef.hide()
    },




  }
}
</script>

<style>



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

.btn{
  padding-top: 3px;
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  background-color: #00c853  !important;
  width:auto;
  height:40px;
  margin-top:-20px;
  border:none;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 10px;
}

</style>
