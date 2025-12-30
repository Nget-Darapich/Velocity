import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/views/HomePage.vue') },
        { path: 'products', name: 'Products', component: () => import('@/views/ProductPage.vue') },
        { path: 'cart', name: 'Cart', component: () => import('@/views/CartPage.vue') },

      ],
    },

    {
      path: '/auth',
      component: () => import('@/layouts/LoginSignupLayout.vue'),
      children: [
        { path: 'login', name: 'Login', component: () => import('@/views/LoginPage.vue') },
        { path: 'signup', name: 'Signup', component: () => import('@/views/SignupPage.vue') },
      ],
    },
  ],
})

export default router
