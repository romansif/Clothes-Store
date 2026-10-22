<template>
  <CheckoutShipping />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetShipping } from "@/features/use-checkout-shipping-info/api/get-shipping";
import { useGetAddress } from "@/features/use-user-address/api/get-address";

import { CheckoutShipping } from "@/features/use-checkout-shipping-info";

const { getAddress } = useGetAddress();
const { getShipping } = useGetShipping();

onMounted(async () => {
  await getShipping();
  await getAddress();
})
</script>

<style scoped>

</style>