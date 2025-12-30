<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import promoIcon from '@/assets/images/promo-icon.png'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const promo = ref('CODE123')

// placeholder values (same as screenshot)
const discount = computed(() => 8)
const shipping = computed(() => 4)
const total = computed(() => cart.subtotal - discount.value + shipping.value)

const clearCart = () => {
  // ✅ requires cart.clearCart() action in store
  cart.clearCart()
}

const applyPromo = () => {
  console.log('Apply promo:', promo.value)
}

const getItemImage = (img: string) => {
  // Vite-safe way (no import.meta inside template)
  return new URL(`../assets/images/${img}`, import.meta.url).href
}

const goToProducts = () => {
  router.push('/products')
}

const goToCheckout = () => {
  router.push('/checkout')
}

// qty controls (id + size)
const increaseQty = (id: number, size: string | undefined, currentQty: number) => {
  cart.updateQuantity(id, size, currentQty + 1)
}

const decreaseQty = (id: number, size: string | undefined, currentQty: number) => {
  if (currentQty <= 1) {
    cart.removeItem(id, size)
    return
  }
  cart.updateQuantity(id, size, currentQty - 1)
}

// wishlist (simple localStorage demo)
const wishlistIds = ref<number[]>(JSON.parse(localStorage.getItem('wishlistIds') || '[]'))

