<template>
  <ContactInfo />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetAddress } from "@/features/use-user-address/api/get-address";

import { ContactInfo } from "@/features/use-checkout-contact-info";

const { getAddresses } = useGetAddress();

onMounted(async () => {
  await getAddresses();
})
</script>

<style scoped>

</style>