<template>
  <div>
    <br>
    <h2> Productos</h2>
    <br>
    <div class="container">
      <div v-if="this.productos.length">
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

                theme="nocturnal">
         </vue-good-table>
     </div>
     <div style="color:black;">
          <b-modal ref="myModalRef" hide-footer title="Detalles">
            <div class="d-block text-center">
              <h4>ID:{{idp}}</h4>
              <hr>
              <h4>MODELO:{{modelo}}</h4>
              <hr>
              <h4>DESCRIPCION: {{descripcion}}</h4>
              <hr>
              <h4>TIPO PRODUCTO: {{tipoproducto}}</h4>
              <hr>
              <h4>STOCK: {{stock}}</h4>
              <hr>
              <h4>PRECIO: {{precio}}$</h4>
              <hr>
              <button class="btn btn-danger" v-on:click="eliminarProducto(idp)" title="Eliminar Producto">
                    <i class="fas fa-trash fa-2x">

                    </i>
              </button>
              <router-link :to="/editarProducto/+idp" active-class="activo" class="btn btn-warning" tag="button" title="Editar Producto" >
                  <i class="far fa-edit fa-2x">

                  </i>
              </router-link>
            </div>
          </b-modal>
    </div>
    <br>
    <router-link to="HomeProducto/NuevoProducto" tag="button" class="btn btn-success" style="float:left;">Nuevo Producto</router-link>
</div>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  created(){
    this.getProducto()
  },
  data () {
    return {
      modalShow: false,
      idp: '',
      modelo: '',
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
  mounted(){

  },
  methods: {
    getProducto(){
      console.log(this.productos)
      axios.get('http://localhost:3000/producto').then(response=>{
          this.productos = response.data;
          //console.log(this.productos);
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
        this.descripcion = params.row.descripcion;
        this.tipoproducto = params.row.tipoproducto;
        this.stock = params.row.stock;
        this.precio = params.row.precio;

    },
    hideModal() {
        this.$refs.myModalRef.hide()
    }

}
}
</script>

<style>
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


</style>
