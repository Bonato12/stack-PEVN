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
                      Nueva Venta
                    </h2>
                </div>
                <hr style="color:black;">
                <div class="card-body">
                  <p v-if="errors.length">
                    <ul  class="list-group" v-for="error in errors">
                        <li class="alert alert-danger" style="width:780px; margin:0 auto;" role="alert">
                          {{ error }}
                        </li>
                        <br>
                    </ul>
                  </p>
                  <form  @submit.prevent="guardarLista()" style="margin: 0 auto;  margin-top:20px; width:780px;">
                          <div class="input-group form-group">
                              <div class="input-group-prepend" style="border-right: 5px solid white">
                                  <span class="input-group-text">Cliente</span>
                              </div>
                              <model-list-select class="form-control" :list="cliente"
                                                  v-model="venta.cliente"
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
                                                  v-model="productoSelected"
                                                  option-value="id_producto"
                                                  :custom-text="textProducto"
                                                  :class="{ 'is-invalid': submitted && $v.productoSelected.$error }"
                                                  >
                              </model-list-select>
                              <div v-if="submitted && !$v.productoSelected.required.$error" class="invalid-feedback">
                                  <span v-if="!$v.productoSelected.required">Producto es requerido</span>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col">
                                <div class="input-group form-group" :class="{ 'is-invalid': submitted && $v.num.$error }">
                                  <b-input-group prepend="Cantidad">
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
                                  <div v-if="submitted && !$v.num.between.$error" class="invalid-feedback">
                                      <span v-if="!$v.num.between">Cantidad tiene que ser mayor o igual que 1</span>
                                  </div>
                                </div>
                              </div>
                              <div class="col">
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Precio</span>
                                    </div>
                                    <input  type="number" min="0"  v-model="precio"  class="form-control" readonly>
                                </div>
                              </div>
                          </div>
                          <div>
                              <button class="btn" type="submit"  style="background-color:#FFD700; width:120px;" title="Añadir al Carrito">
                                  <i class="fas fa-cart-plus"></i>
                                  Añadir
                              </button>
                          </div>
                  </form>
                  <br>
                    <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin:0 auto; width:780px;">
                              <div>
                                  <div class="card-header" style="background-color:#FFD700; ">
                                    <h3 style="color:black;">
                                      <i class="fas fa-shopping-cart"></i>
                                      <i class="fas fa-coins"></i>
                                      Carrito de Venta</h3>
                                  </div>
                              </div>
                              <table class="table">
                                <thead>
                                  <tr style="background-color:white; border-radius:5px;">
                                    <th scope="col">#</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Opciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item,key) in this.Lista">
                                    <td>{{key + 1}}</td>
                                    <td>{{item.producto.modelo}}</td>
                                    <td>{{item.cantidad}}</td>
                                    <td>{{item.precio}}</td>
                                    <td class="centered">
                                        <button v-on:click="borrar(item)" class="btn btn-danger" title="Eliminar Producto del carrito">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div v-if="this.precioTotal" style="text-align:right; color:white;">
                                <h3>
                                  <i class="fas fa-coins"></i>
                                  <i class="fas fa-money-bill-alt"></i>
                                  Total $: {{this.precioTotal}} </h3>
                              </div>
                        </div>
                        <br>
                        <div class="d-flex justify-content-end" style="margin:0 auto; width:780px;">
                            <router-link to="/HomeVenta" tag="button" class="btn btn-volver" title="Volver a Home Venta">
                                <i class="fas fa-arrow-left"></i>
                                    Volver
                            </router-link>
                            <div style="width:3px;"></div>
                            <button v-on:click="nuevaVenta()" class="btn btn-guardar" title="Guardar Venta">
                              <i class="far fa-save fa-1x"></i>
                                    Guardar
                            </button>
                        </div>
                        <br>
                </div>
            </div>
          </div>
          <br>
          <transition v-if="modalOpen" class="animation fadeInLeft" name="modal">
            <div class="modal-mask">
              <button class="modal-default-button" @click="hide()">
                      <i class="far fa-times-circle"></i>
              </button>
              <div class="modal-wrapper">
                  <ModalCliente v-if="modalOpen" ></ModalCliente>
              </div>
            </div>
          </transition>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'
import { alertWarningLimiteStock} from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSuccess } from '../../assets/sweetAlert.js'
import Venta from '../../models/Venta';
import VentaProducto from '../../models/VentaProducto';
import { required,between,minLength,maxLength, sameAs } from "vuelidate/lib/validators";


