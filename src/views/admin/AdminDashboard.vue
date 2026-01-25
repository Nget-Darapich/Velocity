<template>
  <!-- TOP STATS -->
  <!-- TOP STATS -->
  <div class="grid grid-cols-4 gap-6">
    <StatCard title="Deals" :value="String(deals)" />
    <StatCard title="Booked revenue" :value="bookedRevenue" />
    <StatCard title="Total orders" :value="String(totalOrders)" />
    <StatCard title="New leads" :value="String(newLeads)" />
  </div>

  <!-- CHART ROW -->
  <div class="grid grid-cols-3 gap-6">
    <div class="bg-white p-5 rounded-xl flex items-center justify-center text-gray-400">
      <DonutChart v-if="donutChartData.labels.length" :data="donutChartData" />
    </div>
  </div>

  <!-- BOTTOM ROW -->
  <div class="grid grid-cols-2 gap-6">
    <!-- <div class="bg-white p-5 rounded-xl flex items-center justify-center text-gray-400">
      Provinces chart (coming soon)
    </div> -->

    <div class="col-span-2 bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Stock Distribution by Brand</h3>

      <!-- control size here -->
      <div class="h-[260px]">
        <RadarChart :data="radarChartData" />
      </div>
    </div>
  </div>
  <div class="bg-white p-5 rounded-xl">
    <h3 class="font-semibold mb-4">Stock Distribution by Brand</h3>

    <div class="h-[260px]">
      <DonutChart v-if="donutChartData.labels.length" :data="donutChartData" />
      <div v-else class="h-full flex items-center justify-center text-gray-400">
        Loading chart...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DonutChart from '@/components/admin/DonutChart.vue'
import StatCard from '@/components/admin/StatCard.vue'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/store'
import { useInventoryStore } from '@/stores/inventory'
import RadarChart from '@/components/admin/RadarChart.vue'
const radarChartData = computed(() => {
  return {
    labels: warehouses.value.map((w) => w.brand),
    values: warehouses.value.map((w) => w.products.reduce((sum, p) => sum + p.stockAvailable, 0)),
  }
})

const productStore = useProductStore()
const inventoryStore = useInventoryStore()

const { allProducts, wishlistCount, cartCount } = storeToRefs(productStore)
const { warehouses } = storeToRefs(inventoryStore)

/* ---------------- INIT ---------------- */
onMounted(() => {
  inventoryStore.initializeInventory()
})

/* ---------------- TOP STATS ---------------- */

// Deals = total products
const deals = computed(() => allProducts.value.length)

// Booked revenue (mocked from inventory stock)
const bookedRevenue = computed(() => {
  let total = 0

  warehouses.value.forEach((w) => {
    w.products.forEach((p) => {
      total += p.stockAvailable * 25 // mock price per unit
    })
  })

  return `$${(total / 1000).toFixed(1)}K`
})

// Total orders (use cart count for now)
const totalOrders = computed(() => cartCount.value)

// New leads (wishlist count)
const newLeads = computed(() => wishlistCount.value)

/* ---------------- BAR CHART ---------------- */
// Top 3 products by total stock

const donutChartData = computed(() => {
  return {
    labels: warehouses.value.map((w) => w.brand),
    values: warehouses.value.map((w) =>
      w.products.reduce((total, p) => total + p.stockAvailable, 0),
    ),
  }
})

onMounted(async () => {
  await inventoryStore.initializeInventory()
})
</script>
