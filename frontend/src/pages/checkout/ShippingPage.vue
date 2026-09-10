<template>
  <CheckoutShipping />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetShipping } from "@/features/use-checkout/api/shipping/get-shipping.ts";
import { useGetAddress } from "@/features/use-checkout/api/address/get-address.ts";

import CheckoutShipping from "@/features/use-checkout/ui/CheckoutShipping.vue";

const { getAddress } = useGetAddress();
const { getShipping } = useGetShipping();

onMounted(async () => {
  await getShipping();
  await getAddress();
})
</script>

<style scoped>

</style>