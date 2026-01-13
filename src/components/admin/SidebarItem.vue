<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-700 hover:bg-gray-100 mb-2 transition"
    active-class="bg-orange-400 text-white font-semibold"
    exact-active-class="bg-orange-400 text-white font-semibold"
  >
    <img :src="icon" class="w-5 h-5" />
    <span><slot /></span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  icon: string
}>()
</script>
