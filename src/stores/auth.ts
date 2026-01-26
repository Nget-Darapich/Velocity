// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
}

// Simulated user database - in real app this would be on backend
const USERS = {
  admin: {
    email: 'admin@gmail.com',
    password: 'admin123', // In production, this would be hashed
    id: '1',
    name: 'Admin User',
    role: 'admin' as const
  },
  customer: {
    email: 'jonh@gmail.com',
    password: 'jonh123', // In production, this would be hashed
    id: '2',
    name: 'John Doe',
    role: 'customer' as const
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Initialize from localStorage
  const init = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  // Login function
  const login = (identifier: string, password: string): boolean => {
    // Check credentials against our simulated database
    const foundUser = Object.values(USERS).find(
      u => (u.email === identifier) && u.password === password
    )

    if (foundUser) {
      // Create a simple token (in real app, this comes from backend)
      const sessionToken = btoa(`${foundUser.email}:${Date.now()}`)
      
      user.value = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      }
      token.value = sessionToken

      // Persist to localStorage
      localStorage.setItem('auth_token', sessionToken)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      
      return true
    }
    
    return false
  }

  // Signup function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signup = (name: string, identifier: string, password: string): boolean => {
    // Check if user already exists
    const userExists = Object.values(USERS).some(u => u.email === identifier)
    
    if (userExists) {
      return false
    }

    // In a real app, this would create a new user in the database
    // For now, we'll just auto-login with customer role
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: identifier,
      role: 'customer' as const
    }

    const sessionToken = btoa(`${identifier}:${Date.now()}`)
    
    user.value = newUser
    token.value = sessionToken

    localStorage.setItem('auth_token', sessionToken)
    localStorage.setItem('auth_user', JSON.stringify(user.value))
    
    return true
  }

  // Logout function
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    init,
    login,
    signup,
    logout
  }
})