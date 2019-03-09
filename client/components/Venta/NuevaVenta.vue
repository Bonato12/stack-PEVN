<template>
  <div id="NuevaVenta">
    <div class="container">
          <div class="d-flex justify-content-center h-100">
        		<div class="card" id="card">
          			<div class="card-header">
                  <h3 style="text-align:center; color:white;"> Nueva Venta </h3>
          			</div>
          			<div class="card-body">
              				<form>
                        <!--
                        <div>
                            <multiselect
                             ""@submit.prevent="nuevaVenta()"
                              v-model="value"
                              :options="cliente"
                              :multiple="true"
                              track-by="library"
                              :custom-label="customLabel"
                              >
                            </multiselect>
                            <pre>{{ value }}</pre>
                        </div>
                      -->
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
                        <div class="input-group form-group" >
                            <div class="input-group-prepend">
                              <span class="input-group-text">Cantidad</span>
                              <b-input-group>
                                <b-form-input type="number" min="0.00" max="10.00"  v-model="num" style="width:225px;"/>

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
                        <div class="input-group form-group" style="width:403px;">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Total</span>
                            </div>
                            <input required type="number" min="0"  v-model="venta.precio"  class="form-control">
                        </div>
                        <div class="input-group form-group">
                            <button class="btn btn-success" v-on:click="guardarLista()" title="Añadir al Carrito">
                                <i class="fas fa-cart-plus"></i>

                            </button>
                        </div>
                        <br>
              					<div class="form-group">
              						  <input  value="Guardar" v-on:click="Ciclar()"   class="btn float-right venta_btn">
                            <router-link to="/HomeProveedor" tag="button" class="btn" style="background:white; margin-left:702px;">
                                <i class="fas fa-arrow-left"></i>
                                  Volver
                            </router-link>
              					</div>
          				</form>
                  <div style="margin-left:500px; margin-top:-360px;">
                  <ul class="list-group">
                    <li v-for="item in this.Lista">
                      <div class="container">
                        <div class="row">
                          <div class="col animated fadeIn">
                            <h3>{{item.id_producto.marca}} {{item.id_producto.modelo}}</h3>
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
import Venta from '../../models/Venta';

import Multiselect from 'vue-multiselect'


export default {
  name: 'NuevaVenta',
  components: { Multiselect },
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
      value: '',
    	options: [
      	{	language: 'JavaScript', library: 'Vue.js' },
        { language: 'JavaScript', library: 'Vue-Multiselect' },
        { language: 'JavaScript', library: 'Vuelidate' }
      ],
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
        console.log(response.data.stock)
      });
    },
    guardarLista(){
      if (this.numCarrito ===  4){
          alert("Limite de Productos para comprar");
          }else {
            this.numCarrito++;
            this.venta.id_cliente = this.clienteSelected;
            this.venta.id_producto= this.productoSelected;
            this.venta.cantidad = this.num;
            this.venta.precio = (parseInt(this.productoSelected.precio) * parseInt(this.num)) ;
            this.Lista.push(this.venta);
            console.log(this.Lista);
            this.venta = new Venta();

          }
    },
    Ciclar(){
      //Cicla la Lista de Objetos y las envia al Servidor
      console.log(this.Lista);
      for (var i = 0; i < this.Lista.length; i++) {
        console.log(this.Lista[i].id_producto);
        axios.post('http://localhost:3000/venta',
                    this.Lista[i],
                  {
                    headers: {
                      'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                      'Content-Type': 'application/json'
                    }
                  }).then(
                    axios.put('http://localhost:3000/productoStock/'+ this.Lista[i].id_producto.id_producto,
                       {
                       stock: this.Lista[i].cantidad,
                       id_producto: this.Lista[i].id_producto.id_producto
                     },
                       { headers: {
                           'Content-Type': 'application/json',
                       }
                     }));
                }

  /*
      axios.post('http://localhost:3000/venta',
                  value[key],
                {
                  headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                    'Content-Type': 'application/json'
                  }
                });
*/

    },
  nuevaVenta(){
    console.log(this.clienteSelected);
    console.log(this.productoSelected);
    this.venta.id_cliente = this.clienteSelected.id_cliente;
    this.venta.id_producto= this.productoSelected.id_producto;
    this.venta.cantidad = this.num;
    this.venta.precio = (parseInt(this.productoSelected.precio) * parseInt(this.num)) ;
    var id = this.venta.id_producto= this.productoSelected.id_producto;
    var stock = this.productoSelected.stock;
    if (this.venta.id_cliente &&  this.venta.id_producto &&  this.venta.cantidad &&  this.venta.precio ) {
        axios.post('http://localhost:3000/venta',
                    this.venta,
                  {
                    headers: {
                      'Access-Control-Allow-Origin': 'http://localhost:3000/venta',
                      'Content-Type': 'application/json'
                    }
                  }).then(axios.put('http://localhost:3000/productoStock/'+ id,
                       {
                       stock: (stock) - this.num
                     },
                       { headers: {
                           'Content-Type': 'application/json',
                       }
                     }));
      }else {
        alert("Completar Los Campos");
            }
      },
        customLabel (option) {
          return `${option.dni}-${option.nombre} - ${option.apellido}`
            },
      increment() {
          if(this.productoSelected.precio){
          if (this.num ===  this.productoSelected.stock){
              alert("Limite de Stock");
              }else {
                this.num++;
                this.venta.precio = this.productoSelected.precio * this.num;
              }
          }


    },
    decrement() {
        if (this.num === 1) {
          alert("Negative quantity not allowed");
        } else {
          this.num--;
          this.venta.precio = this.productoSelected.precio * this.num;

        }
    },
    borrar(item){
      console.log(item);
      //this.Lista.splice(item.id_producto, 1);
      console.log(this.Lista.splice(item.id,1));
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

</style>
