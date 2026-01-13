<template>
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar container -->
    <aside class="w-64 bg-white border-r shrink-0">
      <!-- Sidebar scroll happens INSIDE -->
      <AdminSidebar />
    </aside>

    <!-- Right content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar (fixed) -->
      <div class="h-16 bg-white border-b shrink-0">
        <AdminNavbar />
      </div>

      <!-- Main content (scrollable) -->
      <main class="flex-1 overflow-y-auto bg-[#F7F8FA] p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
</script>
