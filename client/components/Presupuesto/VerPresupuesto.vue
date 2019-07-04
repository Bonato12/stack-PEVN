<template>
  <div>
    <div class="container animated zoomIn">
      <br>
      <br>
      <div>
          <div class="card-header" style="background-color:#FFD700; ">
            <h2 style="text-align:center; color:black;">
                <i class="fas fa-tools"></i>
                <i class="fas fa-clipboard-list"></i>
                Presupuesto {{presupuesto.id_presupuesto}}
             </h2>
          </div>
          <div class="modal-body" style="background-color:#f1f8e9;">
            <h4>
              <i class="fas fa-file-invoice-dollar"></i>
              Detalle del Presupuesto:</h4>
            <slot name="body">
               <hr>
               <b-row class="mb-1">
                 <b-col cols="3">Arreglo:</b-col>
                   <b-col>{{presupuesto.arreglo}}</b-col>
               </b-row>
               <hr>
               <b-row class="mb-1">
                 <b-col cols="3">Observacion:</b-col>
                   <b-col>{{presupuesto.observacion}}</b-col>
               </b-row>
               <hr>
               <b-row class="mb-1">
                 <b-col cols="3">precioTotal:</b-col>
                   <b-col>{{presupuesto.preciototal}}</b-col>
               </b-row>
               <hr>
            </slot>
          </div>
          </hr>
          <div class="modal-body" style="background-color:#f1f8e9;">
              <h4>
                <i class="fas fa-toolbox"></i>
                Presupuesto de Mano de Obra:</h4>
              <br>
                {{presupuesto.preciomanoobra}}
              <br>
          </div>
          <div class="modal-body" style="background-color:#f1f8e9;">
              <h4>
                <i class="fas fa-tools"></i>
                Lista de Repuestos Utilizados:</h4>
              <br>
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
                            <td scope="col">{{item.producto}}</td>
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
          <div class="modal-body" style="background-color:#f1f8e9;">
              <h4>
                <i class="fas fa-info-circle"></i>
                Estado del Presupuesto:</h4>
            <form @submit.prevent="cambiarEstado()">
              <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Estado</span>
                  </div>
                  <select required class="form-control" v-model="estado" placeholder="Elige un Tipo Producto">
                    <option value=""  disabled selected>Elige un Tipo Producto</option>
                    <option  v-for="item in estadoP">{{ item.name }}</option>
                 </select>
              </div>
              <div>
                <button class="btn btn-danger" v-on:click="eliminarPresupuesto(presupuesto.id_presupuesto)" title="Eliminar Cliente">
                    <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <div>
                <button type="submit" class="btn"  title="Guardar" >
                      <i class="far fa-save fa-1x"></i>
                      Guardar
                </button>
                <router-link to="/HomeArreglo" tag="button" class="btn"  title="Volver a HomeCliente" >
                    <i class="fas fa-arrow-left"></i>
                      Volver
                </router-link>
            </div>
          </form>
          </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import { imgData } from '../../assets/imagenPDF';
import { alertSucessDelete,alertSucessEstado} from '../../assets/sweetAlert.js';
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
      presupuestoProducto: '',
      estado: '',
      estadoP : [{name:"EN ESPERA"},
                       {name:"ACEPTADO"},
                       {name:"CANCELADO"}]
		}
  },
  computed:{

    },
  mounted(){
  },
  methods: {
    getPresupuesto(){
        axios.get('http://localhost:3000/presupuesto/'+this.idp).then((response) =>{
          this.presupuesto = response.data[0];
          console.log(this.presupuesto);
          this.estado = response.data[0].estado
          this.control(this.presupuesto.id_presupuesto)

        });
  },
    control(id){
      axios.get('http://localhost:3000/presupuestoProducto/'+id).then((response) =>{
        console.log(response.data)
        this.presupuestoProducto = response.data;
      })
    },
    eliminarPresupuesto(){
        axios.delete('http://localhost:3000/presupuesto/'+this.idp).then((data)=>{
          console.log(data)
          this.getArreglo()
        }).then(alertSucessDelete()).then(this.$router.push('/HomeArreglo'));
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
      }).then(alertSucessEstado());
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


.btn{
  background-color: #FFD700  !important;
  border-radius: 5px;
}

button:hover{
     background-color: white  !important;
     /*color: white;*/
}



</style>
