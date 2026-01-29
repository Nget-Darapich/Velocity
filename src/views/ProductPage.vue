<template>
  <div class="w-[1200px] mx-auto">
    <!-- Posters -->
    <div class="flex justify-center gap-5 mb-12">
      <img src="@/assets/images/poster1.png" class="w-[734px] rounded-[30px]" />
      <img src="@/assets/images/poster2.png" class="w-[734px] rounded-[30px]" />
    </div>

    <!-- Sneakers & Kicks -->
    <div class="flex flex-col items-center gap-8 py-10">
      <h2 class="text-5xl font-medium">Sneakers & Kicks</h2>

      <!-- Tabs -->
      <div class="flex gap-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 font-medium relative',
            activeTab === tab.id
              ? 'text-black after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-black'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Products -->
      <div class="grid grid-cols-5 gap-8">
        <ProductCard
          v-for="item in currentProducts"
          :key="item.id"
          :productImg="item.img"
          :productName="item.name"
          :productPrice="item.price.toString()"
          :productId="item.id"
          @view-detail="goToProductDetail(item.id)"
        />
      </div>
    </div>

    <!-- Categories -->
    <div class="flex flex-col items-center gap-8 py-10">
      <h2 class="text-5xl font-medium">All Categories</h2>

      <div class="flex gap-8">
        <button
          v-for="tab in categoryTabs"
          :key="tab.id"
          @click="activeCategory = tab.id"
          :class="[
            'px-4 py-2 font-medium relative',
            activeCategory === tab.id
              ? 'text-black after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-black'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="grid grid-cols-5 gap-8">
        <ProductCard
          v-for="item in currentCategoryProducts"
          :key="item.id"
          :productImg="item.img"
          :productName="item.name"
          :productPrice="item.price.toString()"
          :productId="item.id"
          @view-detail="goToProductDetail(item.id)"
        />
      </div>
    </div>

    <!-- Brands -->
    <div class="flex flex-col items-center gap-8 py-10">
      <h2 class="text-5xl font-medium">Trending Brands</h2>

      <div class="flex gap-8">
        <button
          v-for="tab in brandTabs"
          :key="tab.id"
          @click="activeBrand = tab.id"
          :class="[
            'px-4 py-2 font-medium relative',
            activeBrand === tab.id
              ? 'text-black after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-black'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="grid grid-cols-5 gap-8">
        <ProductCard
          v-for="item in currentBrandProducts"
          :key="item.id"
          :productImg="item.img"
          :productName="item.name"
          :productPrice="item.price.toString()"
          :productId="item.id"
          @view-detail="goToProductDetail(item.id)"
        />
      </div>
    </div>

    <QuickViewModal />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { useProductStore } from '@/stores/store'
import {
  tabs,
  categoryTabs,
  brandTabs,
  productsByCategory,
  productsByBrand,
  type TabKey,
  type CategoryKey,
  type BrandKey
} from '@/stores/store'

const router = useRouter()
const store = useProductStore()

// Active tabs
const activeTab = ref<TabKey>('featured')
const activeCategory = ref<CategoryKey>('athleticFootwear')
const activeBrand = ref<BrandKey>('nike')

// Convert user products to the Product format
const convertedUserProducts = computed(() => {
  return store.userProducts.map(p => ({
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
})

// Combine hardcoded products with user-added products
const allProductsCombined = computed(() => {
  return [...store.allProducts, ...convertedUserProducts.value]
})

// Featured / New / Best Seller - now includes user products
const currentProducts = computed(() => {
  return allProductsCombined.value.filter(p => {
    if (activeTab.value === 'featured') return true
    if (activeTab.value === 'newArrivals') return p.isNew
    if (activeTab.value === 'bestSeller') return p.isDiscounted
    return true
  })
})

// Category - use hardcoded productsByCategory data + filter user products by category
const currentCategoryProducts = computed(() => {
  const hardcodedProducts = productsByCategory[activeCategory.value]
  const userCategoryProducts = store.userProducts
    .filter(p => p.category === activeCategory.value)
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
  
  return [...hardcodedProducts, ...userCategoryProducts]
})

// Brand - use hardcoded productsByBrand data + filter user products by brand
const currentBrandProducts = computed(() => {
  const hardcodedProducts = productsByBrand[activeBrand.value]
  const userBrandProducts = store.userProducts
    .filter(p => p.brand === activeBrand.value)
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
  
  return [...hardcodedProducts, ...userBrandProducts]
})

const goToProductDetail = (id: string) => {
  router.push(`/product/${id}`)
}
</script>