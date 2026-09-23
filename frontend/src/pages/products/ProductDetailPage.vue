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
import { computed, onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";

import ProductInfo from "@/features/use-product/ui/ProductInfo.vue";
import ProductReviews from "@/features/use-product-review/ui/ProductReviews.vue";

const route = useRoute();

const { userData } = userStore();
const { getProduct, product } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();

const isBuyer = computed(() => {
  return userData.value?.role === 'Buyer';
});

onMounted(async () => {
  await getFavoriteProducts();
  await getProduct(route.params.id);
});

</script>
<style scoped>

</style>