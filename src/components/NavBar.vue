<script setup lang="ts">
import { ChevronDown, Search, ShoppingCart, User } from 'lucide-vue-next'
import SearchComponent from '@/components/SearchComponent.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// State for dropdown visibility
const showCategoryDropdown = ref(false)
const showBrandDropdown = ref(false)
const isSearchOpen = ref(false)

// Functions to toggle dropdowns
function toggleCategoryDropdown(show: boolean) {
  showCategoryDropdown.value = show
}

function toggleBrandDropdown(show: boolean) {
  showBrandDropdown.value = show
}

const closeOnEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isSearchOpen.value = false
}
onMounted(() => window.addEventListener('keydown', closeOnEscape))
onUnmounted(() => window.removeEventListener('keydown', closeOnEscape))
</script>

<template>
  <div class="h-[120px] mx-[60px] flex flex-col-3 items-center justify-between gap-[295px]">
    <img src="@/assets/images/velocity_logo.png" alt="" />
    <div class="grid grid-cols-5 gap-[39px]">
      <router-link to="/" class="text-[24px] w-fit">Home</router-link>
      <router-link to="/products" class="text-[24px] w-fit">Product</router-link>
      
      <!-- Category Dropdown -->
      <div
        class="relative"
        @mouseenter="toggleCategoryDropdown(true)"
        @mouseleave="toggleCategoryDropdown(false)"
      >
        <router-link to="#" class="text-[24px] w-fit flex items-center">
          Category <chevron-down :size="24" />
        </router-link>

        <div
          v-if="showCategoryDropdown"
          class="absolute top-full left-0 bg-white shadow-lg rounded-md p-6 w-[800px] grid grid-cols-4 gap-x-8 gap-y-4 z-50"
        >
          <router-link 
            to="/products/category/athleticFootwear" 
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Athletic Footwear
          </router-link>
          <router-link
            to="/products/category/luxuryLeatherShoes"
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Luxury Leather Shoes
          </router-link>
          <router-link
            to="/products/category/sustainableFootwear"
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Sustainable Footwear
          </router-link>
          <router-link 
            to="/products/category/sandalsAndslides" 
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Sandals & Slides
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
          Brand <chevron-down :size="24" />
        </router-link>

        <div
          v-if="showBrandDropdown"
          class="absolute top-full left-0 bg-white shadow-lg rounded-md p-6 w-[300px] grid grid-cols-3 gap-x-8 gap-y-4 z-50"
        >
          <router-link 
            to="/products/nike" 
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Nike
          </router-link>
          <router-link 
            to="/products/vans" 
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Vans
          </router-link>
          <router-link 
            to="/products/adidas" 
            class="w-fit font-medium flex items-center hover:text-gray-600"
          >
            Adidas
          </router-link>
        </div>
      </div>
      
      <router-link to="/#" class="text-[24px] w-fit">About us</router-link>
    </div>
    
    <div class="grid grid-cols-3 gap-[38.5px]">
      <search :size="24" @click="isSearchOpen = true" aria-label="Open search" class="cursor-pointer" />
      <router-link to="/#">
        <shopping-cart :size="24" />
      </router-link>
      <router-link to="/#">
        <user :size="24" />
      </router-link>
    </div>
    
    <Teleport to="body" v-if="isSearchOpen">
      <div
        class="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm p-4"
        @click="isSearchOpen = false"
      >
        <div @click.stop class="w-full max-w-[500px]">
          <SearchComponent />
        </div>
      </div>
    </Teleport>
  </div>
</template>