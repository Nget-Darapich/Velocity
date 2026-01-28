<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/stores/store'

const props = defineProps<{
  product: Product
}>()

const imageUrl = computed(() => {
  const img = props.product.img

  //  Base64 image (uploaded by admin)
  if (img.startsWith('data:image')) {
    return img
  }

  //  Static asset image
  try {
    return new URL(`../../assets/images/${img}`, import.meta.url).href
  } catch {
    return ''
  }
})
</script>

<template>
  <div>
    <!-- Image Box -->
    <div class="relative bg-[#DEE3F1] rounded-xl h-[230px] flex items-center justify-center">
      <img v-if="imageUrl" :src="imageUrl" class="max-h-[140px] object-contain" />
      <div v-else class="text-gray-400 text-sm">No Image</div>

      <!-- Actions -->
      <div class="absolute top-3 right-3 flex flex-col gap-2">
        <!-- <button class="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
          ✏️
        </button>
        <button class="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
          🗑️
        </button> -->
      </div>
    </div>

    <!-- Info -->
    <div class="mt-4 space-y-1">
      <p class="font-semibold">{{ product.name }}</p>

      <div class="flex items-center gap-3">
        <span class="text-orange-500 font-semibold">
          {{ product.price }}
        </span>
      </div>
    </div>
  </div>
</template>
