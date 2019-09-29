<template>
  <div>
    <br>
    <br>
    <div class="container">
      <div class="d-flex justify-content-left">
        <div class="card animated fadeInDown">
            <div class="card-header" style="background-color:#FFD700;">
              <h2 style="text-align:center; color:black;">
                  <i class="fas fa-user"></i>
                  Cliente
               </h2>
            </div>
            <FormularioCliente></FormularioCliente>
        </div>
      </div>
  </div>
</div>
</template>

<script>

import FormularioCliente from "./Formulario.vue";

export default {
  created(){
   
  },
  data () {
    return {
      
    }
  },
  components: {
      FormularioCliente
  },
}

</script>

<style scoped>

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



/*Sirve para desabilitar las flechas en los inputs numBer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

form {
    width: 62%;
    padding: 30px 40px;
}

</style>
