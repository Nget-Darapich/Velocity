<template>
  <div class="flex items-center text-2xl w-[260px] mt-5 font-medium text-[18px]">
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
  signup: 'Sign Up'
}

const breadcrumbs = computed(() => {
  const crumbs = [{ name: 'Home', path: '/' }]

  const routeName = route.name?.toString() || ''
  
  // If we are on the Home page, don't add anything else
  if (routeName === 'home') return crumbs

  // 1. Handle Dynamic Brand Path (Home > Nike)
  if (routeName === 'brand' && route.params.brand) {
    crumbs.push({ 
      name: route.params.brand.toString().toUpperCase(), 
      path: route.path 
    })
  } 
  
  // 2. Handle Dynamic Category Path (Home > Athletic Footwear)
  else if (routeName === 'category' && route.params.category) {
    const catName = route.params.category.toString()
      .replace(/([A-Z])/g, ' $1') // Adds spaces to camelCase
      .trim()
    
    crumbs.push({ 
      name: catName.charAt(0).toUpperCase() + catName.slice(1), 
      path: route.path 
    })
  }
  // 3. Static routes - FIXED HERE
  else if (routeName in breadcrumbMap) {
    crumbs.push({
      // Use fallback || '' to ensure the type is always 'string'
      name: breadcrumbMap[routeName] || routeName,
      path: route.path
    })
  }

  return crumbs
})
</script>