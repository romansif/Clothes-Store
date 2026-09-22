<template>
  <div :class="['flex justify-center items-center', isBuyer ? 'mt-10' : 'mt-25']">
    <main v-if="product" class="flex flex-col gap-35 lg:mt-0 lg:w-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        <ProductInfo />
      </div>
      <ProductReviews />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";

import ProductInfo from "@/features/use-product/ui/ProductInfo.vue";
import ProductReviews from "@/features/use-product-review/ui/ProductReviews.vue";

const { userData } = userStore();
const { product } = useGetProduct();

const isBuyer = computed(() => {
  return userData.value?.role === 'Buyer';
});
</script>
<style scoped>

</style>