<script setup lang="ts">
import { Eye, Heart, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/store' //

const props = defineProps<{
  productImg: string
  productName: string
  productPrice: string
  productId: string
}>()

const cart = useCartStore()
const { toggleWishlist, isInWishlist } = useProductStore() //

const imageUrl = new URL(`../assets/images/${props.productImg}`, import.meta.url).href
const emit = defineEmits<{
  (e: 'quick-view', id: string): void
}>()

const openQuickView = () => {
  emit('quick-view', props.productId)
}

const addToCart = () => {
  cart.addToCart({
    id: Number(props.productId),
    name: props.productName,
    price: Number(props.productPrice.replace('$', '')),
    img: props.productImg,
  })
}
</script>

<template>
  <div class="h-[455px] w-[231px] flex flex-col">
    <div
      class="h-80 flex justify-center bg-no-repeat"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
    <div class="h-[135px] flex flex-col gap-2.5 pt-[5px] font-semibold">
      <p class="text-[#969494]">{{ props.productPrice }}</p>
      <h3 class="">{{ props.productName }}</h3>
      <div class="bg-[#C9C8CB] w-[231px] h-0.5"></div>
      <div class="flex text-center h-[26px]">
        <div class="flex cursor-pointer" @click="addToCart">
           <ShoppingCart :size="24" />
           <p class="pt-0.5 pl-1">ADD TO CART</p>
        </div>

        <Heart 
          :size="24" 
          class="ml-auto cursor-pointer transition-colors" 
          :class="{ 'fill-red-500 text-[#992020]': isInWishlist(props.productId) }"
          @click="toggleWishlist(props.productId)" 
        />
        
        <Eye :size="24" class="ml-4 cursor-pointer" @click="openQuickView" />
      </div>
    </div>
  </div>
</template>