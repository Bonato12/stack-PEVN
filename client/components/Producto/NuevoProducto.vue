<template>
  <div>
    <br>
    <br>
    <div class="container">
        <div class="d-flex justify-content-left">
      		<div class="card animated fadeInDown">
        			<div class="card-header" style="background-color:#FFD700;">
                <h2 style="text-align:center; color:black;">
                  <i class="fas fa-mobile-alt"></i>
                   Nuevo Producto
                 </h2>
        			</div>
        			<div class="card-body" >
            				<form @submit.prevent="nuevoProducto()" style="width:780px; margin-top:-20px; margin:0px auto;">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Modelo</span>
              						</div>
              						<input type="text" v-model="producto.modelo" class="form-control" placeholder="Ingrese Modelo" :class="{ 'is-invalid': submitted && $v.producto.modelo.$error }">
            					    <div v-if="submitted && !$v.producto.modelo.required.$error" class="invalid-feedback">
                              <span v-if="!$v.producto.modelo.required">El modelo del producto es requerido</span>
                          </div>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Marca</span>
              						</div>
              						<input type="text" v-model="producto.marca" class="form-control" placeholder="Ingrese Marca" :class="{ 'is-invalid': submitted && $v.producto.marca.$error }">
            					    <div v-if="submitted && !$v.producto.marca.required.$error" class="invalid-feedback">
                              <span v-if="!$v.producto.marca.required">La marca del producto es requerida</span>
                          </div>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Descripcion</span>
              						</div>
              						<textarea type="text" v-model="producto.descripcion" class="form-control" placeholder="Ingrese Descripcion" :class="{ 'is-invalid': submitted && $v.producto.marca.$error }"></textarea>
            					    <div v-if="submitted && !$v.producto.descripcion.required.$error" class="invalid-feedback">
                              <span v-if="!$v.producto.descripcion.required">La descripcion del producto es requerida</span>
                              <span v-if="!$v.producto.descripcion.maxLength">La descripcion del producto no puede tener mas de 250 caracteres</span>
                          </div>
                      </div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Tipo </span>
              						</div>
                          <select class="form-control" v-model="producto.tipoProducto" placeholder="Elige un Tipo Producto" :class="{ 'is-invalid': submitted && $v.producto.tipoProducto.$error }">
                            <option  disabled selected>Elige un Tipo Producto</option>
                            <option  v-for="item in tipoProductos">{{ item.name }}</option>
                         </select>
                         <div v-if="submitted && !$v.producto.tipoProducto.required.$error" class="invalid-feedback">
                              <span v-if="!$v.producto.tipoProducto.required">El Tipo del producto es requerido</span>
                          </div>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Stock</span>
              						</div>
              						<input type="number" min="0" v-model.number="producto.stock" class="form-control" placeholder="Ingrese Stock" :class="{ 'is-invalid': submitted && $v.producto.stock.$error }">
            					    <div v-if="submitted && !$v.producto.stock.required.$error" class="invalid-feedback">
                              <span v-if="!$v.producto.stock.required">El stock del producto es requerido</span>
                              <span v-if="!$v.producto.stock.between">El stock del producto debe ser mayor que 0</span>
                          </div>
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Precio</span>
              						</div>
              						<input type="number" min="0" v-model="producto.precio" class="form-control" placeholder="Ingrese Precio":class="{ 'is-invalid': submitted && $v.producto.precio.$error }">
            					    <div v-if="submitted && !$v.producto.precio.required.$error" class="invalid-feedback">
                              <span v-if="!$v.producto.precio.required">El precio es requerido</span>
                              <span v-if="!$v.producto.precio.between">El precio debe ser mayor que 0</span>
                          </div>
                      </div>
                      <br>
                        <div class="d-flex justify-content-end">
                          <router-link class="btn" to="/HomeProducto" tag="button" title="Volver a HomeProducto">
                              <i class="fas fa-arrow-left"></i>
                                Volver
                          </router-link>
                         <button v-if="editProducto === false" type="submit" class="btn"  title="Guardar Cliente"  >
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                        <button v-if="editProducto === true" type="submit" class="btn"  title="Guardar Cliente"  >
                              <i class="far fa-save fa-1x"></i>
                              Editar
                        </button>
                      </div>
        				</form>
        			</div>
      		</div>
      	</div>
   </div>
  <br>
  </div>
