<template>
  <aside class="h-full overflow-y-auto px-6 py-6 text-[14px]">
    <!-- Logo -->
    <div class="flex flex-col items-center mb-8">
      <img
        src="@/assets/images/velocity_logo.png"
        class="w-32 mb-2"
        alt="Velocity"
      />
      <!-- <span class="font-bold tracking-wide">VELOCITY</span> -->
    </div>

    <!-- GENERAL -->
    <p class="text-gray-400 text-xs mb-3 tracking-wide">GENERAL</p>

    <SidebarItem to="/admin" icon="https://img.icons8.com/color/48/dashboard-layout.png">
      Dashboard
    </SidebarItem>

    <SidebarItem to="/admin/products" icon="https://img.icons8.com/?size=100&id=0AWksu5L57vR&format=png&color=000000">
      Product
    </SidebarItem>

    <SidebarItem to="/admin/inventory" icon="https://img.icons8.com/color/48/warehouse.png">
      Inventory
    </SidebarItem>

    <SidebarItem to="/admin/orders" icon="https://img.icons8.com/color/48/purchase-order.png">
      Orders
    </SidebarItem>

    <SidebarItem to="/admin/purchases" icon="https://img.icons8.com/color/48/shopping-cart.png">
      Purchases
    </SidebarItem>

    <SidebarItem to="/admin/category" icon="https://img.icons8.com/color/48/category.png">
      Category
    </SidebarItem>

    <SidebarItem to="/admin/invoices" icon="https://img.icons8.com/color/48/invoice.png">
      Invoices
    </SidebarItem>

    <SidebarItem to="/admin/settings" icon="https://img.icons8.com/color/48/settings.png">
      Settings
    </SidebarItem>

    <!-- USER -->
    <p class="text-gray-400 text-xs mb-3 tracking-wide">USER</p>

    <SidebarItem to="/admin/profiles" icon="https://img.icons8.com/color/48/user.png">
      Profiles
    </SidebarItem>

    <SidebarItem to="/admin/roles" icon="https://img.icons8.com/color/48/conference.png">
      Roles
    </SidebarItem>

    <SidebarItem to="/admin/customers" icon="https://img.icons8.com/color/48/group.png">
      Customers
    </SidebarItem>

    <SidebarItem to="/admin/seller" icon="https://img.icons8.com/color/48/seller.png">
      Seller
    </SidebarItem>

    <!-- OTHERS -->
    <p class="text-gray-400 text-xs mb-3 tracking-wide">OTHERS</p>

    <SidebarItem to="/admin/coupons" icon="https://img.icons8.com/color/48/discount.png">
      Coupons
    </SidebarItem>

    <SidebarItem to="/admin/review" icon="https://img.icons8.com/color/48/star.png">
      Review
    </SidebarItem>

    <!-- TASK -->
    <p class="text-gray-400 text-xs mb-3 tracking-wide">TASK</p>

    <SidebarItem to="/admin/calendar" icon="https://img.icons8.com/color/48/calendar.png">
      Calender
    </SidebarItem>

    <SidebarItem to="/admin/todo" icon="https://img.icons8.com/color/48/todo-list.png">
      Todo
    </SidebarItem>

    <!-- SUPPORT -->
    <p class="text-gray-400 text-xs mb-3 tracking-wide">SUPPORT</p>

    <SidebarItem to="/admin/help" icon="https://img.icons8.com/color/48/help.png">
      Help Center
    </SidebarItem>

    <SidebarItem to="/admin/fads" icon="https://img.icons8.com/color/48/info.png">
      FADs
    </SidebarItem>

    <SidebarItem to="/admin/privacy" icon="https://img.icons8.com/color/48/privacy-policy.png">
      Privacy Policy
    </SidebarItem>
  </aside>
</template>

<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
</script>

<style scoped>
/* @reference "tailwindcss";

.section {
  @apply text-gray-400 text-xs mb-3 tracking-wide;
} */
</style>
