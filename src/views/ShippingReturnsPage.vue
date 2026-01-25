<template>
  <PageShell
    title="Shipping & Returns"
    subtitle="Clear information about shipping time and return policy (demo)."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Shipping & Returns' }]"
  >
    <div class="grid">
      <div class="box">
        <h3>Shipping</h3>
        <p><strong>Standard:</strong> 2–5 business days (demo).</p>
        <p><strong>Express:</strong> 1–2 business days (demo).</p>
      </div>

      <div class="box">
        <h3>Returns</h3>
        <p>Returns accepted within 7–14 days if unused and in original packaging.</p>
      </div>

      <div class="box">
        <h3>Refunds</h3>
        <p>Refunds are processed after inspection (demo).</p>
      </div>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Track your order</h3>
        <p class="sideText">Check delivery status anytime.</p>
        <router-link class="btn" to="/track-order">Track Order</router-link>
      </div>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import PageShell from '@/components/PageShell.vue'
</script>

<style scoped>
.grid { display: grid; gap: 14px; }
.box { border: 1px solid #eee; border-radius: 14px; padding: 14px; }
.box h3 { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.box p { margin: 0 0 8px; color: #333; line-height: 1.8; }
.box p:last-child { margin-bottom: 0; }

.sideTitle { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.sideText { margin: 0 0 14px; color: #333; line-height: 1.7; }
.btn { display: inline-block; padding: 10px 14px; border-radius: 12px; background: #ff8a00; color: #fff; font-weight: 900; text-decoration: none; }
.btn:hover { opacity: .9; }
</style>
