<template>
  <div
    class="h-[844px] bg-cover bg-center bg-no-repeat bg-[url('@/assets/images/cover.png')] flex flex-row text-white"
  >
    <div class="w-1/2"></div>
    <div class="flex flex-col pt-[167px] ml-20">
      <p class="text-[24px] font-medium ml-1">Step Into Style</p>
      <h1 class="pt-5 text-[64px] w-[600px]">Discover The Latest Trends In Footwear</h1>
      <p class="pt-5 text-[24px] font-medium w-[485px] ml-1">
        From classic sneakers to trendy boots, our collection has something for everyone.
      </p>
      <router-link to="/auth/signup" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          class="bg-[#992020] text-white text-[24px] flex gap-2 items-center justify-center w-[180px] h-[70px] mt-10"
        >
          <span>Shop Now</span> <MoveRight />
        </button>
      </router-link>
    </div>
  </div>
  <div class="h-[500px]">
    <p class="py-[45px] flex items-center justify-center text-5xl font-medium">All Categories</p>
    <div class="flex items-center justify-center">
      <div class="grid grid-cols-4 gap-[50px]">
        <CategoryCard
          v-for="item in categories"
          :key="item.img"
          :categoryImg="item.img"
          :categoryName="item.name"
        />
      </div>
    </div>
  </div>
  <div class="h-[400px] mx-[60px]">
    <p class="pb-[45px] flex items-center justify-center text-5xl font-medium">Popular Brands</p>
    <div class="flex items-center justify-center">
      <div class="grid grid-cols-3 gap-[50px]">
        <BrandCard
          v-for="item in brands"
          :key="item.img"
          :brandImg="item.img"
          :brandName="item.name"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center gap-[30px] pt-10 pb-10">
    <p class="text-[#969494] text-xl font-medium">
      Emerging sneaker trends for fitness and everyday wear
    </p>
    <p class="text-5xl font-medium">Sneakers & Kicks</p>

    <!-- Tabs -->
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
      />
    </div>
  </div>
  <div
    class="h-[597px] bg-cover bg-center bg-no-repeat bg-[url('@/assets/images/cover_below.png')] flex flex-row"
  >
    <div class="w-1/2"></div>
    <div class="flex flex-col pt-40 ml-20">
      <p class="text-[16px] font-medium ml-1">Comfort Meets Fashion</p>
      <h1 class="pt-5 text-[40px] w-[600px]">Discover shoes that look great and feel evenbetter</h1>
      <p class="pt-5 text-[16px] font-medium w-[485px] ml-1">
        Our collection features comfortable and stylish aim to keep your feet happy all day long.
      </p>
      <router-link to="/auth/signup" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          class="bg-[#992020] text-white text-[24px] flex gap-2 items-center justify-center w-[180px] h-[70px] mt-10"
        >
          <span>Shop Now</span> <MoveRight />
        </button>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import BrandCard from '@/components/home/BrandCard.vue'
import CategoryCard from '@/components/home/CategoryCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import { MoveRight } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { categories, brands, tabs, products, type TabKey } from '@/stores/store'

const activeTab = ref<TabKey>('featured')

const currentProducts = computed(() => {
  return products[activeTab.value] || []
})
</script>