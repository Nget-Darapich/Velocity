<template >
  <header>
    <AdsTop :messages="promoMessages" />
    <SignupLogin />
    <NavBar />
  </header>
  <main class="grow">
    <router-view></router-view>
  </main>
  <footer>
    <FooterBlock />
  </footer>
</template>
<script setup lang="ts">
import AdsTop from '@/components/AdsTop.vue'
import FooterBlock from '@/components/FooterBlock.vue';
import NavBar from '@/components/NavBar.vue';
import SignupLogin from '@/components/SignupLogin.vue'
const promoMessages = [
  { text: "Hurry Up! Get your first deal with 15% off for newcomers!" },
  { text: "Enjoy 20% off your order with Nike." },
];
</script>
