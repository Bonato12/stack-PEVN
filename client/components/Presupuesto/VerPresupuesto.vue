<template>
  <div>
    <div class="container animated zoomIn">
      <br>
          <div class="card-header" style="background-color:#f1f8e9; ">
            <h2 style="text-align:left; color:black;">
                <i class="fas fa-tools"></i>
                <i class="fas fa-clipboard-list"></i>
                Detalle del Presupuesto: {{presupuesto.id_presupuesto}}
                 
             </h2>
             <button class="btn btn-borrar" style="float:right" v-on:click="eliminarPresupuesto(presupuesto.id_presupuesto)" title="Eliminar Arreglo">
                    <i class="fas fa-trash-alt"></i>
              </button>
          </div>
          <div class="modal-body" style="background-color: #f1f8e9; color:black;">
            <div class="row">
              <div class="col-md">
                  <slot name="body">
                     <b-row class="mb-1">
                       <b-col cols="3">Arreglo:</b-col>
                         <b-col>{{presupuesto.arreglo}}</b-col>
                     </b-row>
                     <b-row class="mb-1">
                       <b-col cols="3">Observacion:</b-col>
                         <b-col>{{presupuesto.observacion}}</b-col>
                     </b-row>
                     <b-row class="mb-1">
                       <b-col cols="3">Precio Total:</b-col>
                         <b-col>{{presupuesto.precio_total}}$</b-col>
                     </b-row>
                     <b-row class="mb-1">
                       <b-col cols="3">Mano de Obra:</b-col>
                         <b-col>{{presupuesto.precio_mano_obra}}$$</b-col>
                     </b-row>
                     <hr>
                  </slot>
              </div>
            </div>
          </div>
          <hr>
          <div class="modal-body" style="background-color: #f1f8e9; margin-top:-30px;">
              <h4>
                <i class="fas fa-tools"></i>
                Lista de Repuestos Utilizados:</h4>
              <br>
              <div class="row">
                <div class="col-md">
                  <table class="table" style="color:black">
                        <thead>
                              <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in this.presupuestoProducto">
                                <td scope="col">{{item.modelo}}</td>
                                <td scope="col">{{item.cantidad}}</td>
                                <td scope="col"> {{item.precio}}</td>
                              </tr>
                              <tr>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                              </tr>
                        </tbody>
                  </table>
                </div>
              </div>
          </div>
          <hr>
          <div class="modal-body" style="background-color:#f1f8e9; margin-top:-30px;" >
              <h4>
                <i class="fas fa-info-circle"></i>
                Estado del Presupuesto:</h4>
                <hr>
            <form @submit.prevent="cambiarEstado()">
              <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Estado</span>
                  </div>
                  <select required class="form-control" v-model="estado" placeholder="Elige un Tipo Producto" :disabled="guardado == true">
                    <option value=""  disabled selected>Elige un Tipo Producto</option>
                    <option  v-for="item in estadoP">{{ item.name }}</option>
                 </select>
              </div>
              <div class="modal-body" style="background-color:#f1f8e9;">
                <button type="submit" class="btn btn-guardar"  title="Guardar Estado" >
                      <i class="far fa-save fa-1x"></i>
                      Guardar
                </button>
                <router-link to="/HomeArreglo" tag="button" class="btn btn-info"  title="Volver a Home Arreglo" >
                    <i class="fas fa-arrow-left"></i>
                      Volver
                </router-link>
                <br>
            </div>
          </form>
          </div>
      </div>
      <br>
    </div>
</template>
<script>

import axios from 'axios'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete, alertEditSuccess} from '../../assets/sweetAlert.js';
import moment from 'moment';

export default {
  name: 'HomeVenta',
  created(){
    this.getPresupuesto();
    
  },
  data () {
    return {
      idp: this.$route.params.id,
      showModal: false,
      presupuesto:'',
      guardado: false,
      presupuestoProducto: '',
      estado: '',
      estadoP : [{name:"EN ESPERA"},
                       {name:"ACEPTADO"},
                       {name:"CANCELADO"}]
		}
  },
 
  methods: {
    getPresupuesto(){
        axios.get('http://localhost:3000/presupuesto/'+this.idp).then((response) =>{
          this.presupuesto = response.data[0];
          console.log(this.presupuesto);
          this.estado = response.data[0].estado
          this.control(this.presupuesto.id_presupuesto)
        }).catch(error=>{
          console.log(error)
        })
  },
    control(id){
        axios.get('http://localhost:3000/presupuestoProducto/'+id).then((response) =>{
          console.log(response.data)
          this.presupuestoProducto = response.data;
        }).catch(error=>{
          console.log(error);
        });
    },
 
    eliminarPresupuesto(){
        var _this = this;        
        this.$swal({
            title: 'Estas Seguro?',
            text: "No se podran recuperar los datos!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
            }).then((result) => {
            if (result.value) {
              axios.delete('http://localhost:3000/presupuesto/'+this.idp).then((data)=>{
                console.log(data)
              }).then(response =>{
              _this.$router.push('/HomeArreglo');

                if (response.data == "OK"){
                }else {
                    alert("error");
                }
              }).catch(error=>{
                  console.log(error);
              })
             }
            });
    },
        
        
    cambiarEstado(){
        axios.put('http://localhost:3000/presupuesto/'+ this.idp,
            {
            estado: this.estado
            }
            ,
            { headers: {
              'Content-Type': 'application/json',
            }
        }).then(response=>{
          alertEditSuccess();
        }).catch(error=>{
          console.log(error);
        })
    }



}
}
</script>

<style scoped>
#HomeVenta {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-family: 'Numans', sans-serif;
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

#formulario{
  background-color: rgba(0,0,0,0.8);
  width: 450px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;

}

.modal-container {
  width: 1000px;
  height: auto;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  border-radius: 10px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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
  color: black !important;
}

button{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black;
}


.btn-borrar{

width: 38px;
background-color: red;
margin-top: -40px;
margin-left: 55px;

}

button:hover{
     background-color: white  !important;
     color: black;
}



</style>
