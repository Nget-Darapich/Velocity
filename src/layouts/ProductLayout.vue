<template>
  <BreadCrumb class="" />
  <div class="grow grid grid-cols-6 gap-[35px] ml-[50px] mt-5">
    <div class="col-span-1">
      <FilterProduct/>
    </div>
    <div class="col-span-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from '@/components/BreadCrumb.vue'
import FilterProduct from '@/components/FilterProduct.vue'
</script>
