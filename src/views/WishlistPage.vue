<script setup lang="ts">
import WishlistCard from '@/components/WishlistCard.vue'
import { useProductStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BreadCrumb from '@/components/BreadCrumb.vue'

const router = useRouter()
const { wishlistItems, removeFromWishlist } = useProductStore()
const cartStore = useCartStore()

// Convert price string to number (e.g., "$25.00" -> 25)
const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace('$', ''))
}

// Calculate total
const totalPrice = computed(() => {
  return wishlistItems.value.reduce((sum, item) => sum + parsePrice(item.price), 0)
})

const handleRemove = (productId: string) => {
  removeFromWishlist(productId)
}

const handleAddToCart = (productId: string) => {
  // Implement add to cart functionality here
  console.log('Add to cart:', productId)
  // You might want to show a toast notification here
}

const goToProducts = () => {
  router.push('/products')
}

const moveAllToCart = () => {
  wishlistItems.value.forEach((item) => {
    cartStore.addToCart({
      id: Number(item.id),
      name: item.name,
      // Use your existing parsePrice helper
      price: parsePrice(item.price), 
      img: item.img,
      size: item.size,
      quantity: 1
    })
  })
  // Clear the wishlist after moving
  wishlistItems.value = []
}
</script>

<template>
  <div class="px-[62px]">
    <BreadCrumb class="pb-10" />
    <!-- Empty State -->
    <div v-if="wishlistItems.length === 0" class="text-center py-20 pl-0">
      <div class="mb-6">
        <svg 
          class="w-24 h-24 mx-auto text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
      <p class="text-gray-500 mb-6">Start adding products you love to your wishlist!</p>
      <button
        @click="goToProducts"
        class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Browse Products
      </button>
    </div>

    <!-- Wishlist Items -->
    <div v-else>
      <div class="flex flex-col gap-4 mb-8">
        <WishlistCard
          v-for="item in wishlistItems"
          :key="item.id"
          :product-id="item.id"
          :product-img="item.img"
          :product-name="item.name"
          :color="item.color"
          :size="item.size"
          :price="parsePrice(item.price)"
          @remove="handleRemove"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <!-- Summary -->
      <div class="max-w-[900px] bg-gray-50 border border-gray-200 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,0.15)] p-6 mt-6">
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-semibold">Total Items:</span>
          <span class="text-lg">{{ wishlistItems.length }}</span>
        </div>
        <div class="flex justify-between items-center text-xl font-bold">
          <span>Total Price:</span>
          <span class="text-green-600">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <button
          class="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
          @click="moveAllToCart"
        >
          Move All to Cart
        </button>
      </div>
    </div>
  </div>
</template>