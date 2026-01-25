<template>
  <canvas ref="canvas" class="w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps<{
  data: {
    labels: string[]
    values: number[]
  }
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const renderChart = () => {
  if (!canvas.value) return

  chart?.destroy()

  chart = new Chart(canvas.value, {
    type: 'radar',
    data: {
      labels: props.data.labels,
      datasets: [
        {
          label: 'Stock by Brand',
          data: props.data.values,
          fill: true,
          backgroundColor: 'rgba(251, 146, 60, 0.2)', // orange
          borderColor: 'rgb(251, 146, 60)',
          pointBackgroundColor: 'rgb(251, 146, 60)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(251, 146, 60)',
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            display: true,
          },
        },
      },
    },
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
</script>
