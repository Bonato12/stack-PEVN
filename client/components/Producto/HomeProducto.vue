<template>
<div>
  <div class="container animated zoomIn">
    </br>
    </br>
    <div>
        <div class="card-header" style="background-color:#FFD700; ">
          <h2 style="text-align:center; color:black;">
              <i class="fas fa-mobile"></i>
              Productos
           </h2>
        </div>
    </div>
    <div v-if="this.productos.length">
      <vue-good-table :columns="columns" :rows="productos" :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Producto',
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
                    pageLabel: 'page',
                    allLabel: 'All',
                    }"
                theme="default">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'stock'">
                    <div v-if="props.row.stock == 0 ">
                      <span class="waitingForConnection" style="color:red;">Sin Stock</span>
                    </div>
                    <div v-else>
                      <span>{{props.row.stock}}</span>
                    </div>
                  </span>
                </template>
                <template slot="table-row" slot-scope="props" >
                  <span v-if="props.column.field == 'opciones'">
                    <button @click="verMas(props.row)" class="btn btn-info" style="width:150px;"  title="Ver Mas" >
                        <i class="fas fa-clipboard-list"></i>
                        Detalles
                    </button>
                  </span>
                </template>
      </vue-good-table>
    </div>
    <transition v-if="showModal" class="animation fadeInLeft" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container  animated fadeInLeft">
            <div class="modal-header" style="background-color:#424242; border-top-radius:5px;">
              <slot name="header">
                <h2 style="color:white; text-align:left;">
                  <i class="far fa-list-alt"></i>
                  Detalles
                </h2>
                <button class="modal-default-button" @click="hideModal()">
                 <i class="far fa-times-circle"></i>
                </button>
              </slot>
            </div>
            <div class="modal-body" style="background-color:#f1f8e9;">
              <slot name="body">
                <b-row class="mb-1">
                  <b-col cols="3">ID:</b-col>
                  <b-col>{{producto.id_producto}}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">Modelo:</b-col>
                  <b-col>{{producto.modelo}}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">Marca:</b-col>
                  <b-col>{{ producto.marca }}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">Descripcion:</b-col>
                  <b-col>{{producto.descripcion}}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">TipoProducto:</b-col>
                  <b-col>{{ producto.tipoproducto }}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">Stock:</b-col>
                  <b-col>{{ producto.stock }}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">Precio:</b-col>
                  <b-col>{{ producto.precio }}</b-col>
                </b-row>
              </slot>
            </div>
            <div class="footer">
              <br>
              <h2 class="opciones" style="color:white; float:left; padding-left:25px;">Opciones</h2>
              <div  class="row" style="float:right; padding-right:35px;">
                  <button class="btn btn-danger" v-on:click="eliminarProducto(producto.id_producto)" title="Eliminar Producto">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <div style="width:5px;">
                  </div>
                  <router-link class="btn btn-dark" :to="/NuevoProducto/+producto.id_producto"  tag="button" title="Editar Producto">
                    <i class="far fa-edit fa-1x"></i>
                  </router-link>
               </div>
           </div>
          </div>
        </div>
      </div>
    </transition>
    <br>
    <router-link to="/NuevoProducto" tag="button" class="btn btn-warning" title="Ir a Nuevo Producto" style="float:left;">
      <i class="fas fa-plus-circle fa-1x">
      </i>
      Nuevo Producto
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
</div>
</template>

<script>
import axios from 'axios'
import Producto from '../../models/Producto';
//import * as jsPDF from 'jspdf';
//import 'jspdf-autotable';
import XLSX from 'xlsx'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete,alertWarningFK } from '../../assets/sweetAlert.js';

