<!-- src/layouts/AuthLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Shared Header -->
    <header>
      <AdsTop :messages="promoMessages" />
      <SignupLogin />
      <NavBar />
    </header>

    <!-- Main Content: Just render the page (LoginPage or SignupPage) -->
    <main class="grow">
      <router-view />
    </main>

    <!-- Shared Footer -->
    <footer>
      <FooterBlock />
    </footer>
    
  </div>
</template>

<script setup lang="ts">
import AdsTop from '@/components/AdsTop.vue'
import SignupLogin from '@/components/SignupLogin.vue'
import NavBar from '@/components/NavBar.vue'
import FooterBlock from '@/components/FooterBlock.vue'

const promoMessages = [
  { text: 'Hurry Up! Get your first deal with 15% off for newcomers!' },
  { text: 'Enjoy 20% off your order with Nike.' },
]
</script>
