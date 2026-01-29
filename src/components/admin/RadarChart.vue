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

// const renderChart = () => {
//   if (!canvas.value) return

//   chart?.destroy()

//   chart = new Chart(canvas.value, {
//     type: 'radar',
//     data: {
//       labels: props.data.labels,
//       datasets: [
//         {
//           label: 'Stock by Brand',
//           data: props.data.values,
//           fill: true,
//           backgroundColor: 'rgba(251, 146, 60, 0.2)', // orange
//           borderColor: 'rgb(251, 146, 60)',
//           pointBackgroundColor: 'rgb(251, 146, 60)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgb(251, 146, 60)',
//           borderWidth: 3,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         r: {
//           beginAtZero: true,
//           ticks: {
//             display: true,
//           },
//         },
//       },
//     },
//   })
// }
const renderChart = () => {
  if (!canvas.value || !props.data.values.length) return

  if (chart) {
    chart.data.labels = props.data.labels
    if (chart.data.datasets[0]) {
      chart.data.datasets[0].data = props.data.values
    }
    chart.update()
    return
  }

  chart = new Chart(canvas.value, {
    type: 'radar',
    data: {
      labels: props.data.labels,
      datasets: [
        {
          label: 'Stock by Brand',
          data: props.data.values,
          fill: true,
          backgroundColor: 'rgba(251,146,60,0.2)',
          borderColor: 'rgb(251,146,60)',
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
          suggestedMax: Math.max(...props.data.values) * 1.2,
        },
      },
    },
  } as const)
}

onMounted(renderChart)
// watch(() => props.data, renderChart, { deep: true })
watch(() => [props.data.labels, props.data.values], renderChart, { deep: true })
</script>
