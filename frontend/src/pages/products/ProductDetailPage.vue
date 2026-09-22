<template>
  <div :class="['flex justify-center items-center', isBuyer ? 'mt-10' : 'mt-25']">
    <main v-if="product" class="flex flex-col gap-35 lg:mt-0 lg:w-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        <ProductPhotos :product="product" />
        <ProductInfo :product="product" />
      </div>
      <ProductReviews :reviews="reviews" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";

import ProductInfo from "@/features/use-product/ui/ProductInfo.vue";
import ProductReviews from "@/features/use-product-review/ui/ProductReviews.vue";
import ProductPhotos from "@/features/use-product/ui/ProductPhotos.vue";

const { userData } = userStore();
const { getCartProducts } = useGetCart();
const { getReviews, reviews } = useGetReviews();
const { getProduct, product } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();

const route = useRoute();

const isBuyer = computed(() => {
  return userData.value?.role === 'Buyer';
});

onMounted(async () => {
  await getCartProducts();
  await getFavoriteProducts();
  await getProduct(route.params.id);
  await getReviews(route.params.id, 'ALL')
})
</script>
<style scoped>

</style>