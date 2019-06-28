<template>
  <div id="HomeVenta">
    <div class="container animated zoomIn">
      <br>
      <br>
      <div>
          <div class="card-header" style="background-color:#FFD700; ">
            <h2 style="text-align:center; color:black;">
                <i class="fas fa-cart-plus"></i>
                <i class="fas fa-clipboard-list"></i>
                Arreglos
             </h2>
          </div>
      </div>
      <div v-if="this.ventas.length">
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
         <div>
              <transition v-if="showModal" class="animation fadeIn" name="modal">
                <div class="modal-mask">
                  <div class="modal-wrapper">
                    <div class="modal-container">
                      <div class="modal-header" style="background-color:#424242;">
                        <slot name="header">
                          <h2 style="color:white; text-align:left;">Venta del {{this.fecha}} </h2>
                          <button class="modal-default-button" @click="hide()">
                           <i class="far fa-times-circle"></i>
                          </button>
                        </slot>
                      </div>
                      <div class="modal-body" style="background-color:#f1f8e9;">
                          <table class="table" style="color:black">
                                <thead>
                                      <tr>
                                        <!--
                                        <th scope="col">Id</th>
                                        <th scope="col">Id_Venta</th>
                                      -->
                                        <th scope="col">Marca</th>
                                        <th scope="col">Modelo</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="item in this.ventasProducto">
                                        <!--
                                        <th scope="col">{{item.id_ventaproducto}}</th>
                                        <td scope="col">{{item.id_venta}}</td>
                                      -->
                                        <td scope="col">{{item.marca}}</td>
                                        <td scope="col">{{item.modelo}}</td>
                                        <td scope="col"> {{item.cantidad}}</td>
                                        <td scope="col">{{item.precio}}</td>
                                      </tr>
                                      <tr>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                        <td scope="col"> </td>
                                        <td scope="col">Total: 15000</td>
                                      </tr>
                                </tbody>
                          </table>
                      </div>
                      <div class="modal-header" style="background-color:#FEC404;">
                        <h2 class="opciones" style="color:white;">Opciones</h2>
                        <div class="row" style="float:right; padding-right:15px;">
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
    </br>
        <router-link to="/NuevoArreglo" tag="button" class="btn btn-warning" style="float: left;">
          <i class="fas fa-plus-circle fa-1x"></i>
          Nuevo Arreglo
        </router-link>
        <div class="row" style="float:right; padding-right:15px;">
            <button type="button" class="btn btn-danger" v-on:click="exportarPdf()" style="float:right;">
                <i class="fa fa-file-pdf" aria-hidden="true"></i>
                Exportar Pdf
            </button>
            <div style="width:5px;">
            </div>
            <button type="button" class="btn btn-success"  v-on:click="exportarXls()" >
              <i class="fa fa-file-excel" aria-hidden="true"></i>
                Exportar Excel
            </button>
            <div style="width:5px;">
            </div>
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
    eliminarVenta(){
        axios.delete('http://localhost:3000/venta/'+this.idv).then((data)=>{
          console.log(data)
          this.getVenta()
        }).then(alertSucessDelete()).then(this.hideModal());
    },
    onRowClick(params) {
        this.showModal = true;
        console.log(params.row);
            this.idv =  params.row.id_venta;
            axios.get('http://localhost:3000/ventaProducto/'+ params.row.id_venta).then((response) =>{
              this.ventasProducto = response.data;
              this.fecha = moment(response.data[0].fecha).format("D/M/YYYY");
              console.log(this.fecha);
              console.log(this.ventasProducto);
            });


    },
    hide(){
      this.showModal = false;
    }



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

#formulario{
  background-color: rgba(0,0,0,0.8);
  width: 450px;
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




</style>
