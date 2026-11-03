<template>
  <div class="flex justify-end gap-8 border-t border-gray-300 bg-gray-50 p-3">
    <UiButton v-if="useReviewButton" :name="t('orders.writeReview')" variant="useOrder" @click="toggleReviewModal(item.productId)" />
    <UiButton v-if="order.status !== 'Cancelled'" :name="t('orders.cancelOrder')" variant="useOrder" @click="toggleReplaceChoice(order.id)" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useReviewButton } from "@/entities/order-action/lib/use-review-button";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { toggleReplaceChoice } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import type { Order, OrderItem } from "@/entities/order";

defineProps<{
  order: Order;
  item: OrderItem;
}>();

const { t } = useI18n();
</script>
