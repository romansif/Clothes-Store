<template>
  <div class="ml-auto flex gap-4">
    <UiButton
      v-if="!hasReviewed"
      :name="t('orders.writeReview')"
      variant="useItemOrder"
      @click="openReviewModal(props.item.productId)"
    />
    <UiButton
      v-if="props.item.status !== 'Cancelled'"
      :name="t('orders.cancelItem')"
      variant="useItemOrder"
      @click="openReplaceItem(props.item.orderId, props.item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useReviewButton } from "@/entities/order-action/lib/use-review-button";
import { openReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { openReplaceItem } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import type { OrderProps, OrderPosition } from "@/entities/order";

const props = defineProps<{
  order: OrderProps;
  item: OrderPosition;
}>();

const { t } = useI18n();
const { hasReviewed } = useReviewButton(() => props.item.productId);
</script>
