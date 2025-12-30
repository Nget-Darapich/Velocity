<script setup lang="ts">
import { Eye, Heart, ShoppingCart } from 'lucide-vue-next'
import { useProductStore } from '@/stores/store'
import { computed } from 'vue'

const props = defineProps<{
  productImg: string
  productName: string
  productPrice: string
  productId: string
}>()

const imageUrl = new URL(`../assets/images/${props.productImg}`, import.meta.url).href
const emit = defineEmits<{
  (e: 'quick-view', id: string): void
}>()

// Use the product store
const { toggleWishlist, isInWishlist } = useProductStore()

// Check if this product is in wishlist
const inWishlist = computed(() => isInWishlist(props.productId))

const openQuickView = () => {
  emit('quick-view', props.productId)
}

const handleWishlistClick = () => {
  toggleWishlist(props.productId)
}
</script>

<template>
  <div class="h-[455px] w-[231px] flex flex-col">
    <div
      class="h-80 flex justify-center bg-no-repeat bg-cover bg-center"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
    <div class="h-[135px] flex flex-col gap-2.5 pt-[5px] font-semibold">
      <p class="text-[#969494]">{{ props.productPrice }}</p>
      <h3 class="">{{ props.productName }}</h3>
      <div class="bg-[#C9C8CB] w-[231px] h-0.5"></div>
      <div class="flex text-center h-[26px] items-center">
        <ShoppingCart :size="24" class="cursor-pointer hover:text-gray-600 transition" />
        <p class="pt-0.5 pl-1 text-sm">ADD TO CART</p>
        <Heart 
          :size="24" 
          class="ml-auto cursor-pointer transition hover:scale-110"
          :class="inWishlist ? 'fill-red-500 text-red-500' : 'hover:text-red-500'"
          @click="handleWishlistClick"
        />
        <Eye 
          :size="24" 
          class="ml-4 cursor-pointer hover:text-gray-600 transition" 
          @click="openQuickView" 
        />
      </div>
    </div>
  </div>
</template>