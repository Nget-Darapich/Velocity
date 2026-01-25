import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // always scroll to top when navigating (footer links, pages, etc.)
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

        // KEEP ONLY ONE checkout route (with guard)
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/CheckoutPage.vue'),
          beforeEnter: () => {
            const cart = useCartStore()
            if (!cart.items.length) {
              return { name: 'Cart' } // redirect if empty
            }
            return true
          },
        },

        { path: 'wishlist', name: 'wishlist', component: () => import('@/views/WishlistPage.vue') },
        { path: 'product/:id', name: 'detail', component: () => import('@/views/ProductDetailPage.vue') },

        // Footer pages
        { path: 'about', name: 'about', component: () => import('@/views/AboutPage.vue') },
        { path: 'faq', name: 'faq', component: () => import('@/views/FaqPage.vue') },
        { path: 'sitemap', name: 'sitemap', component: () => import('@/views/SitemapPage.vue') },
        { path: 'terms', name: 'terms', component: () => import('@/views/TermsPage.vue') },
        { path: 'contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
        { path: 'track-order', name: 'trackOrder', component: () => import('@/views/TrackOrderPage.vue') },
        { path: 'product-care', name: 'productCare', component: () => import('@/views/ProductCarePage.vue') },
        { path: 'shipping-returns', name: 'shippingReturns', component: () => import('@/views/ShippingReturnsPage.vue') },

        // Products layout
        {
          path: 'products',
          component: () => import('@/layouts/ProductLayout.vue'),
          children: [
            { path: '', name: 'products', component: () => import('@/views/ProductPage.vue') },

            // filtered products route
            {
              path: 'filtered',
              name: 'filteredProducts',
              component: () => import('@/views/FilteredProductsPage.vue'),
            },

            // search results route
            {
              path: 'search',
              name: 'searchResults',
              component: () => import('@/views/SearchResultsPage.vue'),
            },

            // brand route
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

            // category route
            {
              path: 'category/:category',
              name: 'category',
              component: () => import('@/views/CategoryPage.vue'),
              beforeEnter: (to) => {
                const validCategories = [
                  'athleticFootwear',
                  'luxuryLeatherShoes',
                  'sustainableFootwear',
                  'sandalsAndslides',
                ]
                const category = String(to.params.category || '')
                if (!validCategories.includes(category)) return { name: 'products' }
                return true
              },
            },
          ],
        },
      ],
    },

    // Auth
    {
      path: '/auth',
      component: () => import('@/layouts/LoginSignupLayout.vue'),
      children: [
        { path: 'login', name: 'login', component: () => import('@/views/LoginPage.vue') },
        { path: 'signup', name: 'signup', component: () => import('@/views/SignupPage.vue') },
      ],
    },

    // Admin
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
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

export default router