<script setup lang="ts">
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import MyProductsCard from "./MyProductsCard.vue";
import icon_products from "@/app/assets/icons/icon-products.svg";

const { products } = productsStore();
</script>

<template>
  <ul v-if="products.length > 0" class="font-[Montserrat] grid grid-cols-3 gap-x-35 gap-y-10 overflow-y-auto max-h-[700px] no-scrollbar">
    <MyProductsCard />
  </ul>
  <div v-else class="flex justify-center pt-75">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_products" alt="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You haven't created any product cards</span>
        <span class="text-[#A3A3A3]">It’s the perfect time to start building your own business.</span>
        <span class="text-[#A3A3A3]">To do this, go to your profile and tap "CREATE PRODUCT COVER".</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>