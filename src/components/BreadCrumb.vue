<template>
  <div class="flex items-center gap-2 text-2xl w-[255px] ml-[62px] mt-5 font-medium text-[18px]">
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link
        v-if="index < breadcrumbs.length - 1"
        :to="crumb.path"
        class="hover:text-blue-600"
      >
        {{ crumb.name }}
      </router-link>
      <span v-else class="text-[#992020]">
        {{ crumb.name }}
      </span>
      <span v-if="index < breadcrumbs.length - 1" class="mx-2">></span>
    </span>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

type RouteName = 'Home' | 'Products' | 'ProductDetail' | 'About' | 'Category' | 'BrandNike' | 'BrandVans' | 'BrandAdidas' | 'AthleticFootwear' | 'LuxuryLeatherShoes' | 'SustainableFootwear' | 'SandalsAndSlide'

const breadcrumbMap: Record<RouteName, string> = {
  Home: 'Home',
  Products: 'Product',
  ProductDetail: 'Product Detail',
  About: 'About us',
  Category: 'Category',
  BrandNike: 'Nike',
  BrandVans: 'Vans',
  BrandAdidas: 'Adidas',
  AthleticFootwear: 'athleticFootwear',
  LuxuryLeatherShoes: 'luxuryLeatherShoes',
  SustainableFootwear: 'sustainableFootwear',
  SandalsAndSlide: 'sandalsAndSlide'

}

const breadcrumbs = computed(() => {
  const crumbs = [{ name: 'Home', path: '/' }]

  const routeName = route.name?.toString()
  if (routeName && routeName in breadcrumbMap) {
    crumbs.push({
      name: breadcrumbMap[routeName as RouteName],
      path: route.path
    })
  }
  return crumbs
})
</script>