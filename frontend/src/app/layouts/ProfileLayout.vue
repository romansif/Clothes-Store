<template>
<router-view />
</template>

<script setup lang="ts">
const { getUser } = useGetUsers();
const { loading } = useBaseModals();
const { getMyProducts } = productApi();

import { onMounted } from "vue";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { useGetUsers } from "@/features/use-auth/api/users.api.ts";

onMounted(async () => {
  loading.value = true;

  await getUser();
  await getMyProducts();

  loading.value = false;
})
</script>


<style scoped>

</style>