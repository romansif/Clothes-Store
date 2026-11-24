<template>
  <div class="ml-auto flex gap-4">
    <UiButton
      v-if="!hasReviewed"
      :name="t('orders.writeReview')"
      variant="useItemOrder"
      @click="openReviewModal(props.item.productId)"
    />
    <UiButton
      v-if="hasReplace(props.item.status).value"
      :name="t('orders.cancelItem')"
      variant="useItemOrder"
      @click="openReplaceItem(props.item.orderId, props.item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrder } from "@/entities/order-item/lib/use-order";
import { useReviewButton } from "@/entities/order-action/lib/use-review-button";
import { openReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { openReplaceItem } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import type { OrderPosition, OrderProps } from "@/entities/order/model/order.types";

const props = defineProps<{
  order: OrderProps;
  item: OrderPosition;
}>();

const { t } = useI18n();
const { hasReplace } = useOrder();
const { hasReviewed } = useReviewButton(() => props.item.productId);
</script>
