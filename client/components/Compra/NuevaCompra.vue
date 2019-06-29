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
                  <hr style="color:black;">
                  <div class="card-body">
                    <form style="margin-left: 30px; margin-top:30px;">
                            <div class="caja">
                                <span class="input-group-text">Proveedor</span>
                                <v-select :options="proveedor" label="dni" id="proveedorSelect"  v-model="proveedorSelected" style="width:290px; height:57px; background-color: white; border-radius: 4px;">
                                  <template slot="option" slot-scope="option">
                                      <span class="fa" :class="option.icon"></span>
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="caja">
                              <span class="input-group-text">Producto</span>
                                <v-select  :options="producto" label="modelo"  v-model="productoSelected" style="width:290px; height:57px; border-radius: 4px; background-color: white;">
                                  <template slot="option" slot-scope="option" style="height:107px;">
                                      <span class="fa" :class="option.icon" style="height:107px;"></span>
                                    {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="caja" style="width:230px;" >
                                <div>
                                  <span class="input-group-text">Cantidad</span>
                                  <b-input-group>
                                    <b-form-input class="form-control form-control-lg" type="number" :disabled="!productoSelected" min="0"  v-model="num" style="width:145px; height:57px; border-top:1px solid lightgray;  background-color:white;"/>
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
                                <input required  type="number" min="0"  v-model="precio" :disabled="!productoSelected"  class="form-control form-control-lg" style="background-color:white; border-top:1px solid lightgray; height:57px; width:200px;">
                            </div>
                    </form>
                    <div>
                        <br>
                        <button class="btn btn-success" v-on:click="guardarLista()" style="margin-left:52px;" title="Añadir al Carrito">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                    <br>
                      <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin: 0 auto; width:1000px;">
                                <table class="table" style="background-color:white;">
                                  <thead>
                                    <tr >
                                      <th scope="col">Modelo</th>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Precio</th>
                                      <th scope="col">Opciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="item in this.Lista" :key="item">
                                      <th class="centered">{{item.producto.modelo}}</th>
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
<script>

import axios from 'axios'
import { alertWarningLimiteStock,alertCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessCompra} from '../../assets/sweetAlert.js'
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
      precio: '',
      precioTotal: 0,
      productoSelected: '',
      proveedorSelected: '',
      num: '',

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
      axios.get('http://localhost:3000/productoStock').then(response=>{
        this.producto = response.data;
      });
    },
    guardarLista(){
            //Funcion Que Guarda Los Productos Seleccionados a comprar en una Lista Dinamica
            if(this.productoSelected && this.precio > 0 && this.num > 0){
                this.precioTotal = parseInt(this.precioTotal) + parseInt(this.precio);
                this.compraProducto.producto = this.productoSelected;
                this.compraProducto.cantidad = this.num;
                this.compraProducto.precio = this.precio;
                this.Lista.push(this.compraProducto);
                //Una Vez añadido al carrito Actializamos el Stock de la Lista Productos
                var index = this.producto.indexOf(this.productoSelected);
                if (index > -1) {
                  this.producto[index].stock = this.producto[index].stock - this.num;
                }
                //Una Vez Añadido al Carrito, inicializamos en Vacio los Inputs
                this.productoSelected = '';
                this.num = '';
                this.precio = '';
                this.compraProducto = new CompraProducto();

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
      //Funcion Que Elimina un Producto determinado de la Lista de Compra y actualiza el stock
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
    nuevaCompra(){
                  //Una Vez que le damos Guardar, Verificamos Si la Lista de Productos que
                  //Vamos a Comprar no es Vacia
                  if (this.Lista.length > 0 ){
                      //Asignamos el Cliente Selecionado a this.compra.proveedor
                      //Asignamos a this.compra total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a comprar
                      this.compra.proveedor = this.proveedorSelected;
                      this.compra.total = this.precioTotal;
                      axios.post('http://localhost:3000/compra',
                          {
                          lista: this.Lista,
                          compra: this.compra
                          },
                          {
                            headers:{
                            'Access-Control-Allow-Origin': 'http://localhost:3000/compra',
                            'Content-Type': 'application/json'
                             }
                        })
                          alertSucessCompra();
                          this.compraProducto = new CompraProducto();

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
   height: 100px;

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

</style>
