<template>
  <!-- TOP STATS -->
  <div class="grid grid-cols-4 gap-6">
    <StatCard title="Deals" value="356" />
    <StatCard title="Booked revenue" value="$123.5K" />
    <StatCard title="Total orders" value="13,239" />
    <StatCard title="New leads" value="2,384" />
  </div>

  <!-- CHART ROW -->
  <div class="grid grid-cols-3 gap-6">
    <div class="col-span-2 bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Statistics of top 3 shoes</h3>
      <BarChart />
    </div>

    <div class="bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Stocks</h3>
      <DonutChart />
    </div>
  </div>

  <!-- BOTTOM ROW -->
  <div class="grid grid-cols-2 gap-6">
    <div class="bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Provinces</h3>
      <DonutChart />
    </div>

    <div class="bg-white p-5 rounded-xl">
      <h3 class="font-semibold mb-4">Sold</h3>
      <LineChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from '@/components/admin/StatCard.vue'
//import BarChart from "@/components/admin/BarChart.vue";
// import DonutChart from "@/components/admin/DonutChart.vue";
// import LineChart from "@/components/admin/LineChart.vue";
</script>
