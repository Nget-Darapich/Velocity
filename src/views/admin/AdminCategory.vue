<template>
  <div class="space-y-6">
    <!-- Page title -->
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold tracking-wide">CATEGORY</h1>

      <select class="border rounded-lg px-3 py-2 text-sm text-gray-600">
        <option>May 2025</option>
        <option>April 2025</option>
      </select>
    </div>

    <!-- Category Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CategoryCard
        title="Running Shoes"
        bgColor="bg-sky-400"
        image="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png"
      />
      <CategoryCard
        title="Basketball Shoes"
        bgColor="bg-orange-400"
        image="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png"
      />
      <CategoryCard
        title="Walking Shoes"
        bgColor="bg-yellow-300"
        image="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png"
      />
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">All categories list</h2>
          <p class="text-sm text-gray-500">Total : 27 Categories</p>
        </div>

        <button
          class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Product
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-orange-300">
            <tr>
              <th class="p-3"><input type="checkbox" /></th>
              <th class="p-3 text-left">Product name</th>
              <th class="p-3 text-left">Size</th>
              <th class="p-3 text-left">Starting Price</th>
              <th class="p-3 text-left">Stock</th>
              <th class="p-3 text-left">Rating</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="category in categories"
              :key="category.id"
              class="border-b"
            >
              <td class="p-3">
                <input type="checkbox" />
              </td>

              <td class="p-3 flex items-center gap-3">
                <img
                  :src="category.image"
                  class="w-12 h-12 rounded bg-blue-100 object-contain"
                />
                <span class="font-semibold">{{ category.name }}</span>
              </td>

              <td class="p-3">{{ category.size }}</td>
              <td class="p-3">{{ category.price }}</td>
              <td class="p-3">{{ category.stock }}</td>

              <td class="p-3 text-yellow-400">
                ★★★★★
              </td>

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
import CategoryCard from "@/components/admin/CategoryCard.vue";

const categories = [
  {
    id: 1,
    name: "Walking Shoes",
    size: "40–45",
    price: "$50–$200",
    stock: 200,
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png"
  },
  {
    id: 2,
    name: "Running Shoes",
    size: "40–45",
    price: "$50–$200",
    stock: 200,
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png"
  },
  {
    id: 3,
    name: "Basketball Shoes",
    size: "40–45",
    price: "$50–$200",
    stock: 200,
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png"
  }
];
</script>
