<template>
  <div id="NuevaVenta">
    <div class="container">
          <div style="float:center;">
          			<div class="card-header">
                  <h3 style="text-align:center; color:white;"> Nueva Venta </h3>
          			</div>
          			<div class="animated fadeInDown" id="card" style="float:left;  width:1200px;">
                      <br>
                      <form style="margin-left: 50px; margin-top:30px;">
                              <div class="caja">
                                <span class="input-group-text">Cliente</span>
                                <v-select :options="cliente" label="dni" id="clienteSelect"  v-model="clienteSelected" style="width:290px; background-color: white;">
                                  <template slot="option" slot-scope="option">
                                      <span class="fa" :class="option.icon"></span>
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                              </div>
                              <div class="caja">
                                <span class="input-group-text">Producto</span>
                                  <v-select  :options="producto" label="modelo"  v-model="productoSelected" style="width:290px; background-color: white;">
                                    <template slot="option" slot-scope="option">
                                        <span class="fa" :class="option.icon"></span>
                                      {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                    </template>
                                  </v-select>
                              </div>
                              <div class="caja" style="width:230px;" >
                                  <div>
                                    <span class="input-group-text">Cantidad</span>
                                    <b-input-group>
                                      <b-form-input class="form-control form-control-lg" type="number" :disabled="!productoSelected" min="0"  v-model="num" style="width:145px; height:57px; background-color:white;"/>
                                      <b-input-group-append>
                                        <b-button  variant="info" style="height:57px;" @click="decrementarCantidad()">
                                            <i class="fas fa-minus"></i>
                                        </b-button>
                                        <b-button  variant="info"   @click="incrementarCantidad()" style="height:57px;">
                                            <i class="fas fa-plus"></i>
                                        </b-button>
                                      </b-input-group-append>
                                    </b-input-group>
                                 </div>
                              </div>
                              <div class="caja">
                                  <div>
                                    <span class="input-group-text">Precio</span>
                                  </div>
                                  <input required  type="number" min="0"  v-model="precio" :disabled="!productoSelected"  class="form-control form-control-lg" style="background-color:white; height:57px; width:250px;">
                              </div>
                      </form>
                        <br>
                      <div>
                          <br>
                          <button class="btn btn-success" v-on:click="guardarLista()" style="margin-left:52px;" title="Añadir al Carrito">
                              <i class="fas fa-cart-plus"></i>
                          </button>
                          <button class="btn btn-success" v-on:click="guardarEditar()" style="margin-left:52px;" title="Añadir al Carrito">
                              <i class="fas fa-cart-plus"></i>
                          </button>
                      </div>
                      <br>
                        <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin: 0 auto; width:1100px;">
                                  <table class="centered" style="background-color:white;">
                                    <thead>
                                      <tr >
                                        <th scope="col">Modelo</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Opciones</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="item in this.Lista">
                                        <th class="centered">{{item.modelo}}</th>
                                        <td>{{item.cantidad}}</td>
                                        <td>{{item.precio}}</td>
                                        <td>
                                            <button v-on:click="borrar(item)" class="btn btn-danger">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                            <button v-on:click="EditarProducto(item)" class="btn btn-danger">
                                                  <i class="fas fa-edit fa-1x"></i>
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
                              <router-link to="/HomeVenta" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="nuevaVenta()" class="botones" style="width:115px; background-color:#fec400;">
                                <i class="far fa-save fa-1x"></i>
                                      Guardar
                              </button>
                            </div>
                            <br>
                          </div>
                  </div>
        		</div>
      </div>
</template>
<script>

import axios from 'axios'
import { alertWarningLimiteStock,alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessVenta} from '../../assets/sweetAlert.js'
import Venta from '../../models/Venta';
import VentaProducto from '../../models/VentaProducto';

export default {
  name: 'NuevaVenta',
  created(){
      this.getCliente();
      this.getProducto();
      this.rellenarVenta();
  },
  data () {
    return {
      idv: this.$route.params.id,
      venta: new Venta(),
      Lista: [],
      ventaProducto: new VentaProducto(),
      cliente: [],
      producto: [],
      precio: '',
      precioTotal: 0,
      productoSelected: '',
      clienteSelected: '',
      num: '',
      index: ''

		}
  },
  computed:{

  },
  mounted(){

  },
  methods: {
    rellenarVenta(){
       axios.get('http://localhost:3000/venta/'+this.idv).then((response) =>{
         console.log(response.data);
         this.Lista = response.data;
         console.log(this.Lista)
       });
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
          if (this.num == 1) {
            alertWarningLimiteOne();
          } else {
            this.num--;
            this.precio = parseInt(this.productoSelected.precio) * parseInt(this.num)
          }
      }
    },
    borrar(producto){
      //Funcion Que Elimina un Producto determinado de la Lista de Venta y actualiza el stock
      //var indice = this.producto.indexOf(producto.producto);
      //this.producto[indice].stock = this.producto[indice].stock + producto.cantidad;
      //console.log(indice);
      //Resta al Precio Total el precio del Producto eliminado de la lista.
      var index = this.Lista.indexOf(producto);
      //this.precioTotal = this.precioTotal - this.Lista[index].precio
      if (index > -1) {
          this.Lista.splice(index, 1);
      }
    },
    EditarProducto(item){
      //console.log(item.cantidad);
      this.num = item.cantidad;
      this.precio = item.precio
      this.index = this.Lista.indexOf(item);
      this.productoSelected = this.producto[this.index]
      console.log(this.Lista[this.index].precio)
    },
    guardarEditar(){
        this.Lista[this.index].cantidad = this.num;
        this.Lista[this.index].precio = this.precio;
        console.log(this.Lista[this.index]);
    },
    nuevaVenta(){
                  //Una Vez que le damos Guardar, Verificamos Si la Lista de Productos que
                  //Vamos a Vender no es Vacia
                  if (this.Lista.length > 0 ){
                      //Asignamos el Cliente Selecionado a this.venta.clientes
                      //Asignamos a this.venta total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a vender
                      this.venta.cliente = this.clienteSelected;
                      this.venta.total = this.precioTotal;
                      axios.put('http://localhost:3000/venta/'+this.idv,
                          {
                          lista: this.Lista,
                          venta: this.venta
                          },
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/venta/'+this.idv,
                            'Content-Type': 'application/json'
                             }
                        })
                          alertSucessVenta();
                          this.ventaProducto = new VentaProducto();

                  }else {
                    alert("Completar Los Campos");
                  }

    }
  }
}

</script>

<style scoped>


h1, h2 {
  font-weight: normal;
}


#card{

background-color: rgba(0,0,0,0.5) !important;

}



.venta_btn:hover{
color: black;
background-color: white;
}

.input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
}

.form-control {
    border: 0;
    box-shadow: none;
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

.caja{
   float:left;
   margin-left:5px;
}

input{
  background-color: white;
}

</style>
