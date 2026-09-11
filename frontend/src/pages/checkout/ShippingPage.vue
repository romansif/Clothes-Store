<template>
  <CheckoutShipping />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetShipping } from "@/features/use-shipping/api/get-shipping.ts";
import { useGetAddress } from "@/features/use-information/api/get-address.ts";

import CheckoutShipping from "@/features/use-shipping/ui/CheckoutShipping.vue";

const { getAddress } = useGetAddress();
const { getShipping } = useGetShipping();

onMounted(async () => {
  await getShipping();
  await getAddress();
})
</script>

<style scoped>

</style>