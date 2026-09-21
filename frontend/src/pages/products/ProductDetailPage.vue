<template>
  <div :class="['flex justify-center items-center', isBuyer ? 'mt-10' : 'mt-25']">
    <main v-if="product" class="flex flex-col gap-35 lg:mt-0 lg:w-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        <div class="flex gap-18 lg:gap-20">
          <div class="flex flex-col items-center gap-3">
            <img :src="productInfoPreview(product)" alt="" class="w-97.5">
          </div>
          <div class="flex flex-col justify-between">
            <div v-for="(img, index) in angelCards(product)" :key="index" class="h-21.25 w-18">
              <img @click="changeImg(index)" :src="img" alt="" class="opacity-70 cursor-pointer transition duration-400 hover:scale-110">
            </div>
          </div>
        </div>
        <ProductInfo :product="product" />
      </div>
      <ProductReviews :reviews="reviews"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";

import ProductInfo from "@/features/use-product/ui/ProductInfo.vue";
import ProductReviews from "@/features/use-product-review/ui/ProductReviews.vue";

const { userData } = userStore();
const { getCartProducts } = useGetCart();
const { getReviews, reviews } = useGetReviews();
const { getProduct, product } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();
const { changeImg, productInfoPreview, angelCards } = productHelper();

const route = useRoute();

onMounted(async () => {
  await getCartProducts();
  await getFavoriteProducts();
  await getProduct(route.params.id);
  await getReviews(route.params.id, 'ALL')
})

const isBuyer = computed(() => {
  return userData.value?.role === 'Buyer';
});
</script>
<style scoped>

</style>