<template>
  <div v-if="categoryExists">
    <p class="text-5xl underline underline-offset-5 text-center">
      {{ formattedCategoryName }}
    </p>
    <div class="flex justify-center">
      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px] mt-10">
        <ProductCard
          v-for="item in currentProducts"
          :key="item.id"
          :product-id="item.id"
          :product-img="item.img"
          :product-name="item.name"
          :product-price="item.price"
          @view-detail="goToProductDetail(item.id)"
        />
      </div>
    </div>

    <QuickViewModal />
  </div>

  <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <p class="text-4xl font-medium text-gray-600">Category Not Found</p>
    <p class="text-lg text-gray-500">The category "{{ categoryName }}" does not exist.</p>
    <router-link
      to="/products"
      class="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
    >
      Back to Products
    </router-link>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
// Import from store
import { productsByCategory, type CategoryKey, useProductStore } from '@/stores/store'

const router = useRouter()
const route = useRoute()
const store = useProductStore()

// Get category name from route parameter
const categoryName = computed(() => {
  return (route.params.category as string) || ''
})

// Format category name for display (convert camelCase to Title Case)
const formattedCategoryName = computed(() => {
  const category = categoryName.value
  // Convert camelCase to spaces: athleticFootwear -> athletic Footwear
  const withSpaces = category.replace(/([A-Z])/g, ' $1')
  // Capitalize first letter of each word
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim()
})

// Check if category exists
const categoryExists = computed(() => {
  const category = categoryName.value as CategoryKey
  return category in productsByCategory
})

// Get products for the current category - includes both hardcoded and user products
const currentProducts = computed(() => {
  const category = categoryName.value as CategoryKey
  
  // Get hardcoded products for this category
  const hardcodedProducts = productsByCategory[category] || []
  
  // Get user products filtered by category
  const userCategoryProducts = store.userProducts
    .filter(p => p.category === category)
    .map(p => ({
      id: p.id,
      name: p.name,
      price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price,
      img: p.img,
      isNew: p.isNew,
      isDiscounted: p.isDiscounted,
      madeIn: undefined,
      sizeRange: p.sizeRange,
      brand: p.brand
    }))
  
  // Combine both
  return [...hardcodedProducts, ...userCategoryProducts]
})

const goToProductDetail = (id: string) => {
  router.push(`/product/${id}`)
}
</script>