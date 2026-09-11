<template>
  <div class="flex justify-center items-center mt-25">
    <div class="overflow-y-auto no-scrollbar mt-6 lg:mt-0 lg:w-300">
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
        <ProductInfo :product="product" />
        <div class="flex justify-center lg:hidden">
          <router-link v-if="!userData.id" :to="{name: 'signIn'}">
            <span class="bg-black font-semibold text-sm py-8 px-46 text-white font-[Montserrat] lg:block">
              ADD TO CART
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";

import ProductInfo from "@/features/use-product/ui/product/ProductInfo.vue";

const { userData } = userStore();
const { getProduct, product } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();
const { changeImg, productInfoPreview, angelCards } = useGetProduct();

const route = useRoute();

onMounted(async () => {
  await getProduct(route.params.id);
  await getFavoriteProducts();
})
</script>
<style scoped>

</style>