<template>
  <div id="Cliente">
    <div class="container">
      </br>
          <h2 style="text-align:center; color:white;"> Proveedores </h2>
      </br>
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
      </br>
      <router-link tag="button" to="/NuevoProveedor" class="btn buttonProveedor">
            <i class="fas fa-plus-circle fa-1x"></i>
            Nuevo Proveedor
      </router-link>
      <button type="button" class="btn btn-danger"  style="float:right;">
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


export default {
  name: 'Cliente',
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
    axios.get('http://localhost:3000/proveedor').then((response) =>{
      this.datos = response.data;
      //console.table(this.datos);
    });
  },
  exportarPdf(){
      var columnas = [
        {title: "DNI", dataKey:"dni"},
        {title: "NOMBRE", dataKey:"nombre"},
        {title: "APELLIDO", dataKey:"apellido"},
        {title: "DIRECCION", dataKey:"direccion"},
        {title: "DESCRIPCION", dataKey:"descripcion"}

        ]
      var doc = new jsPDF()
      doc.autoTable(columnas,this.datos)
      doc.save('proveedores.pdf');
    },
    exportarXls() {
      var proveedores = XLSX.utils.json_to_sheet(this.datos)
      var wb = XLSX.utils.book_new() // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, proveedores, this.datos);
      XLSX.writeFile(wb, 'productos.xlsx');
    },
    exportarCsv() {
      var proveedores = XLSX.utils.json_to_sheet(this.datos)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, proveedores, this.datos)
      XLSX.writeFile(wb, 'proveedores.csv');
    }
  }
}
</script>

<style>



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

.buttonProveedor{
  float:left;
  background-color: #FEC400;
}

.buttonProveedor:hover{
  float:left;
  background-color: white;
}

</style>
