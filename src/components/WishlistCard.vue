<script setup lang="ts">
import { Trash2, ShoppingCart } from 'lucide-vue-next'

const props = defineProps<{
  productImg: string
  productName: string
  color: string
  size: string | number
  price: number
  tax?: number
  productId: string
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
  (e: 'add-to-cart', id: string): void
}>()

const imageUrl = new URL(
  `../assets/images/${props.productImg}`,
  import.meta.url
).href

const removeItem = () => {
  emit('remove', props.productId)
}

const addToCart = () => {
  emit('add-to-cart', props.productId)
}
</script>

<template>
  <div
    class="w-full max-w-[900px] h-[180px] bg-white border-gray-50 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,0.15)] px-6 py-4 flex items-center gap-6"
  >
    <!-- Product Image -->
    <img
      :src="imageUrl"
      alt="product image"
      class="w-20 h-20 object-contain"
    />

    <!-- Product Info -->
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ productName }}</h3>
      <div class="text-sm text-gray-500 flex gap-6 mt-1">
        <p>Color: {{ color }}</p>
        <p>Size: {{ size }}</p>
      </div>
    </div>

    <!-- Price -->
    <div class="text-right min-w-[150px]">
      <p class="text-green-600 font-semibold">
        ${{ price.toFixed(2) }}
      </p>
      <p v-if="tax" class="text-gray-400 text-sm">
        / ${{ tax.toFixed(2) }} Tax
      </p>
      <p class="font-semibold mt-1">
        Total: ${{ price.toFixed(2) }}
      </p>
    </div>

    <!-- Actions -->
    <div class="flex flex-col gap-3 items-end">
      <button
        class="flex items-center gap-2 text-red-500 text-sm hover:underline"
        @click="removeItem"
      >
        <Trash2 :size="16" />
        Remove
      </button>

      <button
        class="flex items-center gap-2 text-sm font-semibold hover:text-green-600"
        @click="addToCart"
      >
        <ShoppingCart :size="18" />
        Add to Cart
      </button>
    </div>
  </div>
</template>
