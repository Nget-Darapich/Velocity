<template>
  <div class="space-y-6">
    <!-- Page title -->
    <h1 class="text-xl font-semibold tracking-wide">PURCHASE</h1>

    <!-- Table Card -->
    <div class="bg-white rounded-xl p-6">
      <h2 class="text-lg font-semibold mb-4">All Purchase Items</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <!-- Table Header -->
          <thead class="bg-orange-300">
            <tr>
              <th class="p-3"><input type="checkbox" /></th>
              <th class="p-3 text-left">Order ID & Created date</th>
              <th class="p-3 text-left">Customer</th>
              <th class="p-3 text-left">Total</th>
              <th class="p-3 text-left">Payment Status</th>
              <th class="p-3 text-left">Purchase Status</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr
              v-for="purchase in purchases"
              :key="purchase.id"
              class="border-b"
            >
              <td class="p-3">
                <input type="checkbox" />
              </td>

              <!-- Order ID -->
              <td class="p-3">
                <p class="font-semibold">#{{ purchase.id }}</p>
                <p class="text-xs text-gray-500">Date: {{ purchase.date }}</p>
              </td>

              <!-- Customer -->
              <td class="p-3 flex items-center gap-3">
                <img
                  :src="purchase.avatar"
                  class="w-10 h-10 rounded bg-blue-100 object-cover"
                />
                <span>{{ purchase.customer }}</span>
              </td>

              <!-- Total -->
              <td class="p-3 font-semibold">
                ${{ purchase.total }}
              </td>

              <!-- Payment Status -->
              <td class="p-3">
                <span
                  class="px-4 py-1 rounded-lg text-white text-xs bg-green-500"
                >
                  Paid
                </span>
              </td>

              <!-- Purchase Status -->
              <td class="p-3">
                <span
                  class="px-4 py-1 rounded-lg text-xs border border-green-400 text-green-500"
                >
                  Items Received
                </span>
              </td>

              <!-- Actions -->
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
const purchases = [
  {
    id: "7364/83",
    date: "23/Mar/2025",
    customer: "PON LORK",
    total: 943,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "7364/83",
    date: "23/Mar/2025",
    customer: "PON LORK",
    total: 943,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];
</script>
