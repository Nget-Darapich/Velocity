<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold tracking-wide">PRODUCT</h1>

      <div class="flex items-center gap-3">
        <button
          class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Product
        </button>

        <select
          class="border rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option>May 2025</option>
          <option>April 2025</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '@/stores/store'
import ProductCard from '@/components/admin/ProductCard.vue'

const productStore = useProductStore()

//Use products from Pinia
const products = computed(() => productStore.allProducts)

</script>
