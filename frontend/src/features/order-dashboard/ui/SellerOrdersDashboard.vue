<template>
  <main class="flex items-center justify-center">
    <Loader v-if="isLoading" variant="seller-orders" />
    <ErrorState v-else-if="isError" variant="seller-orders" :loading="isFetching" @reload="refetch" />
    <SellerOrderList v-else-if="sellerItems.length" :seller-items="sellerItems" />
    <EmptyState v-else variant="seller-orders" :loading="isFetching" @reload="refetch" />
  </main>
</template>

<script setup lang="ts">
import { useSellerOrderData } from "@/features/order-dashboard/lib/use-seller-order-data";
import { SellerOrderList } from "@/widgets/order-list";
import { EmptyState, ErrorState, Loader } from "@/shared/ui/state";

const { sellerItems, isLoading, isError, isFetching, refetch } = useSellerOrderData();
</script>
