<template class="w-[1200px]">
  <div class="flex justify-center gap-5">
    <img src="@/assets/images/poster1.png" alt="" class="w-[734px] border rounded-[30px]" />
    <img src="@/assets/images/poster2.png" alt="" class="w-[734px] border rounded-[30px]" />
  </div>

  <!-- Sneakers & Kicks Section -->
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
        :product-id="item.id"
        :product-img="item.img"
        :product-name="item.name"
        :product-price="item.price"
        @quick-view="openQuickView"
      />
    </div>
  </div>

  <!-- All Categories Section -->
  <div class="flex flex-col justify-center items-center gap-[30px] pb-10">
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
        :product-id="item.id"
        :product-img="item.img"
        :product-name="item.name"
        :product-price="item.price"
        @quick-view="openQuickView"
      />
    </div>
  </div>

  <!-- Trending Brands Section -->
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
        :product-id="item.id"
        :product-img="item.img"
        :product-name="item.name"
        :product-price="item.price"
        @quick-view="openQuickView"
      />
    </div>
  </div>

  <!--  Quick View Modal -->
  <QuickViewModal
    v-if="selectedProduct"
    :is-open="!!selectedProduct"
    :product="selectedProduct"
    @close="closeQuickView"
    @add-to-cart="handleAddToCartFromQuickView"
  />
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import QuickViewModal from '@/components/QuickViewModal.vue'
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'

import {
  tabs,
  categoryTabs,
  brandTabs,
  products,
  productsByCategory,
  productsByBrand,
  useProductStore,
  type TabKey,
  type CategoryKey,
  type BrandKey,
} from '@/stores/store'

/** cart store */
const cart = useCartStore()

/** Active tab state */
const activeTab = ref<TabKey>('featured')
const activeTabForCategory = ref<CategoryKey>('athleticFootwear')
const activeTabForBrand = ref<BrandKey>('nike')

/** Computed lists */
const currentProducts = computed(() => products[activeTab.value] || [])
const currentProductsInCategory = computed(() => productsByCategory[activeTabForCategory.value] || [])
const currentProductsInBrand = computed(() => productsByBrand[activeTabForBrand.value] || [])

/** modal state from product store */
const { selectedProduct, openQuickView, closeQuickView } = useProductStore()

interface QuickViewPayload {
  product: {
    id: string | number;
    name: string;
    price: string | number;
    img: string;
  };
  size: string;
  qty: number;
}

/**  QuickView -> Add to Cart */
const handleAddToCartFromQuickView = ({ product, size, qty }: QuickViewPayload) => {
  cart.addToCart({
    // Ensure ID is a number as required by cart.ts
    id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
    name: product.name,
    // Ensure Price is a number (removes '$' if it's a string)
    price: typeof product.price === 'string' 
      ? parseFloat(product.price.replace('$', '')) 
      : product.price,
    img: product.img,
    size,
    quantity: qty,
  })
}
</script>
