<template>
  <div class="flex justify-end gap-8 bg-gray-50 border-gray-300 border-t p-3">
    <UiButton v-if="useReviewButton"
                name="Write a review"
                variant="useOrder"
                @click="toggleReviewModal(item.productId)" />
    <UiButton v-if="order.status !== 'Cancelled'"
                name="Cancel Order"
                variant="useOrder"
                @click="toggleReplaceChoice(order.id)" />
  </div>
</template>

<script setup lang="ts">
import { useReviewButton } from "@/entities/order-action/lib/use-review-button";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { toggleReplaceChoice } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import type { Order, OrderItem } from "@/entities/order";

defineProps<{
  order: Order
  item: OrderItem
}>();
</script>
