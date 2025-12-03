<script setup lang="ts">
import { Search, ShoppingCart, User } from 'lucide-vue-next';
</script>
<template>
    <div class="h-[120px] mx-[60px] flex flex-col-3 items-center justify-between gap-[295px]">
        <img src="@/assets/images/velocity_logo.png" alt="" />
        <div class="grid grid-cols-5 gap-[39px]">
            <router-link to="/" class="text-[24px]">Home</router-link>
            <router-link to="/products" class="text-[24px]">Product</router-link>
            <router-link to="/#" class="text-[24px]">Category</router-link>
            <router-link to="/#" class="text-[24px]">Brand</router-link>
            <router-link to="/#" class="text-[24px]">About us</router-link>
        </div>
        <div class="grid grid-cols-3 gap-[38.5px]">
            <router-view to="/#">
                <search :size="24" />
            </router-view>
            <router-link to="/#">
                <shopping-cart :size="24" />
            </router-link>
            <router-link to="/#">
                <user :size="24" />
            </router-link>
        </div>
    </div>
</template>