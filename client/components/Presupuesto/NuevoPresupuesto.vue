<template>
      <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-center">
              <div class="card animated fadeInDown">
                  <div class="card-header" style="background-color:#FFD700;">
                    <h2 style="text-align:center; color:black;">
                      <i class="fas fa-coins"></i>
                        Presupuesto para el Arreglo N° {{this.ida}}
                     </h2>
                  </div>
                    </hr style="color:black;">
                  <div class="card-body">
                    <form style="margin-left: 30px; margin-top:30px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Repuesto</span>
                                </div>
                                <v-select  class="form-control" @change="onChange($event)"  :options="producto" label="modelo"  v-model="repuestoSelected">
                                  <template class="form-control" slot="option" slot-scope="option">
                                    {{ option.marca }} {{ option.modelo }} {{ option.precio }}
                                  </template>
                                </v-select>
                            </div>
                            <div class="caja">
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
                            <div class="caja">
                              <div class="input-group form-group" style="width:537px; padding-left:25px;">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text">Precio</span>
                                  </div>
                                  <input  type="number" min="0"  v-model="precio"  class="form-control">
                              </div>
                            </div>
                    </form>
                    <div>
                        <button class="btn" v-on:click="guardarLista()" style="margin-left:32px; width:100px; border-radius:15px; background-color:#FFD700;" title="Ingrese Observacion">
                          <i class="fas fa-mobile-alt fa"></i>
                          <i class="fas fa-tools fa"></i>
                        </button>
                    </div>
                    <br>
                  <hr style="background-color:black;"/>
                      <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin: 0 auto; width:1000px;">
                                <i class="fas fa-mobile-alt fa-3x"></i>
                                <i class="fas fa-tools fa-3x"></i>
                                <br>
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
                                    <tr v-for="item in this.Lista">
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
                          <div class="input-group form-group" style="margin-left: 25px; width:1045px;" >
                              <div class="input-group-prepend">
                                <span class="input-group-text">Observaciones</span>
                              </div>
                              <textarea required type="text" class="form-control" v-model="presupuesto.observacion" placeholder="Ingrese Descripcion"></textarea>
                          </div>
                          <div  style="text-align:right; margin-right:50px; color:white;">
                            <div class="input-group form-group" style="width:337px; padding-left:25px;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Precio Mano de Obra</span>
                                </div>
                                <input @change="precioManoObra()" type="number" min="0"  v-model="presupuesto.precioManoObra"  class="form-control">
                            </div>
                          </div>
                          <div  style="text-align:right; margin-right:50px; color:white;">
                            <div class="input-group form-group" style="width:337px; padding-left:25px;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Precio Repuesto</span>
                                </div>
                                <input  type="number" min="0"  v-model="precioRepuesto"  class="form-control">
                            </div>
                          </div>
                          <div  style="text-align:right; margin-right:50px; color:white;">
                            <div class="input-group form-group" style="width:337px; padding-left:25px;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Precio Total</span>
                                </div>
                                <input  type="number" min="0"  v-model="precioTotal"  class="form-control">
                            </div>
                          </div>
                          <br>
                          <div class="d-flex justify-content-end" style="padding-right:50px;">
                              <router-link to="/HomeArreglo" tag="button" class="botones"  style="background:white;">
                                  <i class="fas fa-arrow-left"></i>
                                      Volver
                              </router-link>
                              <div style="width:5px;"></div>
                              <button v-on:click="nuevoPresupuesto()" class="botones" style="width:115px; background-color:#fec400;">
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
import { alertWarningLimiteStock, alertWarningCompletarCampos } from '../../assets/sweetAlert.js'
import { alertWarningLimiteOne,alertWarningLimite } from '../../assets/sweetAlert.js'
import { alertSucessPresupuesto} from '../../assets/sweetAlert.js'
import Presupuesto from '../../models/Presupuesto';
import PresupuestoProducto from '../../models/VentaProducto';
import Arreglo from '../../models/Arreglo'
export default {
  name: 'NuevaVenta',
  created(){
      this.getArreglo();
      this.getProducto();
  },
  data () {
    return {
      presupuesto: new Presupuesto(),
      presupuestoProducto: new PresupuestoProducto(),
      ida: this.$route.params.id,
      arreglo: '',
      Lista: [],
      producto: [],
      precio: 0,
      precioRepuesto:0,
      precioTotal: 0,
      repuestoSelected: '',
      num: 0,
      id_presupuesto:''

		}
  },
  computed:{
  },
  mounted(){
  },
  methods: {
    getArreglo(){
      axios.get('http://localhost:3000/arreglo/'+this.ida).then(response=>{
        this.arreglo = response.data[0];
        console.log(this.arreglo);
      });
    },
    getProducto(){
      axios.get('http://localhost:3000/productoStock').then(response=>{
        this.producto = response.data;
      });
    },
    guardarLista(){
            console.log(JSON.stringify(this.repuestoSelected));
            //Funcion Que Guarda Los Productos Seleccionados a vender en una Lista Dinamica
            if(this.repuestoSelected && this.precio > 0 && this.num > 0){
                this.precioRepuesto = parseInt(this.precioRepuesto) + parseInt(this.precio);
                this.presupuestoProducto.producto = this.repuestoSelected;
                this.presupuestoProducto.cantidad = this.num;
                this.presupuestoProducto.precio = this.precio;
                this.Lista.push(this.presupuestoProducto);
                //Una Vez añadido al carrito Actializamos el Stock de la Lista Productos
                var index = this.producto.indexOf(this.repuestoSelected);
                if (index > -1) {
                  this.producto[index].stock = this.producto[index].stock - this.num;
                }
                //Una Vez Añadido al Carrito, inicializamos en Vacio los Inputs
                this.repuestoSelected = '';
                this.num = '';
                this.precio = '';
                this.presupuestoProducto = new PresupuestoProducto();
            }else {
              alert("Completar los Campos");
            }
    },
    incrementarCantidad(){
          console.log(this.repuestoSelected)
      //Funcion Que al icrementar la cantidad, multiplica la cantidad por el precio del producto seleccionado
          if(this.repuestoSelected.precio){
              if (this.num ==  this.repuestoSelected.stock){
                  alertWarningLimiteStock();
              }else{
                  this.num++;
                  this.precio = parseInt(this.repuestoSelected.precio) * parseInt(this.num)
              }
          }
    },
    decrementarCantidad() {
      //Funcion Que al icrementar la cantidad, multiplica la cantidad por el precio del producto seleccionado
      if(this.repuestoSelected){
          if (this.num == 0) {
            alertWarningLimiteOne();
          } else {
            this.num--;
            this.precio = parseInt(this.repuestoSelected.precio) * parseInt(this.num)
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
      this.precioRepuesto = this.precioRepuesto - this.Lista[index].precio
      if (index > -1) {
          this.Lista.splice(index, 1);
      }
    },
    onChange(event) {
           var actual = JSON.stringify(event);
           var viejo = JSON.stringify(this.repuestoSelected);
           if (viejo){
             if (actual == viejo){
               this.num = 0;
               this.precio = '';
             }
           }
       },
       precioManoObra(){
         this.precioTotal = parseInt(this.precioRepuesto) + parseInt(this.presupuesto.precioManoObra);
       },

    nuevoPresupuesto(){
                  if (this.Lista.length > 0 ){
                      this.presupuesto.arreglo = this.ida;
                      this.presupuesto.estado = 'EN ESPERA';
                      this.presupuesto.precioTotal = this.precioTotal;
                      axios.post('http://localhost:3000/presupuesto',
                          {
                          //lista: this.Lista,
                          presupuesto: this.presupuesto
                          },
                          {
                            headers:{
                            'Content-Type': 'application/json'
                             }
                        }).then(response=>{
                          console.log(response.data[0].id_venta);
                          this.id_presupuesto = response.data[0].id_presupuesto
                          this.postPresupuestoProducto(this.id_presupuesto)
                        }).then();
                          alertSucessVenta()
                  }else {
                     alertWarningCompletarCampos()
                  }

    },
    postPresupuestoProducto(id){
      console.log("El id es:",id)
      axios.post('http://localhost:3000/presupuestoProducto',
          {
          id_presupuesto: id,
          presupuesto: this.Lista
          },
          {
            headers:{
            'Access-Control-Allow-Origin': 'http://localhost:3000/presupuestoProducto',
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
color: black;
border: none;
}
input{
  background-color: white;
}
</style>
