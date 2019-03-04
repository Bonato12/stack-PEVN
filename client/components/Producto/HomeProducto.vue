<template>
  <div>
    <div class="container">
    <br>
    <h2 class="animated fadeIn" style="color:white; text-align:center;"> Productos</h2>
    <br>
      <div v-if="this.productos.length" class="animated zoomIn">
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

                theme="default">
         </vue-good-table>
     </div>
     <div style="color:black;">
       <b-modal
           ref="myModalRef"
           title="Detalle Producto"
           :header-bg-variant="headerBgVariant"
           :header-text-variant="headerTextVariant"
           :body-bg-variant="bodyBgVariant"
           :body-text-variant="bodyTextVariant"
           :footer-bg-variant="footerBgVariant"
           :footer-text-variant="footerTextVariant"
            size="lg"
     >
     <b-container fluid>
           <b-row class="mb-1">
             <b-col cols="3">ID:</b-col>
               <b-col>{{idp}}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Modelo:</b-col>
               <b-col>{{modelo}}</b-col>
           </b-row>
           <b-row class="mb-1">
             <b-col cols="3">Marca:</b-col>
               <b-col>{{ marca }}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Descripcion:</b-col>
               <b-col>{{descripcion}}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">TipoProducto:</b-col>
               <b-col>{{ tipoproducto }}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Stock:</b-col>
               <b-col>{{ stock }}</b-col>
           </b-row>
           <hr>
           <b-row class="mb-1">
             <b-col cols="3">Precio:</b-col>
               <b-col>{{ precio }}</b-col>
           </b-row>
     </b-container>
     <div slot="modal-footer" class="w-100">
       <p class="float-left">Opciones</p>
       <div style="float:right;">
           <button class="btn btn-danger" v-on:click="eliminarProducto(idp)" title="Eliminar Producto">
                 <i class="fas fa-trash fa-1x"></i>
                 Eliminar
           </button>
           <router-link :to="/editarProducto/+idp" active-class="activo" class="btn" style="background-color:yellow;" tag="button" title="Editar Producto" >
               <i class="far fa-edit fa-1x"></i>
               Editar
           </router-link>
     </div>
     </div>
   </b-modal>
    </div>
    <br>
    <router-link to="HomeProducto/NuevoProducto" tag="button" class="btn buttonProducto" title="Ir a Nuevo Producto" style="float:left;">
      <i class="fas fa-plus-circle fa-1x">

      </i>
      Nuevo Producto
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
import Producto from '../../models/Producto';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from 'xlsx'


