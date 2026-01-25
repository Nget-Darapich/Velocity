<template>
  <PageShell
    title="About Velocity"
    subtitle="A modern e-commerce shoe store built with Vue 3."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'About Us' }]"
  >
    <div class="grid">
      <div class="box">
        <h3>Our Mission</h3>
        <p>
          Velocity is built to provide a clean shopping experience with fast browsing, modern UI,
          and a simple cart + wishlist flow.
        </p>
      </div>

      <div class="box">
        <h3>What we offer</h3>
        <ul>
          <li>Brand & category browsing</li>
          <li>Quick view & product detail pages</li>
          <li>Wishlist and cart with Pinia</li>
          <li>Checkout flow (demo)</li>
        </ul>
      </div>

      <div class="box">
        <h3>Built for learning</h3>
        <p>
          This project is designed for an Internet Programming course and demonstrates component
          architecture, routing, and state management.
        </p>
      </div>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Explore Products</h3>
        <p class="sideText">Browse the latest shoes by brand and category.</p>
        <router-link class="btn" to="/products">Go to Products</router-link>
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
