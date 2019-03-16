<template>
  <div id="HomeVenta">
    <div class="container">
      <br>
      <h2 class="animated fadeIn">Ventas</h2>
      <br>
      <div v-if="this.ventas.length" class="animated zoomIn">
          <vue-good-table
              :columns="columns"
              :rows="ventas"
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
         <div style="color:black;">
              <b-modal ref="myModalRef" hide-footer title="Detalles">
                <li v-for="item in this.ventasProducto">
                <b-container fluid>
                  <b-row class="mb-1">
                    <b-col cols="3">ID:</b-col>
                    <b-col>{{item.id_venta}}</b-col>
                  </b-row>
                  <hr>
                  <b-row class="mb-1">
                    <b-col cols="3">Producto</b-col>
                    <b-col>{{item.id_producto}}</b-col>
                  </b-row>
                  <hr>
                  <b-row class="mb-1">
                    <b-col cols="3">Cantidad</b-col>
                    <b-col>{{ item.cantidad }}</b-col>
                  </b-row>
                  <hr>
                  <b-row class="mb-1">
                    <b-col cols="3">Precio</b-col>
                    <b-col>{{item.precio}}</b-col>
                  </b-row>
                  <hr>
                </b-container>
              </li>
              </b-modal>
        </div>
     </div>
    </br>
        <router-link to="/NuevaVenta" tag="button" class="btn botonVenta" style="float: left;">
          <i class="fas fa-plus-circle fa-1x"></i>
          Nueva Venta
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
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete } from '../../assets/sweetAlert.js';

export default {
  name: 'HomeVenta',
  created(){
    this.getVenta();
  },
  data () {
    return {
      idv:'',
      lista: [],
      modalShow: false,
      ventas: [],
      ventasProducto: [],
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
        }
      ],
		}
  },
  computed:{

    },
  mounted(){
  },
  methods: {
    getVenta(){
        axios.get('http://localhost:3000/venta').then((response) =>{
          this.ventas = response.data;
          console.log(this.ventas);
        });
    },


    eliminarVenta(id){
        console.log(id);
        this.idv = id;
        axios.delete('http://localhost:3000/venta/'+this.idv).then((data)=>{
          console.log(data)
          this.getVenta()
        }).then(alertSucessDelete()).then(this.hideModal());
    },
    onRowClick(params) {
        this.$refs.myModalRef.show()
        console.log(params.row);
            axios.get('http://localhost:3000/ventaProducto/'+ params.row.id_venta).then((response) =>{
              this.ventasProducto = response.data;
              console.log(this.ventasProducto);
            });


    },
    hideModal() {
        this.$refs.myModalRef.hide()
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

a {
  color: #42b983;
}

#formulario{
  background-color: rgba(0,0,0,0.8);
  width: 450px;
}

.botonVenta{
  background-color: #fec400;
}

.botonVenta:hover{
  background-color: white;
}


</style>
