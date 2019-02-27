import HomeCliente from './components/Cliente/HomeCliente.vue'
import NuevoCliente from './components/Cliente/NuevoCliente.vue'
import EditarCliente from './components/Cliente/EditarCliente.vue'
import Login from './components/Administrar/Login.vue'
import Home from './components/Administrar/Home.vue'
import EditarProducto from './components/Producto/EditarProducto.vue'
import HomeProducto from './components/Producto/HomeProducto'
import NuevoProducto from './components/Producto/NuevoProducto.vue'
import HomeVenta from './components/Venta/HomeVenta.vue'
import NuevaVenta from './components/Venta/NuevaVenta.vue'
import HomeProveedor from './components/Proveedor/HomeProveedor.vue'
import NuevoProveedor from './components/Proveedor/NuevoProveedor.vue'
import EditarProveedor from './components/Proveedor/EditarProveedor.vue'
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
              path:'/HomeCliente/NuevoCliente',
              component: NuevoCliente
            },
            {
              path:'/EditarCliente/:id',
              component:EditarCliente},
            {
              path:'/Login',
              component:Login
            },
            {
              path: '/HomeProducto',
              component: HomeProducto,
            },
            {
              path:'/HomeProducto/NuevoProducto',
              component: NuevoProducto
            },
            {
              path:'/EditarProducto/:id',
              component:EditarProducto
            },
            {
              path: '/HomeProveedor',
              component: HomeProveedor,
            },
            {
              path: '/NuevoProveedor',
              component: NuevoProveedor
            },
            {
              path: '/EditarProveedor/:id',
              component: EditarProveedor
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
