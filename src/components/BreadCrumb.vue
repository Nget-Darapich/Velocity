<template>
  <div class="flex items-center gap-x-2 text-lg font-medium mt-5 whitespace-nowrap">
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link
        v-if="index < breadcrumbs.length - 1"
        :to="crumb.path"
        class="hover:text-blue-600"
      >
        {{ crumb.name }}
      </router-link>
      <span v-else class="text-[#992020]">
        {{ crumb.name }}
      </span>
      <span v-if="index < breadcrumbs.length - 1" class="mx-2">></span>
    </span>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Map router names to Display Names
const breadcrumbMap: Record<string, string> = {
  home: 'Home',
  products: 'Products',
  wishlist: 'Wishlist',
  Cart: 'Shopping Cart',
  Checkout: 'Checkout',
  login: 'Login',
  signup: 'Sign Up',
  detail: 'Product Detail'
}

// const breadcrumbs = computed(() => {
//   const crumbs = [{ name: 'Home', path: '/' }]

//   const routeName = route.name?.toString() || ''

//   // If we are on the Home page, don't add anything else
//   if (routeName === 'home') return crumbs

//   // 1. Handle Dynamic Brand Path (Home > Nike)
//   if (routeName === 'brand' && route.params.brand) {
//     crumbs.push({
//       name: route.params.brand.toString().toUpperCase(),
//       path: route.path
//     })
//   }

//   // 2. Handle Dynamic Category Path (Home > Athletic Footwear)
//   else if (routeName === 'category' && route.params.category) {
//     const catName = route.params.category.toString()
//       .replace(/([A-Z])/g, ' $1') // Adds spaces to camelCase
//       .trim()

//     crumbs.push({
//       name: catName.charAt(0).toUpperCase() + catName.slice(1),
//       path: route.path
//     })
//   }
//   // 3. Static routes - FIXED HERE
//   else if (routeName in breadcrumbMap) {
//     crumbs.push({
//       // Use fallback || '' to ensure the type is always 'string'
//       name: breadcrumbMap[routeName] || routeName,
//       path: route.path
//     })
//   }

//   return crumbs
// })
const breadcrumbs = computed(() => {
  const crumbs = [{ name: 'Home', path: '/' }]

  const routeName = route.name?.toString() || ''
  const from = route.query.from?.toString()

  // If we are on the Home page, stop here
  if (routeName === 'home') return crumbs

  // PRODUCT DETAIL (SPECIAL CASE)
  if (routeName === 'detail') {
    // Home > Product Detail
    if (from === 'home' || !from) {
      crumbs.push({
        name: 'Product Detail',
        path: route.path,
      })
      return crumbs
    }

    // Products > Product Detail
    if (from === 'products' || from === 'product') {
      crumbs.push({
        name: 'Products',
        path: '/products',
      })
      crumbs.push({
        name: 'Product Detail',
        path: route.path,
      })
      return crumbs
    }

    // Brand > Product Detail
    if (from === 'brand' && route.query.brand) {
      crumbs.push({
        name: 'Products',
        path: '/products',
      })
      crumbs.push({
        name: route.query.brand.toString().toUpperCase(),
        path: `/products/${route.query.brand}`,
      })
      crumbs.push({
        name: 'Product Detail',
        path: route.path,
      })
      return crumbs
    }

    // Category > Product Detail
    if (from === 'category' && route.query.category) {
      const cat = route.query.category.toString()
      const catName = cat.replace(/([A-Z])/g, ' $1').trim()

      crumbs.push({
        name: 'Products',
        path: '/products',
      })
      crumbs.push({
        name: catName.charAt(0).toUpperCase() + catName.slice(1),
        path: `/products/category/${cat}`,
      })
      crumbs.push({
        name: 'Product Detail',
        path: route.path,
      })
      return crumbs
    }
  }

  // BRAND PAGE
  if (routeName === 'brand' && route.params.brand) {
    crumbs.push({
      name: 'Products',
      path: '/products',
    })
    crumbs.push({
      name: route.params.brand.toString().toUpperCase(),
      path: route.path,
    })
    return crumbs
  }

  // CATEGORY PAGE
  if (routeName === 'category' && route.params.category) {
    const cat = route.params.category.toString()
    const catName = cat.replace(/([A-Z])/g, ' $1').trim()

    crumbs.push({
      name: 'Products',
      path: '/products',
    })
    crumbs.push({
      name: catName.charAt(0).toUpperCase() + catName.slice(1),
      path: route.path,
    })
    return crumbs
  }


  // STATIC ROUTES
  if (routeName in breadcrumbMap) {
    crumbs.push({
      name: breadcrumbMap[routeName] || routeName,
      path: route.path,
    })
  }

  return crumbs
})

</script>
