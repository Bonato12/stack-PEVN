import HomeCliente from './components/Cliente/HomeCliente.vue'
import NuevoCliente from './components/Cliente/NuevoCliente.vue'
import Login from './components/Administrar/Login.vue'
import Home from './components/Administrar/Home.vue'
import Editar from './components/Cliente/EditarCliente.vue'
import HomeProducto from './components/Producto/HomeProducto'
import NuevoProducto from './components/Producto/NuevoProducto.vue'
import HomeVenta from './components/Venta/HomeVenta.vue'
import NuevaVenta from './components/Venta/NuevaVenta.vue'
import Registrar from './components/Administrar/Registrar.vue'
import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
Vue.use(firebase);


const rutas = new VueRouter({
            routes: [
            {
              path:'/Home',
              component:Home,
            },
            {
              path:'/Registrar',
              component:Registrar,
            },
            {
              path:'/HomeCliente',
              component: HomeCliente,
            },
            {
              path:'/NuevoCliente',
              component: NuevoCliente
            },
            {
              path:'/EditarCliente/:id',
              component:Editar},
            {
              path:'/Login',
              component:Login
            },
            {
              path: '/HomeProducto',
              component: HomeProducto,
            },
            {
              path:'/NuevoProducto',
              component: NuevoProducto
            },
            {
              path:'/HomeVenta',
              component: HomeVenta
            },
            {
              path:'/NuevaVenta',
              component: NuevaVenta
            }
         ]
})

//rutas protegidas
rutas.beforeEach((to, from, next) => {
    let usuario = firebase.auth().currentUser;
    console.log(usuario);
    let autorizacion = to.matched.some(record => record.meta.autenticado);
    if(to.path != '/Login' && to.path != '/Registrar')  {
        if (autorizacion && !usuario){
            next(false);
        }else if(!autorizacion && usuario){
            next();
        }
    }else{
      next();
    }
})




export default rutas;
