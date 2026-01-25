<!-- src/views/CheckoutPage.vue -->
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/store'
import { useOrdersStore } from '@/stores/orders'
import BreadCrumb from '@/components/BreadCrumb.vue'

import promoIcon from '@/assets/images/promo-icon.png'
import checkoutImg from '@/assets/images/checkout.png'
import mastercardImg from '@/assets/images/mastercard.png'
import visaImg from '@/assets/images/visa.png'
import rupayImg from '@/assets/images/rupay.png'

const router = useRouter()
const cart = useCartStore()
const orders = useOrdersStore()

/** Promo (demo) */
const promo = ref('CODE123')
const discount = computed(() => 8)
const shippingFee = computed(() => 4)
const subtotal = computed(() => Number((cart as any).subtotal || 0))
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
const cardNumber = ref('') // formatted with spaces
const exp = ref('') // formatted MM/YY
const cvv = ref('') // masked length only (input type=password)

/** Card selection (ONLY ONE) */
type CardBrand = 'mastercard' | 'visa' | 'rupay'
const selectedCard = ref<CardBrand>('mastercard')
function selectCard(card: CardBrand) {
  selectedCard.value = card
}

/** UI state */
const isPaying = ref(false)
const attemptedPay = ref(false)
const formError = ref('')

/** Field errors (for inline messages) */
const errors = reactive<Record<string, string>>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  city: '',
  country: '',
  cardName: '',
  cardNumber: '',
  exp: '',
  cvv: '',
  cardBrand: '',
})

/** Helpers */
const onlyDigits = (s: string) => (s || '').replace(/\D/g, '')

function formatCardNumber(value: string) {
  // Keep digits only, max 19, group by 4: "1234 5678 9012 3456"
  const d = onlyDigits(value).slice(0, 19)
  return d.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string) {
  // digits only, format MM/YY
  const d = onlyDigits(value).slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

function clampMonth(mm: string) {
  let n = Number(mm)
  if (!Number.isFinite(n)) n = 0
  if (n < 1) n = 1
  if (n > 12) n = 12
  return String(n).padStart(2, '0')
}

function normalizePhone(value: string) {
  // keep digits + optional leading +
  const trimmed = value.trim()
  const hasPlus = trimmed.startsWith('+')
  const d = onlyDigits(trimmed)
  return hasPlus ? `+${d}` : d
}

/** Validations (computed) */
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
    !!selectedCard.value &&
    cardName.value.trim().length >= 3 &&
    cardNumberValid.value &&
    expValid.value &&
    cvvValid.value
  )
})

const canPlaceOrder = computed(() => cart.items.length > 0 && shippingValid.value && paymentValid.value && !isPaying.value)

/** Tooltips (show conditions when cursor on input) */
const hints = {
  firstName: 'At least 2 characters.',
  lastName: 'At least 2 characters.',
  email: 'Example: yourname@gmail.com',
  phone: '8–15 digits. Example: +85512345678',
  address: 'At least 6 characters.',
  zip: '4–10 characters.',
  city: 'At least 2 characters.',
  country: 'At least 2 characters.',
  cardBrand: 'Select exactly 1 card brand.',
  cardName: 'Name on card (at least 3 characters).',
  cardNumber: '13–19 digits. Auto formatted with spaces.',
  exp: 'MM/YY (not expired). Auto formatted.',
  cvv: '3 or 4 digits (hidden).',
}

function clearErrors() {
  Object.keys(errors).forEach((k) => (errors[k] = ''))
}

function validateAll() {
  clearErrors()

  if (!cart.items.length) formError.value = 'Your cart is empty.'
  else formError.value = ''

  if (firstName.value.trim().length < 2) errors.firstName = 'First name must be at least 2 characters.'
  if (lastName.value.trim().length < 2) errors.lastName = 'Last name must be at least 2 characters.'
  if (!emailValid.value) errors.email = 'Please enter a valid email address.'
  if (!phoneValid.value) errors.phone = 'Phone must be 8–15 digits.'
  if (address.value.trim().length < 6) errors.address = 'Address must be at least 6 characters.'
  if (!zipValid.value) errors.zip = 'ZIP must be 4–10 characters.'
  if (city.value.trim().length < 2) errors.city = 'City must be at least 2 characters.'
  if (country.value.trim().length < 2) errors.country = 'Country must be at least 2 characters.'

  if (!selectedCard.value) errors.cardBrand = 'Please select a payment card.'
  if (cardName.value.trim().length < 3) errors.cardName = 'Name on card must be at least 3 characters.'
  if (!cardNumberValid.value) errors.cardNumber = 'Card number must be 13–19 digits.'
  if (!expValid.value) errors.exp = 'Expiry must be MM/YY and not expired.'
  if (!cvvValid.value) errors.cvv = 'CVV must be 3 or 4 digits.'

  const anyError = Object.values(errors).some((v) => !!v) || !!formError.value
  return !anyError
}

