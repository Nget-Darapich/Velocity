// import { defineStore } from 'pinia'

// export interface CartItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   img: string
//   size?: string
// }

// export const useCartStore = defineStore('cart', {
//   state: () => ({
//     items: [] as CartItem[],
//   }),

//   getters: {
//     subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
//     totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
//   },

//   actions: {
//     addToCart(payload: {
//       id: number
//       name: string
//       price: number
//       img: string
//       size?: string
//       quantity?: number
//     }) {
//       const qty = payload.quantity ?? 1

//       const existing = this.items.find(
//         (item) => item.id === payload.id && (item.size ?? '') === (payload.size ?? ''),
//       )

//       if (existing) {
//         existing.quantity += qty
//       } else {
//         this.items.push({
//           id: payload.id,
//           name: payload.name,
//           price: payload.price,
//           img: payload.img,
//           size: payload.size,
//           quantity: qty,
//         })
//       }
//     },

//     removeItem(id: number, size?: string) {
//       this.items = this.items.filter(
//         (item) => !(item.id === id && (item.size ?? '') === (size ?? '')),
//       )
//     },

//     updateQuantity(id: number, size: string | undefined, qty: number) {
//       const item = this.items.find((i) => i.id === id && (i.size ?? '') === (size ?? ''))
//       if (!item) return
//       item.quantity = Math.max(1, qty)
//     },

//     clearCart() {
//       this.items = []
//     },
//   },
// })
import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  img: string
  size?: string
}

const STORAGE_KEY = 'velocity_cart_items'

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart() as CartItem[],
  }),

  getters: {
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    addToCart(payload: {
      id: number
      name: string
      price: number
      img: string
      size?: string
      quantity?: number
    }) {
      const qty = payload.quantity ?? 1

      const existing = this.items.find(
        (item) => item.id === payload.id && (item.size ?? '') === (payload.size ?? ''),
      )

      if (existing) {
        existing.quantity += qty
      } else {
        this.items.push({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          img: payload.img,
          size: payload.size,
          quantity: qty,
        })
      }

      saveCart(this.items)
    },

    removeItem(id: number, size?: string) {
      this.items = this.items.filter(
        (item) => !(item.id === id && (item.size ?? '') === (size ?? '')),
      )
      saveCart(this.items)
    },

    updateQuantity(id: number, size: string | undefined, qty: number) {
      const item = this.items.find((i) => i.id === id && (i.size ?? '') === (size ?? ''))
      if (!item) return
      item.quantity = Math.max(1, qty)
      saveCart(this.items)
    },

    clearCart() {
      this.items = []
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
