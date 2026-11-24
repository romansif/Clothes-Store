<template>
  <TransitionGroup name="list" tag="ul" class="grid grid-cols-3 gap-6 pb-4 overflow-y-auto w-full">
    <SellerOrderItem v-for="sellerItem in sellerItems" :seller-item="sellerItem" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useSellerOrderData } from "@/features/order-dashboard/lib/use-seller-order-data";
import { SellerOrderItem } from "@/entities/order-item";

const { sellerItems } = useSellerOrderData()
</script>
