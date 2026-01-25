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

        { path: 'wishlist', name: 'wishlist', component: () => import('@/views/WishlistPage.vue') },

        { path: 'product/:id', name: 'detail', component: () => import('@/views/ProductDetailPage.vue') },

        // PAGES (Footer links)
        { path: 'about', name: 'about', component: () => import('@/views/AboutPage.vue') },
        { path: 'faq', name: 'faq', component: () => import('@/views/FaqPage.vue') },
        { path: 'sitemap', name: 'sitemap', component: () => import('@/views/SitemapPage.vue') },
        { path: 'terms', name: 'terms', component: () => import('@/views/TermsPage.vue') },

        { path: 'contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
        { path: 'track-order', name: 'trackOrder', component: () => import('@/views/TrackOrderPage.vue') },
        { path: 'product-care', name: 'productCare', component: () => import('@/views/ProductCarePage.vue') },
        {
          path: 'shipping-returns',
          name: 'shippingReturns',
          component: () => import('@/views/ShippingReturnsPage.vue'),
        },

        {
          path: 'products',
          name: 'product',
          component: () => import('@/layouts/ProductLayout.vue'),
          children: [
            {
              path: '',
              name: 'products',
              component: () => import('@/views/ProductPage.vue'),
            },

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
                const brand = to.params.brand as string
                if (!validBrands.includes(brand.toLowerCase())) {
                  return { name: 'products' }
                }
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
                const category = to.params.category as string
                if (!validCategories.includes(category)) {
                  return { name: 'products' }
                }
              },
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

    // Admin side
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