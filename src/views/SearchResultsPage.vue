<template>
  <div>
    <p class="text-5xl font-medium text-center mb-4">Search Results</p>
    <p class="text-xl text-gray-600 text-center mb-10">
      {{ searchResults.length }} results for "{{ searchQuery }}"
    </p>

    <div v-if="searchResults.length > 0" class="flex justify-center">
      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px]">
        <ProductCard
          v-for="item in searchResults"
          :key="item.id"
          :product-id="item.id"
          :product-img="item.img"
          :product-name="item.name"
          :product-price="item.price"
          @view-detail="goToProductDetail(item.id)"
        />
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <p class="text-2xl font-medium text-gray-600">No products found</p>
      <p class="text-lg text-gray-500">Try searching with different keywords</p>
      <router-link to="/products" class="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
        View All Products
      </router-link>
    </div>

    <QuickViewModal />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/store'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const searchQuery = computed(() => route.query.q as string || '')

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  return productStore.searchProducts(searchQuery.value)
})

const goToProductDetail = (id: string) => {
  router.push({
    path: `/product/${id}`,
    query: { from: 'search', q: searchQuery.value }
  })
}
</script>