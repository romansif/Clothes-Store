<template>
  <div class="flex justify-center items-center mt-25">
    <main class="overflow-y-auto no-scrollbar mt-6 lg:mt-0 lg:w-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        <div v-if="product && product.id && product.id.length > 0" class="flex gap-18 lg:gap-20">
          <div class="flex flex-col items-center gap-3">
            <img :src="productInfoPreview(product)" alt="" class="w-97.5">
          </div>
          <div class="flex flex-col justify-between">
            <div v-for="(img, index) in angelCards(product)" :key="index" class="h-21.25 w-18">
              <img @click="changeImg(index)" :src="img" alt="" class="opacity-70 cursor-pointer transition duration-400 hover:scale-110">
            </div>
          </div>
        </div>
        <template v-if="product">
          <ProductInfo :product="product" />
          <ProductReviews :product="product" />
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";

import ProductInfo from "@/features/use-product/ui/ProductInfo.vue";
import ProductReviews from "@/features/use-product-reviews/ui/ProductReviews.vue";

const { getCartProducts } = useGetCart();
const { getProduct, product } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();
const { changeImg, productInfoPreview, angelCards } = productHelper();

const route = useRoute();

onMounted(async () => {
  await getCartProducts();
  await getFavoriteProducts();
  await getProduct(route.params.id);
})
</script>
<style scoped>

</style>