const addToWishlist = (id: number) => {
  if (!wishlistIds.value.includes(id)) {
    wishlistIds.value.push(id)
    localStorage.setItem('wishlistIds', JSON.stringify(wishlistIds.value))
    alert('Added to wishlist!')
  } else {
    alert('Already in wishlist!')
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- TITLE + BREADCRUMB -->
    <div class="px-[60px] pt-8">
      <h1 class="text-[38px] font-semibold text-[#222]">Order Cart</h1>

      <div class="mt-2 text-[13px]">
        <span class="text-[#111]">Home</span>
        <span class="mx-2 text-[#444]">&gt;</span>
        <span class="text-[#FF8000]">My Cart</span>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="px-[60px] pt-10 pb-16">
      <div class="grid grid-cols-12 gap-10">
        <!-- LEFT SIDE -->
        <div class="col-span-7 space-y-10">
          <!-- SHOPPING CART BAR -->
          <div class="rounded-[10px] bg-[#FF8000] px-6 py-4 flex items-center justify-between">
            <div>
              <p class="text-[16px] font-semibold text-white">Shopping cart</p>
              <p class="text-[12px] text-white/90 mt-1">
                You have {{ cart.totalItems }} item<span v-if="cart.totalItems !== 1">s</span> in your cart
              </p>
            </div>

            <button class="text-[12px] text-white underline" @click="clearCart">
              Clear cart
            </button>
          </div>

          <!-- CART ITEMS -->
          <div class="space-y-12">
            <div
              v-for="item in cart.items"
              :key="`${item.id}-${item.size || ''}`"
              class="bg-white rounded-[10px] border border-[#E9E9E9] shadow-[0_6px_14px_rgba(0,0,0,0.15)]"
            >
              <div class="p-6 flex gap-6 items-start">
                <img
                  :src="getItemImage(item.img)"
                  alt="Product"
                  class="w-[70px] h-[70px] rounded-md object-cover shrink-0"
                />

                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="font-semibold text-[14px] text-[#222]">
                        {{ item.name }}
                      </p>

                      <div class="mt-2 flex gap-10 text-[10px] text-[#777]">
                        <span>Color: Sky</span>
                        <span>Size: {{ item.size || '-' }}</span>
                      </div>
                    </div>

                    <div class="text-right">
                      <p class="text-[10px] text-[#777]">Item Price</p>
                      <p class="text-[12px] mt-1">
                        <span class="text-[#1AA35B] font-semibold">${{ item.price }}</span>
                        <span class="text-[#999]"> / $3.00 Tax</span>
                      </p>
                    </div>
                  </div>

                  <!-- ACTIONS -->
                  <div class="mt-6 flex items-center justify-between">
                    <div class="flex items-center gap-10 text-[10px] text-[#444]">
                      <button class="flex items-center gap-2" @click="cart.removeItem(item.id, item.size)">
                        <span class="w-2 h-2 bg-[#FF4D4D] rounded-full"></span>
                        Remove
                      </button>

                      <button class="flex items-center gap-2" @click="addToWishlist(item.id)">
                        <span class="w-2 h-2 bg-[#1AA35B] rounded-full"></span>
                        Add Wishlist
                      </button>
                    </div>

                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-2">
                        <button
                          class="w-6 h-6 rounded-full border border-[#DADADA] text-[12px]"
                          @click="decreaseQty(item.id, item.size, item.quantity)"
                        >
                          -
                        </button>

                        <span class="text-[12px] font-semibold">{{ item.quantity }}</span>

                        <button
                          class="w-6 h-6 rounded-full border border-[#DADADA] text-[12px]"
                          @click="increaseQty(item.id, item.size, item.quantity)"
                        >
                          +
                        </button>
                      </div>

                      <div class="text-right min-w-[110px]">
                        <p class="text-[10px] text-[#777]">Total:</p>
                        <p class="text-[12px] font-semibold text-[#1AA35B]">
                          ${{ item.price * item.quantity }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="cart.items.length === 0" class="text-sm text-[#333]">
              Your cart is empty.
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE -->
        <div class="col-span-5 space-y-14">
          <!-- PROMO CARD -->
          <div class="bg-[#FF8000] rounded-[10px] px-6 py-6 text-white shadow-sm">
            <div class="flex justify-center mb-3">
              <img :src="promoIcon" alt="Promo" class="w-14 h-14 object-contain" />
            </div>

            <p class="text-[16px] font-semibold text-center">Have a Promo Code ?</p>

            <div class="mt-5 flex items-center justify-center gap-4">
              <div class="h-9 w-[130px] bg-[#FFB000] rounded-full flex items-center justify-center px-3">
                <input
                  v-model="promo"
                  type="text"
                  class="w-full bg-transparent text-center text-[12px] font-semibold text-white outline-none placeholder:text-white/80"
                  placeholder="CODE123"
                />
              </div>

              <button
                class="h-9 px-6 rounded-md bg-white text-[#222] text-[12px] font-medium"
                @click="applyPromo"
              >
                Apply
              </button>
            </div>
          </div>

          <!-- ORDER SUMMARY -->
          <div class="bg-white rounded-[10px] border border-[#E9E9E9] shadow-[0_6px_14px_rgba(0,0,0,0.15)]">
            <div class="px-6 py-5 border-b border-[#EAEAEA]">
              <p class="font-semibold text-[14px] text-[#222]">Order Summary</p>
              <div class="mt-3 h-0.5 bg-[#6C63FF]"></div>
            </div>

            <div class="px-6 py-6 space-y-4">
              <div class="flex justify-between text-[12px]">
                <span>Subtotal</span>
                <span>${{ cart.subtotal }}</span>
              </div>

              <div class="flex justify-between text-[12px]">
                <span>Discount</span>
                <span>${{ discount }}</span>
              </div>

              <div class="flex justify-between text-[12px]">
                <span>Shipping</span>
                <span>${{ shipping }}</span>
              </div>

              <div class="flex justify-between text-[12px] font-semibold">
                <span>Total</span>
                <span>${{ total }}</span>
              </div>

              <!-- ✅ CHECKOUT BAR (NOW NAVIGATES) -->
              <div class="mt-6 bg-[#4BE3C3] rounded-[10px] px-6 py-4 flex justify-between items-center">
                <span class="font-semibold">${{ total }}</span>

                <button class="flex items-center gap-2 font-semibold" @click="goToCheckout">
                  Checkout
                  <span class="w-7 h-7 rounded-full bg-[#FFB000] flex items-center justify-center">›</span>
                </button>
              </div>

              <button class="mt-4 bg-[#FFB000] text-white px-5 py-2 rounded-lg" @click="goToProducts">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