function firstErrorMessage() {
  // priority order
  const order = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'address',
    'zip',
    'city',
    'country',
    'cardBrand',
    'cardName',
    'cardNumber',
    'exp',
    'cvv',
  ]
  for (const k of order) {
    if (errors[k]) return errors[k]
  }
  return formError.value || 'Please complete all required fields.'
}

async function fakePayment() {
  await new Promise((r) => setTimeout(r, 1200))
  return true
}

const getItemImage = (img: string) => new URL(`../assets/images/${img}`, import.meta.url).href
const goBackToCart = () => router.push('/cart')

/** Auto-format + save shipping info */
const LS_SHIP = 'velocity_checkout_shipping_v1'
function saveShippingToLS() {
  const payload = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    zip: zip.value,
    city: city.value,
    country: country.value,
  }
  localStorage.setItem(LS_SHIP, JSON.stringify(payload))
}
function loadShippingFromLS() {
  try {
    const raw = localStorage.getItem(LS_SHIP)
    if (!raw) return
    const p = JSON.parse(raw)
    firstName.value = p.firstName || ''
    lastName.value = p.lastName || ''
    email.value = p.email || ''
    phone.value = p.phone || ''
    address.value = p.address || ''
    zip.value = p.zip || ''
    city.value = p.city || ''
    country.value = p.country || ''
  } catch {
    // ignore
  }
}
loadShippingFromLS()

watch([firstName, lastName, email, phone, address, zip, city, country], saveShippingToLS)

/** Format watchers */
watch(cardNumber, (v) => {
  const f = formatCardNumber(v)
  if (f !== v) cardNumber.value = f
})

watch(exp, (v) => {
  const f = formatExpiry(v)
  if (f !== v) exp.value = f
})

watch(cvv, (v) => {
  const d = onlyDigits(v).slice(0, 4)
  if (d !== v) cvv.value = d
})

watch(phone, (v) => {
  const n = normalizePhone(v)
  if (n !== v) phone.value = n
})

/** If user already attempted, validate live so errors update instantly */
watch(
  [firstName, lastName, email, phone, address, zip, city, country, cardName, cardNumber, exp, cvv, selectedCard],
  () => {
    if (attemptedPay.value) validateAll()
  },
)

const applyPromo = () => {
  // demo
  console.log('Apply promo:', promo.value)
}

