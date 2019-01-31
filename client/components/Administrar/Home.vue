<template>
  <div id="app">

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

<style>

@import url('https://fonts.googleapis.com/css?family=Numans');

body{
background-image: url('./background.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
background-color: #0C94F5;
background-blend-mode: multiply;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'Numans', sans-serif;
  color: white;
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

</style>
