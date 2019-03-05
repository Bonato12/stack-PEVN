<template>
  <div id="app">
    <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-5">
          <div class="card">
            <div class="card-header">
              <h3 style="color:white; text-align:center"> Editar Producto </h3>
            </div>
            <div class="card-body animated fadeInDown">
                  <form @submit.prevent="editarProducto()">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Modelo</span>
                        </div>
                        <input required type="text" v-model="producto.modelo" class="form-control" placeholder="Ingrese Modelo">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Marca</span>
                        </div>
                        <input required type="text" v-model="producto.marca" class="form-control" placeholder="Ingrese Modelo">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Descripcion</span>
                        </div>
                        <textarea required type="text" v-model="producto.descripcion" class="form-control" placeholder="Ingrese Descripcion"></textarea>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Tipo Producto</span>
                        </div>
                        <select required class="form-control" v-model="producto.tipoProducto">
                          <option disabled>Elige un Tipo Producto</option>
                          <option v-for="item in tipoProductos">{{ item.name }}</option>
                       </select>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Stock</span>
                        </div>
                        <input required type="number" min="0" v-model="producto.stock" class="form-control" placeholder="Ingrese Stock">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Precio</span>
                        </div>
                        <input required type="number" min="0" v-model="producto.precio" class="form-control" placeholder="Ingrese Precio">
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Modificar"  class="btn float-right editarProducto_btn">
                        <router-link to="/HomeProducto" tag="button" class="btn flaot-right" style="background:white; margin-left:195px;">
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
import Producto from '../../models/Producto';


export default {
  name: 'app',
  created(){
    this.rellenarProducto();
  },
  data () {
    return {
      idp: this.$route.params.id,
      datos: [],
      producto:  new Producto(),
      tipoProductos : [{name:"Celular"},
                       {name:"Tablet"},
                       {name:"Accesorio"},
                       {name:"Televisor"},
                       {name:"Laptop"},
                       {name:"Otros"}]
		         }
	},
  mounted(){

  },
  methods: {
    rellenarProducto(){
       axios.get('http://localhost:3000/producto/'+this.idp).then((response) =>{
         console.log(response.data);
         this.producto = new Producto(this.idp,response.data[0].modelo,response.data[0].marca,response.data[0].descripcion,response.data[0].tipoproducto,response.data[0].stock,response.data[0].precio);
     })
   },

   editarProducto(){
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
         'El Producto ha sido Editado!',
         'success'
       ).then(axios.put('http://localhost:3000/producto/'+ this.idp,
            this.producto,
            { headers: {
                'Content-Type': 'application/json',
            }
          }));
       }
     });

 }
}
}
</script>

<style scoped>
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
width: 450px;
background-color: rgba(0,0,0,0.5) !important;
}

.editarProducto_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.editarProducto_btn:hover{
color: black;
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

a {
  color: #42b983;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

form input:focus:invalid{
    background: url('http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/32/red-ok-icon.png') no-repeat 95% 50%;
    background-color: white;
}


form input:required:focus:valid{
  background: url('http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/32/green-ok-icon.png') no-repeat 95% 50%;
  background-color: white;

}

</style>
