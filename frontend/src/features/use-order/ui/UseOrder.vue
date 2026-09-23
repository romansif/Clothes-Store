<template>
  <div class="flex justify-end gap-8 bg-gray-50 border-gray-300 border-t p-3">
    <BaseButton v-if="isInReview"
                name="Write a review"
                variant="useOrder"
                @click="toggleReviewModal(item.productId)" />
    <BaseButton v-if="order.status !== 'Cancelled'"
                name="Cancel Order"
                variant="useOrder"
                @click="toggleReplaceChoice(order.id)" />
  </div>
</template>

<script setup lang="ts">
import { isInReview } from "@/features/use-review-form/lib/add-rating-star.ts";
import { toggleReviewModal } from "@/features/use-review-form/lib/review-form-modal.ts";
import { toggleReplaceChoice } from "@/features/use-order/lib/order-modal.ts";
import type {Order, OrderItem} from "@/entities/order/model/order.types.ts";

defineProps<{
  order: Order
  item: OrderItem
}>();

import BaseButton from "@/shared/ui/base/BaseButton.vue";
</script>

<style scoped>

</style>