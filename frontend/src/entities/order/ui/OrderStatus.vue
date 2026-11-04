<template>
  <div class="font-dm-sans flex items-center">
    <span v-if="order.status === 'Convene'" :class="orderStatusClass">
      {{ t("orders.status.convene", { date: order.date_created_at, time: order.time_created_at }) }}
    </span>
    <span v-if="order.status === 'En route'" :class="orderStatusClass">
      {{ t("orders.status.enRoute", { date: order.date_created_at, time: order.time_created_at }) }}
    </span>
    <span v-if="order.status === 'Delivered'" :class="orderStatusClass">
      {{ t("orders.status.delivered", { date: order.date_created_at, time: order.time_created_at }) }}
    </span>
    <span v-if="order.status === 'Cancelled'" :class="orderStatusClass">
      {{ t("orders.status.cancelled", { date: order.time_cancelled_at, time: order.time_cancelled_at }) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { orderStatusClass } from "@/entities/order/model/order-status.variants";
import { type Order } from "@/entities/order";

const props = defineProps<{
  order: Order;
}>();

const { t } = useI18n();
</script>
