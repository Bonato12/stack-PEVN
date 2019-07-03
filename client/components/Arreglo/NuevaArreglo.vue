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
                    <form style="margin-left: 30px; margin-top:30px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Cliente</span>
                                </div>
                                <v-select  class="form-control" :options="cliente" label="dni" id="clienteSelect"  v-model="arreglo.cliente">
                                  <template slot="option" slot-scope="option">
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <v-select  class="form-control"  :options="producto" label="modelo"  v-model="arreglo.producto">
                                  <template class="form-control" slot="option" slot-scope="option">
                                    {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Observacion</span>
                                </div>
                                <textarea required type="text" v-model="arreglo.observacion" class="form-control" placeholder="Ingrese Observacion"></textarea>

                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Condicion</span>
                                </div>
                                <select required class="form-control" v-model="arreglo.condicion" placeholder="Elige una Condicion">
                                  <option   disabled selected>Elige un Tipo Producto</option>
                                  <option  v-for="item in condicion">{{ item.name }}</option>
                               </select>
                            </div>
                    </form>
                    <br>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeArreglo" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="nuevoArreglo()" class="botones" style="width:115px; background-color:#fec400;">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                          </div>
                  </div>
              </div>
            </div>
       </div>
      </div>
</template>
<script>

import axios from 'axios'
import { alertWarningLimiteStock,alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import Arreglo from '../../models/Arreglo';

export default {
  name: 'NuevoArreglo',
  created(){
      this.getCliente();
      this.getProducto();
  },
  data () {
    return {
      cliente:'',
      producto:'',
      arreglo : new Arreglo(),
      condicion : [{name:"EN ESPERA DE PRESUPUESTO"},
                       {name:"EN EVALUACION DE PRESUPUESTO"},
                       {name:"PRESUPUESTO CANCELADO"},
                       {name:"PRESUPUESTO ACEPTADO"}]
		}



  },
  computed:{

  },
  mounted(){

  },
  methods: {
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
          console.log(this.arreglo);
          if (this.arreglo.cliente && this.arreglo.producto && this.arreglo.observacion && this.arreglo.condicion){
              axios.post('http://localhost:3000/arreglo',
              {
              arreglo: this.arreglo
              },
              { headers: {
                'Content-Type': 'application/json',
              },
            }).then(this.arreglo = new Arreglo())
         }
      }
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
background-color: #696969;
border: 1px solid;
border-radius: 5px;
}



.venta_btn:hover{
color: black;
background-color: white;
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



.botones{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:100px;
  height:50px;
  margin-top:-10px;
  border:none;
  color:black;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 10px;
}



.input-group-text{
width: auto;
background-color: #FFD700;
border: none;


}

input{
  background-color: white;
}

</style>
