import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2';
import rutas from './routes.js';
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import {store} from './store.js';



Vue.use(VueGoodTablePlugin);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);
Vue.use(firebase);


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgYzb7QqHY1VvHEGOnetz_DT7ejV2Mq_c",
    authDomain: "ionic-3e984.firebaseapp.com",
    databaseURL: "https://ionic-3e984.firebaseio.com",
    projectId: "ionic-3e984",
    storageBucket: "ionic-3e984.appspot.com",
    messagingSenderId: "199930820105"
  };
  firebase.initializeApp(config);

  Vue.component('modal', {
    template: '#modal-template'
  })


firebase.auth().onAuthStateChanged((user)=>{
  new Vue({
    el: '#app',
    router: rutas,
    store,
    render: h => h(App)
  })
});
