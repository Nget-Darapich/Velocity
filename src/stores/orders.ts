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
  // VEL-YYYYMMDD-####
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const s = String(seq).padStart(4, '0')
  return `VEL-${yyyy}${mm}${dd}-${s}`
}

function deriveStatus(createdAtIso: string): OrderStatus {
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
