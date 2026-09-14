<template>
  <CheckoutInfo />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetAddress } from "@/features/use-user-address/api/get-address.ts";

import CheckoutInfo from "@/features/use-checkout-contact-info/ui/CheckoutInfo.vue";

const { getAddresses } = useGetAddress();

onMounted(async () => {
  await getAddresses();
})
</script>

<style scoped>

</style>