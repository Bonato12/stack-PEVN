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
import EditarVenta from './components/Venta/EditarVenta.vue'
import HomeProveedor from './components/Proveedor/HomeProveedor.vue'
import NuevoProveedor from './components/Proveedor/NuevoProveedor.vue'
import EditarProveedor from './components/Proveedor/EditarProveedor.vue'
import NuevoArreglo from './components/Arreglo/NuevaArreglo.vue'
import HomeArreglo from './components/Arreglo/HomeArreglo.vue'
import HomeCompra from './components/Compra/HomeCompra.vue'
import NuevaCompra from './components/Compra/NuevaCompra.vue'
import EditarCompra from './components/Compra/EditarCompra.vue'
import HomePresupuesto from './components/Presupuesto/HomePresupuesto.vue'
import NuevoPresupuesto from './components/Presupuesto/NuevoPresupuesto.vue'
import VerPresupuesto from './components/Presupuesto/VerPresupuesto.vue'
import Registrar from './components/Administrar/Registrar.vue'
import NotFound from './components/Administrar/error404.vue'
import HomeReparacion from './components/Reparacion/HomeReparacion.vue'
import EditarReparacion from './components/Reparacion/EditarReparacion.vue'

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
              name:'/HomeCliente',
              component: HomeCliente,
            },
            {
              path:'/NuevoCliente',
              name:'NuevoCliente',
              component: NuevoCliente
            },
            {
              path:'/EditarCliente/:id',
              name:'EditarCliente',
              component:EditarCliente
            },
            {
              path:'/Login',
              component:Login
            },
            {
              path: '/HomeProducto',
              name:'HomeProducto',
              component: HomeProducto,
            },
            {
              path:'/NuevoProducto',
              name: 'NuevoProducto',
              component: NuevoProducto
            },
            {
              path:'/EditarProducto/:id',
              name:'EditarProducto',
              component:EditarProducto
            },
            {
              path: '/HomeProveedor',
              name:'HomeProveedor',
              component: HomeProveedor,
            },
            {
              path: '/NuevoProveedor',
              name: 'NuevoProveedor',
              component: NuevoProveedor
            },
            {
              path: '/EditarProveedor/:id',
              name:'EditarProveedor',
              component: EditarProveedor
            },
            {
              path:'/HomeVenta',
              name:'HomeVenta',
              component: HomeVenta
            },
            {
              path:'/NuevaVenta',
              name: 'NuevaVenta',
              component: NuevaVenta
            },
            {
              path:'/EditarVenta/:id',
              name: 'EditarVenta',
              component: EditarVenta
            },
            {
              path:'/HomeCompra',
              name:'HomeCompra',
              component: HomeCompra
            },
            {
              path:'/NuevaCompra',
              name:'NuevaCompra',
              component: NuevaCompra
            },
            {
              path:'/EditarCompra/:id',
              name:'EditarCompra',
              component: EditarCompra
            },
            {
              path:'/HomeArreglo',
              name:'HomeArreglo',
              component: HomeArreglo
            },
            {
              path:'/NuevoArreglo',
              name:'NuevoArreglo',
              component: NuevoArreglo
            },
            {
              path:'/HomePresupuesto',
              component: HomePresupuesto
            },
            {
              path:'/NuevoPresupuesto/:id',
              name:'NuevoPresupuesto',
              component: NuevoPresupuesto
            },
            {
              path:'/VerPresupuesto/:id',
              component: VerPresupuesto
            },
            {
              path:'/HomeReparacion',
              component: HomeReparacion
            },
            {
              path:'/EditarReparacion/:id',
              component: EditarReparacion
            },
            {
              path: '*',
              component: NotFound,
            }
         ]
})

//rutas protegidas
rutas.beforeEach((to, from, next) => {
        let usuario = firebase.auth().currentUser;
        let autorizacion = to.matched.some(record => record.meta.autenticado);
        if(to.path != '/Login' && to.path != '/Registrar' && to.path != '*')  {
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
