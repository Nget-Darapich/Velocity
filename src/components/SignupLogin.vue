
<script setup lang="ts">
    import { Facebook, Instagram, Twitter } from 'lucide-vue-next';
</script>
<template>
    <div class="bg-[#F3F3F3] px-[60px] flex flex-col-2 items-center justify-between border border-y-[#969494] border-x-[#F3F3F3] h-[30px]">
        <span class="text-[14px] w-fit">1d delivery available!</span>
        <div class="grid grid-cols-2 gap-10 w-fit">
            <div class="grid grid-cols-2 gap-1">
                <router-link to="/#">Signup /</router-link>
                <router-link to="/#">Login</router-link>
            </div>
            <div class="grid grid-cols-3 gap-5 items-center justify-center">
                <Facebook :size="18" class="ml-1.5"/>
                <Twitter :size="18" class="ml-1.5" />
                <Instagram :size="18" class="ml-1.5"/>
            </div>
        </div>
    </div>
</template>
