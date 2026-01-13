<template>
  <div class="bg-white rounded-xl p-4 text-center">
    <div
      class="rounded-xl h-28 flex items-center justify-center mb-3"
      :class="bgColor"
    >
      <img :src="image" class="h-16 object-contain" />
    </div>
    <p class="font-semibold">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  image: string
  bgColor: string
}>()
</script>
