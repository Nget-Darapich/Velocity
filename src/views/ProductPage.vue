<template>
  <div>
    <!-- TOP SECTION (Filters + Posters) -->
    <div class="h-[882px] flex gap-[35px] ml-[60px] mt-5">
      <div class="w-[221px] flex flex-col font-medium text-[18px]">
        <BreadCrumb />
        <div class="flex justify-between pt-5 pb-2.5">
          <p>Filters</p>
          <button class="text-[#992020]">Reset</button>
        </div>
        <FilterProduct />
      </div>

      <img src="@/assets/images/poster1.png" alt="" class="w-[734px] border rounded-[30px]" />
      <img src="@/assets/images/poster2.png" alt="" class="w-[734px] border rounded-[30px]" />
    </div>

    <!-- Sneakers & Kicks -->
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

      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px]">
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

    <!-- All Categories -->
    <div class="flex flex-col justify-center items-center gap-[30px] pt-10 pb-10">
      <p class="text-5xl font-medium">All Categories</p>

      <div class="flex justify-center space-x-8">
        <button
          v-for="tab in categoryTabs"
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

      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px]">
        <ProductCard
          v-for="item in currentProductsInCategory"
          :key="item.id"
          :product-id="String(item.id)"
          :product-img="item.img"
          :product-name="item.name"
          :product-price="item.price"
          @quick-view="openQuickView"
        />
      </div>
    </div>

    <!-- Trending Brands -->
    <div class="flex flex-col justify-center items-center gap-[30px] pt-10 pb-10">
      <p class="text-5xl font-medium">Trending Brands</p>

      <div class="flex justify-center space-x-8">
        <button
          v-for="tab in brandTabs"
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

      <div class="grid justify-center items-center grid-cols-5 gap-[35px] w-[1295px]">
        <ProductCard
          v-for="item in currentProductsInBrand"
          :key="item.id"
          :product-id="String(item.id)"
          :product-img="item.img"
          :product-name="item.name"
          :product-price="item.price"
          @quick-view="openQuickView"
        />
      </div>
    </div>

    <!-- Quick View Modal -->
    <QuickViewModal
      v-if="isQuickViewOpen && selectedProduct"
      :is-open="isQuickViewOpen"
      :product="selectedProduct"
      @close="closeQuickView"
      @add-to-cart="handleAddToCartFromQuickView"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'

import BreadCrumb from '@/components/BreadCrumb.vue'
import FilterProduct from '@/components/FilterProduct.vue'
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'

/** Tabs types */
type TabKey = 'featured' | 'newArrivals' | 'bestSeller'
type CategoryKey = 'athleticFootwear' | 'luxuryLeatherShoes' | 'sustainableFootwear' | 'sandalsAndslides'
type BrandKey = 'nike' | 'vans' | 'adidas'

/** Tabs */
const tabs: { id: TabKey; label: string }[] = [
  { id: 'featured', label: 'FEATURED' },
  { id: 'newArrivals', label: 'NEW ARRIVALS' },
  { id: 'bestSeller', label: 'BEST SELLER' },
]

const categoryTabs: { id: CategoryKey; label: string }[] = [
  { id: 'athleticFootwear', label: 'Athletic Footwear' },
  { id: 'luxuryLeatherShoes', label: 'Luxury Leather Shoes' },
  { id: 'sustainableFootwear', label: 'Sustainable Footwear' },
  { id: 'sandalsAndslides', label: 'Sandals & Slides' },
]

const brandTabs: { id: BrandKey; label: string }[] = [
  { id: 'nike', label: 'NIKE' },
  { id: 'vans', label: 'VANS' },
  { id: 'adidas', label: 'ADIDAS' },
]

/** Active tab state */
const activeTab = ref<TabKey>('featured')
const activeTabForCategory = ref<CategoryKey>('athleticFootwear')
const activeTabForBrand = ref<BrandKey>('nike')

/** Product data */
const products: Record<TabKey, Array<{ id: string; name: string; price: string; img: string }>> = {
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

const productsByCategory: Record<CategoryKey, Array<{ id: string; name: string; price: string; img: string }>> = {
  athleticFootwear: [...products.featured],
  luxuryLeatherShoes: [...products.newArrivals],
  sustainableFootwear: [...products.bestSeller],
  sandalsAndslides: [...products.newArrivals],
}

const productsByBrand: Record<BrandKey, Array<{ id: string; name: string; price: string; img: string }>> = {
  nike: [...products.featured],
  vans: [...products.newArrivals],
  adidas: [...products.bestSeller],
}

/** Computed lists */
const currentProducts = computed(() => products[activeTab.value] || [])
const currentProductsInCategory = computed(() => productsByCategory[activeTabForCategory.value] || [])
const currentProductsInBrand = computed(() => productsByBrand[activeTabForBrand.value] || [])

/** QuickView state */
const isQuickViewOpen = ref(false)
const selectedProduct = ref<any>(null)

/** Cart store */
const cart = useCartStore()

/** Open quick view */
const openQuickView = (productId: string) => {
  const allProducts = [...products.featured, ...products.newArrivals, ...products.bestSeller]

  const product = allProducts.find((p) => String(p.id) === String(productId))
  if (!product) return

  selectedProduct.value = {
    ...product,
    description: 'Classic sneakers, clean, comfortable, perfect for any outfit.',
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'Nike',
    category: 'Athletic Footwear',
    madeIn: 'United States',
  }

  isQuickViewOpen.value = true
}

const closeQuickView = () => {
  isQuickViewOpen.value = false
  selectedProduct.value = null
}

/** Add to cart from modal */
const handleAddToCartFromQuickView = ({ product, size, qty }: any) => {
  cart.addToCart({
    id: Number(product.id),
    name: product.name,
    price: Number(String(product.price).replace('$', '')),
    img: product.img,
    size,
    quantity: qty,
  })
}
</script>

