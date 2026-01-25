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
    },
  },
})
