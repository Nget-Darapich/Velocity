<template>
  <div class="bg-white p-5 rounded-xl flex justify-between items-start">
    <div>
      <p class="text-gray-400 text-sm">{{ title }}</p>
      <h2 class="text-xl font-bold mt-1">{{ value }}</h2>
    </div>

    <div class="w-10 h-10 bg-orange-100 rounded-lg"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  value: String,
});
</script>
