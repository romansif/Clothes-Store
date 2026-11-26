<template>
  <OrdersDashboard
    :orders="activeOrders"
    :is-loading="isLoading"
    :is-fetching="isFetching"
    :is-error="isError"
    @refetch="refetch"
  />
</template>

<script setup lang="ts">
import { useActiveOrderData } from "@/shared/lib";
import { OrdersDashboard } from "@/features/order-dashboard";

const { activeOrders, isLoading, isFetching, isError, refetch } = useActiveOrderData();
</script>
