<template>
  <OrderDashboard :orders="orders"
                  :is-loading="isLoading"
                  :is-fetching="isFetching"
                  :is-error="isError"
                  @refetch="refetch" />
</template>

<script setup lang="ts">
import { useOrderData } from "@/shared/lib/use-order-data";
import { OrderDashboard } from "@/features/order-dashboard";

const { orders, isLoading, isFetching, isError, refetch } = useOrderData();
</script>
