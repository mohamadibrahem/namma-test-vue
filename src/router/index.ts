import { createRouter, createWebHistory } from 'vue-router'

import InvoicesIndex from '@/components/Invoices/Index.vue'
import InvoicesCreate from '@/components/Invoices/create.vue'

import ProductsIndex from '@/components/Products/Index.vue'
import ProductsCreate from '@/components/Products/create.vue'
import ProductsUpdate from '@/components/Products/edit.vue'


const routes = [
  { 
    path: '/', 
    component: InvoicesIndex,
    name:'InvoicesIndex'
  },
  { 
    path: '/create-invoice', 
    component: InvoicesCreate,
    name:'InvoicesCreate'
  },
  { 
    path: '/products', 
    component: ProductsIndex,
    name:'ProductsIndex'
  },
  { 
    path: '/create-product', 
    component: ProductsCreate,
    name:'ProductsCreate'
  },
  { 
    path: '/update-product/:id', 
    component: ProductsUpdate,
    name:'ProductsUpdate'
  },
  
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
/*
routes.beforeEach((to, from, next) => {
    var loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.auth)) {
        if (!loggedIn) {
            next({ name: 'login' })
        } else {
            next() // go to wherever I'm going
        }
    }else{
        next()
    }
})
*/