<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/store'
import { useOrdersStore } from '@/stores/orders'
import BreadCrumb from '@/components/BreadCrumb.vue'

import promoIcon from '@/assets/images/promo-icon.png'
import checkoutImg from '@/assets/images/checkout.png'
import mastercardImg from '@/assets/images/mastercard.png'
import visaImg from '@/assets/images/visa.png'
import rupayImg from '@/assets/images/rupay.png'

<<<<<<< HEAD



=======
>>>>>>> a175e1d (Add footer pages, routing, and simple order tracking)
const router = useRouter()
const cart = useCartStore()
const orders = useOrdersStore()

/** Promo (demo) */
const promo = ref('CODE123')
const discount = computed(() => 8)
const shippingFee = computed(() => 4)
const subtotal = computed(() => Number(cart.subtotal))
const total = computed(() => Number((subtotal.value - discount.value + shippingFee.value).toFixed(2)))

/** Shipping fields */
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

/** UI state */
const isPaying = ref(false)
const touched = ref(false)
const formError = ref('')

const applyPromo = () => {
  console.log('Apply promo:', promo.value)
}

const getItemImage = (img: string) => new URL(`../assets/images/${img}`, import.meta.url).href
const goBackToCart = () => router.push('/cart')
const checkoutOrder = () => {
  if (!cart.items.length) {
    alert('Your cart is empty.')
    return
  }

  // create order (Order ID generated here)
  const order = orders.placeOrder({
    total: Number(total.value.toFixed(2)),
    itemsCount: cart.items.reduce((sum, i) => sum + i.quantity, 0),
    email: email.value || undefined,
  })

  // clear cart (ONLY if you have this function)
  if (typeof cart.clearCart === 'function') cart.clearCart()

  // go to track page with id

/* ---------- validation helpers ---------- */
const onlyDigits = (s: string) => (s || '').replace(/\D/g, '')

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const phoneValid = computed(() => {
  const d = onlyDigits(phone.value)
  return d.length >= 8 && d.length <= 15
})
const zipValid = computed(() => zip.value.trim().length >= 4 && zip.value.trim().length <= 10)

const expValid = computed(() => {
  const m = exp.value.trim().match(/^(\d{2})\/(\d{2})$/)
  if (!m) return false
  const mm = Number(m[1])
  const yy = Number(m[2])
  if (mm < 1 || mm > 12) return false
  const now = new Date()
  const curYY = now.getFullYear() % 100
  const curMM = now.getMonth() + 1
  if (yy < curYY) return false
  if (yy === curYY && mm < curMM) return false
  return true
})

const cardNumberValid = computed(() => {
  const d = onlyDigits(cardNumber.value)
  return d.length >= 13 && d.length <= 19
})

const cvvValid = computed(() => {
  const d = onlyDigits(cvv.value)
  return d.length === 3 || d.length === 4
})

const shippingValid = computed(() => {
  return (
    firstName.value.trim().length >= 2 &&
    lastName.value.trim().length >= 2 &&
    emailValid.value &&
    phoneValid.value &&
    address.value.trim().length >= 6 &&
    zipValid.value &&
    city.value.trim().length >= 2 &&
    country.value.trim().length >= 2
  )
})

const paymentValid = computed(() => {
  return (
    cardName.value.trim().length >= 3 &&
    cardNumberValid.value &&
    expValid.value &&
    cvvValid.value
  )
})

const canPlaceOrder = computed(() => cart.items.length > 0 && shippingValid.value && paymentValid.value && !isPaying.value)

function buildErrorMessage() {
  if (!cart.items.length) return 'Your cart is empty.'
  if (firstName.value.trim().length < 2) return 'Please enter a valid first name.'
  if (lastName.value.trim().length < 2) return 'Please enter a valid last name.'
  if (!emailValid.value) return 'Please enter a valid email.'
  if (!phoneValid.value) return 'Please enter a valid phone number.'
  if (address.value.trim().length < 6) return 'Please enter a valid address.'
  if (!zipValid.value) return 'Please enter a valid ZIP/postal code.'
  if (city.value.trim().length < 2) return 'Please enter a valid city.'
  if (country.value.trim().length < 2) return 'Please enter a valid country.'
  if (cardName.value.trim().length < 3) return 'Please enter the name on card.'
  if (!cardNumberValid.value) return 'Please enter a valid card number.'
  if (!expValid.value) return 'Please enter a valid expiration date (MM/YY).'
  if (!cvvValid.value) return 'Please enter a valid CVV.'
  return 'Please complete all required fields.'
}

async function fakePayment() {
  // simulate payment gateway
  await new Promise((r) => setTimeout(r, 1200))
  return true
}

const checkoutOrder = async () => {
  touched.value = true
  formError.value = ''

  if (!canPlaceOrder.value) {
    formError.value = buildErrorMessage()
    return
  }

  isPaying.value = true
  const ok = await fakePayment()
  isPaying.value = false

  if (!ok) {
    formError.value = 'Payment failed. Please try again (demo).'
    return
  }

  // Create full order only after payment success (realistic)
  const order = orders.placeOrder({
    items: cart.items.map((i: any) => ({
      id: i.id,
      name: i.name,
      price: Number(i.price),
      quantity: Number(i.quantity),
      size: i.size,
      img: i.img,
    })),
    shipping: {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      zip: zip.value.trim(),
      city: city.value.trim(),
      country: country.value.trim(),
    },
    totals: {
      subtotal: Number(subtotal.value.toFixed(2)),
      discount: Number(discount.value.toFixed(2)),
      shipping: Number(shippingFee.value.toFixed(2)),
      total: Number(total.value.toFixed(2)),
    },
    cardNumber: cardNumber.value,
  })

  if (typeof cart.clearCart === 'function') cart.clearCart()

  router.push({ path: '/track-order', query: { id: order.id } })
}

</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="px-[62px]">
      <BreadCrumb />
    </div>

    <!-- still clickable even if empty -->
    <div v-if="cart.items.length === 0" class="px-[62px] pt-20 pb-24">
      <div
        class="bg-white max-w-[640px] mx-auto rounded-[12px] border border-[#E9E9E9]
               shadow-[0_6px_14px_rgba(0,0,0,0.15)] p-12 text-center"
      >
        <h2 class="text-[22px] font-semibold text-[#222]">Checkout not available</h2>
        <p class="text-[14px] text-[#666] mt-4 leading-relaxed">
          Your cart is empty. Please add products before checking out.
        </p>

        <div class="mt-10 flex justify-center gap-5">
          <button
            class="h-10 px-6 rounded-md bg-[#FF8000] text-white text-[12px] font-semibold"
            @click="$router.push('/products')"
          >
            Browse Products
          </button>

          <button
            class="h-10 px-6 rounded-md bg-[#111] text-white text-[12px] font-semibold"
            @click="$router.push('/cart')"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>

    <div v-else class="px-[62px] pt-10 pb-16">
      <div class="grid grid-cols-12 gap-10">
        <!-- LEFT -->
        <div
          class="col-span-7 bg-white rounded-[10px] border border-[#E9E9E9]
                 shadow-[0_6px_14px_rgba(0,0,0,0.15)] p-10"
        >
          <!-- Personal -->
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-3 text-[12px] font-semibold text-[#222]">Personal Details</div>

            <div class="col-span-9 grid grid-cols-2 gap-6">
              <div>
                <label class="block text-[10px] text-[#444] mb-2">First Name *</label>
                <input
                  v-model="firstName"
                  class="w-full h-8 border rounded-md px-3 text-[11px]"
                  :class="touched && firstName.trim().length < 2 ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                />
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Last Name *</label>
                <input
                  v-model="lastName"
                  class="w-full h-8 border rounded-md px-3 text-[11px]"
                  :class="touched && lastName.trim().length < 2 ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                />
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Email *</label>
                <input
                  v-model="email"
                  class="w-full h-8 border rounded-md px-3 text-[11px]"
                  :class="touched && !emailValid ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                />
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Phone *</label>
                <input
                  v-model="phone"
                  class="w-full h-8 border rounded-md px-3 text-[11px]"
                  :class="touched && !phoneValid ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                />
              </div>
            </div>
          </div>

          <!-- Shipping -->
          <div class="mt-10 grid grid-cols-12 gap-6">
            <div class="col-span-3 text-[12px] font-semibold text-[#222]">Shipping Details</div>

            <div class="col-span-9">
              <label class="block text-[10px] text-[#444] mb-2">Address *</label>
              <input
                v-model="address"
                class="w-full h-8 border rounded-md px-3 text-[11px]"
                :class="touched && address.trim().length < 6 ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
              />

              <div class="mt-5 grid grid-cols-3 gap-5">
                <div>
                  <label class="block text-[10px] text-[#444] mb-2">Zip *</label>
                  <input
                    v-model="zip"
                    class="w-full h-8 border rounded-md px-3 text-[11px]"
                    :class="touched && !zipValid ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  />
                </div>

                <div>
                  <label class="block text-[10px] text-[#444] mb-2">City *</label>
                  <input
                    v-model="city"
                    class="w-full h-8 border rounded-md px-3 text-[11px]"
                    :class="touched && city.trim().length < 2 ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  />
                </div>

                <div>
                  <label class="block text-[10px] text-[#444] mb-2">Country *</label>
                  <input
                    v-model="country"
                    class="w-full h-8 border rounded-md px-3 text-[11px]"
                    :class="touched && country.trim().length < 2 ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Payment card -->
          <div class="mt-10">
            <div class="bg-[#5B5AC7] rounded-[20px] p-8 text-white">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-[22px] font-semibold">Payment</p>
                  <p class="text-[13px] text-white/80 mt-2">Secure payment (demo)</p>
                </div>
                <img :src="checkoutImg" class="w-16 h-16 rounded-xl object-cover" />
              </div>

              <div class="mt-7 flex gap-5">
                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">
                  <img :src="mastercardImg" class="h-10 object-contain" />
                </div>
                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">
                  <img :src="visaImg" class="h-10 object-contain" />
                </div>
                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">
                  <img :src="rupayImg" class="h-10 object-contain" />
                </div>
                <div class="w-[120px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center">See all</div>
              </div>

              <div class="mt-8">
                <label class="block text-[13px] text-white/80 mb-3">Name on card *</label>
                <input
                  v-model="cardName"
                  class="w-full h-12 rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                />
              </div>

              <div class="mt-6">
                <label class="block text-[13px] text-white/80 mb-3">Card Number *</label>
                <input
                  v-model="cardNumber"
                  class="w-full h-12 rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                />
              </div>

              <div class="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-[13px] text-white/80 mb-3">Expiration (MM/YY) *</label>
                  <input
                    v-model="exp"
                    class="w-full h-12 rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label class="block text-[13px] text-white/80 mb-3">CVV *</label>
                  <input
                    v-model="cvv"
                    class="w-full h-12 rounded-xl bg-white/20 px-4 text-[13px] outline-none placeholder:text-white/60"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-span-5 space-y-10">
          <!-- Promo -->
          <div class="bg-[#FF8000] rounded-[10px] px-6 py-6 text-white shadow-sm">
            <div class="flex justify-center mb-3">
              <img :src="promoIcon" class="w-14 h-14 object-contain" />
            </div>

            <p class="text-[16px] font-semibold text-center">Have a Promo Code?</p>

            <div class="mt-5 flex items-center justify-center gap-4">
              <div class="h-9 w-[130px] bg-[#FFB000] rounded-full flex items-center justify-center px-3">
                <input
                  v-model="promo"
                  class="w-full bg-transparent text-center text-[12px] font-semibold text-white outline-none"
                />
              </div>

              <button class="h-9 px-6 rounded-md bg-white text-[#222] text-[12px] font-medium" @click="applyPromo">
                Apply
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white rounded-[10px] border border-[#E9E9E9] shadow-[0_6px_14px_rgba(0,0,0,0.15)]">
            <div class="px-6 py-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <p class="font-semibold text-[14px] text-[#222]">Order Summary</p>
              <button class="bg-[#E43A3A] text-white text-[11px] font-semibold px-4 py-2 rounded-full" @click="goBackToCart">
                Back To Cart
              </button>
            </div>

            <div class="px-6 py-6">
              <div class="space-y-4">
                <div v-for="item in cart.items" :key="`${item.id}-${item.size ?? ''}`" class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img :src="getItemImage(item.img)" class="w-10 h-10 rounded-md object-cover" />
                    <div>
                      <p class="text-[11px] font-semibold text-[#222]">{{ item.name }}</p>
                      <p class="text-[10px] text-[#777]">Size: {{ item.size ?? '-' }}</p>
                      <p class="text-[10px] text-[#777]">Qty: {{ item.quantity }}</p>
                    </div>
                  </div>
                  <p class="text-[11px] font-semibold text-[#222]">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>

              <div class="mt-6 space-y-4 text-[12px]">
                <div class="flex justify-between"><span>Subtotal</span><span class="font-semibold">${{ subtotal.toFixed(2) }}</span></div>
                <div class="flex justify-between"><span>Discount</span><span class="font-semibold">${{ discount.toFixed(2) }}</span></div>
                <div class="flex justify-between"><span>Shipping</span><span class="font-semibold">${{ shippingFee.toFixed(2) }}</span></div>
                <div class="flex justify-between pt-2 font-semibold"><span>Total</span><span>${{ total.toFixed(2) }}</span></div>

                <p v-if="formError" class="mt-2 text-[12px] font-semibold text-[#E43A3A]">
                  {{ formError }}
                </p>

                <button
                  class="mt-4 w-full rounded-[10px] px-6 py-4 flex items-center justify-between"
                  :class="canPlaceOrder ? 'bg-[#4BE3C3]' : 'bg-[#CFEFE8] cursor-not-allowed'"
                  :disabled="!canPlaceOrder"
                  @click="checkoutOrder"
                >
                  <span class="font-semibold text-[14px] text-[#111]">${{ total.toFixed(2) }}</span>
                  <span class="font-semibold text-[13px] text-[#111] flex items-center gap-3">
                    <span v-if="isPaying">Processing…</span>
                    <span v-else>Pay & Place Order</span>
                    <span class="w-7 h-7 rounded-full bg-[#FFB000] flex items-center justify-center">🛒</span>
                  </span>
                </button>

                <p class="mt-3 text-[10px] text-[#777] leading-relaxed">
                  By placing your order, you agree to our Terms & Conditions. (Demo)
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
