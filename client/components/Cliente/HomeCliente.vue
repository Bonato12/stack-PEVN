<template>
  <div id="Cliente">
    <div class="container">
    </br>
    <h2 class="animated fadeIn"> Clientes</h2>
    </br>
    <div v-if="datos.length" class="animated zoomIn">
        <vue-good-table
              :columns="columns"
              :rows="datos"
              title="Ver Opciones y Detalles"
              :search-options="{
                  enabled: true,
                  skipDiacritics: true,
                  placeholder: 'Buscar Cliente',
              }"
              @on-row-click="detalleCliente"
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
            title="Detalle Cliente"
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
                <b-col>{{cliente.id_cliente}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Dni:</b-col>
                <b-col>{{cliente.dni}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Nombre:</b-col>
                <b-col>{{cliente.nombre}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Apellido:</b-col>
                <b-col>{{cliente.apellido}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Ciudad:</b-col>
                <b-col>{{cliente.ciudad}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Direccion:</b-col>
                <b-col>{{cliente.direccion}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Telefono:</b-col>
                <b-col>{{cliente.telefono}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Mail:</b-col>
                <b-col>{{cliente.mail}}</b-col>
            </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <p class="float-left">Opciones</p>
        <div style="float:right;">
            <button class="btn btn-danger" v-on:click="eliminarCliente(cliente.id_cliente)" title="Eliminar Cliente">
                <i class="fas fa-trash fa-1x">

                </i>
                Eliminar
            </button>
            <router-link :to="/EditarCliente/+cliente.id_cliente"  class="btn" style="background-color:yellow;" tag="button" title="Editar Cliente">
                <i class="fas fa-edit fa-1x">

                </i>
                Editar
            </router-link>
            <button class="btn btn-success" v-on:click="enviarMail()" title="Enviar Mail">
                <i class="fas fa-envelope fa-1x">

                </i>
                Enviar Mail
            </button>
      </div>
      </div>
    </b-modal>
    </div>
    </br>
    <router-link to="/HomeCliente/NuevoCliente" tag="button" class="btn buttonCliente" style="float: left;"  >
        <i class="fas fa-plus-circle fa-1x"></i>
        Nuevo Cliente
    </router-link>
    <button type="button" class="btn btn-danger" v-on:click="exportarPdf()" style="float:right;">
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
import Cliente from '../../models/Cliente';
import imgData from '../../assets/imagenPDF';

export default {
  name: 'Cliente',
  created(){
        this.getCliente();
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
        datos: [],
        cliente:  new Cliente(),
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
       ]
      }
  },
  mounted(){

  },
  methods: {

    getCliente(){
        axios.get('http://localhost:3000/cliente').then((response) =>{
          this.datos = response.data;
          //console.table(this.datos);
        });
    },
    eliminarCliente(id) {
          axios.delete('http://localhost:3000/cliente/' + id).then((data)=>{
                this.getCliente();
          }).then(this.$swal.fire(
              'Eliminado!',
              'Ha sido elimando',
              'success'
        )).then(this.hideModal());
    },
    enviarMail() {
      axios.get('http://localhost:3000/cliente/'+this.cliente.id_cliente).then((response) =>{
        this.cliente = new Cliente(this.cliente.id_cliente,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].ciudad,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
        axios.post('http://localhost:3000/email',
        this.cliente
      )});
    },
    exportarPdf(){
        var columnas = [
          {title: "DNI", dataKey:"dni"},
          {title: "NOMBRE", dataKey:"nombre"},
          {title: "APELLIDO", dataKey:"apellido"},
          {title: "CIUDAD", dataKey:"ciudad"}
          ]
        var doc = new jsPDF();
        doc.addImage(imgData, 'JPEG', 15, 5, 60, 50);
        doc.text(100, 25, 'Listado de Clientes');
        var fecha = new Date();
        doc.text(100, 35, 'Fecha: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
        doc.text(100, 45, 'Hora: '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());

        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        doc.autoTable(columnas,this.datos, {
        				theme : 'grid',
        				margin : {
        					top : 65
        				}
              });
        doc.save(now+'-clientes.pdf');
      },

    detalleCliente(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.cliente.id_cliente = params.row.id_cliente;
        this.cliente.dni = params.row.dni;
        this.cliente.nombre = params.row.nombre;
        this.cliente.apellido = params.row.apellido;
        this.cliente.ciudad = params.row.ciudad;
        this.cliente.direccion = params.row.direccion;
        this.cliente.telefono = params.row.telefono;
        this.cliente.mail = params.row.mail;
    },
    hideModal() {
        this.$refs.myModalRef.hide()
    },
    exportarXls() {
      var fecha = new Date();
      var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
      var clientes = XLSX.utils.json_to_sheet(this.datos)
      var wb = XLSX.utils.book_new() // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, clientes, this.datos)
      XLSX.writeFile(wb,now+'-clientes.xlsx');
    },
    exportarCsv() {
      var fecha = new Date();
      var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
      var clientes = XLSX.utils.json_to_sheet(this.datos)
      var wb = XLSX.utils.book_new() // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, clientes, this.datos)
      XLSX.writeFile(wb,now+'-clientes.csv');
    }
}
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'Numans', sans-serif;
  color: white;
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

a {
  color: #42b983;
}

.buttonCliente{
  background-color: #fec400;

}

.buttonCliente:hover{
  background-color: white;

}


</style>
