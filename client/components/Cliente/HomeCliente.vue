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
        doc.addImage(imgData, 'JPEG', 15, 5, 60, 20);
        doc.text(16, 10, '');
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        doc.autoTable(columnas,this.datos, {
        				theme : 'grid',
        				margin : {
        					top : 30
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
