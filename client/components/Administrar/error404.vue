<template>
  <div id="app404">
      <h1 style="text-align:center; color:black;">.</h1>
      <h2 style="text-align:center; color:white;"> ERROR 404 PAGINA NO ENCONTRADA </h2>
  </br>
  </div>
</template>

<script>

import axios from 'axios'



export default {
  name: 'app',
  created(){

  },
  data () {
    return {

		}
  },
  mounted(){

  },




}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Numans');

#app404{
background-image: url('http://www.hdfondos.eu/pictures/2014/0219/1/orig_232602.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
background-color: #0C94F5;
background-blend-mode: multiply;
height: 660px;
margin-top: -78px;
}


 h2 {
  font-weight: normal;
  margin-top: 300px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
