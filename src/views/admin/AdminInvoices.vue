<template>
  <div class="space-y-6">
    <!-- Page title -->
    <h1 class="text-xl font-semibold tracking-wide">INVOICES LIST</h1>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Invoice" value="546" />
      <StatCard title="Pending Invoice" value="546" />
      <StatCard title="Paid Invoice" value="546" />
      <StatCard title="Inactive Invoice" value="546" />
    </div>

    <!-- Invoice Table -->
    <div class="bg-white rounded-xl p-6">
      <h2 class="text-lg font-semibold mb-4">All Invoices List</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <!-- Table Header -->
          <thead class="bg-orange-300">
            <tr>
              <th class="p-3"><input type="checkbox" /></th>
              <th class="p-3 text-left">Invoice ID & Created date</th>
              <th class="p-3 text-left">Customer</th>
              <th class="p-3 text-left">Price</th>
              <th class="p-3 text-left">Payment Status</th>
              <th class="p-3 text-left">Payment Method</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id" class="border-b">
              <td class="p-3">
                <input type="checkbox" />
              </td>

              <!-- Invoice ID -->
              <td class="p-3">
                <p class="font-semibold">#{{ invoice.id }}</p>
                <p class="text-xs text-gray-500">Date: {{ invoice.date }}</p>
              </td>

              <!-- Customer -->
              <td class="p-3 flex items-center gap-3">
                <img :src="invoice.image" class="w-10 h-10 rounded bg-blue-100 object-contain" />
                <span>{{ invoice.customer }}</span>
              </td>

              <!-- Price -->
              <td class="p-3 font-semibold">${{ invoice.price }}</td>

              <!-- Payment Status -->
              <td class="p-3">
                <span
                  class="px-4 py-1 rounded-lg text-xs text-white"
                  :class="paymentStatusClass(invoice.status)"
                >
                  {{ invoice.status }}
                </span>
              </td>

              <!-- Payment Method -->
              <td class="p-3">
                {{ invoice.method }}
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
import StatCard from '@/components/admin/StatCard.vue'

const invoices = [
  {
    id: '7364/83',
    date: '23/Mar/2025',
    customer: 'PON LORK',
    price: 368,
    status: 'Completed',
    method: 'Mastercard',
    image: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png',
  },
  {
    id: '7364/83',
    date: '23/Mar/2025',
    customer: 'PON LORK',
    price: 368,
    status: 'Cancel',
    method: 'Paypal',
    image: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png',
  },
  {
    id: '7364/83',
    date: '23/Mar/2025',
    customer: 'PON LORK',
    price: 368,
    status: 'Pending',
    method: 'Visa',
    image: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png',
  },
]

const paymentStatusClass = (status: string) => {
  if (status === 'Completed') return 'bg-green-500'
  if (status === 'Cancel') return 'bg-red-500'
  return 'bg-gray-300 text-black'
}
</script>
