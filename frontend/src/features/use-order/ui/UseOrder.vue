<template>
  <div class="flex justify-end gap-8 bg-gray-50 border-gray-300 border-t p-3">
    <UiButton v-if="isInReview"
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
import { isInReview } from "@/features/use-review-form/lib/add-rating-star";
import { toggleReviewModal } from "@/features/use-review-form/lib/review-form-modal";
import { toggleReplaceChoice } from "@/features/use-order/lib/order-modal";
import type { Order, OrderItem } from "@/entities/order";

defineProps<{
  order: Order
  item: OrderItem
}>();

import UiButton from "@/shared/ui/button/UiButton.vue";
</script>
