<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold tracking-wide">PRODUCT</h1>

      <div class="flex items-center gap-3">
        <button
          @click="show = true"
          class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Product
        </button>
        <!-- <button class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
          Add Product
        </button> -->
        <AddProductModal :open="show" @close="show = false" />
        <select class="border rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>May 2025</option>
          <option>April 2025</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCard v-for="product in products" :key="product.id" :product="{ ...product, price: String(product.price) }" />
    </div>
  </div>
</template>

<!-- <script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/store'
import ProductCard from '@/components/admin/ProductCard.vue'
import AddProductModal from '@/components/admin/AddProductModal.vue'

const productStore = useProductStore()
const show = ref(false)

//Use products from Pinia
const products = computed(() => productStore.allProducts)
//const products = computed(() => store.adminProducts)

</script> -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/store'
import ProductCard from '@/components/admin/ProductCard.vue'
import AddProductModal from '@/components/admin/AddProductModal.vue'

const productStore = useProductStore()
const show = ref(false)

// ✅ Admin sees existing + newly added products
const products = computed(() => productStore.adminProducts)
</script>
