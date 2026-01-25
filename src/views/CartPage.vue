<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/store'
import { useOrdersStore } from '@/stores/orders'
import promoIcon from '@/assets/images/promo-icon.png'
import { useRouter } from 'vue-router'
import BreadCrumb from '@/components/BreadCrumb.vue'

const cart = useCartStore()
const orders = useOrdersStore()
const router = useRouter()

const promo = ref('CODE123')

// placeholder values (same as screenshot)
const discount = computed(() => 8)
const shipping = computed(() => 4)
const subtotal = computed(() => Number(cart.subtotal || 0))
const total = computed(() => Number((subtotal.value - discount.value + shipping.value).toFixed(2)))

const canCheckout = computed(() => cart.items.length > 0)

const clearCart = () => {
  cart.clearCart()
}

const applyPromo = () => {
  console.log('Apply promo:', promo.value)
}

const getItemImage = (img: string) => {
  return new URL(`../assets/images/${img}`, import.meta.url).href
}

const goToProducts = () => {
  router.push('/products')
}

const goToCheckout = () => {
  if (!canCheckout.value) return
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

/* -------------------- REALISTIC ORDER FEATURES -------------------- */
const trackOrder = (id: string) => {
  router.push({ path: '/track-order', query: { id } })
}

const reorder = (orderId: string) => {
  const o = orders.findById(orderId)
  if (!o) return

  // Re-add each item (use your store actions if available)
  for (const it of o.items as any[]) {
    if (typeof (cart as any).addToCart === 'function') {
      ;(cart as any).addToCart({
        id: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
        size: it.size,
        img: it.img,
      })
    } else {
      // fallback: push or update quantity based on your cart structure
      const existing = (cart as any).items.find(
        (x: any) => x.id === it.id && (x.size ?? '') === (it.size ?? ''),
      )
      if (existing) {
        cart.updateQuantity(it.id, it.size, existing.quantity + it.quantity)
      } else {
        ;(cart as any).items.push({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          size: it.size,
          img: it.img,
        })
      }
    }
  }

  alert('Items added to cart from your previous order!')
  router.push('/cart')
}
</script>

<template>
  <div class="min-h-screen">
    <!-- TITLE + BREADCRUMB -->
    <div class="px-[62px]">
      <BreadCrumb class="ml-0" />
    </div>

    <!-- MAIN CONTENT -->
    <div class="px-[62px] pt-10 pb-16">
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

            <button
              class="text-[12px] text-white underline"
              :class="cart.items.length === 0 ? 'opacity-60 cursor-not-allowed' : ''"
              :disabled="cart.items.length === 0"
              @click="clearCart"
            >
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
                        <span class="text-[#1AA35B] font-semibold">${{ Number(item.price).toFixed(2) }}</span>
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
                          ${{ (Number(item.price) * Number(item.quantity)).toFixed(2) }}
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

          <!-- ✅ REALISTIC: RECENT ORDERS (appears after user paid) -->
          <div
            class="bg-white rounded-[10px] border border-[#E9E9E9]
                   shadow-[0_6px_14px_rgba(0,0,0,0.15)] p-6"
          >
            <div class="flex items-center justify-between">
              <p class="text-[14px] font-semibold text-[#222]">Recent Orders</p>
              <router-link to="/track-order" class="text-[12px] font-semibold underline text-[#222]">
                Track order
              </router-link>
            </div>

            <p v-if="orders.allOrders.length === 0" class="mt-3 text-[12px] text-[#666]">
              No orders yet. After you pay on Checkout, your order history will appear here.
            </p>

            <div v-else class="mt-4 space-y-3">
              <div
                v-for="o in orders.recentOrders"
                :key="o.id"
                class="flex items-center justify-between border border-[#eee] rounded-lg px-4 py-3"
              >
                <div>
                  <p class="text-[12px] font-semibold text-[#222]">{{ o.id }}</p>
                  <p class="text-[11px] text-[#666]">
                    {{ new Date(o.createdAt).toLocaleString() }} • {{ o.itemsCount }} items •
                    ${{ o.totals.total.toFixed(2) }}
                  </p>
                  <p class="text-[11px] font-semibold mt-1">Status: {{ o.status }}</p>
                </div>

                <div class="flex gap-2">
                  <button
                    class="h-9 px-4 rounded-md bg-[#111] text-white text-[11px] font-semibold"
                    @click="trackOrder(o.id)"
                  >
                    Track
                  </button>

                  <button
                    class="h-9 px-4 rounded-md bg-[#FF8000] text-white text-[11px] font-semibold"
                    @click="reorder(o.id)"
                  >
                    Reorder
                  </button>
                </div>
              </div>
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
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-[12px]">
                <span>Discount</span>
                <span>${{ Number(discount).toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-[12px]">
                <span>Shipping</span>
                <span>${{ Number(shipping).toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-[12px] font-semibold">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>

              <!-- CHECKOUT BAR -->
              <div
                class="mt-6 rounded-[10px] px-6 py-4 flex justify-between items-center"
                :class="canCheckout ? 'bg-[#4BE3C3]' : 'bg-[#CFEFE8] opacity-70'"
              >
                <span class="font-semibold">${{ total.toFixed(2) }}</span>

                <button
                  class="flex items-center gap-2 font-semibold"
                  :class="!canCheckout ? 'cursor-not-allowed' : ''"
                  :disabled="!canCheckout"
                  @click="goToCheckout"
                >
                  Checkout
                  <span class="w-7 h-7 rounded-full bg-[#FFB000] flex items-center justify-center">›</span>
                </button>
              </div>

              <p v-if="!canCheckout" class="text-[11px] text-[#666]">
                Add products to your cart before checking out.
              </p>

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
