<template>
  <div id="app">
    <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-header">
              <h3 style="text-align:center; color:white;"> Editar Proveedor </h3>
            </div>
            <div class="card-body">
                  <form @submit.prevent="editarProveedor()">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input required type="number" min="0" v-model="proveedor.dni" class="form-control" placeholder="Ingrese Dni">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input required  type="text" v-model="proveedor.nombre" class="form-control" placeholder="Ingrese Nombre">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input required  type="text" v-model="proveedor.apellido" class="form-control" placeholder="Ingrese Apellido">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input required type="text" v-model="proveedor.direccion" class="form-control" placeholder="Ingrese Direccion">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input required type="number" min="0" v-model="proveedor.telefono" class="form-control" placeholder="Ingrese Telefono">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                          <input required type="text" v-model="proveedor.mail" class="form-control" placeholder="Ingrese Mail">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Descripcion</span>
                        </div>
                        <input required type="text" v-model="proveedor.descripcion" class="form-control" placeholder="Ingrese Ciudad">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn float-right buttonProveedor">
                              <i class="far fa-save fa-1x"></i>
                              Modificar
                        </button>
                        <router-link to="/HomeProveedor" tag="button" class="btn" style="background:white; margin-left:128px;">
                            <i class="fas fa-arrow-left"></i>
                              Volver
                        </router-link>
                    </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </br>
  </div>
</template>

<script>

import axios from 'axios'
import Proveedor from '../../models/Proveedor';


export default {
  name: 'app',
  created(){
    this.rellenarProveedor();
  },
  data () {
    return {
      idp: this.$route.params.id,
      datos: [],
      proveedor:  new Proveedor(),
		}
  },
  mounted(){

  },
  methods: {
    rellenarProveedor(){
       console.log(this.idp);
       axios.get('http://localhost:3000/proveedor/'+this.idp).then((response) =>{
         console.log(response.data);
         this.proveedor = new Proveedor(this.idp,response.data[0].dni,response.data[0].nombre,response.data[0].apellido,response.data[0].direccion,response.data[0].telefono,response.data[0].mail,response.data[0].descripcion);
     });
   },

     editarProveedor(){
           this.$swal({
           title: 'Seguro que desea Editar?',
           text: "No podra recuperar los datos!",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Si, Editar'
           }).then((result) => {
           if (result.value) {
             this.$swal(
               'Editado!',
               'El Proveedor ha sido Editado!',
               'success'
             ).then(axios.put('http://localhost:3000/proveedor/'+ this.idp,
                  this.proveedor,
                  { headers: {
                      'Content-Type': 'application/json',
                  }
                }))
              }
           })
   }
}
}
</script>

<style>

form input:focus:invalid{
    background: url('http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/32/red-ok-icon.png') no-repeat 95% 50%;
    background-color: white;
}


form input:required:focus:valid{
  background: url('http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/32/green-ok-icon.png') no-repeat 95% 50%;
  background-color: white;

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

.input-group-prepend span{
width: auto;
background-color: #FFC312;
color: black;
border:0 !important;
}

.card{
height: auto;
margin-top: 30px;
margin-bottom: auto;
width: 410px;
background-color: rgba(0,0,0,0.5) !important;
}


</style>
