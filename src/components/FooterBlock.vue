<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__grid">
        <!-- Column 1 -->
        <div class="footer__col">
          <h2 class="footer__brand">VELOCITY</h2>
          <p class="footer__desc">
            driven by our determination to redefine<br />
            what an e-commerce shoe store can be.
          </p>

          <div class="footer__social">
            <a
              class="footer__icon"
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14 8.5V7c0-.9.6-1 1-1h1.9V3.1C16.6 3 15.7 3 14.7 3 12.3 3 11 4.4 11 7v1.5H9v3h2V21h3v-9.5h2.3l.7-3H14z"
                />
              </svg>
            </a>

            <a
              class="footer__icon"
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
              title="Twitter"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.5 7.1c.01.18.01.36.01.55 0 5.63-4.29 12.12-12.12 12.12-2.4 0-4.64-.7-6.52-1.92.34.04.66.05 1.02.05 1.98 0 3.8-.67 5.26-1.81-1.85-.03-3.4-1.25-3.93-2.92.26.04.52.07.8.07.37 0 .74-.05 1.08-.14-1.93-.39-3.39-2.09-3.39-4.13v-.05c.56.31 1.22.51 1.91.53-1.14-.76-1.88-2.06-1.88-3.53 0-.78.2-1.5.58-2.13 2.07 2.54 5.17 4.2 8.66 4.38-.07-.31-.1-.64-.1-.98 0-2.33 1.89-4.22 4.22-4.22 1.21 0 2.31.51 3.08 1.33.96-.19 1.86-.54 2.67-1.02-.31.98-.98 1.8-1.85 2.32.85-.1 1.66-.33 2.41-.66-.58.84-1.29 1.58-2.12 2.17z"
                />
              </svg>
            </a>

            <a
              class="footer__icon"
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9z"
                />
                <path
                  d="M12 7.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8zm0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8z"
                />
                <path d="M17.2 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="footer__col">
          <h3 class="footer__title">CATEGORY</h3>
          <ul class="footer__list">
            <li><router-link to="/products/category/athleticFootwear">Athletic Footwear</router-link></li>
            <li><router-link to="/products/category/luxuryLeatherShoes">Luxury Leather Shoes</router-link></li>
            <li><router-link to="/products/category/sustainableFootwear">Sustainable Footwear</router-link></li>
            <li><router-link to="/products/category/sandalsAndslides">Sandles &amp; Slides</router-link></li>
          </ul>
        </div>

        <!-- Column 3 -->
        <div class="footer__col">
          <h3 class="footer__title">ABOUT US</h3>
          <ul class="footer__list">
            <li><router-link to="/sitemap">Sitemap</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/terms">Terms &amp; Conditions</router-link></li>
          </ul>
        </div>

        <!-- Column 4 -->
        <div class="footer__col">
          <h3 class="footer__title">CUSTOMER<br />SERVICES</h3>
          <ul class="footer__list">
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><router-link to="/track-order">Track Your Order</router-link></li>
            <li><router-link to="/product-care">Product Care &amp; Repair</router-link></li>
            <li><router-link to="/shipping-returns">Shipping &amp; Returns</router-link></li>
          </ul>
        </div>
      </div>

      <div class="footer__divider"></div>
      <div class="footer__bottom">© {{ year }} Velocity. All Rights Reserved.</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #fff;
  padding: 70px 0 35px;
  border-top: 1px solid #eee;
  color: #111;
}
.footer__wrap {
  width: min(1200px, 92%);
  margin: 0 auto;
}
.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 60px;
  align-items: start;
}
.footer__brand {
  margin: 0 0 18px;
  font-size: 42px;
  letter-spacing: 1px;
  font-weight: 800;
}
.footer__desc {
  margin: 0 0 22px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  max-width: 360px;
}

/* ✅ Hover + pointer UX like your Track Order card/button */
.footer__social {
  display: flex;
  gap: 18px;
  align-items: center;
}
.footer__icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
}
.footer__icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
  border-color: #bbb;
}
.footer__icon:active {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
}
.footer__icon svg {
  width: 16px;
  height: 16px;
  fill: #111;
}

.footer__title {
  margin: 6px 0 18px;
  font-size: 18px;
  letter-spacing: 0.5px;
  font-weight: 800;
}
.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

/* router-link renders to <a> */
.footer__list a {
  text-decoration: none;
  color: #222;
  font-size: 16px;
  line-height: 1.4;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  display: inline-block;
  padding: 2px 0;
}
.footer__list a:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

.footer__divider {
  margin-top: 55px;
  height: 2px;
  background: #e6e6e6;
}
.footer__bottom {
  text-align: center;
  padding-top: 20px;
  font-size: 18px;
  color: #111;
}

/* Responsive */
@media (max-width: 1000px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}
@media (max-width: 560px) {
  .footer {
    padding: 50px 0 30px;
  }
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .footer__brand {
    font-size: 34px;
  }
  .footer__bottom {
    font-size: 16px;
  }
}
</style>
