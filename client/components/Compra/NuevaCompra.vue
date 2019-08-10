<template>
      <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-center">
              <div class="card animated fadeInDown">
                  <div class="card-header" style="background-color:#FFD700;">
                    <h2 style="text-align:center; color:black;">
                      <i class="fas fa-cart-plus"></i>
                      <i class="fas fa-plus-circle"></i>
                       Nueva Compra
                     </h2>
                  </div>
                  <div class="card-body">
                    <p v-if="errors.length">
                      <ul class="list-group" v-for="error in errors">
                          <li class="alert alert-danger" style="width:780px; margin:0 auto;" role="alert">
                            {{ error }}
                          </li>
                          <br>
                      </ul>
                    </p>
                    <form  @submit.prevent="guardarLista()" style="margin: 0 auto; margin-top:20px; width:780px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Proveedor</span>
                                </div>
                                <model-list-select class="form-control" :list="proveedor"
                                                   v-model="proveedorSelected"
                                                   option-value="id_proveedor"
                                                   :custom-text="textCliente"
                                                  >
                                </model-list-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <model-list-select class="form-control" :list="producto"
                                                   v-model="productoSelected"
                                                   option-value="id_producto"
                                                   :custom-text="textProducto"
                                                   >
                                </model-list-select>
                            </div>
                            <div>
                              <div class="row">
                                <div class="col">
                                  <div class="input-group form-group">
                                    <b-input-group  prepend="Cantidad">
                                      <b-form-input v-model="num" min="0" readonly></b-form-input>
                                      <b-input-group-append>
                                        <b-button variant="info" @click="decrementarCantidad()">
                                              <i class="fas fa-minus"></i>
                                        </b-button>
                                        <b-button variant="info" @click="incrementarCantidad()">
                                              <i class="fas fa-plus"></i>
                                        </b-button>
                                      </b-input-group-append>
                                    </b-input-group>
                                  </div>
                                </div>
                                <div class="col">
                                  <div class="input-group form-group">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text">Precio</span>
                                      </div>
                                      <input  type="number" min="0" v-model="precioUnitario"  class="form-control">
                                  </div>
                                </div>
                                <div class="col">
                                  <div class="input-group form-group">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text">Precio Total</span>
                                      </div>
                                      <input  type="number" min="0"  v-model="precioTotalP"  class="form-control" readonly>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <button class="btn" type="submit"  style="float:left; background-color:#FFD700; width:120px; border-radius:5px;" title="Añadir al Carrito">
                                  <i class="fas fa-cart-plus"></i>
                                  Añadir
                              </button>
                            </div>
                    </form>
                    <br>
                    <br>
                      <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin:0 auto; width:780px;">
                                  <div>
                                      <div class="card-header" style="background-color:#FFD700; ">
                                        <h3 style="color:black;">
                                          <i class="fas fa-shopping-cart"></i>
                                          <i class="fas fa-coins"></i>
                                          Carrito de Compra</h3>
                                      </div>
                                  </div>
                                <table class="table" style="background-color:white;">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Modelo</th>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Precio Unitario</th>
                                      <th scope="col">Precio Total</th>
                                      <th scope="col">Opciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item,key) in this.Lista">
                                      <td>{{ key + 1 }}</td>
                                      <td class="centered">{{item.producto.modelo}}</td>
                                      <td>{{item.cantidad}}</td>
                                      <td>{{item.precioUnitario}}</td>
                                      <td>{{item.precioTotal}}</td>
                                      <td>
                                          <button v-on:click="borrar(item)" class="btn btn-danger">
                                              <i class="fas fa-trash-alt"></i>
                                          </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div style="margin-top:-17px;">
                                  <div class="card-header" style="background-color:#04B45F; border-radius:none; color:black; text-align:right; " v-if="this.precioTotal">
                                    <h3>
                                      <i class="fas fa-coins"></i>
                                      <i class="fas fa-money-bill-alt"></i>
                                      Total $: {{this.precioTotal}} </h3>
                                  </div>
                                </div>
                          </div>
                          <br>
                          <div class="d-flex justify-content-end" style="margin:0 auto; width:780px;">
                              <router-link to="/HomeCompra" tag="button" class="btn" style="color:black; background-color:#FFD700;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:3px;"></div>
                              <button v-on:click="nuevaCompra()" class="btn" style="color:black; background-color:#FFD700;">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                          </div>
                  </div>
              </div>
            </div>
       </div>
       <br>
      </div>
</template>
<script>

import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'
import { alertWarningLimiteStock } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessCompra,alertCompletarCampos} from '../../assets/sweetAlert.js'
import Compra from '../../models/Compra';
import CompraProducto from '../../models/CompraProducto';

