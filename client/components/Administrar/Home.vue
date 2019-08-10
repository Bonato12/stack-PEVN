<template>
  <div id="app">
    <img src="../../assets/LogoTelnovo.png" class="img">
  <br>
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

<style>

@import url('https://fonts.googleapis.com/css?family=Numans');

body,html{
  background-color: #2A363B;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
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

.img{
display:block;
margin:auto;
margin-top:200px;

}

</style>
