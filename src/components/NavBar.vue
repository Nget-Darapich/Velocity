<script setup lang="ts">
import { ChevronDown, Search, ShoppingCart, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

// dropdown states
const showCategoryDropdown = ref(false)
const showBrandDropdown = ref(false)

// cart store
const cart = useCartStore()

function toggleCategoryDropdown(show: boolean) {
  showCategoryDropdown.value = show
}

function toggleBrandDropdown(show: boolean) {
  showBrandDropdown.value = show
}
</script>

<template>
    <div class="h-[120px] mx-[60px] flex flex-col-3 items-center justify-between gap-[295px]">
        <img src="@/assets/images/velocity_logo.png" alt="" />
        <div class="grid grid-cols-5 gap-[39px]">
            <router-link to="/" class="text-[24px] w-fit">Home</router-link>
            <router-link to="/products" class="text-[24px] w-fit">Product</router-link>
            <div
        class="relative"
        @mouseenter="toggleCategoryDropdown(true)"
        @mouseleave="toggleCategoryDropdown(false)"
      >
        <router-link to="#" class="text-[24px] w-fit flex items-center">
          Category  <chevron-down :size="24"/>
        </router-link>

        <!-- Dropdown Menu -->
        <div
          v-if="showCategoryDropdown"
          class="absolute top-full left-0 bg-white shadow-lg rounded-md p-6 w-[800px] grid grid-cols-4 gap-x-8 gap-y-4 z-50"
        >

            <router-link to="#" class="w-fit font-medium flex items-center">
                Athletic Footwear
            </router-link>
            <router-link to="#" class="w-fit font-medium flex items-center">
                Luxury Leather Shoes
            </router-link>
            <router-link to="#" class="w-fit font-medium flex items-center">
                Athletic Footwear
            </router-link>
            <router-link to="#" class="w-fit font-medium flex items-center">
                Sandals & Slide
            </router-link>
        </div>
      </div>

      <!-- Brand Dropdown -->
      <div
        class="relative"
        @mouseenter="toggleBrandDropdown(true)"
        @mouseleave="toggleBrandDropdown(false)"
      >
        <router-link to="#" class="text-[24px] w-fit flex items-center">
          Brand  <chevron-down :size="24"/>
        </router-link>

        <!-- Placeholder for Brand Dropdown -->
        <div
          v-if="showBrandDropdown"
          class="absolute top-full left-0 bg-white shadow-lg rounded-md p-6 w-[300px] grid grid-cols-3 gap-x-8 gap-y-4 z-50"
        >
            <router-link to="#" class="w-fit font-medium flex items-center">
                Nike
            </router-link>
            <router-link to="#" class="w-fit font-medium flex items-center">
                Vans
            </router-link>
            <router-link to="#" class="w-fit font-medium flex items-center">
                Adidas
            </router-link>
        </div>
      </div>
            <router-link to="/#" class="text-[24px] w-fit">About us</router-link>
        </div>
        <div class="grid grid-cols-3 gap-[38.5px]">
            <router-link to="/#">
                <search :size="24" />
            </router-link>
            <router-link to="/cart" class="relative w-fit">
              <shopping-cart :size="24" />

              <!-- cart count badge (placeholder) -->
              <span
                v-if="cart.totalItems > 0"
                class="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full border"
              >
                {{ cart.totalItems }}
              </span>
            </router-link>

            <router-link to="/#">
                <user :size="24" />
            </router-link>
        </div>
    </div>
</template>
