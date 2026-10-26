<template>
  <ContactInfo />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetAddress } from "@/features/saved-user-address/api/get-address";

import { ContactInfo } from "@/features/checkout-contact-info";

const { getAddresses } = useGetAddress();

onMounted(async () => {
  await getAddresses();
})
</script>

