<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/store'

const productStore = useProductStore()
const router = useRouter()

//  SINGLE source of truth
const product = computed(() => productStore.selectedProduct)

//  View details handler
const goToDetail = async () => {
  if (!product.value?.id) {
    console.error('Product ID missing', product.value)
    return
  }

  const id = product.value.id

  productStore.closeQuickView()
  await nextTick()

  router.push({
    name: 'detail',
    params: { id },
  })
}
const imageUrl = computed(() => {
  if (!product.value?.img) return ''
  try {
    return new URL(`../assets/images/${product.value.img}`, import.meta.url).href
  } catch {
    return ''
  }
})

const selectedSize = ref('')
const quantity = ref(1)

watch(
  product,
  (p) => {
    if (!p) return
    selectedSize.value = p.sizes?.[0] ?? ''
    quantity.value = 1
  },
  { immediate: true },
)

const addToCart = () => {
  if (!product.value) return

  productStore.addToCart({
    //id: Number(product.value.id),
    id: product.value.id,
    name: product.value.name,
    price: Number(product.value.price.replace('$', '')),
    img: product.value.img,
    size: selectedSize.value,
    quantity: quantity.value,
  })

  productStore.closeQuickView()
}
</script>

<template>
  <!-- Backdrop -->
  <div
    v-if="product"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    @click.self="productStore.closeQuickView()"
  >
    <!-- Modal Content -->
    <div
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl"
    >
      <button
        @click="productStore.closeQuickView()"
        class="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="flex flex-col md:flex-row p-6 gap-6">
        <!-- Image Section -->
        <div class="md:w-1/2 flex flex-col">
          <div
            class="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              :alt="product.name"
              class="w-full h-full object-contain"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="md:w-1/2 flex flex-col">
          <h2 class="text-xl font-bold text-gray-900">{{ product.name }}</h2>

          <span
            class="mt-2 inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md"
          >
            In stock
          </span>

          <p class="mt-2 text-2xl font-bold text-gray-900">{{ product.price }}</p>

          <p class="mt-4 text-sm text-gray-600">{{ product.description }}</p>

          <!-- Size Selector -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700">Size</label>
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

          <!-- Quantity -->
          <div class="mt-6 flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700">Qty:</label>
            <button
              @click="quantity = Math.max(1, quantity - 1)"
              class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
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
              class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>

          <!-- Add to Cart Button -->
          <button
            @click="addToCart"
            class="mt-6 py-2.5 px-6 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
          >
            ADD TO CART
          </button>

          <!-- Additional Info -->
          <div class="mt-6 text-xs text-gray-500 space-y-1">
            <p>⚡ Spend $1,000.00 for Free Shipping</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Made in:</strong> {{ product.madeIn }}</p>
            <p><strong>Brand:</strong> {{ product.brand }}</p>
          </div>
          <button @click="goToDetail" class="mt-4 text-xs text-blue-600 hover:underline text-left">
            View details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
