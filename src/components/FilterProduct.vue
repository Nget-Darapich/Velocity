<script setup lang="ts">
import { ref } from 'vue'

const priceOptions = [
  { id: 'all', label: 'All' },
  { id: '100-500', label: '$100-$500' },
  { id: '500-1000', label: '$500-$1000' },
] as const

const madeInOptions = [
  { id: 'all', label: 'All' },
  { id: 'US', label: 'United States' },
  { id: 'UK', label: 'United Kingdom' },
  { id: 'CN', label: 'China' },
] as const

const sizeOptions = [
  { id: 'all', label: 'All' },
  { id: '15-27', label: '15-27 (Toddlers)' },
  { id: '28-34', label: '28-34 (Children)' },
  { id: '35-39', label: '35-39 (Women)' },
  { id: '40-46', label: '40-46 (Men)' },
] as const

type PriceOption = (typeof priceOptions)[number]['id']
type MadeInOption = (typeof madeInOptions)[number]['id']
type SizeOption = (typeof sizeOptions)[number]['id']

const newArrivalsOrDiscount = ref<'new' | 'discount' | null>(null)
const priceRange = ref<PriceOption>('all')
const madeIn = ref<MadeInOption>('all')
const sizeRange = ref<SizeOption | null>('all')

const resetFilters = () => {
  newArrivalsOrDiscount.value = null
  priceRange.value = 'all'
  madeIn.value = 'all'
  sizeRange.value = 'all'
}

const toggleNewOrDiscount = (choice: 'new' | 'discount') => {
  newArrivalsOrDiscount.value = newArrivalsOrDiscount.value === choice ? null : choice
}
</script>

<template>
  <div
    class="h-[882px] w-[280px] border rounded-[25px] flex flex-col font-medium text-[18px] bg-white p-3"
  >
    <div class="flex justify-between items-center pt-0">
      <button class="text-gray-800 hover:text-blue-800 hover:font-semibold">Filters</button>
      <button @click="resetFilters" class="text-[#992020]">Reset</button>
    </div>

    <div class="mt-4 space-y-6 overflow-y-auto flex-1">
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            :checked="newArrivalsOrDiscount === 'new'"
            @change="toggleNewOrDiscount('new')"
            class="w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#992020] checked:border-[#992020] appearance-none cursor-pointer"
          />
          <span>New Arrivals</span>
        </div>
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            :checked="newArrivalsOrDiscount === 'discount'"
            @change="toggleNewOrDiscount('discount')"
            class="w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#992020] checked:border-[#992020] appearance-none cursor-pointer"
          />
          <span>Discounted Deals</span>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Price</h3>
        <div class="space-y-3">
          <div v-for="opt in priceOptions" :key="opt.id" class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="priceRange === opt.id"
              @change="priceRange = opt.id"
              class="w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#992020] checked:border-[#992020] appearance-none cursor-pointer"
            />
            <span>{{ opt.label }}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Made in</h3>
        <div class="space-y-3">
          <div v-for="opt in madeInOptions" :key="opt.id" class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="madeIn === opt.id"
              @change="madeIn = opt.id"
              class="w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#992020] checked:border-[#992020] appearance-none cursor-pointer"
            />
            <span>{{ opt.label }}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Size (EU)</h3>
        <div class="space-y-3">
          <div v-for="opt in sizeOptions" :key="opt.id" class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="sizeRange === opt.id"
              @change="sizeRange = opt.id"
              class="w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#992020] checked:border-[#992020] appearance-none cursor-pointer"
            />
            <span>{{ opt.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='checkbox'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
}
input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  opacity: 0;
}
input[type='checkbox']:checked::before {
  opacity: 1;
}
</style>
