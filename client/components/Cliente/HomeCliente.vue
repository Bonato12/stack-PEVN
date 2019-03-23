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
       <transition v-if="showModal" class="animation fadeIn" name="modal">
         <div class="modal-mask">
           <div class="modal-wrapper">
             <div class="modal-container">
               <div class="modal-header">
                 <slot name="header">
                   <h2>Detalles</h2>
                   <button class="modal-default-button" @click="hide()">
                    <i class="far fa-times-circle"></i>
                   </button>
                 </slot>
               </div>

               <div class="modal-body">
                 <slot name="body">
                    <div class="row">
                      <div class="col s12 m7">
                        <div class="card">
                          <div class="card-image">
                            <img class="imagen" src="http://4.bp.blogspot.com/-qoZRsX8SN40/UkRCN-0EdxI/AAAAAAAAUI0/CIuaCzWXhVM/s1600/Descargar+Pack+Fondos+de+Pantalla+Personas+%252865%2529.jpg">
                            <span class="card-title">Cliente</span>
                            <a style="margin-right:100px;" v-on:click="eliminarCliente(cliente.id_cliente)" class="btn-floating halfway-fab waves-effect waves-light red"><i class="fas fa-trash-alt"></i></a>
                            <router-link style="margin-right:50px;" tag="a" :to="/EditarCliente/+cliente.id_cliente" class="btn-floating halfway-fab waves-effect waves-light yellow" title="Editar Cliente"> <i class="fas fa-edit fa-1x"></i></router-link>
                            <a style="margin-right:0px;" v-on:click="enviarMail()" class="btn-floating halfway-fab waves-effect waves-light green"><i class="fas fa-envelope fa-1x"></i></a>
                          </div>
                          <div class="card-content">
                            <h3>Sebastian Bonato</h3></i>
                            <h5>
                              <i class="far fa-address-card"></i>
                              {{cliente.dni}}
                            </h5>
                            <h5>
                              <i class="fas fa-map-marker-alt"></i>
                              8 De Junio, Concepcion del Uruguay
                            </h5>
                            <h5>
                                  <i class="fas fa-mobile-alt"></i>
                                  {{cliente.telefono}}
                            </h5>
                                <h5>
                                  <i class="fas fa-envelope-square"></i>
                                  {{cliente.mail}}
                                </h5>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                 </slot>
               </div>
             </div>
           </div>
         </div>
       </transition>
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
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete } from '../../assets/sweetAlert.js';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'



export default {
  name: 'Cliente',
  created(){
        this.getCliente();

  },
  data () {
    return {
      showModal: false,
        datos: [],
        Lista: [],
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
        }).then(alertSucessDelete()).then(this.hide());
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
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        doc.addImage(imgData, 'JPEG', 15, 5, 80, 40);
        doc.text(15,60,'Lista Clientes')
        doc.text(15, 70, 'Fecha: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
        doc.text(65, 70, 'Hora: '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());
        doc.autoTable(columnas,this.datos, {
        				theme : 'grid',
        				margin : {
        					top : 75
        				}
              });
        doc.save(now+'-clientes.pdf');
      },

    detalleCliente(params) {
        this.showModal = true;
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
    },
    hide(){
      this.showModal = false;
    }

}
}
</script>

<style scoped>

html,body{
background-image: url('../Administrar/background.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
background-color: #063A5E;
background-blend-mode: multiply;
}

.image{
  background-image: url('../Administrar/background.jpg');
  background-color: #063A5E;
  background-blend-mode: luminosity;

}

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


.buttonCliente{
  background-color: #fec400;

}

.buttonCliente:hover{
  background-color: white;

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
  width: 500px;
  height: 630px;

  margin: 0px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  border-radius: 20px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
