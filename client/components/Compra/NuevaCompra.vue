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
                    <form style="margin-left: 30px; margin-top: 15px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Proveedor</span>
                                </div>
                                <v-select  class="form-control" :options="proveedor" label="dni" id="proveedorSelect" v-model="proveedorSelected">
                                  <template slot="option" slot-scope="option">
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <v-select  class="form-control" @change="onChange($event)"  :options="producto" label="modelo"  v-model="productoSelected">
                                  <template class="form-control" slot="option" slot-scope="option">
                                    {{ option.marca }} {{ option.modelo }}
                                  </template>
                                </v-select>
                            </div>

                        <div class="row">
                          <div class="col-">
                            <b-input-group prepend="Cantidad" style="padding-left:15px;">
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
                          <div class="col-">
                            <div class="input-group form-group" style="padding-left:20px;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Precio Unitario</span>
                                </div>
                                <input  type="number" min="0" @change="onChangePrecioUnitario()"  v-model="precioUnitario"  class="form-control">
                            </div>
                          </div>
                          <div class="col-">
                            <div class="input-group form-group" style="padding-left:10px;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Precio Total</span>
                                </div>
                                <input  type="number" min="0"  v-model="precioTotalP"  class="form-control">
                            </div>
                          </div>
                        </div>
                    </form>
                    <div class="col-" style="padding-left:30px;">
                      <button class="btn" v-on:click="guardarLista()" style="background-color:#FFD700; width:100px; border-radius:20px;" title="Añadir al Carrito">
                          <i class="fas fa-cart-plus"></i>
                      </button>
                    </div>
                    <br>
                      <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin: 0 auto; width:1000px;">
                                <i class="fas fa-shopping-cart fa-3x"></i>
                                <br>
                                <table class="table" style="background-color:white;">
                                  <thead>
                                    <tr >
                                      <th scope="col">Modelo</th>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Precio Unitario</th>
                                      <th scope="col">Precio Total</th>
                                      <th scope="col">Opciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="item in this.Lista">
                                      <th class="centered">{{item.producto.modelo}}</th>
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
                          </div>
                          <br>
                          <div v-if="this.precioTotal" style="text-align:right; margin-right:50px; color:white;">
                            <h3>Total $: {{this.precioTotal}} </h3>
                          </div>
                          <br>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeCompra" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="nuevaCompra()" class="botones" style="width:115px; background-color:#fec400;">
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
</template>
<script>

import axios from 'axios'
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
      productoSelected: '',
      proveedorSelected: '',
      num: '',
      id_compra: ''

		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
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
            //Funcion Que Guarda Los Productos Seleccionados a comprar en una Lista Dinamica
            if(this.productoSelected && this.precioUnitario && this.precioTotalP > 0 && this.num > 0){
                this.precioTotal = parseInt(this.precioTotal) + parseInt(this.precioTotalP);
                this.compraProducto.producto = this.productoSelected;
                this.compraProducto.cantidad = this.num;
                this.compraProducto.precioUnitario = this.precioUnitario;
                this.compraProducto.precioTotal = this.precioTotalP;
                this.Lista.push(this.compraProducto);
                //Una Vez añadido al carrito Actializamos el Stock de la Lista Productos
                var index = this.producto.indexOf(this.productoSelected);
                if (index > -1) {
                  this.producto[index].stock = this.producto[index].stock - this.num;
                }
                //Una Vez Añadido al Carrito, inicializamos en Vacio los Inputs
                this.productoSelected = '';
                this.num = '';
                this.precioTotalP = '';
                this.compraProducto = new CompraProducto();

            }else {
              alert("Completar los Campos");
            }
    },

    incrementarCantidad(){
      //Funcion Que al icrementar la cantidad, multiplica la cantidad por el precio del producto seleccionado
          if(this.productoSelected.precio){
                  this.num++;
                  this.precioTotalP = parseInt(this.precioUnitario) * parseInt(this.num)
          }
    },
    decrementarCantidad() {
      //Funcion Que al icrementar la cantidad, multiplica la cantidad por el precio del producto seleccionado
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
      //Funcion Que Elimina un Producto determinado de la Lista de Compra y actualiza el stock
      var indice = this.producto.indexOf(producto.producto);
      this.producto[indice].stock = this.producto[indice].stock + producto.cantidad;
      console.log(indice);
      //Resta al Precio Total el precio del Producto eliminado de la lista.
      var index = this.Lista.indexOf(producto);
      this.precioTotal = this.precioTotal - this.Lista[index].precioTotal
      if (index > -1) {
          this.Lista.splice(index, 1);
      }
    },

    onChange(event) {
           var actual = JSON.stringify(event);
           var viejo = JSON.stringify(this.productoSelected);
           if (viejo){
             if (actual == viejo){
               this.num = 0;
               this.precioTotalP = '';
               this.precioUnitario = '';
               this.precioUnitario = this.productoSelected.precio;
             }
           }
       },

       onChangePrecioUnitario(){
          this.num = 0;
          this.precioTotalP = 0;

       },

    nuevaCompra(){
                  //Una Vez que le damos Guardar, Verificamos Si la Lista de Productos que
                  //Vamos a Comprar no es Vacia
                  if (this.Lista.length > 0 ){
                      //Asignamos el proveedor Selecionado a this.compra.proveedor
                      //Asignamos a this.compra total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a comprar
                      this.compra.proveedor = this.proveedorSelected;
                      this.compra.total = this.precioTotal;
                      axios.post('http://localhost:3000/compra',
                          {
                          compra: this.compra
                          },
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/compra',
                            'Access-Control-Allow-Methods': 'POST',
                            'Content-Type': 'application/json'
                             }
                        }).then(response=>{
                          console.log(response.data[0]);
                          this.id_compra = response.data[0].id_compra
                          this.postCompraProducto(this.id_compra)
                        }).then();
                          alertSucessCompra();
                  }else {
                     alertWarningCompletarCampos()
                  }

    },
    postCompraProducto(id){
      console.log("El id es:",id)
      axios.post('http://localhost:3000/compraProducto',
          {
          id_compra: id,
          compra: this.Lista
          },
          {
            headers:{
            'Access-Control-Allow-Origin': 'http://localhost:3000/compraProducto',
            'Content-Type': 'application/json'
             }
        }).then(response=>{
          console.log(response.data)
        });

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
background-color: rgb(70,90,101);
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
color: black;
border:0 !important;
}
.form-control {
    border: 0;
    box-shadow: none;
    background-color: white;
}
.caja {
float:left;
width:300px;
}
.botones{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  width:100px;
  height:50px;
  margin-top:-10px;
  border:none;
  color:black;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
}
.input-group-text{
width: auto;
background-color: #FFD700;
color: black;
border: none;
}

.input-group{
  width: 300px;
}

input{
  background-color: white;
}

</style>
