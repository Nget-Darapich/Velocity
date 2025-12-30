import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
        { path: 'cart', name: 'Cart', component: () => import('@/views/CartPage.vue') },
        { path: 'checkout', name: 'Checkout', component: () => import('@/views/CheckoutPage.vue') },
        { 
          path: 'wishlist', 
          name: 'wishlist', 
          component: () => import('@/views/WishlistPage.vue') 
        },
        { 
          path: 'products', 
          name: 'product',
          component: () => import('@/layouts/ProductLayout.vue'),
          children: [
            { 
              path: '', 
              name: 'products', 
              component: () => import('@/views/ProductPage.vue')
            },
            // Single dynamic brand route instead of 3 separate routes
            { 
              path: ':brand', 
              name: 'brand', 
              component: () => import('@/views/BrandPage.vue'),
              // Optional: Add validation to ensure brand exists
              beforeEnter: (to) => {
                const validBrands = ['nike', 'vans', 'adidas']
                const brand = to.params.brand as string
                if (!validBrands.includes(brand.toLowerCase())) {
                  return { name: 'products' } // Redirect to products page if invalid brand
                }
              }
            },
            // Single dynamic category route instead of 4 separate routes
            { 
              path: 'category/:category', 
              name: 'category', 
              component: () => import('@/views/CategoryPage.vue'),
              // Optional: Add validation to ensure category exists
              beforeEnter: (to) => {
                const validCategories = ['athleticFootwear', 'luxuryLeatherShoes', 'sustainableFootwear', 'sandalsAndslides']
                const category = to.params.category as string
                if (!validCategories.includes(category)) {
                  return { name: 'products' }
                }
              }
            },
          ],
        },
      ],
    },

    {
      path: '/auth',
      component: () => import('@/layouts/LoginSignupLayout.vue'),
      children: [
        { path: 'login', name: 'login', component: () => import('@/views/LoginPage.vue') },
        { path: 'signup', name: 'signup', component: () => import('@/views/SignupPage.vue') },
      ],
    },
  ],
})

export default router