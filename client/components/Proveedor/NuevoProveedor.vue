<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
              <h3 style="text-align:center; color:white; "> Proveedor </h3>
            </div>
            <div class="card-body">
                  <form>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Dni</span>
                        </div>
                        <input required type="number" min="0"  class="form-control" placeholder="Ingrese Dni">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Nombre</span>
                        </div>
                        <input required  type="text"  class="form-control" placeholder="Ingrese Nombre">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Apellido</span>
                        </div>
                        <input required  type="text"  class="form-control" placeholder="Ingrese Apellido">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Direccion</span>
                        </div>
                        <input required type="text"  class="form-control" placeholder="Ingrese Direccion">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Telefono</span>
                        </div>
                        <input required type="number" min="0"  class="form-control" placeholder="Ingrese Telefono">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Mail</span>
                        </div>
                          <input required type="text"  class="form-control" placeholder="Ingrese Mail">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Descripcion</span>
                        </div>
                          <input required type="text"  class="form-control" placeholder="Ingrese Descripcion">
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Guardar"  class="btn float-right proveedor_btn">
                    </div>
              </form>

            </div>
        </div>
      </div>
    -->
  </div>
  </br>
  </div>
</template>

<script>

import axios from 'axios'

class Proveedor {
    constructor(id_proveedor,dni,nombre,apellido,direccion,telefono,mail,descripcion){
          this.id_cliente =  id_cliente,
          this.dni = dni,
          this.nombre = nombre,
          this.apellido = apellido,
          this.direccion = direccion,
          this.telefono = telefono,
          this.mail = mail,
          this.descripcion = descripcion
    }
}

export default {
  created(){

  },
  data () {
    return {
      datos: [],
      proveedor: new Proveedor
		}
  },
  mounted(){


  },
  methods: {

    }

}

</script>

<style>




/*
form input:focus:invalid{
       border:2px solid red;

}

form input:valid{
       border:2px solid green;

   }
*/

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
width: 450px;
background-color: rgba(0,0,0,0.5) !important;
}

.proveedor_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.proveedor_btn:hover{
color: black;
background-color: white;
}


</style>
