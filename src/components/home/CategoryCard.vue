<script setup lang="ts">   
const props = defineProps<{
    categoryImg: string;
    categoryName: string;
}>();
const imageUrl = new URL(`../../assets/images/${props.categoryImg}`, import.meta.url).href
</script>
<template>
    <div class="w-[231px] h-80 flex justify-center" 
    :style="{ backgroundImage: `url(${imageUrl})` }">
        <div class="bg-white text-black mt-[210px] w-[150px] h-[70px] flex items-center justify-center font-medium">
            <span class="text-center">{{props.categoryName}}</span>
        </div>
    </div>
</template>