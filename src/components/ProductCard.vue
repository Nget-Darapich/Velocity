<script setup lang="ts">
import { Eye, Heart, ShoppingCart } from 'lucide-vue-next';

const props = defineProps<{
  productImg: string
  productName: string
  productPrice: string
}>()

const imageUrl = new URL(`../assets/images/${props.productImg}`, import.meta.url).href
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
        <ShoppingCart :size="24" class=" cursor-pointer" />
        <p class="pt-0.5 pl-1">ADD TO CART</p>
        <Heart :size="24" class="ml-auto cursor-pointer" />
        <Eye :size="24" class="ml-4 cursor-pointer" />
      </div>
    </div>
  </div>
</template>