export default {
  name: 'NuevaCompra',
  created(){
      this.getProveedor();
      this.getProducto();
  },
  data () {
    return {
      compra: new Compra(),
      Lista: [],
      compraProducto: new CompraProducto(),
      proveedor: [],
      producto: [],
      precioUnitario: '',
      precioTotalP: '',
      precio: '',
      precioTotal: 0,
      productoSelected: {},
      proveedorSelected: {},
      num: '',
      id_compra: '',
      errors: []
		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    textProducto (item) {
      return `${item.modelo} - ${item.marca} - ${item.precio}`
    },
    textCliente(item){
      return `${item.dni} - ${item.nombre} - ${item.apellido}`
    },
    getProveedor(){
      axios.get('http://localhost:3000/proveedor').then((response) =>{
        this.proveedor = response.data;
      });
    },
    getProducto(){
      axios.get('http://localhost:3000/producto').then(response=>{
        this.producto = response.data;
      });
    },
    guardarLista(){
            if(this.productoSelected && this.precioUnitario && this.precioTotalP > 0 && this.num > 0){
                this.precioTotal = parseInt(this.precioTotal) + parseInt(this.precioTotalP);
                this.compraProducto.producto = this.productoSelected;
                this.compraProducto.cantidad = this.num;
                this.compraProducto.precioUnitario = this.precioUnitario;
                this.compraProducto.precioTotal = this.precioTotalP;
                this.Lista.push(this.compraProducto);
                var index = this.producto.indexOf(this.productoSelected);
                if (index > -1) {
                  this.producto[index].stock = this.producto[index].stock - this.num;
                }
                this.productoSelected = {};
                this.num = '';
                this.precioTotalP = '';
                this.compraProducto = new CompraProducto();
                console.log(this.Lista);
            }else {
              alert("Completar los Campos");
            }
    },

    incrementarCantidad(){
          if(this.productoSelected.precio){
                  this.num++;
                  this.precioTotalP = parseInt(this.precioUnitario) * parseInt(this.num)
          }
    },
    decrementarCantidad() {
        if(this.productoSelected){
            if (this.num == 1) {
                alertWarningLimiteOne();
            } else {
                this.num--;
                this.precioTotalP = parseInt(this.precioUnitario) * parseInt(this.num)
            }
        }
    },

    borrar(producto){
        var indice = this.producto.indexOf(producto.producto);
        this.producto[indice].stock = this.producto[indice].stock + producto.cantidad;
        console.log(indice);
        var index = this.Lista.indexOf(producto);
        this.precioTotal = this.precioTotal - this.Lista[index].precioTotal
        if (index > -1) {
            this.Lista.splice(index, 1);
        }
    },

    nuevaCompra(){
                  this.errors = [];
                  if (this.Lista.length > 0){
                      if (!this.proveedorSelected){
                          this.errors.push('El Proveedor no puede ser vacio');
                      }
                      if (!this.precioTotal){
                          this.errors.push('El PrecioTotal no puede ser vacio');
                      }
                  }else {
                      this.errors.push('Carrito de venta Vacio');
                  }
                  if (this.errors.length == 0){
                      this.compra.proveedor = this.proveedorSelected;
                      this.compra.total = this.precioTotal;
                      axios.post('http://localhost:3000/compra',
                          {
                          compra: this.compra
                          }).then(response=>{
                                  console.log(response.data);
                                  this.id_compra = response.data[0].id_compra
                                  axios.post('http://localhost:3000/compraProducto',
                                      {
                                        id_compra: this.id_compra,
                                        compra: this.Lista
                                      })
                                  .then(response=>{
                                  console.log(response.data);
                                  if (response.data == "OK"){
                                    alertSucessCompra();
                                    this.compra = new Compra();
                                    this.Lista = []
                                  }else {
                                    alert("ERROR");
                                  }
                            }).catch(error=>{
                              console.log(error)
                            })
                        })

                  }
    }
  },
  watch: {
      productoSelected:{
        handler () {
          this.num = 1;
          this.precioTotalP = '';
          this.precioUnitario = '';
          this.precioUnitario = this.productoSelected.precio;
        },
        deep: true
      },
      precioUnitario:{
        handler () {
            this.precioTotalP = parseInt(this.precioUnitario) * parseInt(this.num)
        },
        deep: true
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
background-color:  #2A363B;
border: 1px solid;
border-radius: 5px;
margin:0 auto;
}

.input-group-prepend span{
width: auto;
background-color: #FFD700;
color: black;
border: none;
}

b-input-group{
  width: 150px;
}

.form-control {
    border: 0;
    box-shadow: none;
    background-color: white;
}

.btn{
  cursor:pointer;
  display:inline-block;
  width:auto;
  height:auto;
  border:none;
  /*background-color: #FFD700  !important;*/
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
}

.btn:hover{
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
  /*border-radius: 5px !important;*/
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
