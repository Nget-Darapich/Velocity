<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-xl rounded-2xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between border-b px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-800">Add New Product</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5 space-y-4">
        <!-- Product Name -->
        <div>
          <label class="text-sm font-medium text-gray-600">Product Name</label>
          <input
            v-model="form.name"
            placeholder="Running Shoes"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
        <!-- Image Upload -->
        <div>
          <label class="text-sm font-medium text-gray-600">Product Image</label>

          <input
            type="file"
            accept="image/*"
            class="mt-1 block w-full text-sm"
            @change="onImageChange"
          />

          <!-- Preview -->
          <img
            v-if="form.img"
            :src="form.img"
            class="mt-3 h-32 w-32 object-contain rounded border"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="text-sm font-medium text-gray-600">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Short product description..."
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        <!-- Price & Stock -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Price ($)</label>
            <input
              v-model.number="form.price"
              type="number"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600">Stock</label>
            <input
              v-model.number="form.stock"
              type="number"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>
        </div>

        <!-- Category & Brand -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Category</label>
            <select
              v-model="form.category"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            >
              <option value="athleticFootwear">Athletic Footwear</option>
              <option value="luxuryLeatherShoes">Luxury Leather</option>
              <option value="sustainableFootwear">Sustainable</option>
              <option value="sandalsAndslides">Sandals & Slides</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600">Brand</label>
            <select
              v-model="form.brand"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            >
              <option value="nike">Nike</option>
              <option value="vans">Vans</option>
              <option value="adidas">Adidas</option>
            </select>
          </div>
        </div>

        <!-- Publish -->
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" v-model="form.published" class="h-4 w-4 accent-orange-500 mt-1" />
          <span class="text-sm text-gray-600"> Publish product on website </span>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 border-t px-6 py-4">
        <button
          @click="$emit('close')"
          class="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          @click="submit"
          class="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useProductStore } from '@/stores/store'
import type { StoreProduct } from '@/types/product'

defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

const store = useProductStore()

const form = reactive<Omit<StoreProduct, 'id' | 'createdAt'>>({
  name: '',
  description: '',
  price: 0,
  img: '',
  category: 'athleticFootwear',
  brand: 'nike',
  sizeRange: '40–45',
  stock: 0,
  published: true,
})

const submit = () => {
  store.addProduct(form)
  emit('close')
}
const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    form.img = reader.result as string
  }
  reader.readAsDataURL(file)
}
</script>
