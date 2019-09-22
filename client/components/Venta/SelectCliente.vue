<template>
  <div>
    <div class="input-group form-group">
        <div class="input-group-prepend" style="border-right: 5px solid white">
            <span class="input-group-text">Cliente</span>
        </div>
        <model-list-select class="form-control" :list="cliente"
                            option-value="id_cliente"
                            :custom-text="textCliente"
                            >
        </model-list-select>
    </div>                       
  </div>
</template>
<script>
import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'

export default {
  created(){
      this.getCliente();
  },
  data () {
    return {
      cliente: [],
    }

  },
  
  methods: {

      textCliente(item){
        return `${item.dni} - ${item.nombre} - ${item.apellido}`
      },
      getCliente(){
        axios.get('http://localhost:3000/cliente').then((response) =>{
          this.cliente = response.data;
        });
      }
   },  
     
    components: {
        ModelSelect,
        ModelListSelect,
    },
   
}
</script>
<style scoped>


h1, h2 {
  font-weight: normal;
}
.card{
height: auto;
margin-bottom: auto;
width: 1650px;
background-color: #2A363B;
border: 1px solid;
border-radius: 5px;
margin:0 auto;
}

.input-group-prepend span{
width: auto;
background-color: #FFD700;
color: black;
border:0 !important;
}

.form-control {
    border: 0;
    box-shadow: none;
    background-color: white;
}

.btns{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black !important;
}

.btns:hover{
     background-color: white  !important;
     color: black;
}

.input-group-text{
width: auto;
background-color: #FFD700;
color: black;
border: none;
}
input{
  background-color: white;
}

.table{
  border-radius: 5px !important;
  background-color:white;
}

.table td,th {
   text-align: center;
}

.search{
    min-width: 0 !important;
    width: 25px !important;
    border: none !important;
    margin-left: -3px !important;
    border-left: -3px solid !important;
}

</style>
