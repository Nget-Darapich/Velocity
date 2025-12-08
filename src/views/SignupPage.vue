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
      <h1 class="text-3xl font-bold mb-2">Create an account</h1>
      <p class="text-gray-600 mb-8">Enter your details below</p>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full border-b border-gray-400 py-2 focus:border-red-700 outline-none"
          />
        </div>

        <!-- Email/Phone Field -->
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

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="w-full border-b border-gray-400 py-2 focus:border-red-700 outline-none"
          />
        </div>

        <!-- Create Account Button -->
        <button
          type="submit"
          class="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-6 rounded transition-colors"
        >
          Create Account
        </button>

        <!-- Google Signup Button -->
        <div
          class="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
        >
          <img src="@/assets/images/google.png" alt="Google" class="w-5 h-5" />
          <span>Sign up with Google</span>
        </div>

        <!-- Already have account? -->
        <div class="text-center text-gray-600">
          <span>Already have account? </span>
          <router-link to="/auth/login" class="text-red-700 hover:text-red-900 font-medium"
            >Log in</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  identifier: '',
  password: '',
})

const handleSignup = () => {
  console.log('Signup attempt:', formData.value)
}
</script>
