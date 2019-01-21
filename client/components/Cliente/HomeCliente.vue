<template>
  <div id="app">
    <div class="container">
    </br>
    <h2> Clientes</h2>
    </br>
    <vue-good-table
        :columns="columns"
        :rows="datos"
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
          theme="nocturnal">
   </vue-good-table>
    </br>
    </br>
    </br>
    <router-link to="/NuevoCliente" tag="button" class="btn btn-success" style="float: left;"  >Nuevo Cliente</router-link>
    </div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'app',
  created(){

      this.getCliente();

  },
  data () {
    return {
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
          label: 'Ciudad',
          field: 'ciudad',
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
      console.log(this.datos);
    });
  },
    eliminarCliente(id) {
          axios.delete('http://localhost:3000/cliente/' + id).then((data)=>{
                this.getCliente();
          });
    },
    onRowClick(params) {
      console.log(params.row.id_cliente);
      const swalWithBootstrapButtons = this.$swal.mixin({
          confirmButtonClass: 'btn btn-danger',
          cancelButtonClass: 'btn btn-warning',
          buttonsStyling: false,
        })
        swalWithBootstrapButtons.fire({
          title: 'Que Opcion Desea Hacer?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Editar',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
              axios.delete('http://localhost:3000/cliente/'+params.row.id_cliente).then((data)=>{
                this.getProducto();
              });
            swalWithBootstrapButtons.fire(
              'Eliminado',
              'Ah sido Eliminado',
              'success'
            )
          } else{
            this.$router.push({ path: "/editarCliente/"+params.row.id_cliente})
          }
        })
      }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

#tabla{
   background-color: rgba(0,0,0,0.8);
}


</style>
