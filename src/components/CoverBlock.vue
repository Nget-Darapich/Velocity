<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next';

</script>
<template>
    <div class="h-[844px] bg-cover bg-center bg-no-repeat bg-[url('@/assets/images/cover.png')]
    flex flex-row text-white">
        <div class="w-1/2"></div>
        <div class="flex flex-col pt-[167px] ml-20">
            <p class="text-[24px] font-medium ml-1">Step Into Style</p>
            <h1 class="pt-5 text-[64px] w-[600px]">Discover The Latest Trends In Footwear</h1>
            <p class="pt-5 text-[24px] font-medium w-[485px] ml-1">From classic sneakers to trendy boots, our collection has something for everyone.</p>
            <button class="bg-[#992020] text-white text-[24px] flex gap-2 items-center justify-center w-[180px] h-[70px] mt-10"><span>Shop Now</span> <MoveRight />  </button> 
        </div>
    </div>
</template>