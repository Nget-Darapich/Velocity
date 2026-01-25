<template>
  <PageShell
    title="FAQ"
    subtitle="Quick answers about shipping, returns, and orders."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'FAQ' }]"
  >
    <div class="faq">
      <details class="item" open>
        <summary>How long does shipping take?</summary>
        <p>Usually 2–5 business days depending on your location.</p>
      </details>

      <details class="item">
        <summary>Can I return a product?</summary>
        <p>Yes. Returns are accepted within 7–14 days if the item is unused and in original packaging.</p>
      </details>

      <details class="item">
        <summary>How do I track my order?</summary>
        <p>Use the Track Order page and enter your order ID.</p>
      </details>

      <details class="item">
        <summary>Do you offer promo codes?</summary>
        <p>Yes. Promo codes appear occasionally. Check the promo banner and cart promo section.</p>
      </details>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Still need help?</h3>
        <p class="sideText">Contact our support team and we’ll reply as soon as possible.</p>
        <router-link class="btn" to="/contact">Contact Us</router-link>
      </div>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import PageShell from '@/components/PageShell.vue'
</script>

<style scoped>
.faq { display: grid; gap: 12px; }
.item { border: 1px solid #eee; border-radius: 12px; padding: 12px 14px; }
.item summary { cursor: pointer; font-weight: 900; color: #111; }
.item p { margin: 10px 0 0; color: #333; line-height: 1.7; }

.sideTitle { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.sideText { margin: 0 0 14px; color: #333; line-height: 1.7; }
.btn { display: inline-block; padding: 10px 14px; border-radius: 12px; background: #ff8a00; color: #fff; font-weight: 900; text-decoration: none; }
.btn:hover { opacity: .9; }
</style>
