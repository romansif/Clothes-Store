<template>
  <div class="font-dm-sans flex items-center">
    <span v-if="props.item.status === 'Convene'" :class="orderStatusClass">
      {{ t("orders.timeline.created", { date: props.item.date_created_at, time: props.item.time_created_at }) }}
    </span>
    <span v-if="props.item.status === 'En route'" :class="orderStatusClass">
      {{ t("orders.timeline.processed", { date: props.item.date_processed_at, time: props.item.time_processed_at }) }}
    </span>
    <span v-if="props.item.status === 'Delivered'" :class="orderStatusClass">
      {{ t("orders.timeline.delivered", { date: props.item.date_created_at, time: props.item.time_created_at }) }}
    </span>
    <span v-if="props.item.status === 'Cancelled'" :class="orderStatusClass">
      {{ t("orders.timeline.cancelled", { date: props.item.date_cancelled_at, time: props.item.time_cancelled_at }) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { orderStatusClass } from "@/entities/order/model/order-status.variants";
import type { OrderProps, OrderPosition } from "@/entities/order";

const props = defineProps<{
  item: OrderProps | OrderPosition;
}>();

const { t } = useI18n();
</script>
