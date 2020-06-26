import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/priority',
    name: 'Priority',
    component: () => import(/* webpackChunkName: "about" */ '../views/Priority.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/add',
    name: 'Add Product',
    component: () => import(/* webpackChunkName: "about" */ '../views/Add.vue')
  },
  {
    path: '/new',
    name: 'New Product',
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
