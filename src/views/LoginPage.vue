<!-- src/views/LoginPage.vue -->
<template>
  <div class="flex flex-col md:flex-row items-center min-h-[calc(100vh-200px)] bg-white p-4">
    <!-- Left: Sneaker Image -->
    <div class="md:w-2/3 w-full flex items-center justify-center p-4">
      <img
        src="@/assets/images/cover.png"
        alt="Orange running shoe"
        class="max-w-full max-h-[500px] object-contain"
      />
    </div>

    <!-- Right: Login Form -->
    <div class="md:w-1/3 w-full p-6 md:p-12">
      <h1 class="text-3xl font-bold mb-2">Log in to Exclusive</h1>
      <p class="text-gray-600 mb-8">Enter your details below</p>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
        {{ errorMessage }}
      </div>

      <!-- Demo Credentials Info -->
      <div class="mb-6 p-3 bg-blue-50 text-blue-700 rounded text-sm">
        <p class="font-medium mb-1">Demo Credentials:</p>
        <p>Admin: admin@gmail.com / admin123</p>
        <p>Customer: jonh@gmail.com / jonh123</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="identifier" class="block text-sm font-medium text-gray-700">
            Email or Phone Number
          </label>
          <input
            id="identifier"
            v-model="formData.identifier"
            type="text"
            required
            class="w-full border-b border-gray-400 py-2 focus:border-red-700 outline-none"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="w-full border-b border-gray-400 py-2 focus:border-red-700 outline-none"
          />
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-8 rounded transition-colors disabled:opacity-50"
          >
            {{ isLoading ? 'Logging in...' : 'Log In' }}
          </button>
          <a href="#" class="text-red-700 hover:text-red-900 font-medium">Forget Password?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formData = ref({
  identifier: '',
  password: '',
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const success = authStore.login(formData.value.identifier, formData.value.password)
    
    if (success) {
      // Redirect to intended page or home
      const redirect = route.query.redirect as string || '/'
      router.push(redirect)
    } else {
      errorMessage.value = 'Invalid email or password. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.' + (error as Error).message
  } finally {
    isLoading.value = false
  }
}
</script>