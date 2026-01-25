<template>
  <div>
    <p class="text-5xl underline underline-offset-5 text-center">
      Filtered Products
    </p>
    
    <div v-if="filteredProducts.length > 0" class="flex justify-center">
      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px] mt-10">
        <ProductCard
          v-for="item in filteredProducts"
          :key="item.id"
          :product-id="item.id"
          :product-img="item.img"
          :product-name="item.name"
          :product-price="item.price"
          @quick-view="handleQuickView"
        />
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p class="text-4xl font-medium text-gray-600">No Products Found</p>
      <p class="text-lg text-gray-500">Try adjusting your filters to see more results.</p>
      <router-link to="/products" class="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
        Back to All Products
      </router-link>
    </div>

    <QuickViewModal
      v-if="selectedProduct"
      :is-open="!!selectedProduct"
      :product="selectedProduct"
      @close="closeQuickView"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { computed } from 'vue'
import { useProductStore } from '@/stores/store'

const productStore = useProductStore()

// Get filtered products based on current filters
const filteredProducts = computed(() => {
  return productStore.getFilteredProducts(productStore.currentFilters)
})

// Use the store composable
const { selectedProduct, openQuickView, closeQuickView } = useProductStore()

// Handle quick view
const handleQuickView = (productId: string) => {
  openQuickView(productId)
}
</script>