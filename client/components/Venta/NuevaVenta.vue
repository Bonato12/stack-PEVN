<template>
  <div id="NuevaVenta">
    <div class="container">
          <div class="d-flex justify-content-center h-100">
        		<div class="card" id="card">
          			<div class="card-header">
                  <h3 style="text-align:center; color:white;"> Nueva Venta </h3>
          			</div>
          			<div class="card-body animated fadeInDown">
              				<form>
                          <div class="input-group form-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Cliente</span>
                              <v-select :options="cliente" label="dni"  v-model="clienteSelected" style="width:320px; background-color: white;">
                                <template slot="option" slot-scope="option">
                                    <span class="fa" :class="option.icon"></span>
                                    {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                </template>
                              </v-select>
                            </div>
                          </div>
                          <div class="input-group form-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Producto</span>
                                  <v-select  :options="producto" label="modelo"  v-model="productoSelected" style="width:303px; background-color: white;">
                                    <template slot="option" slot-scope="option">
                                        <span class="fa" :class="option.icon"></span>
                                      {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                    </template>
                                  </v-select>
                              </div>
                          </div>
                          <div v-if="productoSelected" class="input-group form-group" >
                              <div class="input-group-prepend">
                                <span class="input-group-text">Cantidad</span>
                                <b-input-group>
                                  <b-form-input class="form-control form-control-lg" type="number" min="0.00" max="10.00"  v-model="num" style="width:225px;"/>

                                  <b-input-group-append>
                                    <b-button  variant="info" style="background-color: #FFC312;" @click="decrement()">
                                        <i class="fas fa-minus"></i>
                                    </b-button>
                                    <b-button  variant="info"   @click="increment()">
                                        <i class="fas fa-plus"></i>
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                             </div>
                          </div>
                          <div v-if="productoSelected" class="input-group form-group" style="width:403px;">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Total</span>
                              </div>
                              <input  type="number" min="0"  v-model="venta.precio"  class="form-control form-control-lg">
                          </div>
                          <div class="input-group form-group">
                              <button class="btn btn-success" v-on:click="guardarLista()" title="Añadir al Carrito">
                                  <i class="fas fa-cart-plus"></i>
                              </button>
                          </div>
                      </form>
                      <br>
              				<div class="form-group">
              						<input v-on:click="nuevaVenta()" value="Guardar" class="btn float-right venta_btn">
                          <router-link to="/HomeVenta" tag="button" class="btn" style="background:white; margin-left:702px;">
                              <i class="fas fa-arrow-left"></i>
                                  Volver
                          </router-link>
              				</div>
                  <div style="margin-left:500px; margin-top:-360px;">
                  <ul class="list-group">
                    <li v-for="item in this.Lista">
                      <div class="container">
                        <div class="row">
                          <div class="col animated fadeIn">
                            <h3>{{item.producto.marca}} {{item.producto.modelo}}</h3>
                            <button v-on:click="borrar(item)" class="btn btn-danger" style="float:right; margin-top: -40px;">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            <br>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  </div>
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
import { alertWarningLimiteStock,alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessVenta} from '../../assets/sweetAlert.js'
import Venta from '../../models/Venta';

export default {
  name: 'NuevaVenta',
  created(){
      this.getCliente();
      this.getProducto();
  },
  data () {
    return {
      venta: new Venta(),
      cliente: [],
      producto: [],
      productoSelected: '',
      clienteSelected: '',
      num: '',
      numCarrito: '',
      Lista: [
        //  {id:'0',id_cliente:'120', modelo:'J7', marca:'Samsung', id_producto:'15', cantidad: '2', fecha: '12/09/2019', precio: '4000'},
        //  {id:'1',id_cliente:'174', modelo: 'X Play', marca:'Motorola', id_producto:'17', cantidad: '1', fecha: '12/09/2019', precio: '8000'},
        //  {id:'2',id_cliente:'120', modelo: 'X', marca:'Apple', id_producto:'18', cantidad: '4', fecha: '12/09/2018', precio: '12000'}

      ]
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
      axios.get('http://localhost:3000/producto').then(response=>{
        this.producto = response.data;
      });
    },
    guardarLista(){
      if (this.numCarrito ==  4){
            alertWarningLimite();
      }else {
            if(this.clienteSelected && this.productoSelected){
                this.numCarrito++;
                this.venta.cliente = this.clienteSelected;
                this.venta.producto= this.productoSelected;
                this.venta.cantidad = this.num;
                this.venta.precio = (parseInt(this.productoSelected.precio) * parseInt(this.num)) ;
                this.Lista.push(this.venta);
                console.log(this.Lista);
                this.venta = new Venta();
                this.num = '';
            }
      }
    },
    nuevaVenta(){
      //Cicla la Lista de Objetos y las envia al Servidor
      console.log(this.Lista);
      for (var i = 0; i < this.Lista.length; i++) {
        axios.post('http://localhost:3000/venta',
                    this.Lista[i],
                  {
                    headers: {
                      'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                      'Content-Type': 'application/json'
                    }
                  }).then(
                    axios.put('http://localhost:3000/productoStock/'+ this.Lista[i].producto.id_producto,
                       {
                       stock: this.Lista[i].cantidad,
                       id_producto: this.Lista[i].producto.id_producto
                     },
                       { headers: {
                           'Content-Type': 'application/json',
                       }
                     }));
      }
      alertSucessVenta();
      this.lista = [];
      this.clienteSelected = '';
      this.productoSelected = '';
      this.venta = new Venta();

    },
    increment(){
          if(this.productoSelected.precio){
              if (this.num ==  this.productoSelected.stock){
                  alertWarningLimiteStock();
              }else{
                  this.num++;
                  this.venta.precio = this.productoSelected.precio * this.num;
              }
          }
    },
    decrement() {
      if(this.productoSelected){
          if (this.num == 1) {
            alertWarningLimiteOne();
          } else {
            this.num--;
            this.venta.precio = this.productoSelected.precio * this.num;
          }
      }
    },
    borrar(item){
      this.numCarrito--;
      console.log(item);
      this.Lista.splice((item.id), 1);
    }
  }
}

</script>

<style scoped>


h1, h2 {
  font-weight: normal;
}


a {
  color: #42b983;
}



#card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 950px;
color: white;
background-color: rgba(0,0,0,0.5) !important;

}


.venta_btn{
color: black;
background-color: #FFC312;
width: 100px;
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

</style>
