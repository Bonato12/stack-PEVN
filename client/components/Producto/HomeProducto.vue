<template>
  <div id="app">
    <br>
    <h2> Productos</h2>
    <br>
    <div class="container">
      <vue-good-table
          :columns="columns"
          :rows="productos"
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
            theme="nocturnal">
     </vue-good-table>
    </br>
    </br>
    <router-link to="/NuevoProducto" tag="button" class="btn btn-success" style="float:left;">Nuevo Producto</router-link>
</div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  name: 'app',
  created(){
    this.getProducto()
  },
  data () {
    return {
      productos: [],
      //field nombre del atributo en la Lista Producto
      columns: [
        {
          label: 'Modelo',
          field: 'modelo',
        },
        {
          label: 'Descripcion',
          field: 'descripcion',
        },
        {
          label: 'TipoProducto',
          field: 'tipoproducto',

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
          console.log(this.productos);
      }).catch((error)=>{
        console.log(error);
      })
    },
    eliminarProducto(idp){
      axios.delete('http://localhost:3000/producto/'+idp).then((data)=>{
        this.getProducto();
      })

    },
    onRowClick(params) {
      console.log(params.row.id_producto);
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
              axios.delete('http://localhost:3000/producto/'+params.row.id_producto).then((data)=>{
                this.getProducto();
              });
            swalWithBootstrapButtons.fire(
              'Eliminado',
              'Ah sido Eliminado',
              'success'
            )
          } else{
            this.$router.push({ path: "/editarProducto/"+params.row.id_producto})
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

#table {
	margin: 0 auto;
	width: 500px;
}
</style>
