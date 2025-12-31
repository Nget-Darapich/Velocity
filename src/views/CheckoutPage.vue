<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BreadCrumb from '@/components/BreadCrumb.vue'
import promoIcon from '@/assets/images/promo-icon.png'
import checkoutImg from '@/assets/images/checkout.png'
import mastercardImg from '@/assets/images/mastercard.png'
import visaImg from '@/assets/images/visa.png'
import rupayImg from '@/assets/images/rupay.png'



const router = useRouter()
const cart = useCartStore()

/** Promo code (editable) */
const promo = ref('CODE123')

/** Placeholder numbers like your screenshot */
const discount = computed(() => 8)
const shipping = computed(() => 4)
const total = computed(() => cart.subtotal - discount.value + shipping.value)

/** Form fields */
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const zip = ref('')
const city = ref('')
const country = ref('')

/** Card fields */
const cardName = ref('')
const cardNumber = ref('')
const exp = ref('')
const cvv = ref('')

const applyPromo = () => {
  console.log('Apply promo:', promo.value)
}

/** Load product images from /assets/images */
const getItemImage = (img: string) => new URL(`../assets/images/${img}`, import.meta.url).href

const goBackToCart = () => router.push('/cart')
const checkoutOrder = () => {
  alert('Checkout submitted (placeholder)')
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- TITLE + BREADCRUMB -->
    <div class="px-[62px]">
      <BreadCrumb />
    </div>

    <!-- MAIN -->
    <div class="px-[62px] pt-10 pb-16">
      <div class="grid grid-cols-12 gap-10">
        <!-- LEFT BIG WHITE CARD -->
        <div
          class="col-span-7 bg-white rounded-[10px] border border-[#E9E9E9]
                 shadow-[0_6px_14px_rgba(0,0,0,0.15)] p-10"
        >
          <!-- Personal Details -->
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-3 text-[12px] font-semibold text-[#222]">
              Personal Details
            </div>

            <div class="col-span-9 grid grid-cols-2 gap-6">
              <div>
                <label class="block text-[10px] text-[#444] mb-2">First Name</label>
                <input
                  v-model="firstName"
                  class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                  placeholder="First name"
                />
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Last Name</label>
                <input
                  v-model="lastName"
                  class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Your Email</label>
                <input
                  v-model="email"
                  class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                  placeholder="Email"
                />
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Phone Number</label>
                <input
                  v-model="phone"
                  class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                  placeholder="Number"
                />
              </div>
            </div>
          </div>

          <!-- Shipping Details -->
          <div class="mt-10 grid grid-cols-12 gap-6">
            <div class="col-span-3 text-[12px] font-semibold text-[#222]">
              Shipping Details
            </div>

            <div class="col-span-9">
              <label class="block text-[10px] text-[#444] mb-2">Shipping Address:</label>
              <input
                v-model="address"
                class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                placeholder="Enter address"
              />

              <div class="mt-5 grid grid-cols-3 gap-5">
                <div>
                  <label class="block text-[10px] text-[#444] mb-2">Zip-Code</label>
                  <input
                    v-model="zip"
                    class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                    placeholder="Code"
                  />
                </div>

                <div>
                  <label class="block text-[10px] text-[#444] mb-2">City</label>
                  <input
                    v-model="city"
                    class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                    placeholder="Choose a city"
                  />
                </div>

                <div>
                  <label class="block text-[10px] text-[#444] mb-2">Country</label>
                  <input
                    v-model="country"
                    class="w-full h-8 border border-[#E6E6E6] rounded-md px-3 text-[11px]"
                    placeholder="Choose a country"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Card Details  -->
          <div class="mt-10">
            <div class="bg-[#5B5AC7] rounded-[20px] p-8 text-white">
              <!-- header -->
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-[22px] font-semibold">Card Details</p>
                  <p class="text-[13px] text-white/80 mt-2">Card type</p>
                </div>

                <img
                  :src="checkoutImg"
                  alt="Card Owner"
                  class="w-16 h-16 rounded-xl object-cover"
                />
              </div>

              <!--  LOGO CONTAINERS -->
              <div class="mt-7 flex gap-5">
                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">
                  <img :src="mastercardImg" alt="Mastercard" class="h-10 object-contain" />
                </div>

                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">
                  <img :src="visaImg" alt="Visa" class="h-10 object-contain" />
                </div>

                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">
                  <img :src="rupayImg" alt="RuPay" class="h-10 object-contain" />
                </div>

                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center"> See all </div>
              </div>

              <!-- inputs -->
              <div class="mt-8">
                <label class="block text-[13px] text-white/80 mb-3">Name on card</label>
                <input
                  v-model="cardName"
                  class="w-full h-[48px] rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                  placeholder="Name"
                />
              </div>

              <div class="mt-6">
                <label class="block text-[13px] text-white/80 mb-3">Card Number</label>
                <input
                  v-model="cardNumber"
                  class="w-full h-[48px] rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                  placeholder="1111 2222 3333 4444"
                />
              </div>

              <div class="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-[13px] text-white/80 mb-3">Expiration date</label>
                  <input
                    v-model="exp"
                    class="w-full h-[48px] rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                    placeholder="mm/yy"
                  />
                </div>

                <div>
                  <label class="block text-[13px] text-white/80 mb-3">CVV</label>
                  <input
                    v-model="cvv"
                    class="w-full h-[48px] rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE -->
        <div class="col-span-5 space-y-10">
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
            <div class="px-6 py-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <p class="font-semibold text-[14px] text-[#222]">Order Summary</p>

              <button
                class="bg-[#E43A3A] text-white text-[11px] font-semibold px-4 py-2 rounded-full"
                @click="goBackToCart"
              >
                Back To Cart
              </button>
            </div>

            <div class="px-6 py-6">
              <!-- Item list -->
              <div class="space-y-4">
                <div
                  v-for="item in cart.items"
                  :key="`${item.id}-${item.size ?? ''}`"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-3">
                    <img
                      :src="getItemImage(item.img)"
                      alt="Product"
                      class="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <p class="text-[11px] font-semibold text-[#222]">{{ item.name }}</p>
                      <p class="text-[10px] text-[#777]">Size: {{ item.size ?? '-' }}</p>
                      <p class="text-[10px] text-[#777]">Qty: {{ item.quantity }}</p>
                    </div>
                  </div>

                  <p class="text-[11px] font-semibold text-[#222]">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>

              <!-- totals -->
              <div class="mt-6 space-y-4 text-[12px]">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span class="font-semibold">${{ cart.subtotal }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Discount</span>
                  <span class="font-semibold">${{ discount }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span class="font-semibold">${{ shipping }}</span>
                </div>

                <div class="flex justify-between pt-2 font-semibold">
                  <span>Total</span>
                  <span>${{ total }}</span>
                </div>

                <!-- green checkout bar -->
                <button
                  class="mt-4 w-full bg-[#4BE3C3] rounded-[10px] px-6 py-4 flex items-center justify-between"
                  @click="checkoutOrder"
                >
                  <span class="font-semibold text-[14px] text-[#111]">${{ total }}</span>
                  <span class="font-semibold text-[13px] text-[#111] flex items-center gap-3">
                    Checkout Order
                    <span class="w-7 h-7 rounded-full bg-[#FFB000] flex items-center justify-center">🛒</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

