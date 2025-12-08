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

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="identifier" class="block text-sm font-medium text-gray-700">
            Email or Phone Number
          </label>
          <input
            id="identifier"
            v-model="formData.identifier"
            type="text"
            class="w-full border-b border-gray-400 py-2 focus:border-red-700 outline-none"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="w-full border-b border-gray-400 py-2 focus:border-red-700 outline-none"
          />
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <button
            type="submit"
            class="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-8 rounded transition-colors"
          >
            Log In
          </button>
          <a href="#" class="text-red-700 hover:text-red-900 font-medium">Forget Password?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  identifier: '',
  password: '',
})

const handleLogin = () => {
  console.log('Login attempt:', formData.value)
}
</script>
