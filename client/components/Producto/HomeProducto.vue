<template>
<div>
  <div class="container">
    <br>
    <h2 class="animated fadeIn" style="color:white; text-align:center;"> Productos</h2>
    <br>
    <div v-if="this.productos.length" class="animated zoomIn">
      <vue-good-table :columns="columns" :rows="productos" title="Ver Opciones y Detalles" :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Producto',
              }" @on-row-click="detalleProducto"
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
    <div style="color:black;">
      <b-modal style="margin-top:100px;" ref="myModalRef" title="Detalle Producto" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant"
        :footer-text-variant="footerTextVariant" size="xl">
        <b-container fluid>
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
        </b-container>
        <div slot="modal-footer" class="w-100">
          <p class="float-left">Opciones</p>
          <div style="float:right;">
            <button class="btn btn-danger" v-on:click="eliminarProducto(producto.id_producto)" title="Eliminar Producto">
              <i class="fas fa-trash-alt"></i>
              Eliminar
            </button>
            <router-link :to="/editarProducto/+producto.id_producto" active-class="activo" class="btn" style="background-color:yellow;" tag="button" title="Editar Producto">
              <i class="far fa-edit fa-1x"></i>
              Editar
            </router-link>
          </div>
        </div>
      </b-modal>
    </div>
    <br>
    <router-link to="HomeProducto/NuevoProducto" tag="button" class="btn buttonProducto" title="Ir a Nuevo Producto" style="float:left;">
      <i class="fas fa-plus-circle fa-1x">

      </i>
      Nuevo Producto
    </router-link>
    <button type="button" class="btn btn-danger" v-on:click="exportarPdf()" style="float:right;">
      <i class="fa fa-file-pdf" aria-hidden="true"></i>
      Exportar Pdf
    </button>
    <div style="margin-left:630px;">
      <button type="button" class="btn btn-success" v-on:click="exportarXls()">
        <i class="fa fa-file-excel" aria-hidden="true"></i>
        Exportar Excel
      </button>
      <button type="button" class="btn btn-info" v-on:click="exportarCsv()">
        <i class="fa fa-file-csv" aria-hidden="true"></i>
        Exportar Csv
      </button>
    </div>


  </div>
</div>
</template>

<script>
import axios from 'axios'
import Producto from '../../models/Producto';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from 'xlsx'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete } from '../../assets/sweetAlert.js';

export default {
  created() {
    this.getProducto()
  },
  data() {
    return {
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      modalShow: false,
      producto: new Producto(),
      productos: [],
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
          label: 'Descripcion',
          field: 'descripcion',
        },
        {
          label: 'TipoProducto',
          field: 'tipoproducto',
          /*
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Filtrar Todo', // placeholder for filter input
            filterDropdownItems: ['Smartphone', 'Iphone'], // dropdown (with selected values) instead of text input
            trigger: 'enter', //only trigger on enter not on keyup
          },
          */

        },
        {
          label: 'Stock',
          field: 'stock',
          type: 'number',
        },
        {
          label: 'Precio',
          field: 'precio',
          type: 'number',
        },
      ],
    }
  },
  mounted() {

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
      axios.delete('http://localhost:3000/producto/' + id).then((data) => {
        this.getProducto();
      }).then(alertSucessDelete()).then(this.hideModal());

    },
    detalleProducto(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.producto.id_producto = params.row.id_producto;
        this.producto.modelo = params.row.modelo;
        this.producto.marca = params.row.marca;
        this.producto.descripcion = params.row.descripcion;
        this.producto.tipoproducto = params.row.tipoproducto;
        this.producto.stock = params.row.stock;
        this.producto.precio = params.row.precio;

    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    exportarPdf() {
      var columnas = [{
          title: "MODELO",
          dataKey: "modelo"
        },
        {
          title: "MARCA",
          dataKey: "marca"
        },
        {
          title: "DESCRIPCION",
          dataKey: "descripcion"
        },
        {
          title: "TIPOPRODUCTO",
          dataKey: "tipoproducto"
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
  background-color: #063A5E;
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

.buttonProducto {
  background-color: #fec420;
}

.buttonProducto:hover {
  background-color: white;
}
</style>
