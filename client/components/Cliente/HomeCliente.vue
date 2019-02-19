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
        <b-modal ref="myModalRef" hide-footer title="Detalles">
          <div class="d-block text-center;">
            <h4>ID:{{idc}}</h4>
              <hr>
            <h4>DNI:{{dni}}</h4>
              <hr>
            <h4>NOMBRE: {{nombre}}</h4>
              <hr>
            <h4>APELLIDO: {{apellido}}</h4>
              <hr>
            <h4>CIUDAD: {{ciudad}}</h4>
              <hr>
            <h4>DIRECCION: {{direccion}}</h4>
              <hr>
            <h4>TELEFONO: {{telefono}}</h4>
              <hr>
            <h4>MAIL: {{mail}}</h4>
              <hr>
            <button class="btn btn-danger" v-on:click="eliminarCliente(idc)" title="Eliminar Cliente">
                <i class="fas fa-trash fa-2x">

                </i>
            </button>
            <router-link :to="/EditarCliente/+idc"  class="btn btn-warning" tag="button" title="Editar Cliente">
                <i class="fas fa-edit fa-2x">

                </i>
            </router-link>
          </div>
        </b-modal>
    </div>
    </br>
    <router-link to="/HomeCliente/NuevoCliente" tag="button" class="btn buttonCliente" style="float: left;"  >
        <i class="fas fa-plus-circle fa-1x">

        </i>
        Nuevo Cliente
    </router-link>
    </div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'Cliente',
  created(){

      this.getCliente();

  },
  data () {
    return {
      idc: '',
      dni: '',
      nombre:'',
      apellido:'',
      ciudad:'',
      direccion:'',
      telefono:'',
      mail:'',
      datos: [],
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
