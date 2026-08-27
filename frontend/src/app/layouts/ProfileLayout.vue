<template>
<router-view />
</template>

<script setup lang="ts">
const { user } = userStore();
const { product } = productStore();
const { getUser } = useGetUsers();
const { loading } = useBaseModals();
const { getMyProducts, getProduct } = productApi();

import { onMounted } from "vue";
import { productStore } from "@/entities/product/model/product.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { useGetUsers } from "@/features/use-auth/api/users.api.ts";

onMounted(async () => {
  loading.value = true;

  await getUser();
  if(user.value.role === 'Seller'){
      await getMyProducts();
      await getProduct(product.value.id);
  }

  loading.value = false;
})
</script>


<style scoped>

</style>