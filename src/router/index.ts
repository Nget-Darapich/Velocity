// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0, behavior: 'smooth' }
  },

  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
        { path: 'cart', name: 'Cart', component: () => import('@/views/CartPage.vue') },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/CheckoutPage.vue'),
          beforeEnter: () => {
            const cart = useCartStore()
            if (!cart.items.length) {
              return { name: 'Cart' }
            }
            return true
          },
        },
        { path: 'wishlist', name: 'wishlist', component: () => import('@/views/WishlistPage.vue') },
        { path: 'product/:id', name: 'detail', component: () => import('@/views/ProductDetailPage.vue') },
        { path: 'about', name: 'about', component: () => import('@/views/AboutPage.vue') },
        { path: 'faq', name: 'faq', component: () => import('@/views/FaqPage.vue') },
        { path: 'sitemap', name: 'sitemap', component: () => import('@/views/SitemapPage.vue') },
        { path: 'terms', name: 'terms', component: () => import('@/views/TermsPage.vue') },
        { path: 'contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
        { path: 'track-order', name: 'trackOrder', component: () => import('@/views/TrackOrderPage.vue') },
        { path: 'product-care', name: 'productCare', component: () => import('@/views/ProductCarePage.vue') },
        { path: 'shipping-returns', name: 'shippingReturns', component: () => import('@/views/ShippingReturnsPage.vue') },
        {
          path: 'products',
          component: () => import('@/layouts/ProductLayout.vue'),
          children: [
            { path: '', name: 'products', component: () => import('@/views/ProductPage.vue') },
            { path: 'filtered', name: 'filteredProducts', component: () => import('@/views/FilteredProductsPage.vue') },
            { path: 'search', name: 'searchResults', component: () => import('@/views/SearchResultsPage.vue') },
            {
              path: ':brand',
              name: 'brand',
              component: () => import('@/views/BrandPage.vue'),
              beforeEnter: (to) => {
                const validBrands = ['nike', 'vans', 'adidas']
                const brand = String(to.params.brand || '').toLowerCase()
                if (!validBrands.includes(brand)) return { name: 'products' }
                return true
              },
            },
            {
              path: 'category/:category',
              name: 'category',
              component: () => import('@/views/CategoryPage.vue'),
              beforeEnter: (to) => {
                const validCategories = ['athleticFootwear', 'luxuryLeatherShoes', 'sustainableFootwear', 'sandalsAndslides']
                const category = String(to.params.category || '')
                if (!validCategories.includes(category)) return { name: 'products' }
                return true
              },
            },
          ],
        },
      ],
    },

    // Auth routes - redirect to home if already logged in
    {
      path: '/auth',
      component: () => import('@/layouts/LoginSignupLayout.vue'),
      beforeEnter: () => {
        const auth = useAuthStore()
        if (auth.isAuthenticated) {
          return { name: 'home' }
        }
        return true
      },
      children: [
        { path: 'login', name: 'login', component: () => import('@/views/LoginPage.vue') },
        { path: 'signup', name: 'signup', component: () => import('@/views/SignupPage.vue') },
      ],
    },

    // Admin routes - require admin authentication
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      beforeEnter: () => {
        const auth = useAuthStore()
        
        // Check if user is authenticated and is admin
        if (!auth.isAuthenticated) {
          return { name: 'login', query: { redirect: '/admin' } }
        }
        
        if (!auth.isAdmin) {
          // Logged in but not admin - redirect to home
          return { name: 'home' }
        }
        
        return true
      },
      children: [
        { path: '', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'products', component: () => import('@/views/admin/AdminProducts.vue') },
        { path: 'inventory', component: () => import('@/views/admin/AdminInventory.vue') },
        { path: 'category', component: () => import('@/views/admin/AdminProducts.vue') },
        { path: 'orders', component: () => import('@/views/admin/AdminOrders.vue') },
        { path: 'purchases', component: () => import('@/views/admin/AdminPurchases.vue') },
        { path: 'invoices', component: () => import('@/views/admin/AdminInvoices.vue') },
      ],
    },
  ],
})

// Initialize auth store before each route
router.beforeEach(() => {
  const auth = useAuthStore()
  auth.init()
})

export default router