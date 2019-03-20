<template>
  <div id="NuevaVenta">
    <div class="container">
          <div style="float:center;">
          			<div class="card-header">
                  <h3 style="text-align:center; color:white;"> Nueva Venta </h3>
          			</div>
          			<div class="animated fadeInDown" id="card" style="float:left;  width:500px;">
                      <br>
                      <br>
                      <form style="margin-left: 50px; margin-top:30px;">
                          <div class="input-group form-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Cliente</span>
                              <v-select :options="cliente" label="dni" id="clienteSelect"  v-model="clienteSelected" style="width:320px; background-color: white;">
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
                                <span class="input-group-text">Precio</span>
                              </div>
                              <input required  type="number" min="0"  v-model="precio"  class="form-control form-control-lg">
                          </div>
                          <div class="input-group form-group">
                              <button class="btn btn-success" v-on:click="guardarLista()" title="Añadir al Carrito">
                                  <i class="fas fa-cart-plus"></i>
                              </button>
                          </div>
                      </form>
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
                      <br>
                  </div>
                  <div class="animated fadeIn" style="float:right; width:500px;">
                            <table class="table table-dark">
                              <thead>
                                <tr>
                                  <th scope="col">Modelo</th>
                                  <th scope="col">Cantidad</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in this.Lista">
                                  <th>{{item.producto.modelo}}</th>
                                  <td>{{item.cantidad}}</td>
                                  <td>{{item.precio}}</td>
                                  <td>
                                      <button v-on:click="borrar(item)" class="btn btn-danger">
                                          <i class="fas fa-trash-alt"></i>
                                      </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
  },
  data () {
    return {
      id: -1,
      idventa : -1,
      venta: new Venta(),
      Lista: [],
      ventaProducto: new VentaProducto(),
      last: '',
      cliente: [],
      producto: [],
      precio: '',
      acumulador: 0,
      productoSelected: '',
      clienteSelected: '',
      num: '',
      numCarrito: '',
      prueba:''

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
      if (this.numCarrito ==  4){
            alertWarningLimite();
      }else {
            if(this.clienteSelected && this.productoSelected && this.precio && this.num){
                this.numCarrito++;
                this.venta.cliente = this.clienteSelected;
                this.acumulador = parseInt(this.acumulador) + parseInt(this.precio);
                alert(this.acumulador);
                this.venta.total = this.acumulador;
                this.ventaProducto.producto = this.productoSelected;
                this.ventaProducto.cantidad = this.num;
                this.ventaProducto.precio = this.precio;
                this.id++;
                this.ventaProducto.id = this.id;
                this.Lista.push(this.ventaProducto);
                this.ventaProducto = new VentaProducto();
                this.productoSelected = '';
                this.num = '';
                this.precio = 0;
            }else {
              alert("Completar los Campos");
            }
      }
    },


    nuevaVenta(){
                  if (this.Lista.length > 0 && this.venta){
                      axios.post('http://localhost:3000/venta',
                          {
                          lista: this.Lista,
                          venta: this.venta
                          },
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                            'Content-Type': 'application/json'
                             }
                        })
                          alertSucessVenta();
                  }else {
                    alert("Completar Los Campos");
                  }

    },

    increment(){
          if(this.productoSelected.precio){
              if (this.num ==  this.productoSelected.stock){
                  alertWarningLimiteStock();
              }else{
                  this.num++;
                  this.precio = parseInt(this.productoSelected.precio) * parseInt(this.num)

              }
          }
    },
    decrement() {
      if(this.productoSelected){
          if (this.num == 1) {
            alertWarningLimiteOne();
          } else {
            this.num--;
            this.precio = parseInt(this.productoSelected.precio) * parseInt(this.num)

          }
      }
    },
    borrar(item){
      console.log(this.Lista);
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



form input:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;
    /*box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);*/
}


form input:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;
/*  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 255, 0, 0.6);*/
}

#clienteSelect:focus:invalid{
    background: url('../../assets/invalid.png') no-repeat 95% 50%;
    background-color: white;
    /*box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);*/
}


v-select:required:focus:valid{
  background: url('../../assets/valid.png') no-repeat 95% 50%;
  background-color: white;
/*  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 255, 0, 0.6);*/
}

.botones{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:200px;
  height:50px;
  margin-top:-10px;
  border:none;
  color:black;
  -webkit-transition:.5s;
  transition:.5s;
}

</style>
