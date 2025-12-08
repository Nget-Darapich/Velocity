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
    <!-- <footer>
      <FooterBlock />
    </footer> -->
    <footer>
      <div class="h-[290px] mx-[60px] py-[26px] flex flex-col">
        <div class="grid grid-cols-4 gap-[290px]">
          <div class="col-span-[310px] flex flex-col">
            <h2 class="font-semibold text-3xl">VELOCITY</h2>
            <p class="h-20 w-[310px] pt-8">
              driven by our determination to redefine what an e-commerce shoe store can be.
            </p>
            <div class="grid grid-cols-3 gap-5 items-center justify-center pt-[25px] w-[130px]">
              <Facebook :size="18" class="ml-1.5" />
              <Twitter :size="18" class="ml-1.5" />
              <Instagram :size="18" class="ml-1.5" />
            </div>
          </div>
          <div class="col-span-1 flex flex-col gap-3">
            <h2 class="font-semibold text-lg">CATEGORY</h2>
            <router-link to="/#">Athletic Footwear</router-link>
            <router-link to="/#">Luxury Leather Shoes</router-link>
            <router-link to="/#">Sustainable Footwear</router-link>
            <router-link to="/#">Sandles & Slides</router-link>
          </div>
          <div class="col-span-1 flex flex-col gap-3">
            <h2 class="font-semibold text-lg">ABOUT US</h2>
            <router-link to="/#">Sitemap</router-link>
            <router-link to="/#">FAQ</router-link>
            <router-link to="/#">About Us</router-link>
            <router-link to="/#">Terms & Conditions</router-link>
          </div>
          <div class="col-span-1 flex flex-col gap-3">
            <h2 class="font-semibold text-lg">CUSTOMER SERVICES</h2>
            <router-link to="/#">Contact Us</router-link>
            <router-link to="/#">Track Your Order</router-link>
            <router-link to="/#">Product Care & Repair</router-link>
            <router-link to="/#">Shipping & Returns</router-link>
          </div>
        </div>
        <div class="rows-span-[60px] pt-5 gap-5">
          <div class="bg-[#C9C8CB] px-[60px] w-full h-0.5"></div>
          <p class="text-center pt-5">© 2024 Velocity. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AdsTop from '@/components/AdsTop.vue'
import SignupLogin from '@/components/SignupLogin.vue'
import NavBar from '@/components/NavBar.vue'
//import FooterBlock from '@/components/FooterBlock.vue'

const promoMessages = [
  { text: 'Hurry Up! Get your first deal with 15% off for newcomers!' },
  { text: 'Enjoy 20% off your order with Nike.' },
]
</script>
