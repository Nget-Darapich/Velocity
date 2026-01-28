<template>
  <canvas ref="canvas" class="w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

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
    type: 'doughnut',
    data: {
      labels: props.data.labels,
      datasets: [
        {
          data: props.data.values,
          backgroundColor: ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  })
}

onMounted(renderChart)
// watch(() => props.data, renderChart, { deep: true })
watch(() => [props.data.labels, props.data.values], renderChart, { deep: true })
</script>
