<template>
  <TransitionGroup name="list" tag="ul" class="grid w-full grid-cols-3 gap-x-5 gap-y-20 overflow-y-auto pb-5">
    <SellerOrderItem
      v-for="sellerItem in sellerItems"
      :key="sellerItem.id"
      :seller-item="sellerItem"
      @update-order-status="updateOrderStatus"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useUpdateOrderStatus } from "@/features/order-dashboard";
import { SellerOrderItem } from "@/entities/order-item";
import type { SellerOrderProps } from "@/entities/order";

const props = defineProps<{
  sellerItems: SellerOrderProps[];
}>();

const { updateOrderStatus } = useUpdateOrderStatus();
</script>
