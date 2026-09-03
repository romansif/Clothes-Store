<template>
<router-view />
</template>

<script setup lang="ts">
const { user } = userStore();
const { getUser } = useGetUsers();
const { product } = productStore();
const { loading } = useBaseModals();
const { getMyProducts, getProduct } = useGetProduct();

import { onMounted } from "vue";
import { productStore } from "@/entities/product/model/product.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetUsers } from "@/features/use-auth/api/get-users.ts";

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