export default {
  created() {
    this.getProducto()
  },
  data() {
    return {
      producto: new Producto(),
      productos: [],
      showModal: false,
      //field nombre del atributo en la Lista Producto
      columns: [{
          label: 'Modelo',
          field: 'modelo',
        },
        {
          label: 'Marca',
          field: 'marca',
        },

        {
          label: 'TipoProducto',
          field: 'tipo_producto',
          width: '150px',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Filtrar Todo', // placeholder for filter input
            filterDropdownItems: ['Celular', 'Repuesto','Para Reparacion','Tablet','Otros'], // dropdown (with selected values) instead of text input
            trigger: 'enter', //only trigger on enter not on keyup
          },
        },
        {
          label: 'Stock',
          field: 'stock',
          type: 'number',
          width: '100px',
          tdClass: 'text-left',
          thClass: 'text-left',
        },
        {
          label: 'Precio',
          field: 'precio',
          type: 'number',
          tdClass: 'text-left',
          thClass: 'text-left',
          width: '130px',
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
    getProducto() {
      console.log(this.productos)
      axios.get('http://localhost:3000/producto').then(response => {
        this.productos = response.data;
      }).catch((error) => {
        console.log(error);
      })
    },

    eliminarProducto(id) {
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
                axios.delete('http://localhost:3000/producto/' + id).then((response) => {
                  console.log(response);
                  if (response.data == "OK"){
                      this.hideModal();
                      this.$swal(
                        'Eliminado!',
                        'El Producto ha sido eliminado.',
                        'success'
                      );
                      this.getProducto();
                  }else {
                     this.$swal('',response.data.msg,'warning');
                  }
                }).catch(error=>{
                    console.log(error);
                });
              }
              })
    },

    verMas(producto) {
        this.showModal = true;
        this.producto.id_producto = producto.id_producto;
        this.producto.modelo = producto.modelo;
        this.producto.marca = producto.marca;
        this.producto.descripcion = producto.descripcion;
        this.producto.tipoproducto = producto.tipo_producto;
        this.producto.stock = producto.stock;
        this.producto.precio = producto.precio;
    },

    exportarPdf() {
      /*
      var columnas = [{
          title: "MODELO",
          dataKey: "modelo"
        },
        {
          title: "MARCA",
          dataKey: "marca"
        },
        {
          title: "TIPOPRODUCTO",
          dataKey: "tipo_producto"
        },
        {
          title: "STOCK",
          dataKey: "stock"
        },
        {
          title: "PRECIO",
          dataKey: "precio"
        }

      ]
      var doc = new jsPDF();
      var fecha = new Date();
      var now = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear() + ':' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
      doc.addImage(imgData, 'JPEG', 15, 5, 80, 40);
      doc.text(15, 60, 'Listado Productos');
      doc.text(15, 70, 'Fecha: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
      doc.text(65, 70, 'Hora: '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds());
      doc.autoTable(columnas, this.productos, {
        theme: 'grid',
        margin: {
          top: 75
        }
      });
      doc.save(now + '-productos.pdf');
      */
    },
    exportarXls() {
      var fecha = new Date();
      var now = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear() + ':' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
      var productos = XLSX.utils.json_to_sheet(this.productos);
      var wb = XLSX.utils.book_new(); // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, productos, this.productos);
      XLSX.writeFile(wb, now + '-productos.xlsx');
    },
    exportarCsv() {
      var fecha = new Date();
      var now = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear() + ':' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
      var productos = XLSX.utils.json_to_sheet(this.productos);
      var wb = XLSX.utils.book_new(); // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, productos, this.productos);
      XLSX.writeFile(wb, now + '-productos.csv');
    },

    hideModal(){
      this.showModal = false;
    }


  }
}
</script>

<style scoped>
#HomeProducto {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'Numans', sans-serif;
  color: white;
}

h1,
h2 {
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



.opciones{
  text-align:left !important;
}

@-webkit-keyframes blinker { from { opacity: 1.0; } to { opacity: 0.0; } }

.waitingForConnection { -webkit-animation-name: blinker; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1); -webkit-animation-duration: 1.1s; }


</style>
