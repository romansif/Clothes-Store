<template>
    <TransitionGroup name="list" tag="ul" class="grid grid-cols-3 gap-5 pb-5 overflow-y-auto w-full">
      <SellerOrderItem v-for="sellerItem in sellerItems"
                       :key="sellerItem.id"
                       :seller-item="sellerItem"
                       @update-order-status="updateOrderStatus" />
    </TransitionGroup>
</template>

<script setup lang="ts">
import { useUpdateOrderStatus } from "@/features/order-dashboard/api/update-order-status";
import { SellerOrderItem } from "@/entities/order-item";
import type { SellerOrderProps } from "@/entities/order";

const props = defineProps<{
  sellerItems: SellerOrderProps[]
}>()

const { updateOrderStatus } = useUpdateOrderStatus()
</script>
