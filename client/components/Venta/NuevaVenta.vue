<template>
      <div>
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
                    </hr style="color:black;">
                  <div class="card-body">
                    <p v-if="errors.length">
                      <ul  class="list-group" v-for="error in errors">
                          <li class="alert alert-danger" style="width:780px; margin:0 auto;" role="alert">
                            {{ error }}
                          </li>
                          <br>
                      </ul>
                    </p>
                    <form style="margin: 0 auto;  margin-top:20px; width:780px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Cliente</span>
                                </div>
                                <v-select class="form-control" :options="cliente" label="dni"   v-model="venta.cliente">
                                  <template slot="option" slot-scope="option">
                                      {{ option.dni }}-{{ option.nombre }}-{{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <v-select  class="form-control" @change="onChange($event)"  :options="producto" label="modelo"  v-model="productoSelected">
                                  <template class="form-control" slot="option" slot-scope="option">
                                    {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="row">
                                <div class="col">
                                  <div class="input-group form-group">
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
                                <button class="btn" v-on:click="guardarLista()" style="background-color:#FFD700; width:120px;" title="Añadir al Carrito">
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
                                      <th scope="col">Modelo</th>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Precio</th>
                                      <th scope="col">Opciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="item in this.Lista">
                                      <th class="centered">{{item.producto.modelo}}</th>
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
                              <router-link to="/HomeVenta" tag="button" class="btn btn-info" style="color:black" title="Volver a Home Venta">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:3px;"></div>
                              <button v-on:click="nuevaVenta()" class="btn btn-success" style="color:black" title="Guardar Venta">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                          </div>
                  </div>
              </div>
            </div>
            <br>
       </div>
      </div>
</template>
<script>
import axios from 'axios'
import { alertWarningLimiteStock, alertWarningCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessVenta} from '../../assets/sweetAlert.js'
import Venta from '../../models/Venta';
import VentaProducto from '../../models/VentaProducto';
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
      productoSelected: '',
      clienteSelected: '',
      num: 0,
      id_venta: '',
      errors: []
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
      guardarLista(){
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
                  this.productoSelected = '';
                  this.num = '';
                  this.precio = '';
                  this.ventaProducto = new VentaProducto();
              }else {
                alert("Completar los Campos");
              }
      },
      incrementarCantidad(){
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
      onChange(event) {
             var actual = JSON.stringify(event);
             var viejo = JSON.stringify(this.productoSelected);
             if (viejo){
               if (actual == viejo){
                 this.num = 0;
                 this.precio = '';
               }
             }
         },
         nuevaVenta(){
              //Una Vez que le damos Guardar, Verificamos Si la Lista de Productos que
              //Vamos a Vender no es Vacia
              this.errors = [];
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
                                              'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                                              'Content-Type': 'application/json'
                                               }
                                          }).then(response=>{
                                            console.log(response.data);
                                            this.id_venta = response.data[0].id_venta
                                            this.postVentaProducto(this.id_venta)
                                          })

                                    }
                      },
          postVentaProducto(id){
            var _this = this;
            console.log("El id es:",id)
            axios.post('http://localhost:3000/ventaProducto',
                {
                id_venta: id,
                venta: this.Lista
                },
                {
                  headers:{
                  'Access-Control-Allow-Origin': 'http://localhost:3000/ventaProducto',
                  'Content-Type': 'application/json'
                   }
              }).then(function(response){
                  console.log(response);
                  if (response.data == "OK"){
                    alertSucessVenta();
                  }else {
                     if (response.data.length > 0) {
                       for (var i = 0; i < response.data.length ; i++) {
                              _this.errors.push(response.data[i].msg);
                        }
                     }else {
                         _this.errors.push(response.data.msg);
                     }
                  }
                })

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

.caja {
float:left;
width:500px;
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
  /*background-color: #FFD700  !important;*/
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

</style>
