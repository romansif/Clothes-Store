<template>
<router-view />
</template>

<script setup lang="ts">
const { user } = userStore();
const { getUser } = useGetUsers();
const { loading } = useBaseModals();
const { getMyProducts } = useGetProduct();

import { onMounted } from "vue";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetUsers } from "@/features/use-auth/api/get-users.ts";

onMounted(async () => {
  loading.value = true;

  await getUser();
  if(user.value.role === 'Seller'){
      await getMyProducts();
  }

  loading.value = false;
})
</script>


<style scoped>

</style>