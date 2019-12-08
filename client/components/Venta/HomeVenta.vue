<template>
  <div id="HomeVenta">
    <div class="container animated zoomIn">
      <br>
      <br>
      <div>
          <div class="card-header" style="background-color:#FFD700; ">
            <h2 style="text-align:center; color:black;">
                <i class="fas fa-shopping-cart"></i>
                Ventas
             </h2>
          </div>
      </div>
      <div v-if="this.ventas.length">
          <vue-good-table
              :columns="columns"
              :rows="ventas"
              :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Venta',
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
                        Detalles
                    </button>
                  </span>
                </template>
         </vue-good-table>
         <div>
              <transition v-if="showModal" class="animation fadeInLeft" name="modal">
                <div class="modal-mask">
                  <div class="modal-wrapper">
                    <div class="modal-container animated fadeInLeft">
                      <div class="modal-header" style="background-color:#424242;">
                        <slot name="header">
                          <h2 style="color:white; text-align:left;">
                            <i class="far fa-list-alt"></i>
                            Venta del {{this.fecha}}
                          </h2>
                          <button class="modal-default-button" @click="hideModal()">
                           <i class="far fa-times-circle"></i>
                          </button>
                        </slot>
                      </div>
                      <div class="modal-body" style="background-color:#f1f8e9;">
                          <table class="table" style="color:black">
                                <thead>
                                      <tr>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Modelo</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="item in this.ventasProducto">
                                        <td scope="col">{{item.marca}}</td>
                                        <td scope="col">{{item.modelo}}</td>
                                        <td scope="col"> {{item.cantidad}}</td>
                                        <td scope="col">{{item.precio}}</td>
                                      </tr>
                                      <tr>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                      </tr>
                                </tbody>
                          </table>
                      </div>
                      <div class="footer">
                        <br>
                        <div class="p-2 flex-grow-1 bd-highlight">
                          <h2 class="opciones" style="color:white; float:left; padding-left:25px;">Opciones</h2>
                        </div>
                        <div class="row" style="float:right; padding-right:35px;">

                          <button class="btn btn-danger" v-on:click="eliminarVenta()" title="Eliminar Venta">
                              <i class="fas fa-trash-alt"></i>
                          </button>
                          <div style="width:5px;">
                          </div>
                          <router-link class="btn btn-dark" :to="/EditarVenta/+this.idv" tag="button" title="Editar Venta">
                              <i class="fas fa-edit fa-1x"></i>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
        </div>
      </div>
      <br>
      <router-link to="/NuevaVenta" tag="button" class="btn btn-warning" style="float: left;">
        <i class="fas fa-plus-circle fa-1x"></i>
        Nueva Venta
      </router-link>
      <div class="row" style="float:right;">
        <div class="col">
          <button type="button" class="btn btn-danger" v-on:click="exportarPdf()" style="float:right;">
              <i class="fa fa-file-pdf" aria-hidden="true"></i>
              Exportar
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-success" v-on:click="exportarXls()" >
            <i class="fa fa-file-excel" aria-hidden="true"></i>
              Exportar
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-info" v-on:click="exportarCsv()">
            <i class="fa fa-file-csv" aria-hidden="true"></i>
              Exportar
          </button>
        </div>
      </div>
  </div>
  <br>
</div>
</template>

<script>

import axios from 'axios'
//import * as jsPDF from 'jspdf';
//import 'jspdf-autotable';
import XLSX from 'xlsx'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete,alertError,alertWarningFK } from '../../assets/sweetAlert.js';
import moment from 'moment';


export default {
  name: 'HomeVenta',
  created(){
    this.getVenta();
  },
  data () {
    return {
      idv:'',
      lista: [],
      showModal: false,
      ventas: [],
      ventasProducto: [],
      fecha: '',
      columns: [
        {
          label: 'Nombre',
          field: 'nombre',
        },
        {
          label: 'Apellido',
          field: 'apellido',
        },
        {
          label: 'Fecha',
          field: 'fecha',
        },
        {
          label: 'Total',
          field: 'total',
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
    getVenta(){
        axios.get('http://localhost:3000/venta').then((response) =>{
          this.ventas = response.data;
          console.log(this.ventas);
        }).catch(error=>{
          console.log(error);
        })
    },
    eliminarVenta(){
          this.showModal = false;
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
              axios.delete('http://localhost:3000/venta/'+this.idv).then((response) => {
              console.log(response);
              if (response.data == "OK"){
                  this.hideModal();
                  alertSucessDelete();
                  this.getVenta();
              }else {
                  alertError();
              }
            }).catch(error=>{
              console.log(error)
            })
          }
          })
    },
    verMas(venta){
        this.showModal = true;
        console.log(venta.id_venta);
        this.idv = venta.id_venta
        axios.get('http://localhost:3000/ventaProducto/'+ venta.id_venta).then((response) =>{
            this.ventasProducto = response.data;
            this.fecha = moment(response.data[0].fecha).format("D/M/YYYY");
            console.log(this.fecha);
            console.log(this.ventasProducto);
        }).catch(error=>{
            console.log(error)
        })
    },
    hideModal(){
      this.showModal = false;
    },

    exportarPdf(){
          /*
          var columnas = [
            {title: "NOMBRE", dataKey:"nombre"},
            {title: "APELLIDO", dataKey:"apellido"},
            {title: "FECHA", dataKey:"fecha"},
            {title: "TOTAL", dataKey:"total"}
            ]
          var doc = new jsPDF();
          var fecha = new Date();
          var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
          doc.addImage(imgData, 'JPEG', 15, 5, 80, 40);
          doc.text(15,60,'Lista Ventas')
          doc.text(15, 70, 'Fecha: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
          doc.text(65, 70, 'Hora: '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());
          doc.autoTable(columnas,this.ventas, {
                  theme : 'grid',
                  margin : {
                    top : 75
                  }
                });
          doc.save(now+'-ventas.pdf');
          */
    },

    exportarXls() {
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var clientes = XLSX.utils.json_to_sheet(this.ventas);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, clientes, this.ventas);
        XLSX.writeFile(wb,now+'-venta.xlsx');
    },
    exportarCsv() {
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var clientes = XLSX.utils.json_to_sheet(this.ventas);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,clientes, this.ventas);
        XLSX.writeFile(wb,now+'-venta.csv');
    },

}
}
</script>

<style>
#HomeVenta {
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


.footer{
  background-color:#FEC404; 
  height:90px;
}

</style>
