<template>
  <span v-if="order.status === 'Convene'" :class="orderStatusClass">
    Created: {{ order.date_created_at }}, {{ order.time_created_at }}
  </span>
  <span v-if="order.status === 'En route'" :class="orderStatusClass">
    Processed: {{ order.date_created_at }}, {{ order.time_created_at }}
  </span>
  <span v-if="order.status === 'Delivered'" :class="orderStatusClass">
    Delivered: {{ order.date_created_at }}, {{ order.time_created_at }}
  </span>
  <span v-if="order.status === 'Cancelled'" :class="orderStatusClass">
    Cancelled: {{ order.date_cancelled_at }}, {{ order.time_cancelled_at }}
  </span>
</template>

<script setup lang="ts">
import { orderStatusClass } from "@/entities/order/model/order-status.variants";
import { type Order } from "@/entities/order";

const props = defineProps<{
  order: Order;
}>();
</script>