export default {
  name: 'NuevaVenta',
  created(){
      this.getCliente();
      this.getProducto();
  },
  data () {
    return {
      venta: new Venta(),
      Lista: [],
      ventaProducto: new VentaProducto(),
      cliente: [],
      producto: [],
      precio: '',
      precioTotal: 0,
      productoSelected: {},
      num: '',
      id_venta: '',
      errors: [],
      modalOpen: false,
      submitted: false,
      }

  },
  validations: {
          productoSelected:{
            required
          },
          num:{
            required,
            between:between(1,100000)
          }
    },

  methods: {
     
      textProducto(item) {
        return `${item.modelo} - ${item.marca} - ${item.precio}`
      },
      textCliente(item){
        return `${item.dni} - ${item.nombre} - ${item.apellido}`
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
      guardarLista(){
              this.submitted = true;
              this.$v.$touch();
              var _this = this;
              if (this.$v.$invalid) {
                  return;
              }
              console.log(JSON.stringify(this.productoSelected));
              //Funcion Que Guarda Los Productos Seleccionados a vender en una Lista Dinamica
              if(this.productoSelected && this.precio > 0 && this.num > 0){
                  this.precioTotal = parseInt(this.precioTotal) + parseInt(this.precio);
                  this.ventaProducto.producto = this.productoSelected;
                  this.ventaProducto.cantidad = this.num;
                  this.ventaProducto.precio = this.precio;
                  this.Lista.push(this.ventaProducto);
                  //Una Vez añadido al carrito Actializamos el Stock de la Lista Productos
                  var index = this.producto.indexOf(this.productoSelected);
                  if (index > -1) {
                    this.producto[index].stock = this.producto[index].stock - this.num;
                  }

                  //Una Vez Añadido al Carrito, inicializamos en Vacio los Inputs
                  this.productoSelected = {};
                  this.num = '';
                  this.precio = '';
                  this.ventaProducto = new VentaProducto();
                  this.submitted = false;

              }else {
                alert("Completar los Campos");
              }
      },
      incrementarCantidad(){
          console.log(this.productoSelected);
          //Funcion Que al icrementar la cantidad, multiplica la cantidad por el precio del producto seleccionado
          if(this.productoSelected.precio){
              if (this.num ==  this.productoSelected.stock){
                  alertWarningLimiteStock();
              }else{
                  this.num++;
                  this.precio = parseInt(this.productoSelected.precio) * parseInt(this.num)
                }
          }
      },
      decrementarCantidad() {
        //Funcion Que al icrementar la cantidad, multiplica la cantidad por el precio del producto seleccionado
        if(this.productoSelected){
            if (this.num == 0) {
              alertWarningLimiteOne();
            } else {
              this.num--;
              this.precio = parseInt(this.productoSelected.precio) * parseInt(this.num)
            }
        }
      },
      borrar(producto){
        //Funcion Que Elimina un Producto determinado de la Lista de Venta y actualiza el stock
        var indice = this.producto.indexOf(producto.producto);
        this.producto[indice].stock = this.producto[indice].stock + producto.cantidad;
        console.log(indice);
        //Resta al Precio Total el precio del Producto eliminado de la lista.
        var index = this.Lista.indexOf(producto);
        this.precioTotal = this.precioTotal - this.Lista[index].precio
        if (index > -1) {
            this.Lista.splice(index, 1);
        }
      },
      nuevaVenta(){
              //Una Vez que le damos Guardar, Verificamos Si la Lista de Productos que
              //Vamos a Vender no es Vacia
              this.errors = [];
              var _this = this;
              if (this.Lista.length > 0){
                  if (!this.venta.cliente){
                      this.errors.push('El Cliente no puede ser vacio');
                  }
                  if (!this.precioTotal){
                      this.errors.push('El PrecioTotal no puede ser vacio');
                  }
              }else {
                  this.errors.push('Carrito de venta Vacio');
              }

              if (this.errors.length == 0){
                  //Asignamos a this.venta total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a vender
                  this.venta.total = this.precioTotal;
                  axios.post('http://localhost:3000/venta',
                      {
                        venta: this.venta
                      },
                      {
                      headers:{
                        'Content-Type': 'application/json'
                      }
                  }).then(response=>{
                          console.log(response.data);
                          this.id_venta = response.data[0].id_venta
                          axios.post('http://localhost:3000/ventaProducto',
                              {
                              id_venta: this.id_venta,
                              venta: this.Lista
                              },
                              {
                                headers:{
                                'Content-Type': 'application/json'
                                 }
                              }).then(function(response){
                                if (response.data == "OK"){
                                    alertSuccess();
                                    _this.venta = new Venta();
                                    _this.Lista = [];
                                }else {
                                    _this.errors.push(response.data.msg);
                                }
                              }).catch(error =>{
                                console.log(error);
                              })
                      }).catch(error=>{
                        console.log(error);
                      })
              }
          },

      },
      components: {
        ModelSelect,
        ModelListSelect,
    },
    watch: {
        productoSelected:{
          handler () {
            if (this.productoSelected.stock > 0){
                this.num = 1;
                this.precio = this.productoSelected.precio;
            }else{
                 this.num = 0;
                 this.precio = 0;
            }
          },
          deep: true
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



.btn-guardar{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700  !important;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black;
}

.btn-volver{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #5bc0de;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
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
