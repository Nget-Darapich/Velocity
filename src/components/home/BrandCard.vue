<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next';

const props = defineProps<{
    brandImg: string;
    brandName: string;
}>();
const imageUrl = new URL(`../../assets/images/${props.brandImg}`, import.meta.url).href
</script>
<template>
    <div class="w-[231px] h-[250px] flex justify-center bg-no-repeat bg-center" 
    :style="{ backgroundImage: `url(${imageUrl})` }">
        <div class="pt-[221px] w-[350px] h-[250px] flex items-center justify-center font-medium">
            <p class="text-center flex gap-[7px] text-white">
                <span>{{props.brandName}}</span>
                <MoveRight />
                <span>Shop Now</span>
            </p>
        </div>
    </div>
</template>