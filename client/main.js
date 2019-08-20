import Vue from 'vue'
import App from './App.vue'
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
import Datepicker from 'vuejs-datepicker';
import { firebase } from './firebase.js'
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Snotify);
Vue.use(VueGoodTablePlugin);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);
Vue.component('datepicker', Datepicker)
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
