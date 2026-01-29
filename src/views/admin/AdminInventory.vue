<template>
  <div class="space-y-6">
    <!-- Title -->
    <h1 class="text-xl font-semibold tracking-wide">INVENTORY</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Product Items" :value="String(totalProductItems)" />
      <StatCard title="Instock Product Items" :value="String(inStockItems)" />
      <StatCard title="Outstock Product Items" :value="String(outStockItems)" />
      <StatCard title="Shipping Product Items" :value="String(shippingItems)" />
    </div>

    <!-- BRAND = WAREHOUSE -->
<!-- BRAND = WAREHOUSE -->
<div
  v-for="warehouse in warehouses"
  :key="warehouse.id"
  class="bg-white rounded-xl p-6"
>
  <!-- Warehouse Header -->
  <div class="flex justify-between items-center mb-4">
    <div>
      <h2 class="text-lg font-semibold">{{ warehouse.brand }} Warehouse</h2>
      <p class="text-sm text-gray-500">
        Total : {{ warehouse.products.length }} Products
      </p>
    </div>

    <button
      class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
    >
      Manage {{ warehouse.brand }}
    </button>
  </div>

  <!-- SUMMARY TABLE -->
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="bg-orange-300 text-left">
        <tr>
          <th class="p-3">Warehouse</th>
          <th class="p-3">Total Products</th>
          <th class="p-3">Stock Available</th>
          <th class="p-3">Stock Shipping</th>
          <th class="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr class="border-b">
          <td class="p-3 font-semibold">
            {{ warehouse.brand }}
          </td>

          <td class="p-3">
            {{ warehouse.products.length }}
          </td>

          <td class="p-3">
            {{
              warehouse.products.reduce(
                (sum, p) => sum + p.stockAvailable,
                0
              )
            }}
          </td>

          <td class="p-3">
            {{
              warehouse.products.reduce(
                (sum, p) => sum + p.stockShipping,
                0
              )
            }}
          </td>

          <td class="p-3 flex gap-2">
            <button class="bg-gray-100 p-2 rounded">👁️</button>
            <button class="bg-orange-300 p-2 rounded">✏️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  </div>
</template>
<script setup lang="ts">
import StatCard from '@/components/admin/StatCard.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
//import { useProductStore } from '@/stores/store'
import { useInventoryStore } from '@/stores/inventory'

//const productStore = useProductStore()
const inventoryStore = useInventoryStore()

//const { findProductById } = productStore

const { warehouses, totalProductItems, shippingItems } = storeToRefs(inventoryStore)

// optional (if you want counts later)
const inStockItems = totalProductItems
const outStockItems = 0

onMounted(() => {
  inventoryStore.initializeInventory()
})

// helper
// const getProduct = (productId: string) => {
//   return findProductById(productId)
// }
</script>
