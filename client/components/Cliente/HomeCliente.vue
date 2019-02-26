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
   <div style="color:black;" >
        <b-modal
            title="Detalle Cliente"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant"
             size="lg"
             ref="myModalRef"
      >
      <b-container fluid>
            <b-row class="mb-1">
              <b-col cols="3">ID:</b-col>
                <b-col>{{idc}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Dni:</b-col>
                <b-col>{{dni}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Nombre:</b-col>
                <b-col>{{nombre}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Apellido:</b-col>
                <b-col>{{apellido}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Ciudad:</b-col>
                <b-col>{{ciudad}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Direccion:</b-col>
                <b-col>{{direccion}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Telefono:</b-col>
                <b-col>{{telefono}}</b-col>
            </b-row>
            <hr>
            <b-row class="mb-1">
              <b-col cols="3">Mail:</b-col>
                <b-col>{{mail}}</b-col>
            </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <p class="float-left">Opciones</p>
        <div style="float:right;">
            <button class="btn btn-danger" v-on:click="eliminarCliente(idc)" title="Eliminar Cliente">
                <i class="fas fa-trash fa-1x">

                </i>
                Eliminar
            </button>
            <router-link :to="/EditarCliente/+idc"  class="btn" style="background-color:yellow;" tag="button" title="Editar Cliente">
                <i class="fas fa-edit fa-1x">

                </i>
                Editar
            </router-link>
            <button class="btn btn-success" v-on:click="enviarMail()" title="Enviar Mail">
                <i class="fas fa-envelope fa-1x">

                </i>
                Enviar Mail
            </button>
      </div>
      </div>
    </b-modal>
    </div>
    </br>
    <router-link to="/HomeCliente/NuevoCliente" tag="button" class="btn buttonCliente" style="float: left;"  >
        <i class="fas fa-plus-circle fa-1x"></i>
        Nuevo Cliente
    </router-link>
    <button type="button" class="btn buttonCliente" v-on:click="exportarPdf()" style="float:right;">
        <i class="fas fa-download"></i>
        Exportar Pdf
    </button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import jsPDF from 'jspdf';


class Cliente {
    constructor(id_cliente,dni,nombre,apellido,ciudad,direccion,telefono,mail){
          this.id_cliente = id_cliente
          this.dni = dni,
          this.nombre = nombre,
          this.apellido = apellido,
          this.ciudad = ciudad,
          this.direccion = direccion,
          this.telefono = telefono,
          this.mail = mail
    }
}


export default {
  name: 'Cliente',
  created(){

      this.getCliente();


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
      idc: '',
      dni: '',
      nombre:'',
      apellido:'',
      ciudad:'',
      direccion:'',
      telefono:'',
      mail:'',
      datos: [],
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
      ],

		}
  },
  mounted(){

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
          }).then(this.$swal.fire(
              'Eliminado!',
              'Ha sido elimando',
              'success'
        )).then(this.hideModal());
    },
    enviarMail() {
      axios.get('http://localhost:3000/cliente/'+this.idc).then((response) =>{
        this.cliente = new Cliente(this.idc,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].ciudad,response.data[0].direccion,response.data[0].telefono,response.data[0].mail);
        axios.post('http://localhost:3000/email',
        this.cliente
      )});
    },
    exportarPdf(){
        var doc = new jsPDF()
        doc.text('Hello world!', 10, 10)
        doc.save('a4.pdf');
      },

    onRowClick(params) {
        this.$refs.myModalRef.show()
        console.log(params);
        this.idc = params.row.id_cliente;
        this.dni = params.row.dni;
        this.nombre = params.row.nombre;
        this.apellido = params.row.apellido;
        this.ciudad = params.row.ciudad;
        this.direccion = params.row.direccion;
        this.telefono = params.row.telefono;
        this.mail = params.row.mail;
    },
    hideModal () {
        this.$refs.myModalRef.hide()
    }
}
}
</script>

<style>
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

a {
  color: #42b983;
}

.buttonCliente{
  background-color: #fec400;

}

.buttonCliente:hover{
  background-color: white;

}


</style>
