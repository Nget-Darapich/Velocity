import { defineStore } from "pinia"

export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export type Order = {
  id: string
  createdAt: string
  status: OrderStatus
  total: number
  itemsCount: number
  email?: string
}

function generateOrderId() {
  const last = Number(localStorage.getItem('velocity_last_order_id') || '10000')
  const next = last + 1
  localStorage.setItem('velocity_last_order_id', String(next))
  return `ORD-${next}`
}


export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: JSON.parse(localStorage.getItem("velocity_orders") || "[]") as Order[],
  }),
  actions: {
    placeOrder(payload: { total: number; itemsCount: number; email?: string }) {
      const order: Order = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        status: "PROCESSING",
        total: payload.total,
        itemsCount: payload.itemsCount,
        email: payload.email,
      }

      this.orders.unshift(order)
      localStorage.setItem("velocity_orders", JSON.stringify(this.orders))
      return order
    },

    findOrder(id: string) {
      return this.orders.find((o) => o.id.toLowerCase() === id.toLowerCase())
// src/stores/orders.ts
import { defineStore } from 'pinia'

export type OrderStatus = 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export type OrderItem = {
  id: number | string
  name: string
  price: number
  quantity: number
  size?: string
  img?: string
}

export type ShippingInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  zip: string
  city: string
  country: string
}

export type OrderTotals = {
  subtotal: number
  discount: number
  shipping: number
  total: number
}

export type Order = {
  id: string
  createdAt: string // ISO
  status: OrderStatus
  items: OrderItem[]
  itemsCount: number
  shipping: ShippingInfo
  totals: OrderTotals
  payment: {
    method: 'CARD'
    last4: string
  }
}

const LS_KEY = 'velocity_orders_v1'

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Order[]
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(orders))
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function makeOrderId(seq: number) {
  // VEL-YYYYMMDD-####  (looks real)
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const s = String(seq).padStart(4, '0')
  return `VEL-${yyyy}${mm}${dd}-${s}`
}

function deriveStatus(createdAtIso: string): OrderStatus {
  // auto “progress” status by time (realistic demo)
  const created = new Date(createdAtIso).getTime()
  const now = Date.now()
  const hours = (now - created) / (1000 * 60 * 60)

  if (hours < 0.1) return 'PAID'
  if (hours < 2) return 'PROCESSING'
  if (hours < 24) return 'SHIPPED'
  return 'DELIVERED'
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: loadOrders() as Order[],
    seq: 0,
  }),

  getters: {
    allOrders(state): Order[] {
      // show newest first + derived status
      return [...state.orders]
        .map((o) => ({ ...o, status: o.status === 'CANCELLED' ? o.status : deriveStatus(o.createdAt) }))
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    },
    recentOrders(): Order[] {
      return this.allOrders.slice(0, 3)
    },
  },

  actions: {
    placeOrder(payload: {
      items: OrderItem[]
      shipping: ShippingInfo
      totals: OrderTotals
      cardNumber: string
    }) {
      this.seq = this.seq || this.orders.length
      this.seq += 1

      const id = makeOrderId(this.seq)
      const createdAt = new Date().toISOString()
      const itemsCount = payload.items.reduce((s, i) => s + i.quantity, 0)
      const last4 = payload.cardNumber.replace(/\D/g, '').slice(-4)

      const order: Order = {
        id,
        createdAt,
        status: 'PAID',
        items: payload.items,
        itemsCount,
        shipping: payload.shipping,
        totals: payload.totals,
        payment: {
          method: 'CARD',
          last4: last4 || '0000',
        },
      }

      this.orders.push(order)
      saveOrders(this.orders)

      localStorage.setItem('velocity_last_order', id)

      return order
    },

    findById(id: string) {
      const found = this.orders.find((o) => o.id === id)
      if (!found) return null
      // attach derived status for display
      return {
        ...found,
        status: found.status === 'CANCELLED' ? found.status : deriveStatus(found.createdAt),
      } as Order
    },

    cancelOrder(id: string) {
      const idx = this.orders.findIndex((o) => o.id === id)
      if (idx === -1) return false
      this.orders[idx].status = 'CANCELLED'
      saveOrders(this.orders)
      return true
    },
  },
})
