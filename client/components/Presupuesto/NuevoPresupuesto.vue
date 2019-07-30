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
                    <form @submit.prevent="guardarLista()" style="margin: 0 auto; width:780px; margin-top:10px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <model-list-select class="form-control" :list="producto"
                                                   v-model="repuestoSelected"
                                                   option-value="id_producto"
                                                   :custom-text="codeAndNameAndDesc"
                                                   >
                                </model-list-select>
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
                                <button class="btn" type="submit"  style="width:110px; border-radius:5px; background-color:#FFD700;" title="Ingrese Observacion">
                                  <i class="fas fa-tools fa"></i>
                                  Añadir
                                </button>
                            </div>
                    </form>
                      <div v-if="this.Lista.length > 0" class="animated fadeIn" style="margin: 0 auto; width:780px; border-radius: 5px;">
                                <br>
                                <div>
                                    <div class="card-header" style="background-color:#FFD700; ">
                                      <h3 style="color:black;">
                                        <i class="fas fa-shopping-cart"></i>
                                        <i class="fas fa-tools"></i>
                                        Carrito de Repuestos</h3>
                                    </div>
                                </div>
                                <table class="table" style="background-color:white;   border-radius: 5px;">
                                  <thead style="background-color:white;   border-radius: 5px;">
                                    <tr>
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
                          <div style="width:780px; margin:0 auto;">
                              <div class="input-group form-group">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">Observaciones</span>
                                  </div>
                                  <textarea required type="text" class="form-control" v-model="presupuesto.observacion" placeholder="Ingrese Descripcion"></textarea>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <div class="input-group form-group">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text">
                                             Precio Mano Obra
                                          </span>
                                      </div>
                                      <input type="number" min="0"  v-model="precioManoObra"  class="form-control">
                                  </div>
                                </div>
                                <div class="col">
                                  <div class="input-group form-group">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text">Precio Repuesto</span>
                                      </div>
                                      <input type="number" min="0"  v-model="precioRepuesto"  class="form-control" readonly>
                                  </div>
                                </div>
                              </div>
                              <div class="input-group form-group">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text">Precio Total</span>
                                  </div>
                                  <input  type="number" min="0"  v-model="precioTotal"  class="form-control" readonly>
                              </div>
                              <br>
                              <br>
                              <div class="d-flex justify-content-end">
                                  <router-link to="/HomeArreglo" tag="button" class="btn btn-info" title="Volver a Home Arreglo">
                                      <i class="fas fa-arrow-left"></i>
                                          Volver
                                  </router-link>
                                  <div style="width:3px;"></div>
                                  <button v-on:click="nuevoPresupuesto()" class="btn btn-success" title="Guardar Nuevo Repuesto">
                                    <i class="far fa-save fa-1x"></i>
                                          Guardar
                                  </button>
                              </div>
                          </div>
                  </div>
              </div>
            </div>
       </div>
       <br>
      </div>
</template>
<script>
import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'
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
      precioManoObra: 0,
      precioRepuesto:0,
      precioTotal: 0,
      repuestoSelected: {},
      num: 0,
      id_presupuesto:''

		}
  },
  computed:{
  },
  mounted(){
  },
  methods: {
    codeAndNameAndDesc (item) {
      return `${item.modelo} - ${item.marca} - ${item.precio}`
    },
    getArreglo(){
      axios.get('http://localhost:3000/arreglo/'+this.ida).then(response=>{
        this.arreglo = response.data[0];
        console.log(this.arreglo);
      });
    },
    getProducto(){
      axios.get('http://localhost:3000/productoRepuesto').then(response=>{
        this.producto = response.data;
        console.log(this.producto)
      });
    },
    guardarLista(){
            console.log(JSON.stringify(this.repuestoSelected));
            if(this.repuestoSelected && this.precio > 0 && this.num > 0){
                this.precioRepuesto = parseInt(this.precioRepuesto) + parseInt(this.precio);
                this.precioTotal = parseInt(this.precioRepuesto) + parseInt(this.precioManoObra);
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
                this.repuestoSelected = {};
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
            this.precio = parseInt(this.repuestoSelected.precio) * parseInt(this.num);

          }
      }
    },
    borrar(producto){
      console.log(producto)
      //Funcion Que Elimina un Producto determinado de la Lista de Venta y actualiza el stock
      var indice = this.producto.indexOf(producto.producto);
      this.producto[indice].stock = this.producto[indice].stock + producto.cantidad;
      console.log(indice);
      //Resta al Precio Total el precio del Producto eliminado de la lista.
      var index = this.Lista.indexOf(producto);
      this.precioRepuesto = this.precioRepuesto - this.Lista[index].precio;
      this.precioTotal = parseInt(this.precioTotal) - this.Lista[index].precio  ;
      if (index > -1) {
          this.Lista.splice(index, 1);
      }
    },

    nuevoPresupuesto(){
                  if (this.precioManoObra && this.precioTotal ){
                      this.presupuesto.arreglo = this.ida;
                      this.presupuesto.estado = 'EN ESPERA';
                      this.presupuesto.precioManoObra = this.precioManoObra;
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
                          if (this.Lista.length){
                            console.log(response.data[0].id_venta);
                            this.id_presupuesto = response.data[0].id_presupuesto
                            this.postPresupuestoProducto(this.id_presupuesto)
                          }

                        })
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
 },
 components: {
   ModelSelect,
   ModelListSelect
 },
 watch: {
     repuestoSelected:{
       handler () {
        this.num = 0;
        this.precio = '';
       },
       deep: true
     },
     precioManoObra:{
       handler () {
       this.precioTotal = parseInt(this.precioRepuesto) + parseInt(this.precioManoObra);
       },
       deep: true
     },
     precioRepuesto:{
       handler () {
       this.precioTotal = parseInt(this.precioRepuesto) + parseInt(this.precioManoObra);
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
background-color: rgb(70,90,101);
border: 1px solid;
border-radius: 5px;
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


btn{
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
  color: black;
}

btn:hover{
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
