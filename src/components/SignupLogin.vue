<script setup lang="ts">
import { Facebook, Instagram, Twitter, User, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div
    class="bg-[#F3F3F3] px-[60px] flex flex-col-2 items-center justify-between border border-y-[#969494] border-x-[#F3F3F3] h-[30px]"
  >
    <span class="text-[14px] w-fit">
      1d delivery available!
      <router-link
        v-if="authStore.isAdmin"
        to="/admin"
        class="text-red-700 hover:text-red-900 font-medium text-sm"
      >
        Go to Admin Dashboard →
      </router-link></span
    >
    <div class="grid grid-cols-2 gap-10 w-fit">
      <!-- Auth Section -->
      <div v-if="!authStore.isAuthenticated" class="grid grid-cols-2 gap-1">
        <router-link to="/auth/signup">Signup /</router-link>
        <router-link to="/auth/login">Login</router-link>
      </div>
      <div v-else class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          <User :size="16" />
          <span class="text-[14px]">{{ authStore.user?.name }}</span>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center gap-1 text-red-700 hover:text-red-900"
          title="Logout"
        >
          <LogOut :size="16" />
        </button>
      </div>

      <!-- Social Media -->
      <div class="grid grid-cols-3 gap-5 items-center justify-center">
        <Facebook :size="18" class="ml-1.5" />
        <Twitter :size="18" class="ml-1.5" />
        <Instagram :size="18" class="ml-1.5" />
      </div>
    </div>
  </div>
</template>
