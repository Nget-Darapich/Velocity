<template>
  <div>
    <!-- Image Box -->
    <div class="relative bg-[#DEE3F1] rounded-xl h-[230px] flex items-center justify-center">
      <img :src="product.image" class="max-h-[140px] object-contain" />

      <!-- Actions -->
      <div class="absolute top-3 right-3 flex flex-col gap-2">
        <button class="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
          🤍
        </button>
        <button class="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
          👁️
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="mt-4 space-y-1">
      <p class="font-semibold">{{ product.name }}</p>

      <div class="flex items-center gap-3">
        <span class="text-orange-500 font-semibold">${{ product.price }}</span>
        <span class="text-gray-400 line-through text-sm"> ${{ product.oldPrice }} </span>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-2 text-sm">
        <div class="text-orange-400">★★★★★</div>
        <span class="text-gray-500">({{ product.reviews }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  product: {
    name: string
    image: string
    price: number
    oldPrice: number
    rating: number
    reviews: number
  }
}>()
</script>
