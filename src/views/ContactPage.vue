<template>
  <PageShell
    title="Contact Us"
    subtitle="Send us a message. We'll get back to you soon."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]"
  >
    <form class="form" @submit.prevent="submit">
      <div class="row">
        <label>
          Full Name
          <input v-model="name" type="text" placeholder="Your name" required />
        </label>

        <label>
          Email
          <input v-model="email" type="email" placeholder="your@email.com" required />
        </label>
      </div>

      <label>
        Subject
        <input v-model="subject" type="text" placeholder="Order / Shipping / Support..." required />
      </label>

      <label>
        Message
        <textarea v-model="message" rows="5" placeholder="How can we help?" required />
      </label>

      <div class="actions">
        <button class="btn" type="submit">Send Message</button>
        <p v-if="sent" class="sent">✅ Message sent (demo)</p>
      </div>
    </form>

    <template #sidebar>
      <div class="card">
        <h3 class="sideTitle">Quick Support</h3>
        <div class="info">
          <div><strong>Email:</strong> support@velocity.demo</div>
          <div><strong>Phone:</strong> +855 000 000 000</div>
          <div><strong>Hours:</strong> Mon–Sat, 8AM–6PM</div>
        </div>
        <router-link class="btn2" to="/track-order">Track Your Order</router-link>
      </div>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageShell from '@/components/PageShell.vue'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const sent = ref(false)

function submit() {
  sent.value = true
  setTimeout(() => (sent.value = false), 2000)
}
</script>

<style scoped>
.form { display: grid; gap: 12px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
label { display: grid; gap: 6px; font-weight: 800; color: #111; }
input, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
}
.actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  background: #ff8a00;
  color: #fff;
  font-weight: 900;
  cursor: pointer;
}
.btn:hover { opacity: .9; }
.sent { margin: 0; color: #1a7f37; font-weight: 800; }

.sideTitle { margin: 0 0 10px; font-size: 18px; font-weight: 900; }
.info { display: grid; gap: 8px; margin-bottom: 14px; color: #333; line-height: 1.6; }
.btn2 { display: block; padding: 10px 14px; border-radius: 12px; background: #111; color: #fff; font-weight: 900; text-decoration: none; text-align: center; }
.btn2:hover { opacity: .9; }

@media (max-width: 600px) {
  .row { grid-template-columns: 1fr; }
}
</style>
