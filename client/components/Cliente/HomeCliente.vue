<template>
  <div id="Cliente">
    <div class="container animated zoomIn">
    <br>
    <br>
    <div>
        <div class="card-header" style="background-color:#FFD700; ">
          <h2 style="text-align:center; color:black;">
              <i class="fas fa-user"></i>
              Clientes
           </h2>
        </div>
    </div>
      <tabla-cliente></tabla-cliente>
       <div>
        <br>
        <router-link to="/NuevoCliente" tag="button" class="btn btn-warning" style="float: left;"  >
            <i class="fas fa-plus-circle fa-1x"></i>
            Nuevo Cliente
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
</div>
</template>

<script>
import axios from 'axios'
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from 'xlsx'
import { imgData } from '../../assets/imagenPDF';
import TablaCliente from "./Tabla.vue";

export default {
  name: 'Cliente',
  created(){
    //this.getCliente();
  },
  data () {
    return {
        datos: [],
      }
  },
   components: {
      TablaCliente
    },
  methods: {
    /*
      getCliente(){
        axios.get('http://localhost:3000/cliente').then((response) =>{
          this.datos = response.data;
        }).catch(error=>{
          console.log(error);
        })
      },
      */
      exportarPdf(){
          //this.getCliente();
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
        exportarXls() {
          var fecha = new Date();
          var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
          var clientes = XLSX.utils.json_to_sheet(this.datos)
          var wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, clientes, this.datos)
          XLSX.writeFile(wb,now+'-clientes.xlsx');
        },
        exportarCsv() {
          var fecha = new Date();
          var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
          var clientes = XLSX.utils.json_to_sheet(this.datos)
          var wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, clientes, this.datos)
          XLSX.writeFile(wb,now+'-clientes.csv');
        },
  }
}
</script>

<style scoped>

html,body{
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
background-color: #063A5E;
background-blend-mode: multiply;
}

textarea{
  height: 250px;
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
