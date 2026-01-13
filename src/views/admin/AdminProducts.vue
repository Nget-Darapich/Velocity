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
import ProductCard from "@/components/admin/ProductCard.vue";

const products = [
  {
    id: 1,
    name: "Nike Running Shoes",
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png",
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65
  },
  {
    id: 2,
    name: "Nike Running Shoes",
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png",
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65
  },
  {
    id: 3,
    name: "Nike Running Shoes",
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png",
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65
  }
];
</script>
