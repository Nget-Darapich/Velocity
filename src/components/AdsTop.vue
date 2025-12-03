<script setup lang="ts">
interface TickerMessage {
  text: string;
}

const props = defineProps<{
  messages: TickerMessage[];
}>();

</script>

<template>
  <div class="grid bg-linear-to-r from-[#6A65FF] via-[#B067AE] to-[#EF7C7C] overflow-hidden relative h-[30px]">
    <!-- Scrolling Text Tracks -->
    <div
      class="col-start-1 row-start-1 flex overflow-hidden items-center justify-center mx-50"
    >
      <div class="animate-text-scroll flex shrink-0 gap-100 pr-100 text-sm font-medium">
        <template v-for="copy in [1, 2]" :key="copy">
          <span
            v-for="msg in props.messages"
            :key="`${msg.text}-${copy}`"
            class="shrink-0 text-sm font-medium text-white"
          >
            {{ msg.text }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes text-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-text-scroll {
  display: flex;
  white-space: nowrap;
  animation: text-scroll 20s linear infinite;
  animation-play-state: running;
  will-change: transform;
}
</style>
