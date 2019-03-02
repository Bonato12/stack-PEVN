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
                <b-col>{{idc}}</b-col>
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
              <b-col cols="3">Ciudad:</b-col>
                <b-col>{{ciudad}}</b-col>
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
      </b-container>
      <div slot="modal-footer" class="w-100">
        <p class="float-left">Opciones</p>
        <div style="float:right;">
            <button class="btn btn-danger" v-on:click="eliminarCliente(idc)" title="Eliminar Cliente">
                <i class="fas fa-trash fa-1x">

                </i>
                Eliminar
            </button>
            <router-link :to="/EditarCliente/+idc"  class="btn" style="background-color:yellow;" tag="button" title="Editar Cliente">
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



class Cliente {
    constructor(id_cliente,dni,nombre,apellido,ciudad,direccion,telefono,mail){
          this.id_cliente = id_cliente
          this.dni = dni,
          this.nombre = nombre,
          this.apellido = apellido,
          this.ciudad = ciudad,
          this.direccion = direccion,
          this.telefono = telefono,
          this.mail = mail
    }
}


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
        idc: '',
        dni: '',
        nombre:'',
        apellido:'',
        ciudad:'',
        direccion:'',
        telefono:'',
        mail:'',
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
      axios.get('http://localhost:3000/cliente/'+this.idc).then((response) =>{
        this.cliente = new Cliente(this.idc,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].ciudad,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
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
        var imgData = 'data:image/png;base64,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';
        var doc = new jsPDF();
        doc.addImage(imgData, 'JPEG', 15, 5, 60, 50);
        doc.text(100, 20, 'Listado de Clientes');
        var fecha = new Date();
        doc.text(100, 30, 'Fecha:'+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
        doc.text(100, 40, 'Hora:'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());

        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        doc.autoTable(columnas,this.datos, {
        				theme : 'grid',
        				margin : {
        					top : 65
        				}
              });
        doc.save(now+'-clientes.pdf');
      },

    onRowClick(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.idc = params.row.id_cliente;
        this.dni = params.row.dni;
        this.nombre = params.row.nombre;
        this.apellido = params.row.apellido;
        this.ciudad = params.row.ciudad;
        this.direccion = params.row.direccion;
        this.telefono = params.row.telefono;
        this.mail = params.row.mail;
    },
    hideModal () {
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
