<script setup lang="ts">
import WishlistCard from '@/components/WishlistCard.vue'
import { useProductStore, useCartStore } from '@/stores/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { Heart } from 'lucide-vue-next'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

// Convert price string to number (e.g., "$25.00" -> 25)
const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace('$', ''))
}

// Calculate total - access through productStore
const totalPrice = computed(() => {
  return productStore.wishlistItems.reduce((sum, item) => sum + parsePrice(item.price), 0)
})

const handleRemove = (productId: string) => {
  productStore.removeFromWishlist(productId)
}

const handleAddToCart = (productId: string) => {
  const item = productStore.wishlistItems.find((i) => i.id === productId)
  if (item) {
    cartStore.addToCart({
      id: item.id,
      name: item.name,
      price: parsePrice(item.price),
      img: item.img,
      size: item.size,
      quantity: 1,
    })
    // Optionally remove from wishlist after adding to cart
    productStore.removeFromWishlist(productId)
  }
}

const goToProducts = () => {
  router.push('/products')
}

const moveAllToCart = () => {
  // Create a copy of the items to avoid mutation during iteration
  const itemsToMove = [...productStore.wishlistItems]

  itemsToMove.forEach((item) => {
    cartStore.addToCart({
      id: item.id,
      name: item.name,
      price: parsePrice(item.price),
      img: item.img,
      size: item.size,
      quantity: 1,
    })
  })

  // Clear the wishlist using the store method
  productStore.clearWishlist()
}
</script>

<template>
  <div class="px-[62px]">
    <BreadCrumb class="pb-10" />
    <!-- Empty State -->
    <div v-if="productStore.wishlistItems.length === 0" class="text-center py-20 pl-0">
      <div class="mb-6">
        <Heart class="mx-auto text-gray-400" :size="48" />
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
          v-for="item in productStore.wishlistItems"
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
      <div
        class="max-w-[900px] bg-gray-50 border border-gray-200 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,0.15)] p-6 mt-6"
      >
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-semibold">Total Items:</span>
          <span class="text-lg">{{ productStore.wishlistItems.length }}</span>
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
