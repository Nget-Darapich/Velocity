<template>
  <div class="space-y-6">
    <!-- Page title -->
    <h1 class="text-xl font-semibold tracking-wide">ORDERS LIST</h1>

    <!-- Status cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Payment Refund" value="546" />
      <StatCard title="Order Cancel" value="546" />
      <StatCard title="Pending Review" value="546" />
      <StatCard title="Pending Payment" value="546" />
      <StatCard title="Order Shipped" value="546" />
      <StatCard title="Order Delivering" value="546" />
      <StatCard title="Delivered" value="546" />
      <StatCard title="In Progress" value="546" />
    </div>

    <!-- Order table -->
    <div class="bg-white rounded-xl p-6">
      <h2 class="text-lg font-semibold mb-4">All Order List</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-orange-300">
            <tr>
              <th class="p-3"><input type="checkbox" /></th>
              <th class="p-3 text-left">Order ID & Created date</th>
              <th class="p-3 text-left">Customer</th>
              <th class="p-3 text-left">Items & Price</th>
              <th class="p-3 text-left">Payment Status</th>
              <th class="p-3 text-left">Order Status</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b"
            >
              <td class="p-3">
                <input type="checkbox" />
              </td>

              <td class="p-3 flex items-center gap-3">
                <img
                  :src="order.image"
                  class="w-12 h-12 rounded bg-blue-100 object-contain"
                />
                <div>
                  <p class="font-semibold">#{{ order.id }}</p>
                  <p class="text-xs text-gray-500">Date: {{ order.date }}</p>
                </div>
              </td>

              <td class="p-3">{{ order.customer }}</td>
              <td class="p-3">{{ order.items }} (${{ order.price }})</td>

              <!-- Payment Status -->
              <td class="p-3">
                <span
                  class="px-4 py-1 rounded-lg text-white text-xs"
                  :class="paymentClass(order.payment)"
                >
                  {{ order.payment }}
                </span>
              </td>

              <!-- Order Status -->
              <td class="p-3">
                <span
                  class="px-4 py-1 rounded-lg text-xs border"
                  :class="orderClass(order.status)"
                >
                  {{ order.status }}
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
import StatCard from "@/components/admin/StatCard.vue";

const orders = [
  {
    id: "7364/83",
    date: "23/Mar/2025",
    customer: "PON LORK",
    items: 4,
    price: 368,
    payment: "Paid",
    status: "Draft",
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png"
  },
  {
    id: "7364/83",
    date: "23/Mar/2025",
    customer: "PON LORK",
    items: 4,
    price: 368,
    payment: "Unpaid",
    status: "Complete",
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png"
  },
  {
    id: "7364/83",
    date: "23/Mar/2025",
    customer: "PON LORK",
    items: 4,
    price: 368,
    payment: "Refund",
    status: "Draft",
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png"
  }
];

const paymentClass = (type: string) => {
  if (type === "Paid") return "bg-green-500";
  if (type === "Unpaid") return "bg-red-500";
  return "bg-gray-300 text-black";
};

const orderClass = (status: string) => {
  if (status === "Complete") return "border-green-500 text-green-600";
  return "border-yellow-400 text-yellow-600";
};
</script>
