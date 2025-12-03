import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProductPage from '@/views/ProductPage.vue'
import AppLayout from '@/layouts/AppLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AppLayout,
      children: [
        {
          path: '/',
          component: HomePage
        },
        {
          path: 'products',
          component: ProductPage
        },
        // {
        //   path: 'categories',
        //   component: CategoryPage
        // },
        // {
        //   path: 'brands',
        //   component: BrandPage
        // },
        // {
        //   path: 'aboutus',
        //   component: AboutusPage
        // }
      ]
    },
  ],
})

export default router
