<template>
  <div>
    <div class="container">
    <br>
    <h2 class="animated fadeIn" style="color:white; text-align:center;"> Productos</h2>
    <br>
      <div v-if="this.productos.length" class="animated zoomIn">
          <vue-good-table
              :columns="columns"
              :rows="productos"
              title="Ver Opciones y Detalles"
              :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Producto',
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
     <div style="color:black;">
       <b-modal
           ref="myModalRef"
           title="Detalle Producto"
           :header-bg-variant="headerBgVariant"
           :header-text-variant="headerTextVariant"
           :body-bg-variant="bodyBgVariant"
           :body-text-variant="bodyTextVariant"
           :footer-bg-variant="footerBgVariant"
           :footer-text-variant="footerTextVariant"
            size="lg"
     >
     <b-container fluid>
           <b-row class="mb-1">
             <b-col cols="3">ID:</b-col>
               <b-col>{{idp}}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Modelo:</b-col>
               <b-col>{{modelo}}</b-col>
           </b-row>
           <b-row class="mb-1">
             <b-col cols="3">Marca:</b-col>
               <b-col>{{ marca }}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Descripcion:</b-col>
               <b-col>{{descripcion}}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">TipoProducto:</b-col>
               <b-col>{{ tipoproducto }}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Stock:</b-col>
               <b-col>{{ stock }}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Precio:</b-col>
               <b-col>{{ precio }}</b-col>
           </b-row>
     </b-container>
     <div slot="modal-footer" class="w-100">
       <p class="float-left">Opciones</p>
       <div style="float:right;">
           <button class="btn btn-danger" v-on:click="eliminarProducto(idp)" title="Eliminar Producto">
                 <i class="fas fa-trash fa-1x"></i>
                 Eliminar
           </button>
           <router-link :to="/editarProducto/+idp" active-class="activo" class="btn" style="background-color:yellow;" tag="button" title="Editar Producto" >
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
  created(){
    this.getProducto()
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
      modalShow: false,
      idp: '',
      modelo: '',
      marca: '',
      descripcion:'',
      tipoproducto:'',
      stock:'',
      precio: '',
      productos: [],
      //field nombre del atributo en la Lista Producto
      columns: [
        {
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

          filterOptions: {
        	  enabled: true, // enable filter for this column
            placeholder: 'Filtrar Todo', // placeholder for filter input
            filterDropdownItems: ['Smartphone', 'Iphone'], // dropdown (with selected values) instead of text input
            trigger: 'enter', //only trigger on enter not on keyup
          },


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
  mounted(){

  },
  methods: {
    getProducto(){
      console.log(this.productos)
      axios.get('http://localhost:3000/producto').then(response=>{
          this.productos = response.data;
          //console.table(this.productos);
      }).catch((error)=>{
        console.log(error);
      })
    },
    eliminarProducto(idp){
      axios.delete('http://localhost:3000/producto/'+idp).then((data)=>{
        this.getProducto();
      }).then(this.$swal.fire(
          'Eliminado!',
          'Ha sido elimando',
          'success'
    )).then(this.hideModal());

    },
    onRowClick(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.idp = params.row.id_producto;
        this.modelo = params.row.modelo;
        this.marca = params.row.marca;
        this.descripcion = params.row.descripcion;
        this.tipoproducto = params.row.tipoproducto;
        this.stock = params.row.stock;
        this.precio = params.row.precio;

    },
    hideModal() {
        this.$refs.myModalRef.hide()
    },
    exportarPdf(){
        var columnas = [
          {title: "MODELO", dataKey:"modelo"},
          {title: "MARCA", dataKey:"marca"},
          {title: "DESCRIPCION", dataKey:"descripcion"},
          {title: "TIPOPRODUCTO", dataKey:"tipoproducto"},
          {title: "STOCK", dataKey:"stock"},
          {title: "PRECIO", dataKey:"precio"}

          ]
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var doc = new jsPDF();
        doc.autoTable(columnas,this.productos);
        doc.save(now+'-productos.pdf');
      },
      exportarXls() {
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var productos = XLSX.utils.json_to_sheet(this.productos);
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        XLSX.utils.book_append_sheet(wb, productos, this.productos);
        XLSX.writeFile(wb,now+'-productos.xlsx');
      },
      exportarCsv() {
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var productos = XLSX.utils.json_to_sheet(this.productos);
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        XLSX.utils.book_append_sheet(wb, productos, this.productos);
        XLSX.writeFile(wb,now+'-productos.csv');
      }


}
}
</script>

<style scoped>
#HomeProducto{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

.buttonProducto{
  background-color: #fec400;
}

.buttonProducto:hover{
  background-color: white;
}

</style>
