<template>
  <div v-if="brandExists">
    <p class="text-5xl underline underline-offset-5 text-center">
      BRAND {{ brandName.toUpperCase() }}
    </p>
    <div class="flex justify-center">
      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px] mt-10">
        <ProductCard
          v-for="item in currentProducts"
          :key="item.id"
          :product-id="item.id"
          :product-img="item.img"
          :product-name="item.name"
          :product-price="item.price"
          @quick-view="handleQuickView"
        />
      </div>
    </div>

    <QuickViewModal
      v-if="selectedProduct"
      :is-open="!!selectedProduct"
      :product="selectedProduct"
      @close="closeQuickView"
    />
  </div>
  
  <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <p class="text-4xl font-medium text-gray-600">Brand Not Found</p>
    <p class="text-lg text-gray-500">The brand "{{ brandName }}" does not exist.</p>
    <router-link to="/" class="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
      Back to Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// Import from store
import { productsByBrand, useProductStore, type BrandKey } from '@/stores/store'

const route = useRoute()

// Get brand name from route parameter
const brandName = computed(() => {
  return (route.params.brand as string) || ''
})

// Check if brand exists
const brandExists = computed(() => {
  const brand = brandName.value.toLowerCase() as BrandKey
  return brand in productsByBrand
})

// Get products for the current brand
const currentProducts = computed(() => {
  const brand = brandName.value.toLowerCase() as BrandKey
  return productsByBrand[brand] || []
})

// Use the store composable
const { selectedProduct, openQuickView, closeQuickView } = useProductStore()

// Handle quick view with proper brand name
const handleQuickView = (productId: string) => {
  // Capitalize first letter for display
  const capitalizedBrand = brandName.value.charAt(0).toUpperCase() + brandName.value.slice(1)
  openQuickView(productId, capitalizedBrand)
}
</script>