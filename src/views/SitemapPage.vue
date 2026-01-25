<template>
  <PageShell
    title="Sitemap"
    subtitle="Quick navigation to the main parts of Velocity."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Sitemap' }]"
  >
    <div class="grid">
      <div class="box">
        <h3>Shop</h3>
        <ul>
          <li><router-link to="/products">Products</router-link></li>
          <li><router-link to="/cart">Cart</router-link></li>
          <li><router-link to="/wishlist">Wishlist</router-link></li>
          <li><router-link to="/checkout">Checkout</router-link></li>
        </ul>
      </div>

      <div class="box">
        <h3>Categories</h3>
        <ul>
          <li><router-link to="/products/category/athleticFootwear">Athletic Footwear</router-link></li>
          <li><router-link to="/products/category/luxuryLeatherShoes">Luxury Leather Shoes</router-link></li>
          <li><router-link to="/products/category/sustainableFootwear">Sustainable Footwear</router-link></li>
          <li><router-link to="/products/category/sandalsAndslides">Sandles &amp; Slides</router-link></li>
        </ul>
      </div>

      <div class="box">
        <h3>Support</h3>
        <ul>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/terms">Terms &amp; Conditions</router-link></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
          <li><router-link to="/track-order">Track Your Order</router-link></li>
          <li><router-link to="/product-care">Product Care &amp; Repair</router-link></li>
          <li><router-link to="/shipping-returns">Shipping &amp; Returns</router-link></li>
        </ul>
      </div>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Admin</h3>
        <p class="sideText">If you’re working as admin, go here:</p>
        <router-link class="btn2" to="/admin">Admin Dashboard</router-link>
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
.box ul { margin: 0; padding-left: 18px; line-height: 2; }
.box a { text-decoration: none; color: #111; font-weight: 700; }
.box a:hover { opacity: .75; }

.sideTitle { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.sideText { margin: 0 0 14px; color: #333; line-height: 1.7; }
.btn2 { display: block; padding: 10px 14px; border-radius: 12px; background: #111; color: #fff; font-weight: 900; text-decoration: none; text-align: center; }
.btn2:hover { opacity: .9; }
</style>
