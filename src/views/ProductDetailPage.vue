<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'
import BreadCrumb from '@/components/BreadCrumb.vue'

const route = useRoute()
console.log('Route params:', route.params)
const cart = useCartStore()

/* get store instance */
const productStore = useProductStore()

/* get product by route id */

const product = computed(() => productStore.getProductDetail?.(route.params.id as string))
/* image */

const imageUrl = computed(() => {
  const imgName = product.value?.img
  if (!imgName) return ''
  console.log('image')
  try {
    return new URL(`../assets/images/${imgName}`, import.meta.url).href
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.error('Image not found:', imgName)
    return '' // or fallback image
  }
})

/* size & qty */
const selectedSize = ref('')
const quantity = ref(1)
watch(
  () => route.params.id,
  (id) => {
    if (id) {
      console.log('Opening product detail for ID:', id)
      productStore.openProductDetail(id as string)
    }
  },
  { immediate: true },
)

/* add to cart */
const addToCart = () => {
  if (!product.value) return

  cart.addToCart({
    id: Number(product.value.id),
    name: product.value.name,
    price: parseFloat(product.value.price.replace('$', '')),
    img: product.value.img,
    size: selectedSize.value,
    quantity: quantity.value,
  })
}
</script>

<template>
  <!-- PAGE -->
  <div class="px-[62px]">
    <BreadCrumb class="pb-10" />
    <div v-if="product" class="bg-white min-h-screen">
      <div class="max-w-6xl mx-auto px-6 py-12">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- IMAGE -->
          <div class="md:w-1/2">
            <div
              class="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                :alt="product.name"
                class="w-full h-full object-contain"
              />
              <div v-else class="text-gray-400">No Image</div>
            </div>
          </div>

          <!-- INFO -->
          <div class="md:w-1/2 flex flex-col">
            <h1 class="text-2xl font-bold text-gray-900">
              {{ product.name }}
            </h1>

            <span
              class="mt-2 inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md w-fit"
            >
              In stock
            </span>

            <p class="mt-2 text-2xl font-bold text-gray-900">
              {{ product.price }}
            </p>

            <p class="mt-4 text-sm text-gray-600">
              {{ product.description }}
            </p>

            <!-- SIZE -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700"> Size </label>
              <div class="flex flex-wrap gap-2 mt-2">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-3 py-1.5 text-sm font-medium rounded-md border',
                    selectedSize === size
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400',
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- QUANTITY -->
            <div class="mt-6 flex items-center gap-3">
              <label class="text-sm font-medium text-gray-700"> Qty: </label>

              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="w-8 h-8 flex items-center justify-center rounded border border-gray-300"
              >
                −
              </button>

              <input
                v-model.number="quantity"
                type="number"
                min="1"
                max="10"
                class="w-12 h-8 text-center border border-gray-300 rounded"
              />

              <button
                @click="quantity = Math.min(10, quantity + 1)"
                class="w-8 h-8 flex items-center justify-center rounded border border-gray-300"
              >
                +
              </button>
            </div>

            <!-- ADD TO CART -->
            <button
              @click="addToCart"
              class="mt-6 py-3 px-6 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
            >
              ADD TO CART
            </button>

            <!-- EXTRA INFO -->
            <div class="mt-6 text-xs text-gray-500 space-y-1">
              <p>⚡ Spend $1,000.00 for Free Shipping</p>
              <p><strong>Category:</strong> {{ product.category }}</p>
              <p><strong>Brand:</strong> {{ product.brand }}</p>
              <p><strong>Made in:</strong> {{ product.madeIn }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NOT FOUND -->
    <div v-else class="p-20 text-center text-gray-400">Product not found</div>
  </div>
</template>
