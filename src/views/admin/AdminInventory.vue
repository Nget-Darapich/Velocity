<template>
  <div class="space-y-6">
    <!-- Title -->
    <h1 class="text-xl font-semibold tracking-wide">INVENTORY</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Product Items" value="3726" />
      <StatCard title="Instock Product Items" value="3726" />
      <StatCard title="Outstock Product Items" value="3726" />
      <StatCard title="Shipping Product Items" value="3726" />
    </div>

    <!-- Warehouse Section -->
    <div class="bg-white rounded-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Warehouse</h2>
          <p class="text-sm text-gray-500">Total : 636 Products</p>
        </div>

        <button
          class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Product to warehouse
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-orange-300 text-left">
            <tr>
              <th class="p-3"><input type="checkbox" /></th>
              <th class="p-3">Warehouse ID & Name</th>
              <th class="p-3">Manager</th>
              <th class="p-3">Stock Available</th>
              <th class="p-3">Stock Shipping</th>
              <th class="p-3">Revenue</th>
              <th class="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="i in 5"
              :key="i"
              class="border-b"
            >
              <td class="p-3">
                <input type="checkbox" />
              </td>

              <td class="p-3 flex items-center gap-3">
                <img
                  src="https://img.icons8.com/color/48/warehouse.png"
                  class="w-10 h-10 rounded"
                />
                <div>
                  <p class="font-semibold">Central City</p>
                  <p class="text-xs text-gray-500">ID: WH-001</p>
                </div>
              </td>

              <td class="p-3">PON LORK</td>
              <td class="p-3">7538</td>
              <td class="p-3">847</td>
              <td class="p-3">$1234</td>

              <td class="p-3 flex gap-2">
                <button class="bg-gray-100 p-2 rounded">👁️</button>
                <button class="bg-orange-300 p-2 rounded">✏️</button>
                <button class="bg-red-300 p-2 rounded">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from "@/components/admin/StatCard.vue";
</script>
