<template>
  <section class="shell">
    <div class="shell__breadcrumb" v-if="breadcrumb?.length">
      <span v-for="(b, i) in breadcrumb" :key="i">
        <router-link v-if="b.to" :to="b.to">{{ b.label }}</router-link>
        <span v-else class="current">{{ b.label }}</span>
        <span v-if="i < breadcrumb.length - 1" class="sep"> &gt; </span>
      </span>
    </div>

    <div class="shell__grid">
      <div class="shell__left">
        <div class="shell__hero">
          <h1 class="shell__title">{{ title }}</h1>
          <p class="shell__subtitle" v-if="subtitle">{{ subtitle }}</p>
          <slot name="heroRight" />
        </div>

        <div class="shell__content">
          <slot />
        </div>
      </div>

      <aside class="shell__right" v-if="$slots.sidebar">
        <slot name="sidebar" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
type Crumb = { label: string; to?: string }
defineProps<{
  title: string
  subtitle?: string
  breadcrumb?: Crumb[]
}>()
</script>

<style scoped>
.shell {
  max-width: 1200px;
  margin: 24px auto 60px;
  padding: 0 16px;
}

.shell__breadcrumb {
  font-size: 16px;
  margin-bottom: 18px;
}
.shell__breadcrumb a {
  color: #111;
  text-decoration: none;
}
.shell__breadcrumb a:hover { opacity: .75; }
.shell__breadcrumb .current { color: #d97706; font-weight: 800; }
.shell__breadcrumb .sep { color: #999; }

.shell__grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 28px;
  align-items: start;
}

.shell__hero {
  background: #ff8a00;
  color: #fff;
  border-radius: 14px;
  padding: 20px 22px;
  box-shadow: 0 10px 24px rgba(0,0,0,.10);
}

.shell__title {
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 900;
}

.shell__subtitle {
  margin: 0;
  opacity: .95;
  line-height: 1.6;
}

.shell__content {
  margin-top: 18px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}

.shell__right :deep(.card) {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}

@media (max-width: 980px) {
  .shell__grid { grid-template-columns: 1fr; }
}
</style>
