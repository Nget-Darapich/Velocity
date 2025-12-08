<template>
  <div class="h-[882px] flex gap-[35px] ml-[60px] mt-5">
    <div class="w-[221px] flex flex-col font-medium text-[18px]">
      <BreadCrumb />
      <div class="flex justify-between pt-5 pb-2.5">
        <p class="">Filters</p>
        <button class="text-[#992020]">Reset</button>
      </div>
      <FilterProduct />
    </div>
    <img src="@/assets/images/poster1.png" alt="" class="w-[734px] border rounded-[30px]" />
    <img src="@/assets/images/poster2.png" alt="" class="w-[734px] border rounded-[30px]" />
  </div> 
  <div class="flex flex-col justify-center items-center gap-[30px] pt-10 pb-10">
    <p class="text-5xl font-medium">Sneakers & Kicks</p>
    <div class="flex justify-center space-x-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 font-medium transition relative',
          activeTab === tab.id
            ? 'text-black after:content-[\'\'] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-black after:z-10'
            : 'text-[#969494] hover:text-black',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[50px]">
      <ProductCard
        v-for="item in currentProducts"
        :key="item.id"
        :product-id="String(item.id)"
        :product-img="item.img"
        :product-name="item.name"
        :product-price="item.price"
        @quick-view="openQuickView"
      />
    </div>
  </div>
  <div class="flex flex-col justify-center items-center gap-[30px] pt-10 pb-10">
    <p class="text-5xl font-medium">All Categories</p>
    <div class="flex justify-center space-x-8">
      <button
        v-for="tab in tabsForBrandCategory"
        :key="tab.id"
        @click="activeTabForCategory = tab.id"
        :class="[
          'px-4 py-2 font-medium transition relative',
          activeTabForCategory === tab.id
            ? 'text-black after:content-[\'\'] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-black after:z-10'
            : 'text-[#969494] hover:text-black',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[50px]">
      <ProductCard
        v-for="item in currentProductsInCategory"
        :key="item.id"
        :product-id="item.id"
        :product-img="item.img"
        :product-name="item.name"
        :product-price="item.price"
        @quick-view="openQuickView"
      />
    </div>
  </div>
  <div class="flex flex-col justify-center items-center gap-[30px] pt-10 pb-10">
    <p class="text-5xl font-medium">Trending Brands</p>
    <div class="flex justify-center space-x-8">
      <button
        v-for="tab in tabsForBrand"
        :key="tab.id"
        @click="activeTabForBrand = tab.id"
        :class="[
          'px-4 py-2 font-medium transition relative',
          activeTabForBrand === tab.id
            ? 'text-black after:content-[\'\'] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-black after:z-10'
            : 'text-[#969494] hover:text-black',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[50px]">
      <ProductCard
        v-for="item in currentProductsInBrand"
        :key="item.id"
        :product-id="item.id"
        :product-img="item.img"
        :product-name="item.name"
        :product-price="item.price"
        @quick-view="openQuickView"
      />
    </div>
  </div>
  <!-- ✅ ADD MODAL HERE -->
  <QuickViewModal
    v-if="selectedProduct"
    :is-open="!!selectedProduct"
    :product="selectedProduct"
    @close="closeQuickView"
  />
</template>
<script setup lang="ts">
import BreadCrumb from '@/components/BreadCrumb.vue'
import FilterProduct from '@/components/FilterProduct.vue'
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { computed, ref } from 'vue'

type TabKey = 'featured' | 'newArrivals' | 'bestSeller'
type TabKeyForCategoy = 'athleticFootwear' | 'luxuryLeatherShoes' | 'sustainableFootwear' | 'sandalsAndslides'
type TabKeyForBrand = 'nike' | 'vans' | 'adidas'

const tabs: { id: TabKey; label: string }[] = [
  { id: 'featured', label: 'FEATURED' },
  { id: 'newArrivals', label: 'NEW ARRIVALS' },
  { id: 'bestSeller', label: 'BEST SELLER' },
]
const tabsForBrandCategory: { id: TabKeyForCategoy; label: string }[] = [
  { id: 'athleticFootwear', label: 'Athletic Footwear' },
  { id: 'luxuryLeatherShoes', label: 'Luxury Leather Shoes' },
  { id: 'sustainableFootwear', label: 'Sustainable Footwear' },
  { id: 'sandalsAndslides', label: 'Sandals & Slides' },
]
const tabsForBrand: { id: TabKeyForBrand; label: string }[] = [
  { id: 'nike', label: 'NIKE' },
  { id: 'vans', label: 'VANS' },
  { id: 'adidas', label: 'ADIDAS' },
]

