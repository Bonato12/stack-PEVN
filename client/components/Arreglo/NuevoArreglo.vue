<template>
      <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-center">
              <div class="card animated fadeInDown">
                  <div class="card-header" style="background-color:#FFD700;">
                    <h2 style="text-align:center; color:black;">
                      <i class="fas fa-tools"></i>
                      <i class="fas fa-plus-circle"></i>
                       Nuevo Arreglo
                     </h2>
                  </div>
                    </hr style="color:black;">
                  <div class="card-body">
                    <p v-if="errors.length">
                      <ul  class="list-group" v-for="error in errors">
                          <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                            {{ error }}
                          </li>
                          <br>
                      </ul>
                    </p>
                    <form @submit.prevent="nuevoArreglo()" style="margin: 0 auto; margin-top:20px; width: 680px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Cliente</span>
                                </div>
                                <model-list-select class="form-control" :list="cliente"
                                                   v-model="arreglo.cliente"
                                                   option-value="id_cliente"
                                                   :custom-text="textCliente"
                                                   >
                                </model-list-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <model-list-select class="form-control" :list="producto"
                                                   v-model="arreglo.producto"
                                                   option-value="id_producto"
                                                   :custom-text="codeAndNameAndDesc"
                                                   >
                                </model-list-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Observacion</span>
                                </div>
                                <textarea required type="text" v-model="arreglo.observacion" class="form-control" placeholder="Ingrese Observacion"></textarea>
                            </div>
                            <br>
                            <div class="d-flex justify-content-end">
                                <router-link to="/HomeArreglo" tag="button" class="btn" title="Volver a Home Arreglo" >
                                    <i class="fas fa-arrow-left"></i>
                                        Volver
                                </router-link>
                                <div style="width:2px;"></div>
                                <button type="submit" class="btn" title="Guardar Arreglo">
                                  <i class="far fa-save fa-1x"></i>
                                        Guardar
                                </button>
                            </div>
                    </form>
                  </div>
              </div>
            </div>
       </div>
      </div>
</template>
<script>

import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'
import { alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertSucessArreglo } from '../../assets/sweetAlert.js'
import Arreglo from '../../models/Arreglo';

export default {
  name: 'NuevoArreglo',
  created(){
      this.getCliente();
      this.getProducto();
  },
  data () {
    return {
      cliente:[],
      producto:[],
      errors: [],
      arreglo : new Arreglo()
		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
      codeAndNameAndDesc (item) {
        return `${item.modelo} ${item.marca} ${item.precio}`
      },
      textCliente(item){
        return `${item.dni} ${item.nombre} ${item.apellido}`
      },
      getCliente(){
        axios.get('http://localhost:3000/cliente').then((response) =>{
          this.cliente = response.data;
        });
      },
      getProducto(){
        axios.get('http://localhost:3000/productoStock').then(response=>{
          this.producto = response.data;
        });
      },
      nuevoArreglo(){
          this.arreglo.condicion = 'EN ESPERA DE PRESUPUESTO';
          this.errors = [];
          if (!this.arreglo.cliente){
            this.errors.push('El Cliente no puede ser vacio');
          }
          if (!this.arreglo.producto){
            this.errors.push('El Producto no puede ser vacio');
          }
          if (!this.arreglo.observacion){
            this.errors.push('La Observacion no puede ser vacia');
          }
          if (!this.arreglo.condicion){
            this.errors.push('La Condicion No puede ser vacia');
          }
          var _this = this;
          if (this.errors.length == 0){
                axios.post('http://localhost:3000/arreglo',
                {
                arreglo: this.arreglo
                },
                { headers: {
                  'Content-Type': 'application/json',
                },
              }).then(function(response){
                  console.log(response);
                  if (response.data == "OK"){
                     alertSucessArreglo();
                    _this.arreglo = new Arreglo();
                  }else {
                     if (response.data.length > 0) {
                       for (var i = 0; i < response.data.length ; i++) {
                              _this.errors.push(response.data[i].msg);
                        }
                     }else {
                         _this.errors.push(response.data.msg);
                     }
                  }
                }).catch(error=>{
                  console.log(error);
                })
           }
      }
    },
    components: {
      ModelSelect,
      ModelListSelect
    }
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
}

.input-group-prepend span{
width: auto;
background-color: #FFD700;
border:0 !important;
}

.form-control {
    border: 0;
    box-shadow: none;
    background-color: white;
}

.btn{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black !important;
}

.btn:hover{
  background-color: white;
  color: black;
}

.input-group-text{
width: auto;
background-color: #FFD700;
border: none;
color:black;
}

input{
  background-color: white;
}

.search{
    min-width: 0 !important;
    width: 25px !important;
    border: none !important;
    margin-left: -3px !important;
    border-left: -3px solid !important;
}

</style>
