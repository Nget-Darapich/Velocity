<template>
  <PageShell
    title="Product Care & Repair"
    subtitle="Keep your shoes clean, fresh, and long-lasting."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Product Care & Repair' }]"
  >
    <div class="grid">
      <div class="box">
        <h3>Daily Care</h3>
        <ul>
          <li>Brush off dust after each use.</li>
          <li>Let shoes dry naturally (avoid strong heat).</li>
          <li>Use shoe trees to keep shape.</li>
        </ul>
      </div>

      <div class="box">
        <h3>Leather Care</h3>
        <ul>
          <li>Wipe with a soft cloth.</li>
          <li>Apply leather conditioner sometimes.</li>
          <li>Store away from direct sunlight.</li>
        </ul>
      </div>

      <div class="box">
        <h3>Repairs</h3>
        <p>
          For sole or stitching issues, contact support. We can suggest repair options (demo).
        </p>
      </div>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Need a repair?</h3>
        <p class="sideText">Send your issue and order ID to our support.</p>
        <router-link class="btn" to="/contact">Contact Support</router-link>
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
.box p { margin: 0; color: #333; line-height: 1.8; }
.box ul { margin: 0; padding-left: 18px; line-height: 1.9; color: #333; }

.sideTitle { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.sideText { margin: 0 0 14px; color: #333; line-height: 1.7; }
.btn { display: inline-block; padding: 10px 14px; border-radius: 12px; background: #ff8a00; color: #fff; font-weight: 900; text-decoration: none; }
.btn:hover { opacity: .9; }
</style>