</template>

<script>
import axios from 'axios'
import { alertSuccess, alertEditSuccess } from '../../assets/sweetAlert.js'
import Producto from '../../models/Producto';
import { required,between, minLength,maxLength } from "vuelidate/lib/validators";



export default {
  created(){
    if (this.idp){
        this.rellenarProducto();
    }
  },
  data () {
    return {
      idp: this.$route.params.id,
      producto:  new Producto(),
      submitted: false,
      errors: [],
      editProducto: false,
      tipoProductos : [{name:"Celular"},
                       {name:"Tablet"},
                       {name:"Accesorio"},
                       {name:"Laptop"},
                       {name:"Repuesto"},
                       {name:"Otros"}]
		}

  },
  validations: {
          producto: {
                modelo: { 
                  required,
                  maxLength: maxLength(50)  
                },
                marca:{
                   required,
                   maxLength: maxLength(50)  
                },
                descripcion:{
                   required,
                   maxLength: maxLength(250)  
                },
                tipoProducto:{
                   required,
                },
                stock:{
                  required,
                  between: between(1,1000000)
                },
                 precio:{
                  required,
                  between: between(1,1000000)
                }
            }
        },

  methods: {

      rellenarProducto(){
         this.editProducto = true;
         axios.get('http://localhost:3000/producto/'+this.idp).then((response) =>{
           console.log(response.data);
           this.producto = new Producto(this.idp,response.data[0].modelo,response.data[0].marca,response.data[0].descripcion,response.data[0].tipoproducto,response.data[0].stock,response.data[0].precio);
         }).catch(error=>{
           console.log(error);
         })
      },

      nuevoProducto(e){
                this.errors = [];
                this.submitted = true;
                this.$v.$touch();
                var _this = this;
                if (this.$v.$invalid) {
                    return;
                }
                 if  (this.editProducto == false){
                    axios.post('http://localhost:3000/producto',
                    this.producto, 
                    { headers: {
                      'Access-Control-Allow-Origin': 'http://localhost:3000/producto',
                      'Content-Type': 'application/json',
                    },
                    }).then(function(response){
                      console.log(response);
                      if (response.data == "OK"){
                        _this.producto = new Producto();
                        _this.submitted = false;
                        alertSuccess();
                      }else {
                        _this.errors.push(response.data.msg);
                      }
                    })
                }else{
                      axios.put('http://localhost:3000/producto/'+ this.idp,
                      this.producto,
                      { headers: {
                        'Content-Type': 'application/json',
                      }
                    }).then(function(response){
                      console.log(response);
                      if (response.data == "OK"){
                        alertEditSuccess();
                      }else {
                        _this.errors.push(response.data.msg);
                      }
                    }).catch(error=>{
                      console.log(error);
                    })
                }
            }
  }
}
</script>

<style scoped>

select{
  display: block !important;
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
width: 120px;
background-color: #FFD700;
color: black;
border: none;


}

.input-group{
  width: 700px;
}

input:focus{
  background-color: white;
}

.card{
height: auto;
margin-top: 50px;
margin-bottom: auto;
width: 1650px;
background-color: #2A363B;
border-radius: 5px;
border:1px solid;
margin:0 auto;
}

.but{
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
  color: black;
}

.btn{
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
  color: black;
}

button:hover{
     background-color: white  !important;
     color: black;
}

/*Sirve para desabilitar las flechas en los inputs numer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}


.form-control:focus{
    border: none;
    box-shadow: none;
    border-color: none;

}

.form-control{
    border: none;
    box-shadow: none;
    border-color: none;

}


.formulario{
    width: 1050px;
    height: auto;
    margin: 50px auto;
    display: flex;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;

}

/* Informacion de Contacto*/

.info::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #FEC404;
    opacity: 0.9;

}


/* Formulario de contacto*/
form{
    width: 62%;
    padding: 30px 40px;
}


</style>
