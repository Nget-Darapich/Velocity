<template>
  <!-- TOP STATS -->
  <div class="grid grid-cols-4 gap-6 mb-6">
    <StatCard title="Deals" :value="String(deals)" />
    <StatCard title="Booked revenue" :value="bookedRevenue" />
    <StatCard title="Total orders" :value="String(totalOrders)" />
    <StatCard title="New leads" :value="String(newLeads)" />
  </div>

  <!-- CHART ROW -->
  <div class="grid grid-cols-2 gap-6">
    <!-- Donut Chart -->
    <div class="bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Stock by Brand</h3>
      <div class="h-[260px]">
        <DonutChart v-if="hasBrandData" :data="donutChartData" />
        <div v-else class="h-full flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      </div>
    </div>

    <!-- Radar Chart -->
    <div class="bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Stock Distribution by Brand</h3>
      <div class="h-[260px]">
        <RadarChart v-if="hasBrandData" :data="radarChartData" />
        <div v-else class="h-full flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import DonutChart from '@/components/admin/DonutChart.vue'
import RadarChart from '@/components/admin/RadarChart.vue'
import StatCard from '@/components/admin/StatCard.vue'

import { useProductStore } from '@/stores/store'
import { useInventoryStore } from '@/stores/inventory'

type BrandKey = 'nike' | 'adidas' | 'vans'

/* ---------------- STORES ---------------- */

const productStore = useProductStore()
const inventoryStore = useInventoryStore()

const { allProducts, wishlistCount, cartCount } = storeToRefs(productStore)
const { warehouses } = storeToRefs(inventoryStore)

/* ---------------- INIT ---------------- */

onMounted(async () => {
  await inventoryStore.initializeInventory()
})

/* ---------------- TOP STATS ---------------- */

const deals = computed(() => allProducts.value.length)

const bookedRevenue = computed(() => {
  let total = 0
  warehouses.value.forEach((w) =>
    w.products.forEach((p) => {
      total += p.stockAvailable * 25
    }),
  )
  return `$${(total / 1000).toFixed(1)}K`
})

const totalOrders = computed(() => cartCount.value)
const newLeads = computed(() => wishlistCount.value)

/* ---------------- STOCK BY BRAND (✔️ CORRECT) ---------------- */

const stockByBrand = computed<Record<BrandKey, number>>(() => {
  const counts: Record<BrandKey, number> = {
    nike: 0,
    adidas: 0,
    vans: 0,
  }

  allProducts.value.forEach((p) => {
    if (!p.brand) return
    const brand = p.brand.toLowerCase() as BrandKey
    if (brand in counts) {
      counts[brand]++
    }
  })

  return counts
})

const hasBrandData = computed(() => Object.values(stockByBrand.value).some((v) => v > 0))

/* ---------------- CHART DATA ---------------- */

const donutChartData = computed(() => ({
  labels: ['Nike', 'Adidas', 'Vans'],
  values: [stockByBrand.value.nike, stockByBrand.value.adidas, stockByBrand.value.vans],
}))

const radarChartData = computed(() => ({
  labels: ['Nike', 'Adidas', 'Vans'],
  values: [stockByBrand.value.nike, stockByBrand.value.adidas, stockByBrand.value.vans],
}))
</script>