const activeTab = ref<TabKey>('featured')
  const activeTabForCategory = ref<TabKeyForCategoy>('athleticFootwear')
const activeTabForBrand = ref<TabKeyForBrand>('nike')

const currentProducts = computed(() => {
  return products[activeTab.value] || []
})
const currentProductsInCategory = computed(() => {
  return ProductsInCategory[activeTabForCategory.value] || []
})
const currentProductsInBrand = computed(() => {
  return ProductsInBrand[activeTabForBrand.value] || []
})

const products = {
  featured: [
    { id: '1', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '2', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '3', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '4', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
  ],
  newArrivals: [
    { id: '5', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '6', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '7', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '8', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
  ],
  bestSeller: [
    { id: '9', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '10', name: 'Waterproof White Sneaker', price: '$25.00', img: 'waterproof.png' },
    { id: '11', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '12', name: 'Light Weight Running Shoes', price: '$25.00', img: 'running.png' },
  ],
}
const ProductsInCategory = {
  athleticFootwear: [
    { id: '1', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '2', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '3', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '4', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
  ],
  luxuryLeatherShoes: [
    { id: '5', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '6', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '7', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '8', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
  ],
  sustainableFootwear: [
    { id: '9', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '10', name: 'Waterproof White Sneaker', price: '$25.00', img: 'waterproof.png' },
    { id: '11', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '12', name: 'Light Weight Running Shoes', price: '$25.00', img: 'running.png' },
  ],
  sandalsAndslides: [
    { id: '5', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '6', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '7', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '8', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
  ],
}
const ProductsInBrand = {
  nike: [
    { id: '1', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '2', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '3', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '4', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
  ],
  vans: [
    { id: '5', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '6', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '7', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '8', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
  ],
  adidas: [
    { id: '9', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '10', name: 'Waterproof White Sneaker', price: '$25.00', img: 'waterproof.png' },
    { id: '11', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '12', name: 'Light Weight Running Shoes', price: '$25.00', img: 'running.png' },
  ],
}
// Add modal state
const selectedProduct = ref<{
  id: string
  name: string
  price: string
  img: string
  description: string
  sizes: string[]
  brand: string
  category: string
  madeIn: string
} | null>(null)
// const openQuickView = (productId: number) => {
//   // Search in both product sets
//   const id = Number(productId)
//   let product =
//     products.featured.find((p) => p.id === productId) ||
//     products.newArrivals.find((p) => p.id === productId) ||
//     products.bestSeller.find((p) => p.id === productId) ||
//     ProductsInBrand.nike.find((p) => p.id === productId) ||
//     ProductsInBrand.vans.find((p) => p.id === productId) ||
//     ProductsInBrand.adidas.find((p) => p.id === productId)

//   if (product) {
//     // Enrich with extra modal-only data
//     selectedProduct.value = {
//       ...product,
//       description: 'Classic sneakers, clean, comfortable, perfect for any outfit.',
//       sizes: ['S', 'M', 'L', 'XL'],
//       brand: 'Nike', // or infer from context
//       category: 'Athletic Footwear',
//       madeIn: 'United States',
//     }
//   }
// }
const openQuickView = (productId: string) => {
  // Combine all products
  const allProducts = [
    ...products.featured,
    ...products.newArrivals,
    ...products.bestSeller,
    ...ProductsInBrand.nike,
    ...ProductsInBrand.vans,
    ...ProductsInBrand.adidas,
  ]

  const product = allProducts.find((p) => p.id === productId)

  if (product) {
    selectedProduct.value = {
      ...product,
      description: 'Classic sneakers, clean, comfortable, perfect for any outfit.',
      sizes: ['S', 'M', 'L', 'XL'],
      brand: 'Nike',
      category: 'Athletic Footwear',
      madeIn: 'United States',
    }
  }
}
const closeQuickView = () => {
  selectedProduct.value = null
}
</script>
