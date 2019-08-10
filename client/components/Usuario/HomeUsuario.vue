<template>
  <div id="Cliente">
    <div class="container animated zoomIn">
    </br>
    </br>
    <div>
        <div class="card-header" style="background-color:#FFD700; ">
          <h2 style="text-align:center; color:black;">
              <i class="fas fa-user"></i>
              Usuarios
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
                <button @click="editarUsuario(props.row)" class="btn btn-warning" title="Editar Cliente">
                      <i class="fas fa-edit"></i>
                </button>
                <button @click="editarUsuario(props.row)" class="btn btn-danger" title="Editar Cliente">
                      <i class="fas fa-trash"></i>
                </button>
              </span>
            </template>
     </vue-good-table>
       </div>
       <br>
       <router-link to="/NuevoUsuario" tag="button" class="btn btn-warning" style="float: left;">
         <i class="fas fa-plus-circle fa-1x"></i>
         Nuevo Usuario
       </router-link>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from 'xlsx'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete,alertError,alertWarningFK,alertSucessMail } from '../../assets/sweetAlert.js';
import firebase from 'firebase'
//import * as admin from "firebase-admin";


export default {
  created(){
        this.getUsuario();


  },
  data () {
    return {
      showModal: false,
      showModalMail: false,
      destinatario: '',
      mensaje: '',
        datos: [],
        columns: [
        {
          label: 'Usuario',
          field: 'mail',
        },
        {
          label: 'Rol',
          field: 'perfil',

        },
        {
          label: 'Opciones',
          field: 'opciones',
        }
      ],
      }
  },
  methods: {
    getUsuario(){
        axios.get('http://localhost:3000/usuario').then((response) =>{
          this.datos = response.data;
          console.log(this.datos);
        });
    },
    editarUsuario(usuario){

    }
  }
}
</script>

<style scoped>

html,body{
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
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
