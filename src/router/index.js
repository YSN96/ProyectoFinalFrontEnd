import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: () => import('../views/RegistrarView.vue')
  },
  {
    path: '/admin',
    name: 'vistaAdmin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/cliente',
    name: 'vistaCliente',
    component: () => import('../views/ClienteView.vue')
  },
  {
    path: '/perfil/:id',
    name: 'vistaPerfile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/update/:id',
    name: 'vistaUpdate',
    component: () => import('../views/UpdateView.vue')
  },
  {
    path: '/articulos',
    name: 'vistaArticulos',
    component: () => import('../views/ArticulosClienteView.vue')
  },
  {
    path: '/carrito',
    name: 'vistaCarrito',
    component: () => import('../views/CarritoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
