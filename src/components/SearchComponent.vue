<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { ref, computed } from 'vue'
const mockProducts = [
  { id: 1, name: 'High-Top Canvas Sneakers', price: 25.00, image: 'https://via.placeholder.com/80/ddd/333?text=HT' },
  { id: 2, name: 'Classic White Tennis Sneakers', price: 25.00, image: 'https://via.placeholder.com/80/eee/222?text=CW' },
  { id: 3, name: 'Running Shoes Pro', price: 49.99, image: 'https://via.placeholder.com/80/ccc/444?text=RP' },
  { id: 4, name: 'Casual Slip-Ons', price: 19.99, image: 'https://via.placeholder.com/80/aaa/555?text=CS' },
]

const searchQuery = ref('')
const isFocused = ref(false)

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(q)
  )
})

const clearSearch = () => {
  searchQuery.value = ''
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // In real app: $router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}
</script>

<template>
  <div class="relative w-full max-w-[500px] mx-auto mt-4">
    <p class="text-gray-400 text-sm mb-1">Find yourself a perfect pair!</p>

    <div class="relative flex items-center border rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
      <input
        v-model="searchQuery"
        @focus="isFocused = true"
        @blur="isFocused = false"
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
      v-if="searchQuery && filteredProducts.length > 0"
      class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto"
    >
      <div class="p-2 space-y-2">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer transition"
          @click="searchQuery = product.name; handleSearch()"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-10 h-10 object-cover rounded"
          />
          <div class="flex-1">
            <div class="font-medium text-sm">{{ product.name }}</div>
            <div class="text-xs text-gray-500">${{ product.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="searchQuery && filteredProducts.length === 0"
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