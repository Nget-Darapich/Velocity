<template>
  <PageShell
    title="Terms & Conditions"
    subtitle="Simple demo terms for your Velocity project."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]"
  >
    <div class="box">
      <h3>Demo Project Notice</h3>
      <p>
        Velocity is an educational project. Product data, prices, and checkout flows are for learning and demo purposes.
      </p>

      <h3>Returns</h3>
      <p>
        Returns are accepted within 7–14 days if items are unused and in original packaging (demo policy).
      </p>

      <h3>Privacy</h3>
      <p>
        This demo does not store real user data. If you add backend later, update this policy.
      </p>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Useful Links</h3>
        <p class="sideText">Need answers? Check FAQ or contact us.</p>
        <div class="stack">
          <router-link class="btn2" to="/faq">Go to FAQ</router-link>
          <router-link class="btn2" to="/contact">Contact</router-link>
        </div>
      </div>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import PageShell from '@/components/PageShell.vue'
</script>

<style scoped>
.box { border: 1px solid #eee; border-radius: 14px; padding: 14px; }
h3 { margin: 14px 0 6px; font-size: 18px; font-weight: 900; }
h3:first-child { margin-top: 0; }
p { margin: 0; color: #333; line-height: 1.8; }

.sideTitle { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.sideText { margin: 0 0 14px; color: #333; line-height: 1.7; }
.stack { display: grid; gap: 10px; }
.btn2 { display: inline-block; padding: 10px 14px; border-radius: 12px; background: #111; color: #fff; font-weight: 900; text-decoration: none; text-align: center; }
.btn2:hover { opacity: .9; }
</style>
