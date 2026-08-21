<template>
  <span v-if="order.status === 'Convene'" class="text-xs text-[#A3A3A3]">
    Created: {{ order.date_created_at }}, {{ order.time_created_at }}
  </span>
  <span v-if="order.status === 'En route'" class="text-xs text-[#A3A3A3]">
    Processed: {{ order.date_created_at }}, {{ order.time_created_at }}
  </span>
  <span v-if="order.status === 'Delivered'" class="text-xs text-[#A3A3A3]">
    Delivered: {{ order.date_created_at }}, {{ order.time_created_at }}
  </span>
  <span v-if="order.status === 'Cancelled'" class="text-xs text-[#A3A3A3]">
    Cancelled: {{ order.date_cancelled_at }}, {{ order.time_cancelled_at }}
  </span>
</template>

<script setup lang="ts">
import { type Order } from "@/feature/orders/model/order.types.ts";

const props = defineProps<{
  order: Order;
}>();
</script>

<style scoped>

</style>