<script setup lang="ts">
import { Eye, Heart, ShoppingCart } from 'lucide-vue-next'
//import { useCartStore } from '@/stores/store'
import { useProductStore } from '@/stores/store'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()


// const props = defineProps<{
//   productImg: string
//   productName: string
//   productPrice: string
//   productId: string
// }>()
import type { Product } from '@/stores/store'

const props = defineProps<{
  product: Product
}>()


//const cart = useCartStore()
const { toggleWishlist, isInWishlist } = useProductStore() //

// const imageUrl = computed(
//   () => new URL(`../assets/images/${props.productImg}`, import.meta.url).href,
// )
// const imageUrl = computed(() => {
//   try {
//     return new URL(`../../assets/images/${props.product.img}`, import.meta.url).href
//   } catch {
//     return ''
//   }
// })
const imageUrl = computed(() => {
  try {
    return new URL(
      `../assets/images/${props.product.img}`,
      import.meta.url
    ).href
  } catch {
    return ''
  }
})


const productStore = useProductStore()

const openQuickView = () => {
  productStore.openQuickView(props.product.id)
}
const openProductDetail = () => {
  router.push({
    name: 'detail',
    params: { id: props.product.id },
    query: {
      from: route.name?.toString(), // home | products | brand | category
      brand: route.params.brand,           // PASS BRAND
      category: route.params.category,     // PASS CATEGORY
    },
  })
}

// const addToCart = () => {
//   cart.addToCart({
//     id: props.productId,
//     name: props.productName,
//     price: Number(props.productPrice.replace('$', '')),
//     img: props.productImg,
//     size: 'M',
//     quantity: 1,
//   })
// }
const addToCart = () => {
  productStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: Number(props.product.price.replace('$', '')),
    img: props.product.img,
    size: 'M',
    quantity: 1,
  })
}

</script>

<template>
  <div class="h-[455px] w-[231px] flex flex-col">
    <div
      class="h-80 flex justify-center bg-no-repeat cursor-pointer"
      :style="{ backgroundImage: `url(${imageUrl})` }"
      @click="openProductDetail"
    ></div>

    <div class="h-[135px] flex flex-col gap-2.5 pt-[5px] font-semibold">
      <p class="text-[#969494]">{{ props.product.price }}</p>
      <h3 class="cursor-pointer hover:underline" @click="openProductDetail">
        {{ props.product.name }}
      </h3>
      <div class="bg-[#C9C8CB] w-[231px] h-0.5"></div>
      <div class="flex text-center h-[26px]">
        <div class="flex cursor-pointer" @click="addToCart">
          <ShoppingCart :size="24" />
          <p class="pt-0.5 pl-1">ADD TO CART</p>
        </div>

        <Heart
          :size="24"
          class="ml-auto cursor-pointer transition-colors"
          :class="{ 'fill-red-500 text-[#992020]': isInWishlist(props.product.id) }"
          @click="toggleWishlist(props.product.id)"
        />

        <Eye :size="24" class="ml-4 cursor-pointer" @click="openQuickView" />
      </div>
    </div>
  </div>
</template>
