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
                @on-row-click="detalle"
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
                  <b-col>{{idp}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Dni:</b-col>
                  <b-col>{{dni}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Nombre:</b-col>
                  <b-col>{{nombre}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Apellido:</b-col>
                  <b-col>{{apellido}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Direccion:</b-col>
                  <b-col>{{direccion}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Telefono:</b-col>
                  <b-col>{{telefono}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Mail:</b-col>
                  <b-col>{{mail}}</b-col>
              </b-row>
              <hr>
              <b-row class="mb-1">
                <b-col cols="3">Descripcion:</b-col>
                  <b-col>{{ descripcion }}</b-col>
              </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <p class="float-left">Opciones</p>
          <div style="float:right;">
              <button class="btn btn-danger" v-on:click="eliminarProveedor(idp)" title="Eliminar Proveedor">
                  <i class="fas fa-trash fa-1x">
                  </i>
                  Eliminar
              </button>
              <router-link :to="/EditarProveedor/+idp"  class="btn" style="background-color:yellow;" tag="button" title="Editar Proveedor">
                  <i class="fas fa-edit fa-1x">
                  </i>
                  Editar
              </router-link>
        </div>
      </div>
      </b-modal>
    </div>
      </br>
      <router-link tag="button" to="/NuevoProveedor" class="btn buttonProveedor">
            <i class="fas fa-plus-circle fa-1x"></i>
            Nuevo Proveedor
      </router-link>
      <button type="button" class="btn btn-danger" v-on:click="exportarPdf()"  style="float:right;">
          <i class="fa fa-file-pdf" aria-hidden="true"></i>
          Exportar Pdf
      </button>
      <div style="margin-left:630px;">
          <button type="button" class="btn btn-success"  v-on:click="exportarXls()" >
            <i class="fa fa-file-excel" aria-hidden="true"></i>
              Exportar Excel
          </button>
          <button type="button" class="btn btn-info"  v-on:click="exportarCsv()">
            <i class="fa fa-file-csv" aria-hidden="true"></i>
              Exportar Csv
          </button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from 'xlsx'


export default {
  name: 'Cliente',
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
      dni: '',
      nombre:'',
      apellido:'',
      direccion:'',
      telefono:'',
      mail:'',
      descripcion: '',
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
      //console.table(this.datos);
    });
  },
  eliminarProveedor(id) {
        axios.delete('http://localhost:3000/proveedor/' + id).then((data)=>{
              this.getProveedor();
        }).then(this.$swal.fire(
            'Eliminado!',
            'Ha sido elimando',
            'success'
      )).then(this.hideDetalle());
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
      var doc = new jsPDF()
      doc.autoTable(columnas,this.datos);
      doc.save('proveedores.pdf');
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
    detalle(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.idp = params.row.id_proveedor;
        this.dni = params.row.dni;
        this.nombre = params.row.nombre;
        this.apellido = params.row.apellido;
        this.direccion = params.row.direccion;
        this.telefono = params.row.telefono;
        this.mail = params.row.mail;
        this.descripcion = params.row.descripcion;
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

a {
  color: #42b983;
}

.buttonProveedor{
  float:left;
  background-color: #FEC400;
}

.buttonProveedor:hover{
  float:left;
  background-color: white;
}

</style>