/** MAIN ACTION */
const checkoutOrder = async () => {
  attemptedPay.value = true

  // normalize expiry month if user typed 13 etc (optional)
  const m = exp.value.trim().match(/^(\d{2})\/(\d{2})$/)
  if (m) {
    exp.value = `${clampMonth(m[1])}/${m[2]}`
  }

  const okForm = validateAll()
  if (!okForm) {
    const msg = firstErrorMessage()
    formError.value = msg
    alert(msg) // requested: alert when wrong
    return
  }

  isPaying.value = true
  const ok = await fakePayment()
  isPaying.value = false

  if (!ok) {
    formError.value = 'Payment failed. Please try again (demo).'
    alert(formError.value)
    return
  }

  // Place order using the LATEST orders.ts schema you said you have
  const order = orders.placeOrder({
    items: (cart.items as any[]).map((i: any) => ({
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

  if (typeof (cart as any).clearCart === 'function') (cart as any).clearCart()

  router.push({ path: '/track-order', query: { id: order.id } })
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="px-[62px]">
      <BreadCrumb />
    </div>

    <!-- If cart empty -->
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
            class="h-10 px-6 rounded-md bg-[#FF8000] text-white text-[12px] font-semibold hover:opacity-90 cursor-pointer"
            @click="$router.push('/products')"
          >
            Browse Products
          </button>

          <button
            class="h-10 px-6 rounded-md bg-[#111] text-white text-[12px] font-semibold hover:opacity-90 cursor-pointer"
            @click="$router.push('/cart')"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Checkout -->
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
                  :title="hints.firstName"
                  class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                  :class="attemptedPay && errors.firstName ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  placeholder="John"
                />
                <p v-if="attemptedPay && errors.firstName" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Last Name *</label>
                <input
                  v-model="lastName"
                  :title="hints.lastName"
                  class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                  :class="attemptedPay && errors.lastName ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  placeholder="Doe"
                />
                <p v-if="attemptedPay && errors.lastName" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                  {{ errors.lastName }}
                </p>
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Email *</label>
                <input
                  v-model="email"
                  :title="hints.email"
                  class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                  :class="attemptedPay && errors.email ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  placeholder="you@email.com"
                />
                <p v-if="attemptedPay && errors.email" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label class="block text-[10px] text-[#444] mb-2">Phone *</label>
                <input
                  v-model="phone"
                  :title="hints.phone"
                  class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                  :class="attemptedPay && errors.phone ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                  placeholder="+85512345678"
                />
                <p v-if="attemptedPay && errors.phone" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                  {{ errors.phone }}
                </p>
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
                :title="hints.address"
                class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                :class="attemptedPay && errors.address ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                placeholder="Street, house, etc."
              />
              <p v-if="attemptedPay && errors.address" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                {{ errors.address }}
              </p>

              <div class="mt-5 grid grid-cols-3 gap-5">
                <div>
                  <label class="block text-[10px] text-[#444] mb-2">Zip *</label>
                  <input
                    v-model="zip"
                    :title="hints.zip"
                    class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                    :class="attemptedPay && errors.zip ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                    placeholder="12000"
                  />
                  <p v-if="attemptedPay && errors.zip" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                    {{ errors.zip }}
                  </p>
                </div>

                <div>
                  <label class="block text-[10px] text-[#444] mb-2">City *</label>
                  <input
                    v-model="city"
                    :title="hints.city"
                    class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                    :class="attemptedPay && errors.city ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                    placeholder="Phnom Penh"
                  />
                  <p v-if="attemptedPay && errors.city" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                    {{ errors.city }}
                  </p>
                </div>

                <div>
                  <label class="block text-[10px] text-[#444] mb-2">Country *</label>
                  <input
                    v-model="country"
                    :title="hints.country"
                    class="w-full h-8 border rounded-md px-3 text-[11px] outline-none focus:ring-2 focus:ring-[#FFB000]/40"
                    :class="attemptedPay && errors.country ? 'border-[#E43A3A]' : 'border-[#E6E6E6]'"
                    placeholder="Cambodia"
                  />
                  <p v-if="attemptedPay && errors.country" class="mt-1 text-[10px] text-[#E43A3A] font-semibold">
                    {{ errors.country }}
                  </p>
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

              <div class="mt-7">
                <p class="text-[12px] text-white/80 mb-3">Select Card *</p>
                <div class="flex gap-5">
                  <button
                    type="button"
                    class="card-box"
                    :class="{ active: selectedCard === 'mastercard' }"
                    :title="hints.cardBrand"
                    @click="selectCard('mastercard')"
                  >
                    <img :src="mastercardImg" class="h-10 object-contain" />
                  </button>

                  <button
                    type="button"
                    class="card-box"
                    :class="{ active: selectedCard === 'visa' }"
                    :title="hints.cardBrand"
                    @click="selectCard('visa')"
                  >
                    <img :src="visaImg" class="h-10 object-contain" />
                  </button>

                  <button
                    type="button"
                    class="card-box"
                    :class="{ active: selectedCard === 'rupay' }"
                    :title="hints.cardBrand"
                    @click="selectCard('rupay')"
                  >
                    <img :src="rupayImg" class="h-10 object-contain" />
                  </button>

                  <div class="card-box see-all" title="Demo">See all</div>
                </div>

                <p v-if="attemptedPay && errors.cardBrand" class="mt-2 text-[12px] font-semibold text-[#FFDD99]">
                  {{ errors.cardBrand }}
                </p>
              </div>

              <div class="mt-8">
                <label class="block text-[13px] text-white/80 mb-3">Name on card *</label>
                <input
                  v-model="cardName"
                  :title="hints.cardName"
                  class="w-full h-12 rounded-xl px-4 text-[13px] outline-none placeholder:text-white/60 bg-white/20 border border-transparent focus:border-[#FFB000]"
                  :class="attemptedPay && errors.cardName ? 'border-[#FFB000]' : ''"
                  placeholder="JOHN DOE"
                />
                <p v-if="attemptedPay && errors.cardName" class="mt-2 text-[12px] font-semibold text-[#FFDD99]">
                  {{ errors.cardName }}
                </p>
              </div>

              <div class="mt-6">
                <label class="block text-[13px] text-white/80 mb-3">Card Number *</label>
                <input
                  v-model="cardNumber"
                  :title="hints.cardNumber"
                  inputmode="numeric"
                  class="w-full h-12 rounded-xl px-4 text-[13px] outline-none placeholder:text-white/60 bg-white/20 border border-transparent focus:border-[#FFB000]"
                  :class="attemptedPay && errors.cardNumber ? 'border-[#FFB000]' : ''"
                  placeholder="1234 5678 9012 3456"
                />
                <p v-if="attemptedPay && errors.cardNumber" class="mt-2 text-[12px] font-semibold text-[#FFDD99]">
                  {{ errors.cardNumber }}
                </p>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-[13px] text-white/80 mb-3">Expiration (MM/YY) *</label>
                  <input
                    v-model="exp"
                    :title="hints.exp"
                    inputmode="numeric"
                    class="w-full h-12 rounded-xl px-4 text-[13px] outline-none placeholder:text-white/60 bg-white/20 border border-transparent focus:border-[#FFB000]"
                    :class="attemptedPay && errors.exp ? 'border-[#FFB000]' : ''"
                    placeholder="MM/YY"
                  />
                  <p v-if="attemptedPay && errors.exp" class="mt-2 text-[12px] font-semibold text-[#FFDD99]">
                    {{ errors.exp }}
                  </p>
                </div>

                <div>
                  <label class="block text-[13px] text-white/80 mb-3">CVV *</label>
                  <input
                    v-model="cvv"
                    :title="hints.cvv"
                    inputmode="numeric"
                    type="password"
                    class="w-full h-12 rounded-xl px-4 text-[13px] outline-none placeholder:text-white/60 bg-white/20 border border-transparent focus:border-[#FFB000]"
                    :class="attemptedPay && errors.cvv ? 'border-[#FFB000]' : ''"
                    placeholder="•••"
                  />
                  <p v-if="attemptedPay && errors.cvv" class="mt-2 text-[12px] font-semibold text-[#FFDD99]">
                    {{ errors.cvv }}
                  </p>
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
                <input v-model="promo" class="w-full bg-transparent text-center text-[12px] font-semibold text-white outline-none" />
              </div>

              <button
                class="h-9 px-6 rounded-md bg-white text-[#222] text-[12px] font-medium hover:shadow cursor-pointer"
                @click="applyPromo"
              >
                Apply
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white rounded-[10px] border border-[#E9E9E9] shadow-[0_6px_14px_rgba(0,0,0,0.15)]">
            <div class="px-6 py-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <p class="font-semibold text-[14px] text-[#222]">Order Summary</p>
              <button
                class="bg-[#E43A3A] text-white text-[11px] font-semibold px-4 py-2 rounded-full hover:opacity-90 cursor-pointer"
                @click="goBackToCart"
              >
                Back To Cart
              </button>
            </div>

            <div class="px-6 py-6">
              <div class="space-y-4">
                <div v-for="item in cart.items" :key="`${item.id}-${item.size ?? ''}`" class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img :src="getItemImage((item as any).img)" class="w-10 h-10 rounded-md object-cover" />
                    <div>
                      <p class="text-[11px] font-semibold text-[#222]">{{ (item as any).name }}</p>
                      <p class="text-[10px] text-[#777]">Size: {{ (item as any).size ?? '-' }}</p>
                      <p class="text-[10px] text-[#777]">Qty: {{ (item as any).quantity }}</p>
                    </div>
                  </div>
                  <p class="text-[11px] font-semibold text-[#222]">
                    ${{ (Number((item as any).price) * Number((item as any).quantity)).toFixed(2) }}
                  </p>
                </div>
              </div>

              <div class="mt-6 space-y-4 text-[12px]">
                <div class="flex justify-between">
                  <span>Subtotal</span><span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Discount</span><span class="font-semibold">${{ discount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Shipping</span><span class="font-semibold">${{ shippingFee.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between pt-2 font-semibold">
                  <span>Total</span><span>${{ total.toFixed(2) }}</span>
                </div>

                <p v-if="formError" class="mt-2 text-[12px] font-semibold text-[#E43A3A]">
                  {{ formError }}
                </p>

                <!-- IMPORTANT: do NOT disable click; we validate on click -->
                <button
                  class="mt-4 w-full rounded-[10px] px-6 py-4 flex items-center justify-between cursor-pointer hover:shadow"
                  :class="canPlaceOrder ? 'bg-[#4BE3C3]' : 'bg-[#CFEFE8] opacity-90'"
                  @click="checkoutOrder"
                >
                  <span class="font-semibold text-[14px] text-[#111]">${{ total.toFixed(2) }}</span>
                  <span class="font-semibold text-[13px] text-[#111] flex items-center gap-3">
                    <span v-if="isPaying">Processing…</span>
                    <span v-else>Pay &amp; Place Order</span>
                    <span class="w-7 h-7 rounded-full bg-[#FFB000] flex items-center justify-center">🛒</span>
                  </span>
                </button>

                <p class="mt-3 text-[10px] text-[#777] leading-relaxed">
                  By placing your order, you agree to our Terms &amp; Conditions. (Demo)
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- END RIGHT -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card selection UI (only one active) */
.card-box {
  width: 120px;
  height: 70px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
.card-box:hover {
  transform: translateY(-2px);
}
.card-box.active {
  border-color: #ffb000;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}
.card-box.see-all {
  cursor: default;
  color: white;
  font-weight: 600;
  font-size: 13px;
  opacity: 0.9;
}
</style>