export default {
  created(){
    this.getProducto()
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
      modalShow: false,
      idp: '',
      modelo: '',
      marca: '',
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
          label: 'Marca',
          field: 'marca',
        },
        {
          label: 'Descripcion',
          field: 'descripcion',
        },
        {
          label: 'TipoProducto',
          field: 'tipoproducto',

          filterOptions: {
        	  enabled: true, // enable filter for this column
            placeholder: 'Filtrar Todo', // placeholder for filter input
            filterDropdownItems: ['Smartphone', 'Iphone'], // dropdown (with selected values) instead of text input
            trigger: 'enter', //only trigger on enter not on keyup
          },


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
          //console.table(this.productos);
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
        this.marca = params.row.marca;
        this.descripcion = params.row.descripcion;
        this.tipoproducto = params.row.tipoproducto;
        this.stock = params.row.stock;
        this.precio = params.row.precio;

    },
    hideModal() {
        this.$refs.myModalRef.hide()
    },
    exportarPdf(){
        var columnas = [
          {title: "MODELO", dataKey:"modelo"},
          {title: "MARCA", dataKey:"marca"},
          {title: "DESCRIPCION", dataKey:"descripcion"},
          {title: "TIPOPRODUCTO", dataKey:"tipoproducto"},
          {title: "STOCK", dataKey:"stock"},
          {title: "PRECIO", dataKey:"precio"}

          ]
          var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAAmJLR0QAAKqNIzIAAAAHdElNRQfjAwIKCREHSG+6AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTAyVDA5OjA5OjE3KzAxOjAwOtXGkgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0wMlQwOTowOToxNyswMTowMEuIfi4AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAABx3klEQVR4Xu3dB5zURPsH8OeOcke/oysd6UUQRFBQQRFBAQFBLCiCIhYUsaG+ivVveeUVfF8BQQULovQiIAqC0ovSm/SOSO9wlPvvMztzl8tld7Ob7G6y+/vyCbeZTbKpM5PJZCYh3YMAwLEuXLhABw8eFMOBAwfo2LFjYjh69GjG5+PHj9Pp06fpzJkz4m9aWpoIu3jxovirderUKbFMrVy5clH+/PnlmFdKSgrlyJGDChUqRLlz56Z8+fJR3rx5xV/+TjukpqaKv8WLF6dixYqJvzlz5pRLAgAnQgYAIIo4Ud+zZ48Ydu7cmfF579699M8//2Qk/G6kMgL8t3Tp0lSqVCnxt1y5clSmTBnxuWjRonJqAIg0ZAAAwujSpUu0a9cu2rp1K23ZskUM6jP/PXv2rJwyPuXJk4cqVapEV111lfir/Vy2bFlKTEyUUwKA3ZABALDJvn37aP369bRu3bqMvytXrhRF8hA8fuzAGYGaNWtSjRo1Mv5Wq1ZNPJoAAGuQAQAIEj8/37RpE/35558Zw4oVK8Tzdwg/rq9QuXJlql+/fsZQr149UT8BAMxDBgDADy7C37BhAy1ZsoQWLVpES5cuFeNcuQ6cgysccunAddddR40aNaKGDRuKcTxCAPANGQAAjRMnTtD8+fNpwYIFtHjxYlq2bBmdPHlSfgtuUrBgQWrQoIHIEDRu3JiaNGlCBQoUkN8CADIAENc4cee7+1mzZomEn+/w9a/IQWzgegNVq1YVGYHmzZtTs2bN8BYCxDVkACCucK17TuhnzpwphlWrVhEugfjEjwfq1KlDt912mxg4Y5CcnCy/BYh9yABAzFu9ejXNmDEj4y4/3l+9A2P8SuKNN94oMgO333471a5dW34DEJuQAYCYc+7cOZHQc4I/ceJEUWMfIFjcYBFnBFq3bi0yBSgdgFiDDADEhMOHD9OUKVPEwEX7ePce7MTNH7do0YLatm0rhsKFC8tvANwLGQBwrUOHDtH06dNp7Nix9PPPP6PyHkQEVybkNws6depE99xzD11xxRXyGwB3QQYAXIU7wxkzZoxI9PlVvcuXL8tvACKPMwP8iiFnBHjgfg8A3AIZAHA8rrQ3depU+uabb3CnD46lSgYeeughuu+++9DmADgeMgDgSNzSHtfc//bbb+nHH39EzX1wFW6WmOsKdOnShVq2bIm+C8CRkAEAR/nrr7/o+++/p6+++kp0jwvgdlxHgOsLPPLII3T11VfLUIDoQwYAoo5b4/vhhx9oxIgRor19gFjF9QW6detGnTt3pvz588tQgOhABgCiZuPGjeJOf9iwYXT06FEZChD7uH4A1xN48sknRWuEANGADABEVFpaGk2ePFkk+r/++iua4YW4x90ZP/bYY/Tggw+K1ggBIgUZAIiIffv20eDBg0XCf/DgQRkKAErx4sVFRoBLBdC2AEQCMgAQVsuXL6ehQ4eKV/i4iV4A8C937tx01113UZ8+fej666+XoQD2QwYAbMeN80yYMIEGDBhACxculKEAECzuoZAzAu3atRO9FwLYCRkAsA0/3+fa/O+//76o4AcA9qhYsSI988wz1LNnT3RKBLZBBgAs49f4hg8fTv3796c9e/bIUACwW4kSJejxxx+nZ599llJSUmQoQGiQAYCQHTlyRBTz/+9//6Pjx4/LUAAIN078uUSAMwKpqakyFCA4yABA0LjrXU70P/nkEzp27JgMBYBI48aEnnrqKXrppZfQRTEEDRkAME0l/AMHDsQdP4CDcEage/fu9Oqrr4rHBABmIAMAAZ06dYoGDRokKvch4QdwLlUi8Morr1ChQoVkKIAxZADAJ67Vz0319uvXT/TDDwDuUKRIEXrxxRepd+/eeGsAfEIGALLhrni//vpreuutt2j37t0yFADcpmzZsvTmm2/SQw89hC6JIRtkACCLWbNm0fPPP0+rV6+WIQDgdtWqVRNv7LRs2VKGABChaSkQ1q9fT61bt6bbbrsNiT9AjOGGuVq1akVt2rShrVu3ylCId8gAxDnupOeRRx6h2rVr07Rp02QoAMSiqVOnUs2aNenll18WDXhBfMMjgDh14cIF0TsfV/A7ceKEDAWAeFG0aFF67bXXqFevXqgfEKeQAYhD3A8/tyLGxf4AEN/q1asn6gfcdNNNMgTiBR4BxBGu0c+1gZs3b47EHwAE7rL75ptvFvUDtm/fLkMhHiADEAf4tb4PPviAqlatSt9++60MBQDIxPUDatWqRR999JGIMyD24RFAjFu1ahU9+uij9Mcff8gQAAD/6tSpQ59//jk1aNBAhkAsQglAjDp79qxoAIQvYCT+ABAMvnG44YYbREuCp0+flqEQa1ACEIPmzp1Ljz32GP31118yBAAgNBUrVqShQ4eKukMQW1ACEEO4a96ePXtS06ZNkfgDgC22bdtGLVq0EBWIuUdQiB0oAYgRP/74Iz3xxBO0d+9eGQIAYC/uavjf//63yAyA+yED4HLckh8n/FOmTJEhAADh1a5dO9GQ2BVXXCFDwI2QAXCxSZMmUY8ePejQoUMyBAAgMrglwS+++ILuuusuGQJugzoALsQ1/Ll2bvv27ZH4A0BUcNzDJQH8OODUqVMyFNwEJQAuw6/0denSBZX8AMAxuJGx7777jurXry9DwA1QAuASnE/75JNPqHHjxkj8AcBROE5q1KiRaHvk0qVLMhScDiUALqDa8P/tt99kCACAMzVr1oy++eYbKl26tAwBp0IJgMONHz+e6tati8QfAFxhzpw5ok+BUaNGyRBwKmQAHOrkyZP08MMPU8eOHenIkSMyFADA+Y4fP04PPPAAPfLII6gg6GB4BOBAmzZtog4dOtC6detkCACAO3EFwQkTJlCNGjVkCDgFSgAchhv0ue6665D4A0BMUBUEx40bJ0PAKZABcAiuOcs1aPm9Wi4+AwCIFfxI85577qGXX34Zbwk4CB4BOAB3sHHffffRzJkzZQgAQGzizspGjx5NxYsXlyEQLcgARNmKFSvE8/4dO3bIEACA2FamTBnxSIAfd0L04BFAFPG7stywDxJ/AIgn3LbJTTfdJPoSgOhBBiAKzp8/L9ry79q1q2jXHwAg3nA8yJ2ZcSNniAejA48AImz//v2iot/SpUtlCABAfOO3BCZOnEglS5aUIRAJyABEEL/ad+edd9LOnTtlCAAAsFKlStG0adOoTp06MgTCDY8AIuTXX3+lJk2aIPEHADCwd+9euvHGG2nGjBkyBMINGYAI+Oqrr6hVq1Z07NgxGQIAAHrcXkCbNm1o2LBhMgTCCRmAMOKnK9y4T7du3ejChQsyFAAAfLl48SL17NlTVJTGE+rwQh2AMElLSxMdYYwcOVKGAABAMLj1wK+//pqSk5NlCNgJGYAwOHr0qGjcB134AgBYw22lTJo0iYoWLSpDwC7IANhs+/btdMcdd9DGjRtlCAAAWFGpUiWaPn06Va5cWYaAHVAHwEbLli0T77Mi8QcAsM+WLVvEGwLLly+XIWAHZABs8vvvv1Pz5s3pn3/+kSEAAGCXAwcO0C233EILFiyQIWAVMgA2+PHHH8VrfidOnJAhAABgN+4qvUWLFug51SbIAFj03Xff0d133422rAEAIuDMmTOirQBuOhisQQbAgk8++YQefPBBvOMPABBB3JFQ586dacyYMTIEQoEMQIj69+9Pzz77LBqqAACIAr7xuv/++2n48OEyBIKFDEAIPvzwQ3rxxRflGAAARMOlS5fo0UcfpYEDB8oQCAYyAEHixP/ll1+WYwAAEE1cCtunTx96++23ZQiYhYaAgtCvXz9655135BgAADhJ37596YMPPpBjEAhKAEx67bXXkPgDADgYl9C+8cYbcgwCQQmACXxCoXgJAMAd3n//fTyqNQEZgAC4tj8q/AEAuMt//vMfeu655+QYGEEGwI+PP/6Ynn/+eTkGAABukZCQQEOHDqUePXrIENBDBsAHbuSH3/MHAAB3ypEjB40aNYruueceGQJayAAYGDlyJHXt2pUuX74sQwAAwI1y5cpF48ePF80HQ1bIAOhMmTJFtO1/8eJFGQIAAG6WO3dumjx5MrVs2VKGAEMGQGPOnDl0xx130Llz52QIAADEgrx589JPP/1EN910kwwBZACkZcuW0a233konT56UIQAAEEsKFSpEs2fPpnr16smQ+IYMgMf27dvp+uuvpwMHDsgQAACIRUWLFqVFixZRpUqVZEj8ivuWAI8cOUKtWrVC4g8AEAcOHTpEbdu2paNHj8qQ+BXXGQDuTpJfD/nrr79kCAAAxLoNGzZQu3bt6Pz58zIkPsVtBoCffDzyyCP066+/yhAAAIgXc+fOpYcfflikBfEqbjMA3LPft99+K8cAACDe/PDDD/TWW2/JsfgTl5UAR4wYQd27d5djAAAQr7jJYE4TuPG3eBN3GYDffvuNbr/9dkpLS5MhAAAQz7i1wOnTp1Pz5s1lSHyIqwzA+vXrqXHjxnTs2DEZAgAAQFSwYEGaP38+1a5dW4bEvrjJAOzfv1+8679z504ZAgAAkKl8+fKijYCSJUvKkNgWF5UA+VUPfuUDiT8AAPiyY8cOat++fdw8Io6LDECvXr1o6dKlcgwAAMDY4sWLqXfv3nIstsX8IwB+1e+hhx6SYwAAAIF9+eWXMf+2WExnAFasWCEq/Z09e1aGAAAABJacnEzz5s2ja6+9VobEnpjNAHAb/3zguKMfAACAYJUtW5b+/PNP0YFQLIrJOgCXL1+m+++/H4k/AACEbNeuXXTvvffSpUuXZEhsickMwCuvvEI///yzHAMAAAgN9xfDTcfHoph7BDB58mTxGkcMV20AAIAI4uaCx44dS3fffbcMiQ0xlQHgbn2vu+46OnHihAwBAACwrkCBArRkyRKqXr26DHG/mHkEcPLkSdHYDxJ/AACwG6cxnTp1olOnTskQ94uZDMDTTz9NGzdulGMAAAD2WrduHT377LNyzP1i4hHA+PHjqWPHjnIMAAAgfH744Qfq3LmzHHMv12cA9uzZQ3Xq1BHv/QMAAIRbSkoKrVq1SrQT4GaufgTA7/t37doViT8AAEQMdyn/4IMPur59AFdnAD788EOaPXu2HAMAAIiMuXPn0scffyzH3Mm1jwCWL18u+vePl24bAQDAWXLlykULFiygBg0ayBB3cWUG4PTp01S/fn3x3j8AAEC0cLsAf/zxB+XNm1eGuIcrHwH06dMHiT8AAETdhg0b6IUXXpBj7uK6EoBJkyaJpn4BAACcgpuhb9u2rRxzB1dlAPbt20dXX301HT58WIYAAABEX7FixWj16tVUsmRJGeJ8rnoE8NRTTyHxBwAAxzl48CD16NFDjrmDazIAY8aMEcX/AAAATjR16lQaNWqUHHM+VzwCOH78ONWoUUM8AgAAAHCqIkWKiD4DSpQoIUOcyxUlAFzrH4k/AAA4HT+m5s7p3MDxJQBz5syhW2+9lVxUVxEAAOLc2LFjHd9JnaMzAGfOnBG1/rdu3SpDAAAAnI/fBli/fj2lpqbKEOdx9COAN954A4k/AAC4zt9//03/+te/5JgzObYEgLta5PaVL1y4IEMAAADcIzExkebNm0c33HCDDHEWR2YALl68SA0bNhQd/gAAALhVrVq1RFrGHQc5jSMfAXz00UdI/AEAwPXWrl1LAwYMkGPO4rgSgG3btokc09mzZ2UIAACAe3FPgdxpUNmyZWWIMziuBIDf+UfiDwAAsYLfaHv++eflmHM4qgRg5syZ1KJFCzkGAAAQO2bMmEG33367HIs+x2QA0tLSxDv/6OcfAABiETdpv3LlSsdUCHTMIwCuJIHEHwAAYhU3DPTpp5/KsehzRAkAt/NftWpVOnXqlAwBAACIPQULFqRNmzY5orMgR5QAvPbaa0j8AQAg5p04cYL69esnx6Ir6iUA3OJf/fr16dKlSzIEAAAgduXIkYNWrFhBtWvXliHREfUSgBdffBGJPwAAxA1O81566SU5Fj1RzQBMmzZNvPoHAAAQT/iVwJ9//lmORUfUHgFwDqhOnTq0bt06GQIAABA/+LVAfgyeM2dOGRJZUSsBGD58OBJ/AACIW/xa4MiRI+VY5EWlBODcuXNUpUoV2r17twwBAACIP+XKlRNt4CQlJcmQyIlKCcCgQYOQ+AMAQNzbuXMnDRs2TI5FVsRLAPgdyKuuuooOHTokQwAAAOIXNwq0ZcsWyp8/vwyJjIiXAPznP/9B4g8AEZGQkJBlAHCiAwcO0MCBA+VY5ES0BIAT/ooVK9LJkydlCABAdomJiXT58mU5Fh4qQxCFalAA2RQqVIi2b99OqampMiT8IloCwHf/SPwBwAgn+txCGgt34s844dcm/iglgGg6fvx4xEsBIlYCcPjwYapQoQIyAACQgRNcTvj578WLF2Vo9KF0AKIh0qUAESsB+Pjjj5H4A4DAiT43fsIJLDcK5qTEn/F6qcQfpQIQKVwK8Mknn8ix8ItICcCRI0fE3T+/AQAA8cvNd9a87m5cb3CXlJQUUQrAf8MtIiUAAwYMQOIPEMc48VQJqFsTUbXesVYiEGvb43bHjh2LWClA2EsAOOEvW7asKNoAgPgTq3fOsbBdsXps3K5w4cK0a9cuypcvnwwJj7CXAHz22WdI/AHikLqzjNUEhreLt1FtJ4Bd+LH5iBEj5Fj4hLUE4Pz58+LZ//79+2UIAMS6WE/4jbjhTtoN6wiZuM2cTZs2ZbwaGw5hLQH45ptvkPgDxBGVyMRbQsPby9uuMj9OotYJib+7bNu2jSZOnCjHwiNsJQD8ak/16tVp8+bNMgQAYhnuML2csh8CrQeOl/M1atSIFi1aJMfsF7YSAM65IPEHiA9ITDLxfuD9ES3qt3E83G/x4sU0f/58OWa/sGUA+NU/AIhtSGyMRToTwL8VzLHgaXHM3IGb0A+XsDwCWLZsGV133XVyDABiERKRwMK9j0JdPo6de3CrmRs3bqTKlSvLEPuEpQQgkk0ZAkDkIQExR+0jjsTtwvteQeIf+7hjrHCVqNteArBv3z7x6l9aWpoMAYBYggQkNJwJCLWXQ5Xo27HfcfzcJ2/evLRz504qWrSoDLGH7SUAQ4YMQeIPEKOQeISOE3+zJQG8n1Wiz3ifI/GPX2fOnKHBgwfLMfvYWgLADf+UKVOGDh48KEMgHiBSiQ84zvZITk6mc+fOic9qn+oTewC9EiVKiOaBc+fOLUOss7UEYOzYsUj845A+AoPYhITJHpz458+fX/T9rvYp/1VDuOAadbcDBw7Q+PHj5Zg9bM0AcLv/EJ844kIEE7twbO116tSpiPaRwscvnJkLiAy701jbHgGsWbOGrr76ajkG8QoRTezBMQVwjnXr1lGNGjXkmDW2lQDg7h8YJxS4W4wdSPzdD9djbLEzrbWlBICLs0qVKiX6/gdgSDgAog/XYezhuiN79+6lfPnyyZDQ2VIC8P333yPxhyw40rGz8ROIPNw5uhsS/9jEdUe4wr0dbImhR4wYIT8BZOL3nvPkySPHwE2QeLgfjl/ssivNtfwIgNso5m5/AXzhTMDZs2flGACEGzJwsY2P76ZNm6hSpUoyJDSWSwBw9w+BcOKPxwHugaJ/d0PiH/v4+H711VdyLHSWSgAuXrxIZcuWpf3798sQcKtIRBpW2kKHyEDi4W44fvGDW93dvn075ciRQ4YEz9Jt2YwZM5D4g2mc+Fs5WQHANyT+8WX37t00a9YsORYaSxmAb7/9Vn4CMOfSpUuiGVSOrMBZkIC4l93HjpenBnAuq2lwyI8ATp48KTonQOWu2BDpyL9AgQKi/QgkOADW2HntqgSflxfpOAGCxzdTf//9d8htAoRcAjBx4kQk/hAyzkDyyYvKgc6AOz13siOR5mVoE34k+u7BN1FTpkyRY8ELOfYdNWqU/ASxIBoXPWcCOAOAegEAwdEm2KEIlOjzd8gIuAM3xBeqkB4BcLeEpUuXFm8BAFiVM2dOUTcAEU50ILJ3l1CPlzbB9wfng7vkzp2b9u3bR0WKFJEh5oVUAjBmzBgk/mAbPpe4FACPAwD8CyZx5mlVos94PjPzIvF3l7S0NBo3bpwcC05IMa5d7RADKJwJ4NcEkQmIPET4zmfm7j3UBF9LOz+4B9+UhyLoRwBc45B7/kODLhAuXBrAjwQg/DjCDzaRgMjSHyN9Im8XnAvuxY9RuU2eokWLyhBzgr7dmjRpEhJ/CCtO/DkTgLsRgOyJPI+rwS5I/N2NS1AnT54sx8wLOgMQ6rMGgGCoTAAeCYQXIn1A4h8bxo8fLz+ZF9QjgMOHD1PJkiVRARAiCo8EwgMRP0DsyJUrl3hDLzU1VYYEFtTtFTc4gMQfIg2PBMIDiT/gmoodFy5coKlTp8oxc4LKAITyjAHADigBALAXSoBiT7CtApp+BHDu3DlRw/D06dMyBCA6EHFZh30Y33D8Y1PBggXp4MGDonEgM0yXAMyePRuJfwxzU1EgR1xuWl8AJ0HiH7tOnDhBc+fOlWOBmc4ATJs2TX4CiD6VCUBGIDRIAOITEv/YF0w9ANOPAMqXL087d+6UYxBr3BwxIFIDCAzXSXyoVKkSbd68WY75Z6oEYPXq1Uj8wbE4UuPIjQcIDPsp/iDxjx9btmyhjRs3yjH/TGUAZsyYIT8BOBNHbiojAACZkPjHH7NptqkMwKxZs+QniFWxEkGoTAAyAgBI/OPVzJkz5Sf/AtYB4Nf/ChcuTGfPnpUhAO6AyM8Y9kt8wHGOX/ny5RMt9yYlJckQYwFLAObNmxf7iX9iTvnBifhONpp3s2Z+O5T1C/92IfIz5nu/qGMS/mMD4YfzP9wSKCFvKiXkLybHnYNf2V+0aJEc8y1gBsBsUYKrpaN3Q9/MRCKhRDRqHiQ0zsHHRDsAgG/plJ7m3LZxzKTdyAAwR2cAtAllrCWWKqFBJiD2xcMxxnkcdy6mUfrZY3LEWcyk3X7rABw5coSKFStGly/jDjn6tJGLE+7OeH3sXA+7lwfBU+cYjkNo9BkAN+xHXHeW5chFdOmCHHEO7kqd6wGkpKTIkOz8lgBwk4JI/J2CL1I1OIHd68HL00egEBm831VC4JTzK5LCdd654XwOdLxxTboVp90LFiyQY8YCZgDAiWL1okQmIDJ4H2uHeE34FXXeaYdQqH2o35dWlhlt8XxeuN/vv/8uPxlDBsCVYvmiRIQTWfG+v1XizPtBDcxqgq1dFtN+DoZbMw7gBIHScJ91ALhXIX7/H/2wA8QaleDFC6NEVG2/+k67P7TT+9tPZvZjoGmMfj9a1Lo6aZ1cIEdOoksX5Yiz5MqVS9Tly58/vwzJymcJwPz585H4A8SkWI3YVcJlBk+rn94ojKlw/fdm9mOgafh7Jx0Po+0Ht7pw4QItXLhQjmXnMwMQqPIAAICz+EpI9Yms0XRGCV80EmZ9JiPc/P1epNfFpRze4JK/tNxnBsBMK0IQSbgYAazRZwT01Pf6abTj/uZ3I7U92rhF7QM1gF8Of1Nu8eLF8lN2hnUAuOg/NTWVTp48KUMg+tQFqg6X/oIFADDDX1ziC+IYn7jjMQeXAnA7ANweALcLoGdYArB+/Xok/q7AJx0uTABQODFXAzMaV7ThEKuOHTtGGzdulGNZGWYA/BUZQLToE3unJPyIRJwBxyB+qWtQfw4EGvdHxTf6eAfcyFeabpgBWLp0qfwE7uArAggH/e8ggoB4E4nrjKlrzdfv+fsOIsYF0d+SJUvkp6wMMwC+JgYnMhsB2BVZqATf7PLUdNoB7KP2KTJh9lHnqP6vEq59rf8dLf5OP4AzOP/a83VTn60S4Llz56hAgQJ08aIzGzaAYOkjikhHXkiYwE38Jax8Lmu/t3pu87J8LcPfekRCpK5btZ1271vQ4gaBuF5fUlKSDPHKVgKwZs0aJP4xgS8m7cVl5wWllq0d1G/oBwCn057HvqhzWXte+5veH+1vGS0j1OXaJRLXrWcbufa8wp95NCNIjWQJhBBxg0Dr1q2TY5myZQBWrFghP4FzaS8Ko888qIiKB/W9XRe2dtlqAHAjdW0EK9Tz3uj31DWrhlgmt5H/iMJnz6A2OWOXqg/awUNkGNTEDqLNyDiYUdqODICraU887Wd5wQjuODkBok+f6GgHu9i5rCBELRrgH9YOknryrBJPlRnwt3/EV36+jxrNdjkYMgAxT11ABhccABhQCUqkEpYoXJPqJ039tF37wfNjGXfGKl7SL1t+b7oRHbvWLT4Zpe1ZKgFyC4BcAfDs2bMyBKJPf9VqLwLtdypcPz3DhQNgzOgaCheja9MiW1ff6gI0K8MfxeL0y8z4wvPR89lwGpdJ8NxHpzu7OWDGPQIeP348S4uAWUoAtm7disTfMfhC0VxQgrpQjL7zNb3LLy6AsNFfL2ap+fTXnL/lhfpbkvopNTD9IvXjQbEaT/CPa+KbjCJ9LTWNln4cwuXUqVO0Y8cOOeaVJQPATQBDtPFFor+StReTr6tcTaMdAjH6LQA3MjqP/Z3b/J3+GlHXg3Y+9dnoO/11pv2snV47T5B8zW5hkVnptyFUahm8YmaWZ9sGQBD0aXyWDIDRawIQKUZXuv7i9PW9mQtO0S4j2HkBnEid0+oaUgPTjyvqvPd1/uuXoWcUxrTz2SCYy9MRl3IQK+GI9Y0vfjMAGzZskJ8g8vhqUIOiIhM1aKfRTuePPjIyOx+Ak+jPYy39daE9x7WftdeSdnnaaRR9mHa52s++lmkj9XPan1WMwoIWaL3t2kbLK+pMOXLJD86HEgDHMbq41FWtH/xR82qXwwLNB+AG/s5jdc5rrwFF+1lPP5+WPkw7nfqsnyaCjKKEkFcp0L5l6gf9TRsMO5cVbVE8D4KkzwBkvAVw+fJlUUsQlQAjwdcJ4++CCGUegHgQagTM1457Iu+AjDbFZ/RgJt7gBSJ+CShnEtHF83LE2TiNP3HiBCXIVzQzSgB27tyJxN9W+quRx9Xgi3Ya/cAXotEA4FT6czhUgeb1dR2ocO31oh2srJMDqc3SyrKJ2m0PxK37Jhrr7Z59xW8C7NmzR45pMgBbtmyRn8A6dUIEe2JoL1D9AODV+x6il7oQ5U2WAY7l7xzma8POiFMtX/87TP2WfohR2l1upoU9n0KZJ1q0xzSGj60N+HV/JSMDoA2EUBlFLP5ORu3F6aaLDaKlZUNvBuBfXYkmvk9Uv6r8wpXMnvNqOqNrSzsw7TTaz/HEjjjFyryRoj/2WvF67APT3uyjBMAW2pPQ14WnwrVDpOBiiAVFCxE93p6oTDGi/J67/+bXEk36kKhHW6Lk3HIiVzFzXqprS02rHwevaMQr0WLm+MfDfggNMgC20Z+I2pPOSRdkNNfBzMUKgXAC3701UZM6nos246olurII0X/7EA17meiaKkS5csovXEN7bqhzRTtAYE6IYyLB7Dnhb3+E4bxy2WmKRwCW6U8ipyT0ToR9Y1UOz1V6oyfh73I7UWp+GaiR25PoP3Ab0VevEz3Y0pMpKCq/cCx9jKm/nsAcXFvm4RxTtDf74jVAfhOQXw84c+aMDAYApyhVjOi9x4nubU6UU3P3n0ETr51LIxrzK9GgCUSrNhNduCi/8IlnVomI9nO4IBK2Jt4TfLvOHxv3Y65kz4V2To44H3f4x68CMhGdHD58GIk/gAMl5SbqfAtRmyYGiT/Hhbr4MDkX0QO3Ew3sTfR4O6JiKfILU8xGiupHtT9uJmI2Mw1kx8dFDWCP+D0XT548SUePHhWfRZSye/duMQIAzlKlNNFTHYkK5ZUBiq/4yxPOjwwa1iR6vRvRh08R1b7KG5YVLyCUSFDNo/1rtBwVrh1AMLUrkOhnZ+Ucwn7UUmk+MgAADvbR00TlSno+aNNRE/FgomeaIoWIHmhBNPEDojtv8IZ56RegFqoPVwJ9r6jvA00X5wzTIm2Cj8QqKzPnXiDa+bGPkQEAcDC+Y//XQ0S3NfBEXRbivpw5iCpckUDNPcvxvj0QaGH6761GvOAbEvzArJ5/at9iX2vt2rVL/BVRghoBAGe4oXYC9eokRzJwZGgUIfoKZxyeTuWu0JYABKKWZ3oGjVDmiSdIiMwJ9fzTwj72JUsJgLZtYAAIN/8RGxf59+ueTkWzVODTzqMiRzUo+vDM77gyoOoABCINib452c9br2D2ndG+Njtv/MiSAdi/f78YAYBI4AhJH9F5xwvmI+rZjui6GuqOXR8ZhkL/WxB+RgkRGPN1fur3n7996is8AqL0s1aoNF9kAP7++28xAgDh5j+ya1aPqNMtRPnzeEMzhRrBuTB2ClGuXLkoX758lCNHDhkSSer4hHqcYh+XQPHxSUpK4jFvoKD2V6j7Dfs7WAcOHBB/RUNARYoUoSNHjogAsA83uFCjhudWzuUOHjxIO3bsoMuXL8sQsIYjv+yR1lWliD56it/5T6DERLORmlFmQouXk0BL1hM18yz7/AXvuBslJydTgwbXUr169aha9ep05ZVXUnXP30TZNjInMDxww2Y8MO7ifPXq1eKOZ/WqVbRs2TL6669NNp7LZo9TPEigWrVq0g033ECVKlemihUrUsUKFalgwYLye88dp+dYaY8PW7J0CZ07d46WLllCa9asoVWe43T69GnPN8bXSeb5q87lKB8DlzUExIoXLy4yAQlpaWnpnCPTHhCwB18I8+fPl2MQbo0bNxaJxK+//ipDQvPZ0KH0zNNP08WLAZvRsw137dunM9HbPWSAEXWJauO8jLQ844OH/lr2zpD/Vk+CeN4bkkk7nxYvw9d34ccJOd/JX3HFFXTXXW2p1R13UKuWreS31nBDKOPGj6Pp06bRrFmz6NSp03Tp0iX5rW98k5SSwhUzrMeVHDcsXrxYjtmH91f///yH7rv3XhkSuq+//oa6dXtYjmXHx4f3R9OmTalN27Z0T6d7xPWXndG55Hsfnj17jub8Nkccn7Fjx4r9zhk2bxrl7zyPEhdmADgjdv78eUrkuzsk/gDRw3Xz6lRKoMfayQAj2ktU/1kMGR88g55RGEek/hJ4X99pl+Xr90LHiUrJkiWpdes76fsfvqe1a9fSf//7P9sSf8Ylc90e7uZJXMbR6tVr6J1336GGDa+jQoUy71Sz8m7j1998nfHZqg533y0/2YtLRZrefLMcCx0nuGPGjJZjWaWmplL9+vVpwMCBtHzFCrEfH3rwIT+Jv/rra99lPRfz5EmmO1q1ok8//VRUUP/iyy/pDk8GkO9ac/J7rX6XBWbw8eUWgBPVswAAiI7iqdy/fzqVLiYDmDaOMxvXqXnMTm9IO7P6rF+w9rN9rrzyCurQoT0NHjKYRo36nu7ucLdIrMOpTJky9HLfviIR6/fGG9SsWVMqWFD9pnYb0+mzIUNEUbUd2rZpI+os2Clnzpzi8QiXAli1efNm+umnn+SYV+HChenWW2+lt995h37++Rfq9VQvKlO6jPxWL9A5ok30fU/L+6jrQw/RyJHf0X//9z9q37692D680WIdp/2iBAAAoqeX52aw1fVyRM9fHOqPz/mMIl41KNpxbbgR6xExR/J33NGK/v3RR/T5519Qu7vaicpikeHdvtKlS1GfZ5+l4cNH0L9ee41q167lCeVty9z+7du321ZsX6VKFapTp44cs0fu3Lmpbdu2csyakSNHyk9cKuPNWLzy6qs0YsRX9NSTT4nMQCRx6cw9nTrRp58Oog///W9PRq2Z/AZCxWl/ouoUAAAir/m1RI93kCN206Xdxh0DaRPwQIm9kVDmyZSamkK9ej0lnlvff9/9WSqMRYY2Q0RUrlxZ6v1Mb/qof3+68847xF21wnVCRo0aJces62zDc3otfnRy0003ybHQHT9+XDx75/2SlJRMrVq1FMfnySee9GSUSnsnCon1zGKxYkWpywMP0MCBn9Azzzzj47EDmHHs2DFK5P8AIPLKlvB21lM4nKXcnD7LNLqKKK1VCbb+r395koja30zU0XPjxZ+NGS3L9/LLli0jit1ffvkVqlqlqgyNlszEie+kb2l2C/Xv/x/q2rUr5c3r7YmJn5suXLiQtm3bJsatan3nnfKTPVq2bGnxkYk3MzRz1izas2ev2A/du3ejjz8eQDc2uZHy5Mn2bqoJKoOlTfz5nFCDNtw8ftvgtddep/c/+EDUDYDg8c0/SgAAoiCvJxF9sQtRjfIyQFHxol00cW9SxiPn4H+AX1F873GioX2JPurl7WgoO/4htQH+N6R48WL06r/+JYqTixUrFuCZrnY5vpdpnVqHdFHZrEqVyp5MQH/q1KmTSAwZt5nCCaQdypYtSzfeeKMcs+6RRx6Rn4KlOUk82z52zBg6f/6cSPwHDBhIlSpV8tG2gr9joV2mYnROhH48ixYtQj0fe0zUSShatKgMBbNECcCJEyfkKABEAnf0085zN922iedu0956YGFRKB/RC/d5SxBS8hM90Z5oxsfcXwFRPlECqyJ2X5F51u/5eS4/Z3+sx2OyiF3Np/2bOb02ccr6107a3/PiTEmhQoVo0KBB1K5dO/HqFBePz5k9m06dOiWnCh1vu10ZgMqVK9M111wjx/xR+1Il0FkTaX4rYsOGDdSjRw8aPHiwJ+PDJ2j2fZM57us7bbjRNPbgRwAPd+1KL7/yCnF7NmCeyACgBAAgcvhG9+pKRD3vIm+tf328mD1OtkbFvRbi387NiR7UvYVXryrRT55MwJuem87KnoxBLvGoXLvixhvBd9ZdunShHo9ygwdqpbTTcpga97cjLGxQFoF3Dj8C+PDDD6lBgwaivYCNGzfSypUr5beh4wwAV2az4zn2vX7rE/B+VIN//P791VdfTW+++ZZnTDufdl6j/aX2Iw9G84QPl87wa4gdO3ZEnYAgiAwA52gBIDIKFyS6rwXRtdVlANPHp0bxqw2ydi5kztVXEf3LR1sw3Fzx052IBr1AdHfTBE0lQxXx6xOABGrVqhW98867MqLO/r3vefUCfW+G+R1drlw58V46197n3lOXLltGFy5ckN+GhksYypcvT7Vr15YhoeEMyt2W2xVIF++Fc+Mwffo8Jx7L+BbMvg/TyazDjwNeeqkvNWnSRIZEkEvb0REZADuKsgAgML5LvrU+0T23ECWron99XBrGuKRMkHWluH2CD56UJRU+8DY1uyaB3n8inV55KF3UaZAt83poNyaBypQpTe+++3+yNb1Q8M5Sg1XB72guYn/uuefpzJkztGzp0oz21K3gYmuriRavF2dQjJnfV1u2bKHrrruOatasaVAng/eXdlCMlq++104XfhUqlKfXX+8XYmVFC/zWX3Eubm45kU9mAAg/rvXf515PQqxv8Ef9jWx86UNmZPbYXURN68kRQzwt91vA25ZAj7Yl+qxvAnVt6f1Wfa+W+WyfPqLtfrfiOgDcXgG3SsftAaxfv15+EzqutX/ttddS/vz5ZUjw2ra9K4hEz/gkO38+TdR3qFG9hiyd0Z+Q2mPpPZ5evk5aDtdOFxnXX9+Inn76aTkWIS4tAeC0P5E7y4BwivxFAM7ETf3W177t5sh4wxtxN6uXQPe3SKCkXP7O36wbkC85ga6vRfSf3kRf/itrj4bXXdeA7miV9b16N+Kmdh944AFRGXDlqlWisyEruHY9373zo4BQcLO8jRvfkPGWQlZmjp33L1cG52PD79nbd2LatRzzeBv4tdISJTy5bfBLZABQAhAuSPgV7muCn5empaWFdXBynxYtGxK94Ln75zcAwkZ/yvG4GviPyVPyyqLpoqSialke432qWYigxrMvMNETxG8NdG1FtGAo0Y11PJFyDk9mwpNoVqhQQU5lLz7u/I4+N9TDA1fU4/Fw4FIAvmNv3rw5/ThlCu3bt09+EzrOAIRaD4CL7K01/es9hlwCwe/TBy76V0NwtMeHBx4P1/XKTTn3fvZZOQa+cOY1oUqVKumbNm2SQWAP70XEHYzMnKneGQ7tZOcKPhzphIovMq7YwxddqLh40fg9YHP27t1Lzz//vG0NqPjCtbO5prbTegOs4Imff/3UE9EbPYPnU8WueFAfd+uM/NmTML/Dn4x+1DtzUq50eqID0evdvK/8eQVYsB8HjhBN/LMOXdd6CNWv30iGWscJCN+FHzx0UCTC3I3sds/5xW31czO1ZcqW9Vx/DUWxdrGixQyK2K3t9EGDBtPbb79Fo0ePpptvvtkg4QzOxx9/TP369RN3ZWbxNfnOu+9S72ee8fEIQL9OxtuclnZBNApTooR9DepwvHP69Bk6dOgQ/X3gb/Fq4Yb168Xrkxyn8fGpW7cuXVHyCvEOf+HCqXJOe2zatNlzXG6ypZ5GQDmTiC5m62bT8fhxXEKZMmXSd+/eLYPAusyLjis9de/eXY6F5tFHH6VSpUrJseBx16fTf/qJNnouwFB169ZNNFoSKk7477rrLlq3bp0MCR9+rcpJGQBORP/vCaKebTxnhjY+Nhc3e6fTfqcfZ/plGUqg2cvT6bZnvJ+NcEdrzeoRffgkUZ3KMtCi8xcS6XCeRyil+nuUr4A972lzbfWly5bST9On03TPsG3bdvlNVpwoX3ttfWrdujXdceedVLNGTd1rYqFnApYtW0a9evUSFfjee+894i7VreDt6NOnj+iExyyOF4YMGSK2LzujY6y2N+t3XDrHmanAjemY219cn2DFyhU0a+ZMmjp1qnhlkkvojHAjQy1atKB27dtTg2sbiDYi7HD48BHq2/clGj58uAwJI5dmAPixU0KxYsXS0SGQ3fxdfMHhykZczBcqvjviNrMnTJggQ4I3b9588ZwxVPGaAcjlSVAfvtPbgl5Gc7+mEmsPo9NFzav9zu/ytF+mezIAJDMALPuM5UsS/fc5ojtDP9RZXPas56b9hel08ffo2psek6HWcPeww4YNpW+++UY0V2umqJ87G7rmmrr0TO/e4jzMl1d1NBTaNcm4BjVnAObPn0+LFi2y3BIdbxe35DfTk2iaxZURBwwYIBoBysrXSaG2N/N7vlPnDJXv9Q9uH/Hjl6++/pqGDB5Mq1evNn0NcR8DPXv29NxsdBe9QlrFv/v9Dz+IlgLt6sHRJ5dmALieRKJdxZygZXTR+I2p/Qh1PsXq/BCq62uTqBmfotIbv4eCv9RMoEa1g+e/c2kJJJK8jDCWZSJJ+5lpv9d/5312zw3+3HqtDLDBsZNES7aUo4R89vR6xzcq/ft/JIrfd+3abfo5P9/hLl26jN7o94bICGe+v599P5jFvRVyn/hcdD7LhqaB+Tk+tzFgXJkvOy7+r1GjhvHrf4ablT3xV4yLyXn64BJ/NuSzz+jNN96g5cuXB5WB5gwQPwb53//+S3//bb3YnisDVqlcRZQwgDE+PsgAhI2dmQBwmys9N1QP30FUxxP/iCocPg89f6H/UoVlHTbtJpqxxHP3eZbHfVHT+2L8XaNaRM/fR5RsLv0JiO/+f1lGNGdNKc8dqvVX/zjRHj5iuOiuN9TWS7du3Up9X+pLK1dZb8WPcRe5XAt/6NChMiR0nKBzT35mm7PlCnu1atU2yDB4jm+2qEcbkPUzl2RwL4JZGcVdgU2aPFkk/lznJxR8XPmRxugxoy2/XcH4jQ3OJIExLq1J5P/ACn+RLV9I+gHczd/x9uJn6a0aEXW8xfsYQMhy6NUyjJZlvPzznpvWr6YRTZjj/ezF0wZeH+XmuvKDTsF8RF+84quDn9Ac9KTRbw3PTQULl7Wli1+u7PfvD/9tuQ1+7syn70svyTEWaP+pfawdvLjond/jnzdvHm3YuNETYjydWVyZ0GwGgIvM69Uz0/a/UZyTGRdNmjzJ85vavv1Di6O4wt8b/frRkSNHZEho+HXEz4cNoy1btsqQ0HHFQt8NJIEoAUAGwKrQLph4wpWx+E6FK0rZOUTnnXL/x5sr+tW+iuipjkT5VL2wbOlBcOfMpctEP3vu/MfOJjrHdakMZ+dA9YXx8o1eQczt2YUv3K9e+bPH2fNEj7xH9M/xvHSVTUWwH37wQch3/nq//fY7/TLzFznG1AFSB0k/ruf9rlix4uLumd9mG2FDZTO+q69WrVrAt374vOfW+mrVqiVDFF/ra4zj/rVr1sgx7fkTvJHfjaQdO3bIseDWQ48bWJr+03Tx9pIV/JimlCejhP4BjIkSALPP0QBCxXeA991/v6g0ZedgpXJkdv4ifPMK5iXxGl0dTyZAMFyk+d/ixGXTLqIhE4i2ZXnlXD+/dpnmls0ZgjuuJ3q8nQywAd9PDJ1M9NNifoU1j0EFteBxDXUu+rfTwAED5CdJ7b4gX+fjhJgT5GnTptOx48dkaOi4Rn+gjC2/2njzzU3lmC8qQfe9PX8uX05XXHmlHAvdmTNnadLEibb0kKh8N3KkKFWwih8D+O/XwAbBnTKOIR7/e+7O1JmCwYHD4sVL0j2ZtJCHPXv2pnfo0MFw2WaHefPmGy472sObb76ZbV2bNWtmOG3gIT1jGDxkSLonEs627OxD9mvnoVaUfno2pV+a72tICGo4+WtCet8uCem5c/FvJaTf3TQh/cBU42nNDN519g5VyiSk//JJQnraXONpQxl+H5yQXrq4d/kVK1ZMX75iRZZ9G8owfsKELOttx5CSkpp+4J9/vL+R7mPw/Bdo+N+nn6YnJSWn589fIP2H0aM13xmdY4GHv//+Oz01NdWzjlnPK+1QtWrV9G3btunm9fxmxjprwjIG7bTe4dFHH03/acYMz2fj7wMP3mUvWbo03ZMRMlxXK8Py5XzuGP2udtCue/btmD1nTnrt2rUNl2/bkCvZONzhQ2JiYnroLcwAOJaVLDlfG6HhnvP6dfdXkS749Zq+iGjEVKI0+dz/kOcm86KFp3ap8nXEFM9fT2aFGlQzfjQQit3/eO6sfyD6+7B3nB/TcEMvVs22+FqnEa5UyK/v+cWHSx0yH4euTJkyogIfV1qbMnmyZ7k+n9GYwo8BApVs8feGTQdn+Vn9Cmcd3759B82dO5cqV7JaQpNOa9euFa8S+txJIfp1tr/jzr+lfk99zr7fU1NSbamDEqsSo/McFSCcQomAeZ5g58ucPm+St+c8bvXPt+CWz63ovTOc6B9NyfLxU54MgIWndleV4hrnRLfUI7r3Nm8FQDtcuEg06hdPYr08M4PC9T6svh/PuJU/u3Hx58oVK+SYCT4OHb++x8/sL126SKtWrRKtUVrVubPvvv25Pk2bNm3lmKJPePXj2c/t2XNmi9f/vA18ab9Tiaka/PHOt2f3btHgmM+dFKIlixfLT1pm1isTPy6x0tGSGebXxlk445rI/wHErshcnr06Et2UUcteRVL6ITgvDyFar+pV2YRLJ7hb4C6eu/9y+re/LJi3ypsBOKF5DMyJlR3xi61NSMtDcfnyZdGuQMDDEiBN895AeSfiFlW51U2r7rzzDvkpO07QWre+U46F5ty58+KZvbcDIHV8gjlHtdMl0D///CObMDY7vzn8xkYmM+uXdb144MyZt1KlveumZW+2J3L43PXsGzwFgFjGl2f4Ln7GPeA90oYoT5I30vHN3Hpwxb8vpxKN/pUTKhlokzxJRPd77vzvauJt/McO+w4Rfe1J99Z60mm7I8N0z86w5U0l3aFJ9/zjTIA1nq3lgyVxgrr8zz/p2DFrlQG50tqddxon8h07dtTVatdslMnjyc30co193rfZdkw26nvtwLyf1fHx7gZ7j37mcVe/aYZ2HfXUd9ohfqEEAGKY9iK3K2LSLtM7FE8leuYeogqiMjX/jvXf2riT6LMJmc/9tS544kRNmhM0zqy88pAcsQGv47SFRONmy4AsPPuId5MFm7dspgv8fMEf7W9kHhovH7/Pif/u3XvkmB/aZWVhfBC4ues/PZkAq+5ql/3VDI6ruStiL89K8RsLav14MHFecKLKz/69/b/wTNZwKQp3+GPHea8X7s7D4p0oAUAdAIhtdkRMKobNil/5425v+Xl6DnE7bTxdMA56bh4/HUe0wZMJMEro9xzkCmxyJATcPkFeG1+LXr3VW/FPtE+g3QX63RDibgnqBsXXb/r47aBKFngZYjl8UNSB8QToXhvkRGvZH39Yfof9huuvF40MaV111VWisaCMDVKrol2lbDTr6hm4md2lS5bQiRP8zN66zCJ2+2UeH78bCCESJQDIAEDsyRopB0fN640wfS2La85z87kP35lARVOs/F4mvpueuoDoR8/AjekYsVoJsKiNrf1xov/+N0QbA91Mqu+00/DnQPN4Bq5lL+IoNa2aTzsw9dckTrQqVDCoSe+LSIO0iZDnBzN+M/PHueOZRQsXhtwcrsKVC7lray3uyCjoDRXTZ86zavUqUVnROm+izE0hp6SkeINsxn0jZK5/sNsNgYgSALSSBLFH3TFoI2x7FfPEeT088XHlMjLABlz0/+0Mov3yNTqn+2gk0bQAb9Jlo4/LtfG7dpD4TQKuTChowiNGnEYG51KWdcn63dKlS2nTpk2W6hhw//7Nb7tNjvErlcmiy9ws+yjI/cHt/v+xbJm5Rx8m5fDkhMP7GDl813C843MsMW/evHIUIJ4FF6Py3e9mz53vaet9lgiHTxB9+SPRorV+Kv4FGeGH06R5RAPHeF//C7c6da6Wn+zDdz9Vq1WTYz6ItMdHAsTBYsj+PT8X526COcENFbeh0PC6hlSokCen6ckAccdDFSpUkN+GZu++veL5f2ZviKFQG56pTFl7+nvQq1PHnl4kwRgyAAAhOnaK6J0RRF3fJVq3XQaGiBP8mcuIhkw0rviXhQMyAf8cJfq35+7/WID0jRvH2bVrlxwLnb4o3A5811qxYkU5ppORsGdP3DN5v9+8eUu2ugR85z9nzhw6ftyTqwvxgHGpR+ky3OFPPTF+yy3NstUJCNa+fftoyZKlcsxr7TpPjtMU3/uD6ybw64nBM8p0Z4ZVqVpV/LXin4P/WO6gKFZx2p/IuQBwsNDiDwhKaDuZn9NP8dwJd3yV6PtZREdCrFd1wJOgvvE50SV/6Y3GQrNxdhhwycfH3xOtMVFBmxvb4Xb8rWp2yy3yk33y5smbvcU9kcb5TuiMHDl6xDNL9ukXLVosnrcHs6xMnvPRkwHgngFr164lSiuu8WQEssXVQSyaG+rhd//1pRLcGFBg/n+oZo2apnsx9F5ralCyh+XMmUtWeLSGt9eOroVjETIAEBHcWciChQvp519+sXXYsmWL/IXo4n76H3ufqM9AopWbic5zjXiTTp4heuZjoi1GdcZUfJg1bowabuGPKymOm+M5pudkoB/cOIwdr3JxQm1Hk8JaLVrclrWTmCATfuWvjRu9napkyDxY48aONcwc+OeZVx7rwoULU91rrqFr6l4jurW1UtueMyqzZnlyqTrLly+Xn/xR26QdMlWqVEkM3roARtNqB3MaNWpI5ctxJU3z8xjhxoS8zRSDHh4BQETwRfh4z57UqmVLW4eRI0fKXwiFQaSkGw3GmfNEI38m6vYu0YjpRHsPyi8C+O4Xoglz5QjTr1aI6xMO3Bvhd55t3PWPDAiAa8R73ze3huOoF196UY5Zx0XpfZ57zjsi0v3gE35l69atmsp+2oOVTpMmTfK2NmiKZ16u7Kg73tzmf/v27US3wxlCyKss9GTA16/fIMcyrV+3Tn4KFq+od+CKmg917WpbPQCumN714YdFd75W8f4/etRfw0y6HR5HRAYg3O0kQyCZF5L/kzGYEzWYaeNJgP0cQsSqt2artzj/zS+J/txIoi9/XxauIfpktBwxYnFd7MR1Hrip3zmeG0Z/26R16vQpCwlMVvfffz81adxEjlnzWI8eVO+aep79a+2Ac/E5Z3AuX+ZlZD+n+PHHyO++k2N+GCT8CtdTaN2mjbe0wsLqfjXCuDvl33//XX6y5tZbbhVdGduhefNbqfmtzSlXrlwyJDTcPfHOHTtkM8Wgx2l/Yrje4QQzfFz1PvH0+nm049rvjaYNt0j9XrDbFrl9wfHzoePexPLxfxONmGZcXM4V6fqP8txB7pcBRnys8iHPvJHE6dvyvzyJyHSik0E8TuXa5tu3b9e16R4a7lSo3xv9qFzZcjIkNE1vbkrPPNPb8ynElFRj1erVBs3+Zk2lPxsyRH4y4jnAnPjraVaN2wOoWrWquMsO1bbt22ju3HlyLKu9e/fRX5s8B9civpt8993/E3UWrKhSpTI96smglSpVSoaEjjNof/1lfdsCyXhN1WX4ERMyAIb4gIZyUNV8+nn1YUbTMF+Rkq/lqXDt5zDItmj1e/rBLKN5tYMR/fdmInB/ywsvriy3YjPRC//z3HF+QHRUV0Hwh1lE81Zya2cyIAjb98kPEcKvOr73tbcVwmDt2rXblt78+Pn3jTfeSB98+AFVuqqSDA2C53S5yTP/gAEfU+nS1hMXPq+4t7rDh7U1zLOfk1wHYt48o8TXc17qT02eXS1Cfs6VM5cYDBZt2jdff+2zZUJ+fDFjxgw5Zg032jR6zBi64YbrZUhwypUrS6/360ctb2/pbfzJot17dtNqTyYt3NLTTFSIcSB+ZIMMgF8qAQmUiBhNYzSv0XRagb6PJrVuVtbP7Pza3zI7j1Yo82TiyIefO1sd8uTJS5coL01emJeu7pqXflqWhy5TLpq7MkH08X9E03NeMELJNISK7/7f/5ZozgpPRBdCIrRz507R8lzwleGy43fjO3fuTF8O/1LcyXNN/kCN0PD3RQoXoaeeepK+/fZb8W659Tu2BDp67CitXLlSFDP7wwks11XJ3H7Pb2uL/DlYDWHArygOHTpUjmXH6zd92jRNPQZrqlWtRuPHT6Du3btRamqK51ryf3w4Y5ecnERNm95MY8eNowfuf8BSaYeSlpZG69evFxnQsLN6OkUJt+KY4Dk50nv27CmDwMvoiGouYEE/Hh6Llyym68R70KH9Dr/7+8wzT9OECRNlCAu07lljo3nz51PjGxrLsUD0MVmCSAS6dXtYtI4WThyJXX311Z47mp9lSGgOHT4knu3akWhpJdJ5Kpowl777fjy90v8PGRq8Hq2JPusrR8Lsd0/Cf5fnt4Ip+te7/7776KP+/UVxtl+8u02e5lzBcOrUqfTjlCm0Zs1akRBzGJ8D/OyYMwv58uWlRo0aec697nTttfXlnFZkrtyc3+bQs717i9/OZHy+cA1+fi0wS0W+CJk4aSLd2/lev43/cJPIEyZOpDpX29fwDr8Z8ceff9DYMWNo8eLFdPToUfFKHmdIOFPGx4czydzcL1f4u/MO1fuh2ofW4lUu/udMX9Z4zxd7r3O3+PLLLylh9OjR6ZyrBiPWTkI7eDMAuveVg2CcAQjOvPnzPBmAG+QY87df9BdTgrjwFy1eJN5FDifujnXu7797TuzhMiSCeJdoEzA/8djAgQPpOVULPQSRygDw6433vOat2CgEuhy0269RoXwFGjxkMLW4rUXwd9/ayX3sUz6vuDY+t7/Pd35ctMmJbcUKFUQpTPZzMhSZP8oZjf79P6L33ntffM5k/Dvcmh8/uuj5WGRvtDgRfvDBLjR27Di/d/j58+ej559/nl577fWAJSqh4H3ENwHbd2wX7+RzLf8SJUqI+hz8HNp7Tuj3XZDnic6ChQtEpoLjhMDsOD/cZ9y4cUS//PILbz0GwyEh6sPiJUvSL19OD3nYs2dveocOHQyXbXaYN3++ZpmXNZ+NBv4+0DT+BjW/djCaLvtw8OCh9Geffdbwu6gN6dmHjwcMSPfEesYD73OjcM3Q+ZaE9EvzwzscnpGQ3u2OhPScOTy/qTsfsg28XkbhcsiZM1f6yy+/nH702DHjfWRl4H2qDxOD0XkUypB92WvWrk1v1qyZbjuN4g8eEtJz5MiZ3rFjx/Tjx08YLi9cA69nxYoVxTqodTEaEhISxfZs/Osvw+XYNxjvT7uHCxcupj/xxBPZt1V7HWX5Tn/M4mOYNWtWemKWxjAAAgqUM+fvreTe1fzagc9XlzOzCTyN2lw1MO24Z/g7Ai2bTp5HNH2xt/GfgNR6+sB3omPGjBF36Z70WobaJMvi5A4KtEKm8cHIiu9m+dU57vAnK3WuKpnjXOzNz6NXrFwhxiMjnaZPn67rq994//Ax4foMXBkwa6NG7rRu/ToaPXqMHPNBHR7tIYsznPYnclEMGInjM8NxrB6L7JFeVPhbDRXOf9Xm+tjscHfAs2wD0fAfiQ76az8lSDt27KQRw4eLIvrwsPP48o433vn7/95PX37xBZ0+rX23XB1YtQ7Z5+U6JdkzDeFz8uQp8ZaCt5Ki2h7temnXN128zjhl8mTasDF7Y0H2Md6ndnu5b9+s7f/7+1m7M6Quwo/JRAmAlSYmAZzNd6QcEdp4VkuFG31vNH2EVp8b/OHW/has4UqVMtAGlz0LGzLkM5o9Z7YMsYvRDrTC947mu+MBH3/suVv21Z8+z2s8PyfICxcsoJ27dsqQ8OJn4GvXrvX77N/Lu++4FGDOnN9ozOjRJp+bO9Ongz4VzYRnHAp1ONRfTvC1Q5wSb8cUKUKJ/MoTV8QAvRg5OYzjoxjCx0kNRjKufPnXRbSbpVl90fBcGHALf1zrf4wnjQ5H3MiJUY9HHxWNA1mn3Tl20KYW2fG6z/h5Bn366SDPvtH+Ln/2P6+ybt062rhxo25++3FGZcXy5UE0w+xd9/T0yzR48GDxhoO+h8OoU7vYx5Du+ffn8j/p/ffeN96/HBbm/e4mnPhzJkDc+uMxADiX0UXLYWowg2OJ2LE/TH2bbNpF1P87ogNhrGOwb99+evLJJyx0EuTvuId6nP3Px4nh/AXz6dFHHpEhCq+H+d/kroOXLlkS9t7pOIO1YMECz+/wGwr69VPj/FcNzPuZ281//bXXaNkfy7zBkWK0WtrBD86cccbq1VdeEd3/QmAqzRcZgOLFi4sRgMhQkbh2MKLCzUwbSIBYxEV2Wm9ZNxsuKf7yx8h0NTx79hx65ZWXaf2G9TLEDKNjr08lQjk3/J8XfDfNd/5PPvEE/fOPvilE//Ma4QqEe/cZdf1oD7775ef4XKnPN//rvXbtOur11FP02++/yZAIUIdOHWbt4Acn/vyoo9/rr4v2ShxXcuFQKs0XGYCADXTErQBnHwTJ3xVtFK4iKv6rBqaPwLTfQSgm/u5t6z8SuFGaqVOn0Ttvvy1qbAemPTfUsdYfb/uvVU78p/80XdwRb9xoT5vyS5cuo82bN4uEKzT+t5Mr/XEpA5e0WLF8+Qp6/rnn6KcZP8mQKOJNNthszuxwW/9vvfkmTZs2XdcmA/hz5ZVXir8iA8BtOAPYT125Pq7gbNQ0gabVf29m2VrBTh8MXrbR+mkHZ9nuSSue/1/2/grCiYvBp0z5kf716qu0ctVKPwmi2l++Ev1Q9ql+OdlxD3Ljxo+jN/r1E639hZ5gZ8UJ9K+zZllIrPyv+4F/DtDs2fZUtFy1arUoVh87bqzflgQt8bc5AQ4Tl3K8+MILNH36T3TuPBL/YJQtW1b8RQYgIIdF2IHjLmOhzheSUCJlRc2nnd8oTE8/vb9By1d4MIyWYRSm5e+7yOo3jGh3FB6dciaAI+97O3emH6f+KEP1+MRVJ692nwa779Ry1LK0n7PilgX/7//epd7PeJv6tbtYecKECQH7EAiFehb+xx9/yhBreHm8/bwfPvzwg6yv1oWL/pBoD5PmkI8YMYI6tO8gavyfTzPu6Ah8K126tPiLDICTGcVPZuM947gtjEKNmP3RLsvO5TKjdVVh/n5L+12gac0Ibf4X/kt02nPTY+XGlOcdOolo2kIZEAVczL5p02Zq3649denyAO3fv19zt6n2r9X97O9i8C6bi5P5rnzhooWiP/r33/+ADh48aNudv9bOnbvC8DqktwOcCePHi31qF95+7s65X783qEOH9qKmPe8nS28y+EjUBR+L5d9Lu+Dt4IczjD169BCvVJrKnFlZ1xiFEgA3COW8VRcXz6uN92y5BnghvoZYY7RdatzO7dUeJPMGjCFq2YfopyXed/eDxa8SLlpHNGg80fHTMjDKRo36nho0uNaT+L5Hy5cvF63YZUbw6sQOltE8mcc2Le0C7dm7V7z61rPnY3TTjTfRsmWhd9Rk1tdffWV7ycLhI4dFB0nhMnfuPNEL49NP9xIZJa7MaLphJ3UY1F+jS0h7qORnTvg5I8YdC737zjuiP4kxY8eGJWMWT7KUAKjcAPhiZ4RvI/9xm82r7dB9EHZqh+q3P/r7Y+Eaoh7vE308imjDTqILQaQnBw57W/vbvEcGRFXmPubOq97xRPSdOnWk119/nb7/4QdasnQp/fMPP6MIdp8bXSDeSog7d+0Sif6wz4fRM08/TZ06dqRvvx0ZsYSFE9O/NtlTsVCZOHGiJ9MUpndEJe7Yizvbatumrdhv3DUz78eAd+Pq0KlD7YvnkF26fEn05se9CI4aNUrUQ+h8T2d69//+j/bt3ycnBCu4h0qW4MlhicORL18+UfEFfDGOTMLt4Ye7ZtTYDAU/z/zll5mitmxo0qlv3750VaVKcty5+LkqF4HedNNNMsSZuEnYWbNmyTE+r/gSDP38ypdMdH1togdbEnW6hSgpl/zCh7Pnib75ieidEeFrU8Aco5Qg637gLn2rVq1KNWvWpKuuukqch1eUvEI0Y5qSUki8wZS9h8HMcU7s9+zdI5q63bNnj8hgbNu6lbZs2SJeH+MmisNWwS2Atm3bUK1ateSYdZMnT6Z164J5tdI67ta3XLmyYjsqeY5N5SpVqFSpUuI986JFi4ohT3IeObUBz6Hidgv4GHDbEJzw7/CM8/FZv36DeFX0/HmLz/jxCCAL7i3z+PHj4nNGBqB27driggBfQo+g3UVdLLy93s8pKSmij3Wn47s3PrHtfAZqn8z9mZU23No5VqY4UTtP3ufZzkTlfbzZy1f7so1ET/ybaOVmGRhx2v3gb5uz7i9utZTfX+bzsVChQpQnTx7x2V8Xw3wucF/0XOGQK7EdO3Zc/JXRHjC1+3wdFv2u4u987D5uWj41NdWTyBSgAgUKUP78+Sl37tzyW2MHD3of9XBRPzdDfOToEXv7jMCxzuKaa64Rj9hYRgagffv2NGnSJBEIvviLrKLI6AIOGi6S8PB1zhjtb+vnV7InruXE/7WHie67TQZqnDxD1HcQ0RdTuYU7GRhRvN2BtjOUc1G7TO381vdpzFO7yN+hCeWQaPk7DGrZ4TpUyABk0alTJ9E7JxN1ABgX34ALaS/ekOECCZ/I7ttznhunjTuJev2H6I0viI7p3u3nGv/DpkQr8Wf6WJ73j3YfBbu/eHn6ZYYrJYkBateo3abdVf52m9F8+un136nBF3WoA00HttKm9RkZAH6+Bi6kjz+DYmlmME3tZ+2gZ28MyG8GfDjSk9t/nei3Fd7n/tzgz4ufen7d6Ocjxtd+0I9r+do3/vYZUpUstLsj0G7RHwY1rp/P6HBpw3zNpwRaDwiLihUryk8oAYhTfGUaXb0QSy5cJJr9B9Ej/0f0v7FErw4h2ndIfhkR6jzTDv5iff5ODUz95fm0tNPEuGA31Wh6Hle7UL8rzTKaT/2W9jfVX6b9DI6hTesz6gBwTUxtzgB8cftZHWoMAPZS5xEfj1iKKX2lFIqv80+7PxiP66cNtJ8cuC/1m8WMNk1PO5/R9PrN1G66v2Xr57NK/ZZ+fZ0EdQCy4G6iVTsAGRkArkHNNTbD3VWl+4Xj7FZXTbivHlwIzqWNQfWcFqP6otbd3/pqz3Wz3LL9Pug3V22Ov0Ot35VG8xvx9Tu+lsu034dbJH9LQQYgA6fx/KaFenMm4xFAYmIiVatWTY5BZPCJGc6TUy0/3L8D1rn5GKl150hFxe5G26LCgtlOubxIJxrBCLRuvjbX33z8nfZ7Nc4DLy/QLtTPq6hlaGmX6WvZvsJ9UdNq5wtmfgiL6tWrZ3ltNiMDwGrUqCE/gW9Wz2J1ReiXo8Z9fR8Mq/MDmKHOM1+pipaaLhie6dUsTjudg90UX3g52kFRu9YX/e+rafXLUfwtz0y4r+X6oqbVzhPsMtzCTzsUTsMNamkhAxAR6urzdaUZ4ZNKO18w80LscGrkYvZ8VOeu2g4z28PTyOmcetpr18vXOmo3NZjNZ2anM7t/eHn6ZfK8/uYPdnojPL3ZbYGw06fxWTIA+twB2CHYK0Yxms/sFYgrzr1UTK0Gp9Gfg77WUU2n345A56+c1ombHgy1/trND3abjKZXu1QJZdnaQ8OCmZepQxjoULJglw1h5TcDgBIAs8yc+czsdAAcUzo5tuRzWZ3Pal19ra/ReR/oWpDLU4t086Xja7f4o3ZvuLdbu3z9b+nXW32vX69A26dfLjiGPo3PeAuAcXvM3FEAOgUyy9+VEM6rwEwMg6vQuUJJIYLEP2HLKaBdSDhifoNl2rbuURDKodVvayjLCAX/rq99rcLVuvibVtGut3ZeLTW/0XfhEu63ALgOgAveNOA3ALivFK7wr2QpAciRI4foFAhCoT0BonUy8O86/0SMTxzjqSEEfmdXx10z8B/b+Ftv7e8GSy5Tv2hb1z3M/O0af/ztNl/hZpmdl9dbTau2Q7s92u8V/XQ8GNGHq23yNw+EVd26dbMk/izrmAf3FARmGV1pRmF2U1eT/rfU1RWJdQDzbIjxMg55xgfNoKd+z980Zhmtu9XlyvNUu5pupXaD3CRbBLsctQ7adTHL7Hrrp1G/xcwsw+zvhIOLaumHE2cA9JABsEx7Jai/kRSN34TgaM8RFuCYZYmv1Lz6ZfiinVnFusFEgP5+y+w6MF+/6QlXq2R2UUaC2aRI0G+L0bh2MMPsdGp/hmOfGC3T33qZXWeIOKO0PVsGoF69evITuIeKVdQAzqaNVQ2OmRgN9ViGOp8vannBLJO3Tz+9TKHUpltdRavzh4PaTWrd9ONmmZ1eu3w1j3b/qjA78TLlocz4Lab/fTPCsX7gk1EGIEslQHbu3DkqUKAAXbx4UYYAgHX6mFF72RnFpGapeY3mCyY21rMzdrayHiAEc5gDnVrxeDjCWUnPBZUAc+fOLZoATkpKkiFe2UoAkpOT8ToggCUqhuW/amAcSaiBGX3ni3ZZ2kHRflYCLdMf/fKDoeY1uYwgJo1bgQ6l+l4/jVG4fhortMv3NUDUcZquT/xZtgwAa9iwofwEAMHjWE+lZr5iQv33/phNGbWpqPpsdl5fzC4jyN/TTp6xizI+yAFMC2LXB83oUETiEOE0sE2jRo3kp6yQAQCwnTZVM6JiarOxW7AxYThSAn0Ko8bloP3KDLFJnv+yJPpaISwzXml3odl9pt3l2vl90X7nbzojZpZvBMffNr7SdGQAAGzDMRYPfmK6jFeSgo0NWSjzaKlY2N8QiNpGnYCz6n9HP4Narmb5+kkgsGD3mX56o0Oj+PvODD6swc4vT4UsrKxDnPJVApCtEiC7fPkyFS5cWLQaBACBqFjKX8xkZppgGMWMenb8lpnf8cXM/jDAX9m1m8B5gjml1Hlgy2kYppPK4ZUAU1JS6PDhw9kaAWKGJQA84bXXXivHAMA3FTMFiADEZHZGEv6Wxd/Z9VvBLEtNazQP7wDtYED7lY9JIAb4O52MTh3mK9yfbPPIE0yUwqnBBgmGyahjcIm+UeLPfK65ryIDAFA4AgkUM8mIJiJ3CIHWxQrdsrPFnfrfldudMZigfkK/KIg92mOtHRT9uGIUbjRuNG+YJOTOIz85k7+03GcGoHHjxvITAGSlEjUTsYxI+8IdG0UyxpO/xX+ypOtqn6jBAouzQxxQpzwPTD/uT5ZpYv9ka9KkifyUnWEdAHby5ElRDwANAgFoqQjDTEzD05qZLhTBrEc4WYhAfe2ecO42R1EbaWEfgg2snWwJyfkp/dwpOeYsuXLloqNHj1K+fPlkSFY+SwC4NUCjzgMA4gdHzNrIWX02E2GEK1L3LNfSmwR2s7AOvmZ1wmbZhjfGaGD646j+AtiD6/L5SvyZ39oLN910k/wEEI+0kbViJpIOVwItl5vx7rxTaNZFbXpYqe2P5j7Q/752nbSDL76+14YFWgbYIyInbVTceOON8pMxZAAATOFIIpjIOFwRt1MTBJlY8R9L8Wmw22fn/gi0LP5eDYp+PFT6ZTLekU5KnPTbajQeiJlp3Ma5GYhAabjPOgDsyJEjVKxYMdEuAED8CibxD2Zas1QE45bI07O+Qe8G/cRqm/0JZR49o5XULidS+1y7w0LZDqfgbXDB+ut3t4W3dJxaByBHjhzi/f9ChQrJkOz8lgBwJcA6derIMYB4FalEIFZ49legdCDjO55Qv3/NJiD66YyWFQq1HDuW5Y9af+1fs9vuVC5Yf6PdnVGvJgRW5g0j7trfX+LP/GYA2G233SY/AcSjYC5untbuREP9frgTI7t51tffKovvfE2gwvmvdmDqrxLo+GjndRK13sGcX+BXoF3J34dldzvzGLZo0UJ+8g0ZAAC/zCYedkcC2tjKiQmYGb7W20yibPS9ClPzq0HP6Duj6SLFmQmEq2kvD6Y+q3D9d9pxRX9KOPROPlRm0m6/dQDYuXPnxKOAs2fPyhCA+JHgiRQCXCIAAI7Cr/7x8/+kpCQZYixgCUBycrLfloQAYhUS/9jGxxcgFjVr1ixg4s8CZgCYmWcJALEEiX9sw/GFWGb20b2pDEDLli3lJ4DYxgkDEofYhuMLse7222+Xn/wLWAdAqVChAu3YsUOOAcQeJAyxj9+NvnTpkhwDiD2VK1emTZs2yTH/TJUAsNatW8tPALEHiX/sQ+IP8aBNmzbyU2CmMwB33nmn/AQQOzjhZ0j8YxsSf4gXwaTVph8BnD9/nooWLUqnTjmz20OAYOGuPz7gOEO8KFiwIB06dEh0A2yG6RIAfqUAjQJBLMBdf/xA4g/xhCvsm038mekMAGvbtq38BOA+nBggQYgfONYQb4J5/s9MPwJgx44doxIlSlBaWpoMAXAHJAbxJTExEb2YQlzJnTs3/f3335SamipDAguqBCAlJYVuvvlmOQbgfJzwMyT+8SFnzpxI/CEu8SP6YBJ/FlQGgN19993yE4BzIeGPP3zML168iMQf4lKHDh3kJ/OCegTADhw4QKVKlcIrNeBIKOqPTzjuEM+45IuL/4sUKSJDzAm6BIDrADRu3FiOATgD7vjjFxJ/iHdNmzYNOvFnQWcAWKdOneQngOhCwh/fkPgDhJ4mB/0IgB08eJCuvPJK8bwNINKQ6AND4g/grf2/f/9+Kly4sAwxL6QSgGLFilHz5s3lGEBkcHOuKtJHxB+/kAEEyNSqVauQEn8WUgaA3X///fITQHhwRM+vdHEFF8YVTxHpxzfc9QNkdd9998lPwQvpEQA7efIklSxZks6cOSNDAOzBkXyBAgXoxIkTMgQAiT+AHseTXPs/b968MiQ4IZcA8A8H2+wggC8cufPAOJJH4g9aSPwBsmvXrl3IiT8LOQPAHnzwQfkJIHj6RB8RPOhpzw8AyMpqGhzyIwDGz2TLli1L+/btkyEAxlREzhCZgxm46wfwjdPe7du3i3pSobJUAsC1sh966CE5BuCl7uz1ib4aAPxR5w7OFQDfunbtainxZ5ZKANhff/1F1apVk2PgFByBak8O7WHWH/JgTgFtoq5YPIUAMiDhBwiMr5PNmzfTVVddJUNCYy374FG1alW64YYb5Bg4BUei6rU5Plm4gxQ1cJh2CIZ+3mDnBzDC5ygSfwBzuFdeq4k/s5wBYN27d5efwGk4weeMAD+uAXAilfAj8Qcwp1u3bvKTNZYfAbBTp06JHgLx6paz8SMBHtCEMzgBJ/wMCT+Aedzn/549eyy9/qfYUgKQP39+6tKlixwDp+LSAE78URoA0Ya7foDQcMV7OxJ/ZksJAFu/fj3VqlULF7RLqGeunCkAiBSV8ANAaNauXUs1a9aUY9bYUgLAatSoQU2aNJFj4HQcCavE3+qrJACBqAwnEn+A0HG//3Yl/szWmL9nz57yE7gJZwRUBA1gN5XwI/EHsMbuNNa2RwDs/PnzVKZMGTp48KAMAbfBXRrYBecSgH1KlChBu3btoty5c8sQ62wtAUhKSqLHH39cjoEbqQgbpQEQKnXuIPEHsM8TTzxha+LPbC0BYPv376fy5ctTWlqaDAE3w10cmIVzBSA8+OZ6x44dogt+O9le++uKK66ge+65R46B23GEzhE7SgTAF9zxA4TXfffdZ3viz2wvAWDLly+n+vXryzGIJbjLAwXnAkBkrFixgurWrSvH7BOW97/q1auHVwJjlIrwOfLH64PxCXf8AJHDr/6FI/FnYYvB+/TpIz9BLOLIX70+mDNnThkKsYqPMxJ+gMh77rnn5Cf7heURAOPEgRsH4u6CIfZxaQAnENzxEMQOPqZI8AGigxv9WbNmTUbm225hKwHgBOGFF16QYxDrOMOnEn/t3SK4j/b4IfEHiJ4XX3wxrHFp2EoA2IULF0Sfxbt375YhEG+QkLgHHyscJwBnKF26NG3dutX2d/+1wlqLK1euXPTMM8/IMYhHnKCoRCWcOVkIDR8TZNIAnOf5558Pa+LPwloCwE6ePEnlypWjo0ePyhAA3G1GE/Y9gLMVLlyYdu7cKbraD6ewv8dVoEABevrpp+UYgJc2AdLehYL99PsXiT+Asz377LNhT/xZ2EsAGN/9V6hQgY4fPy5DAIyphAqJlDXYjwDulJqaStu3b6dChQrJkPCJSEsuvEEoBQAzOMHSJlr6u1cwR78fAcAd+O4/Eok/i0gJADty5IgoBThx4oQMAQgeirIBIFalpKSITn8ilQGISAkA40oNvXr1kmMAoVF3ttrEX5USoKQAANwsknf/LGIlAOzw4cNUsWJFlAJAROgzBBE81QEAgsKPyrdt2yZKASIlYiUArEiRImFt1xhAS5UUqEFPW3KgH4JltAz9AADgC7f6F8nEn0W0BIBxuwDcOuDBgwdlCAAAQPzivv63bNlC+fLlkyGREdESAMbtArz66qtyDAAAIL699tprEU/8WcRLAFhaWhpVq1ZNvOsIAAAQr8qXL08bN26kpKQkGRI5ES8BYNy+8euvvy7HAAAA4tNbb70VlcSfRaUEgHHXsfXr16dVq1bJEAAAgPhRt25d+uOPPyhHjhwyJLKiUgLAeIMHDBggxwAAAOLLwIEDo5b4s6hlAFizZs2offv2cgwAACA+3HPPPXTzzTfLseiI2iMAhRs+qFmzJp07d06GAAAAxK7k5GTasGGDqAAYTVEtAWDcMmDv3r3lGAAAQGx74YUXop74s6iXADBuHKhq1aq0f/9+GQIAABB7SpUqJV77i0R//4FEvQSAceNA7777rhwDAACITR988IEjEn/miBIAdvnyZWrUqBEtW7ZMhgAAAMSOhg0b0qJFixzTN4gjSgBYYmIiffLJJ+g0BQAAYg6nbf3793dUGueYDAC7/vrrxasRAAAAsaRLly7UpEkTOeYMjnkEoOzcuZNq1KhBZ86ckSEAAADuxc/8ueIfVwB0EkeVALBy5crRG2+8IccAAADc7Z133nFc4s8cVwLALl68KCoE/vnnnzIEAADAfRo0aCAq/kWzyV9fHJkBYNxJEO+4CxcuyBAAAAD3yJkzJy1dupSuueYaGeIsjnsEoNSpU4eee+45OQYAAOAuL7/8smMTf+bYEgB2/vx50V0iV54AAABwiypVqoiSbG7336kcWwLAkpKS6LPPPkPbAAAA4BqcZg0ZMsTRiT9zdAaAcXeJ3bt3l2MAAADO1rNnT7rlllvkmHM5+hGAcvz4cdFl8N69e2UIAACA81xxxRW0fv16SklJkSHO5fgSAFaoUCEaOHCgHAMAAHCmQYMGuSLxZ67IALCOHTtS+/bt5RgAAICzuC2dcsUjAGX//v109dVX06FDh2QIAABA9BUvXpxWr15NJUqUkCHO55oSAMbPVr755hu8FQAAAI7BadIXX3zhqsSfuSoDwFq1akWPPfaYHAMAAIiuJ598ktq0aSPH3MNVjwAU7imwfv36aCAIAACiqnr16vTHH39Q3rx5ZYh7uK4EgPGO/u677yh37twyBAAAILK4sbpRo0a5MvFnrswAsHr16tHbb78txwAAACLrvffeE83Vu5UrHwEoly9fpttuu41mz54tQwAAAMKP054ZM2ZQYqJr76PdnQFg3Dog9xx4+PBhGQIAABA+qampoqOfMmXKyBB3cm/WRSpVqhQNGzZMjgEAAITX0KFDXZ/4M9dnAFiHDh2oW7ducgwAACA8+DX0Tp06yTF3c/0jAOXUqVPUsGFD0QkDAACA3WrXrk2LFi2ifPnyyRB3i5kMANu8eTM1aNBA9B4IAABgF+7gZ9myZVSpUiUZ4n4x8QhAqVy5MpoKBgAAW3GaMnz48JhK/FlMZQBY27Zt6ZVXXpFjAAAA1rz++usx2RttTD0CULh9gNatW9NPP/0kQwAAAILH7/tzWpIjRw4ZEjtiMgPAjhw5IuoDbNu2TYYAAACYV65cOdHOf9GiRWVIbIm5RwBK4cKFacKECa5toxkAAKInOTmZxo8fH7OJP4vZDADjFgK5wQYAAIBgDB48WPQ6G8tiOgPAunTpQo8//rgcAwAA8K9Xr15x0bhczNYB0Dp//jw1bdqUFi9eLEMAAACyu+GGG2jOnDlx0d18XGQA2MGDB8WB3bJliwwBAADIVKFCBdHSX4kSJWRIbIv5RwBKsWLFaMqUKaIXJwAAAK1ChQqJNCJeEn8WNxkAVr16dZo4cSIlJSXJEAAAiHe5cuUSNf5r1aolQ+JDXGUA2M0330wjRoxAc8EAACDSgi+++IJuvfVWGRI/4i4DwO677z7q16+fHAMAgHj11ltv0UMPPSTH4kvcVALU481++OGHRedBAAAQf/hm8LvvvovbEuG4zQCwCxcuUKtWrejXX3+VIQAAEA/4cfDPP/8c13XC4joDwE6cOEFNmjShNWvWyBAAAIhlNWrUoPnz58f9W2FxnwFgO3bsoEaNGtGBAwdkCAAAxKKSJUuKRuG4o594F5eVAPXKly9P06dPF++BAgBAbEpJSRFd+yLx90IGQKpXrx7NmDGD8ufPL0MAACBWcM+w3NBP3bp1ZQggA6DBjwEmT54suoEEAIDYkCdPHpo6dSrdeOONMgQYMgA6t9xyC02aNAmtBQIAxABu5W/MmDHUrFkzGQIKMgAGbr/9dho1ahTlzJlThgAAgNvkyJFDtPXSunVrGQJayAD40KFDB/ryyy8pMRG7CADAbbhxn88++4zuvfdeGQJ6SN384OYh//vf/8oxAABwA078P/30U3r00UdlCBhBBiCAp556igYMGCDHAADA6d5//3168skn5Rj4ggyACc8++yy9/vrrcgwAAJzqjTfeoL59+8ox8ActAQbhww8/pJdfflmOAQCAk3DC/8EHH8gxCAQlAEHgk4szAfHacxQAgFO9/fbbSPyDhBKAEHDNUq4bcPnyZRkCAADRwDdkXE+rd+/eMgTMQgYgRNyH9MMPP0wXL16UIQAAEEn8nv/nn39O3bp1kyEQDGQALOBmgzt37kznz5+XIQAAEAm5c+cWN2IdO3aUIRAsZAAs4l4E+QQ8e/asDAEAgHDiptpHjx5Nd911lwyBUCADYIPff/+d2rRpQydPnpQhAAAQDvny5RP9tTRv3lyGQKiQAbDJsmXLqGXLlnTkyBEZAgAAduL+/KdNm0Y33HCDDAEr8BqgTRo0aEAzZ86kEiVKyBAAALBLyZIlafbs2Uj8bYQMgI3q1atHixcvpho1asgQAACwqmbNmiJuveaaa2QI2AEZAJuVL1+eFixYgL6nAQBscMstt9D8+fOpXLlyMgTsggxAGPBzqhkzZojeBAEAIDTc1spPP/0k4lSwHzIAYcLvqH711VeiaUo0HQwAYB7Hmdypz/Dhw0VcCuGBtwAigN9X5ZzsuXPnZAgAABjhBP+LL76gBx98UIZAuCADECFcL6Bdu3Z06NAhGQIAAFqpqak0YcIEatq0qQyBcEIGIII2b95Md955p/gLAACZKlSoIN7xr169ugyBcEMdgAiqXLkyzZ07lxo1aiRDAACA3+3n1/yQ+EcWMgARxo1ZzJs3j/r27StDAADi12OPPUZz5syh4sWLyxCIFDwCiKKRI0dSz5496cyZMzIEACA+JCcn06BBg6h79+4yBCINGYAoW7lyJd199920bds2GQIAENvKli1L48aNE02oQ/TgEUCU1a1bV3QkdPvtt8sQAIDY1apVK1qxYgUSfwdABsABChcuLFq74kaDEhNxSAAg9nDjPlz3aerUqSLOg+jDIwCH4YuDG8A4duyYDAEAcLeCBQuKllHbt28vQ8AJkAFwIG4ngOsFrFmzRoYAALhTtWrVROM+eMXPeVDe7EDcXsDChQvpkUcekSEAAO7To0cP+uOPP5D4OxRKABxu4sSJ4iI6fPiwDAEAcDbuvW/IkCF07733yhBwImQAXODAgQPUrVs3UVEQAMDJbr31Vvr666+pVKlSMgScCo8AXKBEiRKijeyBAwdSUlKSDAUAcI5cuXKJLnx/+eUXJP4ugRIAl1m7di3df//9qCAIAI7Bz/i/++47uuaaa2QIuAFKAFymVq1atHTpUnrmmWfEe7UAANHEry1zY2ZI/N0HJQAu9vPPP4u6Afv375chAACRUaxYMfryyy+pTZs2MgTcBiUALsbNBy9fvpzatm0rQwAAwk+1U4LE392QAXA57l548uTJNGbMGJEjBwAIF45vxo4dKzry4crJ4G7IAMSITp06iQqC/DwOAMBOXN+I45Z169ZRx44dZSi4HeoAxKDx48dTr1696O+//5YhAAChqVq1Kg0bNoxuuukmGQKxAiUAMYifz23cuFG8KZAjRw4ZCgBgXs6cOUXvfStXrkTiH6NQAhDjuJJgz549RXvcAABm8Ct9n3/+OdWvX1+GQCxCCUCMq1evnuhY6MMPP6S8efPKUACA7PLly0cDBgwQ7/Uj8Y99KAGII3v37qVXXnmFvv32WxkCAOCt5MeV+z766CMqV66cDIVYhwxAHPrtt9/o6aefFm8NAEB8u/baa0U/I40bN5YhEC/wCCAONW3alFasWCEu+kKFCslQAIgnV155JQ0dOpSWLFmCxD9OoQQgznFXw/369RNNel66dEmGAkCsSk5Opueff148DuRn/hC/kAEAgV8b5IwAt/IFALGpdevW9N///pcqVKggQyCeIQMAWcyaNYteeOEFWrVqlQwBALfj1/r4kR/e5wct1AGALJo3b05//vknjRgxArWBAVyO7/S//vpr0Q4IEn/QQwkA+HThwgWREXjzzTfR5TCAixQtWlSU5PXu3Vs88wcwggwABHT69Gn69NNP6YMPPqBjx47JUABwmgIFCtCTTz5Jr776KhUsWFCGAhhDBgBMO3nyJA0ePFi0Knj06FEZCgDRphJ+brs/NTVVhgL4hwwABA0ZAQBnQMIPViADACHjxwGffPKJeK3oyJEjMhQAwq1IkSLi+T73+InGvCBUyACAZefPn6fRo0fTe++9R3/99ZcMBQC7lSxZUvTu2adPHyT8YBkyAGCby5cv07Rp08SjgQULFshQALCqUqVK1KtXL3r88ccpKSlJhgJYgwwAhAVnAPr3709TpkwRGQMACF6zZs3E3T634Mc99gHYCRkACKtt27aJegJffPEFnTlzRoYCgC+5c+emu+66S7TX37BhQxkKYD9kACAiDh06JN4cGDRoEP3zzz8yFACUEiVKiCL+J554QnwGCDdkACCi0tLSaPLkyTRs2DD69ddfCacfxLv69evTY489Rg8++CDlyZNHhgKEHzIAEDWbNm2i4cOHi8cDhw8flqEAsY9r8Hfu3FlU7Ktdu7YMBYgsZAAg6rhuwJgxY0S/A/PmzUOpAMQkrsTHHfJ0796dOnbsSHnz5pXfAEQHMgDgKLt376ZRo0bR0KFDafv27TIUwL1KlSpFXbp0oUcffVS8zgfgFMgAgCPxq4MzZ86kb7/9VtQZOHXqlPwGwPm4id527dqJ5/q33norJSai53VwHmQAwPHOnTuXJTPAFQkBnCZHjhzivX1O9Dt06ED58+eX3wA4EzIA4CpcWXDcuHE0duxY+u233+jSpUvyG4DIy5kzJzVt2pTuueceuvvuu6lw4cLyGwDnQwYAXIs7IJo6darIDPzyyy8oGYCI4Dv9Ro0aUadOnejee+/FO/vgWsgAQEzgngl//PFH0fQwZwZOnDghvwGwrmDBgnT77bdT27ZtqU2bNuiIB2ICMgAQc/ixwKJFi0TpAGcINmzYIL8BMK9ixYrUvHlz0Q4/J/7cRC9ALEEGAGLexo0bacaMGaIi4e+//06nT5+W3wBk4kp7N998M912223UqlUrqlKlivwGIDYhAwBxhesJLFy4UGQG+FHBihUrUJEwTvGz/Hr16lGLFi1Eon/99dfjLh/iCjIAENe4fYHFixfT/PnzRRfG3BLh+fPn5bcQSzjBr1u3LjVu3JiaNGki3s9HrX2IZ8gAAGhwhoBLCDgzwBmDJUuW0PHjx+W34CYpKSmiO12usc8JPt/h58uXT34LAMgAAPjBLRJyHQLOCHCGYOnSpbRu3Tq6cOGCnAKcIFeuXFSzZs2MBJ//VqtWTbS/DwDGkAEACBIn/tyT4Z9//imG9evX0/Lly0W7BBB+XFmvatWqVKNGDdGVrhrQlS5AcJABALDJvn37RGaASwjU39WrV9PJkyflFBCMpKQkuuqqq8SdPSf26m/16tXRtj6ADZABAAgjvrz27NlDW7Zsoa1bt4q/6jMP8Z454AZ2+H177iWPB07w1WfuRQ9F+ADhgwwAQBQdPXpUZBB27twpukLmz/yXSxMOHDhABw8eFAPXRXATvkMvVqyYGLip3CuvvJLKlCkjhtKlS1O5cuXEZ66oBwDRgQwAgMNxOwUqI8AD1zXgpo/1w5kzZ0SJAveeePbsWdHgEbd7wG8xaDMQ6nstfn6enJwsx7wJODd3y+/Fc835vHnziiJ57uaWP3PCrYbU1NSMvyrRL168OIrpARyN6P8BLbal7/dcyT8AAAAASUVORK5CYII=';
          var doc = new jsPDF();
          doc.addImage(imgData, 'JPEG', 15, 5, 60, 50);
          doc.text(100, 25, 'Listado de Productos');
          var fecha = new Date();
          var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
          doc.autoTable(columnas,this.productos, {
          				theme : 'grid',
          				margin : {
          					top : 65
          				}
                });
          doc.save(now+'-productos.pdf');
      },
      exportarXls() {
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var productos = XLSX.utils.json_to_sheet(this.productos);
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        XLSX.utils.book_append_sheet(wb, productos, this.productos);
        XLSX.writeFile(wb,now+'-productos.xlsx');
      },
      exportarCsv() {
        var fecha = new Date();
        var now = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear()+':'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
        var productos = XLSX.utils.json_to_sheet(this.productos);
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        XLSX.utils.book_append_sheet(wb, productos, this.productos);
        XLSX.writeFile(wb,now+'-productos.csv');
      }


}
}
</script>

<style scoped>
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

.buttonProducto{
  background-color: #fec400;
}

.buttonProducto:hover{
  background-color: white;
}

</style>
