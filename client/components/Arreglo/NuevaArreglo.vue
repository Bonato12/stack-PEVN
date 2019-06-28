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
                                <span class="input-group-text">Cliente</span>
                                <v-select  class="form-control" :options="cliente" label="dni" id="clienteSelect"  v-model="clienteSelected">
                                  <template slot="option" slot-scope="option">
                                      {{ option.dni }} {{ option.nombre }}  {{ option.apellido }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="input-group form-group">
                              <span class="input-group-text">Producto</span>
                                <v-select  class="form-control"  :options="producto" label="modelo"  v-model="productoSelected" >
                                  <template class="form-control" slot="option" slot-scope="option">
                                    {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Observacion</span>
                                </div>
                                <textarea required type="text" v-model="DA" class="form-control" placeholder="Ingrese Observacion"></textarea>

                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Estado</span>
                                </div>
                                <select class="form-control" v-model="selected">
                                  <option disabled value="">Por Favor Seleccione un Estado</option>
                                  <option selected:>EN ESPERA</option>
                                  <option>ACEPTADO</option>
                                  <option>CANCELADO</option>
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
                              <button v-on:click="NuevoArreglo()" class="botones" style="width:115px; background-color:#fec400;">
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
      num: '',

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
                  if (this.Lista.length > 0 ){
                      //Asignamos el Cliente Selecionado a this.venta.clientes
                      //Asignamos a this.venta total el precioTotal acumulado es decir la sumatorio de todos los precios de los productos que vamos a vender
                      this.venta.cliente = this.clienteSelected;
                      this.venta.total = this.precioTotal;
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
