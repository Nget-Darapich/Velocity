<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/store'

const router = useRouter()
const productStore = useProductStore()

const searchQuery = ref('')
const isFocused = ref(false)

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return []
  return productStore.searchProducts(searchQuery.value)
})

const clearSearch = () => {
  searchQuery.value = ''
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'searchResults',
      query: { q: searchQuery.value }
    })
    searchQuery.value = ''
  }
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

const goToProductDetail = (productId: string) => {
  router.push({
    name: 'detail',
    params: { id: productId },
    query: {
      from: 'search',
    }
  })
  searchQuery.value = ''
}

const getImageUrl = (img: string) => {
  return new URL(`../assets/images/${img}`, import.meta.url).href
}
</script>

<template>
  <div class="relative w-full max-w-[500px] mx-auto mt-4">
    <p class="text-gray-400 text-sm mb-1">Find yourself a perfect pair!</p>

    <div class="relative flex items-center border rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
      <input
        v-model="searchQuery"
        @focus="isFocused = true"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search Products..."
        class="flex-1 px-4 py-2 outline-none text-base"
      />

      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="px-2 text-gray-400 hover:text-gray-600 transition"
        aria-label="Clear search"
      >
        <X />
      </button>

      <button
        @click="handleSearch"
        class="px-3 py-2 transition"
        :class="{ 'text-gray-400 hover:text-gray-600': isFocused }"
        aria-label="Search"
      >
        <Search class="text-gray-400 hover:text-gray-600" />
      </button>
    </div>

    <div
      v-if="searchQuery && filteredProducts.length > 0 && isFocused"
      class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto"
    >
      <div class="p-2 space-y-2">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer transition rounded"
          @click="goToProductDetail(product.id)"
        >
          <img
            :src="getImageUrl(product.img)"
            :alt="product.name"
            class="w-12 h-12 object-cover rounded"
          />
          <div class="flex-1">
            <div class="font-medium text-sm">{{ product.name }}</div>
            <div class="text-xs text-gray-500">{{ product.price }}</div>
            <div class="text-xs text-gray-400" v-if="product.brand">{{ product.brand }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="searchQuery && filteredProducts.length === 0 && isFocused"
      class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-3 text-sm text-gray-500"
    >
      No products found.
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #9ca3af;
  opacity: 1;
}
</style>