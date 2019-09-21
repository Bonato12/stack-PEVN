<template>
  <div id="HomeCompra">
    <div class="container">
      <hr>
      <canvas id="pie-chart" width="800" height="450"></canvas>
   </div>
</div>
</template>

<script>

export default {
  name: 'HomeCompra',
  created(){
    this.getCompra();
  },
  data () {
    return {
     
		}
  },
  computed:{

    },
  mounted(){
        this.verChart();

  },
  methods: {
   
    verChart(){
          new Chart(document.getElementById("pie-chart"), {
                type: 'pie',
                data: {
                  labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                  datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: [2478,5267,734,784,433]
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                  }
                }
            });
    }
}
}
</script>

<style scoped>
#HomeCompra {
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




</style>
