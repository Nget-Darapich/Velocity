<template>
  <PageShell
    title="Track Your Order"
    subtitle="Enter your Order ID to see the current status."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Track Your Order' }]"
  >
    <div class="box">
      <label>
        Order ID
        <input v-model="orderId" placeholder="e.g. VEL-20260125-0001" />
      </label>

      <div class="row">
        <button class="btn" @click="track">Track</button>
        <router-link class="btn2" to="/contact">Need help?</router-link>
      </div>

      <div v-if="result" class="result">
        <strong>Status:</strong> {{ result }}
      </div>

      <!-- FULL DETAILS -->
      <div v-if="foundOrder" class="detail">
        <div class="drow"><span>Order ID</span><b>{{ foundOrder.id }}</b></div>
        <div class="drow">
          <span>Status</span>
          <b :class="statusClass(foundOrder.status)">{{ foundOrder.status }}</b>
        </div>
        <div class="drow"><span>Items</span><b>{{ foundOrder.itemsCount }}</b></div>
        <div class="drow"><span>Total</span><b>${{ foundOrder.totals.total.toFixed(2) }}</b></div>
        <div class="drow"><span>Created</span><b>{{ formatDate(foundOrder.createdAt) }}</b></div>

        <!-- Optional: show shipping info -->
        <div class="shipBox">
          <div class="shipTitle">Shipping</div>
          <div class="shipLine">
            {{ foundOrder.shipping.firstName }} {{ foundOrder.shipping.lastName }}
          </div>
          <div class="shipLine">{{ foundOrder.shipping.email }} • {{ foundOrder.shipping.phone }}</div>
          <div class="shipLine">
            {{ foundOrder.shipping.address }}, {{ foundOrder.shipping.city }},
            {{ foundOrder.shipping.zip }}, {{ foundOrder.shipping.country }}
          </div>
        </div>
      </div>
    </div>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Tip</h3>
        <p class="sideText">
          After you pay on the Checkout page, you’ll be redirected here with your new Order ID.
        </p>

        <div class="chips" v-if="orders.allOrders.length">
          <button
            v-for="o in orders.recentOrders"
            :key="o.id"
            class="chip"
            @click="useId(o.id)"
          >
            {{ o.id }}
          </button>
        </div>

        <p v-else class="sideText2">No orders yet. Make a checkout first.</p>
      </div>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageShell from '@/components/PageShell.vue'
import { useOrdersStore } from '@/stores/orders'
import type { Order } from '@/stores/orders'

const route = useRoute()
const orders = useOrdersStore()

const orderId = ref('')
const result = ref('')
const foundOrder = ref<Order | null>(null)

onMounted(() => {
  const qid = route.query.id
  if (typeof qid === 'string' && qid.trim()) {
    orderId.value = qid
    track()
  }
})

function track() {
  const id = orderId.value.trim()
  foundOrder.value = null

  if (!id) {
    result.value = 'Please enter a valid order ID.'
    return
  }

  const found = orders.findById(id)
  if (!found) {
    result.value = 'Order not found. Please check the Order ID.'
    return
  }

  foundOrder.value = found
  result.value = `Order is ${found.status}.`
}

function useId(id: string) {
  orderId.value = id
  track()
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function statusClass(status: string) {
  if (status === 'CANCELLED') return 'st cancelled'
  if (status === 'PAID') return 'st paid'
  if (status === 'PROCESSING') return 'st processing'
  if (status === 'SHIPPED') return 'st shipped'
  if (status === 'DELIVERED') return 'st delivered'
  return 'st'
}
</script>

<style scoped>
.box {
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 14px;
  display: grid;
  gap: 12px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 900;
}

input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
}

.row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  background: #ff8a00;
  color: #fff;
  font-weight: 900;
  cursor: pointer;
}
.btn:hover { opacity: 0.9; }

.btn2 {
  padding: 10px 14px;
  border-radius: 12px;
  background: #111;
  color: #fff;
  font-weight: 900;
  text-decoration: none;
}
.btn2:hover { opacity: 0.9; }

.result {
  margin-top: 6px;
  color: #333;
  line-height: 1.7;
}

.detail {
  margin-top: 8px;
  border-top: 1px solid #eee;
  padding-top: 12px;
  display: grid;
  gap: 8px;
}

.drow {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: #333;
}
.drow span { color: #555; }
.drow b { color: #111; }

.shipBox {
  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  background: #fafafa;
}
.shipTitle { font-weight: 900; margin-bottom: 6px; }
.shipLine { color: #444; line-height: 1.6; font-size: 13px; }

.sideTitle { margin: 0 0 8px; font-size: 18px; font-weight: 900; }
.sideText { margin: 0 0 12px; color: #333; line-height: 1.7; }
.sideText2 { margin: 0; color: #666; line-height: 1.7; }

.chips { display: flex; gap: 10px; flex-wrap: wrap; }
.chip {
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 800;
  cursor: pointer;
}
.chip:hover { opacity: 0.8; }

.st { padding: 4px 10px; border-radius: 999px; font-weight: 900; font-size: 12px; }
.st.paid { background: #e6fffa; color: #0f766e; }
.st.processing { background: #eef2ff; color: #3730a3; }
.st.shipped { background: #fff7ed; color: #9a3412; }
.st.delivered { background: #ecfccb; color: #3f6212; }
.st.cancelled { background: #fee2e2; color: #991b1b; }
</style>
