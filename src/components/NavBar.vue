<script setup lang="ts">
import { ChevronDown, Search, ShoppingCart, User } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import SearchComponent from '@/components/SearchComponent.vue'

/** dropdown states */
const showCategoryDropdown = ref(false)
const showBrandDropdown = ref(false)

/** search modal */
const isSearchOpen = ref(false)

/** cart store */
const cart = useCartStore()

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
  <div class="h-[120px] mx-[60px] flex items-center justify-between">
    <!-- Logo -->
    <img src="@/assets/images/velocity_logo.png" alt="Velocity" />

    <!-- Nav links -->
    <div class="flex items-center gap-10">
      <router-link to="/" class="text-[24px] w-fit">Home</router-link>
      <router-link to="/products" class="text-[24px] w-fit">Product</router-link>

      <!-- Category Dropdown -->
      <div
        class="relative"
        @mouseenter="toggleCategoryDropdown(true)"
        @mouseleave="toggleCategoryDropdown(false)"
      >
        <span class="text-[24px] w-fit flex items-center gap-1 cursor-pointer">
          Category <ChevronDown :size="24" />
        </span>

        <div
          v-if="showCategoryDropdown"
          class="absolute top-full left-0 bg-white shadow-lg rounded-md p-6 w-[800px] grid grid-cols-4 gap-x-8 gap-y-4 z-50"
        >
          <router-link
            to="/products/category/athleticFootwear"
            class="w-fit font-medium hover:text-gray-600"
          >
            Athletic Footwear
          </router-link>

          <router-link
            to="/products/category/luxuryLeatherShoes"
            class="w-fit font-medium hover:text-gray-600"
          >
            Luxury Leather Shoes
          </router-link>

          <router-link
            to="/products/category/sustainableFootwear"
            class="w-fit font-medium hover:text-gray-600"
          >
            Sustainable Footwear
          </router-link>

          <router-link
            to="/products/category/sandalsAndslides"
            class="w-fit font-medium hover:text-gray-600"
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
        <span class="text-[24px] w-fit flex items-center gap-1 cursor-pointer">
          Brand <ChevronDown :size="24" />
        </span>

        <div
          v-if="showBrandDropdown"
          class="absolute top-full left-0 bg-white shadow-lg rounded-md p-6 w-[300px] grid grid-cols-3 gap-x-8 gap-y-4 z-50"
        >
          <router-link to="/products/nike" class="w-fit font-medium hover:text-gray-600">
            Nike
          </router-link>
          <router-link to="/products/vans" class="w-fit font-medium hover:text-gray-600">
            Vans
          </router-link>
          <router-link to="/products/adidas" class="w-fit font-medium hover:text-gray-600">
            Adidas
          </router-link>
        </div>
      </div>

      <router-link to="/#" class="text-[24px] w-fit">About us</router-link>
    </div>

    <!-- Icons -->
    <div class="flex items-center gap-8">
      <Search
        :size="24"
        @click="isSearchOpen = true"
        aria-label="Open search"
        class="cursor-pointer"
      />

      <router-link to="/cart" class="relative w-fit" aria-label="Cart">
        <ShoppingCart :size="24" />
        <span
          v-if="cart.totalItems > 0"
          class="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full border bg-white"
        >
          {{ cart.totalItems }}
        </span>
      </router-link>

      <router-link to="/#" aria-label="User">
        <User :size="24" />
      </router-link>
    </div>

    <!-- Search modal -->
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
