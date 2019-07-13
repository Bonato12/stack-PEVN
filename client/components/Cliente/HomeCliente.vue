<template>
  <div id="Cliente">
    <div class="container animated zoomIn">
    </br>
    </br>
    <div>
        <div class="card-header" style="background-color:#FFD700; ">
          <h2 style="text-align:center; color:black;">
              <i class="fas fa-user"></i>
              <i class="fas fa-clipboard-list"></i>
              Clientes
           </h2>
        </div>
    </div>
    <div v-if="datos.length" style="tabla">
      <vue-good-table
            :columns="columns"
            :rows="datos"
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
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'opciones'">
                <button @click="eliminarCliente(props.row)" class="btn btn-danger"  title="Eliminar Cliente">
                      <i class="fas fa-trash-alt"></i>
                </button>
                <button @click="editar(props.row)" class="btn btn-warning" title="Editar Cliente">
                      <i class="fas fa-edit"></i>
                </button>
                <button  class="btn btn-success" @click="modalMail(props.row)" title="Enviar Mail">
                    <i class="fas fa-envelope fa-1x"></i>
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
                     Detalle del Cliente #{{cliente.id_cliente}}
                   </h2>
                   <button class="modal-default-button" @click="hide()">
                    <i class="far fa-times-circle"></i>
                   </button>
                 </slot>
               </div>
               <div class="modal-body" style="background-color:#f1f8e9;">
                 <slot name="body">
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
                 </slot>
               </div>
               <div class="modal-header" style="background-color:#FEC404;" >
                 <h2 class="opciones" style="color:white;">Opciones</h2>
                 <div class="row" style="float:right; padding-right:15px;">
                      <div>
                        <button class="btn btn-danger" v-on:click="eliminarCliente(cliente.id_cliente)" title="Eliminar Cliente">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <div style="width:5px;">
                      </div>
                      <div>
                        <router-link class="btn btn-dark" :to="/EditarCliente/+cliente.id_cliente" tag="button" title="Editar Cliente">
                            <i class="fas fa-edit fa-1x"></i>

                        </router-link>
                      </div>
                      <div style="width:5px;">
                      </div>
                      <div>
                        <button  class="btn btn-success" v-on:click="enviarMail()" title="Enviar Mail">
                            <i class="fas fa-envelope fa-1x"></i>
                        </button>
                      </div>
                  </div>
              </div>
             </div>
           </div>
         </div>
       </transition>
       <transition v-if="showModalMail" class="animation fadeInLeft" name="modal">
         <div class="modal-mask">
           <div class="modal-wrapper">
             <div class="modal-container animated fadeInLeft">
               <div class="modal-header" style="background-color:#424242;">
                 <slot name="header">
                   <h2 style="color:white; text-align:left;">
                     <i class="fas fa-id-card"></i>
                     Enviar Mail
                   </h2>
                   <button class="modal-default-button" @click="hide()">
                    <i class="far fa-times-circle"></i>
                   </button>
                 </slot>
               </div>
               <div class="modal-body" style="background-color:#f1f8e9;">
                 <form @submit.prevent="enviarMail()">
                 <div class="input-group form-group">
                       <h4>Para : {{cliente.mail}} </h4>
                 </div>
                 <div class="input-group form-group">
                     <textarea required type="text" v-model="mensaje" class="form-control" placeholder="Ingrese Mensaje"></textarea>
                 </div>
                 <button type="submit" class="btn btn-success"  title="Enviar Mail">
                     <i class="far fa-save fa-1x"></i>
                     Enviar
                 </button>
               </form>
               </div>
               <div class="modal-header" style="background-color:#FEC404;" >
              </div>
             </div>
           </div>
         </div>
       </transition>
    <div>
        <br>
        <router-link to="/HomeCliente/NuevoCliente" tag="button" class="btn btn-warning" style="float: left;"  >
            <i class="fas fa-plus-circle fa-1x"></i>
            Nuevo Cliente
        </router-link>
        <div class="row" style="float:right; padding-right:15px;">
            <button type="button" class="btn btn-danger" v-on:click="exportarPdf()" style="float:right;">
                <i class="fa fa-file-pdf" aria-hidden="true"></i>
                Exportar Pdf
            </button>
            <div style="width:5px;">
            </div>
            <button type="button" class="btn btn-success" v-on:click="exportarXls()" >
              <i class="fa fa-file-excel" aria-hidden="true"></i>
                Exportar Excel
            </button>
            <div style="width:5px;">
            </div>
            <button type="button" class="btn btn-info" v-on:click="exportarCsv()">
              <i class="fa fa-file-csv" aria-hidden="true"></i>
                Exportar Csv
            </button>
         </div>
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
import { alertSucessDelete,alertError,alertWarningFK,alertSucessMail } from '../../assets/sweetAlert.js';




export default {
  name: 'Cliente',
  created(){
        this.getCliente();


  },
  data () {
    return {
      showModal: false,
      showModalMail: false,
      destinatario: '',
      mensaje: '',
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
          label: 'Direccion',
          field: 'direccion',

        },
        {
          label: 'Telefono',
          field: 'telefono',

        },
        {
          label: 'Mail',
          field: 'mail',
          width: '50px'
        },
        {
          label: 'Opciones',
          field: 'opciones',
        }
      ],
      }
  },
  methods: {

    getCliente(){
        axios.get('http://localhost:3000/cliente').then((response) =>{
          this.datos = response.data;
          //console.table(this.datos);
        });
    },
    eliminarCliente(cliente) {
        console.log(JSON.stringify(cliente.id_cliente));
        this.$swal({
            title: 'Estas Seguro?',
            text: "No se podran recuperar los datos!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
            }).then((result) => {
            if (result.value) {
              axios.delete('http://localhost:3000/cliente/' + cliente.id_cliente).then((data)=>{
                console.log("Hola");
                console.log(data);
                  this.$swal(
                    'Eliminado!',
                    'El Cliente ha sido eliminado.',
                    'success'
                  ).then(this.getCliente())
              })
            }
            })

    },
    /*
    enviarMail() {
        axios.get('http://localhost:3000/cliente/'+this.cliente.id_cliente).then((response) =>{
          this.cliente = new Cliente(this.cliente.id_cliente,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
          axios.post('http://localhost:3000/email',
            this.cliente
          )});
    },
    */
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
        //this.showModal = true;
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
      this.showModalMail = false;
    },
    editar(params){
      console.log(JSON.stringify(params));
      this.$router.push('/EditarCliente/'+params.id_cliente)
    },
    modalMail(cliente){
      console.log(cliente);
      this.showModalMail = true;
      this.destinatario = cliente.mail
    },
    enviarMail() {
          axios.post('http://localhost:3000/email',
            {
              mensaje: this.mensaje,
              destinatario : this.destinatario
            },
            {
            headers:{
            'Access-Control-Allow-Origin': 'http://localhost:3000/mail',
            'Content-Type': 'application/json'
             }
        }).then(alertSucessMail());
    },


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
  border-radius: 8px;
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




.opciones{
  text-align:left !important;
}



.btn{
  -webkit-transition: -webkit-transform .8s ease-in-out;
}

.tabla{
  z-index: -1;
}


</style>
