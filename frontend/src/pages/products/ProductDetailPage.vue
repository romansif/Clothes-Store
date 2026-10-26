<template>
  <div :class="['flex justify-center items-center', isBuyer ? 'mt-10' : 'mt-25']">
    <main v-if="product" class="flex flex-col gap-35 lg:mt-0 lg:w-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        <ProductInfo :user="userData"
                     :product="product" />
      </div>
      <ProductReviews />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { product } from "@/features/product-action/api/get-product";
import { getProduct } from "@/features/product-action/api/get-product";
import { userStore } from "@/shared/model/user.store";
import { ProductInfo } from "@/features/product-action";
import { ProductReviews } from "@/features/review-dashboard";

const route = useRoute();

const { userData } = userStore();

useQuery({
  queryKey: ['product', route.params.id],
  queryFn: () => getProduct(route.params.id),
})

const isBuyer = computed(() => {
  return userData.value?.role === 'Buyer';
});
</script>
